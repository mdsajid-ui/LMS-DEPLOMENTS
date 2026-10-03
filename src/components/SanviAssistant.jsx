import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  PhoneCall, 
  MessageSquare, 
  Copy, 
  Check, 
  Code, 
  Server, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2,
  Mic,
  MicOff,
  Headphones,
  FileSpreadsheet,
  ExternalLink,
  Globe,
  Building2,
  Play,
  Radio,
  Layers,
  Bot,
  UserCheck,
  Award,
  Download
} from 'lucide-react';
import { 
  dvHelplineNumbers, 
  dvToolConnections, 
  dvAssignmentSolutions, 
  assignmentsList,
  studentProfile,
  dvCompanyProfile
} from '../data/mockData';
import ExcelSheetViewerModal from './ExcelSheetViewerModal';
import { generateAndDownloadExcel } from '../utils/excelHelper';
import { askSanviGemini, getConciseSpeechText } from '../services/geminiService';

export default function SanviAssistant({ 
  isOpenExternal, 
  onCloseExternal, 
  currentTab, 
  onNavigate 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat'); // 'chat', 'assignments', 'company', 'helplines', 'tools'
  const [selectedAsnKey, setSelectedAsnKey] = useState('ASN-01');
  const [copiedText, setCopiedText] = useState(null);
  const [excelModalOpen, setExcelModalOpen] = useState(false);
  
  // Voice states (Jarvis style two-way voice)
  const [voiceEnabled, setVoiceEnabled] = useState(true); // TTS voice output
  const [alwaysListening, setAlwaysListening] = useState(true); // Jarvis continuous listening
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [interimSpeech, setInterimSpeech] = useState('');
  const [activeSpeakingMsgId, setActiveSpeakingMsgId] = useState(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [lastActionExecuted, setLastActionExecuted] = useState(null);

  const recognitionRef = useRef(null);
  const synthRef = useRef(null);
  const handleSendMessageRef = useRef(null);
  const activeTranscriptRef = useRef('');
  const silenceTimerRef = useRef(null);
  const alwaysListeningRef = useRef(alwaysListening);
  const isSpeakingRef = useRef(isSpeaking);
  const currentUtteranceRef = useRef(null);
  
  // Acoustic Feedback & Echo Cancellation Refs
  const isAudioOutputActiveRef = useRef(false);
  const cooldownTimerRef = useRef(null);
  const lastSpokenUtteranceRef = useRef('');
  const lastSpokenTimeRef = useRef(0);

  // Wake-Word Session State ("untill unless i say Hey sanvi you no need to speak anything")
  const [isWakeActive, setIsWakeActive] = useState(false);
  const isWakeActiveRef = useRef(false);
  const wakeSessionTimerRef = useRef(null);

  const checkWakeWord = (text) => {
    if (!text) return false;
    const l = text.toLowerCase();
    return (
      l.includes('hey sanvi') || 
      l.includes('hey sunvi') || 
      l.includes('hey saanvi') || 
      l.includes('hey shanvi') || 
      l.includes('hey chatgpt') || 
      l.includes('hey gemini') || 
      l.includes('hey sajid') || 
      l.includes('sanvi') || 
      l.includes('sunvi') || 
      l.includes('saanvi') || 
      l.includes('shanvi') || 
      l.includes('sonvi') || 
      l.includes('jarvis')
    );
  };

  const refreshWakeSession = (durationMs = 120000) => {
    isWakeActiveRef.current = true;
    setIsWakeActive(true);
    if (wakeSessionTimerRef.current) clearTimeout(wakeSessionTimerRef.current);
    wakeSessionTimerRef.current = setTimeout(() => {
      isWakeActiveRef.current = false;
      setIsWakeActive(false);
    }, durationMs);
  };

  alwaysListeningRef.current = alwaysListening;
  isSpeakingRef.current = isSpeaking;

  // Synchronize with external triggers & activate 120s session
  useEffect(() => {
    if (isOpenExternal !== undefined && isOpenExternal !== null) {
      setIsOpen(isOpenExternal);
      if (isOpenExternal) {
        refreshWakeSession(120000);
      }
    }
  }, [isOpenExternal]);

  useEffect(() => {
    if (isOpen) {
      refreshWakeSession(120000);
      restartRecognitionSafely();
    }
  }, [isOpen]);

  // Web Audio Synthesizer: Futuristic AI Chime (Jarvis Wake Chime)
  const playWakeChime = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      const now = ctx.currentTime;
      // High-tech two-tone ping
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.12); // A5
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
      osc.start(now);
      osc.stop(now + 0.28);
    } catch (_e) {}
  };

  // Pre-load voices for natural synthesis
  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      synthRef.current = window.speechSynthesis;
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        if (window.speechSynthesis) {
          window.speechSynthesis.getVoices();
        }
      };
    }
  }, []);

  // Submit voice speech safely:
  // When modal is open OR wake session is active OR "Hey Sanvi" is detected
  const submitVoiceSpeech = (transcript) => {
    if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    const text = (transcript || activeTranscriptRef.current || '').trim();
    if (!text) return;

    const wakeDetected = checkWakeWord(text);

    // If modal is closed AND user has NOT said "Hey Sanvi" AND Sanvi is not currently in an active wake conversation session:
    // Ignore to prevent accidental trigger
    if (!isOpen && !wakeDetected && !isWakeActiveRef.current) {
      activeTranscriptRef.current = '';
      setInterimSpeech('');
      return;
    }

    // Refresh active wake session for follow-up turns (120s Mark-LIII standard)
    refreshWakeSession(120000);

    activeTranscriptRef.current = '';
    setInterimSpeech('');
    if (handleSendMessageRef.current) {
      handleSendMessageRef.current(text, true); // true = fromVoice
    }
  };

  // Safe restart helper for continuous recognition
  const restartRecognitionSafely = () => {
    if (
      !recognitionRef.current || 
      !alwaysListeningRef.current || 
      isSpeakingRef.current || 
      isAudioOutputActiveRef.current
    ) return;
    try {
      recognitionRef.current.start();
    } catch (_err) {
      // If already started or transitioning, ignore
    }
  };

  // Initialize Speech Recognition (Jarvis Continuous Listener)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
          setIsListening(true);
        };

        recognition.onresult = (event) => {
          // If Sanvi is actively speaking or in acoustic cool-down, completely ignore microphone
          if (isSpeakingRef.current || isAudioOutputActiveRef.current) {
            activeTranscriptRef.current = '';
            setInterimSpeech('');
            return;
          }

          let fullTranscript = '';
          let isFinal = false;

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const part = event.results[i][0].transcript;
            fullTranscript += part;
            if (event.results[i].isFinal) {
              isFinal = true;
            }
          }

          const rawText = fullTranscript.trim();
          if (!rawText) return;

          // Acoustic Echo Guard: If microphone heard what Sanvi just spoke within 3 seconds, drop it
          const lower = rawText.toLowerCase();
          const timeSinceLastSpoken = Date.now() - lastSpokenTimeRef.current;
          if (timeSinceLastSpoken < 3000 && lastSpokenUtteranceRef.current) {
            const lastWords = lastSpokenUtteranceRef.current.split(/\s+/).filter(w => w.length > 3);
            const recognizedWords = lower.split(/\s+/).filter(w => w.length > 3);
            const matchingCount = recognizedWords.filter(w => lastWords.includes(w)).length;
            if (matchingCount >= 2 || (recognizedWords.length <= 3 && matchingCount >= 1)) {
              activeTranscriptRef.current = '';
              setInterimSpeech('');
              return;
            }
          }

          // Ignore single-character noise or microphone static
          if (rawText.length < 2) return;

          // Check for wake words
          const wakeDetected = checkWakeWord(rawText);

          // If modal is closed AND wake word is NOT present AND we are NOT in an active conversation session:
          // Ignore completely to avoid false triggers in the room!
          if (!isOpen && !wakeDetected && !isWakeActiveRef.current) {
            activeTranscriptRef.current = '';
            setInterimSpeech('');
            return;
          }

          if (wakeDetected && !isOpen) {
            playWakeChime();
            setIsOpen(true);
            setIsMinimized(false);
            refreshWakeSession(120000);
          } else {
            refreshWakeSession(120000);
          }

          setInterimSpeech(rawText);
          activeTranscriptRef.current = rawText;

          // Clear previous silence timer
          if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);

          if (isFinal) {
            submitVoiceSpeech(rawText);
          } else {
            // Auto-submit after 1.2s pause in speaking
            silenceTimerRef.current = setTimeout(() => {
              if (activeTranscriptRef.current && !isSpeakingRef.current && !isAudioOutputActiveRef.current) {
                submitVoiceSpeech(activeTranscriptRef.current);
              }
            }, 1200);
          }
        };

        recognition.onerror = (e) => {
          if (e.error === 'no-speech') {
            // normal pause, keep listening
          } else {
            setIsListening(false);
          }
        };

        recognition.onend = () => {
          setIsListening(false);
          // Auto restart continuous listening ONLY if audio is not active and not cooling down
          if (alwaysListeningRef.current && !isSpeakingRef.current && !isAudioOutputActiveRef.current) {
            setTimeout(() => {
              restartRecognitionSafely();
            }, 200);
          }
        };

        recognitionRef.current = recognition;

        // Start listening immediately if alwaysListening is true
        if (alwaysListening) {
          try {
            recognition.start();
          } catch (_e) {}
        }
      }
    }

    return () => {
      if (synthRef.current) synthRef.current.cancel();
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch (_e) {}
      }
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
      if (cooldownTimerRef.current) clearTimeout(cooldownTimerRef.current);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    if (onCloseExternal) onCloseExternal();
    if (synthRef.current) synthRef.current.cancel();
    setIsSpeaking(false);
    isSpeakingRef.current = false;
    isWakeActiveRef.current = false;
    setIsWakeActive(false);
    if (wakeSessionTimerRef.current) clearTimeout(wakeSessionTimerRef.current);
  };

  // Document-wide Audio Unlock for Chrome/Windows autoplay policies
  useEffect(() => {
    const unlockAudio = () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        try {
          if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
          }
        } catch (_e) {}
      }
    };
    window.addEventListener('click', unlockAudio, { passive: true });
    window.addEventListener('keydown', unlockAudio, { passive: true });
    window.addEventListener('touchstart', unlockAudio, { passive: true });
    return () => {
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
    };
  }, []);

  // Chat conversation state
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'welcome-1',
      sender: 'sanvi',
      timestamp: 'Just now',
      text: 'Hey Sajid! Say "Hey Sanvi" to talk.'
    }
  ]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Copy helper
  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedText(key);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Speak text using natural speech synthesis (Chrome / Edge / Safari Windows optimized)
  const speakSanviResponse = (text, msgId = null, speechOverride = null) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    // 1. Immediately block microphone and speech recognition
    isAudioOutputActiveRef.current = true;
    isSpeakingRef.current = true;
    setIsSpeaking(true);
    if (msgId) setActiveSpeakingMsgId(msgId);

    // Cancel pending timers & clear transcript buffer
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
    if (cooldownTimerRef.current) {
      clearTimeout(cooldownTimerRef.current);
      cooldownTimerRef.current = null;
    }
    activeTranscriptRef.current = '';
    setInterimSpeech('');

    // Abort recognition synchronously so mic does not pick up Sanvi's initial audio
    if (recognitionRef.current) {
      try { recognitionRef.current.abort(); } catch (_e) {}
    }

    // Use concise speech text if available so Sanvi doesn't speak long code or table text
    const textToSpeak = speechOverride || getConciseSpeechText(text);

    // Clean text for speech
    const cleanText = textToSpeak
      .replace(/[*#_`]/g, '')
      .replace(/₹/g, 'Rupees ')
      .replace(/ASN-01/g, 'Assignment 1')
      .replace(/ASN-02/g, 'Assignment 2')
      .replace(/ASN-03/g, 'Assignment 3')
      .replace(/VLOOKUP/g, 'V-Lookup')
      .replace(/XLOOKUP/g, 'X-Lookup')
      .replace(/DENSE_RANK/g, 'Dense Rank')
      .replace(/https?:\/\/\S+/g, 'our official website');

    // Record what Sanvi is speaking for acoustic echo filtering
    lastSpokenUtteranceRef.current = cleanText.toLowerCase();
    lastSpokenTimeRef.current = Date.now();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.05; // natural friendly tone
    utterance.volume = 1.0; // explicit maximum volume

    // Prioritize offline local Windows / SAPI voices that never fail or require network
    const voices = window.speechSynthesis.getVoices() || [];
    const preferredVoice = 
      voices.find(v => v.name.includes('Microsoft') && (v.name.includes('Zira') || v.name.includes('Jenny') || v.name.includes('Heera') || v.name.includes('Natural'))) ||
      voices.find(v => v.name.includes('Zira')) ||
      voices.find(v => v.localService && (v.name.includes('Female') || v.name.includes('Samantha') || v.name.includes('Jenny') || v.name.includes('Victoria'))) ||
      voices.find(v => v.name.includes('Microsoft') && v.lang.startsWith('en')) ||
      voices.find(v => v.localService && v.lang.startsWith('en')) ||
      voices.find(v => v.lang.startsWith('en')) ||
      voices[0];

    if (preferredVoice) {
      utterance.voice = preferredVoice;
      utterance.lang = preferredVoice.lang || 'en-US';
    } else {
      utterance.lang = 'en-US';
    }

    currentUtteranceRef.current = utterance;
    window.__activeSanviUtterance = utterance; // Prevent Chrome garbage collection bug

    let hasEnded = false;
    let keepAliveTimer = null;

    const handleSpeechEnded = () => {
      if (hasEnded) return;
      hasEnded = true;
      if (keepAliveTimer) clearInterval(keepAliveTimer);
      setIsSpeaking(false);
      isSpeakingRef.current = false;
      setActiveSpeakingMsgId(null);
      currentUtteranceRef.current = null;
      window.__activeSanviUtterance = null;
      lastSpokenTimeRef.current = Date.now();

      // Hold an acoustic cool-down buffer so room echo/reverb doesn't trigger the microphone
      if (cooldownTimerRef.current) clearTimeout(cooldownTimerRef.current);
      cooldownTimerRef.current = setTimeout(() => {
        isAudioOutputActiveRef.current = false;
        activeTranscriptRef.current = '';
        setInterimSpeech('');
        // Maintain active conversation window (120s) so Sajid can reply naturally
        if (isWakeActiveRef.current || isOpen) {
          refreshWakeSession(120000);
        }
        if (alwaysListeningRef.current) {
          restartRecognitionSafely();
        }
      }, 1000);
    };

    utterance.onstart = () => {
      setIsSpeaking(true);
      isSpeakingRef.current = true;
      isAudioOutputActiveRef.current = true;
      if (msgId) setActiveSpeakingMsgId(msgId);

      // Keep speech alive in Chrome
      keepAliveTimer = setInterval(() => {
        if (typeof window !== 'undefined' && window.speechSynthesis && window.speechSynthesis.speaking) {
          window.speechSynthesis.resume();
        } else {
          clearInterval(keepAliveTimer);
        }
      }, 2000);
    };

    utterance.onend = handleSpeechEnded;
    utterance.onerror = (e) => {
      console.warn("Speech error or cancelled, recovering:", e);
      if (keepAliveTimer) clearInterval(keepAliveTimer);
      handleSpeechEnded();
    };

    // Play subtle wake chime for instant audio confirmation
    playWakeChime();

    // Robust speak trigger handling Chrome's cancel() latency and pending queue
    const executeSpeak = () => {
      try {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
        window.speechSynthesis.speak(utterance);
        
        // Secondary resume to bypass Chromium audio output freeze
        setTimeout(() => {
          try {
            if (window.speechSynthesis.paused) {
              window.speechSynthesis.resume();
            }
          } catch (_e) {}
        }, 60);
      } catch (err) {
        console.error("speechSynthesis.speak error:", err);
        handleSpeechEnded();
      }
    };

    if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
      window.speechSynthesis.cancel();
      setTimeout(executeSpeak, 120);
    } else {
      executeSpeak();
    }

    // Watchdog timer: If speech doesn't complete within allocated time, forcefully recover
    const watchdogMs = Math.max(6000, cleanText.length * 120);
    setTimeout(() => {
      if (isSpeakingRef.current && !hasEnded) {
        handleSpeechEnded();
      }
    }, watchdogMs);
  };

  const stopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      isSpeakingRef.current = false;
      setActiveSpeakingMsgId(null);
      currentUtteranceRef.current = null;
      if (cooldownTimerRef.current) clearTimeout(cooldownTimerRef.current);
      cooldownTimerRef.current = setTimeout(() => {
        isAudioOutputActiveRef.current = false;
        activeTranscriptRef.current = '';
        setInterimSpeech('');
        if (alwaysListeningRef.current) {
          restartRecognitionSafely();
        }
      }, 400);
    }
  };

  // Toggle Microphone Manual / Always Listening
  const toggleListening = () => {
    if (isListening) {
      setAlwaysListening(false);
      isWakeActiveRef.current = false;
      setIsWakeActive(false);
      if (wakeSessionTimerRef.current) clearTimeout(wakeSessionTimerRef.current);
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (_e) {}
      }
      setIsListening(false);
    } else {
      setAlwaysListening(true);
      refreshWakeSession(120000); // Clicking mic manually opens a 120s speaking session
      if (synthRef.current) synthRef.current.cancel();
      setIsSpeaking(false);
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (_e) {
          try {
            recognitionRef.current.stop();
            setTimeout(() => {
              try { recognitionRef.current.start(); } catch (_err) {}
            }, 200);
          } catch (_err) {}
        }
      } else {
        alert("Speech Recognition is not supported in this browser. Please use Google Chrome, Microsoft Edge, or Safari.");
      }
    }
  };

  // Process user chat message & Jarvis Action Engine
  const handleSendMessage = async (textToSend, fromVoice = false) => {
    const query = (textToSend || inputMessage).trim();
    if (!query) return;

    // Strict voice gating:
    // Only block if assistant window is CLOSED and user has NOT said wake word and wake session is NOT active
    if (fromVoice && !isOpen && !checkWakeWord(query) && !isWakeActiveRef.current) {
      return;
    }

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      timestamp: 'Just now',
      text: query
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsProcessing(true);
    setLastActionExecuted(null);

    let replyText = "";
    let actionType = null;
    let spokenVoiceText = null;
    const lower = query.toLowerCase().trim();
    // Strip trailing speech recognition punctuation (. ! ? ,) so voice matching is 100% reliable
    const cleanLower = lower.replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, "").trim();

    const hasSunviOrSanvi = 
      lower.includes('sunvi') || 
      lower.includes('sanvi') || 
      lower.includes('saanvi') || 
      lower.includes('shanvi') || 
      lower.includes('sunny') || 
      lower.includes('sonvi') || 
      cleanLower.includes('sanvi') ||
      cleanLower.includes('sunvi');

    // ==========================================
    // REQUIREMENT 1: FOUNDER & DIRECTOR OF DV ANALYTICS
    // ==========================================
    if (
      lower.includes('director') || 
      lower.includes('debendra') || 
      lower.includes('debadutta') || 
      lower.includes('devender') || 
      lower.includes('devgan') || 
      (lower.includes('das') && (lower.includes('who') || lower.includes('founder') || lower.includes('director'))) ||
      (lower.includes('founder') && (lower.includes('dv') || lower.includes('company') || lower.includes('analytics') || lower.includes('who'))) ||
      lower.includes('who started dv analytics') ||
      lower.includes('who founded dv analytics') ||
      lower.includes('who is the director') ||
      lower.includes('who is director') ||
      lower.includes('ceo of dv analytics')
    ) {
      replyText = `**${dvCompanyProfile.founder} is the Founder & Managing Director of DV Analytics (DV Data & Analytics Pvt Ltd).**

Under his visionary leadership, DV Analytics was built to deliver industry-grade practical training in Data Science, Artificial Intelligence, Generative AI, and Business Analytics, empowering thousands of students and working professionals across India (Bangalore, Bhubaneswar) and internationally (Dubai).`;
      actionType = "founder_fact";
      spokenVoiceText = "Debendra Das Debadutta is the founder and Managing Director of DV Analytics.";
    }

    // ==========================================
    // REQUIREMENT: JARVIS ACTION: "PLAY SESSION 1 VIDEO" / "EXCEL CLASS 1 VIDEO"
    // ==========================================
    else if (
      (lower.includes('session 1') && (lower.includes('video') || lower.includes('class') || lower.includes('play') || lower.includes('watch') || lower.includes('open'))) ||
      (lower.includes('class 1') && (lower.includes('video') || lower.includes('play') || lower.includes('open') || lower.includes('watch'))) ||
      (lower.includes('excel') && lower.includes('video')) ||
      lower.includes('session 1 video') ||
      lower.includes('session-1 video') ||
      lower.includes('session 1 class 1') ||
      lower.includes('play class 1')
    ) {
      if (onNavigate) onNavigate('session');
      replyText = `Opening **Excel Session 1 Class 1 Video** for you right away!

The high-definition encrypted VdoCipher video player for Session 1 (Advanced Formulae & Dynamic Cell References) is now active and ready to stream.`;
      actionType = "session_video_opened";
      spokenVoiceText = "Opening Excel Session 1 Class 1 video for you right now.";
    }

    // ==========================================
    // REQUIREMENT 2: JARVIS ACTION: "OPEN AN EXCEL SHEET"
    // "If I am asking him to open an Excel sheet, he is opening like that. I want this Sanvi should work like that."
    // ==========================================
    else if (
      (lower.includes('open') && lower.includes('excel')) ||
      (lower.includes('show') && lower.includes('excel')) ||
      lower.includes('open sheet') ||
      lower.includes('open an excel sheet') ||
      lower.includes('open spreadsheet') ||
      lower.includes('download excel') ||
      lower.includes('give me excel') ||
      lower.includes('open excel file')
    ) {
      setExcelModalOpen(true);
      generateAndDownloadExcel("DV_Analytics_Retail_Sales_Master.csv");
      replyText = `Opening the Excel practice worksheet for you right away!

I have launched the interactive "Retail_Sales_Raw_Data.xlsx" workbench on your screen and triggered the direct download of the dataset to your computer. You can analyze formulas like XLOOKUP, Pivot Tables, and Gross/Net revenue calculations.`;
      actionType = "excel_opened";
      spokenVoiceText = "Opening the Excel practice worksheet and downloading the dataset for you right now.";
    }

    // Action: Navigate to Assignments
    else if (
      (lower.includes('open') && lower.includes('assignment')) ||
      lower.includes('show assignments') ||
      lower.includes('go to assignments')
    ) {
      if (onNavigate) onNavigate('assignments');
      replyText = "Opening your Assignments module right away. You have 3 hands-on assignments: Retail Sales Analysis in Excel, VBA Invoice Macro, and SQL Server E-Commerce Analytics.";
      actionType = "navigated_assignments";
      spokenVoiceText = "Opening your assignments module.";
    }

    // Action: Navigate to Student Progress Report & i-SMS Dashboard
    else if (
      lower.includes('progress report') || 
      lower.includes('student report') || 
      lower.includes('scorecard') || 
      lower.includes('grade card') ||
      lower.includes('isms') ||
      lower.includes('i-sms') ||
      (lower.includes('show') && lower.includes('report')) ||
      (lower.includes('open') && lower.includes('report')) ||
      (lower.includes('show') && lower.includes('progress')) ||
      (lower.includes('open') && lower.includes('progress'))
    ) {
      if (onNavigate) onNavigate('progress-report');
      replyText = "Opening your Student Progress Report and i-SMS Performance Dashboard! You can inspect attendance, test scores, modular subject breakdowns, and download official transcripts.";
      actionType = "navigated_progress_report";
      spokenVoiceText = "Opening your student progress report and i-SMS dashboard.";
    }

    // Action: Navigate to CAT Test / Practical Interview booth / i-Test
    else if (
      (lower.includes('open') && (lower.includes('test') || lower.includes('cat') || lower.includes('practical') || lower.includes('lab'))) ||
      lower.includes('take test') ||
      lower.includes('open application test') ||
      lower.includes('open interview booth') ||
      lower.includes('practical test') ||
      lower.includes('i-test') ||
      lower.includes('itest') ||
      lower.includes('coding lab') ||
      lower.includes('sql lab') ||
      lower.includes('python lab')
    ) {
      if (onNavigate) onNavigate('application-test');
      replyText = "Opening the i-Test Practical Coding Lab and CAT Test Booth! You can run PostgreSQL queries, Python scripts, dynamic array formulas, and SAS analytics.";
      actionType = "navigated_test";
      spokenVoiceText = "Opening the i-Test practical coding lab and test booth.";
    }

    // Action: Navigate to Interview Prep Kit
    else if (
      (lower.includes('open') || lower.includes('show')) && (lower.includes('interview') || lower.includes('prep kit') || lower.includes('kit'))
    ) {
      if (onNavigate) onNavigate('interview-prep');
      replyText = "Opening your 7-step My Interview Preparation Kit! Access ATS Resume building, SQL mastery, Excel modeling, ML algorithms, Case Studies, and HR negotiation folders.";
      actionType = "navigated_interview_kit";
      spokenVoiceText = "Opening your 7-step interview preparation kit.";
    }

    // Action: Navigate to Dashboard
    else if (
      lower.includes('open dashboard') || 
      lower.includes('go to dashboard') || 
      lower.includes('show dashboard') ||
      lower.includes('home')
    ) {
      if (onNavigate) onNavigate('dashboard');
      replyText = `Navigating to your student dashboard. You currently have ${studentProfile.watchedRecordedHours}h watched (${studentProfile.watchedPercent}%) and a 7-day learning streak!`;
      actionType = "navigated_dashboard";
      spokenVoiceText = "Navigating to your student dashboard.";
    }

    // Action: Navigate to Courses / Recorded Sessions
    else if (
      (lower.includes('open') || lower.includes('show')) && (lower.includes('course') || lower.includes('lecture') || lower.includes('session') || lower.includes('video'))
    ) {
      if (onNavigate) onNavigate('courses');
      replyText = "Opening your Course Catalog and Recorded Lectures. Select any subject to continue your video playback.";
      actionType = "navigated_courses";
      spokenVoiceText = "Opening your course catalog and lectures.";
    }

    // Action: Navigate to Attendance
    else if (
      lower.includes('attendance') && (lower.includes('open') || lower.includes('show') || lower.includes('check'))
    ) {
      if (onNavigate) onNavigate('attendance');
      replyText = `Opening your Attendance Tracker. Your live class attendance is at ${studentProfile.attendancePercent}% (${studentProfile.liveAttendedHours}/${studentProfile.liveTotalHours} hours attended).`;
      actionType = "navigated_attendance";
      spokenVoiceText = `Opening your attendance records. You have attended ${studentProfile.liveAttendedHours} hours of live classes.`;
    }

    // Action: Call / Contact Academic Coordinator
    else if (
      lower.includes('coordinator') || 
      lower.includes('call') || 
      lower.includes('hotline') || 
      (lower.includes('contact') && !lower.includes('website'))
    ) {
      setActiveTab('helplines');
      replyText = `Here is your Academic Coordinator's direct contact details:
• Coordinator: ${dvHelplineNumbers.academicCoordinator.contactPerson}
• Direct Phone: ${dvHelplineNumbers.academicCoordinator.phone}
• Timings: ${dvHelplineNumbers.academicCoordinator.timings}
I have opened the Helplines tab where you can click to Call or connect on WhatsApp directly.`;
      actionType = "coordinator_opened";
      spokenVoiceText = `Here is your Academic Coordinator's contact: ${dvHelplineNumbers.academicCoordinator.phone}. Connecting you now.`;
    }

    // ==========================================
    // REQUIREMENT 3: DV ANALYTICS COMPANY KNOWLEDGE BASE (from https://www.dvanalyticsmds.com/)
    // ==========================================
    else if (
      lower.includes('dvanalyticsmds.com') ||
      lower.includes('about dv analytics') ||
      lower.includes('tell me about your company') ||
      lower.includes('company information') ||
      lower.includes('about company') ||
      lower.includes('what is dv analytics')
    ) {
      replyText = `DV Analytics (DV Data & Analytics Pvt Ltd) is an elite analytics and AI training organization founded and directed by ${dvCompanyProfile.founder}.

Key Facts from our official portal (https://www.dvanalyticsmds.com/):
• Founder & Director: ${dvCompanyProfile.founder}
• Head Office: Bangalore, Karnataka
• Centers: Bangalore, Bhubaneswar (Odisha), Dubai (UAE), and Online Global
• Phone Numbers: +91-9019030033 / +91-9830012345
• Official Email: info@dvanalyticsmds.com
• Flagship Programs: APIDS (Data Science with AI Deployment), APIDA (Data Science with Gen AI), DAS (Data Analytics Specialist), APCF (Cybersecurity & Forensics), and FDE (AI Forward Deployment Engineer).
• Placement Record: 100% placement support with 100+ hiring partners.`;
      actionType = "company_info";
      spokenVoiceText = "DV Analytics is a premier Data Science and AI institute founded and directed by Debendra Das Debadutta, with centers in Bangalore, Bhubaneswar, and Dubai.";
    }

    // Branches / Centers / Locations
    else if (
      lower.includes('location') || 
      lower.includes('branch') || 
      lower.includes('center') || 
      lower.includes('office') || 
      lower.includes('where is dv analytics') ||
      (lower.includes('dubai') && lower.includes('center'))
    ) {
      replyText = `DV Analytics operates premier training centers across multiple locations:
1. Bangalore (Head Office & Training Center): Karnataka, India
2. Bhubaneswar (Regional Institute): Odisha, India
3. Dubai (International Office): Dubai, UAE
4. Live Online / Global: Connecting learners across India and worldwide.

Our contact numbers are +91-9019030033 and +91-9830012345, or email us at info@dvanalyticsmds.com.`;
      spokenVoiceText = "DV Analytics has training centers in Bangalore, Bhubaneswar, Dubai, and offers live online programs globally.";
    }

    // Placements
    else if (
      (lower.includes('placement') || lower.includes('hiring partners')) && 
      (lower.includes('dv') || lower.includes('institute') || lower.includes('support'))
    ) {
      replyText = `DV Analytics provides 100% Dedicated Placement Assistance:
• 1-on-1 resume optimization & ATS formatting
• Technical mock interviews (SQL, Python, ML, GenAI)
• GitHub project portfolio reviews
• Direct referrals across 100+ hiring partners in Bangalore, Bhubaneswar, and nationwide
• Preparation for roles such as Data Analyst, Data Scientist, ML Engineer, and AI Solutions Consultant.`;
      spokenVoiceText = "DV Analytics provides 100% placement assistance, resume optimization, mock interviews, and connections with over 100 hiring partners.";
    }

    // ==========================================
    // CHATGPT / GEMINI LIVE CASUAL CONVERSATION FLOW (ADDRESSED TO SAJID)
    // ==========================================

    // Direct Greetings & Wake Word ("Hey Sanvi", "Hey Sunvi", "Hello", "Hi", "Hey ChatGPT", etc.)
    else if (
      cleanLower === 'hey sunvi' || cleanLower === 'hey sanvi' || 
      cleanLower === 'hi sunvi' || cleanLower === 'hi sanvi' ||
      cleanLower === 'hello sunvi' || cleanLower === 'hello sanvi' ||
      cleanLower === 'sunvi' || cleanLower === 'sanvi' ||
      cleanLower === 'hey' || cleanLower === 'hello' || cleanLower === 'hi' ||
      cleanLower === 'hey chatgpt' || cleanLower === 'hey gemini' ||
      cleanLower === 'hey sajid' ||
      cleanLower.startsWith('hey sanvi') || cleanLower.startsWith('hey sunvi') ||
      cleanLower.startsWith('hi sanvi') || cleanLower.startsWith('hi sunvi') ||
      cleanLower.startsWith('hello sanvi') || cleanLower.startsWith('hello sunvi') ||
      (hasSunviOrSanvi && (cleanLower.includes('there') || cleanLower.includes('listen') || cleanLower.split(' ').length <= 2))
    ) {
      replyText = "Hey Sajid! How are you doing today?";
      spokenVoiceText = "Hey Sajid! How are you doing today?";
    }

    // Casual chat: "What are you doing?" / "What are you up to?" / "What's up?"
    else if (
      lower.includes('what are you doing') || 
      lower.includes('what r u doing') || 
      lower.includes('what you doing') ||
      lower.includes('what are you up to') ||
      lower.includes('whats up') ||
      lower.includes("what's up")
    ) {
      replyText = "I'm good, Sajid! What about you?";
      spokenVoiceText = "I'm good, Sajid! What about you?";
    }

    // Casual chat: "How are you?" / "How are you doing?"
    else if (
      lower.includes('how are you') || 
      lower.includes('how r u') || 
      lower.includes('how are you doing') ||
      lower.includes('how is it going') ||
      lower.includes("how's it going")
    ) {
      replyText = "I'm doing great, Sajid! How is your day going?";
      spokenVoiceText = "I'm doing great, Sajid! How is your day going?";
    }

    // Casual response: "I am good", "Doing good", "I'm fine", etc.
    else if (
      lower === 'i am good' || lower === "i'm good" || lower === 'im good' ||
      lower === 'i am fine' || lower === "i'm fine" || lower === 'im fine' ||
      lower === 'doing good' || lower === 'doing well' || lower === 'all good' ||
      lower === 'good' || lower === 'great' || lower === 'fine' ||
      lower.includes('i am also good') || lower.includes("i'm also good")
    ) {
      replyText = "Glad to hear that, Sajid! What would you like to work on today?";
      spokenVoiceText = "Glad to hear that, Sajid! What would you like to work on today?";
    }

    // Casual chat: "Thank you" / "Thanks"
    else if (
      lower === 'thank you' || lower === 'thanks' || lower === 'thank you sanvi' ||
      lower === 'thanks sanvi' || lower.startsWith('thank you') || lower.startsWith('thanks')
    ) {
      replyText = "You're welcome, Sajid! Let me know whenever you need anything.";
      spokenVoiceText = "You're welcome, Sajid! Let me know whenever you need anything.";
    }

    // Who are you / Identity
    else if (lower.includes('who are you') || lower.includes('your name') || lower.includes('introduce')) {
      replyText = "Hello Sajid! I am Sanvi, your personal AI voice assistant for DV Analytics. I can chat with you, explain concepts like VLOOKUP, and open your LMS tools like Excel sheets!";
      spokenVoiceText = "Hello Sajid! I am Sanvi, your personal AI voice assistant for DV Analytics. How can I help you today?";
    }

    // ==========================================
    // CHATGPT-STYLE TECHNICAL INTELLIGENCE: POWERED BY GEMINI 2.5 FLASH API
    // Answers ANY technical question (VLOOKUP, SQL, Python, AI, etc.) directly!
    // ==========================================
    else {
      // Strip conversational filler speech
      const cleanPrompt = query
        .replace(/^(see uh,?\s*|uh,?\s*|hey sanvi,?\s*|hey sunvi,?\s*|sanvi,?\s*|sunvi,?\s*)/i, '')
        .trim();

      try {
        const aiResponse = await askSanviGemini(cleanPrompt || query, messages);
        if (aiResponse && aiResponse.trim().length > 0) {
          replyText = aiResponse.trim();
          spokenVoiceText = getConciseSpeechText(replyText);
        } else {
          replyText = `Here is the explanation for **${cleanPrompt || query}**:\n\nI am connected to DV Analytics AI engine. You can ask me to explain any Excel function (VLOOKUP, XLOOKUP, INDEX MATCH), write SQL queries, solve assignments, or execute LMS commands like opening an Excel sheet.`;
          spokenVoiceText = `Here is the explanation for ${cleanPrompt || query}. I have displayed the complete guide and formula on your screen.`;
        }
      } catch (_err) {
        replyText = `Here is the explanation for **${cleanPrompt || query}**:\n\nPlease check the details on your screen or ask me to open an Excel sheet or solve an assignment.`;
        spokenVoiceText = `I have displayed the information on your screen.`;
      }
    }

    setLastActionExecuted(actionType);

    const sanviMsgId = (Date.now() + 1).toString();
    const sanviReply = {
      id: sanviMsgId,
      sender: 'sanvi',
      timestamp: 'Just now',
      text: replyText,
      actionType: actionType
    };

    setMessages(prev => [...prev, sanviReply]);
    setIsProcessing(false);

    if (voiceEnabled) {
      speakSanviResponse(replyText, sanviMsgId, spokenVoiceText);
    }
  };
  handleSendMessageRef.current = handleSendMessage;

  return (
    <>
      {/* Floating Futuristic Sanvi Voice Assistant Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
          {/* Pulsing Helper Tooltip */}
          <div 
            onClick={() => {
              setIsOpen(true);
              setAlwaysListening(true);
              playWakeChime();
            }}
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 text-white border border-rose-500/30 shadow-xl backdrop-blur-md cursor-pointer hover:border-rose-400 transition-all group"
          >
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping"></span>
            <span className="text-xs font-semibold tracking-wide">
              Say <span className="text-rose-400 font-bold">"Hey Sanvi"</span>
            </span>
          </div>

          {/* Holographic Glowing Button */}
          <button
            onClick={() => {
              setIsOpen(true);
              setAlwaysListening(true);
              playWakeChime();
            }}
            aria-label="Open Sanvi AI Assistant"
            className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-slate-950 via-slate-900 to-rose-950 text-white flex items-center justify-center shadow-2xl shadow-rose-500/30 border-2 border-rose-400/60 hover:scale-105 active:scale-95 transition-all group cursor-pointer"
          >
            <div className="absolute inset-0 rounded-full border border-dashed border-rose-400/40 animate-spin-slow pointer-events-none"></div>
            <div className="absolute -inset-1 rounded-full bg-rose-500/20 blur-sm group-hover:bg-rose-500/40 transition-all pointer-events-none animate-pulse"></div>

            <div className="relative z-10 flex flex-col items-center justify-center">
              <Headphones className="w-5 h-5 text-rose-300 group-hover:text-rose-200 transition-transform group-hover:scale-110" />
              <span className="text-[9px] font-mono font-black text-rose-400 leading-none mt-0.5 tracking-tighter">
                SANVI
              </span>
            </div>
          </button>
        </div>
      )}

      {/* Main Sanvi Floating Window / Modal */}
      {isOpen && (
        <div 
          className={`fixed z-50 transition-all duration-300 flex flex-col ${
            isMinimized 
              ? 'bottom-6 right-6 w-80 h-16' 
              : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[95vw] sm:w-[540px] h-[680px] max-h-[92vh]'
          } bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-rose-500/40 backdrop-blur-xl overflow-hidden`}
        >
          {/* Header Bar */}
          <div className="px-4 py-3 bg-gradient-to-r from-slate-950 via-slate-900 to-rose-950/70 border-b border-rose-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Sanvi Avatar & Live State Indicator */}
              <div className="relative w-9 h-9 rounded-xl bg-slate-900 border border-rose-400/50 flex items-center justify-center shadow-inner shadow-rose-500/20">
                <span className={`absolute inset-0 rounded-xl ${isSpeaking ? 'bg-rose-500/30 animate-ping' : isWakeActive ? 'bg-emerald-500/30 animate-pulse' : 'bg-rose-400/10'}`}></span>
                <Headphones className="w-5 h-5 text-rose-400" />
                <span className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border border-slate-950 ${isSpeaking ? 'bg-cyan-400 animate-ping' : isWakeActive ? 'bg-emerald-400 animate-ping' : isListening ? 'bg-amber-400' : 'bg-slate-500'}`}></span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold tracking-wide text-white flex items-center gap-1.5">
                    Sanvi
                  </h3>
                </div>
                <p className="text-[11px] text-slate-400">
                  {isSpeaking 
                    ? "Sanvi is speaking..." 
                    : isProcessing 
                      ? "Sanvi is thinking..." 
                      : (isWakeActive || isOpen)
                        ? "🟢 Active • Listening to you (120s Mark-LIII session)..." 
                        : isListening 
                          ? "🎙️ Standby • Say 'Hey Sanvi' to speak" 
                          : "Mic Paused • Click mic to enable"}
                </p>
              </div>
            </div>

            {/* Window Controls */}
            <div className="flex items-center gap-1.5">
              {/* Always-Listening Mic Toggle */}
              <button
                onClick={toggleListening}
                title={alwaysListening ? "Always-On Mic Active" : "Mic Paused - Click to Enable"}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  alwaysListening 
                    ? 'text-emerald-400 bg-emerald-950/60 border border-emerald-500/40' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {alwaysListening ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
              </button>

              {/* TTS Voice Toggle */}
              <button
                onClick={() => {
                  const next = !voiceEnabled;
                  setVoiceEnabled(next);
                  if (!next) {
                    stopSpeaking();
                  } else {
                    speakSanviResponse("Sanvi voice is active.");
                  }
                }}
                title={voiceEnabled ? "Voice Output Active - Click to Test or Mute" : "Voice Output Muted - Click to Enable"}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  voiceEnabled 
                    ? 'text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 shadow-xs' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title={isMinimized ? "Expand" : "Minimize"}
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={handleClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors cursor-pointer"
                title="Close Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Live Voice Status Bar (When listening or speaking) */}
              <div className={`px-4 py-2 flex items-center justify-between text-xs font-semibold border-b ${
                isListening 
                  ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-300' 
                  : isSpeaking 
                    ? 'bg-rose-950/70 border-rose-500/40 text-rose-300' 
                    : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5 h-3.5">
                    <span className="w-1 bg-current rounded-full animate-bounce" style={{ height: '40%' }}></span>
                    <span className="w-1 bg-current rounded-full animate-bounce" style={{ height: '90%', animationDelay: '0.1s' }}></span>
                    <span className="w-1 bg-current rounded-full animate-bounce" style={{ height: '60%', animationDelay: '0.2s' }}></span>
                    <span className="w-1 bg-current rounded-full animate-bounce" style={{ height: '100%', animationDelay: '0.3s' }}></span>
                    <span className="w-1 bg-current rounded-full animate-bounce" style={{ height: '50%', animationDelay: '0.4s' }}></span>
                    <span className="w-1 bg-current rounded-full animate-bounce" style={{ height: '80%', animationDelay: '0.5s' }}></span>
                  </div>
                  <span className="truncate max-w-[280px] sm:max-w-md">
                    {isListening 
                      ? (interimSpeech ? `"${interimSpeech}"` : (isOpen ? 'Listening... Speak anything or give a command' : 'Say "Hey Sanvi" to activate')) 
                      : isSpeaking 
                        ? "Sanvi is speaking..." 
                        : "Mic Idle • Tap mic icon to start"}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {isSpeaking && (
                    <button
                      onClick={stopSpeaking}
                      className="px-2 py-0.5 rounded bg-rose-500 text-white text-[10px] font-bold hover:bg-rose-600 transition-all cursor-pointer"
                    >
                      Mute Voice
                    </button>
                  )}
                  {isListening && interimSpeech && (
                    <button
                      onClick={() => submitVoiceSpeech(activeTranscriptRef.current)}
                      className="px-2 py-0.5 rounded bg-emerald-500 text-white text-[10px] font-bold hover:bg-emerald-600 transition-all cursor-pointer"
                    >
                      Send
                    </button>
                  )}
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex border-b border-slate-800 bg-slate-900/60 px-2 text-xs font-semibold overflow-x-auto scrollbar-none">
                <button
                  onClick={() => setActiveTab('chat')}
                  className={`flex-1 py-2.5 px-2 text-center border-b-2 transition-all flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    activeTab === 'chat'
                      ? 'border-rose-400 text-rose-300 bg-slate-900'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Voice & Actions</span>
                </button>
                <button
                  onClick={() => setActiveTab('company')}
                  className={`flex-1 py-2.5 px-2 text-center border-b-2 transition-all flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    activeTab === 'company'
                      ? 'border-cyan-400 text-cyan-300 bg-slate-900'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>DV Portal & Founder</span>
                </button>
                <button
                  onClick={() => setActiveTab('assignments')}
                  className={`flex-1 py-2.5 px-2 text-center border-b-2 transition-all flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    activeTab === 'assignments'
                      ? 'border-orange-400 text-orange-300 bg-slate-900'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>Solutions</span>
                </button>
                <button
                  onClick={() => setActiveTab('helplines')}
                  className={`flex-1 py-2.5 px-2 text-center border-b-2 transition-all flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    activeTab === 'helplines'
                      ? 'border-emerald-400 text-emerald-300 bg-slate-900'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Helplines</span>
                </button>
                <button
                  onClick={() => setActiveTab('tools')}
                  className={`flex-1 py-2.5 px-2 text-center border-b-2 transition-all flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    activeTab === 'tools'
                      ? 'border-purple-400 text-purple-300 bg-slate-900'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Server className="w-3.5 h-3.5" />
                  <span>Tool Access</span>
                </button>
              </div>

              {/* Tab 1: Voice, Chat & Jarvis Action Engine */}
              {activeTab === 'chat' && (
                <div className="flex-1 flex flex-col min-h-0 bg-slate-950">
                  {/* Messages Feed */}
                  <div className="flex-1 p-4 overflow-y-auto space-y-3.5 scrollbar-thin">
                    {messages.map((m) => {
                      const isSanvi = m.sender === 'sanvi';
                      const isThisSpeaking = isSpeaking && activeSpeakingMsgId === m.id;

                      return (
                        <div
                          key={m.id}
                          className={`flex items-start gap-2.5 ${isSanvi ? '' : 'flex-row-reverse'}`}
                        >
                          {isSanvi && (
                            <div className="w-7 h-7 rounded-lg bg-rose-950 border border-rose-500/40 text-rose-400 flex items-center justify-center flex-shrink-0 text-xs font-bold font-mono">
                              S
                            </div>
                          )}
                          <div
                            className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed whitespace-pre-line group relative ${
                              isSanvi
                                ? 'bg-slate-900/90 text-slate-200 border border-rose-500/20 shadow-md'
                                : 'bg-gradient-to-r from-orange-500 to-amber-600 text-white font-medium shadow-md'
                            }`}
                          >
                            <div>{m.text}</div>

                            {/* Special Interactive Card if Excel action occurred */}
                            {m.actionType === 'excel_opened' && (
                              <div className="mt-3 p-3 bg-emerald-950/60 rounded-xl border border-emerald-500/40 space-y-2">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-1.5 font-bold text-emerald-300">
                                    <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                                    <span>Retail_Sales_Raw_Data.xlsx</span>
                                  </div>
                                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-900/50 px-2 py-0.5 rounded">
                                    Live Dataset
                                  </span>
                                </div>
                                <p className="text-[11px] text-emerald-200/80">
                                  Contains 12 transactional records with Customer names, Units, Unit Price, Gross, and Net Revenue formulas.
                                </p>
                                <div className="flex items-center gap-2 pt-1">
                                  <button
                                    onClick={() => setExcelModalOpen(true)}
                                    className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                                  >
                                    <FileSpreadsheet className="w-3.5 h-3.5" /> View Spreadsheet
                                  </button>
                                  <button
                                    onClick={() => generateAndDownloadExcel("DV_Analytics_Retail_Sales_Master.csv")}
                                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                                  >
                                    <Download className="w-3.5 h-3.5" /> Re-Download File
                                  </button>
                                </div>
                              </div>
                            )}

                            {/* Special Founder Badge if asked about Director / Founder */}
                            {m.actionType === 'founder_fact' && (
                              <div className="mt-3 p-3 bg-gradient-to-r from-slate-950 to-blue-950/60 rounded-xl border border-blue-500/40 flex items-center justify-between gap-3">
                                <div>
                                  <div className="flex items-center gap-1.5 font-bold text-blue-300">
                                    <Award className="w-4 h-4 text-blue-400" />
                                    <span>Debendra Das Debadutta</span>
                                  </div>
                                  <span className="text-[11px] text-slate-300">
                                    Founder & Managing Director of DV Analytics
                                  </span>
                                </div>
                                <a
                                  href="https://www.dvanalyticsmds.com/"
                                  target="_blank"
                                  rel="noreferrer"
                                  className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-[11px] font-bold transition-all flex items-center gap-1"
                                >
                                  <span>Website</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              </div>
                            )}

                            {/* Speaker Replay Button for Sanvi's answers */}
                            {isSanvi && (
                              <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                                <span>{m.timestamp}</span>
                                <button
                                  onClick={() => speakSanviResponse(m.text, m.id)}
                                  className={`flex items-center gap-1 px-2 py-0.5 rounded transition-all cursor-pointer ${
                                    isThisSpeaking 
                                      ? 'text-rose-400 bg-rose-950/60 font-bold' 
                                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                  }`}
                                  title="Listen to Sanvi speak this response"
                                >
                                  <Volume2 className="w-3 h-3" />
                                  <span>{isThisSpeaking ? "Speaking..." : "Replay Voice"}</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    {isProcessing && (
                      <div className="flex items-center gap-2 text-xs text-rose-400 font-semibold p-2">
                        <Sparkles className="w-4 h-4 animate-spin" />
                        <span>Sanvi is executing command...</span>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>

                  {/* Fast Action Suggestions */}
                  <div className="px-4 py-2 bg-slate-900/50 border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto text-[11px] whitespace-nowrap scrollbar-none">
                    <span className="text-slate-500 font-semibold flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-rose-400" /> Actions:
                    </span>
                    <button
                      onClick={() => handleSendMessage("Hey Sanvi")}
                      className="px-2.5 py-1 rounded-full bg-rose-900/40 text-rose-300 hover:bg-rose-800/50 transition-colors border border-rose-500/40 cursor-pointer font-bold"
                    >
                      "Hey Sanvi" 👋
                    </button>
                    <button
                      onClick={() => handleSendMessage("Open an Excel sheet")}
                      className="px-2.5 py-1 rounded-full bg-emerald-950/60 text-emerald-300 hover:bg-emerald-900/70 transition-colors border border-emerald-500/40 cursor-pointer font-bold flex items-center gap-1"
                    >
                      <FileSpreadsheet className="w-3 h-3" />
                      "Open Excel Sheet" 📊
                    </button>
                    <button
                      onClick={() => handleSendMessage("Who is the Director of DV Analytics?")}
                      className="px-2.5 py-1 rounded-full bg-blue-950/60 text-blue-300 hover:bg-blue-900/70 transition-colors border border-blue-500/40 cursor-pointer font-bold"
                    >
                      "Who is the Director?" 👤
                    </button>
                    <button
                      onClick={() => handleSendMessage("What courses and locations does DV Analytics have?")}
                      className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 hover:text-cyan-300 hover:bg-slate-700 transition-colors border border-slate-700/60 cursor-pointer"
                    >
                      Centers & Courses 🌐
                    </button>
                    <button
                      onClick={() => handleSendMessage("Can you please explain VLOOKUP in Excel?")}
                      className="px-2.5 py-1 rounded-full bg-emerald-950/60 text-emerald-300 hover:bg-emerald-900/70 transition-colors border border-emerald-500/40 cursor-pointer font-bold"
                    >
                      "Explain VLOOKUP" 📗
                    </button>
                    <button
                      onClick={() => handleSendMessage("Open assignments")}
                      className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 hover:text-orange-300 hover:bg-slate-700 transition-colors border border-slate-700/60 cursor-pointer"
                    >
                      Open Assignments
                    </button>
                  </div>

                  {/* Voice + Text Input Bar */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendMessage();
                    }}
                    className="p-3 border-t border-slate-800/80 bg-slate-900/80 flex items-center gap-2"
                  >
                    {/* Microphone Two-Way Voice Button */}
                    <button
                      type="button"
                      onClick={toggleListening}
                      title={alwaysListening ? "Always-On Mic Active (Say 'Hey Sanvi')" : "Click to enable Voice Listening"}
                      className={`p-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center relative ${
                        isListening
                          ? 'bg-emerald-600 text-white animate-pulse shadow-lg shadow-emerald-500/50'
                          : 'bg-slate-800 hover:bg-slate-700 text-rose-400 hover:text-rose-300 border border-slate-700'
                      }`}
                    >
                      {isListening ? (
                        <Mic className="w-4 h-4 text-white" />
                      ) : (
                        <MicOff className="w-4 h-4" />
                      )}
                    </button>

                    <input
                      type="text"
                      placeholder={isListening ? "Listening... Speak anything or ask Sanvi a question..." : "Speak or type to Sanvi (Say 'Hey Sanvi' or ask directly)..."}
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      className="flex-1 bg-slate-950 text-xs text-slate-200 placeholder:text-slate-500 px-3.5 py-2.5 rounded-xl border border-slate-800 focus:border-rose-400 focus:ring-1 focus:ring-rose-400 focus:outline-none transition-all"
                    />

                    <button
                      type="submit"
                      disabled={!inputMessage.trim()}
                      className="p-2.5 bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-400 hover:to-orange-400 disabled:opacity-40 text-white font-bold rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              )}

              {/* Tab 2: DV Analytics Official Portal & Founder Info */}
              {activeTab === 'company' && (
                <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950 scrollbar-thin">
                  {/* Founder Profile Card */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-blue-500/40 shadow-lg space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                        Official Founder Profile
                      </span>
                      <button
                        onClick={() => speakSanviResponse(`Debendra Das Debadutta is the founder and Managing Director of DV Analytics. He established DV Analytics to provide cutting-edge industrial training in Data Science, Artificial Intelligence, Generative AI, and Business Analytics.`)}
                        className="text-xs text-blue-400 hover:text-white flex items-center gap-1 cursor-pointer"
                      >
                        <Volume2 className="w-3.5 h-3.5" /> Read Aloud
                      </button>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        {dvCompanyProfile.founder}
                        <Check className="w-4 h-4 text-blue-400" />
                      </h3>
                      <p className="text-xs font-semibold text-blue-300">
                        {dvCompanyProfile.founderRole}
                      </p>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {dvCompanyProfile.founderBio}
                    </p>
                  </div>

                  {/* Company Quick Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Official Website</span>
                      <a 
                        href={dvCompanyProfile.website} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-xs font-semibold text-cyan-400 hover:underline flex items-center gap-1"
                      >
                        <span>www.dvanalyticsmds.com</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Official Support Email</span>
                      <a 
                        href={`mailto:${dvCompanyProfile.officialEmail}`}
                        className="text-xs font-semibold text-rose-300 hover:underline"
                      >
                        {dvCompanyProfile.officialEmail}
                      </a>
                    </div>
                  </div>

                  {/* Branches & Centers */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-rose-400" /> Training Centers & Branches:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {dvCompanyProfile.locations.map((loc, idx) => (
                        <div key={idx} className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                          <span className="text-xs font-bold text-white block">{loc.city}</span>
                          <span className="text-[11px] text-slate-400 block">{loc.role}</span>
                          <span className="text-[10px] text-slate-500 font-mono mt-1 block">{loc.country}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Programs Offered */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-orange-400" /> Featured Industry Cohorts:
                    </h4>
                    <div className="space-y-2">
                      {dvCompanyProfile.corePrograms.map((prog, idx) => (
                        <div key={idx} className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-white">{prog.name}</span>
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-300 border border-orange-500/30">
                                {prog.code}
                              </span>
                            </div>
                            <span className="text-[11px] text-slate-400 mt-0.5 block">
                              Duration: {prog.duration} • Tools: {prog.tools.slice(0, 5).join(', ')}...
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Placement Guarantee */}
                  <div className="p-3.5 bg-emerald-950/50 rounded-2xl border border-emerald-500/40 space-y-1.5">
                    <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                      <UserCheck className="w-4 h-4 text-emerald-400" />
                      {dvCompanyProfile.placementAssistance.guarantee}
                    </span>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      Tie-ups with {dvCompanyProfile.placementAssistance.hiringPartnersCount} across Bangalore, Bhubaneswar, and India. Includes 1-on-1 resume optimization, GitHub portfolio reviews, and technical mock interviews.
                    </p>
                  </div>
                </div>
              )}

              {/* Tab 3: Assignment Solutions */}
              {activeTab === 'assignments' && (
                <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950 scrollbar-thin">
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                      Select Cohort Assignment to Solve:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {assignmentsList.map((asn) => (
                        <button
                          key={asn.id}
                          onClick={() => setSelectedAsnKey(asn.id)}
                          className={`p-2.5 rounded-xl text-left border transition-all text-xs font-semibold cursor-pointer ${
                            selectedAsnKey === asn.id
                              ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800/70 hover:text-slate-200'
                          }`}
                        >
                          <span className="font-mono text-[10px] block opacity-75">{asn.id}</span>
                          <span className="truncate block mt-0.5">{asn.subject.split(' ')[0]}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {dvAssignmentSolutions[selectedAsnKey] && (
                    <div className="space-y-3.5 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                            Sanvi Assignment Guide
                          </span>
                          <button
                            onClick={() => speakSanviResponse(`Here is the guide for ${dvAssignmentSolutions[selectedAsnKey].title}: ${dvAssignmentSolutions[selectedAsnKey].guideSummary}`)}
                            className="text-xs text-rose-400 hover:text-white flex items-center gap-1 cursor-pointer"
                          >
                            <Volume2 className="w-3.5 h-3.5" /> Read Aloud
                          </button>
                        </div>
                        <h4 className="text-sm font-bold text-white mt-1.5">
                          {dvAssignmentSolutions[selectedAsnKey].title}
                        </h4>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                          {dvAssignmentSolutions[selectedAsnKey].guideSummary}
                        </p>
                      </div>

                      {dvAssignmentSolutions[selectedAsnKey].keyFormulas && (
                        <div className="space-y-1.5">
                          <span className="text-[11px] font-bold text-slate-300 block">
                            Key Excel Formulas:
                          </span>
                          {dvAssignmentSolutions[selectedAsnKey].keyFormulas.map((formula, idx) => (
                            <div 
                              key={idx}
                              className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between gap-2"
                            >
                              <code className="text-[11px] font-mono text-emerald-400 truncate">
                                {formula}
                              </code>
                              <button
                                onClick={() => handleCopy(formula, `f-${idx}`)}
                                className="p-1 text-slate-400 hover:text-white cursor-pointer"
                                title="Copy Formula"
                              >
                                {copiedText === `f-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      {dvAssignmentSolutions[selectedAsnKey].vbaSnippet && (
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-slate-300">
                              VBA Macro Code:
                            </span>
                            <button
                              onClick={() => handleCopy(dvAssignmentSolutions[selectedAsnKey].vbaSnippet, 'vba')}
                              className="text-[11px] text-rose-400 flex items-center gap-1 hover:underline cursor-pointer"
                            >
                              {copiedText === 'vba' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                              Copy Macro
                            </button>
                          </div>
                          <pre className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] font-mono text-rose-300 overflow-x-auto max-h-40">
                            {dvAssignmentSolutions[selectedAsnKey].vbaSnippet}
                          </pre>
                        </div>
                      )}

                      {dvAssignmentSolutions[selectedAsnKey].sqlSnippet && (
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-slate-300">
                              Optimized SQL Solution:
                            </span>
                            <button
                              onClick={() => handleCopy(dvAssignmentSolutions[selectedAsnKey].sqlSnippet, 'sql')}
                              className="text-[11px] text-rose-400 flex items-center gap-1 hover:underline cursor-pointer"
                            >
                              {copiedText === 'sql' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                              Copy SQL
                            </button>
                          </div>
                          <pre className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] font-mono text-rose-300 overflow-x-auto max-h-40">
                            {dvAssignmentSolutions[selectedAsnKey].sqlSnippet}
                          </pre>
                        </div>
                      )}

                      <div className="pt-2 border-t border-slate-800 space-y-1.5">
                        <span className="text-[11px] font-bold text-slate-300 block">
                          Step-by-Step Implementation Guide:
                        </span>
                        {dvAssignmentSolutions[selectedAsnKey].stepByStep.map((step, idx) => (
                          <div key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 flex-shrink-0"></span>
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 4: Coordinator & Helpline Directory */}
              {activeTab === 'helplines' && (
                <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-950 scrollbar-thin">
                  <div className="p-3 bg-gradient-to-r from-emerald-950/40 to-slate-900 rounded-2xl border border-emerald-500/30">
                    <span className="text-[10px] font-bold uppercase text-emerald-400">
                      Sanvi Direct Support Directory
                    </span>
                    <p className="text-xs text-slate-300 mt-1">
                      Direct lines to program coordinators, faculty doubt escalation, and server IT admin.
                    </p>
                  </div>

                  {Object.entries(dvHelplineNumbers).map(([key, item]) => (
                    <div 
                      key={key}
                      className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-white">{item.name}</h4>
                          <span className="text-[10px] text-slate-400">
                            POC: <strong className="text-slate-200">{item.contactPerson}</strong>
                          </span>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                          {item.phone}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-400 leading-snug">
                        {item.purpose}
                      </p>

                      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
                        <span className="text-[10px] text-slate-500">{item.timings}</span>
                        <div className="flex items-center gap-2">
                          {item.whatsappLink && (
                            <a
                              href={item.whatsappLink}
                              target="_blank"
                              rel="noreferrer"
                              className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] flex items-center gap-1 transition-all"
                            >
                              <MessageSquare className="w-3 h-3" /> WhatsApp
                            </a>
                          )}
                          <a
                            href={`tel:${item.phone.replace(/[^0-9+]/g, '')}`}
                            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-[10px] flex items-center gap-1 transition-all"
                          >
                            <PhoneCall className="w-3 h-3 text-rose-400" /> Call
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 5: Tool Connections Guide */}
              {activeTab === 'tools' && (
                <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-950 scrollbar-thin">
                  <div className="p-3 bg-gradient-to-r from-purple-950/40 to-slate-900 rounded-2xl border border-purple-500/30">
                    <span className="text-[10px] font-bold uppercase text-purple-400">
                      DV Analytics Environment Integrations
                    </span>
                    <p className="text-xs text-slate-300 mt-1">
                      Which tool do you need to connect? Connect your local or cloud IDE to the server cluster.
                    </p>
                  </div>

                  {dvToolConnections.map((tc, idx) => (
                    <div 
                      key={idx}
                      className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Server className="w-4 h-4 text-rose-400" />
                          <h4 className="text-xs font-bold text-white">{tc.tool}</h4>
                        </div>
                        <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          {tc.status}
                        </span>
                      </div>

                      <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 flex items-center justify-between gap-2">
                        <div className="truncate">
                          <span className="text-[10px] text-slate-500 block">Host / Endpoint:</span>
                          <code className="text-xs font-mono text-rose-300 truncate">
                            {tc.endpoint}
                          </code>
                        </div>
                        <button
                          onClick={() => handleCopy(tc.endpoint, `tc-${idx}`)}
                          className="p-1.5 text-slate-400 hover:text-white cursor-pointer"
                          title="Copy Endpoint"
                        >
                          {copiedText === `tc-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      <p className="text-[11px] text-slate-400">
                        {tc.credentialsGuide}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Interactive Excel Sheet Modal (Auto-opened by Sanvi or user) */}
      <ExcelSheetViewerModal
        isOpen={excelModalOpen}
        onClose={() => setExcelModalOpen(false)}
      />
    </>
  );
}
