import React from 'react';
import { X, Calendar, Clock, Video, ChevronRight } from 'lucide-react';

export default function ScheduleModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const timetable = [
    { day: "Every Tuesday", time: "7:00 PM - 9:00 PM", topic: "DBMS & SQL Query Optimization", mode: "Live Classroom" },
    { day: "Every Thursday", time: "7:00 PM - 9:00 PM", topic: "Advanced Excel & Financial Modeling", mode: "Live Classroom" },
    { day: "Every Saturday", time: "10:00 AM - 1:00 PM", topic: "Data Science Hands-on Case Studies", mode: "Interactive Lab" },
    { day: "Every Sunday", time: "5:00 PM - 7:00 PM", topic: "Mentor Doubt Clearing & Code Review", mode: "Live Mentorship" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in">
      <div 
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">Weekly Class Timetable</h3>
              <p className="text-[11px] text-slate-400">Batch 202606 • APIDS</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-400">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-3">
          {timetable.map((item, idx) => (
            <div key={idx} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                  {item.day}
                </span>
                <h4 className="text-xs font-bold text-slate-900 mt-1">{item.topic}</h4>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-0.5">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{item.time}</span>
                </div>
              </div>
              <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-200">
                {item.mode}
              </span>
            </div>
          ))}
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 text-right">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors"
          >
            Close Timetable
          </button>
        </div>
      </div>
    </div>
  );
}
