import React, { useState } from 'react';
import { X, Calendar, Clock, Video, ChevronRight, Radio } from 'lucide-react';
import ZoomMeetingModal from './ZoomMeetingModal';

export default function ScheduleModal({ isOpen, onClose }) {
  const [zoomOpen, setZoomOpen] = useState(false);
  const [targetMentor, setTargetMentor] = useState("DVMENTOR4");

  if (!isOpen) return null;

  const timetable = [
    { day: "Every Tuesday", time: "7:00 PM - 9:00 PM", topic: "DBMS & SQL Query Optimization", mode: "Live Classroom", mentor: "DVMENTOR2" },
    { day: "Every Thursday", time: "7:00 PM - 9:00 PM", topic: "Advanced Excel & Financial Modeling", mode: "Live Classroom", mentor: "DVMENTOR1" },
    { day: "Every Saturday", time: "10:00 AM - 1:00 PM", topic: "Data Science Hands-on Case Studies", mode: "Interactive Lab", mentor: "DVMENTOR4" },
    { day: "Daily (Mon-Sat)", time: "11:00 AM - 6:30 PM", topic: "Mentor Practical Lab & Support (Ganesh, Sajid)", mode: "Live Now", mentor: "DVMENTOR4", isLive: true },
    { day: "Every Sunday", time: "5:00 PM - 7:00 PM", topic: "Mentor Doubt Clearing & Code Review", mode: "Live Mentorship", mentor: "DVMENTOR5" },
  ];

  const handleJoin = (mentorId) => {
    setTargetMentor(mentorId);
    setZoomOpen(true);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in select-none">
        <div 
          className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">Weekly Class Timetable & Live Rooms</h3>
                <p className="text-[11px] text-slate-400">Batch 202606 • APIDS • Active Mentorship Schedule</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-400 cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Active Room Banner */}
          <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white p-3.5 px-5 flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Primary Room: <strong className="text-teal-300">DVMENTOR4 (Debashish Sir)</strong></span>
            </div>
            <button
              onClick={() => handleJoin("DVMENTOR4")}
              className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-all active:scale-95"
            >
              <Video className="w-3.5 h-3.5" />
              <span>Join Live (11 AM - 6:30 PM)</span>
            </button>
          </div>

          <div className="p-5 space-y-3 max-h-[60vh] overflow-y-auto">
            {timetable.map((item, idx) => (
              <div 
                key={idx} 
                className={`p-3.5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  item.isLive 
                    ? 'bg-blue-50/60 border-blue-200' 
                    : 'bg-slate-50 border-slate-200/70'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                      {item.day}
                    </span>
                    {item.isLive && (
                      <span className="px-2 py-0.5 rounded text-[9px] font-black bg-red-100 text-red-700 border border-red-200 animate-pulse">
                        LIVE NOW
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mt-1">{item.topic}</h4>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-0.5">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{item.time}</span>
                    <span>•</span>
                    <span className="font-mono text-blue-700 font-semibold">{item.mentor}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-200">
                    {item.mode}
                  </span>
                  <button
                    onClick={() => handleJoin(item.mentor)}
                    className="p-1.5 px-3 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                    title="Launch Zoom for this class"
                  >
                    <Video className="w-3 h-3" />
                    <span>Join</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-400">Meeting ID: 754 061 9228 • Pass: 281340</span>
            <button 
              onClick={onClose}
              className="px-4 py-1.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      <ZoomMeetingModal
        isOpen={zoomOpen}
        onClose={() => setZoomOpen(false)}
        defaultMentorId={targetMentor}
      />
    </>
  );
}
