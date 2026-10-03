import React, { useState } from 'react';
import { 
  X, 
  Video, 
  Copy, 
  Check, 
  ExternalLink, 
  ShieldCheck, 
  Clock, 
  Phone, 
  Mail, 
  User, 
  Sparkles, 
  HelpCircle,
  Laptop,
  Globe,
  Radio
} from 'lucide-react';
import { mentorZoomList } from '../data/mentorZoomData.js';

export default function ZoomMeetingModal({ isOpen, onClose, defaultMentorId = "DVMENTOR4" }) {
  const [selectedMentorId, setSelectedMentorId] = useState(defaultMentorId);
  const [copiedMeetingId, setCopiedMeetingId] = useState(false);
  const [copiedPasscode, setCopiedPasscode] = useState(false);
  const [showTroubleshooting, setShowTroubleshooting] = useState(false);

  if (!isOpen) return null;

  const currentMentor = mentorZoomList.find(m => m.id === selectedMentorId) || mentorZoomList[0];

  const handleCopyMeetingId = () => {
    navigator.clipboard?.writeText(currentMentor.rawMeetingId);
    setCopiedMeetingId(true);
    setTimeout(() => setCopiedMeetingId(false), 2000);
  };

  const handleCopyPasscode = () => {
    navigator.clipboard?.writeText(currentMentor.passcode);
    setCopiedPasscode(true);
    setTimeout(() => setCopiedPasscode(false), 2000);
  };

  const handleDirectJoin = () => {
    window.open(currentMentor.zoomJoinUrl, '_blank', 'noopener,noreferrer');
  };

  const handleWebJoin = () => {
    window.open(currentMentor.webJoinUrl, '_blank', 'noopener,noreferrer');
  };

  const handleAppProtocolJoin = () => {
    window.location.href = currentMentor.appProtocolUrl;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in select-none">
      <div 
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-950 text-white p-5 flex items-center justify-between relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/20 border border-blue-400/40 text-blue-300 flex items-center justify-center shadow-inner">
              <Video className="w-5 h-5 text-blue-300 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base tracking-tight">Live Zoom Classroom Portal</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  CONNECTED
                </span>
              </div>
              <p className="text-xs text-blue-200/80">Direct One-Click Entry • DV Mentor Rooms 1 to 5</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mentor Selector Pills (DVMENTOR1 - 5) */}
        <div className="px-5 pt-4 pb-2 bg-slate-50 border-b border-slate-200/80">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Select Active Mentor Room:</span>
            <span className="text-[10px] font-normal text-slate-400">5 Rooms Active</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {mentorZoomList.map((m) => {
              const isSelected = m.id === selectedMentorId;
              return (
                <button
                  key={m.id}
                  onClick={() => setSelectedMentorId(m.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
                    isSelected 
                      ? 'bg-blue-600 text-white border-blue-700 shadow-sm scale-102' 
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  {m.id === 'DVMENTOR4' && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  )}
                  <span>{m.id}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-normal ${
                    isSelected ? 'bg-blue-700/80 text-blue-100' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {m.facultyName.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 space-y-5 overflow-y-auto flex-1">
          
          {/* Active Room Card */}
          <div className="bg-gradient-to-br from-blue-50/70 via-slate-50 to-indigo-50/50 rounded-2xl p-4 sm:p-5 border border-blue-200/60 shadow-xs relative overflow-hidden">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-blue-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-[10px] font-black uppercase rounded bg-blue-600 text-white font-mono">
                    {currentMentor.id}
                  </span>
                  <h4 className="text-base font-extrabold text-slate-900">{currentMentor.name}</h4>
                </div>
                <p className="text-xs text-slate-600 font-medium mt-0.5">{currentMentor.role}</p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                  <span>{currentMentor.status}</span>
                </span>
              </div>
            </div>

            {/* Timings & Cohort Meta */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 text-xs">
              <div className="flex items-center gap-2 text-slate-700 bg-white/80 p-2.5 rounded-xl border border-slate-200/60">
                <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold uppercase">Schedule Timings</span>
                  <strong className="text-slate-900 font-bold">{currentMentor.timings}</strong>
                </div>
              </div>

              <div className="flex items-center gap-2 text-slate-700 bg-white/80 p-2.5 rounded-xl border border-slate-200/60">
                <User className="w-4 h-4 text-indigo-600 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold uppercase">Assigned Batch / Cohort</span>
                  <strong className="text-slate-900 font-bold truncate block">{currentMentor.cohort}</strong>
                </div>
              </div>
            </div>

            {/* Mentor Credentials Pill */}
            <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] text-slate-600 pt-2 border-t border-blue-100/80">
              <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg border border-slate-200/70">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-mono text-slate-700">{currentMentor.email}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg border border-slate-200/70">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-mono text-slate-700">{currentMentor.phone}</span>
              </div>
            </div>

          </div>

          {/* Meeting Credentials Display with 1-Click Copy */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            
            {/* Meeting ID */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Meeting ID</span>
                <span className="font-mono text-base font-extrabold text-slate-900 tracking-wide mt-0.5 block">
                  {currentMentor.meetingId}
                </span>
              </div>
              <button
                onClick={handleCopyMeetingId}
                className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer active:scale-95"
                title="Copy Meeting ID"
              >
                {copiedMeetingId ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                <span>{copiedMeetingId ? "Copied!" : "Copy"}</span>
              </button>
            </div>

            {/* Passcode */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Passcode</span>
                <span className="font-mono text-base font-extrabold text-emerald-700 tracking-wider mt-0.5 block">
                  {currentMentor.passcode}
                </span>
              </div>
              <button
                onClick={handleCopyPasscode}
                className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer active:scale-95"
                title="Copy Passcode"
              >
                {copiedPasscode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                <span>{copiedPasscode ? "Copied!" : "Copy"}</span>
              </button>
            </div>

          </div>

          {/* Primary Action Buttons */}
          <div className="space-y-2.5">
            {/* Direct Join Button */}
            <button
              onClick={handleDirectJoin}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2.5 cursor-pointer transform active:scale-98"
            >
              <Video className="w-5 h-5" />
              <span>Launch Live Zoom Class Now</span>
              <ExternalLink className="w-4 h-4 opacity-80" />
            </button>

            {/* Secondary Join Options */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={handleWebJoin}
                className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-slate-200"
                title="Join directly in Chrome/Edge without installing Zoom application"
              >
                <Globe className="w-4 h-4 text-blue-600" />
                <span>Join in Web Browser</span>
              </button>

              <button
                onClick={handleAppProtocolJoin}
                className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-slate-200"
                title="Launch Zoom Desktop Application via zoommtg protocol"
              >
                <Laptop className="w-4 h-4 text-indigo-600" />
                <span>Open in Zoom App</span>
              </button>
            </div>
          </div>

          {/* Joining Problem Solver / Troubleshooting Accordion */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/50">
            <button
              onClick={() => setShowTroubleshooting(!showTroubleshooting)}
              className="w-full p-3.5 text-left flex items-center justify-between text-xs font-bold text-slate-700 hover:bg-slate-100/70 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-orange-500" />
                <span>Facing issues joining the Live Class? (Troubleshooting Guide)</span>
              </span>
              <span className="text-[11px] text-blue-600">{showTroubleshooting ? "Hide ▲" : "Show Help ▼"}</span>
            </button>

            {showTroubleshooting && (
              <div className="p-4 pt-1 space-y-2.5 text-xs text-slate-600 border-t border-slate-200/80 bg-white">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">1.</span>
                  <div>
                    <strong>Pop-up Blocker:</strong> If nothing opens when you click the blue button, check your browser's address bar for a blocked pop-up icon and select "Always allow pop-ups for edu.dvanalyticsmds.com".
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">2.</span>
                  <div>
                    <strong>No Zoom App Installed:</strong> Click <em>"Join in Web Browser"</em> above. You can attend the complete session directly from Chrome or Edge without downloading anything.
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">3.</span>
                  <div>
                    <strong>Prompted for Passcode:</strong> Enter passcode <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">{currentMentor.passcode}</span> when prompted.
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">4.</span>
                  <div>
                    <strong>Waiting Room:</strong> If you see "Please wait, the meeting host will let you in soon", your mentor has opened the room and is admitting students. Keep the window open.
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">5.</span>
                  <div>
                    <strong>Direct Emergency Contact:</strong> For immediate session assistance, contact Debashish Sir at <span className="font-mono font-bold text-slate-800">089042 50708</span> or Admin Helpdesk.
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Encrypted Zoom Enterprise AES-256 Session</span>
          </div>

          <button 
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
