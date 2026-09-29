import React, { useState } from 'react';
import { X, PhoneCall, MessageSquare, Send, User, Headset, CheckCircle2 } from 'lucide-react';

export default function SupportModal({ isOpen, onClose, initialTab = 'hotline' }) {
  const [tab, setTab] = useState(initialTab);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'support', text: 'Hello SK Abdul Sajid! How can the DV Analytics Academic Team assist you today?' }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  if (!isOpen) return null;

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    setChatMessages([...chatMessages, { sender: 'user', text: inputMsg }]);
    setInputMsg('');
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        { sender: 'support', text: 'Thank you for reaching out. Academic coordinator Rahul from DV Analytics has been notified and will reply shortly!' }
      ]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in">
      <div 
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center">
              <Headset className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">DV Analytics Student Support Desk</h3>
              <p className="text-[11px] text-slate-400">Direct Academic & Technical Assistance</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-400">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-100 bg-slate-50/50 text-xs font-semibold">
          <button
            onClick={() => setTab('hotline')}
            className={`flex-1 py-3 text-center border-b-2 transition-all flex items-center justify-center gap-2 ${
              tab === 'hotline' ? 'border-orange-500 text-orange-600 bg-white' : 'border-transparent text-slate-500'
            }`}
          >
            <PhoneCall className="w-3.5 h-3.5" /> Hotline & Contacts
          </button>
          <button
            onClick={() => setTab('chat')}
            className={`flex-1 py-3 text-center border-b-2 transition-all flex items-center justify-center gap-2 ${
              tab === 'chat' ? 'border-orange-500 text-orange-600 bg-white' : 'border-transparent text-slate-500'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" /> Live Mentor Chat
          </button>
        </div>

        {tab === 'hotline' ? (
          <div className="p-6 space-y-4">
            <div className="p-4 bg-orange-50/60 rounded-2xl border border-orange-100 space-y-1">
              <span className="text-[10px] font-bold uppercase text-orange-700">Academic Coordinator</span>
              <h4 className="text-sm font-bold text-slate-900">+91 98300 XXXXX / support@dvanalyticsmds.com</h4>
              <p className="text-xs text-slate-600">Available Mon - Sat, 10:00 AM - 7:00 PM IST</p>
            </div>

            <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-100 space-y-1">
              <span className="text-[10px] font-bold uppercase text-blue-700">LMS Portal & Technical Helpdesk</span>
              <h4 className="text-sm font-bold text-slate-900">lms-support@dvanalyticsmds.com</h4>
              <p className="text-xs text-slate-600">For video playback issues, login credentials & downloads</p>
            </div>

            <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100 space-y-1">
              <span className="text-[10px] font-bold uppercase text-emerald-700">Placement & Careers Cell</span>
              <h4 className="text-sm font-bold text-slate-900">placements@dvanalyticsmds.com</h4>
              <p className="text-xs text-slate-600">For resume reviews, mock interviews & interview invites</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-80">
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {chatMessages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs ${
                      m.sender === 'user'
                        ? 'bg-orange-500 text-white font-medium'
                        : 'bg-slate-100 text-slate-800'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSend} className="p-3 border-t border-slate-100 flex gap-2">
              <input
                type="text"
                placeholder="Type your message to mentor..."
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                className="flex-1 text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-orange-500 text-white rounded-xl text-xs font-semibold hover:bg-orange-600 flex items-center gap-1"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
