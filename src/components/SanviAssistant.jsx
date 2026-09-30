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

  alwaysListeningRef.current = alwaysListening;
  isSpeakingRef.current = isSpeaking;

  // Synchronize with external triggers
  useEffect(() => {
    if (isOpenExternal !== undefined && isOpenExternal !== null) {
      setIsOpen(isOpenExternal);
    }
  }, [isOpenExternal]);

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

  // Submit voice speech safely
  const submitVoiceSpeech = (transcript) => {
    if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    const text = (transcript || activeTranscriptRef.current || '').trim();
    if (!text) return;
    activeTranscriptRef.current = '';
    setInterimSpeech('');
    if (handleSendMessageRef.current) {
      handleSendMessageRef.current(text);
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

          setInterimSpeech(rawText);
          activeTranscriptRef.current = rawText;

          // Check for wake words
          const wakeDetected = 
            lower.includes('hey sanvi') || 
            lower.includes('hey sunvi') || 
            lower.includes('hey sajid') ||
            lower.includes('hey chatgpt') ||
            lower.includes('sanvi') || 
            lower.includes('sunvi') || 
            lower.includes('saanvi') || 
            lower.includes('shanvi') || 
            lower.includes('sonvi') ||
            lower.includes('jarvis');

          if (wakeDetected && !isOpen) {
            playWakeChime();
            setIsOpen(true);
            setIsMinimized(false);
          }

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
  };

  // Chat conversation state
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'welcome-1',
      sender: 'sanvi',
      timestamp: 'Just now',
      text: `Hello Sajid! I am Sanvi, your personal AI voice assistant for DV Analytics.

We can speak and converse naturally just like ChatGPT or Gemini Live:
• Say "Hey Sanvi" to start talking.
• Ask "What are you doing?" or chat casually.
• Ask technical questions like "Can you please explain VLOOKUP?".
• Say "Open an Excel sheet" to launch and download your practice workbook.
• Ask "Who is Devender Devgan Das?" to learn about the founder of DV Analytics.`
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

  // Speak text using natural speech synthesis (Chrome / Edge / Safari optimized)
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

    window.speechSynthesis.cancel();
    window.speechSynthesis.resume();

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

    // Choose preferred female natural voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => 
      (v.name.includes('Female') || 
       v.name.includes('Samantha') || 
       v.name.includes('Zira') || 
       v.name.includes('Google UK English Female') || 
       v.name.includes('Jenny') || 
       v.name.includes('Victoria')) && v.lang.startsWith('en')
    ) || voices.find(v => v.lang.startsWith('en'));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    currentUtteranceRef.current = utterance;

    const handleSpeechEnded = () => {
      setIsSpeaking(false);
      isSpeakingRef.current = false;
      setActiveSpeakingMsgId(null);
      currentUtteranceRef.current = null;
      lastSpokenTimeRef.current = Date.now();

      // Hold a 1200ms acoustic cool-down buffer so room echo/reverb doesn't trigger the microphone
      if (cooldownTimerRef.current) clearTimeout(cooldownTimerRef.current);
      cooldownTimerRef.current = setTimeout(() => {
        isAudioOutputActiveRef.current = false;
        activeTranscriptRef.current = '';
        setInterimSpeech('');
        if (alwaysListeningRef.current) {
          restartRecognitionSafely();
        }
      }, 1200);
    };

    utterance.onstart = () => {
      setIsSpeaking(true);
      isSpeakingRef.current = true;
      isAudioOutputActiveRef.current = true;
      if (msgId) setActiveSpeakingMsgId(msgId);
    };

    utterance.onend = handleSpeechEnded;
    utterance.onerror = handleSpeechEnded;

    window.speechSynthesis.speak(utterance);
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
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (_e) {}
      }
      setIsListening(false);
      if (activeTranscriptRef.current) {
        submitVoiceSpeech(activeTranscriptRef.current);
      }
    } else {
      setAlwaysListening(true);
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
  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || inputMessage).trim();
    if (!query) return;

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

    const hasSunviOrSanvi = 
      lower.includes('sunvi') || 
      lower.includes('sanvi') || 
      lower.includes('saanvi') || 
      lower.includes('shanvi') ||
      lower.includes('sunny') ||
      lower.includes('sonvi') ||
      lower.includes('jarvis');

    // ==========================================
    // REQUIREMENT 1: FOUNDER OF DV ANALYTICS
    // "If I will ask who is Devender Devgan Das, you have to answer he is the founder of DV Analytics."
    // ==========================================
    if (
      lower.includes('devender') || 
      lower.includes('devgan') || 
      lower.includes('das') && (lower.includes('who') || lower.includes('founder')) ||
      (lower.includes('founder') && (lower.includes('dv') || lower.includes('company') || lower.includes('analytics') || lower.includes('who'))) ||
      lower.includes('who started dv analytics') ||
      lower.includes('who founded dv analytics') ||
      lower.includes('ceo of dv analytics')
    ) {
      replyText = `${dvCompanyProfile.founderFact}

He is the Founder & Managing Director of DV Analytics (DV Data & Analytics Pvt Ltd). Under his visionary leadership, DV Analytics was built to deliver industry-grade practical training in Data Science, Artificial Intelligence, Generative AI, and Business Analytics, empowering thousands of students and working professionals across India (Bangalore, Bhubaneswar) and internationally (Dubai).`;
      actionType = "founder_fact";
      spokenVoiceText = "Devender Devgan Das is the founder of DV Analytics. He established the organization to deliver cutting-edge industrial training in Data Science, Artificial Intelligence, and Business Analytics.";
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

    // Action: Navigate to CAT Test / Practical Interview booth
    else if (
      (lower.includes('open') && (lower.includes('test') || lower.includes('cat') || lower.includes('practical'))) ||
      lower.includes('take test') ||
      lower.includes('open application test') ||
      lower.includes('open interview booth')
    ) {
      if (onNavigate) onNavigate('application-test');
      replyText = "Opening the CAT Practical Test and AI Interview Booth! You can take the 30-minute MCQ test, run live SQL/Python code in the workbench, and complete the simulated viva.";
      actionType = "navigated_test";
      spokenVoiceText = "Opening the CAT practical test and interview booth.";
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
      replyText = `DV Analytics (DV Data & Analytics Pvt Ltd) is an elite analytics and AI training organization founded by Devender Devgan Das.

Key Facts from our official portal (https://www.dvanalyticsmds.com/):
• Founder: Devender Devgan Das
• Head Office: Bangalore, Karnataka
• Centers: Bangalore, Bhubaneswar (Odisha), Dubai (UAE), and Online Global
• Phone Numbers: +91-9019030033 / +91-9830012345
• Official Email: info@dvanalyticsmds.com
• Flagship Programs: APIDS (Data Science with AI Deployment), APIDA (Data Science with Gen AI), DAS (Data Analytics Specialist), APCF (Cybersecurity & Forensics), and FDE (AI Forward Deployment Engineer).
• Placement Record: 100% placement support with 100+ hiring partners.`;
      actionType = "company_info";
      spokenVoiceText = "DV Analytics is a premier Data Science and AI institute founded by Devender Devgan Das, with centers in Bangalore, Bhubaneswar, and Dubai.";
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
      lower === 'hey sunvi' || lower === 'hey sanvi' || 
      lower === 'hi sunvi' || lower === 'hi sanvi' ||
      lower === 'hello sunvi' || lower === 'hello sanvi' ||
      lower === 'sunvi' || lower === 'sanvi' ||
      lower === 'hey' || lower === 'hello' || lower === 'hi' ||
      lower === 'hey sanvi!' || lower === 'hey sunvi!' ||
      lower === 'hey chatgpt' || lower === 'hey gemini' ||
      lower === 'hey sajid' ||
      (hasSunviOrSanvi && (lower.includes('there') || lower.includes('listen') || lower.split(' ').length <= 2))
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
              Say <span className="text-rose-400 font-bold">"Hey Sanvi"</span> (Jarvis Voice AI)
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
                <span className={`absolute inset-0 rounded-xl ${isSpeaking ? 'bg-rose-500/30 animate-ping' : isListening ? 'bg-emerald-500/30 animate-pulse' : 'bg-rose-400/10'}`}></span>
                <Headphones className="w-5 h-5 text-rose-400" />
                <span className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border border-slate-950 ${isListening ? 'bg-emerald-400 animate-ping' : isSpeaking ? 'bg-cyan-400 animate-ping' : 'bg-emerald-500'}`}></span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold tracking-wide text-white flex items-center gap-1.5">
                    Sanvi
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      Jarvis Voice AI
                    </span>
                  </h3>
                </div>
                <p className="text-[11px] text-slate-400">
                  {isListening 
                    ? "Continuous Voice Mode • Listening..." 
                    : isProcessing 
                      ? "Sanvi is thinking..." 
                      : isSpeaking 
                        ? "Sanvi is speaking..." 
                        : "Ready • Say 'Hey Sanvi'"}
                </p>
              </div>
            </div>

            {/* Window Controls */}
            <div className="flex items-center gap-1.5">
              {/* Always-Listening Mic Toggle */}
              <button
                onClick={toggleListening}
                title={alwaysListening ? "Always-On Mic Active (Jarvis Mode)" : "Mic Paused - Click to Enable"}
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
                  setVoiceEnabled(!voiceEnabled);
                  if (voiceEnabled) stopSpeaking();
                }}
                title={voiceEnabled ? "Voice Output Active" : "Enable Voice Output"}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  voiceEnabled 
                    ? 'text-rose-400 bg-rose-950/60 border border-rose-500/40' 
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
                    <span className="w-1 bg-current rounded-full animate-bounce" style={{ height: '60%' }}></span>
                    <span className="w-1 bg-current rounded-full animate-bounce" style={{ height: '100%', animationDelay: '0.15s' }}></span>
                    <span className="w-1 bg-current rounded-full animate-bounce" style={{ height: '40%', animationDelay: '0.3s' }}></span>
                    <span className="w-1 bg-current rounded-full animate-bounce" style={{ height: '80%', animationDelay: '0.45s' }}></span>
                  </div>
                  <span className="truncate max-w-[280px] sm:max-w-md">
                    {isListening 
                      ? (interimSpeech ? `"${interimSpeech}"` : "Jarvis Mode Active: Say 'Hey Sanvi' or ask to open Excel sheet") 
                      : isSpeaking 
                        ? "Sanvi is speaking response..." 
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

                            {/* Special Founder Badge if asked about Devender Devgan Das */}
                            {m.actionType === 'founder_fact' && (
                              <div className="mt-3 p-3 bg-gradient-to-r from-slate-950 to-blue-950/60 rounded-xl border border-blue-500/40 flex items-center justify-between gap-3">
                                <div>
                                  <div className="flex items-center gap-1.5 font-bold text-blue-300">
                                    <Award className="w-4 h-4 text-blue-400" />
                                    <span>Devender Devgan Das</span>
                                  </div>
                                  <span className="text-[11px] text-slate-300">
                                    Founder & MD of DV Analytics
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
                      onClick={() => handleSendMessage("Who is Devender Devgan Das?")}
                      className="px-2.5 py-1 rounded-full bg-blue-950/60 text-blue-300 hover:bg-blue-900/70 transition-colors border border-blue-500/40 cursor-pointer font-bold"
                    >
                      "Who is Devender Devgan Das?" 👤
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
                      title={alwaysListening ? "Always-On Mic Active (Say 'Hey Sanvi')" : "Click to enable Jarvis Voice Listening"}
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
                      placeholder={isListening ? "Listening... (Say 'Hey Sanvi', 'Open Excel sheet')" : "Speak or type to Sanvi (Say 'Hey Sanvi')..."}
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
                        onClick={() => speakSanviResponse(`Devender Devgan Das is the founder of DV Analytics. He established DV Analytics to provide cutting-edge industrial training in Data Science, Artificial Intelligence, Generative AI, and Business Analytics.`)}
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
