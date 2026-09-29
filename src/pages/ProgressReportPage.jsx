import React from 'react';
import { BarChart3, Download, Award, CheckCircle2, TrendingUp } from 'lucide-react';
import RadialGauge from '../components/RadialGauge';

export default function ProgressReportPage({ student }) {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
          <BarChart3 className="w-4 h-4 text-orange-500" />
          <span>/</span>
          <span className="text-slate-900 font-semibold">Progress Report & Grade Card</span>
        </div>

        <button className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center gap-2 self-start sm:self-auto">
          <Download className="w-4 h-4 text-orange-400" /> Download PDF Transcript
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <RadialGauge
          title="Overall Course Completion"
          percentage={student.courseProgress}
          status="In Progress"
          color="#3b82f6"
          size={180}
          subtitle="4 of 20 Modules Completed"
        />
        <RadialGauge
          title="Attendance Metric"
          percentage={student.attendancePercent}
          status="Completed"
          color="#ef4444"
          size={180}
          subtitle="18/30 Live Sessions"
        />
        <RadialGauge
          title="Assignment Submissions"
          percentage={33}
          status="In Progress"
          color="#f59e0b"
          size={180}
          subtitle="1/3 Assignments Submitted"
        />
      </div>

      {/* Module Grade Breakdown Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 text-sm">Detailed Module Assessment Scores</h3>
        <div className="divide-y divide-slate-100">
          {[
            { module: "Excel Base and Advanced", sessions: "12 Sessions", score: "88%", grade: "A", status: "Completed" },
            { module: "Excel VBA Macro Automation", sessions: "8 Sessions", score: "--", grade: "Pending", status: "Ongoing" },
            { module: "SQL Server Relational Database", sessions: "14 Sessions", score: "--", grade: "Pending", status: "Upcoming" },
            { module: "Power BI Business Intelligence", sessions: "14 Sessions", score: "--", grade: "Pending", status: "Upcoming" }
          ].map((m, i) => (
            <div key={i} className="py-3.5 flex items-center justify-between text-xs">
              <div>
                <h4 className="font-bold text-slate-800">{m.module}</h4>
                <span className="text-[11px] text-slate-400">{m.sessions}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono font-bold text-slate-700">{m.score}</span>
                <span className={`px-2.5 py-0.5 rounded-full font-bold ${
                  m.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500'
                }`}>
                  {m.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
