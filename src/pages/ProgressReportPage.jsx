import React, { useState } from 'react';
import { 
  BarChart3, 
  Download, 
  Award, 
  CheckCircle2, 
  TrendingUp, 
  Calendar, 
  User, 
  Sparkles, 
  Flame, 
  ShieldCheck, 
  Clock, 
  FileText, 
  Check, 
  AlertCircle, 
  Star, 
  GraduationCap, 
  BookOpen, 
  Database, 
  Code, 
  Layers, 
  BrainCircuit, 
  Printer, 
  FileSpreadsheet, 
  Briefcase, 
  Activity, 
  Target,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import RadialGauge from '../components/RadialGauge';

export default function ProgressReportPage({ student }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'skills', 'assignments', 'attendance', 'projects', 'placement', 'gradecard'
  const [gradeCardModalOpen, setGradeCardModalOpen] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // 11 Specific Skills Requested
  const skillsProgress = [
    { name: "Excel Advanced", category: "Core Analytics", percent: 95, status: "Completed", lastActive: "28 Sep 2026", color: "text-emerald-500", barColor: "bg-emerald-500", icon: FileSpreadsheet, credits: 4, grade: "A+" },
    { name: "SQL Server", category: "Database & Querying", percent: 88, status: "In Progress", lastActive: "Yesterday", color: "text-blue-500", barColor: "bg-blue-500", icon: Database, credits: 4, grade: "A" },
    { name: "Python Programming", category: "Scripting & Data Science", percent: 82, status: "In Progress", lastActive: "Today", color: "text-indigo-500", barColor: "bg-indigo-500", icon: Code, credits: 4, grade: "A" },
    { name: "Power BI Complete Mastery", category: "Business Intelligence", percent: 78, status: "In Progress", lastActive: "26 Sep 2026", color: "text-amber-500", barColor: "bg-amber-500", icon: BarChart3, credits: 3, grade: "B+" },
    { name: "Tableau Desktop", category: "Visual Storytelling", percent: 65, status: "In Progress", lastActive: "24 Sep 2026", color: "text-teal-500", barColor: "bg-teal-500", icon: Layers, credits: 3, grade: "B" },
    { name: "Excel VBA Macro", category: "Process Automation", percent: 70, status: "In Progress", lastActive: "25 Sep 2026", color: "text-rose-500", barColor: "bg-rose-500", icon: Code, credits: 3, grade: "B+" },
    { name: "Applied Statistics", category: "Statistical Modeling", percent: 80, status: "Completed", lastActive: "20 Sep 2026", color: "text-emerald-500", barColor: "bg-emerald-500", icon: Activity, credits: 3, grade: "A" },
    { name: "Machine Learning", category: "Predictive Analytics", percent: 55, status: "In Progress", lastActive: "29 Sep 2026", color: "text-purple-500", barColor: "bg-purple-500", icon: BrainCircuit, credits: 4, grade: "B" },
    { name: "Deep Learning (PyTorch)", category: "Neural Networks", percent: 40, status: "Ongoing", lastActive: "27 Sep 2026", color: "text-orange-500", barColor: "bg-orange-500", icon: BrainCircuit, credits: 4, grade: "In Progress" },
    { name: "Generative AI & LLMs", category: "GenAI & Agentic Systems", percent: 45, status: "Ongoing", lastActive: "Today", color: "text-cyan-500", barColor: "bg-cyan-500", icon: Sparkles, credits: 3, grade: "In Progress" },
    { name: "Data Structures & Algorithms (DSA)", category: "Problem Solving", percent: 60, status: "In Progress", lastActive: "22 Sep 2026", color: "text-slate-500", barColor: "bg-slate-600", icon: Layers, credits: 3, grade: "B" }
  ];

  // Assignments Detailed Tracking
  const assignmentsList = [
    { id: "ASN-01", title: "Retail Sales Performance Analysis (Excel & Dynamic Arrays)", dueDate: "15.07.2026", submittedDate: "14.07.2026", score: 96, maxScore: 100, status: "Evaluated", grade: "A+", mentorReview: "Exceptional multi-criteria lookup implementation and dynamic pivot slicers." },
    { id: "ASN-02", title: "Automated Invoice Generator with VBA Macro & PDF Export", dueDate: "15.08.2026", submittedDate: "12.08.2026", score: 92, maxScore: 100, status: "Evaluated", grade: "A", mentorReview: "Clean subroutine structure with error handling and formatted currency cells." },
    { id: "ASN-03", title: "E-Commerce Database Schema, CTEs & Complex Window Joins", dueDate: "10.09.2026", submittedDate: "05.09.2026", score: 94, maxScore: 100, status: "Evaluated", grade: "A", mentorReview: "Optimized non-clustered indexes and accurate DENSE_RANK spending calculations." },
    { id: "ASN-04", title: "Customer Churn Prediction & Model Validation in Python", dueDate: "10.10.2026", submittedDate: "Pending Submission", score: null, maxScore: 100, status: "In Progress", grade: "Pending", mentorReview: "Workbook downloaded; feature engineering stage currently underway." }
  ];

  // Industry Capstone Projects
  const projectsList = [
    { title: "Credit Risk Application Scorecard", domain: "Banking & Finance", status: "Completed", grade: "A+", mentor: "Devender Devgan Das", feedback: "Demonstrated thorough weight-of-evidence (WoE) transformation and achieved 0.89 AUC-ROC on validation data.", completionDate: "18 Aug 2026" },
    { title: "E-Commerce Recommendation & Dynamic Pricing", domain: "Retail & E-Commerce", status: "Completed", grade: "A", mentor: "Senior AI Faculty", feedback: "Collaborative filtering matrix factorization and real-time market basket analysis well executed.", completionDate: "02 Sep 2026" },
    { title: "Hospital Readmission Clinical Prediction", domain: "Healthcare & Life Sciences", status: "Completed", grade: "A", mentor: "Clinical Data Lead", feedback: "Handled severe class imbalance using SMOTE and provided clinically interpretable feature importances.", completionDate: "20 Sep 2026" },
    { title: "Agentic AI Customer Support Desk", domain: "Telecom & Service Ops", status: "In Progress", grade: "Pending", mentor: "AI Architect", feedback: "Multi-agent supervisor routing pipeline configured with LangGraph. Evaluation in progress.", completionDate: "Due 25 Oct 2026" },
    { title: "Digital Forensics & SIEM SOC Log Monitor", domain: "Cybersecurity", status: "In Progress", grade: "Pending", mentor: "Security Operations Lead", feedback: "Nmap event ingestion and real-time anomaly detection rules configured in Splunk sandbox.", completionDate: "Due 15 Nov 2026" }
  ];

  // Monthly Attendance Distribution
  const monthlyAttendance = [
    { month: "June 2026", attended: 6, total: 6, pct: 100 },
    { month: "July 2026", attended: 7, total: 8, pct: 87.5 },
    { month: "August 2026", attended: 7, total: 8, pct: 87.5 },
    { month: "September 2026", attended: 6, total: 8, pct: 75.0 }
  ];

  // Weekly LMS Activity Log
  const weeklyHours = [
    { day: "Mon", live: 2.0, recorded: 3.5, total: 5.5 },
    { day: "Tue", live: 0.0, recorded: 4.2, total: 4.2 },
    { day: "Wed", live: 2.5, recorded: 1.8, total: 4.3 },
    { day: "Thu", live: 0.0, recorded: 3.0, total: 3.0 },
    { day: "Fri", live: 2.0, recorded: 4.0, total: 6.0 },
    { day: "Sat", live: 4.0, recorded: 2.5, total: 6.5 },
    { day: "Sun", live: 3.5, recorded: 1.5, total: 5.0 }
  ];

  const handleDownloadTranscript = () => {
    setDownloadSuccess(true);
    setTimeout(() => {
      window.print();
      setDownloadSuccess(false);
    }, 400);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-sans antialiased text-slate-800">
      
      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
          <BarChart3 className="w-4 h-4 text-orange-500" />
          <span>/</span>
          <span className="text-slate-900 font-semibold tracking-tight">Student Progress Report & Official Grade Card</span>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button 
            onClick={() => setGradeCardModalOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 text-orange-600 border border-orange-500/30 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Award className="w-3.5 h-3.5" />
            <span>Official Grade Card</span>
          </button>

          <button 
            onClick={handleDownloadTranscript}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all cursor-pointer"
          >
            {downloadSuccess ? <Check className="w-4 h-4 text-emerald-400" /> : <Download className="w-4 h-4 text-orange-400" />}
            <span>{downloadSuccess ? "Generating PDF..." : "Download Official Transcript"}</span>
          </button>
        </div>
      </div>

      {/* Hero Header Banner (Exact LMS Visual Language) */}
      <div className="bg-slate-950 text-white rounded-2xl px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                {student.courseCode} — Student Performance Dashboard
              </h2>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Verified Academic Record
              </span>
            </div>
            <p className="text-xs text-orange-400 font-medium">
              {student.courseName}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-xl text-xs font-mono text-slate-200">
            <Calendar className="w-3.5 h-3.5 text-orange-400" />
            <span>Enrolled: {student.startDate}</span>
          </div>
        </div>
      </div>

      {/* Student Information Profile Strip */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-xs">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">Learner Name</span>
          <span className="font-bold text-slate-900 truncate block text-sm">{student.name}</span>
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">Student ID</span>
          <span className="font-mono font-bold text-slate-800 block">{student.studentId}</span>
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">Assigned Batch</span>
          <span className="font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-200/60 inline-block font-mono">
            {student.batch}
          </span>
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">Chief Mentor</span>
          <span className="font-semibold text-slate-800 block">Devender Devgan Das</span>
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">Cumulative CGPA</span>
          <span className="font-bold text-emerald-600 text-sm block">8.85 / 10.0 (Grade A+)</span>
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">Academic Status</span>
          <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Active Distinction
          </span>
        </div>
      </div>

      {/* Overall Progress KPI Cards (6 Key Metrics Requested) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        
        {/* KPI 1: Course Completion */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Course Progress</span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <BookOpen className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 tracking-tight">68%</div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
              <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '68%' }}></div>
            </div>
            <span className="text-[10px] text-slate-400 mt-1.5 block">14 of 20 modules completed</span>
          </div>
        </div>

        {/* KPI 2: Attendance */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Live Attendance</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Clock className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 tracking-tight">86.7%</div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
              <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '86.7%' }}></div>
            </div>
            <span className="text-[10px] text-slate-400 mt-1.5 block">26 of 30 live classes attended</span>
          </div>
        </div>

        {/* KPI 3: Assignments */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Assignments</span>
            <div className="w-7 h-7 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
              <FileText className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 tracking-tight">75%</div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
              <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: '75%' }}></div>
            </div>
            <span className="text-[10px] text-slate-400 mt-1.5 block">3 of 4 submitted (Avg: 94%)</span>
          </div>
        </div>

        {/* KPI 4: Projects */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Capstones</span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Briefcase className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 tracking-tight">60%</div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
              <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: '60%' }}></div>
            </div>
            <span className="text-[10px] text-slate-400 mt-1.5 block">3 of 5 industry projects done</span>
          </div>
        </div>

        {/* KPI 5: LMS Activity Score */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">LMS Activity</span>
            <div className="w-7 h-7 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold">
              <Activity className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 tracking-tight">94/100</div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
              <div className="bg-cyan-500 h-1.5 rounded-full" style={{ width: '94%' }}></div>
            </div>
            <span className="text-[10px] text-slate-400 mt-1.5 block">Top 5% Cohort Activity</span>
          </div>
        </div>

        {/* KPI 6: Placement Readiness */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Placement Ready</span>
            <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-emerald-600 tracking-tight">88%</div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
              <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '88%' }}></div>
            </div>
            <span className="text-[10px] text-slate-400 mt-1.5 block">Star Candidate Tier</span>
          </div>
        </div>

      </div>

      {/* Main Grid: Learning Progress by Skill (11 Specific Skills) & Attendance / Learning Streak */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (7 cols): Learning Progress by Skill */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-orange-500" />
                Learning Progress by Skill (11 Cohort Domains)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Evaluated based on lecture assessments, coding sandboxes, and viva examinations.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
              Avg: 70.7%
            </span>
          </div>

          <div className="space-y-3.5">
            {skillsProgress.map((skill, idx) => {
              const IconComp = skill.icon;
              return (
                <div key={idx} className="p-3 rounded-2xl bg-slate-50/70 border border-slate-100 hover:border-slate-200 transition-all">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-6 h-6 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center ${skill.color}`}>
                        <IconComp className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block leading-tight">{skill.name}</span>
                        <span className="text-[10px] text-slate-400">{skill.category}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
                        Active: {skill.lastActive}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        skill.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        skill.status === 'In Progress' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                        'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {skill.status}
                      </span>
                      <span className="font-mono font-black text-slate-800 text-xs w-9 text-right">
                        {skill.percent}%
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200/70 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${skill.barColor}`} 
                      style={{ width: `${skill.percent}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (5 cols): Attendance Analytics & Learning Streak */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Learning Streak Card */}
          <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-orange-950 text-white rounded-3xl p-5 border border-slate-800 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
                  <Flame className="w-5 h-5 text-orange-400 animate-bounce" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Active Learning Streak</h4>
                  <span className="text-[11px] text-orange-300">Continuous LMS Engagement</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30 text-xs font-mono font-bold flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-orange-400" /> 7 Days
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2.5 text-center pt-1">
              <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Hours</span>
                <span className="text-base font-black text-white font-mono mt-0.5 block">104.5h</span>
              </div>
              <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Last Login</span>
                <span className="text-base font-black text-emerald-400 font-mono mt-0.5 block">Today</span>
              </div>
              <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Cohort Rank</span>
                <span className="text-base font-black text-orange-400 font-mono mt-0.5 block">#4 / 48</span>
              </div>
            </div>

            {/* Weekly Activity Mini Bar Chart */}
            <div className="pt-2 border-t border-slate-800">
              <span className="text-[11px] font-bold text-slate-300 block mb-2">Weekly LMS Hours Logged:</span>
              <div className="flex items-end justify-between gap-1.5 h-20 pt-2">
                {weeklyHours.map((wh, idx) => {
                  const maxH = 7;
                  const pct = Math.min(100, (wh.total / maxH) * 100);
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group">
                      <span className="text-[9px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        {wh.total}h
                      </span>
                      <div 
                        className="w-full rounded-t-md bg-gradient-to-t from-orange-600 to-amber-400 transition-all duration-300 group-hover:brightness-125"
                        style={{ height: `${pct}%` }}
                      ></div>
                      <span className="text-[10px] font-bold text-slate-400">{wh.day}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Attendance Analytics Card */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600" /> Attendance Analytics
              </h3>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                86.7% Attended
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Attended Sessions</span>
                <span className="text-lg font-black text-slate-900 font-mono mt-0.5 block">26 Classes</span>
                <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">52.0 Hours Completed</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Missed Classes</span>
                <span className="text-lg font-black text-slate-900 font-mono mt-0.5 block">4 Classes</span>
                <span className="text-[10px] text-slate-500 mt-1 block">Full recordings reviewed</span>
              </div>
            </div>

            {/* Monthly Trend Bars */}
            <div className="space-y-2 pt-1">
              <span className="text-[11px] font-bold text-slate-700 block">Monthly Attendance Record:</span>
              {monthlyAttendance.map((m, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-medium text-slate-600">{m.month}</span>
                    <span className="font-mono font-bold text-slate-800">{m.attended}/{m.total} ({m.pct}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className={`h-1.5 rounded-full ${m.pct >= 85 ? 'bg-emerald-500' : 'bg-amber-500'}`} 
                      style={{ width: `${m.pct}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Meets mandatory 75% attendance threshold for DV Analytics Certificate.</span>
            </div>
          </div>

        </div>

      </div>

      {/* Assignment Tracking Section */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <FileText className="w-4 h-4 text-orange-500" />
              Assignment Tracking & Scorecard
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Continuous assessment tasks submitted via LMS and evaluated by faculty mentors.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
              3 Completed
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-orange-50 text-orange-700 border border-orange-200">
              1 Pending
            </span>
          </div>
        </div>

        {/* Assignments Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider text-[10px]">
                <th className="py-2.5 px-3 font-bold">Code</th>
                <th className="py-2.5 px-3 font-bold">Assignment Title</th>
                <th className="py-2.5 px-3 font-bold">Due Date</th>
                <th className="py-2.5 px-3 font-bold">Submitted</th>
                <th className="py-2.5 px-3 font-bold">Status</th>
                <th className="py-2.5 px-3 font-bold text-right">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {assignmentsList.map((asn, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-orange-600">{asn.id}</td>
                  <td className="py-3 px-3">
                    <span className="font-bold text-slate-900 block">{asn.title}</span>
                    <span className="text-[11px] text-slate-400 italic block mt-0.5">{asn.mentorReview}</span>
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-600">{asn.dueDate}</td>
                  <td className="py-3 px-3 font-mono text-slate-600">{asn.submittedDate}</td>
                  <td className="py-3 px-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      asn.status === 'Evaluated' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      'bg-orange-50 text-orange-700 border border-orange-200'
                    }`}>
                      {asn.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold">
                    {asn.score ? (
                      <span className="text-emerald-600 font-black text-sm">{asn.score}/100 ({asn.grade})</span>
                    ) : (
                      <span className="text-slate-400">In Review</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Project Progress (Industry Capstones) & Placement Readiness */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Project Capstones (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-purple-600" />
                Industry Capstone Projects (3/5 Completed)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Real-world projects evaluated against corporate delivery benchmarks.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200">
              60% Completed
            </span>
          </div>

          <div className="space-y-3">
            {projectsList.map((proj, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100 hover:border-slate-200 transition-all space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">{proj.title}</h4>
                    <span className="text-[10px] text-purple-600 font-semibold">{proj.domain}</span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                    proj.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                    'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {proj.status === 'Completed' ? `Grade: ${proj.grade}` : 'In Progress'}
                  </span>
                </div>

                <p className="text-[11px] text-slate-500 leading-snug">
                  <strong>Mentor Review:</strong> "{proj.feedback}"
                </p>

                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-200/60 font-mono">
                  <span>Mentor: {proj.mentor}</span>
                  <span>{proj.completionDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Placement Readiness Breakdown (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Placement Readiness Evaluation (88%)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Verified by DV Analytics Career Development Cell (CDC).
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-700">ATS Resume Optimization</span>
                <span className="text-emerald-600 font-mono">95% (Ready)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-700">LinkedIn & Portfolio Verification</span>
                <span className="text-emerald-600 font-mono">100% (Verified)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-700">Technical Mock Interview Score</span>
                <span className="text-blue-600 font-mono">88 / 100</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '88%' }}></div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-700">CAT Technical Assessment</span>
                <span className="text-indigo-600 font-mono">92% (Top Decile)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-700">HR Viva & Behavioral Communication</span>
                <span className="text-purple-600 font-mono">86 / 100</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: '86%' }}></div>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950 to-slate-900 text-white border border-emerald-500/30 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-xs text-emerald-400">
              <Star className="w-4 h-4 fill-emerald-400 text-emerald-400" />
              <span>Certified Placement Ready Candidate</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-snug">
              Approved for direct referrals across 100+ hiring partners in Bangalore, Bhubaneswar, and nationwide for Data Analyst & Jr. Data Scientist roles.
            </p>
          </div>
        </div>

      </div>

      {/* Performance Insights & Improvement Recommendations */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-orange-500" />
          Intelligent Academic Insights & Recommendations
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-1">
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wide block">Strongest Skill</span>
            <span className="font-bold text-slate-900 block text-sm">Excel Modeling & SQL (95%)</span>
            <p className="text-[11px] text-slate-600">Demonstrates mastery in complex CTEs, window functions, and multi-criteria lookups.</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-1">
            <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wide block">Improvement Focus</span>
            <span className="font-bold text-slate-900 block text-sm">PyTorch Tensor Tuning</span>
            <p className="text-[11px] text-slate-600">Allocate extra practice hours on loss functions and backward propagation in Deep Learning.</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200/80 space-y-1">
            <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wide block">Recommended Module</span>
            <span className="font-bold text-slate-900 block text-sm">RAG Pipelines & Agentic AI</span>
            <p className="text-[11px] text-slate-600">Ready to start LangChain, CrewAI, and Vector Database integration modules.</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-200/80 space-y-1">
            <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wide block">Next Academic Goal</span>
            <span className="font-bold text-slate-900 block text-sm">Submit ASN-04 (Oct 10)</span>
            <p className="text-[11px] text-slate-600">Complete the churn prediction script to maintain top-decile 90%+ course standing.</p>
          </div>
        </div>
      </div>

      {/* Official Grade Card & Transcript Modal */}
      {gradeCardModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-300 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden text-slate-800">
            
            {/* Modal Header */}
            <div className="bg-slate-950 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Official Grade Card & Transcript</h3>
                  <span className="text-[11px] text-slate-400">DV Data & Analytics Pvt Ltd — Academic Record</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadTranscript}
                  className="px-3 py-1 bg-white text-slate-900 hover:bg-slate-100 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-orange-600" />
                  <span>Print Grade Card</span>
                </button>
                <button
                  onClick={() => setGradeCardModalOpen(false)}
                  className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                >
                  &times;
                </button>
              </div>
            </div>

            {/* Printable Grade Card Sheet */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 bg-white">
              
              {/* Institution Header */}
              <div className="text-center border-b-2 border-slate-900 pb-5">
                <h2 className="text-2xl font-black tracking-tight text-slate-900">DV ANALYTICS</h2>
                <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold mt-0.5">
                  Premier Institute for Industrial Data Science & Artificial Intelligence
                </p>
                <p className="text-[11px] text-slate-400">
                  Bangalore • Bhubaneswar • Dubai • https://www.dvanalyticsmds.com
                </p>
                <div className="mt-3 inline-block px-3 py-1 rounded bg-slate-100 text-slate-800 font-bold text-xs uppercase tracking-wider border border-slate-300">
                  Official Statement of Academic Grades
                </div>
              </div>

              {/* Student Metadata Table */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-400 font-bold text-[10px] block">STUDENT NAME</span>
                  <span className="font-bold text-slate-900 text-sm">{student.name}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold text-[10px] block">ROLL NUMBER</span>
                  <span className="font-mono font-bold text-slate-900">{student.studentId}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold text-[10px] block">PROGRAM CODE</span>
                  <span className="font-bold text-orange-600">{student.courseCode}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold text-[10px] block">BATCH</span>
                  <span className="font-mono font-bold text-slate-900">{student.batch}</span>
                </div>
              </div>

              {/* Grades Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-100 text-slate-700 font-bold text-[11px]">
                    <tr className="border-b border-slate-200">
                      <th className="py-2.5 px-3">Subject / Course Module</th>
                      <th className="py-2.5 px-3">Credits</th>
                      <th className="py-2.5 px-3 text-right">Score %</th>
                      <th className="py-2.5 px-3 text-right">Letter Grade</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {skillsProgress.map((sk, i) => (
                      <tr key={i} className="hover:bg-slate-50/50">
                        <td className="py-2.5 px-3 font-semibold text-slate-800">{sk.name}</td>
                        <td className="py-2.5 px-3 font-mono text-slate-600">{sk.credits}</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-right text-slate-800">{sk.percent}%</td>
                        <td className="py-2.5 px-3 font-mono font-black text-right text-orange-600">{sk.grade}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-slate-50 border-t-2 border-slate-900 font-bold text-xs text-slate-900">
                    <tr>
                      <td className="py-3 px-3">CUMULATIVE GRADE POINT AVERAGE (CGPA)</td>
                      <td className="py-3 px-3 font-mono">35 Total Credits</td>
                      <td className="py-3 px-3 text-right font-mono">Weighted: 88.5%</td>
                      <td className="py-3 px-3 text-right font-mono text-emerald-600 text-sm">8.85 / 10.0 (A+)</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Verification & Signatures */}
              <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-500">
                <div className="text-center sm:text-left">
                  <span className="font-bold text-slate-700 block">Date of Issue: 30 September 2026</span>
                  <span className="text-[11px] text-slate-400">Security Hash: DVA-VERIF-7782-9901-ACAD</span>
                </div>

                <div className="flex items-center gap-12 text-center">
                  <div>
                    <div className="w-32 border-b border-slate-400 mb-1"></div>
                    <span className="font-bold text-slate-700 text-[11px] block">Chief Mentor</span>
                    <span className="text-[10px] text-slate-400">Devender Devgan Das</span>
                  </div>

                  <div>
                    <div className="w-32 border-b border-slate-400 mb-1"></div>
                    <span className="font-bold text-slate-700 text-[11px] block">Controller of Exams</span>
                    <span className="text-[10px] text-slate-400">DV Academic Council</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
