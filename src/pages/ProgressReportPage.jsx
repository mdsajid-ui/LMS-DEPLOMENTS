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
  ExternalLink,
  MessageSquare,
  Search,
  Filter,
  Users,
  CheckCheck,
  Receipt
} from 'lucide-react';
import InvoiceFormatModal from '../components/InvoiceFormatModal';

export default function ProgressReportPage({ student }) {
  // Navigation tabs: 'sms-performance', 'sms-reviews', 'skills', 'assignments', 'capstones'
  const [activeTab, setActiveTab] = useState('sms-performance');
  const [gradeCardModalOpen, setGradeCardModalOpen] = useState(false);
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [reviewFilter, setReviewFilter] = useState('all'); // 'all', 'faculty', 'mentor', 'student'
  const [searchModule, setSearchModule] = useState('');

  // 10 Standard i-SMS Curriculum Modules
  const smsModulesData = [
    {
      id: "M01",
      name: "EXCEL AI",
      attendedDays: 12,
      totalDays: 12,
      attendedHours: 24,
      totalHours: 24,
      attendancePct: 100,
      assignmentPct: 96,
      testScorePct: 94,
      performanceLevel: "Excellent",
      topics: "Dynamic Arrays, XLOOKUP, Nested LAMBDA, AI Copilot, Power Query"
    },
    {
      id: "M02",
      name: "SQL",
      attendedDays: 14,
      totalDays: 15,
      attendedHours: 28,
      totalHours: 30,
      attendancePct: 93,
      assignmentPct: 92,
      testScorePct: 90,
      performanceLevel: "Excellent",
      topics: "PostgreSQL, Multi-Table Joins, CTEs, Window Functions, Stored Procs"
    },
    {
      id: "M03",
      name: "POWER BI",
      attendedDays: 10,
      totalDays: 11,
      attendedHours: 20,
      totalHours: 22,
      attendancePct: 91,
      assignmentPct: 88,
      testScorePct: 86,
      performanceLevel: "Very Good",
      topics: "DAX Modeling, CALCULATE, Star Schema, Dynamic KPI Dashboards"
    },
    {
      id: "M04",
      name: "PYTHON",
      attendedDays: 15,
      totalDays: 16,
      attendedHours: 30,
      totalHours: 32,
      attendancePct: 94,
      assignmentPct: 89,
      testScorePct: 88,
      performanceLevel: "Very Good",
      topics: "NumPy, Pandas, Matplotlib, Seaborn, Feature Engineering, EDA"
    },
    {
      id: "M05",
      name: "SAS",
      attendedDays: 8,
      totalDays: 8,
      attendedHours: 16,
      totalHours: 16,
      attendancePct: 100,
      assignmentPct: 85,
      testScorePct: 84,
      performanceLevel: "Very Good",
      topics: "Base SAS, PROC SQL, Data Step Macro Processing, Pharma & Banking"
    },
    {
      id: "M06",
      name: "ML (Machine Learning)",
      attendedDays: 11,
      totalDays: 12,
      attendedHours: 22,
      totalHours: 24,
      attendancePct: 92,
      assignmentPct: 84,
      testScorePct: 82,
      performanceLevel: "Very Good",
      topics: "Scikit-Learn, Regression, Classification, SMOTE, Hyperparameter Tuning"
    },
    {
      id: "M07",
      name: "GEN AI & AGENTIC AI",
      attendedDays: 8,
      totalDays: 10,
      attendedHours: 16,
      totalHours: 20,
      attendancePct: 80,
      assignmentPct: 82,
      testScorePct: 80,
      performanceLevel: "Good",
      topics: "Gemini 2.5/Flash, LangChain, RAG Systems, Multi-Agent Supervisors"
    },
    {
      id: "M08",
      name: "DATA ENGINEERING",
      attendedDays: 9,
      totalDays: 10,
      attendedHours: 18,
      totalHours: 20,
      attendancePct: 90,
      assignmentPct: 86,
      testScorePct: 82,
      performanceLevel: "Very Good",
      topics: "ETL Pipelines, PySpark, Airflow DAGs, Cloud Warehousing (Snowflake)"
    },
    {
      id: "M09",
      name: "MLOPS & LLMOPS",
      attendedDays: 6,
      totalDays: 8,
      attendedHours: 12,
      totalHours: 16,
      attendancePct: 75,
      assignmentPct: 78,
      testScorePct: 76,
      performanceLevel: "Good",
      topics: "Model Registry, MLflow, Docker Containerization, CI/CD Deployment"
    },
    {
      id: "M10",
      name: "INTERVIEW PREP",
      attendedDays: 7,
      totalDays: 8,
      attendedHours: 14,
      totalHours: 16,
      attendancePct: 88,
      assignmentPct: 90,
      testScorePct: 89,
      performanceLevel: "Very Good",
      topics: "Technical Mock Viva, Business Case Studies, Resume Tailoring, HR Round"
    }
  ];

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
    { title: "Credit Risk Application Scorecard", domain: "Banking & Finance", status: "Completed", grade: "A+", mentor: "Debendra Das Debadutta", feedback: "Demonstrated thorough weight-of-evidence (WoE) transformation and achieved 0.89 AUC-ROC on validation data.", completionDate: "18 Aug 2026" },
    { title: "E-Commerce Recommendation & Dynamic Pricing", domain: "Retail & E-Commerce", status: "Completed", grade: "A", mentor: "Senior AI Faculty", feedback: "Collaborative filtering matrix factorization and real-time market basket analysis well executed.", completionDate: "02 Sep 2026" },
    { title: "Hospital Readmission Clinical Prediction", domain: "Healthcare & Life Sciences", status: "Completed", grade: "A", mentor: "Clinical Data Lead", feedback: "Handled severe class imbalance using SMOTE and provided clinically interpretable feature importances.", completionDate: "20 Sep 2026" },
    { title: "Agentic AI Customer Support Desk", domain: "Telecom & Service Ops", status: "In Progress", grade: "Pending", mentor: "AI Architect", feedback: "Multi-agent supervisor routing pipeline configured with LangGraph. Evaluation in progress.", completionDate: "Due 25 Oct 2026" },
    { title: "Digital Forensics & SIEM SOC Log Monitor", domain: "Cybersecurity", status: "In Progress", grade: "Pending", mentor: "Security Operations Lead", feedback: "Nmap event ingestion and real-time anomaly detection rules configured in Splunk sandbox.", completionDate: "Due 15 Nov 2026" }
  ];

  // Review & Feedback Feed (i-SMS Mentor & Faculty Review System)
  const reviewsData = [
    {
      id: "REV-101",
      type: "faculty",
      faculty: "Debendra Das Debadutta",
      role: "Lead Analytics Architect",
      date: "01 Oct 2026",
      module: "SQL & Relational Architecture",
      score: 9.5,
      rating: 5,
      status: "Excellent",
      feedback: "Demonstrates exceptional grasp over multi-table schema normalization, index strategies, and CTE window aggregations. Solved the proctor test with zero syntax errors.",
      focus: "Encouraged to explore distributed PostgreSQL partitioning and columnstore engines."
    },
    {
      id: "REV-102",
      type: "mentor",
      faculty: "Priya Sharma",
      role: "Senior Data Science Mentor",
      date: "28 Sep 2026",
      module: "Python Data Wrangling & Modeling",
      score: 9.0,
      rating: 5,
      status: "Very Good",
      feedback: "Fast-paced assignment submissions. Script architecture in Pandas and Seaborn is clean and modular. Handled null imputation correctly.",
      focus: "Practice vectorization over row-by-row apply loops to reduce execution runtimes."
    },
    {
      id: "REV-103",
      type: "faculty",
      faculty: "Aniket Rao",
      role: "BI & Enterprise Reporting Specialist",
      date: "22 Sep 2026",
      module: "Power BI & DAX Calculations",
      score: 8.8,
      rating: 4,
      status: "Very Good",
      feedback: "Visual narrative is strong and dashboard layout adheres to high contrast UI guidelines. Context transitions in CALCULATE are well understood.",
      focus: "Review bidirectional cross-filtering pitfalls in complex dimensional models."
    },
    {
      id: "REV-104",
      type: "mentor",
      faculty: "Career Development Cell (CDC)",
      role: "Placement Evaluation Panel",
      date: "15 Sep 2026",
      module: "Placement Readiness & Technical Viva",
      score: 9.2,
      rating: 5,
      status: "Distinction",
      feedback: "Aced the 45-minute technical viva round. Clear explanations on ROC-AUC tradeoffs and SQL query execution plans.",
      focus: "Approved for direct scheduling in Tier-1 product and consulting hiring drives."
    }
  ];

  // Monthly Performance Trajectory Trend
  const performanceTrend = [
    { month: "Jun", score: 82 },
    { month: "Jul", score: 85 },
    { month: "Aug", score: 88 },
    { month: "Sep", score: 91 },
    { month: "Oct", score: 88 }
  ];

  const handleDownloadTranscript = () => {
    setDownloadSuccess(true);
    setTimeout(() => {
      window.print();
      setDownloadSuccess(false);
    }, 400);
  };

  const filteredModules = smsModulesData.filter(m => 
    m.name.toLowerCase().includes(searchModule.toLowerCase()) ||
    m.topics.toLowerCase().includes(searchModule.toLowerCase())
  );

  const filteredReviews = reviewFilter === 'all' 
    ? reviewsData 
    : reviewsData.filter(r => r.type === reviewFilter);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-sans antialiased text-slate-800">
      
      {/* Top Header & Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 text-white flex items-center justify-center font-black text-xs shadow-xs">
            SMS
          </div>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900 font-bold tracking-tight">
            i-SMS Student Management & Performance System
          </span>
          <span className="hidden md:inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-200">
            v2.4 Active
          </span>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button 
            onClick={() => setInvoiceModalOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-700 border border-teal-500/30 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Receipt className="w-3.5 h-3.5" />
            <span>Tax Invoice</span>
          </button>

          <button 
            onClick={() => setGradeCardModalOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 text-orange-600 border border-orange-500/30 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Award className="w-3.5 h-3.5" />
            <span>Official Grade Card</span>
          </button>

          <button 
            onClick={handleDownloadTranscript}
            className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all cursor-pointer"
          >
            {downloadSuccess ? <Check className="w-4 h-4 text-emerald-300" /> : <Download className="w-4 h-4 text-white" />}
            <span>{downloadSuccess ? "Generating PDF..." : "Download Report"}</span>
          </button>
        </div>
      </div>

      {/* Main Tabs Switcher */}
      <div className="flex items-center gap-2 overflow-x-auto p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
        <button
          onClick={() => setActiveTab('sms-performance')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'sms-performance'
              ? 'bg-white text-sky-700 shadow-xs border border-slate-200/80'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <BarChart3 className="w-4 h-4 text-sky-600" />
          <span>Performance Dashboard</span>
        </button>

        <button
          onClick={() => setActiveTab('sms-reviews')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'sms-reviews'
              ? 'bg-white text-sky-700 shadow-xs border border-slate-200/80'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <MessageSquare className="w-4 h-4 text-sky-600" />
          <span>Review & Feedback Dashboard</span>
        </button>

        <button
          onClick={() => setActiveTab('skills')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'skills'
              ? 'bg-white text-sky-700 shadow-xs border border-slate-200/80'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <BrainCircuit className="w-4 h-4 text-indigo-600" />
          <span>Cohort Skills Matrix (11 Domains)</span>
        </button>

        <button
          onClick={() => setActiveTab('assignments')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'assignments'
              ? 'bg-white text-sky-700 shadow-xs border border-slate-200/80'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <FileText className="w-4 h-4 text-orange-600" />
          <span>Assignments & Submissions</span>
        </button>

        <button
          onClick={() => setActiveTab('capstones')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'capstones'
              ? 'bg-white text-sky-700 shadow-xs border border-slate-200/80'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <Briefcase className="w-4 h-4 text-purple-600" />
          <span>Industry Capstones</span>
        </button>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          TAB 1: i-SMS STUDENT PERFORMANCE DASHBOARD (CORE IMPLEMENTATION)
         ───────────────────────────────────────────────────────────── */}
      {activeTab === 'sms-performance' && (
        <div className="space-y-6 animate-in fade-in">
          
          {/* Top Row: Student Profile Card + 6 Top KPI Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            
            {/* Student Profile Card (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between">
              <div className="bg-gradient-to-r from-sky-700 to-indigo-800 px-5 py-3 text-white flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider font-extrabold">STUDENT PROFILE</span>
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-mono font-bold">i-SMS Verified</span>
              </div>

              <div className="p-5 flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-md border-2 border-white flex-shrink-0">
                  <User className="w-8 h-8" />
                </div>
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Student Name</span>
                    <strong className="text-base font-extrabold text-slate-900 block truncate">{student.name}</strong>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-slate-100">
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">Student ID</span>
                      <span className="font-mono font-bold text-sky-700">{student.studentId}</span>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">Batch</span>
                      <span className="font-semibold text-slate-800">{student.batch}</span>
                    </div>
                  </div>
                  <div className="pt-1">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">Enrolled Course</span>
                    <span className="font-medium text-slate-700 text-[11px] block truncate">{student.courseName}</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 px-5 py-2.5 border-t border-slate-100 text-[11px] flex items-center justify-between text-slate-500">
                <span>Academic Standing:</span>
                <span className="font-bold text-emerald-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Active Distinction (CGPA 8.85)
                </span>
              </div>
            </div>

            {/* 6 Top KPI Cards (8 cols -> 2x3 or 3x2 grid) */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-3.5">
              
              {/* 1. ATTENDANCE (icon-green) */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wide">ATTENDANCE</span>
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                    <Clock className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-2xl font-black text-emerald-600 tracking-tight">92%</div>
                  <div className="text-[11px] text-slate-400 font-medium mt-0.5">(55 / 60 Days)</div>
                </div>
              </div>

              {/* 2. ASSIGNMENTS (icon-blue) */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wide">ASSIGNMENTS</span>
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    <FileText className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-2xl font-black text-blue-600 tracking-tight">88%</div>
                  <div className="text-[11px] text-slate-400 font-medium mt-0.5">(Avg. Completion)</div>
                </div>
              </div>

              {/* 3. TEST SCORE (icon-purple) */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wide">TEST SCORE</span>
                  <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                    <Award className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-2xl font-black text-purple-600 tracking-tight">85%</div>
                  <div className="text-[11px] text-slate-400 font-medium mt-0.5">(Average Score)</div>
                </div>
              </div>

              {/* 4. OVERALL SCORE (icon-gold) */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wide">OVERALL SCORE</span>
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                    <Star className="w-4 h-4 fill-amber-500" />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-2xl font-black text-amber-600 tracking-tight">88%</div>
                  <div className="text-[11px] text-slate-400 font-medium mt-0.5">(Weighted Score)</div>
                </div>
              </div>

              {/* 5. ELITE GROUP (icon-darkgreen) */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wide">ELITE GROUP</span>
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <span className="inline-block px-2.5 py-1 rounded-lg text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                    SELECTED
                  </span>
                  <div className="text-[11px] text-emerald-700 font-medium mt-1">(Top Decile)</div>
                </div>
              </div>

              {/* 6. PLACEMENT SUPPORT (icon-teal) */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wide">PLACEMENT SUPPORT</span>
                  <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <span className="inline-block px-2.5 py-1 rounded-lg text-xs font-black bg-teal-100 text-teal-800 border border-teal-300">
                    YES
                  </span>
                  <div className="text-[11px] text-teal-700 font-medium mt-1">(Eligible Tier-1)</div>
                </div>
              </div>

            </div>

          </div>

          {/* Middle Section: Performance Summary + Application-Wise Table + Overall Donut & Status */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            
            {/* Left Subcolumn: Performance Summary Card (3 cols) */}
            <div className="lg:col-span-3 space-y-5">
              
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                <div className="bg-gradient-to-r from-sky-700 to-indigo-800 px-4 py-3 text-white text-xs font-mono font-extrabold uppercase tracking-wide">
                  PERFORMANCE SUMMARY
                </div>
                <div className="p-4 space-y-3.5 text-xs divide-y divide-slate-100">
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Clock className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Total Days Attended</span>
                    </div>
                    <strong className="font-mono text-slate-900 font-bold">55 / 60 <span className="text-emerald-600 font-bold">(92%)</span></strong>
                  </div>

                  <div className="flex items-center justify-between pt-3">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Clock className="w-3.5 h-3.5 text-sky-500" />
                      <span>Total Training Hours</span>
                    </div>
                    <strong className="font-mono text-slate-900 font-bold">214 / 240 <span className="text-emerald-600 font-bold">(89%)</span></strong>
                  </div>

                  <div className="flex items-center justify-between pt-3">
                    <div className="flex items-center gap-2 text-slate-600">
                      <FileText className="w-3.5 h-3.5 text-blue-500" />
                      <span>Assignments Submitted</span>
                    </div>
                    <strong className="font-mono text-blue-600 font-bold">88%</strong>
                  </div>

                  <div className="flex items-center justify-between pt-3">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Award className="w-3.5 h-3.5 text-purple-500" />
                      <span>Average Test Score</span>
                    </div>
                    <strong className="font-mono text-purple-600 font-bold">85%</strong>
                  </div>

                  <div className="flex items-center justify-between pt-3">
                    <div className="flex items-center gap-2 text-slate-600">
                      <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
                      <span>Overall Weighted Score</span>
                    </div>
                    <strong className="font-mono text-amber-600 text-sm font-black">88%</strong>
                  </div>
                </div>
              </div>

              {/* Status & Eligibility Card */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 space-y-3">
                <span className="text-xs font-mono font-extrabold uppercase tracking-wide text-slate-500 block border-b border-slate-100 pb-2">
                  ELIGIBILITY & STATUS
                </span>
                
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Elite Group</span>
                    <span className="px-2 py-0.5 rounded font-bold text-[11px] bg-emerald-50 text-emerald-700 border border-emerald-200">
                      SELECTED
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Placement Support</span>
                    <span className="px-2 py-0.5 rounded font-bold text-[11px] bg-teal-50 text-teal-700 border border-teal-200">
                      YES
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Placement Readiness</span>
                    <span className="font-mono font-bold text-slate-800 text-xs bg-slate-100 px-2 py-0.5 rounded">
                      88% (Star Tier)
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Current Standing</span>
                    <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-purple-50 text-purple-700 border border-purple-200">
                      Top 5% Cohort
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Center Subcolumn: Application-Wise Performance Table (6 cols) */}
            <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col">
              <div className="bg-gradient-to-r from-sky-700 to-indigo-800 px-5 py-3 text-white flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider font-extrabold">
                  APPLICATION-WISE PERFORMANCE (10 CURRICULUM MODULES)
                </span>
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-mono font-bold">
                  {smsModulesData.length} Modules
                </span>
              </div>

              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px] font-bold">
                      <th className="py-2.5 px-3 w-8">#</th>
                      <th className="py-2.5 px-3">Application</th>
                      <th className="py-2.5 px-3 text-center">Days</th>
                      <th className="py-2.5 px-3 text-center">Hours</th>
                      <th className="py-2.5 px-3 text-center">Att %</th>
                      <th className="py-2.5 px-3 text-center">Asn %</th>
                      <th className="py-2.5 px-3 text-center">Test %</th>
                      <th className="py-2.5 px-3 text-right">Level</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {smsModulesData.map((m, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-2.5 px-3 font-mono text-slate-400 font-bold">{idx + 1}</td>
                        <td className="py-2.5 px-3">
                          <span className="font-bold text-slate-900 block">{m.name}</span>
                          <span className="text-[10px] text-slate-400 block truncate max-w-[180px]">{m.topics}</span>
                        </td>
                        <td className="py-2.5 px-3 text-center font-mono font-semibold text-slate-700">
                          {m.attendedDays}/{m.totalDays}
                        </td>
                        <td className="py-2.5 px-3 text-center font-mono font-semibold text-slate-700">
                          {m.attendedHours}/{m.totalHours}
                        </td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-emerald-600">
                          {m.attendancePct}%
                        </td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-blue-600">
                          {m.assignmentPct}%
                        </td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-purple-600">
                          {m.testScorePct}%
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            m.performanceLevel === 'Excellent' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                            m.performanceLevel === 'Very Good' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                            'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                            {m.performanceLevel}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-slate-100/90 font-bold border-t-2 border-slate-300 text-slate-900">
                      <td colSpan="4" className="py-2.5 px-3 font-mono font-extrabold uppercase text-[11px]">
                        OVERALL COHORT AVERAGE
                      </td>
                      <td className="py-2.5 px-3 text-center font-mono font-black text-emerald-700">92%</td>
                      <td className="py-2.5 px-3 text-center font-mono font-black text-blue-700">88%</td>
                      <td className="py-2.5 px-3 text-center font-mono font-black text-purple-700">85%</td>
                      <td className="py-2.5 px-3 text-right">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-600 text-white">
                          Very Good
                        </span>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Right Subcolumn: Overall Performance Donut & Gauge (3 cols) */}
            <div className="lg:col-span-3 space-y-5">
              
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                <div className="bg-gradient-to-r from-sky-700 to-indigo-800 px-4 py-3 text-white text-xs font-mono font-extrabold uppercase tracking-wide">
                  OVERALL PERFORMANCE
                </div>
                
                <div className="p-4 flex flex-col items-center">
                  
                  {/* SVG Multi-Ring Donut Gauge */}
                  <div className="relative w-36 h-36 my-2">
                    <svg viewBox="0 0 160 160" className="w-full h-full transform -rotate-90">
                      {/* Background circle */}
                      <circle cx="80" cy="80" r="60" fill="none" stroke="#e2e8f0" strokeWidth="16" />
                      {/* Attendance 30% segment */}
                      <circle 
                        cx="80" cy="80" r="60" 
                        fill="none" 
                        stroke="#10b981" 
                        strokeWidth="16" 
                        strokeDasharray="105 377" 
                        strokeDashoffset="94" 
                        strokeLinecap="round" 
                      />
                      {/* Assignment 30% segment */}
                      <circle 
                        cx="80" cy="80" r="60" 
                        fill="none" 
                        stroke="#2563eb" 
                        strokeWidth="16" 
                        strokeDasharray="100 377" 
                        strokeDashoffset="366" 
                        strokeLinecap="round" 
                      />
                      {/* Test 40% segment */}
                      <circle 
                        cx="80" cy="80" r="60" 
                        fill="none" 
                        stroke="#8b5cf6" 
                        strokeWidth="16" 
                        strokeDasharray="130 377" 
                        strokeDashoffset="240" 
                        strokeLinecap="round" 
                      />
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-2xl font-black text-slate-900 tracking-tight">88%</span>
                      <span className="text-[10px] text-slate-400 font-semibold uppercase">Overall</span>
                    </div>
                  </div>

                  {/* Donut Legend */}
                  <div className="w-full space-y-2 pt-3 border-t border-slate-100 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                        <span className="text-slate-600 text-[11px]">Attendance (30%)</span>
                      </div>
                      <strong className="font-mono font-bold text-slate-900">92%</strong>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                        <span className="text-slate-600 text-[11px]">Assignments (30%)</span>
                      </div>
                      <strong className="font-mono font-bold text-slate-900">88%</strong>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
                        <span className="text-slate-600 text-[11px]">Test Score (40%)</span>
                      </div>
                      <strong className="font-mono font-bold text-slate-900">85%</strong>
                    </div>
                  </div>

                </div>
              </div>

              {/* Placement Ready Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-sky-950 to-indigo-950 text-white border border-slate-800 space-y-2">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="font-bold text-xs text-amber-300">Verified by CDC Placement Cell</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Candidate has cleared minimum attendance (75%+), average assignment criteria (80%+), and practical test proctor scores.
                </p>
              </div>

            </div>

          </div>

          {/* Bottom Section: 4 Interactive Visualizations (i-SMS Visual Bar & Trend Charts) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* 1. ATTENDANCE % BY APPLICATION */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3">
              <span className="text-[11px] font-mono font-extrabold uppercase tracking-wide text-slate-600 block">
                ATTENDANCE % BY APPLICATION
              </span>
              <div className="flex items-end justify-between gap-1 h-28 pt-2">
                {smsModulesData.map((m, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group">
                    <span className="text-[8px] font-mono text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                      {m.attendancePct}%
                    </span>
                    <div 
                      className="w-full rounded-t bg-emerald-500 transition-all duration-300 group-hover:brightness-110"
                      style={{ height: `${m.attendancePct}%` }}
                    ></div>
                    <span className="text-[8px] font-bold text-slate-400 truncate w-full text-center">
                      {m.name.split(' ')[0]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. ASSIGNMENT % BY APPLICATION */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3">
              <span className="text-[11px] font-mono font-extrabold uppercase tracking-wide text-slate-600 block">
                ASSIGNMENT % BY APPLICATION
              </span>
              <div className="flex items-end justify-between gap-1 h-28 pt-2">
                {smsModulesData.map((m, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group">
                    <span className="text-[8px] font-mono text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                      {m.assignmentPct}%
                    </span>
                    <div 
                      className="w-full rounded-t bg-blue-600 transition-all duration-300 group-hover:brightness-110"
                      style={{ height: `${m.assignmentPct}%` }}
                    ></div>
                    <span className="text-[8px] font-bold text-slate-400 truncate w-full text-center">
                      {m.name.split(' ')[0]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. TEST SCORE % BY APPLICATION */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3">
              <span className="text-[11px] font-mono font-extrabold uppercase tracking-wide text-slate-600 block">
                TEST SCORE % BY APPLICATION
              </span>
              <div className="flex items-end justify-between gap-1 h-28 pt-2">
                {smsModulesData.map((m, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group">
                    <span className="text-[8px] font-mono text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                      {m.testScorePct}%
                    </span>
                    <div 
                      className="w-full rounded-t bg-purple-600 transition-all duration-300 group-hover:brightness-110"
                      style={{ height: `${m.testScorePct}%` }}
                    ></div>
                    <span className="text-[8px] font-bold text-slate-400 truncate w-full text-center">
                      {m.name.split(' ')[0]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. STUDENT PERFORMANCE TREND */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3">
              <span className="text-[11px] font-mono font-extrabold uppercase tracking-wide text-slate-600 block">
                PERFORMANCE TREND (OVERALL %)
              </span>
              <div className="flex items-end justify-between gap-2 h-28 pt-2">
                {performanceTrend.map((pt, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group">
                    <span className="text-[9px] font-mono text-sky-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      {pt.score}%
                    </span>
                    <div 
                      className="w-full rounded-t bg-gradient-to-t from-sky-600 to-indigo-500 transition-all duration-300 group-hover:brightness-110"
                      style={{ height: `${pt.score}%` }}
                    ></div>
                    <span className="text-[10px] font-bold text-slate-500">
                      {pt.month}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 2: i-SMS REVIEW & FEEDBACK DASHBOARD
         ───────────────────────────────────────────────────────────── */}
      {activeTab === 'sms-reviews' && (
        <div className="space-y-6 animate-in fade-in">
          
          {/* Review Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setReviewFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  reviewFilter === 'all' ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                All Reviews ({reviewsData.length})
              </button>
              <button
                onClick={() => setReviewFilter('faculty')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  reviewFilter === 'faculty' ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Faculty Feedback
              </button>
              <button
                onClick={() => setReviewFilter('mentor')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  reviewFilter === 'mentor' ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Mentor & Placement
              </button>
            </div>

            <div className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
              <CheckCheck className="w-4 h-4 text-emerald-500" />
              <span>All 4 periodic mentor reviews completed</span>
            </div>
          </div>

          {/* Feedback Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredReviews.map((rev, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3 hover:border-slate-300 transition-all">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded border border-sky-200 inline-block mb-1">
                      {rev.module}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm">{rev.faculty}</h4>
                    <span className="text-xs text-slate-400">{rev.role}</span>
                  </div>

                  <div className="text-right">
                    <span className="text-base font-black text-slate-900 font-mono block">{rev.score} / 10</span>
                    <div className="flex items-center gap-0.5 text-amber-400 justify-end mt-0.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 text-xs text-slate-700 leading-relaxed border border-slate-100">
                  <p className="italic">"{rev.feedback}"</p>
                </div>

                <div className="text-xs pt-1 border-t border-slate-100 flex items-center justify-between text-slate-500">
                  <span className="text-[11px] text-indigo-600 font-semibold">
                    Focus: {rev.focus}
                  </span>
                  <span className="font-mono text-[10px] text-slate-400">{rev.date}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 3: COHORT SKILLS MATRIX (11 DOMAINS)
         ───────────────────────────────────────────────────────────── */}
      {activeTab === 'skills' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-5 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-indigo-600" />
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
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100 hover:border-slate-200 transition-all">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-7 h-7 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center ${skill.color}`}>
                        <IconComp className="w-4 h-4" />
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
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 4: ASSIGNMENTS & SUBMISSIONS
         ───────────────────────────────────────────────────────────── */}
      {activeTab === 'assignments' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4 animate-in fade-in">
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
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 5: INDUSTRY CAPSTONES
         ───────────────────────────────────────────────────────────── */}
      {activeTab === 'capstones' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4 animate-in fade-in">
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
              <div key={idx} className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 hover:border-slate-200 transition-all space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{proj.title}</h4>
                    <span className="text-[10px] text-purple-600 font-semibold">{proj.domain}</span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                    proj.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                    'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {proj.status === 'Completed' ? `Grade: ${proj.grade}` : 'In Progress'}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-snug">
                  <strong>Mentor Review:</strong> "{proj.feedback}"
                </p>

                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-200/60 font-mono">
                  <span>Mentor: {proj.mentor}</span>
                  <span>{proj.completionDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
                  className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer text-xl"
                >
                  &times;
                </button>
              </div>
            </div>

            {/* Printable Grade Card Sheet */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 bg-white">
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
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Learner Name</span>
                  <strong className="text-slate-900">{student.name}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Student ID</span>
                  <span className="font-mono font-bold text-slate-800">{student.studentId}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Program</span>
                  <span className="font-semibold text-slate-800">{student.courseName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">CGPA / Grade</span>
                  <span className="font-bold text-emerald-600">8.85 / 10.0 (Grade A+)</span>
                </div>
              </div>

              {/* Modules Transcript */}
              <table className="w-full text-left text-xs border border-slate-300">
                <thead>
                  <tr className="bg-slate-900 text-white font-mono uppercase text-[10px]">
                    <th className="p-2 border border-slate-700">Code</th>
                    <th className="p-2 border border-slate-700">Application Module</th>
                    <th className="p-2 border border-slate-700 text-center">Att %</th>
                    <th className="p-2 border border-slate-700 text-center">Asn %</th>
                    <th className="p-2 border border-slate-700 text-center">Test %</th>
                    <th className="p-2 border border-slate-700 text-right">Performance Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {smsModulesData.map((m, idx) => (
                    <tr key={idx}>
                      <td className="p-2 font-mono font-bold border-r border-slate-200">{m.id}</td>
                      <td className="p-2 font-bold text-slate-900 border-r border-slate-200">{m.name}</td>
                      <td className="p-2 text-center font-mono border-r border-slate-200">{m.attendancePct}%</td>
                      <td className="p-2 text-center font-mono border-r border-slate-200">{m.assignmentPct}%</td>
                      <td className="p-2 text-center font-mono border-r border-slate-200">{m.testScorePct}%</td>
                      <td className="p-2 text-right font-bold text-emerald-700">{m.performanceLevel}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="pt-6 border-t border-slate-300 flex items-center justify-between text-xs text-slate-500">
                <div>
                  <p className="font-bold text-slate-900">DV Analytics Academic Registrar</p>
                  <p className="text-[10px]">Verification Hash: 0x9AF83B72E14CD</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900">Chief Mentor Signature</p>
                  <p className="text-[10px] text-emerald-600 font-semibold">Digitally Signed & Validated</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Official Tax Invoice Format Modal */}
      <InvoiceFormatModal
        isOpen={invoiceModalOpen}
        invoice={{
          id: "DVA/2026-27/INV-0142",
          date: "15.06.2026",
          student: student.name,
          rollNo: student.studentId,
          branch: "Bhubaneswar Center",
          course: `${student.courseCode} - Core Analytics & Machine Learning (Term 1)`,
          batch: student.batch,
          totalAmount: 65000,
          baseFee: 55085,
          gst: 9915,
          status: "Paid in Full",
          paymentMode: "Razorpay / UPI",
          refNumber: "PAY_20260615_88129",
          counselor: "Debendra Das Debadutta"
        }}
        onClose={() => setInvoiceModalOpen(false)}
      />

    </div>
  );
}
