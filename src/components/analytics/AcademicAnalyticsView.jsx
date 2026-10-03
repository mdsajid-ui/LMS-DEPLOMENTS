import React, { useState } from 'react';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  Award, 
  Video, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Filter, 
  Sparkles, 
  ChevronRight, 
  Download, 
  Layers, 
  BarChart3, 
  ShieldCheck, 
  Activity,
  ArrowUpRight,
  MonitorPlay,
  RotateCcw
} from 'lucide-react';
import { academicAnalyticsData, currencyINR } from '../../data/analyticsSuiteData';

export default function AcademicAnalyticsView({ initialSubTab = 'mentor', showToast }) {
  const [activeTab, setActiveTab] = useState(initialSubTab); // 'mentor', 'class', 'batch'
  const [mentorFilter, setMentorFilter] = useState('ALL');
  const [selectedBatch, setSelectedBatch] = useState('ALL');

  const { mentorDashboard, classMonitoring, batchPerformance } = academicAnalyticsData;

  // Filtered mentors
  const displayedMentors = mentorDashboard.mentorsList.filter(m => {
    if (mentorFilter === 'ALL') return true;
    if (mentorFilter === 'Elite') return m.status === 'Elite';
    return m.specialization.includes(mentorFilter);
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* ========================================================================= */}
      {/* 1. ACADEMIC ANALYTICS HERO BANNER                                         */}
      {/* ========================================================================= */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-950 p-6 border border-slate-800/80 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Academic Intelligence Suite
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/10 text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Curriculum Tracking
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight">
              Academic Delivery & Faculty Governance
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Comprehensive telemetry for active mentors, live Zoom class attendance, batch milestones, and syllabus compliance across all data science cohorts.
            </p>
          </div>

          {/* Subtab Selector */}
          <div className="flex flex-wrap items-center gap-2 bg-[#0c182c]/80 p-1.5 rounded-2xl border border-white/10 shrink-0">
            <button
              onClick={() => setActiveTab('mentor')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'mentor'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Mentor Dashboard</span>
            </button>
            <button
              onClick={() => setActiveTab('class')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'class'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>Class Monitoring</span>
            </button>
            <button
              onClick={() => setActiveTab('batch')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'batch'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Batch Performance</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. TAB 1: MENTOR DASHBOARD                                                */}
      {/* ========================================================================= */}
      {activeTab === 'mentor' && (
        <div className="space-y-6">
          {/* Top KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 shadow-xl backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Active Faculty</span>
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-white mt-2">
                {mentorDashboard.kpis.totalActiveMentors} Mentors
              </div>
              <div className="text-[11px] text-emerald-400 font-semibold mt-1 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" />
                <span>100% Core Staff Active</span>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 shadow-xl backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Classes Conducted</span>
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <BookOpen className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-white mt-2">
                {mentorDashboard.kpis.classesConducted} Sessions
              </div>
              <div className="text-[11px] text-purple-300 font-mono mt-1">
                Attendance: {mentorDashboard.kpis.mentorAttendancePct}%
              </div>
            </div>

            <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 shadow-xl backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Student Feedback</span>
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Award className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-amber-400 mt-2">
                {mentorDashboard.kpis.studentFeedbackScore} <span className="text-xs text-slate-400 font-normal">/ 5.0</span>
              </div>
              <div className="text-[11px] text-emerald-400 font-semibold mt-1">
                ★ 98.2% 5-Star Ratings
              </div>
            </div>

            <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 shadow-xl backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Doubt SLA</span>
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-emerald-400 mt-2">
                {mentorDashboard.kpis.doubtResolutionTime}
              </div>
              <div className="text-[11px] text-slate-400 mt-1 font-mono">
                Pending Reviews: {mentorDashboard.kpis.pendingAssignmentReviews}
              </div>
            </div>
          </div>

          {/* Actionable Executive Insights */}
          <div className="rounded-2xl bg-gradient-to-r from-blue-950/40 via-purple-950/30 to-slate-900 p-5 border border-blue-500/30 shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Actionable Mentor Performance Telemetry
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-900/60 p-3 rounded-xl border border-white/5">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Top Performing Mentor</span>
                <span className="text-white font-bold block mt-0.5">{mentorDashboard.insights.bestPerforming}</span>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-xl border border-white/5">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Highest Engagement Velocity</span>
                <span className="text-white font-bold block mt-0.5">{mentorDashboard.insights.mostEngaged}</span>
              </div>
              <div className="bg-amber-500/10 p-3 rounded-xl border border-amber-500/30">
                <span className="text-amber-400 block text-[10px] uppercase font-bold">Evaluation SLA Attention</span>
                <span className="text-amber-200 font-semibold block mt-0.5">{mentorDashboard.insights.requiringAttention}</span>
              </div>
            </div>
            <div className="mt-3 text-[10px] text-slate-400 font-mono">
              Note: {mentorDashboard.insights.rankingBasis}
            </div>
          </div>

          {/* Mentors Table & Ranking */}
          <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 overflow-hidden shadow-xl">
            <div className="p-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-bold text-white text-sm">Faculty Roster & Performance Matrix</h3>
                <p className="text-xs text-slate-400">Class volume, student satisfaction ratings, and doubt resolution turnarounds</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-400">Filter Domain:</span>
                <select
                  value={mentorFilter}
                  onChange={(e) => setMentorFilter(e.target.value)}
                  className="bg-slate-800 text-white text-xs px-2.5 py-1.5 rounded-lg border border-slate-700 focus:outline-none"
                >
                  <option value="ALL">All Specializations</option>
                  <option value="Python">Python & ML</option>
                  <option value="SQL">SQL & Power BI</option>
                  <option value="Big Data">Big Data & PySpark</option>
                  <option value="Excel">Advanced Excel / VBA</option>
                  <option value="Elite">Elite Status Only</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-300">
                <thead className="bg-[#0b1728] text-slate-400 uppercase text-[10px] tracking-wider font-semibold border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Faculty Name</th>
                    <th className="py-3 px-3">Domain Specialization</th>
                    <th className="py-3 px-3 text-center">Sessions</th>
                    <th className="py-3 px-3 text-center">Attendance %</th>
                    <th className="py-3 px-3 text-center">Student Rating</th>
                    <th className="py-3 px-3 text-center">Doubt SLA</th>
                    <th className="py-3 px-3 text-center">Reviews Pending</th>
                    <th className="py-3 px-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {displayedMentors.map((m) => (
                    <tr key={m.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-4 font-bold text-white flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-slate-800 border border-orange-500/40 overflow-hidden flex items-center justify-center shrink-0">
                          <img src={m.avatar} alt={m.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <span>{m.name}</span>
                          <span className="block text-[10px] text-slate-400 font-normal">{m.role}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-slate-300 max-w-[220px] truncate">{m.specialization}</td>
                      <td className="py-3 px-3 text-center font-mono font-bold text-white">{m.classesConducted}</td>
                      <td className="py-3 px-3 text-center font-mono text-emerald-400 font-semibold">{m.attendancePct}%</td>
                      <td className="py-3 px-3 text-center">
                        <span className="inline-flex items-center gap-1 font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                          ★ {m.studentRating}
                          <span className="text-[9px] text-slate-400 font-normal">({m.sampleSize})</span>
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center font-mono text-slate-300">{m.doubtTurnaround}</td>
                      <td className="py-3 px-3 text-center font-mono">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          m.pendingReviews > 3 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-slate-800 text-slate-300'
                        }`}>
                          {m.pendingReviews}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          m.status === 'Elite'
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}>
                          {m.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. TAB 2: CLASS MONITORING                                                */}
      {/* ========================================================================= */}
      {activeTab === 'class' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 shadow-xl backdrop-blur-md">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Scheduled Today</span>
              <div className="text-2xl font-black text-white mt-1">
                {classMonitoring.kpis.classesScheduledToday} Classes
              </div>
              <div className="text-[11px] text-slate-400 mt-1">Daily timetable</div>
            </div>

            <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 shadow-xl backdrop-blur-md">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Conducted Today</span>
              <div className="text-2xl font-black text-emerald-400 mt-1">
                {classMonitoring.kpis.classesConductedToday} Done
              </div>
              <div className="text-[11px] text-emerald-400 font-semibold mt-1">
                ✓ 100% SLA Completion
              </div>
            </div>

            <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 shadow-xl backdrop-blur-md">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Average Attendance</span>
              <div className="text-2xl font-black text-blue-400 mt-1">
                {classMonitoring.kpis.averageAttendancePct}%
              </div>
              <div className="text-[11px] text-blue-300 font-semibold mt-1">
                Target: &gt;90% Achieved
              </div>
            </div>

            <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 shadow-xl backdrop-blur-md">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Rescheduled</span>
              <div className="text-2xl font-black text-amber-400 mt-1">
                {classMonitoring.kpis.classesRescheduled} Session
              </div>
              <div className="text-[11px] text-slate-400 mt-1">Notice served 24h prior</div>
            </div>
          </div>

          {/* Today's Live Class Session Telemetry */}
          <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 overflow-hidden shadow-xl">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white text-sm">Today&apos;s Live Classroom Roster & Stream Quality</h3>
                <p className="text-xs text-slate-400">Real-time attendance capture, mentor broadcast link, and Zoom/VdoCipher health</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold uppercase">
                All Clusters Operational
              </span>
            </div>

            <div className="divide-y divide-slate-800/60">
              {classMonitoring.liveSchedule.map((cls) => (
                <div key={cls.id} className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/10 text-orange-400">
                        {cls.batch}
                      </span>
                      <span className="text-xs font-bold text-white">{cls.subject}</span>
                    </div>
                    <p className="text-xs text-slate-300 font-medium">{cls.topic}</p>
                    <div className="text-[11px] text-slate-400 flex items-center gap-3">
                      <span>Faculty: <strong className="text-slate-200">{cls.mentor}</strong></span>
                      <span>•</span>
                      <span>Timing: <strong className="text-slate-200">{cls.time}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Attendance</span>
                      <span className="text-xs font-bold font-mono text-emerald-400">{cls.attendance}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Stream Quality</span>
                      <span className="text-xs font-mono text-slate-300">{cls.streamQuality}</span>
                    </div>
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                      cls.status === 'Completed'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : cls.status === 'In Progress'
                        ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30 animate-pulse'
                        : cls.status === 'Scheduled'
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {cls.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. TAB 3: BATCH PERFORMANCE                                               */}
      {/* ========================================================================= */}
      {activeTab === 'batch' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 shadow-xl backdrop-blur-md">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Active Cohorts</span>
              <div className="text-2xl font-black text-white mt-1">
                {batchPerformance.kpis.activeCohortsCount} Batches
              </div>
              <div className="text-[11px] text-slate-400 mt-1">APIDS, FDE, MPGA, DAS</div>
            </div>

            <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 shadow-xl backdrop-blur-md">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Avg Syllabus Coverage</span>
              <div className="text-2xl font-black text-emerald-400 mt-1">
                {batchPerformance.kpis.avgSyllabusCoveragePct}%
              </div>
              <div className="text-[11px] text-emerald-400 font-semibold mt-1">
                ✓ On Pace with Calender
              </div>
            </div>

            <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 shadow-xl backdrop-blur-md">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Practical Pass Rate</span>
              <div className="text-2xl font-black text-blue-400 mt-1">
                {batchPerformance.kpis.practicalPassRate}%
              </div>
              <div className="text-[11px] text-blue-300 font-semibold mt-1">
                Industry Defense Ready
              </div>
            </div>

            <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 shadow-xl backdrop-blur-md">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">At-Risk Cohorts</span>
              <div className="text-2xl font-black text-amber-400 mt-1">
                {batchPerformance.kpis.atRiskBatches} Cohort
              </div>
              <div className="text-[11px] text-amber-300 font-semibold mt-1">
                MPGA (Catchup Scheduled)
              </div>
            </div>
          </div>

          {/* Batches Detailed Grid */}
          <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 overflow-hidden shadow-xl">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white text-sm">Cohort Progression & Examination Velocity</h3>
                <p className="text-xs text-slate-400">Curriculum milestones, cohort attendance average, and expected graduation cycle</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-300">
                <thead className="bg-[#0b1728] text-slate-400 uppercase text-[10px] tracking-wider font-semibold border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Cohort Code</th>
                    <th className="py-3 px-3">Program</th>
                    <th className="py-3 px-3 text-center">Enrolled</th>
                    <th className="py-3 px-3">Syllabus Completed</th>
                    <th className="py-3 px-3 text-center">Attendance %</th>
                    <th className="py-3 px-3 text-center">Pass Rate %</th>
                    <th className="py-3 px-3">Faculty Lead</th>
                    <th className="py-3 px-4 text-center">Health Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {batchPerformance.batchesRoster.map((b) => (
                    <tr key={b.batch} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-4 font-bold text-white font-mono">{b.batch}</td>
                      <td className="py-3 px-3 font-semibold text-orange-400">{b.course}</td>
                      <td className="py-3 px-3 text-center font-mono font-bold">{b.enrolled}</td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${b.syllabusPct > 80 ? 'bg-emerald-500' : 'bg-blue-500'}`} 
                              style={{ width: `${b.syllabusPct}%` }}
                            />
                          </div>
                          <span className="font-mono text-[11px] font-bold text-white">{b.syllabusPct}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-center font-mono text-emerald-400 font-semibold">{b.attendancePct}%</td>
                      <td className="py-3 px-3 text-center font-mono text-white font-bold">{b.passRate}%</td>
                      <td className="py-3 px-3 text-slate-300">{b.mentorLead}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          b.health === 'On Track'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}>
                          {b.health}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
