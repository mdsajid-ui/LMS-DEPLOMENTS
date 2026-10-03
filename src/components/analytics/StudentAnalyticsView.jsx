import React, { useState } from 'react';
import { 
  Users, 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Smartphone, 
  Monitor, 
  Tablet, 
  FileCheck, 
  Sparkles, 
  Activity, 
  Award,
  ArrowUpRight,
  PieChart as PieIcon,
  BarChart2
} from 'lucide-react';
import { studentAnalyticsData } from '../../data/analyticsSuiteData';

export default function StudentAnalyticsView({ initialSubTab = 'progress', showToast }) {
  const [activeTab, setActiveTab] = useState(initialSubTab); // 'progress', 'engagement', 'assignment'
  const { learningProgress, lmsEngagement, assignmentTracking } = studentAnalyticsData;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* ========================================================================= */}
      {/* 1. HERO BANNER                                                            */}
      {/* ========================================================================= */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-950 p-6 border border-slate-800/80 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Student Telemetry Engine
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/10 text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                420 Active Enrolments
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight">
              Student Learning & LMS Engagement Intelligence
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Real-time monitoring of video watch hours, module mastery scores, portal login frequency, and assignment submission turnaround.
            </p>
          </div>

          {/* Subtab Selector */}
          <div className="flex flex-wrap items-center gap-2 bg-[#0c182c]/80 p-1.5 rounded-2xl border border-white/10 shrink-0">
            <button
              onClick={() => setActiveTab('progress')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'progress'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Learning Progress</span>
            </button>
            <button
              onClick={() => setActiveTab('engagement')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'engagement'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>LMS Engagement</span>
            </button>
            <button
              onClick={() => setActiveTab('assignment')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'assignment'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>Assignment Tracking</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. TAB 1: LEARNING PROGRESS                                               */}
      {/* ========================================================================= */}
      {activeTab === 'progress' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 shadow-xl backdrop-blur-md">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Avg Progress</span>
              <div className="text-2xl font-black text-cyan-400 mt-1">
                {learningProgress.kpis.avgCourseProgressPct}%
              </div>
              <div className="text-[11px] text-emerald-400 font-semibold mt-1">
                ↑ 3.2% Pace over cohort avg
              </div>
            </div>

            <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 shadow-xl backdrop-blur-md">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Watch Hours</span>
              <div className="text-2xl font-black text-white mt-1">
                {learningProgress.kpis.avgVideoWatchHours}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">Per student average</div>
            </div>

            <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 shadow-xl backdrop-blur-md">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Fast-Track Learners</span>
              <div className="text-2xl font-black text-emerald-400 mt-1">
                {learningProgress.kpis.fastLearnersPct}%
              </div>
              <div className="text-[11px] text-emerald-300 mt-1">&gt;15 days ahead of schedule</div>
            </div>

            <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 shadow-xl backdrop-blur-md">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Needs Support</span>
              <div className="text-2xl font-black text-amber-400 mt-1">
                {learningProgress.kpis.slowLearnersPct}%
              </div>
              <div className="text-[11px] text-amber-300 mt-1">Nudge & mentor clinic triggered</div>
            </div>
          </div>

          {/* Progress Quartiles & Subject Mastery Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quartile Distribution */}
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 shadow-xl space-y-4">
              <h3 className="font-bold text-white text-sm">Course Progress Quartiles</h3>
              <div className="space-y-3">
                {learningProgress.distributionTiers.map((t) => (
                  <div key={t.range} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-300">{t.range}</span>
                      <span className="font-mono text-white font-bold">{t.count} Students ({t.pct}%)</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${t.pct}%`, backgroundColor: t.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Subject Mastery Radar */}
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 shadow-xl space-y-4">
              <h3 className="font-bold text-white text-sm">Subject Mastery Scores (Avg Benchmark)</h3>
              <div className="space-y-3">
                {learningProgress.subjectMastery.map((s) => (
                  <div key={s.subject} className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <div>
                      <span className="font-bold text-xs text-white block">{s.subject}</span>
                      <span className="text-[10px] text-slate-400">Completion: {s.completionRate}%</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-sm text-cyan-400">{s.avgScore}</span>
                      <span className="text-[10px] text-slate-400 font-normal"> / 100</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. TAB 2: LMS ENGAGEMENT                                                  */}
      {/* ========================================================================= */}
      {activeTab === 'engagement' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 shadow-xl backdrop-blur-md">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Daily Active (DAU)</span>
              <div className="text-2xl font-black text-white mt-1">
                {lmsEngagement.kpis.dailyActiveUsers} Students
              </div>
              <div className="text-[11px] text-emerald-400 font-semibold mt-1">
                75.2% Daily Stickiness
              </div>
            </div>

            <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 shadow-xl backdrop-blur-md">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Avg Session Time</span>
              <div className="text-2xl font-black text-white mt-1">
                {lmsEngagement.kpis.avgSessionDuration}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">High study engagement</div>
            </div>

            <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 shadow-xl backdrop-blur-md">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Peak Study Hours</span>
              <div className="text-2xl font-black text-amber-400 mt-1">
                {lmsEngagement.kpis.peakPlatformHours.split(' - ')[0]}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">Evening prime session</div>
            </div>

            <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 shadow-xl backdrop-blur-md">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Inactive Risk (&gt;7d)</span>
              <div className="text-2xl font-black text-rose-400 mt-1">
                {lmsEngagement.kpis.inactiveStudentsAlert} Accounts
              </div>
              <div className="text-[11px] text-rose-300 font-semibold mt-1">
                Automated SMS reminder sent
              </div>
            </div>
          </div>

          {/* Device Breakdown & Heatmap */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 shadow-xl space-y-4">
              <h3 className="font-bold text-white text-sm">Platform Access Device Breakdown</h3>
              <div className="space-y-4">
                {lmsEngagement.deviceBreakdown.map((d) => (
                  <div key={d.device} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <div className="flex items-center gap-2 text-slate-200">
                        {d.device.includes('Desktop') ? <Monitor className="w-3.5 h-3.5 text-blue-400" /> : d.device.includes('Mobile') ? <Smartphone className="w-3.5 h-3.5 text-emerald-400" /> : <Tablet className="w-3.5 h-3.5 text-amber-400" />}
                        <span>{d.device}</span>
                      </div>
                      <span className="font-mono text-white font-bold">{d.pct}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${d.pct}%`, backgroundColor: d.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hourly Activity Density */}
            <div className="lg:col-span-2 rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 shadow-xl space-y-4">
              <h3 className="font-bold text-white text-sm">Hourly Platform Concurrency Heatmap</h3>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 pt-2">
                {lmsEngagement.hourlyHeatmap.map((h) => {
                  const intensity = Math.min(100, Math.round((h.active / 300) * 100));
                  return (
                    <div key={h.hour} className="text-center space-y-1">
                      <div 
                        className="h-20 rounded-xl flex items-end justify-center p-1 transition-all"
                        style={{ backgroundColor: `rgba(249, 115, 22, ${Math.max(0.15, intensity / 100)})` }}
                      >
                        <span className="text-[10px] font-mono font-bold text-white">{h.active}</span>
                      </div>
                      <span className="text-[9px] text-slate-400 font-mono block">{h.hour}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. TAB 3: ASSIGNMENT TRACKING                                             */}
      {/* ========================================================================= */}
      {activeTab === 'assignment' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 shadow-xl backdrop-blur-md">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Submissions</span>
              <div className="text-2xl font-black text-white mt-1">
                {assignmentTracking.kpis.totalSubmissions}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">Reviewed by faculty</div>
            </div>

            <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 shadow-xl backdrop-blur-md">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Compliance Rate</span>
              <div className="text-2xl font-black text-emerald-400 mt-1">
                {assignmentTracking.kpis.submissionCompliancePct}%
              </div>
              <div className="text-[11px] text-emerald-300 font-semibold mt-1">
                ✓ Benchmark: &gt;90%
              </div>
            </div>

            <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 shadow-xl backdrop-blur-md">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Grading Turnaround</span>
              <div className="text-2xl font-black text-blue-400 mt-1">
                {assignmentTracking.kpis.avgGradingTurnaroundHours} hrs
              </div>
              <div className="text-[11px] text-slate-400 mt-1">SLA: Under 24 hrs</div>
            </div>

            <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 shadow-xl backdrop-blur-md">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Resubmissions</span>
              <div className="text-2xl font-black text-purple-400 mt-1">
                {assignmentTracking.kpis.resubmissionRatePct}%
              </div>
              <div className="text-[11px] text-purple-300 mt-1">Low rework rate</div>
            </div>
          </div>

          {/* Grade Distribution */}
          <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 shadow-xl space-y-4">
            <h3 className="font-bold text-white text-sm">Grading Score Distribution Across Practical Tasks</h3>
            <div className="space-y-3">
              {assignmentTracking.gradeDistribution.map((g) => (
                <div key={g.grade} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-300">{g.grade}</span>
                    <span className="font-mono text-white font-bold">{g.count} Submissions ({g.pct}%)</span>
                  </div>
                  <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${g.pct}%`, backgroundColor: g.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
