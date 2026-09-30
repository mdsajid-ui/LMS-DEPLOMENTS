import React, { useState, useEffect } from 'react';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  DollarSign, 
  Layers, 
  CheckCircle2, 
  Clock, 
  Search, 
  Plus, 
  FileText, 
  FileSpreadsheet, 
  Download, 
  UploadCloud, 
  ShieldCheck, 
  Edit3, 
  Trash2, 
  Key, 
  Eye, 
  EyeOff,
  LogOut, 
  Filter, 
  ChevronRight, 
  ChevronDown, 
  Video, 
  ExternalLink, 
  Lock, 
  RefreshCw, 
  AlertCircle,
  Menu,
  X,
  GraduationCap,
  Briefcase,
  TrendingUp,
  Award,
  Database,
  Building,
  ArrowLeft,
  Check,
  Send
} from 'lucide-react';
import { downloadFile, generateAndDownloadExcel } from '../utils/excelHelper';
import Logo from '../components/Logo';

export default function AdminPortalPage({ onBackToStudentLms }) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [adminUser, setAdminUser] = useState({
    username: "skabdulsajid",
    displayName: "SAJID",
    role: "System Administrator",
    email: "skabdulsajid@dvanalytics.com"
  });

  // Login Form State (matching screenshot media_1790774040715.png)
  const [loginUsername, setLoginUsername] = useState("skabdulsajid");
  const [loginPassword, setLoginPassword] = useState("@2288");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loginError, setLoginError] = useState("");

  // Navigation State
  const [activeMenu, setActiveMenu] = useState('reg'); // 'dashboard', 'reg', 'session', 'assignment', 'fee', 'batch', 'mentor', 'reports'
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Notifications
  const [toastMessage, setToastMessage] = useState("");
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 4000);
  };

  // ==========================================
  // 1. REGISTRATION (Reg.aspx) DATA & STATE
  // ==========================================
  const [regFilterFromDate, setRegFilterFromDate] = useState("2026-01-01");
  const [regFilterToDate, setRegFilterToDate] = useState("2026-12-31");
  const [regFilterCourse, setRegFilterCourse] = useState("APIDS");
  const [regFilterBatch, setRegFilterBatch] = useState("BATCH 202606");
  const [regSearchKeyword, setRegSearchKeyword] = useState("");

  const initialStudents = [
    {
      id: 1,
      rollNo: "DVA-202606-448",
      name: "SK ABDUL SAJID",
      email: "sajid.student@dvanalytics.com",
      phone: "+91 98765 43210",
      course: "APIDS",
      batch: "BATCH 202606",
      regDate: "2026-06-05",
      totalFee: "₹65,000",
      paidFee: "₹65,000",
      dueFee: "₹0",
      status: "Active",
      gender: "Male",
      college: "Biju Patnaik University of Technology",
      location: "Bhubaneswar / Kolkata"
    },
    {
      id: 2,
      rollNo: "DVA-202606-449",
      name: "PRIYANKA MISHRA",
      email: "priyanka.m@dvanalytics.com",
      phone: "+91 98123 45678",
      course: "APIDS",
      batch: "BATCH 202606",
      regDate: "2026-06-05",
      totalFee: "₹65,000",
      paidFee: "₹45,000",
      dueFee: "₹20,000",
      status: "Active",
      gender: "Female",
      college: "KIIT University",
      location: "Bhubaneswar"
    },
    {
      id: 3,
      rollNo: "DVA-202606-450",
      name: "ROHIT KUMAR SHARMA",
      email: "rohit.sharma@gmail.com",
      phone: "+91 97654 32109",
      course: "APIDA",
      batch: "BATCH 202606",
      regDate: "2026-06-06",
      totalFee: "₹55,000",
      paidFee: "₹55,000",
      dueFee: "₹0",
      status: "Active",
      gender: "Male",
      college: "Utkal University",
      location: "Cuttack"
    },
    {
      id: 4,
      rollNo: "DVA-202606-451",
      name: "ANANYA MOHANTY",
      email: "ananya.mohanty@yahoo.com",
      phone: "+91 94370 11223",
      course: "MPGA",
      batch: "BATCH 202606",
      regDate: "2026-06-07",
      totalFee: "₹75,000",
      paidFee: "₹40,000",
      dueFee: "₹35,000",
      status: "Active",
      gender: "Female",
      college: "ITER SOA University",
      location: "Bhubaneswar"
    },
    {
      id: 5,
      rollNo: "DVA-202606-452",
      name: "DEBASISH DAS",
      email: "debasish.das@outlook.com",
      phone: "+91 99371 88990",
      course: "AIML",
      batch: "BATCH 202606",
      regDate: "2026-06-08",
      totalFee: "₹85,000",
      paidFee: "₹85,000",
      dueFee: "₹0",
      status: "Active",
      gender: "Male",
      college: "VSSUT Burla",
      location: "Sambalpur"
    }
  ];

  const [students, setStudents] = useState(initialStudents);

  // Create Registration Modal State (Reg.aspx - btncreate)
  const [createRegOpen, setCreateRegOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    phone: "",
    course: "APIDS",
    batch: "BATCH 202606",
    gender: "Male",
    college: "",
    location: "",
    totalFee: "65000",
    paidFee: "35000",
    regDate: new Date().toISOString().split('T')[0]
  });

  const handleCreateStudent = (e) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.phone) {
      alert("Please fill in Student Name and Phone number");
      return;
    }
    const due = Math.max(0, parseInt(newStudent.totalFee || 0) - parseInt(newStudent.paidFee || 0));
    const created = {
      id: Date.now(),
      rollNo: `DVA-${newStudent.batch.replace(/[^0-9]/g, '')}-${Math.floor(Math.random() * 400 + 460)}`,
      name: newStudent.name.toUpperCase(),
      email: newStudent.email || `${newStudent.name.toLowerCase().replace(/\s+/g, '.')}@dvanalytics.com`,
      phone: newStudent.phone,
      course: newStudent.course,
      batch: newStudent.batch,
      regDate: newStudent.regDate,
      totalFee: `₹${parseInt(newStudent.totalFee).toLocaleString('en-IN')}`,
      paidFee: `₹${parseInt(newStudent.paidFee).toLocaleString('en-IN')}`,
      dueFee: `₹${due.toLocaleString('en-IN')}`,
      status: "Active",
      gender: newStudent.gender,
      college: newStudent.college || "BPUT University",
      location: newStudent.location || "Bhubaneswar"
    };

    setStudents([created, ...students]);
    setCreateRegOpen(false);
    showToast(`Student ${created.name} registered successfully with ID: ${created.rollNo}`);
    setNewStudent({
      name: "",
      email: "",
      phone: "",
      course: "APIDS",
      batch: "BATCH 202606",
      gender: "Male",
      college: "",
      location: "",
      totalFee: "65000",
      paidFee: "35000",
      regDate: new Date().toISOString().split('T')[0]
    });
  };

  // Change Password Modal State
  const [passwordModalStudent, setPasswordModalStudent] = useState(null);
  const [newPasswordValue, setNewPasswordValue] = useState("");
  const handleChangePassword = () => {
    if (!newPasswordValue) {
      alert("Please enter a new password");
      return;
    }
    showToast(`Password for ${passwordModalStudent.name} updated successfully!`);
    setPasswordModalStudent(null);
    setNewPasswordValue("");
  };

  // ==========================================
  // 2. LIVE SESSION (Session.aspx) DATA & STATE
  // ==========================================
  const mentorsList = [
    "DEBENDRA DEBADUTTA DAS",
    "GANESH K KUMAR",
    "LAXMI NR",
    "AYUSHKANT PANDA",
    "GANESH RATH",
    "BABU SIR",
    "UNMESH PANIGRAHI",
    "VENKATA REDDY",
    "ARJUN RAJENDRAN"
  ];

  const applicationsList = [
    "EXCEL BASE AND ADVANCED",
    "EXCEL VBA",
    "SQL SERVER",
    "SAS BASE AND ADVANCED",
    "PYTHON PROGRAMMING",
    "R PROGRAMMING",
    "BIG DATA & DATA ENGINEERING MODULES",
    "ALTERYX",
    "TABLEAU",
    "POWER BI",
    "MACHINE LEARNING & AI"
  ];

  const batchesList = [
    "BATCH 202606",
    "DV Batch 202209",
    "Batch 202209",
    "BATCH 202211",
    "Batch 202210",
    "DV BATCH 202210",
    "DV BATCH 202211",
    "Batch 202212"
  ];

  const [sessionForm, setSessionForm] = useState({
    date: new Date().toISOString().split('T')[0],
    mentor: "DEBENDRA DEBADUTTA DAS",
    batch: "BATCH 202606",
    application: "EXCEL BASE AND ADVANCED",
    sessionTitle: "B1.SESSION-1",
    sortOrder: "1",
    topicType: "CLASS VIDEOS", // 'CLASS VIDEOS', 'MATERIALS', 'ASSIGNMENTS'
    uploadedLink: "https://player.vdocipher.com/v2/?otp=20160313versASE3232Tj8PbBLlQCLHDTQp2I37Tn35428tQ5YVO2eMzx1M59M5y&playbackInfo=eyJ2aWRlb0lkIjoiYjVmYzAwZTcxMWI0NDFjMTg2ZjYwMmI2NmQ4NmQ3YTUifQ==",
    description: "Session 1 Class 1 Video Stream"
  });

  const [publishedSessions, setPublishedSessions] = useState([
    {
      id: 1,
      date: "2026-06-05",
      mentor: "DEBENDRA DEBADUTTA DAS",
      batch: "BATCH 202606",
      application: "EXCEL BASE AND ADVANCED",
      sessionTitle: "B1.SESSION-1",
      sortOrder: 1,
      topicType: "CLASS VIDEOS",
      uploadedLink: "https://player.vdocipher.com/v2/?otp=20160313versASE3232Tj8PbBLlQCLHDTQp2I37Tn35428tQ5YVO2eMzx1M59M5y",
      description: "Class 1: Advanced Formulae, Dynamic Cell References & Retail Data"
    },
    {
      id: 2,
      date: "2026-06-05",
      mentor: "DEBENDRA DEBADUTTA DAS",
      batch: "BATCH 202606",
      application: "EXCEL BASE AND ADVANCED",
      sessionTitle: "B1.SESSION-1",
      sortOrder: 2,
      topicType: "MATERIALS",
      uploadedLink: "https://drive.google.com/drive/folders/1s2bketdfisU7l0tOW3Zglpw5P5tuCeHU",
      description: "A2.RAW DATA.zip (Session Materials & Practice Datasets)"
    },
    {
      id: 3,
      date: "2026-06-05",
      mentor: "DEBENDRA DEBADUTTA DAS",
      batch: "BATCH 202606",
      application: "EXCEL BASE AND ADVANCED",
      sessionTitle: "B1.SESSION-1",
      sortOrder: 3,
      topicType: "ASSIGNMENTS",
      uploadedLink: "https://drive.google.com/drive/folders/1s2bketdfisU7l0tOW3Zglpw5P5tuCeHU",
      description: "SESSION-1 ASSIGNMENTS.xlsx (Homework Problems Statement)"
    },
    {
      id: 4,
      date: "2026-06-12",
      mentor: "GANESH K KUMAR",
      batch: "BATCH 202606",
      application: "SQL SERVER",
      sessionTitle: "B1.SESSION-1",
      sortOrder: 1,
      topicType: "CLASS VIDEOS",
      uploadedLink: "https://drive.google.com/drive/folders/1nR8A_kcFYpYPIYuknhllAzfv43wlz9GI",
      description: "SQL Server Installation, DDL & DML Operations"
    },
    {
      id: 5,
      date: "2026-06-19",
      mentor: "AYUSHKANT PANDA",
      batch: "BATCH 202606",
      application: "PYTHON PROGRAMMING",
      sessionTitle: "B1.SESSION-1",
      sortOrder: 1,
      topicType: "CLASS VIDEOS",
      uploadedLink: "https://drive.google.com/drive/folders/1x86D2j38HxNJWavtVGRZWTmSdHQ6tnpG",
      description: "Python Core Data Structures, Functions & Pandas"
    }
  ]);

  const handleAddSession = (e) => {
    e.preventDefault();
    if (!sessionForm.sessionTitle || !sessionForm.uploadedLink) {
      alert("Please provide Session Title and Uploaded Link");
      return;
    }

    const newSess = {
      id: Date.now(),
      date: sessionForm.date,
      mentor: sessionForm.mentor,
      batch: sessionForm.batch,
      application: sessionForm.application,
      sessionTitle: sessionForm.sessionTitle,
      sortOrder: parseInt(sessionForm.sortOrder || 1),
      topicType: sessionForm.topicType,
      uploadedLink: sessionForm.uploadedLink,
      description: sessionForm.description || `${sessionForm.application} ${sessionForm.sessionTitle}`
    };

    setPublishedSessions([newSess, ...publishedSessions]);
    showToast(`Live Session ${newSess.sessionTitle} (${newSess.topicType}) added to LMS!`);
  };

  const handleDeleteSession = (id) => {
    if (window.confirm("Are you sure you want to delete this session item?")) {
      setPublishedSessions(publishedSessions.filter(s => s.id !== id));
      showToast("Session removed successfully.");
    }
  };

  // ==========================================
  // 3. ASSIGNMENT APPROVAL DATA & STATE
  // ==========================================
  const [assignmentsApprovalList, setAssignmentsApprovalList] = useState([
    {
      id: 101,
      studentName: "SK ABDUL SAJID",
      rollNo: "DVA-202606-448",
      batch: "BATCH 202606",
      subject: "EXCEL BASE AND ADVANCED",
      title: "SESSION-1 ASSIGNMENTS - Dynamic References",
      submittedFile: "SK_Abdul_Sajid_Session1_Solution.xlsx",
      submittedDate: "2026-06-10",
      status: "Approved",
      score: "98/100",
      feedback: "Excellent formula structuring and dynamic ranges."
    },
    {
      id: 102,
      studentName: "PRIYANKA MISHRA",
      rollNo: "DVA-202606-449",
      batch: "BATCH 202606",
      subject: "EXCEL BASE AND ADVANCED",
      title: "SESSION-1 ASSIGNMENTS - Dynamic References",
      submittedFile: "Priyanka_Session1_Assignment.xlsx",
      submittedDate: "2026-06-11",
      status: "Pending",
      score: "",
      feedback: ""
    },
    {
      id: 103,
      studentName: "ROHIT KUMAR SHARMA",
      rollNo: "DVA-202606-450",
      batch: "BATCH 202606",
      subject: "SQL SERVER",
      title: "SQL Practical Queries - Joins & Aggregations",
      submittedFile: "Rohit_SQL_Queries.sql",
      submittedDate: "2026-06-14",
      status: "Pending",
      score: "",
      feedback: ""
    }
  ]);

  const [reviewModalItem, setReviewModalItem] = useState(null);
  const [reviewScore, setReviewScore] = useState("95");
  const [reviewFeedback, setReviewFeedback] = useState("Great work! All criteria met.");

  const handleApproveAssignment = () => {
    if (!reviewModalItem) return;
    setAssignmentsApprovalList(prev => prev.map(item => {
      if (item.id === reviewModalItem.id) {
        return {
          ...item,
          status: "Approved",
          score: `${reviewScore}/100`,
          feedback: reviewFeedback
        };
      }
      return item;
    }));
    showToast(`Assignment for ${reviewModalItem.studentName} Approved!`);
    setReviewModalItem(null);
  };

  const handleRejectAssignment = () => {
    if (!reviewModalItem) return;
    setAssignmentsApprovalList(prev => prev.map(item => {
      if (item.id === reviewModalItem.id) {
        return {
          ...item,
          status: "Needs Revision",
          score: "Resubmit",
          feedback: reviewFeedback || "Please review questions 3 & 4 and resubmit."
        };
      }
      return item;
    }));
    showToast(`Revision requested for ${reviewModalItem.studentName}`);
    setReviewModalItem(null);
  };

  // ==========================================
  // LOGIN SCREEN (Matching media_1790774040715.png)
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f1f5f9] flex flex-col items-center justify-center p-4">
        {/* Floating Top Navigation */}
        <div className="absolute top-4 left-6 flex items-center gap-3">
          <button
            onClick={onBackToStudentLms}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-all shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Student LMS</span>
          </button>
        </div>

        {/* Login Box - Exactly matching edu.dvanalyticsmds.com/admin/index.aspx */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200/80 p-8 sm:p-10 relative">
          {/* Logo Header */}
          <div className="text-center mb-8">
            <div className="inline-block mb-3">
              <Logo />
            </div>
            <p className="text-xs text-slate-400 font-medium">Enterprise Administrator Portal</p>
          </div>

          {/* Form */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (loginUsername.trim().toLowerCase() === "skabdulsajid" || loginUsername.trim().toLowerCase() === "debendra" || loginUsername.trim().toLowerCase() === "admin") {
                setIsAuthenticated(true);
                setAdminUser({
                  username: loginUsername,
                  displayName: loginUsername.toUpperCase(),
                  role: "System Administrator",
                  email: `${loginUsername}@dvanalytics.com`
                });
              } else {
                setLoginError("Invalid Admin credentials. Try skabdulsajid / @2288");
              }
            }} 
            className="space-y-5"
          >
            {loginError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            {/* Username Field */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-500">Username</label>
              <div className="relative">
                <input
                  type="text"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  placeholder="Enter administrator username"
                  className="w-full px-4 py-2.5 bg-blue-50/60 focus:bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:border-red-500 focus:outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-500">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-2.5 bg-blue-50/60 focus:bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:border-red-500 focus:outline-none transition-all pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-red-500 focus:ring-red-400"
                />
                <span>Remember Me</span>
              </label>

              <button
                type="button"
                onClick={() => alert("Password reset link sent to registered administrator email.")}
                className="text-red-500 hover:text-red-600 font-medium"
              >
                Forgot Password ?
              </button>
            </div>

            {/* Red / Coral Sign In Button (matches screenshot) */}
            <button
              type="submit"
              className="w-full py-3 bg-[#e74c3c] hover:bg-[#c0392b] text-white font-bold text-sm rounded-full shadow-md hover:shadow-lg transition-all transform active:scale-[0.99] cursor-pointer mt-4"
            >
              Sign In
            </button>
          </form>

          {/* Quick Autocomplete presets from user's Chrome password manager */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2 text-center">
              Quick Admin Credentials:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setLoginUsername("skabdulsajid");
                  setLoginPassword("@2288");
                  setIsAuthenticated(true);
                }}
                className="p-2 text-left bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors text-xs cursor-pointer"
              >
                <div className="font-bold text-slate-800">skabdulsajid</div>
                <div className="text-[10px] text-slate-500">Super Admin (@2288)</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setLoginUsername("Debendra");
                  setLoginPassword("@2288");
                  setIsAuthenticated(true);
                }}
                className="p-2 text-left bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors text-xs cursor-pointer"
              >
                <div className="font-bold text-slate-800">Debendra</div>
                <div className="text-[10px] text-slate-500">Director / Admin</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // AUTHENTICATED ADMIN PORTAL
  // ==========================================
  return (
    <div className="min-h-screen bg-[#f4f6f9] text-slate-900 flex font-sans antialiased">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white text-xs px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Sidebar (Dark Navy matching edu.dvanalyticsmds.com/admin) */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-[#2A3F54] text-[#E7E7E7] flex flex-col transition-all duration-300 shrink-0 border-r border-[#1e2f3e] z-40 select-none`}>
        {/* Sidebar Header with DV Analytics Logo */}
        <div className="p-4 border-b border-[#374f67] flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="bg-white p-1.5 rounded-lg shadow-sm">
              <img src="./dv-logo.png" alt="DV Logo" className="h-6 w-auto object-contain" />
            </div>
            {sidebarOpen && (
              <div>
                <span className="font-bold text-sm text-white tracking-wide block leading-tight">
                  DV Analytics
                </span>
                <span className="text-[10px] text-teal-300 font-mono">
                  Admin Portal v2.0
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Profile Card inside Sidebar */}
        <div className="p-4 border-b border-[#374f67] flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-orange-400 text-white flex items-center justify-center font-bold text-sm shadow-md shrink-0">
            {adminUser.displayName.charAt(0)}
          </div>
          {sidebarOpen && (
            <div className="overflow-hidden">
              <span className="text-xs text-slate-400 block">Welcome,</span>
              <span className="font-bold text-sm text-white truncate block">
                {adminUser.displayName}
              </span>
              <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Active Admin
              </span>
            </div>
          )}
        </div>

        {/* Menu Navigation Categories */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-1 text-xs">
          {/* 1. Dashboard */}
          <button
            onClick={() => setActiveMenu('dashboard')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
              activeMenu === 'dashboard'
                ? 'bg-[#1abb9c] text-white font-bold shadow-xs'
                : 'text-slate-300 hover:bg-[#34495E] hover:text-white'
            }`}
          >
            <TrendingUp className="w-4 h-4 shrink-0" />
            {sidebarOpen && <span>Dashboard Overview</span>}
          </button>

          {/* 2. Registration (Reg.aspx) */}
          <button
            onClick={() => setActiveMenu('reg')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
              activeMenu === 'reg'
                ? 'bg-[#1abb9c] text-white font-bold shadow-xs'
                : 'text-slate-300 hover:bg-[#34495E] hover:text-white'
            }`}
          >
            <Users className="w-4 h-4 shrink-0" />
            {sidebarOpen && <span>Registration (Reg.aspx)</span>}
          </button>

          {/* 3. Live Session (Session.aspx) */}
          <button
            onClick={() => setActiveMenu('session')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
              activeMenu === 'session'
                ? 'bg-[#1abb9c] text-white font-bold shadow-xs'
                : 'text-slate-300 hover:bg-[#34495E] hover:text-white'
            }`}
          >
            <Video className="w-4 h-4 shrink-0" />
            {sidebarOpen && <span>Live Session (Session.aspx)</span>}
          </button>

          {/* 4. Assignment Approval */}
          <button
            onClick={() => setActiveMenu('assignment')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
              activeMenu === 'assignment'
                ? 'bg-[#1abb9c] text-white font-bold shadow-xs'
                : 'text-slate-300 hover:bg-[#34495E] hover:text-white'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4 shrink-0" />
            {sidebarOpen && <span>Assignment Evaluation</span>}
          </button>

          {/* 5. Fee Management */}
          <button
            onClick={() => setActiveMenu('fee')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
              activeMenu === 'fee'
                ? 'bg-[#1abb9c] text-white font-bold shadow-xs'
                : 'text-slate-300 hover:bg-[#34495E] hover:text-white'
            }`}
          >
            <DollarSign className="w-4 h-4 shrink-0" />
            {sidebarOpen && <span>Fee & Collections (Fee.aspx)</span>}
          </button>

          {/* 6. Batch Master */}
          <button
            onClick={() => setActiveMenu('batch')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
              activeMenu === 'batch'
                ? 'bg-[#1abb9c] text-white font-bold shadow-xs'
                : 'text-slate-300 hover:bg-[#34495E] hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4 shrink-0" />
            {sidebarOpen && <span>Batch & Course Master</span>}
          </button>

          {/* 7. Reports */}
          <button
            onClick={() => setActiveMenu('reports')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
              activeMenu === 'reports'
                ? 'bg-[#1abb9c] text-white font-bold shadow-xs'
                : 'text-slate-300 hover:bg-[#34495E] hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4 shrink-0" />
            {sidebarOpen && <span>Reports & Exports</span>}
          </button>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-[#374f67] space-y-2">
          <button
            onClick={onBackToStudentLms}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
            {sidebarOpen && <span>Student LMS</span>}
          </button>

          <button
            onClick={() => setIsAuthenticated(false)}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg bg-red-600/30 hover:bg-red-600 text-red-200 hover:text-white text-xs font-semibold transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5 shrink-0" />
            {sidebarOpen && <span>Logout Session</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Admin Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="text-xs sm:text-sm font-bold text-slate-800">
              DV Analytics LMS Administration Control Center
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBackToStudentLms}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Student LMS</span>
            </button>

            <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700 hidden sm:inline-block">
                {adminUser.displayName}
              </span>
              <div className="w-7 h-7 rounded-full bg-slate-800 text-white text-xs font-bold flex items-center justify-center">
                S
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* ========================================================= */}
          {/* TAB 1: REGISTRATION (Reg.aspx) - Exact Match              */}
          {/* ========================================================= */}
          {activeMenu === 'reg' && (
            <div className="space-y-6">
              {/* Breadcrumbs & Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Users className="w-5 h-5 text-teal-600" />
                    <span>Student Registration & Admissions (Reg.aspx)</span>
                  </h2>
                  <p className="text-xs text-slate-500">
                    Manage student profiles, assign batches, courses, fees, and credentials.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCreateRegOpen(true)}
                    className="inline-flex items-center gap-2 bg-[#26B99A] hover:bg-[#209e83] text-white font-bold text-xs px-4 py-2.5 rounded-lg shadow-sm transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Registration</span>
                  </button>

                  <button
                    onClick={() => {
                      generateAndDownloadExcel(
                        students.map(s => ({
                          "Roll No": s.rollNo,
                          "Student Name": s.name,
                          "Contact": s.phone,
                          "Email": s.email,
                          "Course": s.course,
                          "Batch": s.batch,
                          "Total Fee": s.totalFee,
                          "Paid Fee": s.paidFee,
                          "Due Fee": s.dueFee,
                          "Reg Date": s.regDate,
                          "College": s.college
                        })),
                        "DV_Analytics_Registered_Students.xlsx"
                      );
                      showToast("Exported registered students to Excel!");
                    }}
                    className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs px-3 py-2 rounded-lg transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Export</span>
                  </button>
                </div>
              </div>

              {/* Filter Panel (Exact fields from edu.dvanalyticsmds.com/admin/Reg.aspx) */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-600 border-b border-slate-100 pb-2">
                  Filter Criteria & Batch Search
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">From Date</label>
                    <input
                      type="date"
                      value={regFilterFromDate}
                      onChange={(e) => setRegFilterFromDate(e.target.value)}
                      className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">To Date</label>
                    <input
                      type="date"
                      value={regFilterToDate}
                      onChange={(e) => setRegFilterToDate(e.target.value)}
                      className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Course ID</label>
                    <select
                      value={regFilterCourse}
                      onChange={(e) => setRegFilterCourse(e.target.value)}
                      className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-teal-500 focus:outline-none bg-white"
                    >
                      <option value="">All Course</option>
                      <option value="APIDS">APIDS</option>
                      <option value="APIDA">APIDA</option>
                      <option value="MPGA">MPGA</option>
                      <option value="APCF">APCF</option>
                      <option value="Workshop - Dubai">Workshop - Dubai</option>
                      <option value="FDP">FDP</option>
                      <option value="AIML">AIML</option>
                      <option value="BASIC PACK">BASIC PACK</option>
                      <option value="INTERMEDIATE PACK">INTERMEDIATE PACK</option>
                      <option value="ADVANCED PACK">ADVANCED PACK</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Batch ID</label>
                    <select
                      value={regFilterBatch}
                      onChange={(e) => setRegFilterBatch(e.target.value)}
                      className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-teal-500 focus:outline-none bg-white"
                    >
                      <option value="">All Batch</option>
                      {batchesList.map(b => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-end">
                    <button
                      onClick={() => showToast("Search query executed successfully.")}
                      className="w-full bg-[#337ab7] hover:bg-[#286090] text-white text-xs font-bold py-2 px-4 rounded-lg shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Search className="w-3.5 h-3.5" />
                      <span>Search (btngo)</span>
                    </button>
                  </div>
                </div>

                {/* Instant Name / Keyword search */}
                <div className="pt-2 flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Instant filter by student name, roll number, college, or location..."
                      value={regSearchKeyword}
                      onChange={(e) => setRegSearchKeyword(e.target.value)}
                      className="w-full text-xs pl-9 pr-4 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:outline-none"
                    />
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap">
                    Showing {students.length} registrations
                  </span>
                </div>
              </div>

              {/* Students Grid Table */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#2A3F54] text-white font-semibold">
                        <th className="py-3 px-3 w-12 text-center">S.No</th>
                        <th className="py-3 px-3">Roll No</th>
                        <th className="py-3 px-4">Student Name</th>
                        <th className="py-3 px-3">Course</th>
                        <th className="py-3 px-3">Batch</th>
                        <th className="py-3 px-3">Fee Status</th>
                        <th className="py-3 px-3">Reg Date</th>
                        <th className="py-3 px-3 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {students
                        .filter(s => {
                          if (regSearchKeyword) {
                            const kw = regSearchKeyword.toLowerCase();
                            return s.name.toLowerCase().includes(kw) || s.rollNo.toLowerCase().includes(kw) || s.college.toLowerCase().includes(kw);
                          }
                          return true;
                        })
                        .map((student, idx) => (
                          <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                            <td className="py-3 px-3 text-center font-mono text-slate-500">{idx + 1}</td>
                            <td className="py-3 px-3 font-mono font-bold text-teal-700">{student.rollNo}</td>
                            <td className="py-3 px-4">
                              <span className="font-bold text-slate-800 block">{student.name}</span>
                              <span className="text-[10px] text-slate-400 block">{student.email} • {student.phone}</span>
                            </td>
                            <td className="py-3 px-3">
                              <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-blue-50 text-blue-700 border border-blue-200">
                                {student.course}
                              </span>
                            </td>
                            <td className="py-3 px-3 font-mono text-slate-600">{student.batch}</td>
                            <td className="py-3 px-3">
                              <div className="text-[11px]">
                                <span className="font-bold text-slate-800">{student.paidFee}</span> / <span className="text-slate-500">{student.totalFee}</span>
                                {student.dueFee !== "₹0" ? (
                                  <span className="block text-[10px] text-red-500 font-semibold">Due: {student.dueFee}</span>
                                ) : (
                                  <span className="block text-[10px] text-emerald-600 font-semibold">Fully Paid</span>
                                )}
                              </div>
                            </td>
                            <td className="py-3 px-3 text-slate-500 font-mono text-[11px]">{student.regDate}</td>
                            <td className="py-3 px-3 text-center">
                              <div className="flex items-center justify-center gap-1.5">
                                <button
                                  onClick={() => {
                                    setPasswordModalStudent(student);
                                    setNewPasswordValue("");
                                  }}
                                  className="p-1.5 text-slate-600 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors cursor-pointer"
                                  title="Change Password"
                                >
                                  <Key className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => alert(`Student Profile: ${student.name}\nCollege: ${student.college}\nLocation: ${student.location}\nFee Due: ${student.dueFee}`)}
                                  className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors cursor-pointer"
                                  title="View Details"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: LIVE SESSION (Session.aspx) - Exact Match          */}
          {/* ========================================================= */}
          {activeMenu === 'session' && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Video className="w-5 h-5 text-teal-600" />
                    <span>Live Session Management (Session.aspx)</span>
                  </h2>
                  <p className="text-xs text-slate-500">
                    Publish video lectures, materials (.zip), and assignments directly to student portals.
                  </p>
                </div>
                <div className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                  {publishedSessions.length} Active LMS Items
                </div>
              </div>

              {/* Session Creation Form (Exact fields from admin_Session.aspx.html) */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 border-b border-slate-100 pb-3 mb-4">
                  Add / Edit Session Item
                </h3>

                <form onSubmit={handleAddSession} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Date */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Date *</label>
                      <input
                        type="date"
                        value={sessionForm.date}
                        onChange={(e) => setSessionForm({ ...sessionForm, date: e.target.value })}
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-teal-500 focus:outline-none"
                        required
                      />
                    </div>

                    {/* Mentor (ddlmen) */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Mentor (ddlmen) *</label>
                      <select
                        value={sessionForm.mentor}
                        onChange={(e) => setSessionForm({ ...sessionForm, mentor: e.target.value })}
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-teal-500 focus:outline-none bg-white font-medium"
                      >
                        {mentorsList.map(m => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                    </div>

                    {/* Batch (ddlbat) */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Batch (ddlbat) *</label>
                      <select
                        value={sessionForm.batch}
                        onChange={(e) => setSessionForm({ ...sessionForm, batch: e.target.value })}
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-teal-500 focus:outline-none bg-white font-medium"
                      >
                        {batchesList.map(b => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>

                    {/* Application (ddlappli) */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Application (ddlappli) *</label>
                      <select
                        value={sessionForm.application}
                        onChange={(e) => setSessionForm({ ...sessionForm, application: e.target.value })}
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-teal-500 focus:outline-none bg-white font-medium"
                      >
                        {applicationsList.map(a => (
                          <option key={a} value={a}>{a}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Session Title (txtsess) */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Session Title (txtsess) *</label>
                      <input
                        type="text"
                        placeholder="e.g. B1.SESSION-1 or B2.SESSION-2"
                        value={sessionForm.sessionTitle}
                        onChange={(e) => setSessionForm({ ...sessionForm, sessionTitle: e.target.value })}
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-teal-500 focus:outline-none font-medium"
                        required
                      />
                    </div>

                    {/* Sort Order (txtsortorder) */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Sort Order *</label>
                      <input
                        type="number"
                        value={sessionForm.sortOrder}
                        onChange={(e) => setSessionForm({ ...sessionForm, sortOrder: e.target.value })}
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-teal-500 focus:outline-none font-medium"
                        required
                      />
                    </div>

                    {/* Topic Type (ddltopics_edit: MATERIALS, ASSIGNMENTS, CLASS VIDEOS) */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Topic Type *</label>
                      <select
                        value={sessionForm.topicType}
                        onChange={(e) => setSessionForm({ ...sessionForm, topicType: e.target.value })}
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-teal-500 focus:outline-none bg-white font-bold text-slate-800"
                      >
                        <option value="CLASS VIDEOS">CLASS VIDEOS (Green Pill)</option>
                        <option value="MATERIALS">MATERIALS (Blue Pill)</option>
                        <option value="ASSIGNMENTS">ASSIGNMENTS (Orange Pill)</option>
                      </select>
                    </div>
                  </div>

                  {/* Uploaded Link & File Description */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Uploaded Link (txtcontent_edit) *
                      </label>
                      <input
                        type="text"
                        placeholder="VdoCipher embed URL, Google Drive folder URL, or MP4 link"
                        value={sessionForm.uploadedLink}
                        onChange={(e) => setSessionForm({ ...sessionForm, uploadedLink: e.target.value })}
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-teal-500 focus:outline-none font-mono"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        File Description (description_edit)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Session 1 Class 1 Video Lecture or Raw Data.zip"
                        value={sessionForm.description}
                        onChange={(e) => setSessionForm({ ...sessionForm, description: e.target.value })}
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-teal-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button (btnAdd) */}
                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="bg-[#26B99A] hover:bg-[#209e83] text-white font-bold text-xs px-6 py-2.5 rounded-lg shadow-sm transition-all cursor-pointer flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Submit Session (btnAdd)</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Published Sessions Table */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
                <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <span className="font-bold text-xs uppercase tracking-wider text-slate-700">
                    Active Published Sessions List
                  </span>
                  <span className="text-xs text-slate-500">
                    Sortable by Application & Batch
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#2A3F54] text-white font-semibold">
                        <th className="py-2.5 px-3 w-12 text-center">Order</th>
                        <th className="py-2.5 px-3">Session</th>
                        <th className="py-2.5 px-3">Application</th>
                        <th className="py-2.5 px-3">Batch</th>
                        <th className="py-2.5 px-3">Type</th>
                        <th className="py-2.5 px-3">Mentor</th>
                        <th className="py-2.5 px-3">Date</th>
                        <th className="py-2.5 px-3 text-center w-20">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {publishedSessions.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3 px-3 text-center font-mono font-bold text-slate-600">
                            {item.sortOrder}
                          </td>
                          <td className="py-3 px-3 font-bold text-slate-800">
                            {item.sessionTitle}
                            <span className="block text-[10px] text-slate-400 font-normal truncate max-w-xs">
                              {item.description}
                            </span>
                          </td>
                          <td className="py-3 px-3 font-semibold text-slate-700">
                            {item.application}
                          </td>
                          <td className="py-3 px-3 font-mono text-slate-600">
                            {item.batch}
                          </td>
                          <td className="py-3 px-3">
                            {item.topicType === 'CLASS VIDEOS' && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#2dbd9f]/20 text-teal-800 border border-[#2dbd9f]/40">
                                VIDEOS
                              </span>
                            )}
                            {item.topicType === 'MATERIALS' && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#3b97e9]/20 text-blue-800 border border-[#3b97e9]/40">
                                MATERIALS (.zip)
                              </span>
                            )}
                            {item.topicType === 'ASSIGNMENTS' && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#f39c12]/20 text-amber-800 border border-[#f39c12]/40">
                                ASSIGNMENTS
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-3 text-slate-600">
                            {item.mentor}
                          </td>
                          <td className="py-3 px-3 font-mono text-slate-500">
                            {item.date}
                          </td>
                          <td className="py-3 px-3 text-center">
                            <button
                              onClick={() => handleDeleteSession(item.id)}
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
                              title="Delete Session Item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: ASSIGNMENT EVALUATION (AssignmentApproval.aspx)    */}
          {/* ========================================================= */}
          {activeMenu === 'assignment' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <FileSpreadsheet className="w-5 h-5 text-teal-600" />
                    <span>Assignment Evaluation & Approvals (AssignmentApproval.aspx)</span>
                  </h2>
                  <p className="text-xs text-slate-500">
                    Review student homework submissions, grade, and approve.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#2A3F54] text-white font-semibold">
                        <th className="py-3 px-3">Student Name</th>
                        <th className="py-3 px-3">Roll No</th>
                        <th className="py-3 px-3">Subject & Task</th>
                        <th className="py-3 px-3">Submitted File</th>
                        <th className="py-3 px-3">Date</th>
                        <th className="py-3 px-3">Status</th>
                        <th className="py-3 px-3 text-center">Evaluate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {assignmentsApprovalList.map(item => (
                        <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3 px-3 font-bold text-slate-800">{item.studentName}</td>
                          <td className="py-3 px-3 font-mono text-slate-600">{item.rollNo}</td>
                          <td className="py-3 px-3">
                            <span className="font-semibold text-slate-800 block">{item.title}</span>
                            <span className="text-[10px] text-slate-400">{item.subject}</span>
                          </td>
                          <td className="py-3 px-3">
                            <button
                              onClick={() => {
                                downloadFile(item.submittedFile);
                                showToast(`Downloading student solution: ${item.submittedFile}`);
                              }}
                              className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-[11px] cursor-pointer"
                            >
                              <Download className="w-3 h-3 text-blue-500" />
                              <span>{item.submittedFile}</span>
                            </button>
                          </td>
                          <td className="py-3 px-3 font-mono text-slate-500">{item.submittedDate}</td>
                          <td className="py-3 px-3">
                            {item.status === 'Approved' ? (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                Approved ({item.score})
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 animate-pulse">
                                Pending Evaluation
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-3 text-center">
                            <button
                              onClick={() => {
                                setReviewModalItem(item);
                                setReviewScore("95");
                                setReviewFeedback("Formulas and problem cases verified accurately.");
                              }}
                              className="px-3 py-1 rounded-md bg-[#26B99A] hover:bg-[#209e83] text-white font-bold text-[11px] cursor-pointer"
                            >
                              Grade / Review
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 4: DASHBOARD OVERVIEW                                  */}
          {/* ========================================================= */}
          {activeMenu === 'dashboard' && (
            <div className="space-y-6">
              {/* Top KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Enrolled</span>
                      <h3 className="text-2xl font-black text-slate-800 mt-1">1,482</h3>
                      <span className="text-[11px] text-emerald-600 font-semibold">↑ +18 this month</span>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                      <Users className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Monthly Collection</span>
                      <h3 className="text-2xl font-black text-slate-800 mt-1">₹42,80,000</h3>
                      <span className="text-[11px] text-emerald-600 font-semibold">94% On-time Fee</span>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <DollarSign className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Live Sessions</span>
                      <h3 className="text-2xl font-black text-slate-800 mt-1">312</h3>
                      <span className="text-[11px] text-slate-500 font-semibold">VdoCipher & Drive DRM</span>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                      <Video className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Active Batches</span>
                      <h3 className="text-2xl font-black text-slate-800 mt-1">24</h3>
                      <span className="text-[11px] text-indigo-600 font-semibold">APIDS & APIDA 2026</span>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <Layers className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions Panel */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-4">
                <h3 className="font-bold text-sm text-slate-800">Direct Operations Shortcuts</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => setActiveMenu('reg')}
                    className="p-4 rounded-xl border border-teal-200 bg-teal-50/50 hover:bg-teal-50 text-left transition-all cursor-pointer group"
                  >
                    <Users className="w-5 h-5 text-teal-600 mb-2 group-hover:scale-110 transition-transform" />
                    <div className="font-bold text-sm text-slate-800">Register New Student</div>
                    <p className="text-xs text-slate-500 mt-0.5">Admissions form (Reg.aspx) & batch assignment</p>
                  </button>

                  <button
                    onClick={() => setActiveMenu('session')}
                    className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 hover:bg-blue-50 text-left transition-all cursor-pointer group"
                  >
                    <Video className="w-5 h-5 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
                    <div className="font-bold text-sm text-slate-800">Upload Live Session Lecture</div>
                    <p className="text-xs text-slate-500 mt-0.5">Session.aspx video, zip raw datasets & tasks</p>
                  </button>

                  <button
                    onClick={() => setActiveMenu('assignment')}
                    className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 hover:bg-amber-50 text-left transition-all cursor-pointer group"
                  >
                    <FileSpreadsheet className="w-5 h-5 text-amber-600 mb-2 group-hover:scale-110 transition-transform" />
                    <div className="font-bold text-sm text-slate-800">Review Student Homework</div>
                    <p className="text-xs text-slate-500 mt-0.5">AssignmentApproval.aspx submissions</p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 5: FEE & REPORTS                                      */}
          {/* ========================================================= */}
          {(activeMenu === 'fee' || activeMenu === 'batch' || activeMenu === 'reports') && (
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-sm text-slate-800">
                  {activeMenu === 'fee' && "Fee Ledger & Collection Statements (Fee.aspx)"}
                  {activeMenu === 'batch' && "Batch Master & Mentor Assignment"}
                  {activeMenu === 'reports' && "Comprehensive LMS Export Reports"}
                </h3>
                <button
                  onClick={() => {
                    generateAndDownloadExcel(
                      students.map(s => ({
                        "Roll No": s.rollNo,
                        "Name": s.name,
                        "Batch": s.batch,
                        "Course": s.course,
                        "Total Fee": s.totalFee,
                        "Paid": s.paidFee,
                        "Due": s.dueFee
                      })),
                      `DV_Analytics_${activeMenu}_Report.xlsx`
                    );
                    showToast(`Exported ${activeMenu} report to Excel!`);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Excel Report</span>
                </button>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Full enterprise data access synchronized with DV Analytics cloud database server (<code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">edu.dvanalyticsmds.com</code>).
              </p>
            </div>
          )}
        </main>
      </div>

      {/* ========================================================= */}
      {/* MODAL 1: CREATE REGISTRATION MODAL (Reg.aspx - btncreate) */}
      {/* ========================================================= */}
      {createRegOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-800">Create Student Registration</h3>
                  <p className="text-[11px] text-slate-500">Reg.aspx Registration Form</p>
                </div>
              </div>
              <button
                onClick={() => setCreateRegOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateStudent} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Student Full Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. SK ABDUL SAJID"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-teal-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Phone Number *</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={newStudent.phone}
                    onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-teal-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="student@example.com"
                    value={newStudent.email}
                    onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Gender</label>
                  <select
                    value={newStudent.gender}
                    onChange={(e) => setNewStudent({ ...newStudent, gender: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Course Allocation *</label>
                  <select
                    value={newStudent.course}
                    onChange={(e) => setNewStudent({ ...newStudent, course: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white font-semibold"
                  >
                    <option value="APIDS">APIDS (Advanced Program in Data Science)</option>
                    <option value="APIDA">APIDA (Data Analytics)</option>
                    <option value="MPGA">MPGA (GenAI & Machine Learning)</option>
                    <option value="AIML">AIML Engineering</option>
                    <option value="BASIC PACK">BASIC PACK</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Batch Assignment *</label>
                  <select
                    value={newStudent.batch}
                    onChange={(e) => setNewStudent({ ...newStudent, batch: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white font-mono"
                  >
                    {batchesList.map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">College / University</label>
                  <input
                    type="text"
                    placeholder="e.g. BPUT / KIIT / ITER"
                    value={newStudent.college}
                    onChange={(e) => setNewStudent({ ...newStudent, college: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Location / City</label>
                  <input
                    type="text"
                    placeholder="e.g. Bhubaneswar / Kolkata"
                    value={newStudent.location}
                    onChange={(e) => setNewStudent({ ...newStudent, location: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Total Course Fee (₹)</label>
                  <input
                    type="number"
                    value={newStudent.totalFee}
                    onChange={(e) => setNewStudent({ ...newStudent, totalFee: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Initial Paid Amount (₹)</label>
                  <input
                    type="number"
                    value={newStudent.paidFee}
                    onChange={(e) => setNewStudent({ ...newStudent, paidFee: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg font-mono text-emerald-700 font-bold"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setCreateRegOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-600 hover:bg-slate-100 rounded-lg text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#26B99A] hover:bg-[#209e83] text-white rounded-lg text-xs font-bold shadow-sm"
                >
                  Save & Register Student (btnAdd)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: CHANGE PASSWORD MODAL (Reg.aspx)                 */}
      {/* ========================================================= */}
      {passwordModalStudent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                <Key className="w-4 h-4 text-amber-500" />
                <span>Change Student Password</span>
              </h4>
              <button onClick={() => setPasswordModalStudent(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Reset password for <strong>{passwordModalStudent.name}</strong> ({passwordModalStudent.rollNo}).
            </p>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">New Password *</label>
              <input
                type="text"
                value={newPasswordValue}
                onChange={(e) => setNewPasswordValue(e.target.value)}
                placeholder="Enter new password"
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setPasswordModalStudent(null)}
                className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-600"
              >
                Close
              </button>
              <button
                onClick={handleChangePassword}
                className="px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-bold"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 3: ASSIGNMENT REVIEW & GRADING MODAL                */}
      {/* ========================================================= */}
      {reviewModalItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                <Award className="w-4 h-4 text-teal-600" />
                <span>Evaluate Assignment Submission</span>
              </h4>
              <button onClick={() => setReviewModalItem(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
              <div><strong>Student:</strong> {reviewModalItem.studentName} ({reviewModalItem.rollNo})</div>
              <div><strong>Task:</strong> {reviewModalItem.title}</div>
              <div><strong>File:</strong> {reviewModalItem.submittedFile}</div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Score (Out of 100) *</label>
              <input
                type="number"
                value={reviewScore}
                onChange={(e) => setReviewScore(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg font-mono font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Faculty Feedback & Remarks</label>
              <textarea
                value={reviewFeedback}
                onChange={(e) => setReviewFeedback(e.target.value)}
                rows={3}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={handleRejectAssignment}
                className="px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-xs font-bold"
              >
                Request Revision
              </button>
              <button
                onClick={handleApproveAssignment}
                className="px-4 py-1.5 bg-[#26B99A] hover:bg-[#209e83] text-white rounded-lg text-xs font-bold"
              >
                Approve & Publish Score
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
