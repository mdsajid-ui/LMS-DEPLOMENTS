import React from 'react';
import { Video, Calendar, Clock, ExternalLink, PlayCircle, Users, CheckCircle } from 'lucide-react';

export default function ClassPage({ student }) {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500 font-medium bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <Video className="w-4 h-4 text-orange-500" />
        <span>/</span>
        <span className="text-slate-900 font-semibold">Live Classroom & Sessions</span>
      </div>

      {/* Live Class Today Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            NEXT LIVE SESSION IN 2 HOURS
          </div>
          <h2 className="text-2xl font-bold tracking-tight">SQL Server: Advanced Aggregations & Joins</h2>
          <p className="text-xs text-slate-300">
            Instructor: Dr. Sandip Mukherjee • Batch: {student.batch} • Platform: Zoom Enterprise
          </p>
        </div>

        <button className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs shadow-lg transition-all transform active:scale-95 flex-shrink-0">
          <Video className="w-4 h-4" />
          Join Live Zoom Lecture
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Class Schedule Grid */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 text-sm">Upcoming Live Classes This Week</h3>
        <div className="space-y-3">
          {[
            { date: "Tomorrow, 7:00 PM IST", topic: "Excel VBA Macro Programming - Part 2", mentor: "Senior Consultant", status: "Scheduled" },
            { date: "Thursday, 7:00 PM IST", topic: "Relational Algebra & Normalization Rules", mentor: "Database Architect", status: "Scheduled" },
            { date: "Saturday, 10:00 AM IST", topic: "Practical Retail Sales Analysis Hands-on Lab", mentor: "Lead Data Scientist", status: "Lab Session" }
          ].map((c, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                  {c.date}
                </span>
                <h4 className="text-xs font-bold text-slate-900 mt-1">{c.topic}</h4>
                <p className="text-[11px] text-slate-500">Instructor: {c.mentor}</p>
              </div>
              <button className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 transition-colors">
                Add to Calendar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
