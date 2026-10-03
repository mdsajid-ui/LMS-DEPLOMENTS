import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Clock, 
  ClipboardList, 
  Calendar, 
  PlayCircle, 
  ChevronRight, 
  ArrowUpRight, 
  AlertCircle, 
  CheckCircle,
  TrendingUp,
  FileCheck2,
  Bell,
  Video,
  Eye,
  Award,
  Flame,
  Sparkles,
  BarChart2,
  CheckCircle2,
  Compass,
  ArrowRight
} from 'lucide-react';
import RadialGauge from '../components/RadialGauge';
import { weeklyLearningAnalytics, courseCategories, studentProfile } from '../data/mockData';

export default function DashboardPage({ 
  student = studentProfile, 
  onNavigateToCourses, 
  onNavigateToAssignments, 
  onNavigateToAttendance, 
  onNavigateToSession, 
  onNavigateToCat,
  onNavigateToProgressReport,
  onOpenSanviAssistant,
  onOpenDvAssistant
}) {
  // Read dynamic watch time from localStorage if updated during video playback
  const [watchedHours, setWatchedHours] = useState(student.watchedRecordedHours);
  const [watchPercentage, setWatchPercentage] = useState(student.watchedPercent);

  useEffect(() => {
    try {
      const storedMinutes = localStorage.getItem('dv_extra_watch_minutes');
      if (storedMinutes) {
        const extraHours = parseFloat(storedMinutes) / 60;
        const newTotal = parseFloat((student.watchedRecordedHours + extraHours).toFixed(1));
        setWatchedHours(newTotal);
        setWatchPercentage(parseFloat(((newTotal / student.totalRecordedHours) * 100).toFixed(1)));
      }
    } catch (e) {
      // fallback
    }
  }, [student]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Breadcrumb & Cohort Pill */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
          <LayoutDashboard className="w-4 h-4 text-orange-500" />
          <span>/</span>
          <span className="text-slate-900 font-semibold">Dashboard</span>
          <span>/</span>
          <span className="text-slate-500">Learner Performance & Watch Time Hub</span>
        </div>

        {/* Learning Streak & Active Cohort */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold">
            <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500 animate-bounce" />
            <span>{student.streakDays || 7} Day Streak!</span>
          </div>

          <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold text-xs px-3.5 py-1.5 rounded-full shadow-sm flex items-center gap-2">
            <span>{student.batch}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
          </div>
        </div>
      </div>

      {/* Main Section Header Banner: "My Overall Progress" (Matches black bar in LMS) */}
      <div className="bg-slate-950 text-white rounded-2xl px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md border border-slate-800">
        <div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <TrendingUp className="w-5 h-5 text-orange-500" />
            My Overall Progress & Attendance Analytics
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Tracking live lectures, recorded session watch durations, assignments, and CAT benchmarks.
          </p>
        </div>

        <div className="text-right flex items-center gap-4">
          <div className="text-left sm:text-right">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Program Code</span>
            <span className="text-xs font-mono font-bold text-orange-400">{student.courseCode}</span>
          </div>
          <div className="h-7 w-px bg-slate-800"></div>
          <div className="text-left sm:text-right">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Start Date</span>
            <span className="text-xs font-mono font-medium text-slate-200">{student.startDate}</span>
          </div>
        </div>
      </div>

      {/* 4 Performance Metric Radial Gauges / Progress Hub */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Gauge 1: Live Class Attendance */}
        <div onClick={onNavigateToAttendance} className="cursor-pointer transition-transform hover:-translate-y-1">
          <RadialGauge
            title="Live Classes"
            percentage={student.attendancePercent}
            status="Attended"
            color="#ef4444"
            size={180}
            strokeWidth={13}
            subtitle={`${student.liveAttendedCount || 18} of ${student.liveTotalCount || 30} Sessions`}
            icon={Clock}
          />
        </div>

        {/* Gauge 2: Recorded Video Watch Time Tracker (Key user requirement) */}
        <div onClick={onNavigateToSession} className="cursor-pointer transition-transform hover:-translate-y-1">
          <RadialGauge
            title="Recorded Videos"
            percentage={Math.round(watchPercentage)}
            status="Watch Time"
            color="#3b82f6"
            size={180}
            strokeWidth={13}
            subtitle={`${watchedHours}h of ${student.totalRecordedHours}h Watched`}
            icon={Video}
          />
        </div>

        {/* Gauge 3: Assignments Progress */}
        <div onClick={onNavigateToAssignments} className="cursor-pointer transition-transform hover:-translate-y-1">
          <RadialGauge
            title="Assignments"
            percentage={33}
            status="1 Done"
            color="#f59e0b"
            size={180}
            strokeWidth={13}
            subtitle="2 Submissions Due"
            icon={ClipboardList}
          />
        </div>

        {/* Gauge 4: CAT Benchmark Assessment */}
        <div onClick={onNavigateToCat} className="cursor-pointer transition-transform hover:-translate-y-1">
          <RadialGauge
            title="CAT Benchmark"
            percentage={88}
            status="Qualified"
            color="#10b981"
            size={180}
            strokeWidth={13}
            subtitle="Top 6% Percentile"
            icon={Award}
          />
        </div>
      </div>

      {/* Progress Report & Grade Card Access Strip */}
      {onNavigateToProgressReport && (
        <div 
          onClick={onNavigateToProgressReport}
          className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 p-4 rounded-2xl border border-slate-800 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md hover:border-orange-500/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center justify-center font-bold">
              <Award className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-sm tracking-tight text-white group-hover:text-orange-400 transition-colors">
                  Official Student Performance &amp; Progress Report
                </h4>
                <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">
                  Grade A+ (8.85 CGPA)
                </span>
              </div>
              <p className="text-xs text-slate-400">
                View verified module grade sheets, 11 skill competencies, assignments review, and official transcript download.
              </p>
            </div>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); onNavigateToProgressReport(); }}
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition-all shadow-sm self-start sm:self-auto cursor-pointer"
          >
            <span>View Progress Report</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Advanced Section: Live Attendance vs. Recorded Video Watch Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Weekly Study Time Breakdown (Live Hours vs Recorded Hours) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
            <div>
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-blue-600" />
                Live Attendance vs. Recorded Video Watch Time (Weekly)
              </h3>
              <p className="text-xs text-slate-500">
                Total hours logged this week: <strong className="text-slate-800">27.0 Hours</strong> across cohorts
              </p>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-3 text-[11px] font-semibold">
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-sm bg-red-500"></span> Live Classes
              </span>
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-sm bg-blue-500"></span> Recorded Videos
              </span>
            </div>
          </div>

          {/* Bar Chart Visualization */}
          <div className="space-y-3 pt-2">
            <div className="grid grid-cols-7 gap-2 sm:gap-3 text-center">
              {weeklyLearningAnalytics.map((item) => {
                const totalDayHours = item.liveHours + item.recordedHours;
                const maxHours = 7.0; // scale limit
                const liveHeight = (item.liveHours / maxHours) * 120;
                const recHeight = (item.recordedHours / maxHours) * 120;

                return (
                  <div key={item.day} className="flex flex-col items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-400">
                      {totalDayHours > 0 ? `${totalDayHours}h` : '-'}
                    </span>
                    <div className="w-full max-w-[36px] h-32 bg-slate-100 rounded-xl flex flex-col justify-end p-1 gap-1 overflow-hidden">
                      {/* Live Bar */}
                      {item.liveHours > 0 && (
                        <div 
                          style={{ height: `${liveHeight}px` }} 
                          className="w-full bg-red-500 rounded-md transition-all duration-500"
                          title={`Live Classes: ${item.liveHours} hrs`}
                        ></div>
                      )}
                      {/* Recorded Bar */}
                      {item.recordedHours > 0 && (
                        <div 
                          style={{ height: `${recHeight}px` }} 
                          className="w-full bg-blue-500 rounded-md transition-all duration-500"
                          title={`Recorded Session: ${item.recordedHours} hrs`}
                        ></div>
                      )}
                    </div>
                    <span className="text-xs font-bold text-slate-700">{item.day}</span>
                  </div>
                );
              })}
            </div>
            <p className="text-[11px] text-slate-400 text-center italic">
              Pro-tip: Recorded video playback time is tracked automatically whenever you watch sessions in the video player.
            </p>
          </div>
        </div>

        {/* Right 1 Col: Sanvi AI Voice Advisor Performance Insights */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950 text-white rounded-2xl p-5 border border-rose-500/30 shadow-md flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-rose-500/20 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400 animate-ping"></span>
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-300">
                  Sanvi AI Voice Advisor
                </h4>
              </div>
              <span className="text-[10px] font-mono bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded border border-rose-500/30">
                Voice Enabled
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs leading-relaxed text-slate-300">
              <p>
                <strong className="text-rose-400 font-semibold">Sanvi's Recommendation:</strong> You have completed 100% of Excel recorded lectures and scored 94% on SQL Assignment 3.
              </p>
              <p className="text-slate-400 text-[11px]">
                To stay on schedule for your next milestone, finish the remaining 4 hours of SQL Server recordings before Saturday's live workshop.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/20 text-[11px] space-y-1">
              <div className="flex items-center justify-between text-rose-300 font-semibold">
                <span>Coordination Helpline:</span>
                <span>+91 98300 12345</span>
              </div>
              <span className="text-slate-400 text-[10px] block">
                Academic Coordinator Rahul is on duty today.
              </span>
            </div>
          </div>

          <button
            onClick={onOpenSanviAssistant || onOpenDvAssistant}
            className="w-full mt-4 py-2.5 px-3 rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-400 hover:to-orange-400 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-rose-950/50 transition-all active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            Talk with Sanvi (Voice AI)
          </button>
        </div>
      </div>

      {/* Subject-Wise Video Watch Time Breakdown */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Eye className="w-4 h-4 text-orange-500" />
              Subject-Wise Recorded Watch Time & Completion
            </h3>
            <p className="text-xs text-slate-500">
              Real-time video tracking across curriculum modules in APIDS.
            </p>
          </div>
          <button 
            onClick={onNavigateToCourses}
            className="text-xs font-semibold text-orange-600 hover:underline flex items-center gap-1"
          >
            View All Courses &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courseCategories[0].subjects.slice(0, 4).map((sub) => {
            const watched = sub.watchedHours || 0;
            const total = sub.hours || 20;
            const pct = Math.round((watched / total) * 100);

            return (
              <div 
                key={sub.id} 
                onClick={onNavigateToSession}
                className="p-4 rounded-xl border border-slate-200/70 bg-slate-50/50 hover:bg-slate-50 transition-all cursor-pointer space-y-2 group"
              >
                <div className="flex items-center justify-between text-xs">
                  <h4 className="font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                    {sub.name}
                  </h4>
                  <span className={`font-mono text-[11px] font-bold px-2 py-0.5 rounded ${
                    pct === 100 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                      : pct > 0 
                        ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                        : 'bg-slate-100 text-slate-500'
                  }`}>
                    {pct}% Watched
                  </span>
                </div>

                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div 
                    style={{ width: `${pct}%` }} 
                    className={`h-full rounded-full transition-all duration-500 ${
                      pct === 100 ? 'bg-emerald-500' : 'bg-blue-500'
                    }`}
                  ></div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>{watched} hrs watched of {total} hrs total</span>
                  <span className="font-semibold text-slate-700">{sub.status}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Action Banner: Continue Recent Learning with Exact Timestamp */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-slate-950 rounded-2xl p-5 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4 border border-blue-900/60">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 flex-shrink-0">
            <PlayCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-orange-500 text-white">
                Resume Recording
              </span>
              <span className="text-xs text-blue-200">Timestamp: 18:42 / 57:00</span>
            </div>
            <h3 className="text-base font-bold text-white mt-1">
              Excel Base and Advanced: Session 1 (Core Concepts)
            </h3>
            <p className="text-xs text-slate-300">
              Faculty: Dr. Sandip Mukherjee • Automatically adds to your LMS watch hours
            </p>
          </div>
        </div>

        <button
          onClick={onNavigateToSession}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs transition-all shadow-md active:scale-95 flex-shrink-0 cursor-pointer"
        >
          Resume Lesson
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Grid of Key Alerts & Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Next Live Class & Schedule */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4 text-orange-500" />
              Upcoming Live Sessions & Masterclasses
            </h3>
            <span className="text-xs text-blue-600 font-medium cursor-pointer hover:underline">
              View Calendar
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Tomorrow • 7:00 PM IST
                </span>
                <h4 className="text-xs font-bold text-slate-900 mt-1">
                  Live Doubt Clearing: SQL Server Complex Joins & Subqueries
                </h4>
                <p className="text-[11px] text-slate-500">Instructor: Senior Data Architect</p>
              </div>
              <button className="px-3 py-1.5 rounded-lg bg-slate-900 text-white text-[11px] font-medium hover:bg-slate-800 transition-colors flex-shrink-0">
                Join Link
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  Saturday • 10:00 AM IST
                </span>
                <h4 className="text-xs font-bold text-slate-900 mt-1">
                  Hands-on Workshop: Building Interactive Power BI Executive Dashboards
                </h4>
                <p className="text-[11px] text-slate-500">Hands-on Lab Session</p>
              </div>
              <button className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-medium hover:bg-slate-200 transition-colors flex-shrink-0">
                Remind Me
              </button>
            </div>
          </div>
        </div>

        {/* Action Items Requiring Attention */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500" />
              Action Items Requiring Attention
            </h3>
            <span className="text-xs text-orange-600 font-semibold bg-orange-50 px-2.5 py-0.5 rounded-full">
              3 Tasks
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-amber-50/50 border border-amber-200/80 flex items-center justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <ClipboardList className="w-4 h-4 text-amber-600 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    Submit Assignment 1: Retail Sales Performance
                  </h4>
                  <p className="text-[11px] text-slate-600">Due in 3 days (15 Oct 2026)</p>
                </div>
              </div>
              <button 
                onClick={onNavigateToAssignments}
                className="text-xs text-amber-700 font-semibold hover:underline"
              >
                Upload &rarr;
              </button>
            </div>

            <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-200/80 flex items-center justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <FileCheck2 className="w-4 h-4 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    Candidates Application Test (CAT)
                  </h4>
                  <p className="text-[11px] text-slate-600">MCQ, Practical Lab & Viva</p>
                </div>
              </div>
              <button 
                onClick={onNavigateToCat}
                className="text-xs text-blue-700 font-semibold hover:underline"
              >
                Open CAT &rarr;
              </button>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-200/80 flex items-center justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    Profile Verification & Enrollment
                  </h4>
                  <p className="text-[11px] text-slate-600">Document verification verified</p>
                </div>
              </div>
              <span className="text-xs text-emerald-700 font-semibold">Done</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
