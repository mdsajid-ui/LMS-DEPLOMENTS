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
  Headphones
} from 'lucide-react';
import { 
  dvHelplineNumbers, 
  dvToolConnections, 
  dvAssignmentSolutions, 
  assignmentsList,
  studentProfile 
} from '../data/mockData';

export default function SanviAssistant({ isOpenExternal, onCloseExternal }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat'); // 'chat', 'assignments', 'helplines', 'tools'
  const [selectedAsnKey, setSelectedAsnKey] = useState('ASN-01');
  const [copiedText, setCopiedText] = useState(null);
  
  // Voice states
  const [voiceEnabled, setVoiceEnabled] = useState(true); // default true for 2-way voice
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [interimSpeech, setInterimSpeech] = useState('');
  const [activeSpeakingMsgId, setActiveSpeakingMsgId] = useState(null);
  const [isMinimized, setIsMinimized] = useState(false);

  const recognitionRef = useRef(null);
  const synthRef = useRef(null);
  const handleSendMessageRef = useRef(null);
  const activeTranscriptRef = useRef('');
  const silenceTimerRef = useRef(null);

  // Synchronize with external triggers
  useEffect(() => {
    if (isOpenExternal !== undefined && isOpenExternal !== null) {
      setIsOpen(isOpenExternal);
    }
  }, [isOpenExternal]);

  // Pre-load voices for natural synthesis
  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      synthRef.current = window.speechSynthesis;
      // Pre-warm voices
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
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
    setIsListening(false);
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (_e) {}
    }
    if (handleSendMessageRef.current) {
      handleSendMessageRef.current(text);
    }
  };

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
          setIsListening(true);
          setInterimSpeech('');
          activeTranscriptRef.current = '';
        };

        recognition.onresult = (event) => {
          let currentTranscript = '';
          let isFinalDetected = false;

          for (let i = 0; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript + ' ';
            if (event.results[i].isFinal) {
              isFinalDetected = true;
            }
          }

          currentTranscript = currentTranscript.trim();
          activeTranscriptRef.current = currentTranscript;
          setInterimSpeech(currentTranscript);

          // Clear previous silence timer
          if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);

          if (isFinalDetected) {
            submitVoiceSpeech(currentTranscript);
          } else {
            // Auto submit if user pauses speaking for 1.3 seconds
            silenceTimerRef.current = setTimeout(() => {
              if (activeTranscriptRef.current) {
                submitVoiceSpeech(activeTranscriptRef.current);
              }
            }, 1300);
          }
        };

        recognition.onerror = () => {
          setIsListening(false);
          if (activeTranscriptRef.current) {
            submitVoiceSpeech(activeTranscriptRef.current);
          }
        };

        recognition.onend = () => {
          setIsListening(false);
          if (activeTranscriptRef.current) {
            submitVoiceSpeech(activeTranscriptRef.current);
          }
        };

        recognitionRef.current = recognition;
      }
    }

    return () => {
      if (synthRef.current) synthRef.current.cancel();
      if (recognitionRef.current) recognitionRef.current.stop();
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    if (onCloseExternal) onCloseExternal();
    if (synthRef.current) synthRef.current.cancel();
    if (recognitionRef.current) recognitionRef.current.stop();
    setIsSpeaking(false);
    setIsListening(false);
  };

  // Chat conversation state
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'welcome-1',
      sender: 'sanvi',
      timestamp: 'Just now',
      text: `Hello ${studentProfile.name.split(' ')[0]}! I am Sanvi, your personal AI voice assistant for DV Analytics. You can say "Hey Sunvi" or "Hey Sanvi" to speak with me, ask for assignment solutions, or connect with your academic coordinator. How can I assist you right now?`
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

  // Speak text using natural speech synthesis
  const speakSanviResponse = (text, msgId = null) => {
    if (!window.speechSynthesis) return;

    // Crucial for Chrome on Windows: resume synthesis
    window.speechSynthesis.resume();
    window.speechSynthesis.cancel();

    // Clean markdown symbols for natural speech
    const cleanText = text
      .replace(/[*#_`]/g, '')
      .replace(/₹/g, 'Rupees ')
      .replace(/ASN-01/g, 'Assignment 1')
      .replace(/ASN-02/g, 'Assignment 2')
      .replace(/ASN-03/g, 'Assignment 3')
      .replace(/XLOOKUP/g, 'X-Lookup')
      .replace(/DENSE_RANK/g, 'Dense Rank');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.05; // natural friendly tone

    // Choose preferred natural female voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => 
      (v.name.includes('Female') || v.name.includes('Samantha') || v.name.includes('Zira') || v.name.includes('Google UK English Female') || v.name.includes('Natural') || v.name.includes('Victoria')) && v.lang.startsWith('en')
    ) || voices.find(v => v.lang.startsWith('en'));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      if (msgId) setActiveSpeakingMsgId(msgId);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setActiveSpeakingMsgId(null);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setActiveSpeakingMsgId(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setActiveSpeakingMsgId(null);
    }
  };

  // Toggle Microphone
  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsListening(false);
      if (activeTranscriptRef.current) {
        submitVoiceSpeech(activeTranscriptRef.current);
      }
    } else {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      setIsSpeaking(false);
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (_e) {
          recognitionRef.current.stop();
          setTimeout(() => {
            try { recognitionRef.current.start(); } catch (_err) {}
          }, 250);
        }
      } else {
        alert("Speech Recognition is not supported in this browser. Please use Google Chrome, Microsoft Edge, or Safari.");
      }
    }
  };

  // Process user chat message
  const handleSendMessage = (textToSend) => {
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

    // Sanvi AI reasoning response logic
    setTimeout(() => {
      setIsProcessing(false);
      let replyText = "";
      const lower = query.toLowerCase().trim();

      const hasSunviOrSanvi = lower.includes('sunvi') || 
                              lower.includes('sanvi') || 
                              lower.includes('saanvi') || 
                              lower.includes('shanvi') ||
                              lower.includes('sunny') ||
                              lower.includes('sonvi');

      // 1. Direct Greetings & Wake Word ("Hey Sunvi", "Hey Sanvi", "Hello Sunvi", "Hi", etc.)
      if (
        lower === 'hey sunvi' || lower === 'hey sanvi' || 
        lower === 'hi sunvi' || lower === 'hi sanvi' ||
        lower === 'hello sunvi' || lower === 'hello sanvi' ||
        lower === 'sunvi' || lower === 'sanvi' ||
        lower === 'hey' || lower === 'hello' || lower === 'hi' ||
        lower.startsWith('hey sunvi') || lower.startsWith('hey sanvi') ||
        lower.startsWith('hi sunvi') || lower.startsWith('hi sanvi') ||
        lower.startsWith('hello sunvi') || lower.startsWith('hello sanvi') ||
        (hasSunviOrSanvi && (lower.includes('there') || lower.includes('listen') || lower.includes('hello') || lower.includes('hey') || lower.includes('hi') || lower.split(' ').length <= 3))
      ) {
        replyText = "Hello! Yes, I am Sanvi and I am right here listening to you. How can I help you today? Would you like assistance with your assignments, checking your watch time, or connecting with your academic coordinator?";
      } else if (lower.includes('who are you') || lower.includes('your name') || lower.includes('introduce')) {
        replyText = "Hello! My name is Sanvi. I am your personal AI voice assistant at DV Analytics. I'm here to solve your assignments, answer technical questions in Python, SQL, and Excel, and help coordinate your learning journey!";
      } else if (lower.includes('how are you') || lower.includes('how r u')) {
        replyText = "I am doing wonderful, thank you! Ready to help you with your analytics coursework and assignments. What are you working on right now?";
      } else if (lower.includes('thank') || lower.includes('thx')) {
        replyText = "You are most welcome! Let me know if you need help with anything else. Happy learning!";
      } else if (lower.includes('coordinator') || lower.includes('phone') || lower.includes('number') || lower.includes('call') || lower.includes('contact')) {
        replyText = `You can directly reach your Academic Coordinator (${dvHelplineNumbers.academicCoordinator.contactPerson}) at ${dvHelplineNumbers.academicCoordinator.phone}. Timings are ${dvHelplineNumbers.academicCoordinator.timings}. You can also connect via WhatsApp in the Helplines tab!`;
      } else if (lower.includes('watch time') || lower.includes('recording') || lower.includes('attendance') || lower.includes('progress')) {
        replyText = `Great progress! You have watched ${studentProfile.watchedRecordedHours} hours out of ${studentProfile.totalRecordedHours} hours of recorded lectures (${studentProfile.watchedPercent}%). Your live attendance is at ${studentProfile.attendancePercent}%, and you are on a ${studentProfile.streakDays}-day streak.`;
      } else if (lower.includes('asn-01') || lower.includes('retail') || (lower.includes('assignment') && lower.includes('excel')) || lower.includes('assignment 1') || lower.includes('first assignment')) {
        replyText = `For Assignment 1 (Retail Sales Analysis): 
1. Use XLOOKUP with concatenated criteria to map product SKUs.
2. Calculate Net Revenue as Gross Revenue multiplied by 1 minus discount percentage.
3. Build a dynamic pivot table with category slicers. Check the 'Assignments' tab for the full formula guide!`;
      } else if (lower.includes('asn-02') || lower.includes('vba') || lower.includes('macro') || lower.includes('invoice') || lower.includes('assignment 2') || lower.includes('second assignment')) {
        replyText = `For Assignment 2 (VBA Invoice Generator): Make sure your workbook is saved as .xlsm. Use the ExportAsFixedFormat method with xlTypePDF to generate your branded invoice. Check the Assignments tab for the copyable macro code.`;
      } else if (lower.includes('asn-03') || lower.includes('sql') || lower.includes('database') || lower.includes('schema') || lower.includes('assignment 3') || lower.includes('third assignment')) {
        replyText = `For Assignment 3 (SQL Server E-Commerce): Use DENSE_RANK() OVER (ORDER BY total_spent DESC) to rank high-value buyers, and calculate churn with DATEDIFF on customer orders. You scored 94 on this submission!`;
      } else if (lower.includes('tool') || lower.includes('connect') || lower.includes('jupyter') || lower.includes('ssms') || lower.includes('power bi')) {
        replyText = `You can connect to JupyterLab at ${dvToolConnections[0].endpoint}, and SQL Server database ${dvToolConnections[1].database} on port 1433. View full credentials under the Tools tab.`;
      } else if (lower.includes('interview') || lower.includes('kit') || lower.includes('step')) {
        replyText = `Your Interview Prep Kit includes 7 colored step folders covering ATS Resume Building, SQL Mastery, Excel Modeling, Python vectorization, Machine Learning, Case Studies, and HR Salary Negotiation!`;
      } else {
        replyText = `I heard: "${query}". I am right here to help! You can ask me to solve any of your 3 assignments, check your live vs recorded watch time, explain SQL or Excel formulas, or get the phone number for the academic coordinator. What would you like to do?`;
      }

      const sanviMsgId = (Date.now() + 1).toString();
      const sanviReply = {
        id: sanviMsgId,
        sender: 'sanvi',
        timestamp: 'Just now',
        text: replyText
      };

      setMessages(prev => [...prev, sanviReply]);

      if (voiceEnabled) {
        speakSanviResponse(replyText, sanviMsgId);
      }
    }, 600);
  };
  handleSendMessageRef.current = handleSendMessage;

  return (
    <>
      {/* Floating Futuristic Sanvi Voice Assistant Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
          {/* Pulsing Helper Tooltip */}
          <div 
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 text-white border border-rose-500/30 shadow-xl backdrop-blur-md cursor-pointer hover:border-rose-400 transition-all group"
          >
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping"></span>
            <span className="text-xs font-semibold tracking-wide">
              Say <span className="text-rose-400 font-bold">"Hey Sunvi"</span> (Voice AI)
            </span>
          </div>

          {/* Holographic Glowing Button */}
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open Sanvi AI Assistant"
            className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-slate-950 via-slate-900 to-rose-950 text-white flex items-center justify-center shadow-2xl shadow-rose-500/30 border-2 border-rose-400/60 hover:scale-105 active:scale-95 transition-all group cursor-pointer"
          >
            {/* Outer Rotating Arc Reactor Rings */}
            <div className="absolute inset-0 rounded-full border border-dashed border-rose-400/40 animate-spin-slow pointer-events-none"></div>
            <div className="absolute -inset-1 rounded-full bg-rose-500/20 blur-sm group-hover:bg-rose-500/40 transition-all pointer-events-none animate-pulse"></div>

            {/* Glowing Center Core */}
            <div className="relative z-10 flex flex-col items-center justify-center">
              <Headphones className="w-5 h-5 text-rose-300 group-hover:text-rose-200 transition-transform group-hover:scale-110" />
              <span className="text-[9px] font-mono font-black text-rose-400 leading-none mt-0.5 tracking-tighter">
                SANVI
              </span>
            </div>
          </button>
        </div>
      )}

      {/* Main Sanvi Voice Floating Window / Modal */}
      {isOpen && (
        <div 
          className={`fixed z-50 transition-all duration-300 flex flex-col ${
            isMinimized 
              ? 'bottom-6 right-6 w-80 h-16' 
              : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[95vw] sm:w-[520px] h-[660px] max-h-[92vh]'
          } bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-rose-500/40 backdrop-blur-xl overflow-hidden`}
        >
          {/* Header Bar */}
          <div className="px-4 py-3.5 bg-gradient-to-r from-slate-950 via-slate-900 to-rose-950/70 border-b border-rose-500/30 flex items-center justify-between">
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
                      Two-Way Voice AI
                    </span>
                  </h3>
                </div>
                <p className="text-[11px] text-slate-400">
                  {isListening 
                    ? "Listening to your voice..." 
                    : isProcessing 
                      ? "Sanvi is thinking..." 
                      : isSpeaking 
                        ? "Sanvi is speaking..." 
                        : "Ready • Tap Mic or say 'Hey Sunvi'"}
                </p>
              </div>
            </div>

            {/* Window Controls */}
            <div className="flex items-center gap-1.5">
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
              {(isListening || isSpeaking || isProcessing) && (
                <div className={`px-4 py-2 flex items-center justify-between text-xs font-semibold border-b ${
                  isListening 
                    ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-300' 
                    : isSpeaking 
                      ? 'bg-rose-950/70 border-rose-500/40 text-rose-300' 
                      : 'bg-cyan-950/70 border-cyan-500/40 text-cyan-300'
                }`}>
                  <div className="flex items-center gap-2">
                    {/* Animated sound wave bars */}
                    <div className="flex items-center gap-0.5 h-3.5">
                      <span className="w-1 bg-current rounded-full animate-bounce" style={{ height: '60%' }}></span>
                      <span className="w-1 bg-current rounded-full animate-bounce" style={{ height: '100%', animationDelay: '0.15s' }}></span>
                      <span className="w-1 bg-current rounded-full animate-bounce" style={{ height: '40%', animationDelay: '0.3s' }}></span>
                      <span className="w-1 bg-current rounded-full animate-bounce" style={{ height: '80%', animationDelay: '0.45s' }}></span>
                    </div>
                    <span>
                      {isListening 
                        ? (interimSpeech ? `"${interimSpeech}"` : "Listening... Say 'Hey Sunvi' or your question now") 
                        : isSpeaking 
                          ? "Sanvi is speaking response..." 
                          : "Processing your request..."}
                    </span>
                  </div>

                  {isSpeaking && (
                    <button
                      onClick={stopSpeaking}
                      className="px-2 py-0.5 rounded bg-rose-500 text-white text-[10px] font-bold hover:bg-rose-600 transition-all cursor-pointer"
                    >
                      Mute Voice
                    </button>
                  )}
                  {isListening && (
                    <button
                      onClick={() => submitVoiceSpeech(activeTranscriptRef.current)}
                      className="px-2 py-0.5 rounded bg-emerald-500 text-white text-[10px] font-bold hover:bg-emerald-600 transition-all cursor-pointer"
                    >
                      Send Speech
                    </button>
                  )}
                </div>
              )}

              {/* Navigation Tabs */}
              <div className="flex border-b border-slate-800 bg-slate-900/60 px-2 text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('chat')}
                  className={`flex-1 py-2.5 px-2 text-center border-b-2 transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeTab === 'chat'
                      ? 'border-rose-400 text-rose-300 bg-slate-900'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Voice & Chat</span>
                </button>
                <button
                  onClick={() => setActiveTab('assignments')}
                  className={`flex-1 py-2.5 px-2 text-center border-b-2 transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeTab === 'assignments'
                      ? 'border-orange-400 text-orange-300 bg-slate-900'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>Solve Assignment</span>
                </button>
                <button
                  onClick={() => setActiveTab('helplines')}
                  className={`flex-1 py-2.5 px-2 text-center border-b-2 transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
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
                  className={`flex-1 py-2.5 px-2 text-center border-b-2 transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeTab === 'tools'
                      ? 'border-purple-400 text-purple-300 bg-slate-900'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Server className="w-3.5 h-3.5" />
                  <span>Tool Access</span>
                </button>
              </div>

              {/* Tab 1: Two-Way Voice & Chat */}
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
                        <span>Sanvi is preparing your answer...</span>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>

                  {/* Fast Prompt Suggestions */}
                  <div className="px-4 py-2 bg-slate-900/50 border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto text-[11px] whitespace-nowrap scrollbar-none">
                    <span className="text-slate-500 font-semibold flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-rose-400" /> Instant Prompts:
                    </span>
                    <button
                      onClick={() => handleSendMessage("Hey Sunvi")}
                      className="px-2.5 py-1 rounded-full bg-rose-900/40 text-rose-300 hover:bg-rose-800/50 transition-colors border border-rose-500/40 cursor-pointer font-bold"
                    >
                      "Hey Sunvi" 👋
                    </button>
                    <button
                      onClick={() => handleSendMessage("Sanvi, how do I solve Assignment 1 Retail Sales?")}
                      className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 hover:text-rose-300 hover:bg-slate-700 transition-colors border border-slate-700/60 cursor-pointer"
                    >
                      Solve ASN-01 (Excel)
                    </button>
                    <button
                      onClick={() => handleSendMessage("Sanvi, check my watch time and recorded lecture progress")}
                      className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 hover:text-rose-300 hover:bg-slate-700 transition-colors border border-slate-700/60 cursor-pointer"
                    >
                      My Watch Time
                    </button>
                    <button
                      onClick={() => handleSendMessage("Sanvi, connect me with Academic Coordinator")}
                      className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 hover:text-emerald-300 hover:bg-slate-700 transition-colors border border-slate-700/60 cursor-pointer"
                    >
                      Coordinator Helpline
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
                      title={isListening ? "Stop listening & send" : "Tap to Speak (Say 'Hey Sunvi')"}
                      className={`p-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center relative ${
                        isListening
                          ? 'bg-rose-500 text-white animate-pulse shadow-lg shadow-rose-500/50'
                          : 'bg-slate-800 hover:bg-slate-700 text-rose-400 hover:text-rose-300 border border-slate-700'
                      }`}
                    >
                      {isListening ? (
                        <MicOff className="w-4 h-4" />
                      ) : (
                        <Mic className="w-4 h-4" />
                      )}
                    </button>

                    <input
                      type="text"
                      placeholder={isListening ? "Listening... (Say 'Hey Sunvi' or your question)" : "Speak or type to Sanvi (Say 'Hey Sunvi')..."}
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

              {/* Tab 2: Assignment Solver & Guidance */}
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

              {/* Tab 3: Coordinator & Helpline Directory */}
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

              {/* Tab 4: Tool Connections Guide */}
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
    </>
  );
}
