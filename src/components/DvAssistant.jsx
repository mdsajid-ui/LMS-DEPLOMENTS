import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
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
  Minimize2
} from 'lucide-react';
import { 
  dvHelplineNumbers, 
  dvToolConnections, 
  dvAssignmentSolutions, 
  assignmentsList,
  studentProfile 
} from '../data/mockData';

export default function DvAssistant({ isOpenExternal, onCloseExternal }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat'); // 'chat', 'assignments', 'helplines', 'tools'
  const [selectedAsnKey, setSelectedAsnKey] = useState('ASN-01');
  const [copiedText, setCopiedText] = useState(null);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Synchronize with external triggers (e.g. from Header or other buttons)
  useEffect(() => {
    if (isOpenExternal !== undefined && isOpenExternal !== null) {
      setIsOpen(isOpenExternal);
    }
  }, [isOpenExternal]);

  const handleClose = () => {
    setIsOpen(false);
    if (onCloseExternal) onCloseExternal();
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  };

  // Chat conversation state
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'welcome-1',
      sender: 'dv',
      timestamp: 'Just now',
      text: `Hello ${studentProfile.name.split(' ')[0]}! I am DV, your Jarvis-powered AI Assistant for DV Analytics. I can help you solve assignments, debug SQL/Python code, connect with academic coordinators, and track your recorded watch time. How may I assist you today?`
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

  // Text to speech (Jarvis style)
  const speakText = (text) => {
    if (!voiceEnabled || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*#_`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.05;
    utterance.pitch = 0.95;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
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

    // DV AI response logic
    setTimeout(() => {
      let replyText = "";
      const lower = query.toLowerCase();

      if (lower.includes('coordinator') || lower.includes('phone') || lower.includes('number') || lower.includes('call') || lower.includes('contact')) {
        replyText = `You can directly reach your Academic Coordinator (${dvHelplineNumbers.academicCoordinator.contactPerson}) at ${dvHelplineNumbers.academicCoordinator.phone}. Timings: ${dvHelplineNumbers.academicCoordinator.timings}. For WhatsApp support, tap the Helplines tab above!`;
      } else if (lower.includes('watch time') || lower.includes('recording') || lower.includes('attendance') || lower.includes('progress')) {
        replyText = `Your current progress: You have watched ${studentProfile.watchedRecordedHours} hours out of ${studentProfile.totalRecordedHours} hours of recorded lectures (${studentProfile.watchedPercent}%). Your live class attendance is currently at ${studentProfile.attendancePercent}% (${studentProfile.liveAttendedCount}/${studentProfile.liveTotalCount} sessions). You have maintained a ${studentProfile.streakDays}-day learning streak!`;
      } else if (lower.includes('asn-01') || lower.includes('retail') || (lower.includes('assignment') && lower.includes('excel'))) {
        replyText = `For Assignment 1 (Retail Sales Analysis): 
1. Use \`=XLOOKUP(A2 & B2, Products!A:A & Products!B:B, Products!C:C)\` for multi-criteria lookup.
2. Calculate Net Revenue = \`Gross Revenue * (1 - Discount %)\`.
3. In Excel 365, avoid legacy nested IFs and use IFS() for tiering. You can check the complete step-by-step breakdown in the 'Assignments' tab!`;
      } else if (lower.includes('asn-02') || lower.includes('vba') || lower.includes('macro') || lower.includes('invoice')) {
        replyText = `For Assignment 2 (VBA Invoice Generator): Remember to save your workbook as \`.xlsm\`. Use \`ExportAsFixedFormat Type:=xlTypePDF\` to auto-export the generated invoice to the local folder. Check the 'Assignments' tab for the full VBA subroutine snippet.`;
      } else if (lower.includes('asn-03') || lower.includes('sql') || lower.includes('database') || lower.includes('schema')) {
        replyText = `For Assignment 3 (SQL Server E-Commerce): Use \`DENSE_RANK() OVER (ORDER BY total_spent DESC)\` for customer rankings and a CTE with \`DATEDIFF(day, last_order_date, GETDATE())\` to identify churned users. Your solution for ASN-03 was scored at 94/100!`;
      } else if (lower.includes('tool') || lower.includes('connect') || lower.includes('jupyter') || lower.includes('ssms') || lower.includes('power bi')) {
        replyText = `DV Tool Connections: 
• JupyterLab: ${dvToolConnections[0].endpoint}
• SQL Server: ${dvToolConnections[1].endpoint} (Database: ${dvToolConnections[1].database})
• Power BI: Connect using SQL Server DirectQuery.
Open the 'Tools' tab to copy full credentials.`;
      } else if (lower.includes('cat') || lower.includes('test') || lower.includes('interview')) {
        replyText = `The Candidates Application Test (CAT) has 3 stages: 1) Multiple Choice Questions (MCQ) - 40 questions covering SQL, Python, Excel & ML. 2) Practical Question Lab - hands-on dataset problem solving with live query runner. 3) Personal Interview - AI Mock or 1-on-1 Viva Voce with Dr. Sandip Mukherjee. Access it anytime under the 'Application Test' tab!`;
      } else {
        replyText = `I have logged your query regarding "${query}". For technical assignments, check the 'Assignments' tab for sample code, or tap 'Helplines' to immediately call or WhatsApp the DV Academic Coordinator.`;
      }

      const dvReply = {
        id: (Date.now() + 1).toString(),
        sender: 'dv',
        timestamp: 'Just now',
        text: replyText
      };

      setMessages(prev => [...prev, dvReply]);
      speakText(replyText);
    }, 600);
  };

  return (
    <>
      {/* Floating Futuristic Jarvis Orb Button (when modal is closed) */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
          {/* Pulsing Helper Tooltip */}
          <div 
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 text-white border border-cyan-500/30 shadow-xl backdrop-blur-md cursor-pointer hover:border-cyan-400 transition-all group"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="text-xs font-semibold tracking-wide">
              Need help? Ask <span className="text-cyan-400 font-bold">DV</span> (Jarvis AI)
            </span>
          </div>

          {/* Holographic Glowing Button */}
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open DV Jarvis Assistant"
            className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-slate-950 via-slate-900 to-cyan-950 text-white flex items-center justify-center shadow-2xl shadow-cyan-500/30 border-2 border-cyan-400/60 hover:scale-105 active:scale-95 transition-all group"
          >
            {/* Outer Rotating Arc Reactor Rings */}
            <div className="absolute inset-0 rounded-full border border-dashed border-cyan-400/40 animate-spin-slow pointer-events-none"></div>
            <div className="absolute -inset-1 rounded-full bg-cyan-500/20 blur-sm group-hover:bg-cyan-500/40 transition-all pointer-events-none animate-pulse"></div>

            {/* Glowing Center Core */}
            <div className="relative z-10 flex flex-col items-center justify-center">
              <Bot className="w-6 h-6 text-cyan-300 group-hover:text-cyan-200 transition-transform group-hover:rotate-6" />
              <span className="text-[9px] font-mono font-black text-orange-400 leading-none mt-0.5 tracking-tighter">
                DV
              </span>
            </div>
          </button>
        </div>
      )}

      {/* Main DV Jarvis Floating Window / Modal */}
      {isOpen && (
        <div 
          className={`fixed z-50 transition-all duration-300 flex flex-col ${
            isMinimized 
              ? 'bottom-6 right-6 w-80 h-16' 
              : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[95vw] sm:w-[500px] h-[640px] max-h-[90vh]'
          } bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-cyan-500/40 backdrop-blur-xl overflow-hidden`}
        >
          {/* Futuristic Arc Reactor Header */}
          <div className="px-4 py-3.5 bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950/70 border-b border-cyan-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Jarvis Core Badge */}
              <div className="relative w-9 h-9 rounded-xl bg-slate-900 border border-cyan-400/50 flex items-center justify-center shadow-inner shadow-cyan-500/20">
                <span className="absolute inset-0 rounded-xl bg-cyan-400/10 animate-pulse"></span>
                <Bot className="w-5 h-5 text-cyan-400" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-slate-950"></span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold tracking-wide text-white flex items-center gap-1.5">
                    DV AI Assistant
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      JARVIS v2.6
                    </span>
                  </h3>
                </div>
                <p className="text-[11px] text-slate-400">
                  Assignment Solver • Code Debugger • Hotline Coordinator
                </p>
              </div>
            </div>

            {/* Window Controls */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                title={voiceEnabled ? "Voice Output Active" : "Enable Voice (Jarvis Mode)"}
                className={`p-1.5 rounded-lg transition-colors ${
                  voiceEnabled 
                    ? 'text-cyan-400 bg-cyan-950/60 border border-cyan-500/40' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title={isMinimized ? "Expand" : "Minimize"}
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={handleClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
                title="Close Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Navigation Tabs */}
              <div className="flex border-b border-slate-800 bg-slate-900/60 px-2 text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('chat')}
                  className={`flex-1 py-2.5 px-2 text-center border-b-2 transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'chat'
                      ? 'border-cyan-400 text-cyan-300 bg-slate-900'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>AI Chat</span>
                </button>
                <button
                  onClick={() => setActiveTab('assignments')}
                  className={`flex-1 py-2.5 px-2 text-center border-b-2 transition-all flex items-center justify-center gap-1.5 ${
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
                  className={`flex-1 py-2.5 px-2 text-center border-b-2 transition-all flex items-center justify-center gap-1.5 ${
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
                  className={`flex-1 py-2.5 px-2 text-center border-b-2 transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'tools'
                      ? 'border-purple-400 text-purple-300 bg-slate-900'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Server className="w-3.5 h-3.5" />
                  <span>Tool Access</span>
                </button>
              </div>

              {/* Tab 1: AI Chat & Quick Prompts */}
              {activeTab === 'chat' && (
                <div className="flex-1 flex flex-col min-h-0 bg-slate-950">
                  {/* Messages Feed */}
                  <div className="flex-1 p-4 overflow-y-auto space-y-3.5 scrollbar-thin">
                    {messages.map((m) => {
                      const isDv = m.sender === 'dv';
                      return (
                        <div
                          key={m.id}
                          className={`flex items-start gap-2.5 ${isDv ? '' : 'flex-row-reverse'}`}
                        >
                          {isDv && (
                            <div className="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-400 flex items-center justify-center flex-shrink-0 text-xs font-bold font-mono">
                              DV
                            </div>
                          )}
                          <div
                            className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed whitespace-pre-line ${
                              isDv
                                ? 'bg-slate-900/90 text-slate-200 border border-cyan-500/20 shadow-md'
                                : 'bg-gradient-to-r from-orange-500 to-amber-600 text-white font-medium shadow-md'
                            }`}
                          >
                            {m.text}
                          </div>
                        </div>
                      );
                    })}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Fast Prompt Suggestions */}
                  <div className="px-4 py-2 bg-slate-900/50 border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto text-[11px] whitespace-nowrap scrollbar-none">
                    <span className="text-slate-500 font-semibold flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-cyan-400" /> Prompts:
                    </span>
                    <button
                      onClick={() => handleSendMessage("How do I solve Assignment 1 Retail Sales?")}
                      className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 hover:text-cyan-300 hover:bg-slate-700 transition-colors border border-slate-700/60"
                    >
                      Solve ASN-01 (Excel)
                    </button>
                    <button
                      onClick={() => handleSendMessage("How to connect to SQL Server & SSMS?")}
                      className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 hover:text-cyan-300 hover:bg-slate-700 transition-colors border border-slate-700/60"
                    >
                      Connect to SQL Server
                    </button>
                    <button
                      onClick={() => handleSendMessage("What is my recorded watch time and attendance?")}
                      className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 hover:text-cyan-300 hover:bg-slate-700 transition-colors border border-slate-700/60"
                    >
                      My Watch Time Stats
                    </button>
                    <button
                      onClick={() => handleSendMessage("Call Academic Coordinator Rahul")}
                      className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 hover:text-emerald-300 hover:bg-slate-700 transition-colors border border-slate-700/60"
                    >
                      Coordinator Contact
                    </button>
                  </div>

                  {/* Input Form */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendMessage();
                    }}
                    className="p-3 border-t border-slate-800/80 bg-slate-900/80 flex items-center gap-2"
                  >
                    <input
                      type="text"
                      placeholder="Ask DV anything (e.g. solve assignment, coordinator phone, SQL syntax)..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      className="flex-1 bg-slate-950 text-xs text-slate-200 placeholder:text-slate-500 px-3.5 py-2.5 rounded-xl border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none transition-all"
                    />
                    <button
                      type="submit"
                      disabled={!inputMessage.trim()}
                      className="p-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-40 text-slate-950 font-bold rounded-xl transition-all shadow-md active:scale-95"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              )}

              {/* Tab 2: Assignment Solver & Guidance */}
              {activeTab === 'assignments' && (
                <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950 scrollbar-thin">
                  {/* Assignment Picker */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                      Select Cohort Assignment to Solve:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {assignmentsList.map((asn) => (
                        <button
                          key={asn.id}
                          onClick={() => setSelectedAsnKey(asn.id)}
                          className={`p-2.5 rounded-xl text-left border transition-all text-xs font-semibold ${
                            selectedAsnKey === asn.id
                              ? 'bg-orange-500/20 border-orange-500 text-orange-300'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800/70 hover:text-slate-200'
                          }`}
                        >
                          <span className="font-mono text-[10px] block opacity-75">{asn.id}</span>
                          <span className="truncate block mt-0.5">{asn.subject.split(' ')[0]}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Solution Blueprint */}
                  {dvAssignmentSolutions[selectedAsnKey] && (
                    <div className="space-y-3.5 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                            Assignment Guide & Formulas
                          </span>
                          <span className="text-[11px] font-mono text-slate-400">100 Marks</span>
                        </div>
                        <h4 className="text-sm font-bold text-white mt-1.5">
                          {dvAssignmentSolutions[selectedAsnKey].title}
                        </h4>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                          {dvAssignmentSolutions[selectedAsnKey].guideSummary}
                        </p>
                      </div>

                      {/* Formulas / Code Snippets */}
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
                                className="p-1 text-slate-400 hover:text-white"
                                title="Copy Formula"
                              >
                                {copiedText === `f-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* VBA Snippet */}
                      {dvAssignmentSolutions[selectedAsnKey].vbaSnippet && (
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-slate-300">
                              VBA Macro Code:
                            </span>
                            <button
                              onClick={() => handleCopy(dvAssignmentSolutions[selectedAsnKey].vbaSnippet, 'vba')}
                              className="text-[11px] text-cyan-400 flex items-center gap-1 hover:underline"
                            >
                              {copiedText === 'vba' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                              Copy Macro
                            </button>
                          </div>
                          <pre className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] font-mono text-cyan-300 overflow-x-auto max-h-40">
                            {dvAssignmentSolutions[selectedAsnKey].vbaSnippet}
                          </pre>
                        </div>
                      )}

                      {/* SQL Snippet */}
                      {dvAssignmentSolutions[selectedAsnKey].sqlSnippet && (
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-slate-300">
                              Optimized SQL Solution:
                            </span>
                            <button
                              onClick={() => handleCopy(dvAssignmentSolutions[selectedAsnKey].sqlSnippet, 'sql')}
                              className="text-[11px] text-cyan-400 flex items-center gap-1 hover:underline"
                            >
                              {copiedText === 'sql' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                              Copy SQL
                            </button>
                          </div>
                          <pre className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] font-mono text-cyan-300 overflow-x-auto max-h-40">
                            {dvAssignmentSolutions[selectedAsnKey].sqlSnippet}
                          </pre>
                        </div>
                      )}

                      {/* Step by step checklist */}
                      <div className="pt-2 border-t border-slate-800 space-y-1.5">
                        <span className="text-[11px] font-bold text-slate-300 block">
                          Step-by-Step Implementation Guide:
                        </span>
                        {dvAssignmentSolutions[selectedAsnKey].stepByStep.map((step, idx) => (
                          <div key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 flex-shrink-0"></span>
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
                      DV Analytics Direct Support Directory
                    </span>
                    <p className="text-xs text-slate-300 mt-1">
                      Direct lines to program coordinators, faculty doubt escalation, and server IT admin.
                    </p>
                  </div>

                  {/* Contact Cards */}
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
                        <span className="text-[10px] font-mono font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
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
                            <PhoneCall className="w-3 h-3 text-cyan-400" /> Call
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
                      Which tool do you need to connect? Connect your local or cloud IDE to the DV Analytics server cluster.
                    </p>
                  </div>

                  {dvToolConnections.map((tc, idx) => (
                    <div 
                      key={idx}
                      className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Server className="w-4 h-4 text-cyan-400" />
                          <h4 className="text-xs font-bold text-white">{tc.tool}</h4>
                        </div>
                        <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          {tc.status}
                        </span>
                      </div>

                      <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 flex items-center justify-between gap-2">
                        <div className="truncate">
                          <span className="text-[10px] text-slate-500 block">Host / Endpoint:</span>
                          <code className="text-xs font-mono text-cyan-300 truncate">
                            {tc.endpoint}
                          </code>
                        </div>
                        <button
                          onClick={() => handleCopy(tc.endpoint, `tc-${idx}`)}
                          className="p-1.5 text-slate-400 hover:text-white"
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
