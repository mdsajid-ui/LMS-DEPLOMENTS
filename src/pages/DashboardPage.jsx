import React from 'react';
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
  Bell
} from 'lucide-react';
import RadialGauge from '../components/RadialGauge';

export default function DashboardPage({ 
  student, 
  onNavigateToCourses, 
  onNavigateToAssignments, 
  onNavigateToAttendance,
  onNavigateToSession
}) {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Breadcrumb & Batch Selector (Matching Image 2) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
          <LayoutDashboard className="w-4 h-4 text-orange-500" />
          <span>/</span>
          <span className="text-slate-900 font-semibold">Dashboard</span>
        </div>

        {/* Batch Selector Pill */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Active Cohort:</span>
          <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold text-xs px-3.5 py-1.5 rounded-full shadow-sm flex items-center gap-2">
            <span>{student.batch}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
          </div>
        </div>
      </div>

      {/* Main Section Header Banner: "My Overall Progress" (Matches black bar in Image 2) */}
      <div className="bg-slate-950 text-white rounded-2xl px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md border border-slate-800">
        <div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <TrendingUp className="w-5 h-5 text-orange-500" />
            My Overall Progress
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Live metric tracking for program completion, lecture attendance, and project evaluations.
          </p>
        </div>

        <div className="text-right flex items-center gap-3">
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

      {/* 3 Circular Radial Gauges (Directly corresponding to Image 2) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Gauge 1: Course Progress */}
        <div onClick={onNavigateToCourses} className="cursor-pointer transition-transform hover:-translate-y-1">
          <RadialGauge
            title="Course"
            percentage={0}
            status="Pending"
            color="#3b82f6"
            size={190}
            strokeWidth={14}
            subtitle="0 of 20 Modules Done"
            icon={BookOpen}
          />
        </div>

        {/* Gauge 2: Attendance (60% Completed with Red/Coral Stroke in Image 2) */}
        <div onClick={onNavigateToAttendance} className="cursor-pointer transition-transform hover:-translate-y-1">
          <RadialGauge
            title="Attendance"
            percentage={student.attendancePercent}
            status="Completed"
            color="#ef4444"
            size={190}
            strokeWidth={14}
            subtitle="18 of 30 Sessions"
            icon={Clock}
          />
        </div>

        {/* Gauge 3: Assignments */}
        <div onClick={onNavigateToAssignments} className="cursor-pointer transition-transform hover:-translate-y-1">
          <RadialGauge
            title="Assignments"
            percentage={0}
            status="Pending"
            color="#f59e0b"
            size={190}
            strokeWidth={14}
            subtitle="3 Assignments Due"
            icon={ClipboardList}
          />
        </div>
      </div>

      {/* Quick Action Banner: Continue Recent Learning */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-5 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4 border border-blue-800/50">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 flex-shrink-0">
            <PlayCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-orange-500 text-white">
                Next In Line
              </span>
              <span className="text-xs text-blue-200">DBMS & Programming</span>
            </div>
            <h3 className="text-base font-bold text-white mt-1">
              Excel Base and Advanced: Session 1
            </h3>
            <p className="text-xs text-blue-200/80">
              Formulas & Dynamic Referencing • Dr. Sandip Mukherjee
            </p>
          </div>
        </div>

        <button
          onClick={onNavigateToSession}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs transition-all shadow-md active:scale-95 flex-shrink-0"
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
              Upcoming Live Sessions
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

        {/* Pending Items & Notifications */}
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
                    Application Aptitude Benchmark Test
                  </h4>
                  <p className="text-[11px] text-slate-600">60 mins • Online Proctored</p>
                </div>
              </div>
              <span className="text-xs text-blue-700 font-semibold cursor-pointer hover:underline">
                Start &rarr;
              </span>
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
