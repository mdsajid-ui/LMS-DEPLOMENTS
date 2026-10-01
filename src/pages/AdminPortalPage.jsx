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
  Check,
  Send,
  FolderOpen,
  PieChart,
  ClipboardCheck,
  CreditCard,
  UserCheck,
  FileCheck
} from 'lucide-react';
import { downloadFile, generateAndDownloadExcel } from '../utils/excelHelper';
import Logo from '../components/Logo';
import { 
  saveAdminSession, 
  deleteAdminSession, 
  getAllStoredSessions, 
  getStoredFees, 
  saveAdminFee, 
  getStoredStudents, 
  saveAdminStudent 
} from '../utils/lmsStorage';

export default function AdminPortalPage() {
  // Authentication State (Independent Admin Session)
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
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Sidebar Accordion State (Exact structure from screenshots media_1790833890610.png to media_1790833925679.png)
  const [openAccordions, setOpenAccordions] = useState({
    dashboard: true,
    master: false,
    approval: false,
    transaction: true,
    applicationTest: false,
    reports: false
  });

  const toggleAccordion = (section) => {
    setOpenAccordions(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // URL Hash Navigation Detection
  const getInitialMenu = () => {
    const url = (window.location.hash + window.location.pathname).toLowerCase();
    if (url.includes('fee')) return 'fee';
    if (url.includes('session')) return 'session';
    if (url.includes('reg')) return 'reg';
    if (url.includes('assignment')) return 'assignment';
    if (url.includes('master')) return 'master';
    if (url.includes('dashboard')) return 'dashboard';
    return 'fee'; // Default matching user's active screenshot Fee.aspx
  };

  const [activeMenu, setActiveMenu] = useState(() => getInitialMenu());
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSelectMenu = (menuKey) => {
    setActiveMenu(menuKey);
    if (menuKey === 'fee') window.location.hash = '/admin/Fee.aspx';
    else if (menuKey === 'session') window.location.hash = '/admin/Session.aspx';
    else if (menuKey === 'reg') window.location.hash = '/admin/Reg.aspx';
    else if (menuKey === 'assignment') window.location.hash = '/admin/AssignmentApproval.aspx';
    else window.location.hash = `/admin/${menuKey}.aspx`;
  };

  // Toast Alerts
  const [toastMessage, setToastMessage] = useState("");
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 4000);
  };

  // ==========================================
  // 1. FEE MANAGEMENT (Fee.aspx) - Screenshot 1
  // ==========================================
  const [feeRecords, setFeeRecords] = useState(() => getStoredFees());

  const [feeForm, setFeeForm] = useState({
    date: new Date().toISOString().split('T')[0],
    studentId: "9955774102",
    committedFee: "65000",
    batch: "BATCH 202606",
    course: "APIDS",
    balance: "0",
    amount: "35000",
    modeOfPay: "UPI / Bank Transfer",
    remarks: "Installment payment verified via payment gateway.",
    referenceDocName: "Receipt_INV_88392.pdf"
  });

  const handleStudentIdChange = (idVal) => {
    setFeeForm(prev => ({
      ...prev,
      studentId: idVal
    }));
    // Auto-lookup matching student
    const found = studentsList.find(s => s.phone === idVal || s.rollNo.includes(idVal));
    if (found) {
      const commFee = parseInt(found.totalFee.replace(/[^0-9]/g, '') || 65000);
      const paid = parseInt(found.paidFee.replace(/[^0-9]/g, '') || 0);
      const bal = Math.max(0, commFee - paid);
      setFeeForm(prev => ({
        ...prev,
        committedFee: commFee.toString(),
        batch: found.batch,
        course: found.course,
        balance: bal.toString(),
        remarks: `Payment record for ${found.name} (${found.rollNo})`
      }));
    }
  };

  const handleFeeSubmit = (e) => {
    e.preventDefault();
    if (!feeForm.studentId || !feeForm.amount) {
      alert("Please enter Student ID and Amount");
      return;
    }

    const newRecord = {
      date: feeForm.date,
      studentId: feeForm.studentId,
      studentName: studentsList.find(s => s.phone === feeForm.studentId)?.name || "STUDENT " + feeForm.studentId,
      committedFee: feeForm.committedFee,
      batch: feeForm.batch,
      course: feeForm.course,
      balance: Math.max(0, parseInt(feeForm.balance || 0) - parseInt(feeForm.amount || 0)).toString(),
      amount: feeForm.amount,
      modeOfPay: feeForm.modeOfPay,
      remarks: feeForm.remarks,
      referenceDoc: feeForm.referenceDocName || "Payment_Receipt.pdf"
    };

    const updated = saveAdminFee(newRecord);
    setFeeRecords(updated);
    showToast(`Fee payment of ₹${parseInt(feeForm.amount).toLocaleString('en-IN')} submitted successfully for Student ID ${feeForm.studentId}!`);
  };

  // ==========================================
  // 2. LIVE SESSION (Session.aspx) - Live Reflection
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

  const [storedSessions, setStoredSessions] = useState(() => getAllStoredSessions());

  const handleAddLiveSession = (e) => {
    e.preventDefault();
    if (!sessionForm.sessionTitle || !sessionForm.uploadedLink) {
      alert("Please provide Session Title and Uploaded Link");
      return;
    }

    // Call persistent storage update - reflects directly in student portal!
    saveAdminSession({
      date: sessionForm.date,
      mentor: sessionForm.mentor,
      batch: sessionForm.batch,
      application: sessionForm.application,
      sessionTitle: sessionForm.sessionTitle,
      sortOrder: sessionForm.sortOrder,
      topicType: sessionForm.topicType,
      uploadedLink: sessionForm.uploadedLink,
      description: sessionForm.description
    });

    setStoredSessions(getAllStoredSessions());
    showToast(`✓ LIVE UPDATE: ${sessionForm.sessionTitle} (${sessionForm.topicType}) uploaded! Reflected immediately in Student Portal.`);
  };

  const handleDeleteLiveSession = (sessionId, subjectName) => {
    if (window.confirm("Are you sure you want to delete this session? It will be removed from the Student Portal immediately.")) {
      deleteAdminSession(sessionId, subjectName);
      setStoredSessions(getAllStoredSessions());
      showToast("Session item deleted and removed from Student Portal.");
    }
  };

  // ==========================================
  // 3. REGISTRATION (Reg.aspx)
  // ==========================================
  const [studentsList, setStudentsList] = useState(() => getStoredStudents());
  const [createRegOpen, setCreateRegOpen] = useState(false);
  const [regFilterFromDate, setRegFilterFromDate] = useState("2026-01-01");
  const [regFilterToDate, setRegFilterToDate] = useState("2026-12-31");
  const [regFilterCourse, setRegFilterCourse] = useState("APIDS");
  const [regFilterBatch, setRegFilterBatch] = useState("BATCH 202606");
  const [regSearchKeyword, setRegSearchKeyword] = useState("");

  const [newStudentForm, setNewStudentForm] = useState({
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

  const handleCreateStudentSubmit = (e) => {
    e.preventDefault();
    if (!newStudentForm.name || !newStudentForm.phone) {
      alert("Please fill in Student Name and Phone");
      return;
    }
    const due = Math.max(0, parseInt(newStudentForm.totalFee || 0) - parseInt(newStudentForm.paidFee || 0));
    const createdData = {
      name: newStudentForm.name.toUpperCase(),
      email: newStudentForm.email || `${newStudentForm.name.toLowerCase().replace(/\s+/g, '.')}@dvanalytics.com`,
      phone: newStudentForm.phone,
      course: newStudentForm.course,
      batch: newStudentForm.batch,
      regDate: newStudentForm.regDate,
      totalFee: `₹${parseInt(newStudentForm.totalFee).toLocaleString('en-IN')}`,
      paidFee: `₹${parseInt(newStudentForm.paidFee).toLocaleString('en-IN')}`,
      dueFee: `₹${due.toLocaleString('en-IN')}`,
      status: "Active",
      gender: newStudentForm.gender,
      college: newStudentForm.college || "BPUT University",
      location: newStudentForm.location || "Bhubaneswar"
    };

    const updatedList = saveAdminStudent(createdData);
    setStudentsList(updatedList);
    setCreateRegOpen(false);
    showToast(`Student ${createdData.name} registered successfully!`);
    setNewStudentForm({
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

  // Password reset modal
  const [passwordModalStudent, setPasswordModalStudent] = useState(null);
  const [newPasswordVal, setNewPasswordVal] = useState("");

  // ==========================================
  // 4. ASSIGNMENT APPROVAL
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
      feedback: "Formulas and cell ranges structured accurately."
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

  // ==========================================
  // LOGIN SCREEN (Standalone Admin Auth)
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f1f5f9] flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200/80 p-8 sm:p-10 relative">
          <div className="text-center mb-8">
            <div className="inline-block mb-3">
              <Logo />
            </div>
            <p className="text-xs text-slate-500 font-medium">Enterprise Administrator Portal</p>
          </div>

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
                setLoginError("Invalid credentials. Enter skabdulsajid / @2288");
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

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-500">Username</label>
              <input
                type="text"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                placeholder="Enter administrator username"
                className="w-full px-4 py-2.5 bg-blue-50/60 focus:bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:border-red-500 focus:outline-none transition-all"
                required
              />
            </div>

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
                onClick={() => alert("Password reset link sent to administrator email.")}
                className="text-red-500 hover:text-red-600 font-medium"
              >
                Forgot Password ?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#e74c3c] hover:bg-[#c0392b] text-white font-bold text-sm rounded-full shadow-md hover:shadow-lg transition-all transform active:scale-[0.99] cursor-pointer mt-4"
            >
              Sign In
            </button>
          </form>

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
                className="p-2 text-left bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 text-xs cursor-pointer"
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
                className="p-2 text-left bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 text-xs cursor-pointer"
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
  // MAIN AUTHENTICATED ADMIN PORTAL VIEW
  // ==========================================
  return (
    <div className="min-h-screen bg-[#f7f8fa] text-slate-900 flex font-sans antialiased">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white text-xs px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Sidebar (Dark Navy `#2A3F54` matching edu.dvanalyticsmds.com/admin screenshots) */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-[#2A3F54] text-[#E7E7E7] flex flex-col transition-all duration-300 shrink-0 border-r border-[#1e2f3e] z-40 select-none`}>
        {/* Profile Card inside Sidebar (Matches Screenshot 1-5) */}
        <div className="p-4 border-b border-[#374f67] flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-600 overflow-hidden flex items-center justify-center shrink-0">
            <img src="./student-avatar.jpg" alt="Admin" className="w-full h-full object-cover" />
          </div>
          {sidebarOpen && (
            <div className="overflow-hidden">
              <span className="text-xs text-slate-400 block">Welcome,</span>
              <span className="font-bold text-sm text-white truncate block">
                {adminUser.displayName}
              </span>
            </div>
          )}
        </div>

        {/* Accordion Sidebar Menu (Matches Screenshots 1 to 5 exactly) */}
        <nav className="flex-1 overflow-y-auto py-2 text-xs divide-y divide-[#374f67]/40">
          {/* 1. Dashboard Accordion */}
          <div>
            <button
              onClick={() => toggleAccordion('dashboard')}
              className="w-full flex items-center justify-between px-4 py-3 text-slate-300 hover:text-white hover:bg-[#34495E] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <TrendingUp className="w-4 h-4 text-slate-400" />
                {sidebarOpen && <span className="font-semibold">Dashboard</span>}
              </div>
              {sidebarOpen && (
                openAccordions.dashboard ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />
              )}
            </button>
            {sidebarOpen && openAccordions.dashboard && (
              <div className="bg-[#243444] py-1 pl-9 pr-3 space-y-1">
                <button
                  onClick={() => handleSelectMenu('dashboard')}
                  className={`w-full text-left py-1.5 px-2 rounded transition-colors ${activeMenu === 'dashboard' ? 'text-teal-300 font-bold bg-[#1abb9c]/20' : 'text-slate-400 hover:text-white'}`}
                >
                  • Monthly Collection
                </button>
                <button
                  onClick={() => handleSelectMenu('dashboard')}
                  className="w-full text-left py-1.5 px-2 rounded text-slate-400 hover:text-white transition-colors"
                >
                  • Daily Collection
                </button>
              </div>
            )}
          </div>

          {/* 2. Master Accordion (Matches Screenshot 2) */}
          <div>
            <button
              onClick={() => toggleAccordion('master')}
              className="w-full flex items-center justify-between px-4 py-3 text-slate-300 hover:text-white hover:bg-[#34495E] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Database className="w-4 h-4 text-slate-400" />
                {sidebarOpen && <span className="font-semibold">Master</span>}
              </div>
              {sidebarOpen && (
                openAccordions.master ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />
              )}
            </button>
            {sidebarOpen && openAccordions.master && (
              <div className="bg-[#243444] py-1 pl-9 pr-3 space-y-1 text-[11px]">
                {["User Master", "Branch Master", "Skill Master", "Application Master", "Course Master", "Batch Master", "Mentor Master", "Non Live Training", "TeleCaller Master", "Department", "Designation"].map(m => (
                  <button
                    key={m}
                    onClick={() => {
                      handleSelectMenu('master');
                      showToast(`Opened ${m}`);
                    }}
                    className="w-full text-left py-1 px-2 rounded text-slate-400 hover:text-white transition-colors"
                  >
                    • {m}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 3. Approval Accordion (Matches Screenshot 3) */}
          <div>
            <button
              onClick={() => toggleAccordion('approval')}
              className="w-full flex items-center justify-between px-4 py-3 text-slate-300 hover:text-white hover:bg-[#34495E] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <ClipboardCheck className="w-4 h-4 text-slate-400" />
                {sidebarOpen && <span className="font-semibold">Approval</span>}
              </div>
              {sidebarOpen && (
                openAccordions.approval ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />
              )}
            </button>
            {sidebarOpen && openAccordions.approval && (
              <div className="bg-[#243444] py-1 pl-9 pr-3 space-y-1 text-[11px]">
                {["Payment Approval", "Registration Approval", "Employee Approval", "Expense Approval", "Appraisal Approval"].map(a => (
                  <button
                    key={a}
                    onClick={() => {
                      handleSelectMenu('approval');
                      showToast(`Viewing ${a}`);
                    }}
                    className="w-full text-left py-1 px-2 rounded text-slate-400 hover:text-white transition-colors"
                  >
                    • {a}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 4. Transaction Accordion (Matches Screenshot 4 & 5) */}
          <div>
            <button
              onClick={() => toggleAccordion('transaction')}
              className="w-full flex items-center justify-between px-4 py-3 text-slate-300 hover:text-white hover:bg-[#34495E] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <FolderOpen className="w-4 h-4 text-slate-400" />
                {sidebarOpen && <span className="font-semibold">Transaction</span>}
              </div>
              {sidebarOpen && (
                openAccordions.transaction ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />
              )}
            </button>
            {sidebarOpen && openAccordions.transaction && (
              <div className="bg-[#243444] py-1 pl-9 pr-3 space-y-1 text-[11px]">
                <button
                  onClick={() => handleSelectMenu('reg')}
                  className={`w-full text-left py-1.5 px-2 rounded transition-colors ${activeMenu === 'reg' ? 'text-teal-300 font-bold bg-[#1abb9c]/20' : 'text-slate-400 hover:text-white'}`}
                >
                  • Registration (Reg.aspx)
                </button>
                <button
                  onClick={() => handleSelectMenu('fee')}
                  className={`w-full text-left py-1.5 px-2 rounded transition-colors ${activeMenu === 'fee' ? 'text-teal-300 font-bold bg-[#1abb9c]/20' : 'text-slate-400 hover:text-white'}`}
                >
                  • Fee (Fee.aspx)
                </button>
                <button
                  onClick={() => handleSelectMenu('session')}
                  className={`w-full text-left py-1.5 px-2 rounded transition-colors ${activeMenu === 'session' ? 'text-teal-300 font-bold bg-[#1abb9c]/20' : 'text-slate-400 hover:text-white'}`}
                >
                  • Live Session (Session.aspx)
                </button>
                <button
                  onClick={() => handleSelectMenu('assignment')}
                  className={`w-full text-left py-1.5 px-2 rounded transition-colors ${activeMenu === 'assignment' ? 'text-teal-300 font-bold bg-[#1abb9c]/20' : 'text-slate-400 hover:text-white'}`}
                >
                  • Assignment
                </button>
                {["Live Session - Delete", "Resume", "My Interview Kit", "Non Live Session", "Assign Student for Non live sessions", "Discussion Forum", "Release User", "EXE Users", "App Users", "Class", "Assign Students for Batch", "Mock Interview", "Import Lead", "Batch Completion", "Assign Batch For Collection", "Expense"].map(t => (
                  <button
                    key={t}
                    onClick={() => showToast(`Selected transaction: ${t}`)}
                    className="w-full text-left py-1 px-2 rounded text-slate-400 hover:text-white transition-colors"
                  >
                    • {t}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 5. Application Test Accordion */}
          <div>
            <button
              onClick={() => toggleAccordion('applicationTest')}
              className="w-full flex items-center justify-between px-4 py-3 text-slate-300 hover:text-white hover:bg-[#34495E] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <FileCheck className="w-4 h-4 text-slate-400" />
                {sidebarOpen && <span className="font-semibold">Application Test</span>}
              </div>
              {sidebarOpen && (
                openAccordions.applicationTest ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />
              )}
            </button>
            {sidebarOpen && openAccordions.applicationTest && (
              <div className="bg-[#243444] py-1 pl-9 pr-3 space-y-1 text-[11px]">
                {["Practical Test Questions", "MCQ", "Assign MCQ To Batch", "Assign Practical Questions", "Practical Test Evaluation", "Assign PI To Batch", "PI Questions", "PI Evaluation"].map(at => (
                  <button
                    key={at}
                    onClick={() => showToast(`Application Test: ${at}`)}
                    className="w-full text-left py-1 px-2 rounded text-slate-400 hover:text-white transition-colors"
                  >
                    • {at}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 6. Reports Accordion */}
          <div>
            <button
              onClick={() => toggleAccordion('reports')}
              className="w-full flex items-center justify-between px-4 py-3 text-slate-300 hover:text-white hover:bg-[#34495E] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-slate-400" />
                {sidebarOpen && <span className="font-semibold">Reports</span>}
              </div>
              {sidebarOpen && (
                openAccordions.reports ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />
              )}
            </button>
            {sidebarOpen && openAccordions.reports && (
              <div className="bg-[#243444] py-1 pl-9 pr-3 space-y-1 text-[11px]">
                {["Invoice", "Student", "Collection", "Collection Summary", "Outstanding", "Feedback", "Attendance", "Assignment", "MCQ", "Practical", "Expense"].map(r => (
                  <button
                    key={r}
                    onClick={() => showToast(`Viewing Report: ${r}`)}
                    className="w-full text-left py-1 px-2 rounded text-slate-400 hover:text-white transition-colors"
                  >
                    • {r}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Sidebar Logout Action */}
        <div className="p-3 border-t border-[#374f67]">
          <button
            onClick={() => setIsAuthenticated(false)}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white text-xs font-semibold transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5 shrink-0" />
            {sidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-white">
        {/* Top Navbar Header (Matches Screenshot 1 Header) */}
        <header className="h-14 bg-[#EDEDED] border-b border-slate-300 px-4 flex items-center justify-between shadow-2xs">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded text-slate-600 hover:bg-slate-200 cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* User Profile in Top Right Header */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 p-1 rounded hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <img src="./student-avatar.jpg" alt="Profile" className="w-7 h-7 rounded-full object-cover border border-slate-400" />
              <span className="text-xs font-bold text-slate-700">{adminUser.displayName}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 mt-1 w-44 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50 text-xs">
                <div className="px-3 py-2 border-b border-slate-100 font-bold text-slate-800">
                  {adminUser.displayName}
                </div>
                <button
                  onClick={() => setIsAuthenticated(false)}
                  className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Scrollable Page Body */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Header Row: Breadcrumb on left + DV Analytics Logo on right (Matches Screenshot 1) */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2 text-slate-600 text-sm font-semibold">
              <Edit3 className="w-4 h-4 text-slate-400" />
              <span>/</span>
              <span className="text-slate-800 font-bold">
                {activeMenu === 'fee' && "Fee"}
                {activeMenu === 'session' && "Live Session"}
                {activeMenu === 'reg' && "Registration"}
                {activeMenu === 'assignment' && "Assignment"}
                {activeMenu === 'dashboard' && "Dashboard"}
              </span>
            </div>

            <div>
              <Logo />
            </div>
          </div>

          {/* ========================================================= */}
          {/* VIEW 1: FEE MANAGEMENT (Fee.aspx) - Matches Screenshot 1 */}
          {/* ========================================================= */}
          {activeMenu === 'fee' && (
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg border border-slate-200/90 shadow-sm space-y-6">
              <form onSubmit={handleFeeSubmit} className="space-y-4 text-xs font-sans">
                {/* 1. Date* */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                  <label className="sm:col-span-3 text-right font-bold text-slate-700">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <div className="sm:col-span-9">
                    <input
                      type="date"
                      value={feeForm.date}
                      onChange={(e) => setFeeForm({ ...feeForm, date: e.target.value })}
                      className="w-full max-w-md px-3 py-1.5 border border-slate-300 rounded text-xs focus:outline-none focus:border-teal-500 bg-white"
                      required
                    />
                  </div>
                </div>

                {/* 2. Student ID* */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                  <label className="sm:col-span-3 text-right font-bold text-slate-700">
                    Student ID <span className="text-red-500">*</span>
                  </label>
                  <div className="sm:col-span-9">
                    <input
                      type="text"
                      value={feeForm.studentId}
                      onChange={(e) => handleStudentIdChange(e.target.value)}
                      placeholder="e.g. 9955774102 or Roll No"
                      className="w-full max-w-md px-3 py-1.5 border border-slate-300 rounded text-xs focus:outline-none focus:border-teal-500 font-mono"
                      required
                    />
                  </div>
                </div>

                {/* 3. Committed Fee* */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                  <label className="sm:col-span-3 text-right font-bold text-slate-700">
                    Commited Fee <span className="text-red-500">*</span>
                  </label>
                  <div className="sm:col-span-9">
                    <input
                      type="text"
                      value={feeForm.committedFee}
                      onChange={(e) => setFeeForm({ ...feeForm, committedFee: e.target.value })}
                      className="w-full max-w-md px-3 py-1.5 border border-slate-300 rounded text-xs bg-slate-50 focus:outline-none font-mono"
                      required
                    />
                  </div>
                </div>

                {/* 4. Batch* */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                  <label className="sm:col-span-3 text-right font-bold text-slate-700">
                    Batch <span className="text-red-500">*</span>
                  </label>
                  <div className="sm:col-span-9">
                    <select
                      value={feeForm.batch}
                      onChange={(e) => setFeeForm({ ...feeForm, batch: e.target.value })}
                      className="w-full max-w-md px-3 py-1.5 border border-slate-300 rounded text-xs bg-white focus:outline-none"
                    >
                      {batchesList.map(b => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 5. Course* */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                  <label className="sm:col-span-3 text-right font-bold text-slate-700">
                    Course <span className="text-red-500">*</span>
                  </label>
                  <div className="sm:col-span-9">
                    <select
                      value={feeForm.course}
                      onChange={(e) => setFeeForm({ ...feeForm, course: e.target.value })}
                      className="w-full max-w-md px-3 py-1.5 border border-slate-300 rounded text-xs bg-white focus:outline-none"
                    >
                      <option value="APIDS">APIDS</option>
                      <option value="APIDA">APIDA</option>
                      <option value="MPGA">MPGA</option>
                      <option value="AIML">AIML</option>
                      <option value="BASIC PACK">BASIC PACK</option>
                    </select>
                  </div>
                </div>

                {/* 6. Balance* */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                  <label className="sm:col-span-3 text-right font-bold text-slate-700">
                    Balance <span className="text-red-500">*</span>
                  </label>
                  <div className="sm:col-span-9">
                    <input
                      type="text"
                      value={feeForm.balance}
                      onChange={(e) => setFeeForm({ ...feeForm, balance: e.target.value })}
                      className="w-full max-w-md px-3 py-1.5 border border-slate-300 rounded text-xs bg-slate-50 font-mono"
                      required
                    />
                  </div>
                </div>

                {/* 7. Amount* */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                  <label className="sm:col-span-3 text-right font-bold text-slate-700">
                    Amount <span className="text-red-500">*</span>
                  </label>
                  <div className="sm:col-span-9">
                    <input
                      type="number"
                      value={feeForm.amount}
                      onChange={(e) => setFeeForm({ ...feeForm, amount: e.target.value })}
                      placeholder="Payment installment amount"
                      className="w-full max-w-md px-3 py-1.5 border border-slate-300 rounded text-xs focus:outline-none font-mono font-bold"
                      required
                    />
                  </div>
                </div>

                {/* 8. Mode Of Pay* */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                  <label className="sm:col-span-3 text-right font-bold text-slate-700">
                    Mode Of Pay <span className="text-red-500">*</span>
                  </label>
                  <div className="sm:col-span-9">
                    <select
                      value={feeForm.modeOfPay}
                      onChange={(e) => setFeeForm({ ...feeForm, modeOfPay: e.target.value })}
                      className="w-full max-w-md px-3 py-1.5 border border-slate-300 rounded text-xs bg-white focus:outline-none"
                    >
                      <option value="Select Mode of Pay">Select Mode of Pay</option>
                      <option value="UPI / Bank Transfer">UPI / Bank Transfer</option>
                      <option value="Net Banking">Net Banking</option>
                      <option value="Debit / Credit Card">Debit / Credit Card</option>
                      <option value="Cash">Cash</option>
                      <option value="Cheque">Cheque</option>
                    </select>
                  </div>
                </div>

                {/* 9. Remarks */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-start">
                  <label className="sm:col-span-3 text-right font-bold text-slate-700 pt-1">
                    Remarks
                  </label>
                  <div className="sm:col-span-9">
                    <textarea
                      rows={3}
                      value={feeForm.remarks}
                      onChange={(e) => setFeeForm({ ...feeForm, remarks: e.target.value })}
                      className="w-full max-w-md px-3 py-1.5 border border-slate-300 rounded text-xs focus:outline-none"
                    />
                  </div>
                </div>

                {/* 10. Upload Reference Document */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                  <label className="sm:col-span-3 text-right font-bold text-slate-700">
                    Upload Reference Document
                  </label>
                  <div className="sm:col-span-9">
                    <input
                      type="file"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setFeeForm({ ...feeForm, referenceDocName: e.target.files[0].name });
                        }
                      }}
                      className="text-xs text-slate-600 file:mr-3 file:py-1 file:px-2.5 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-slate-100 hover:file:bg-slate-200 cursor-pointer"
                    />
                  </div>
                </div>

                {/* 11. Green Submit Button (Matches Screenshot 1) */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2">
                  <div className="sm:col-start-4 sm:col-span-9">
                    <button
                      type="submit"
                      className="bg-[#26B99A] hover:bg-[#209e83] text-white font-bold text-xs px-6 py-2 rounded shadow-xs transition-colors cursor-pointer"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>

              {/* Transactions Ledger */}
              <div className="pt-6 border-t border-slate-200 space-y-3">
                <span className="font-bold text-xs uppercase tracking-wider text-slate-600 block">
                  Recent Collection Receipts (Fee.aspx)
                </span>
                <div className="overflow-x-auto border border-slate-200 rounded">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-[#2A3F54] text-white">
                      <tr>
                        <th className="py-2 px-3">Date</th>
                        <th className="py-2 px-3">Student ID</th>
                        <th className="py-2 px-3">Student Name</th>
                        <th className="py-2 px-3">Batch</th>
                        <th className="py-2 px-3">Amount</th>
                        <th className="py-2 px-3">Mode</th>
                        <th className="py-2 px-3">Receipt</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {feeRecords.map((f, i) => (
                        <tr key={i} className="hover:bg-slate-50">
                          <td className="py-2 px-3 font-mono">{f.date}</td>
                          <td className="py-2 px-3 font-mono font-bold text-teal-700">{f.studentId}</td>
                          <td className="py-2 px-3 font-bold text-slate-800">{f.studentName || "SK ABDUL SAJID"}</td>
                          <td className="py-2 px-3">{f.batch}</td>
                          <td className="py-2 px-3 font-mono font-bold text-emerald-700">₹{parseInt(f.amount).toLocaleString('en-IN')}</td>
                          <td className="py-2 px-3">{f.modeOfPay}</td>
                          <td className="py-2 px-3">
                            <button
                              onClick={() => {
                                downloadFile(f.referenceDoc || "Receipt.pdf");
                                showToast(`Downloading receipt for Student ID ${f.studentId}`);
                              }}
                              className="text-blue-600 hover:underline flex items-center gap-1 font-mono text-[11px] cursor-pointer"
                            >
                              <Download className="w-3 h-3" />
                              <span>{f.referenceDoc || "Receipt.pdf"}</span>
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
          {/* VIEW 2: LIVE SESSION (Session.aspx) - Live Reflected in LMS */}
          {/* ========================================================= */}
          {activeMenu === 'session' && (
            <div className="space-y-6">
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-4 rounded-lg flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Real-Time Student Portal Synchronization Active</span>
                  </h4>
                  <p className="text-[11px] text-emerald-700 mt-0.5">
                    Any video stream URL, material zip, or assignment added here is instantly visible and playable in the Student LMS!
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                <form onSubmit={handleAddLiveSession} className="space-y-4 text-xs font-sans">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Date *</label>
                      <input
                        type="date"
                        value={sessionForm.date}
                        onChange={(e) => setSessionForm({ ...sessionForm, date: e.target.value })}
                        className="w-full px-3 py-1.5 border border-slate-300 rounded focus:border-teal-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Mentor (ddlmen) *</label>
                      <select
                        value={sessionForm.mentor}
                        onChange={(e) => setSessionForm({ ...sessionForm, mentor: e.target.value })}
                        className="w-full px-3 py-1.5 border border-slate-300 rounded bg-white"
                      >
                        {mentorsList.map(m => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Batch (ddlbat) *</label>
                      <select
                        value={sessionForm.batch}
                        onChange={(e) => setSessionForm({ ...sessionForm, batch: e.target.value })}
                        className="w-full px-3 py-1.5 border border-slate-300 rounded bg-white"
                      >
                        {batchesList.map(b => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Application (ddlappli) *</label>
                      <select
                        value={sessionForm.application}
                        onChange={(e) => setSessionForm({ ...sessionForm, application: e.target.value })}
                        className="w-full px-3 py-1.5 border border-slate-300 rounded bg-white"
                      >
                        {applicationsList.map(a => (
                          <option key={a} value={a}>{a}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Session Title (txtsess) *</label>
                      <input
                        type="text"
                        placeholder="e.g. B1.SESSION-1 or B5.SESSION-5"
                        value={sessionForm.sessionTitle}
                        onChange={(e) => setSessionForm({ ...sessionForm, sessionTitle: e.target.value })}
                        className="w-full px-3 py-1.5 border border-slate-300 rounded"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Sort Order *</label>
                      <input
                        type="number"
                        value={sessionForm.sortOrder}
                        onChange={(e) => setSessionForm({ ...sessionForm, sortOrder: e.target.value })}
                        className="w-full px-3 py-1.5 border border-slate-300 rounded font-mono"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Topic Type *</label>
                      <select
                        value={sessionForm.topicType}
                        onChange={(e) => setSessionForm({ ...sessionForm, topicType: e.target.value })}
                        className="w-full px-3 py-1.5 border border-slate-300 rounded bg-white font-bold"
                      >
                        <option value="CLASS VIDEOS">CLASS VIDEOS (Green Pill)</option>
                        <option value="MATERIALS">MATERIALS (Blue Pill)</option>
                        <option value="ASSIGNMENTS">ASSIGNMENTS (Orange Pill)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Uploaded Link (txtcontent_edit) *</label>
                      <input
                        type="text"
                        placeholder="VdoCipher embed URL, Google Drive folder URL, or MP4 link"
                        value={sessionForm.uploadedLink}
                        onChange={(e) => setSessionForm({ ...sessionForm, uploadedLink: e.target.value })}
                        className="w-full px-3 py-1.5 border border-slate-300 rounded font-mono"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">File Description (description_edit)</label>
                      <input
                        type="text"
                        placeholder="e.g. Session 1 Class 1 Video Lecture or Raw Data.zip"
                        value={sessionForm.description}
                        onChange={(e) => setSessionForm({ ...sessionForm, description: e.target.value })}
                        className="w-full px-3 py-1.5 border border-slate-300 rounded"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="bg-[#26B99A] hover:bg-[#209e83] text-white font-bold text-xs px-6 py-2 rounded shadow-xs cursor-pointer flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Submit Session Item (Live Push to Students)</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Stored Sessions List */}
              <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-3">
                <span className="font-bold text-xs uppercase tracking-wider text-slate-700 block">
                  Current Course Folders in Student LMS
                </span>
                <div className="overflow-x-auto border border-slate-200 rounded">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-[#2A3F54] text-white">
                      <tr>
                        <th className="py-2.5 px-3">Folder Title</th>
                        <th className="py-2.5 px-3">Subject / Application</th>
                        <th className="py-2.5 px-3">Instructor</th>
                        <th className="py-2.5 px-3">Has Video</th>
                        <th className="py-2.5 px-3">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {(storedSessions.excel || []).map(s => (
                        <tr key={s.id} className="hover:bg-slate-50">
                          <td className="py-2.5 px-3 font-bold text-slate-800">{s.title}</td>
                          <td className="py-2.5 px-3">Excel Base and Advanced</td>
                          <td className="py-2.5 px-3">{s.instructor || "Dr. Sandip Mukherjee"}</td>
                          <td className="py-2.5 px-3">
                            {s.vdocipherEmbedUrl || s.videoUrl ? (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                Video Stream Active
                              </span>
                            ) : (
                              <span className="text-slate-400">None</span>
                            )}
                          </td>
                          <td className="py-2.5 px-3">
                            <button
                              onClick={() => handleDeleteLiveSession(s.id, 'excel')}
                              className="text-red-500 hover:text-red-700 cursor-pointer p-1"
                              title="Delete from Student LMS"
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
          {/* VIEW 3: REGISTRATION (Reg.aspx)                           */}
          {/* ========================================================= */}
          {activeMenu === 'reg' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-lg border border-slate-200">
                <div>
                  <h3 className="font-bold text-sm text-slate-800">Registration Form (Reg.aspx)</h3>
                  <p className="text-xs text-slate-500">Student admissions registry and batch allocations</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCreateRegOpen(true)}
                    className="bg-[#26B99A] hover:bg-[#209e83] text-white font-bold text-xs px-4 py-2 rounded shadow-xs cursor-pointer flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Registration</span>
                  </button>
                  <button
                    onClick={() => {
                      generateAndDownloadExcel(studentsList, "Registered_Students.xlsx");
                      showToast("Exported students to Excel!");
                    }}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs px-3 py-2 rounded cursor-pointer flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export</span>
                  </button>
                </div>
              </div>

              {/* Filter */}
              <div className="bg-white p-4 rounded-lg border border-slate-200 grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Course ID</label>
                  <select
                    value={regFilterCourse}
                    onChange={(e) => setRegFilterCourse(e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white"
                  >
                    <option value="">All Course</option>
                    <option value="APIDS">APIDS</option>
                    <option value="APIDA">APIDA</option>
                    <option value="MPGA">MPGA</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Batch ID</label>
                  <select
                    value={regFilterBatch}
                    onChange={(e) => setRegFilterBatch(e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white"
                  >
                    <option value="">All Batch</option>
                    {batchesList.map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Search Keyword</label>
                  <input
                    type="text"
                    placeholder="Search by name, roll no, college..."
                    value={regSearchKeyword}
                    onChange={(e) => setRegSearchKeyword(e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => showToast("Search query refreshed.")}
                    className="w-full bg-[#337ab7] hover:bg-[#286090] text-white font-bold py-1.5 px-3 rounded shadow-xs"
                  >
                    Search (btngo)
                  </button>
                </div>
              </div>

              {/* Students Grid */}
              <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-[#2A3F54] text-white">
                    <tr>
                      <th className="py-2.5 px-3">Roll No</th>
                      <th className="py-2.5 px-3">Student Name</th>
                      <th className="py-2.5 px-3">Course</th>
                      <th className="py-2.5 px-3">Batch</th>
                      <th className="py-2.5 px-3">Phone</th>
                      <th className="py-2.5 px-3">Fee Status</th>
                      <th className="py-2.5 px-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {studentsList
                      .filter(s => !regSearchKeyword || s.name.toLowerCase().includes(regSearchKeyword.toLowerCase()) || s.phone.includes(regSearchKeyword))
                      .map((st, i) => (
                        <tr key={i} className="hover:bg-slate-50">
                          <td className="py-2.5 px-3 font-mono font-bold text-teal-700">{st.rollNo}</td>
                          <td className="py-2.5 px-3 font-bold text-slate-800">{st.name}</td>
                          <td className="py-2.5 px-3 font-semibold text-blue-700">{st.course}</td>
                          <td className="py-2.5 px-3 font-mono">{st.batch}</td>
                          <td className="py-2.5 px-3 font-mono">{st.phone}</td>
                          <td className="py-2.5 px-3">
                            <span className="font-mono font-bold">{st.paidFee}</span> / <span className="text-slate-500 font-mono">{st.totalFee}</span>
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            <button
                              onClick={() => {
                                setPasswordModalStudent(st);
                                setNewPasswordVal("");
                              }}
                              className="p-1 text-slate-500 hover:text-amber-600 cursor-pointer"
                              title="Change Password"
                            >
                              <Key className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* VIEW 4: ASSIGNMENT EVALUATION                             */}
          {/* ========================================================= */}
          {activeMenu === 'assignment' && (
            <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-slate-800">Assignment Approval & Review</h3>
              <div className="overflow-x-auto border border-slate-200 rounded">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-[#2A3F54] text-white">
                    <tr>
                      <th className="py-2 px-3">Student Name</th>
                      <th className="py-2 px-3">Task Title</th>
                      <th className="py-2 px-3">Submitted File</th>
                      <th className="py-2 px-3">Date</th>
                      <th className="py-2 px-3">Status</th>
                      <th className="py-2 px-3 text-center">Evaluate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {assignmentsApprovalList.map(a => (
                      <tr key={a.id} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-bold text-slate-800">{a.studentName}</td>
                        <td className="py-2.5 px-3">{a.title}</td>
                        <td className="py-2.5 px-3">
                          <button
                            onClick={() => {
                              downloadFile(a.submittedFile);
                              showToast(`Downloading: ${a.submittedFile}`);
                            }}
                            className="text-blue-600 hover:underline flex items-center gap-1 font-mono text-[11px] cursor-pointer"
                          >
                            <Download className="w-3 h-3" />
                            <span>{a.submittedFile}</span>
                          </button>
                        </td>
                        <td className="py-2.5 px-3 font-mono">{a.submittedDate}</td>
                        <td className="py-2.5 px-3">
                          {a.status === 'Approved' ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                              Approved ({a.score})
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                              Pending Evaluation
                            </span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          <button
                            onClick={() => setReviewModalItem(a)}
                            className="bg-[#26B99A] hover:bg-[#209e83] text-white font-bold text-[11px] px-3 py-1 rounded cursor-pointer"
                          >
                            Evaluate
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* VIEW 5: DASHBOARD OVERVIEW                                */}
          {/* ========================================================= */}
          {activeMenu === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
                  <span className="text-[11px] font-bold uppercase text-slate-400">Total Registered</span>
                  <div className="text-2xl font-black text-slate-800 mt-1">{studentsList.length} Students</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
                  <span className="text-[11px] font-bold uppercase text-slate-400">Monthly Collection</span>
                  <div className="text-2xl font-black text-emerald-700 mt-1">₹42,80,000</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
                  <span className="text-[11px] font-bold uppercase text-slate-400">Live Sessions</span>
                  <div className="text-2xl font-black text-blue-700 mt-1">{(storedSessions.excel || []).length} Folders</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
                  <span className="text-[11px] font-bold uppercase text-slate-400">Pending Reviews</span>
                  <div className="text-2xl font-black text-amber-600 mt-1">1 Assignment</div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* CREATE REGISTRATION MODAL */}
      {createRegOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <h4 className="font-bold text-sm text-slate-800">Create Registration</h4>
              <button onClick={() => setCreateRegOpen(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <form onSubmit={handleCreateStudentSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Student Name *</label>
                  <input
                    type="text"
                    required
                    value={newStudentForm.name}
                    onChange={(e) => setNewStudentForm({ ...newStudentForm, name: e.target.value })}
                    className="w-full border px-2.5 py-1.5 rounded"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={newStudentForm.phone}
                    onChange={(e) => setNewStudentForm({ ...newStudentForm, phone: e.target.value })}
                    className="w-full border px-2.5 py-1.5 rounded"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Course Allocation</label>
                  <select
                    value={newStudentForm.course}
                    onChange={(e) => setNewStudentForm({ ...newStudentForm, course: e.target.value })}
                    className="w-full border px-2.5 py-1.5 rounded bg-white"
                  >
                    <option value="APIDS">APIDS</option>
                    <option value="APIDA">APIDA</option>
                    <option value="MPGA">MPGA</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-1">Batch</label>
                  <select
                    value={newStudentForm.batch}
                    onChange={(e) => setNewStudentForm({ ...newStudentForm, batch: e.target.value })}
                    className="w-full border px-2.5 py-1.5 rounded bg-white"
                  >
                    {batchesList.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-1">Total Fee (₹)</label>
                  <input
                    type="number"
                    value={newStudentForm.totalFee}
                    onChange={(e) => setNewStudentForm({ ...newStudentForm, totalFee: e.target.value })}
                    className="w-full border px-2.5 py-1.5 rounded font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Paid Amount (₹)</label>
                  <input
                    type="number"
                    value={newStudentForm.paidFee}
                    onChange={(e) => setNewStudentForm({ ...newStudentForm, paidFee: e.target.value })}
                    className="w-full border px-2.5 py-1.5 rounded font-mono font-bold text-emerald-700"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t">
                <button type="button" onClick={() => setCreateRegOpen(false)} className="px-3 py-1.5 border rounded">Cancel</button>
                <button type="submit" className="px-5 py-1.5 bg-[#26B99A] text-white rounded font-bold">Register Student</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PASSWORD RESET MODAL */}
      {passwordModalStudent && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-sm w-full p-6 space-y-4 text-xs">
            <h4 className="font-bold text-sm">Change Password for {passwordModalStudent.name}</h4>
            <input
              type="text"
              placeholder="Enter new password"
              value={newPasswordVal}
              onChange={(e) => setNewPasswordVal(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setPasswordModalStudent(null)} className="px-3 py-1 border rounded">Close</button>
              <button
                onClick={() => {
                  showToast(`Password updated for ${passwordModalStudent.name}`);
                  setPasswordModalStudent(null);
                }}
                className="px-4 py-1 bg-amber-500 text-white rounded font-bold"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ASSIGNMENT REVIEW MODAL */}
      {reviewModalItem && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 space-y-4 text-xs">
            <h4 className="font-bold text-sm">Evaluate Assignment for {reviewModalItem.studentName}</h4>
            <div>
              <label className="block font-bold mb-1">Score (out of 100)</label>
              <input
                type="number"
                value={reviewScore}
                onChange={(e) => setReviewScore(e.target.value)}
                className="w-full border px-3 py-1.5 rounded font-mono font-bold"
              />
            </div>
            <div>
              <label className="block font-bold mb-1">Feedback</label>
              <textarea
                rows={3}
                value={reviewFeedback}
                onChange={(e) => setReviewFeedback(e.target.value)}
                className="w-full border px-3 py-1.5 rounded"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setReviewModalItem(null)} className="px-3 py-1.5 border rounded">Cancel</button>
              <button onClick={handleApproveAssignment} className="px-4 py-1.5 bg-[#26B99A] text-white font-bold rounded">Approve & Publish Score</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
