import React from 'react';
import { Clock, Calendar, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import RadialGauge from '../components/RadialGauge';

export default function AttendancePage({ student }) {
  const sessions = [
    { date: "07.06.2026", title: "Excel Base & Advanced - Session 1", status: "Present", duration: "1h 45m" },
    { date: "10.06.2026", title: "Excel Base & Advanced - Session 2", status: "Present", duration: "2h 10m" },
    { date: "14.06.2026", title: "Excel Base & Advanced - Session 3", status: "Present", duration: "1h 55m" },
    { date: "17.06.2026", title: "Excel Base & Advanced - Session 4", status: "Absent", duration: "2h 30m" },
    { date: "21.06.2026", title: "Excel VBA Automation - Session 1", status: "Present", duration: "2h 00m" },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500 font-medium bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <Clock className="w-4 h-4 text-orange-500" />
        <span>/</span>
        <span className="text-slate-900 font-semibold">Attendance Log & Biometric Compliance</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <RadialGauge
          title="Attendance Compliance"
          percentage={student.attendancePercent}
          status="Completed"
          color="#ef4444"
          size={180}
          subtitle="Mandatory minimum 75% for placement drive"
        />

        <div className="md:col-span-2 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm">Attendance Summary Statistics</h3>
            <span className="text-xs text-slate-500 font-mono">Cohort {student.batch}</span>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
              <span className="text-[10px] uppercase font-bold text-emerald-600">Present</span>
              <h4 className="text-xl font-extrabold text-emerald-800 mt-1">18</h4>
              <p className="text-[10px] text-emerald-600">Sessions</p>
            </div>
            <div className="p-4 bg-rose-50 rounded-2xl border border-rose-100">
              <span className="text-[10px] uppercase font-bold text-rose-600">Absent</span>
              <h4 className="text-xl font-extrabold text-rose-800 mt-1">12</h4>
              <p className="text-[10px] text-rose-600">Sessions</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
              <span className="text-[10px] uppercase font-bold text-blue-600">Total Live</span>
              <h4 className="text-xl font-extrabold text-blue-800 mt-1">30</h4>
              <p className="text-[10px] text-blue-600">Conducted</p>
            </div>
          </div>

          <p className="text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200">
            💡 <strong>Placement Note:</strong> Students with attendance &gt; 75% receive priority scheduling for campus placement drives and mock interview slots.
          </p>
        </div>
      </div>

      {/* Session wise Attendance Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-4">
        <h4 className="font-bold text-slate-900 text-sm">Lecture Attendance Records</h4>
        <div className="divide-y divide-slate-100">
          {sessions.map((s, idx) => (
            <div key={idx} className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-slate-400">{s.date}</span>
                <span className="text-xs font-bold text-slate-800">{s.title}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-slate-400">{s.duration}</span>
                {s.status === 'Present' ? (
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Present
                  </span>
                ) : (
                  <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200 flex items-center gap-1">
                    <XCircle className="w-3.5 h-3.5" /> Absent
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
