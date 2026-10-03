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
  FileCheck,
  Gauge,
  Monitor,
  Folder,
  Type,
  Mail
} from 'lucide-react';
import { downloadFile, generateAndDownloadExcel } from '../utils/excelHelper';
import Logo from '../components/Logo';
import ThemeSelector from '../components/ThemeSelector';
import { 
  UserMasterView, 
  BranchMasterView, 
  SkillMasterView, 
  AppMasterView, 
  CourseMasterView,
  BatchMasterView,
  MentorMasterView,
  SelfPaceMasterView,
  PaymentApprovalView,
  RegistrationLinkView,
  RegistrationView,
  FeeView,
  LiveSessionView,
  LiveSessionDeleteView,
  AssignmentApprovalView,
  UploadResumeView,
  InterviewKitView,
  NonLiveSessionView,
  AssignStudentNonLiveView,
  ReleaseUserView,
  ExeUsersView,
  AssignBatchView,
  MockInterviewFeedbackView
} from '../components/AdminMasterViews';
import ClassManagementView from '../components/ClassManagementView';
import {
  ReportInvoiceView,
  ReportStudentView,
  ReportOutstandingView,
  ReportAttendanceView,
  ReportAssignmentView,
  ReportFeedbackView,
  ReportMCQView,
  ReportPracticalView,
  ReportExpenseView
} from '../components/AdminReportViews';
import collectionData from '../data/collectionReportData.json';
import { 
  saveAdminSession, 
  deleteAdminSession, 
  getAllStoredSessions, 
  getStoredFees, 
  saveAdminFee, 
  getStoredStudents, 
  saveAdminStudent,
  saveStudentProfile,
  subscribeToDataUpdates
} from '../utils/lmsStorage';

export default function AdminPortalPage({ onBackToStudentLms }) {
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
  const [openAccordions, setOpenAccordions] = useState(() => {
    const url = (window.location.hash + window.location.pathname).toLowerCase();
    const isMaster = url.includes('master') || url.includes('department') || url.includes('designation') || url.includes('selfpace');
    const isApproval = url.includes('approval');
    const isTransaction = url.includes('external_link') || url.includes('reg') || url.includes('fee') || url.includes('session') || url.includes('assignment');
    return {
      dashboard: !isMaster && !isApproval && !isTransaction,
      master: isMaster,
      approval: isApproval,
      transaction: isTransaction || (!isMaster && !isApproval),
      applicationTest: false,
      reports: false
    };
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
    if (url.includes('usermaster')) return 'user-master';
    if (url.includes('branchmaster')) return 'branch-master';
    if (url.includes('skillmaster')) return 'skill-master';
    if (url.includes('appmaster')) return 'app-master';
    if (url.includes('coursemaster')) return 'course-master';
    if (url.includes('batchmaster')) return 'batch-master';
    if (url.includes('mentormaster')) return 'mentor-master';
    if (url.includes('selfpace') || url.includes('nonlivetraining')) return 'non-live-master';
    if (url.includes('telecallermaster')) return 'telecaller-master';
    if (url.includes('department')) return 'department-master';
    if (url.includes('designation')) return 'designation-master';
    if (url.includes('payapproval') || url.includes('paymentapproval')) return 'pay-approval';
    if (url.includes('external_link') || url.includes('registrationlink')) return 'external-link';
    if (url.includes('dailycollection') || url.includes('daily-collection')) return 'daily-collection';
    if (url.includes('monthlycollection') || url.includes('monthly-collection')) return 'monthly-collection';
    if (url.includes('rpt_invoice') || url.includes('report-invoice')) return 'report-invoice';
    if (url.includes('rpt_student') || url.includes('report-student')) return 'report-student';
    if (url.includes('rpt_collection') || url.includes('report-collection')) return 'daily-collection';
    if (url.includes('rpt_collectionsummary') || url.includes('report-collection-summary')) return 'monthly-collection';
    if (url.includes('rpt_outstanding') || url.includes('report-outstanding')) return 'report-outstanding';
    if (url.includes('rpt_feedback') || url.includes('report-feedback')) return 'report-feedback';
    if (url.includes('rpt_attendance') || url.includes('report-attendance')) return 'report-attendance';
    if (url.includes('rpt_assignment') || url.includes('report-assignment')) return 'report-assignment';
    if (url.includes('rpt_mcq') || url.includes('report-mcq')) return 'report-mcq';
    if (url.includes('rpt_practical') || url.includes('report-practical')) return 'report-practical';
    if (url.includes('rpt_expense') || url.includes('report-expense')) return 'report-expense';
    if (url.includes('class.aspx') || url.includes('/class')) return 'class';
    if (url.includes('discussionforum') || url.includes('discussion-forum')) return 'discussion-forum';
    if (url.includes('appusers') || url.includes('app-users')) return 'app-users';
    if (url.includes('importlead') || url.includes('import-lead')) return 'import-lead';
    if (url.includes('batchcompletion') || url.includes('batch-completion')) return 'batch-completion';
    if (url.includes('assignbatchcollection') || url.includes('assign-batch-collection')) return 'assign-batch-collection';
    if (url.includes('fee')) return 'fee';
    if (url.includes('sessiondelete')) return 'session-delete';
    if (url.includes('sessionsp')) return 'non-live-session';
    if (url.includes('session')) return 'session';
    if (url.includes('reg')) return 'reg';
    if (url.includes('assignmentapproval') || url.includes('assignment')) return 'assignment';
    if (url.includes('uploadresume') || url.includes('resume')) return 'resume';
    if (url.includes('interviewkit')) return 'interview-kit';
    if (url.includes('others_access') || url.includes('othersaccess')) return 'assign-non-live';
    if (url.includes('users_exe') || url.includes('usersexe')) return 'exe-users';
    if (url.includes('users.aspx') || url.includes('releaseuser')) return 'release-user';
    if (url.includes('assignbatch')) return 'assign-batch';
    if (url.includes('mockinterview')) return 'mock-interview';
    if (url.includes('dashboard')) return 'monthly-collection';
    if (url.includes('master')) return 'user-master';
    return 'user-master'; // Default to User Master (Screenshot 1)
  };

  const [activeMenu, setActiveMenu] = useState(() => getInitialMenu());
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSelectMenu = (menuKey) => {
    setActiveMenu(menuKey);
    if (menuKey === 'user-master') window.location.hash = '/admin/usermaster.aspx';
    else if (menuKey === 'branch-master') window.location.hash = '/admin/BranchMaster.aspx';
    else if (menuKey === 'skill-master') window.location.hash = '/admin/skillMaster.aspx';
    else if (menuKey === 'app-master') window.location.hash = '/admin/AppMaster.aspx';
    else if (menuKey === 'course-master') window.location.hash = '/admin/CourseMaster.aspx';
    else if (menuKey === 'batch-master') window.location.hash = '/admin/BatchMaster.aspx';
    else if (menuKey === 'mentor-master') window.location.hash = '/admin/MentorMaster.aspx';
    else if (menuKey === 'non-live-master') window.location.hash = '/admin/SelfPaceMaster.aspx';
    else if (menuKey === 'telecaller-master') window.location.hash = '/admin/TeleCallerMaster.aspx';
    else if (menuKey === 'department-master') window.location.hash = '/admin/Department.aspx';
    else if (menuKey === 'designation-master') window.location.hash = '/admin/Designation.aspx';
    else if (menuKey === 'pay-approval') window.location.hash = '/admin/PayApproval.aspx';
    else if (menuKey === 'external-link') window.location.hash = '/admin/external_link.aspx';
    else if (menuKey === 'fee') window.location.hash = '/admin/Fee.aspx';
    else if (menuKey === 'class') window.location.hash = '/admin/Class.aspx';
    else if (menuKey === 'discussion-forum') window.location.hash = '/admin/DiscussionForum.aspx';
    else if (menuKey === 'app-users') window.location.hash = '/admin/AppUsers.aspx';
    else if (menuKey === 'import-lead') window.location.hash = '/admin/ImportLead.aspx';
    else if (menuKey === 'batch-completion') window.location.hash = '/admin/BatchCompletion.aspx';
    else if (menuKey === 'assign-batch-collection') window.location.hash = '/admin/AssignBatchForCollection.aspx';
    else if (menuKey === 'expense') window.location.hash = '/admin/Expense.aspx';
    else if (menuKey === 'session') window.location.hash = '/admin/Session.aspx';
    else if (menuKey === 'session-delete') window.location.hash = '/admin/sessiondelete.aspx';
    else if (menuKey === 'reg') window.location.hash = '/admin/Reg.aspx';
    else if (menuKey === 'assignment') window.location.hash = '/admin/AssignmentApproval.aspx';
    else if (menuKey === 'resume') window.location.hash = '/admin/UploadResume.aspx';
    else if (menuKey === 'interview-kit') window.location.hash = '/admin/interviewkit.aspx';
    else if (menuKey === 'non-live-session') window.location.hash = '/admin/Sessionsp.aspx';
    else if (menuKey === 'assign-non-live') window.location.hash = '/admin/Others_Access.aspx';
    else if (menuKey === 'release-user') window.location.hash = '/admin/users.aspx';
    else if (menuKey === 'exe-users') window.location.hash = '/admin/users_exe.aspx';
    else if (menuKey === 'assign-batch') window.location.hash = '/admin/AssignBatch.aspx';
    else if (menuKey === 'mock-interview') window.location.hash = '/admin/MockinterviewFeedback.aspx';
    else if (menuKey === 'daily-collection') window.location.hash = '/admin/DailyCollection.aspx';
    else if (menuKey === 'monthly-collection') window.location.hash = '/admin/MonthlyCollection.aspx';
    else if (menuKey === 'report-invoice') window.location.hash = '/admin/rpt_Invoice.aspx';
    else if (menuKey === 'report-student') window.location.hash = '/admin/rpt_Student.aspx';
    else if (menuKey === 'report-outstanding') window.location.hash = '/admin/rpt_Outstanding.aspx';
    else if (menuKey === 'report-feedback') window.location.hash = '/admin/rpt_Feedback.aspx';
    else if (menuKey === 'report-attendance') window.location.hash = '/admin/rpt_Attendance.aspx';
    else if (menuKey === 'report-assignment') window.location.hash = '/admin/rpt_Assignment.aspx';
    else if (menuKey === 'report-mcq') window.location.hash = '/admin/rpt_MCQ.aspx';
    else if (menuKey === 'report-practical') window.location.hash = '/admin/rpt_Practical.aspx';
    else if (menuKey === 'report-expense') window.location.hash = '/admin/rpt_Expense.aspx';
    else if (menuKey === 'dashboard') window.location.hash = '/admin/dashboard.aspx';
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
  // DAILY & MONTHLY COLLECTION INTELLIGENCE STATE
  // ==========================================
  const [dailySearch, setDailySearch] = useState("");
  const [dailyBranch, setDailyBranch] = useState("ALL");
  const [dailyCourse, setDailyCourse] = useState("ALL");
  const [dailyMonth, setDailyMonth] = useState("2026-09");
  const [dailyPage, setDailyPage] = useState(1);
  const [dailyViewMode, setDailyViewMode] = useState("table"); // 'table' | 'visualizer'

  const filteredDailyTransactions = React.useMemo(() => {
    return (collectionData || []).filter(item => {
      const matchSearch = !dailySearch || 
        (item.student && item.student.toLowerCase().includes(dailySearch.toLowerCase())) ||
        (item.counselor && item.counselor.toLowerCase().includes(dailySearch.toLowerCase())) ||
        (item.payment_mode && item.payment_mode.toLowerCase().includes(dailySearch.toLowerCase()));
      const matchBranch = dailyBranch === "ALL" || item.branch === dailyBranch;
      const matchCourse = dailyCourse === "ALL" || item.course === dailyCourse;
      const matchMonth = dailyMonth === "ALL" || (item.payment_date && item.payment_date.startsWith(dailyMonth));
      return matchSearch && matchBranch && matchCourse && matchMonth;
    });
  }, [dailySearch, dailyBranch, dailyCourse, dailyMonth]);

  const dailyTotalAmount = React.useMemo(() => {
    return filteredDailyTransactions.reduce((acc, cur) => acc + (cur.amount || 0), 0);
  }, [filteredDailyTransactions]);

  const dailyPageSize = 20;
  const dailyTotalPages = Math.ceil(filteredDailyTransactions.length / dailyPageSize) || 1;
  const paginatedDaily = filteredDailyTransactions.slice((dailyPage - 1) * dailyPageSize, dailyPage * dailyPageSize);

  // Pre-calculated monthly aggregate summary matching repository data
  const monthlyBreakdown = [
    { month: "2026-09", label: "September 2026", count: 61, bbsr: 3042500, blr: 1251049, total: 4293549, status: "Active Cycle" },
    { month: "2026-08", label: "August 2026", count: 133, bbsr: 6580000, blr: 3212479, total: 9792479, status: "Reconciled" },
    { month: "2026-07", label: "July 2026", count: 151, bbsr: 6420000, blr: 3205282, total: 9625282, status: "Reconciled" },
    { month: "2026-06", label: "June 2026", count: 181, bbsr: 5910000, blr: 2905037, total: 8815037, status: "Reconciled" },
    { month: "2026-05", label: "May 2026", count: 127, bbsr: 5340000, blr: 2572357, total: 7912357, status: "Reconciled" },
    { month: "2026-04", label: "April 2026", count: 125, bbsr: 4420000, blr: 2146461, total: 6566461, status: "Reconciled" },
    { month: "2026-03", label: "March 2026", count: 115, bbsr: 4480000, blr: 2175236, total: 6655236, status: "Reconciled" },
    { month: "2026-02", label: "February 2026", count: 156, bbsr: 4860000, blr: 2363250, total: 7223250, status: "Reconciled" },
    { month: "2026-01", label: "January 2026", count: 101, bbsr: 5290000, blr: 2599033, total: 7889033, status: "Reconciled" },
    { month: "2025-12", label: "December 2025", count: 122, bbsr: 5410000, blr: 2681583, total: 8091583, status: "Audited" },
    { month: "2025-11", label: "November 2025", count: 130, bbsr: 5460000, blr: 2692066, total: 8152066, status: "Audited" },
    { month: "2025-09", label: "September 2025", count: 161, bbsr: 6920000, blr: 3418434, total: 10338434, status: "Audited" }
  ];

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
              const cleanUser = loginUsername.trim().toLowerCase();
              if (cleanUser === "skabdulsajid" || cleanUser === "debendra" || cleanUser === "admin") {
                setIsAuthenticated(true);
                setAdminUser({
                  username: loginUsername,
                  displayName: loginUsername.toUpperCase(),
                  role: "System Administrator",
                  email: `${loginUsername}@dvanalytics.com`
                });
                return;
              }

              // Check if user is a student attempting to log in
              const allStudents = getStoredStudents();
              const matchedStudent = allStudents.find(s => {
                const sRoll = (s.rollNo || '').trim().toLowerCase();
                const sEmail = (s.email || '').trim().toLowerCase();
                const sPhone = (s.phone || '').trim();
                const sName = (s.name || '').trim().toLowerCase();
                return sRoll === cleanUser || sEmail === cleanUser || sPhone === cleanUser || sName === cleanUser || sName.includes(cleanUser);
              }) || (cleanUser.includes('sajid') || cleanUser === 'student' ? {
                name: "SK ABDUL SAJID",
                rollNo: "DVA-202606-448",
                batch: "BATCH 202606",
                email: "abdul.sajid@example.com",
                courseCode: "APIDS"
              } : null);

              if (matchedStudent) {
                saveStudentProfile(matchedStudent);
                localStorage.setItem('dva_student_authenticated', 'true');
                if (onBackToStudentLms) {
                  onBackToStudentLms();
                } else {
                  window.location.hash = '';
                }
                return;
              }

              setLoginError("Invalid credentials. For Admin enter skabdulsajid / @2288. For Student enter your Roll No (e.g. DVA-202606-448, BLR202609001)");
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
              <label className="block text-xs font-semibold text-slate-500">Username / Student Roll No</label>
              <input
                type="text"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                placeholder="Admin username or Student Roll No"
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
                onClick={() => alert("Password reset link sent to your registered email.")}
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

          <div className="mt-8 pt-6 border-t border-slate-100 space-y-3">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold uppercase tracking-wider text-slate-400">
                Quick Credentials:
              </span>
              <button
                type="button"
                onClick={onBackToStudentLms}
                className="text-teal-700 font-bold hover:underline cursor-pointer"
              >
                Go to Student LMS ➔
              </button>
            </div>

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
                  setLoginUsername("DVA-202606-448");
                  setLoginPassword("@2288");
                  const allStudents = getStoredStudents();
                  const s = allStudents[0] || { name: "SK ABDUL SAJID", rollNo: "DVA-202606-448", batch: "BATCH 202606" };
                  saveStudentProfile(s);
                  localStorage.setItem('dva_student_authenticated', 'true');
                  onBackToStudentLms?.();
                }}
                className="p-2 text-left bg-orange-50 hover:bg-orange-100 rounded-lg border border-orange-200 text-xs cursor-pointer"
              >
                <div className="font-bold text-orange-900">Student Login</div>
                <div className="text-[10px] text-orange-700">DVA-202606-448 (Sajid)</div>
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
    <div className="h-screen bg-[#f7f8fa] text-slate-900 flex font-sans antialiased overflow-hidden">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white text-xs px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Sidebar - DV Deep Navy & macOS MacBook Design System */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} h-full bg-gradient-to-b from-[#081220] via-[#0d1d36] to-[#060c17] text-slate-200 flex flex-col transition-all duration-300 shrink-0 border-r border-slate-800/80 z-40 select-none shadow-xl overflow-hidden`}>
        {/* macOS Traffic Lights & Top Brand Logo */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800/80 bg-[#081220]/75 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            {sidebarOpen ? (
              <div className="mac-traffic-lights mr-1.5" title="macOS Window Controls">
                <span className="mac-dot mac-dot-red" title="Close"></span>
                <span className="mac-dot mac-dot-yellow" title="Minimize"></span>
                <span className="mac-dot mac-dot-green" title="Expand"></span>
              </div>
            ) : (
              <div className="flex flex-col gap-1 items-center mr-1" title="macOS Window Controls">
                <span className="w-2 h-2 rounded-full bg-[#ff5f56]"></span>
                <span className="w-2 h-2 rounded-full bg-[#ffbd2e]"></span>
                <span className="w-2 h-2 rounded-full bg-[#27c93f]"></span>
              </div>
            )}
            <Logo collapsed={!sidebarOpen} />
          </div>
        </div>

        {/* Profile Card inside Sidebar - macOS Frosted Navy Card */}
        <div className="p-3 border-b border-slate-800/80">
          <div className="rounded-2xl bg-gradient-to-b from-[#0f2347]/70 to-[#0b1728]/80 border border-slate-700/60 p-3 flex items-center gap-3 shadow-inner">
            <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-orange-500/50 overflow-hidden flex items-center justify-center shrink-0 shadow-xs">
              <img src="./student-avatar.jpg" alt="Admin" className="w-full h-full object-cover" />
            </div>
            {sidebarOpen && (
              <div className="overflow-hidden">
                <span className="text-[10px] uppercase font-bold tracking-wider text-orange-400 block">System Admin</span>
                <span className="font-bold text-xs text-white truncate block">
                  {adminUser.displayName}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Accordion Sidebar Menu with macOS Highlighting */}
        <nav className="flex-1 overflow-y-auto min-h-0 py-2 text-xs divide-y divide-slate-800/60 scrollbar-thin">
          {/* 1. Dashboard Accordion */}
          <div className={openAccordions.dashboard ? "border-r-[4px] border-orange-500 bg-[#0f2347]/50" : ""}>
            <button
              onClick={() => toggleAccordion('dashboard')}
              className="w-full flex items-center justify-between px-4 py-3 text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Gauge className="w-4 h-4 text-orange-400" />
                {sidebarOpen && <span className="font-semibold">Dashboard</span>}
              </div>
              {sidebarOpen && (
                openAccordions.dashboard ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>
            {sidebarOpen && openAccordions.dashboard && (
              <div className="relative pl-5 py-1 text-[11px] bg-[#091526]/80 before:absolute before:left-[19px] before:top-2 before:bottom-3 before:w-[1px] before:bg-orange-500/30">
                <button
                  onClick={() => handleSelectMenu('monthly-collection')}
                  className={`w-full flex items-center gap-2.5 py-1.5 px-3 rounded-lg transition-all text-left group cursor-pointer ${activeMenu === 'monthly-collection' ? 'text-white font-bold bg-gradient-to-r from-orange-500 to-amber-500 shadow-xs' : 'text-slate-300 hover:text-white hover:bg-white/10'}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 -ml-1 ${activeMenu === 'monthly-collection' ? 'bg-white' : 'bg-slate-500 group-hover:bg-orange-400'}`} />
                  <span>Monthly Collection</span>
                </button>
                <button
                  onClick={() => handleSelectMenu('daily-collection')}
                  className={`w-full flex items-center gap-2.5 py-1.5 px-3 rounded-lg transition-all text-left group cursor-pointer ${activeMenu === 'daily-collection' ? 'text-white font-bold bg-gradient-to-r from-orange-500 to-amber-500 shadow-xs' : 'text-slate-300 hover:text-white hover:bg-white/10'}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 -ml-1 ${activeMenu === 'daily-collection' ? 'bg-white' : 'bg-slate-500 group-hover:bg-orange-400'}`} />
                  <span>Daily Collection</span>
                </button>
              </div>
            )}
          </div>

          {/* 2. Master Accordion */}
          <div className={openAccordions.master ? "border-r-[4px] border-orange-500 bg-[#0f2347]/50" : ""}>
            <button
              onClick={() => toggleAccordion('master')}
              className="w-full flex items-center justify-between px-4 py-3 text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Monitor className="w-4 h-4 text-slate-400" />
                {sidebarOpen && <span className="font-semibold">Master</span>}
              </div>
              {sidebarOpen && (
                openAccordions.master ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>
            {sidebarOpen && openAccordions.master && (
              <div className="relative pl-5 py-1 text-[11px] bg-[#091526]/80 before:absolute before:left-[19px] before:top-2 before:bottom-3 before:w-[1px] before:bg-orange-500/30">
                {[
                  { key: 'user-master', name: 'User Master' },
                  { key: 'branch-master', name: 'Branch Master' },
                  { key: 'skill-master', name: 'Skill Master' },
                  { key: 'app-master', name: 'Application Master' },
                  { key: 'course-master', name: 'Course Master' },
                  { key: 'batch-master', name: 'Batch Master' },
                  { key: 'mentor-master', name: 'Mentor Master' },
                  { key: 'non-live-master', name: 'Non Live Training' },
                  { key: 'telecaller-master', name: 'TeleCaller Master' },
                  { key: 'department-master', name: 'Department' },
                  { key: 'designation-master', name: 'Designation' }
                ].map(m => (
                  <button
                    key={m.key}
                    onClick={() => handleSelectMenu(m.key)}
                    className={`w-full flex items-center gap-2.5 py-1.5 px-3 rounded transition-colors text-left group cursor-pointer ${
                      activeMenu === m.key 
                        ? 'text-white font-bold bg-gradient-to-r from-orange-500 to-amber-500 shadow-xs' 
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 -ml-1 transition-colors ${
                      activeMenu === m.key ? 'bg-[#1abb9c]' : 'bg-slate-500 group-hover:bg-orange-400'
                    }`} />
                    <span>{m.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 3. Approval Accordion */}
          <div className={openAccordions.approval ? "border-r-[4px] border-orange-500 bg-[#0f2347]/50" : ""}>
            <button
              onClick={() => toggleAccordion('approval')}
              className="w-full flex items-center justify-between px-4 py-3 text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-slate-400" />
                {sidebarOpen && <span className="font-semibold">Approval</span>}
              </div>
              {sidebarOpen && (
                openAccordions.approval ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>
            {sidebarOpen && openAccordions.approval && (
              <div className="relative pl-5 py-1 text-[11px] bg-[#091526]/80 before:absolute before:left-[19px] before:top-2 before:bottom-3 before:w-[1px] before:bg-orange-500/30">
                {[
                  { key: 'pay-approval', name: 'Payment Approval' },
                  { key: 'reg-approval', name: 'Registration Approval' },
                  { key: 'emp-approval', name: 'Employee Approval' },
                  { key: 'exp-approval', name: 'Expense Approval' },
                  { key: 'app-approval', name: 'Appraisal Approval' }
                ].map(a => (
                  <button
                    key={a.key}
                    onClick={() => handleSelectMenu(a.key)}
                    className={`w-full flex items-center gap-2.5 py-1.5 px-3 rounded transition-colors text-left group cursor-pointer ${
                      activeMenu === a.key 
                        ? 'text-white font-bold bg-gradient-to-r from-orange-500 to-amber-500 shadow-xs' 
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 -ml-1 transition-colors ${
                      activeMenu === a.key ? 'bg-[#1abb9c]' : 'bg-slate-500 group-hover:bg-orange-400'
                    }`} />
                    <span>{a.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 4. Transaction Accordion */}
          <div className={openAccordions.transaction ? "border-r-[4px] border-orange-500 bg-[#0f2347]/50" : ""}>
            <button
              onClick={() => toggleAccordion('transaction')}
              className="w-full flex items-center justify-between px-4 py-3 text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Folder className="w-4 h-4 text-slate-400" />
                {sidebarOpen && <span className="font-semibold">Transaction</span>}
              </div>
              {sidebarOpen && (
                openAccordions.transaction ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>
            {sidebarOpen && openAccordions.transaction && (
              <div className="relative pl-5 py-1 text-[11px] bg-[#091526]/80 before:absolute before:left-[19px] before:top-2 before:bottom-3 before:w-[1px] before:bg-orange-500/30">
                <button
                  onClick={() => handleSelectMenu('external-link')}
                  className={`w-full flex items-center gap-2.5 py-1.5 px-3 rounded transition-colors text-left group cursor-pointer ${activeMenu === 'external-link' ? 'text-white font-bold bg-gradient-to-r from-orange-500 to-amber-500 shadow-xs' : 'text-slate-300 hover:text-white hover:bg-white/10'}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 -ml-1 ${activeMenu === 'external-link' ? 'bg-[#1abb9c]' : 'bg-slate-500 group-hover:bg-orange-400'}`} />
                  <span>Registration Web Link</span>
                </button>
                <button
                  onClick={() => handleSelectMenu('reg')}
                  className={`w-full flex items-center gap-2.5 py-1.5 px-3 rounded transition-colors text-left group cursor-pointer ${activeMenu === 'reg' ? 'text-white font-bold bg-gradient-to-r from-orange-500 to-amber-500 shadow-xs' : 'text-slate-300 hover:text-white hover:bg-white/10'}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 -ml-1 ${activeMenu === 'reg' ? 'bg-[#1abb9c]' : 'bg-slate-500 group-hover:bg-orange-400'}`} />
                  <span>Registration (Reg.aspx)</span>
                </button>
                <button
                  onClick={() => handleSelectMenu('fee')}
                  className={`w-full flex items-center gap-2.5 py-1.5 px-3 rounded transition-colors text-left group cursor-pointer ${activeMenu === 'fee' ? 'text-white font-bold bg-gradient-to-r from-orange-500 to-amber-500 shadow-xs' : 'text-slate-300 hover:text-white hover:bg-white/10'}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 -ml-1 ${activeMenu === 'fee' ? 'bg-[#1abb9c]' : 'bg-slate-500 group-hover:bg-orange-400'}`} />
                  <span>Fee (Fee.aspx)</span>
                </button>
                <button
                  onClick={() => handleSelectMenu('session')}
                  className={`w-full flex items-center gap-2.5 py-1.5 px-3 rounded transition-colors text-left group cursor-pointer ${activeMenu === 'session' ? 'text-white font-bold bg-gradient-to-r from-orange-500 to-amber-500 shadow-xs' : 'text-slate-300 hover:text-white hover:bg-white/10'}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 -ml-1 ${activeMenu === 'session' ? 'bg-[#1abb9c]' : 'bg-slate-500 group-hover:bg-orange-400'}`} />
                  <span>Live Session (Session.aspx)</span>
                </button>
                <button
                  onClick={() => handleSelectMenu('session-delete')}
                  className={`w-full flex items-center gap-2.5 py-1.5 px-3 rounded transition-colors text-left group cursor-pointer ${activeMenu === 'session-delete' ? 'text-white font-bold bg-gradient-to-r from-orange-500 to-amber-500 shadow-xs' : 'text-slate-300 hover:text-white hover:bg-white/10'}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 -ml-1 ${activeMenu === 'session-delete' ? 'bg-[#1abb9c]' : 'bg-slate-500 group-hover:bg-orange-400'}`} />
                  <span>Live Session - Delete</span>
                </button>
                <button
                  onClick={() => handleSelectMenu('assignment')}
                  className={`w-full flex items-center gap-2.5 py-1.5 px-3 rounded transition-colors text-left group cursor-pointer ${activeMenu === 'assignment' ? 'text-white font-bold bg-gradient-to-r from-orange-500 to-amber-500 shadow-xs' : 'text-slate-300 hover:text-white hover:bg-white/10'}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 -ml-1 ${activeMenu === 'assignment' ? 'bg-[#1abb9c]' : 'bg-slate-500 group-hover:bg-orange-400'}`} />
                  <span>Assignment</span>
                </button>
                <button
                  onClick={() => handleSelectMenu('resume')}
                  className={`w-full flex items-center gap-2.5 py-1.5 px-3 rounded transition-colors text-left group cursor-pointer ${activeMenu === 'resume' ? 'text-white font-bold bg-gradient-to-r from-orange-500 to-amber-500 shadow-xs' : 'text-slate-300 hover:text-white hover:bg-white/10'}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 -ml-1 ${activeMenu === 'resume' ? 'bg-[#1abb9c]' : 'bg-slate-500 group-hover:bg-orange-400'}`} />
                  <span>Resume</span>
                </button>
                <button
                  onClick={() => handleSelectMenu('interview-kit')}
                  className={`w-full flex items-center gap-2.5 py-1.5 px-3 rounded transition-colors text-left group cursor-pointer ${activeMenu === 'interview-kit' ? 'text-white font-bold bg-gradient-to-r from-orange-500 to-amber-500 shadow-xs' : 'text-slate-300 hover:text-white hover:bg-white/10'}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 -ml-1 ${activeMenu === 'interview-kit' ? 'bg-[#1abb9c]' : 'bg-slate-500 group-hover:bg-orange-400'}`} />
                  <span>My Interview Kit</span>
                </button>
                <button
                  onClick={() => handleSelectMenu('non-live-session')}
                  className={`w-full flex items-center gap-2.5 py-1.5 px-3 rounded transition-colors text-left group cursor-pointer ${activeMenu === 'non-live-session' ? 'text-white font-bold bg-gradient-to-r from-orange-500 to-amber-500 shadow-xs' : 'text-slate-300 hover:text-white hover:bg-white/10'}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 -ml-1 ${activeMenu === 'non-live-session' ? 'bg-[#1abb9c]' : 'bg-slate-500 group-hover:bg-orange-400'}`} />
                  <span>Non Live Session</span>
                </button>
                <button
                  onClick={() => handleSelectMenu('assign-non-live')}
                  className={`w-full flex items-center gap-2.5 py-1.5 px-3 rounded transition-colors text-left group cursor-pointer ${activeMenu === 'assign-non-live' ? 'text-white font-bold bg-gradient-to-r from-orange-500 to-amber-500 shadow-xs' : 'text-slate-300 hover:text-white hover:bg-white/10'}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 -ml-1 ${activeMenu === 'assign-non-live' ? 'bg-[#1abb9c]' : 'bg-slate-500 group-hover:bg-orange-400'}`} />
                  <span>Assign Student for Non live sessions</span>
                </button>
                <button
                  onClick={() => handleSelectMenu('release-user')}
                  className={`w-full flex items-center gap-2.5 py-1.5 px-3 rounded transition-colors text-left group cursor-pointer ${activeMenu === 'release-user' ? 'text-white font-bold bg-gradient-to-r from-orange-500 to-amber-500 shadow-xs' : 'text-slate-300 hover:text-white hover:bg-white/10'}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 -ml-1 ${activeMenu === 'release-user' ? 'bg-[#1abb9c]' : 'bg-slate-500 group-hover:bg-orange-400'}`} />
                  <span>Release User</span>
                </button>
                <button
                  onClick={() => handleSelectMenu('exe-users')}
                  className={`w-full flex items-center gap-2.5 py-1.5 px-3 rounded transition-colors text-left group cursor-pointer ${activeMenu === 'exe-users' ? 'text-white font-bold bg-gradient-to-r from-orange-500 to-amber-500 shadow-xs' : 'text-slate-300 hover:text-white hover:bg-white/10'}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 -ml-1 ${activeMenu === 'exe-users' ? 'bg-[#1abb9c]' : 'bg-slate-500 group-hover:bg-orange-400'}`} />
                  <span>EXE Users</span>
                </button>
                <button
                  onClick={() => handleSelectMenu('assign-batch')}
                  className={`w-full flex items-center gap-2.5 py-1.5 px-3 rounded transition-colors text-left group cursor-pointer ${activeMenu === 'assign-batch' ? 'text-white font-bold bg-gradient-to-r from-orange-500 to-amber-500 shadow-xs' : 'text-slate-300 hover:text-white hover:bg-white/10'}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 -ml-1 ${activeMenu === 'assign-batch' ? 'bg-[#1abb9c]' : 'bg-slate-500 group-hover:bg-orange-400'}`} />
                  <span>Assign Students for Batch</span>
                </button>
                <button
                  onClick={() => handleSelectMenu('mock-interview')}
                  className={`w-full flex items-center gap-2.5 py-1.5 px-3 rounded transition-colors text-left group cursor-pointer ${activeMenu === 'mock-interview' ? 'text-white font-bold bg-gradient-to-r from-orange-500 to-amber-500 shadow-xs' : 'text-slate-300 hover:text-white hover:bg-white/10'}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 -ml-1 ${activeMenu === 'mock-interview' ? 'bg-[#1abb9c]' : 'bg-slate-500 group-hover:bg-orange-400'}`} />
                  <span>Mock Interview</span>
                </button>
                <button
                  onClick={() => handleSelectMenu('class')}
                  className={`w-full flex items-center gap-2.5 py-1.5 px-3 rounded transition-colors text-left group cursor-pointer ${activeMenu === 'class' ? 'text-white font-bold bg-gradient-to-r from-orange-500 to-amber-500 shadow-xs' : 'text-slate-300 hover:text-white hover:bg-white/10'}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 -ml-1 ${activeMenu === 'class' ? 'bg-[#1abb9c]' : 'bg-slate-500 group-hover:bg-orange-400'}`} />
                  <span>Class</span>
                </button>
                <button
                  onClick={() => handleSelectMenu('discussion-forum')}
                  className={`w-full flex items-center gap-2.5 py-1.5 px-3 rounded transition-colors text-left group cursor-pointer ${activeMenu === 'discussion-forum' ? 'text-white font-bold bg-gradient-to-r from-orange-500 to-amber-500 shadow-xs' : 'text-slate-300 hover:text-white hover:bg-white/10'}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 -ml-1 ${activeMenu === 'discussion-forum' ? 'bg-[#1abb9c]' : 'bg-slate-500 group-hover:bg-orange-400'}`} />
                  <span>Discussion Forum</span>
                </button>
                <button
                  onClick={() => handleSelectMenu('app-users')}
                  className={`w-full flex items-center gap-2.5 py-1.5 px-3 rounded transition-colors text-left group cursor-pointer ${activeMenu === 'app-users' ? 'text-white font-bold bg-gradient-to-r from-orange-500 to-amber-500 shadow-xs' : 'text-slate-300 hover:text-white hover:bg-white/10'}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 -ml-1 ${activeMenu === 'app-users' ? 'bg-[#1abb9c]' : 'bg-slate-500 group-hover:bg-orange-400'}`} />
                  <span>App Users</span>
                </button>
                <button
                  onClick={() => handleSelectMenu('import-lead')}
                  className={`w-full flex items-center gap-2.5 py-1.5 px-3 rounded transition-colors text-left group cursor-pointer ${activeMenu === 'import-lead' ? 'text-white font-bold bg-gradient-to-r from-orange-500 to-amber-500 shadow-xs' : 'text-slate-300 hover:text-white hover:bg-white/10'}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 -ml-1 ${activeMenu === 'import-lead' ? 'bg-[#1abb9c]' : 'bg-slate-500 group-hover:bg-orange-400'}`} />
                  <span>Import Lead</span>
                </button>
                <button
                  onClick={() => handleSelectMenu('batch-completion')}
                  className={`w-full flex items-center gap-2.5 py-1.5 px-3 rounded transition-colors text-left group cursor-pointer ${activeMenu === 'batch-completion' ? 'text-white font-bold bg-gradient-to-r from-orange-500 to-amber-500 shadow-xs' : 'text-slate-300 hover:text-white hover:bg-white/10'}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 -ml-1 ${activeMenu === 'batch-completion' ? 'bg-[#1abb9c]' : 'bg-slate-500 group-hover:bg-orange-400'}`} />
                  <span>Batch Completion</span>
                </button>
                <button
                  onClick={() => handleSelectMenu('assign-batch-collection')}
                  className={`w-full flex items-center gap-2.5 py-1.5 px-3 rounded transition-colors text-left group cursor-pointer ${activeMenu === 'assign-batch-collection' ? 'text-white font-bold bg-gradient-to-r from-orange-500 to-amber-500 shadow-xs' : 'text-slate-300 hover:text-white hover:bg-white/10'}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 -ml-1 ${activeMenu === 'assign-batch-collection' ? 'bg-[#1abb9c]' : 'bg-slate-500 group-hover:bg-orange-400'}`} />
                  <span>Assign Batch For Collection</span>
                </button>
                <button
                  onClick={() => handleSelectMenu('expense')}
                  className={`w-full flex items-center gap-2.5 py-1.5 px-3 rounded transition-colors text-left group cursor-pointer ${activeMenu === 'expense' ? 'text-white font-bold bg-gradient-to-r from-orange-500 to-amber-500 shadow-xs' : 'text-slate-300 hover:text-white hover:bg-white/10'}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 -ml-1 ${activeMenu === 'expense' ? 'bg-[#1abb9c]' : 'bg-slate-500 group-hover:bg-orange-400'}`} />
                  <span>Expense</span>
                </button>
              </div>
            )}
          </div>

          {/* 5. Application Test Accordion (Matches Screenshot media_1790833990861.png) */}
          <div className={openAccordions.applicationTest ? "border-r-[4px] border-orange-500 bg-[#0f2347]/50" : ""}>
            <button
              onClick={() => toggleAccordion('applicationTest')}
              className="w-full flex items-center justify-between px-4 py-3 text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Type className="w-4 h-4 text-slate-400 font-serif" />
                {sidebarOpen && <span className="font-semibold">Application Test</span>}
              </div>
              {sidebarOpen && (
                openAccordions.applicationTest ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>
            {sidebarOpen && openAccordions.applicationTest && (
              <div className="relative pl-5 py-1 text-[11px] bg-[#091526]/80 before:absolute before:left-[19px] before:top-2 before:bottom-3 before:w-[1px] before:bg-orange-500/30">
                {[
                  { name: "Practical Test Questions", url: "PracticalTestQuestions.aspx" },
                  { name: "MCQ", url: "MCQMaster.aspx" },
                  { name: "Assign MCQ To Batch", url: "AssignMCQ.aspx" },
                  { name: "Assign Practical Questions", url: "AssignPractical.aspx" },
                  { name: "Practical Test Evaluation", url: "PracticalTestEvaluation.aspx" },
                  { name: "Assign PI To Batch", url: "AssignPI.aspx" },
                  { name: "PI Questions", url: "PIQuestions.aspx" },
                  { name: "PI", url: "PIMaster.aspx" },
                  { name: "PI Evaluation", url: "PIEvaluation.aspx" }
                ].map(at => (
                  <button
                    key={at.name}
                    onClick={() => {
                      showToast(`Navigated to ${at.name} (${at.url})`);
                    }}
                    title={`https://edu.dvanalyticsmds.com/admin/${at.url}`}
                    className="w-full flex items-center gap-2.5 py-1.5 px-3 rounded text-slate-300 hover:text-white hover:bg-white/10 transition-colors text-left group cursor-pointer"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500 group-hover:bg-orange-400 shrink-0 -ml-1 transition-colors" />
                    <span>{at.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 6. Reports Accordion (Matches Screenshot media_1790834000571.png) */}
          <div className={openAccordions.reports ? "border-r-[4px] border-orange-500 bg-[#0f2347]/50" : ""}>
            <button
              onClick={() => toggleAccordion('reports')}
              className="w-full flex items-center justify-between px-4 py-3 text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-slate-400" />
                {sidebarOpen && <span className="font-semibold">Reports</span>}
              </div>
              {sidebarOpen && (
                openAccordions.reports ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>
            {sidebarOpen && openAccordions.reports && (
              <div className="relative pl-5 py-1 text-[11px] bg-[#091526]/80 before:absolute before:left-[19px] before:top-2 before:bottom-3 before:w-[1px] before:bg-orange-500/30">
                {[
                  { name: "Invoice", url: "rpt_Invoice.aspx", key: "report-invoice" },
                  { name: "Student", url: "rpt_Student.aspx", key: "report-student" },
                  { name: "Collection", url: "rpt_Collection.aspx", key: "daily-collection" },
                  { name: "Collection Summary", url: "rpt_CollectionSummary.aspx", key: "monthly-collection" },
                  { name: "Outstanding", url: "rpt_Outstanding.aspx", key: "report-outstanding" },
                  { name: "Feedback", url: "rpt_Feedback.aspx", key: "report-feedback" },
                  { name: "Attendance", url: "rpt_Attendance.aspx", key: "report-attendance" },
                  { name: "Assignment", url: "rpt_Assignment.aspx", key: "report-assignment" },
                  { name: "MCQ", url: "rpt_MCQ.aspx", key: "report-mcq" },
                  { name: "Practical", url: "rpt_Practical.aspx", key: "report-practical" },
                  { name: "Expense", url: "rpt_Expense.aspx", key: "report-expense" }
                ].map(r => {
                  const isActive = activeMenu === r.key;
                  return (
                    <button
                      key={r.name}
                      onClick={() => {
                        handleSelectMenu(r.key);
                        showToast(`Opened ${r.name} Report (${r.url})`);
                      }}
                      title={`https://edu.dvanalyticsmds.com/admin/${r.url}`}
                      className={`w-full flex items-center justify-between py-1.5 px-3 rounded transition-colors text-left group cursor-pointer ${
                        isActive 
                          ? 'text-white font-bold bg-gradient-to-r from-orange-500 to-amber-500 shadow-xs' 
                          : 'text-slate-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 -ml-1 transition-colors ${
                          isActive ? 'bg-white' : 'bg-slate-500 group-hover:bg-orange-400'
                        }`} />
                        <span>{r.name}</span>
                      </div>
                      <span className={`text-[9px] font-mono ${isActive ? 'text-teal-100' : 'text-slate-500'}`}>
                        {r.url.replace('.aspx', '')}
                      </span>
                    </button>
                  );
                })}
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
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-[#f8fafc]">
        {/* Top Navbar Header - macOS Frosted Glass */}
        <header className="h-16 shrink-0 bg-white/80 backdrop-blur-2xl border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between shadow-[0_1px_3px_rgba(0,0,0,0.02)] z-30">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mac-btn mac-btn-glass p-2 rounded-xl text-slate-700 hover:text-slate-900 cursor-pointer"
            title="Toggle Admin Sidebar"
          >
            <Menu className="w-4 h-4" />
          </button>

          {/* Right Action Bar: Live Sync Status, Switch to Student LMS, and User Profile */}
          <div className="flex items-center gap-3">
            {/* Live Sync Status Indicator */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-[11px] font-semibold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Live Synced to Student LMS</span>
            </div>

            {/* Direct Switch to Student LMS Button - MacBook Orange Push Button */}
            {onBackToStudentLms && (
              <button
                onClick={onBackToStudentLms}
                className="mac-btn mac-btn-orange px-3.5 py-1.5 rounded-xl text-white text-xs font-bold gap-1.5 shadow-sm cursor-pointer active:scale-95"
                title="Switch view to Student Access"
              >
                <span>🎓 Switch to Student LMS</span>
              </button>
            )}

            {/* 4-Theme Switcher (macOS, Award 2026, White, Black) */}
            <ThemeSelector compact={true} />

            {/* User Profile in Top Right Header with MacBook Glass styling */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="mac-btn mac-btn-glass p-1 pl-1.5 pr-2.5 rounded-full flex items-center gap-2 group cursor-pointer border border-slate-200/80"
              >
                <img src="./student-avatar.jpg" alt="Profile" className="w-7 h-7 rounded-full object-cover border border-orange-500/40" />
                <span className="text-xs font-bold text-slate-800">{adminUser.displayName}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 transition-transform" />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-200/80 py-2 z-50 text-xs animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2.5 border-b border-slate-100 font-bold text-slate-800">
                    <span className="block text-slate-900">{adminUser.displayName}</span>
                    <span className="text-[10px] text-orange-600 font-semibold uppercase">{adminUser.role}</span>
                  </div>
                  {onBackToStudentLms && (
                    <button
                      onClick={onBackToStudentLms}
                      className="w-full text-left px-4 py-2 text-slate-700 hover:bg-orange-50 hover:text-orange-700 flex items-center gap-2 cursor-pointer font-medium transition-colors"
                    >
                      <span>🎓 Go to Student Portal</span>
                    </button>
                  )}
                  <button
                    onClick={() => setIsAuthenticated(false)}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer border-t border-slate-100 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Scrollable Page Body */}
        <main className="flex-1 overflow-y-auto min-h-0 p-4 sm:p-6 space-y-6 pb-28 scrollbar-thin">
          {/* Header Row: Breadcrumb on left + DV Analytics Logo on right - macOS Frosted Card */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center gap-2 text-slate-600 text-sm font-semibold">
              <Edit3 className="w-4 h-4 text-orange-500" />
              <span>/</span>
              <span className="text-slate-900 font-bold">
                {activeMenu === 'user-master' && "User Master"}
                {activeMenu === 'branch-master' && "Branch Master"}
                {activeMenu === 'skill-master' && "Skill Master"}
                {activeMenu === 'app-master' && "Application Master"}
                {activeMenu === 'course-master' && "Course Master"}
                {activeMenu === 'batch-master' && "Batch Master"}
                {activeMenu === 'mentor-master' && "Mentor Master"}
                {activeMenu === 'non-live-master' && "Self Paced Master"}
                {activeMenu === 'telecaller-master' && "TeleCaller Master"}
                {activeMenu === 'department-master' && "Department"}
                {activeMenu === 'designation-master' && "Designation"}
                {activeMenu === 'pay-approval' && "Payment Approval"}
                {activeMenu === 'external-link' && "Registration Link"}
                {activeMenu === 'fee' && "Fee"}
                {activeMenu === 'session' && "Class Materials"}
                {activeMenu === 'session-delete' && "Session Delete"}
                {activeMenu === 'reg' && "Registration Form"}
                {activeMenu === 'assignment' && "Assignment Approval"}
                {activeMenu === 'resume' && "Upload Resume"}
                {activeMenu === 'interview-kit' && "Interview Prepration Kit"}
                {activeMenu === 'non-live-session' && "Class Materials - Others"}
                {activeMenu === 'assign-non-live' && "Assign student for non live sessions"}
                {activeMenu === 'release-user' && "Release User"}
                {activeMenu === 'exe-users' && "Release User"}
                {activeMenu === 'assign-batch' && "Assign Batch"}
                {activeMenu === 'mock-interview' && "Mock Interview Feedback"}
                {activeMenu === 'class' && "Class (Class.aspx) - Live Classroom & Mentorship Scheduling"}
                {activeMenu === 'discussion-forum' && "Discussion Forum (DiscussionForum.aspx)"}
                {activeMenu === 'app-users' && "App Users (AppUsers.aspx)"}
                {activeMenu === 'import-lead' && "Import Lead (ImportLead.aspx)"}
                {activeMenu === 'batch-completion' && "Batch Completion (BatchCompletion.aspx)"}
                {activeMenu === 'assign-batch-collection' && "Assign Batch For Collection (AssignBatchCollection.aspx)"}
                {activeMenu === 'expense' && "Expense Ledger (Expense.aspx)"}
                {activeMenu === 'monthly-collection' && "Monthly Collection (rpt_CollectionSummary.aspx)"}
                {activeMenu === 'daily-collection' && "Daily Collection Ledger (rpt_Collection.aspx)"}
                {activeMenu === 'report-invoice' && "Fee Invoice Register (rpt_Invoice.aspx)"}
                {activeMenu === 'report-student' && "Student Enrollment Report (rpt_Student.aspx)"}
                {activeMenu === 'report-outstanding' && "Outstanding Fees & Receivables (rpt_Outstanding.aspx)"}
                {activeMenu === 'report-feedback' && "Faculty & Course Feedback Matrix (rpt_Feedback.aspx)"}
                {activeMenu === 'report-attendance' && "Biometric & Lecture Attendance Compliance (rpt_Attendance.aspx)"}
                {activeMenu === 'report-assignment' && "Assignment Evaluation & Grading Register (rpt_Assignment.aspx)"}
                {activeMenu === 'report-mcq' && "MCQ & CAT Online Examination Report (rpt_MCQ.aspx)"}
                {activeMenu === 'report-practical' && "Practical Lab & Industry Capstone Defense (rpt_Practical.aspx)"}
                {activeMenu === 'report-expense' && "Center Operations Expenditure Ledger (rpt_Expense.aspx)"}
                {activeMenu === 'dashboard' && "Monthly Collection"}
              </span>
            </div>

            <div>
              <Logo />
            </div>
          </div>

          {/* ========================================================= */}
          {/* MASTER & APPROVAL & TRANSACTION VIEWS                      */}
          {/* ========================================================= */}
          {activeMenu === 'user-master' && (
            <UserMasterView showToast={showToast} />
          )}

          {activeMenu === 'branch-master' && (
            <BranchMasterView showToast={showToast} />
          )}

          {activeMenu === 'skill-master' && (
            <SkillMasterView showToast={showToast} />
          )}

          {activeMenu === 'app-master' && (
            <AppMasterView showToast={showToast} />
          )}

          {activeMenu === 'course-master' && (
            <CourseMasterView showToast={showToast} />
          )}

          {activeMenu === 'batch-master' && (
            <BatchMasterView showToast={showToast} />
          )}

          {activeMenu === 'mentor-master' && (
            <MentorMasterView showToast={showToast} />
          )}

          {activeMenu === 'non-live-master' && (
            <SelfPaceMasterView showToast={showToast} />
          )}

          {activeMenu === 'pay-approval' && (
            <PaymentApprovalView showToast={showToast} />
          )}

          {activeMenu === 'external-link' && (
            <RegistrationLinkView showToast={showToast} />
          )}

          {activeMenu === 'telecaller-master' && (
            <div className="bg-white p-6 rounded border border-slate-200 text-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-800">TeleCaller Master</h3>
                <button onClick={() => showToast("Create TeleCaller clicked")} className="mac-btn mac-btn-orange text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow-xs cursor-pointer active:scale-95">Create TeleCaller</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {["PRIYANKA MISHRA", "PRABHAT KUMAR SAHOO", "SANGHAMITRA PARIDA", "ROHIT VERMA", "POOJA ACHARYA", "PALLAVI DASH", "DIPAK BEHERA", "SNEHA PRADHAN", "RUNU BALA NAYAK"].map(tc => (
                  <div key={tc} className="p-3 border rounded bg-slate-50 font-semibold text-slate-800 flex items-center justify-between">
                    <span>{tc}</span>
                    <button onClick={() => showToast(`Edit ${tc}`)} className="text-[11px] bg-[#d9534f] text-white px-2 py-0.5 rounded">Edit</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeMenu === 'department-master' && (
            <div className="bg-white p-6 rounded border border-slate-200 text-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-800">Department Master</h3>
                <button onClick={() => showToast("Create Department clicked")} className="mac-btn mac-btn-orange text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow-xs cursor-pointer active:scale-95">Create Department</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {["DATA SCIENCE & AI", "DATA ENGINEERING", "CYBER SECURITY", "BUSINESS INTELLIGENCE", "FULL STACK WEB", "CORPORATE TRAINING", "ADMIN & OPERATIONS", "ACCOUNTS & FINANCE"].map(dep => (
                  <div key={dep} className="p-3 border rounded bg-slate-50 font-semibold text-slate-800 flex items-center justify-between">
                    <span>{dep}</span>
                    <button onClick={() => showToast(`Edit ${dep}`)} className="text-[11px] bg-[#d9534f] text-white px-2 py-0.5 rounded">Edit</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeMenu === 'designation-master' && (
            <div className="bg-white p-6 rounded border border-slate-200 text-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-800">Designation Master</h3>
                <button onClick={() => showToast("Create Designation clicked")} className="mac-btn mac-btn-orange text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow-xs cursor-pointer active:scale-95">Create Designation</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {["SUPER ADMIN", "DIRECTOR", "ADMINISTRATOR", "SENIOR MENTOR", "MENTOR", "L&D LEAD", "PAYROLL ADMIN", "ACCOUNTS MANAGER", "ACCOUNTS EXECUTIVE", "SENIOR COUNSELOR", "TELECALLER", "PLACEMENT HEAD"].map(des => (
                  <div key={des} className="p-3 border rounded bg-slate-50 font-semibold text-slate-800 flex items-center justify-between">
                    <span>{des}</span>
                    <button onClick={() => showToast(`Edit ${des}`)} className="text-[11px] bg-[#d9534f] text-white px-2 py-0.5 rounded">Edit</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* VIEW 1: FEE MANAGEMENT (Fee.aspx) - Matches Screenshot 1 */}
          {/* ========================================================= */}
          {activeMenu === 'fee' && (
            <FeeView showToast={showToast} />
          )}

          {/* ========================================================= */}
          {/* VIEW 2: LIVE SESSION (Session.aspx) - Matches Screenshots 1 & 2 */}
          {/* ========================================================= */}
          {activeMenu === 'session' && (
            <LiveSessionView showToast={showToast} />
          )}

          {/* ========================================================= */}
          {/* VIEW 2B: LIVE SESSION - DELETE (sessiondelete.aspx) - Matches Screenshot 3 */}
          {/* ========================================================= */}
          {activeMenu === 'session-delete' && (
            <LiveSessionDeleteView showToast={showToast} />
          )}

          {/* ========================================================= */}
          {/* VIEW 3: REGISTRATION (Reg.aspx)                           */}
          {/* ========================================================= */}
          {activeMenu === 'reg' && (
            <RegistrationView showToast={showToast} />
          )}

          {/* ========================================================= */}
          {/* VIEW 4: ASSIGNMENT APPROVAL (AssignmentApproval.aspx) - Matches Screenshot 4 */}
          {/* ========================================================= */}
          {activeMenu === 'assignment' && (
            <AssignmentApprovalView showToast={showToast} />
          )}

          {/* ========================================================= */}
          {/* VIEW 4B: UPLOAD RESUME (UploadResume.aspx) - Matches Screenshot 5 */}
          {/* ========================================================= */}
          {activeMenu === 'resume' && (
            <UploadResumeView 
              showToast={showToast} 
              onBack={() => handleSelectMenu('user-master')} 
            />
          )}

          {/* ========================================================= */}
          {/* VIEW 4C: INTERVIEW PREPARATION KIT (interviewkit.aspx) - Matches Screenshot 1 */}
          {/* ========================================================= */}
          {activeMenu === 'interview-kit' && (
            <InterviewKitView showToast={showToast} />
          )}

          {/* ========================================================= */}
          {/* VIEW 4D: NON LIVE SESSION (Sessionsp.aspx) - Matches Screenshot 2 */}
          {/* ========================================================= */}
          {activeMenu === 'non-live-session' && (
            <NonLiveSessionView showToast={showToast} />
          )}

          {/* ========================================================= */}
          {/* VIEW 4E: ASSIGN STUDENT NON LIVE (Others_Access.aspx) - Matches Screenshots 3 & 4 */}
          {/* ========================================================= */}
          {activeMenu === 'assign-non-live' && (
            <AssignStudentNonLiveView showToast={showToast} />
          )}

          {/* ========================================================= */}
          {/* VIEW 4F: RELEASE USER (users.aspx) - Matches Screenshot 1 */}
          {/* ========================================================= */}
          {activeMenu === 'release-user' && (
            <ReleaseUserView showToast={showToast} />
          )}

          {/* ========================================================= */}
          {/* VIEW 4G: EXE USERS (users_exe.aspx) - Matches Screenshot 2 */}
          {/* ========================================================= */}
          {activeMenu === 'exe-users' && (
            <ExeUsersView showToast={showToast} />
          )}

          {/* ========================================================= */}
          {/* VIEW 4H: ASSIGN STUDENTS FOR BATCH (AssignBatch.aspx) - Matches Screenshot 3 */}
          {/* ========================================================= */}
          {activeMenu === 'assign-batch' && (
            <AssignBatchView showToast={showToast} />
          )}

          {/* ========================================================= */}
          {/* VIEW 4I: MOCK INTERVIEW FEEDBACK (MockinterviewFeedback.aspx) - Matches Screenshot 4 */}
          {/* ========================================================= */}
          {activeMenu === 'mock-interview' && (
            <MockInterviewFeedbackView showToast={showToast} />
          )}

          {/* ========================================================= */}
          {/* VIEW 4J: LIVE CLASSROOM & ZOOM SCHEDULE (Class.aspx)       */}
          {/* ========================================================= */}
          {activeMenu === 'class' && (
            <ClassManagementView 
              showToast={showToast} 
              onNavigateToSession={(batch, subject) => handleSelectMenu('session')} 
            />
          )}

          {/* VIEW 4K: DISCUSSION FORUM (DiscussionForum.aspx) */}
          {activeMenu === 'discussion-forum' && (
            <div className="bg-white rounded border border-slate-200 p-6 space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="text-sm font-bold text-slate-800">Discussion Forum & Query Center</h3>
                <span className="text-[11px] bg-teal-50 text-teal-700 px-2 py-0.5 rounded font-mono font-bold">DiscussionForum.aspx</span>
              </div>
              <p className="text-xs text-slate-500">Student queries, mentor discussions, and technical doubt threads across all batches.</p>
              <div className="border rounded p-4 bg-slate-50 text-xs text-slate-600">
                All forum threads and doubt resolution feeds are active and synchronized with LMS.
              </div>
            </div>
          )}

          {/* VIEW 4L: APP USERS (AppUsers.aspx) */}
          {activeMenu === 'app-users' && (
            <div className="bg-white rounded border border-slate-200 p-6 space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="text-sm font-bold text-slate-800">App Users Management</h3>
                <span className="text-[11px] bg-teal-50 text-teal-700 px-2 py-0.5 rounded font-mono font-bold">AppUsers.aspx</span>
              </div>
              <p className="text-xs text-slate-500">Registered application logins, device sessions, and role permissions.</p>
              <div className="border rounded p-4 bg-slate-50 text-xs text-slate-600">
                Connected App Users Roster: All student and faculty mobile/web sessions logged.
              </div>
            </div>
          )}

          {/* VIEW 4M: IMPORT LEAD (ImportLead.aspx) */}
          {activeMenu === 'import-lead' && (
            <div className="bg-white rounded border border-slate-200 p-6 space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="text-sm font-bold text-slate-800">Import Student Inquiries & Leads</h3>
                <span className="text-[11px] bg-teal-50 text-teal-700 px-2 py-0.5 rounded font-mono font-bold">ImportLead.aspx</span>
              </div>
              <p className="text-xs text-slate-500">Upload Excel lead sheets, map columns, and assign telecallers.</p>
              <div className="border rounded p-4 bg-slate-50 text-xs text-slate-600">
                Lead intake channel ready. Excel and CSV bulk import active.
              </div>
            </div>
          )}

          {/* VIEW 4N: BATCH COMPLETION (BatchCompletion.aspx) */}
          {activeMenu === 'batch-completion' && (
            <div className="bg-white rounded border border-slate-200 p-6 space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="text-sm font-bold text-slate-800">Batch Completion & Certification</h3>
                <span className="text-[11px] bg-teal-50 text-teal-700 px-2 py-0.5 rounded font-mono font-bold">BatchCompletion.aspx</span>
              </div>
              <p className="text-xs text-slate-500">Track cohort curriculum milestones, practical evaluation defense, and graduation eligibility.</p>
              <div className="border rounded p-4 bg-slate-50 text-xs text-slate-600">
                Active Cohort BATCH 202606: 82% complete. BATCH 202608: In progress.
              </div>
            </div>
          )}

          {/* VIEW 4O: ASSIGN BATCH FOR COLLECTION */}
          {activeMenu === 'assign-batch-collection' && (
            <div className="bg-white rounded border border-slate-200 p-6 space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="text-sm font-bold text-slate-800">Assign Batch For Fee Collection</h3>
                <span className="text-[11px] bg-teal-50 text-teal-700 px-2 py-0.5 rounded font-mono font-bold">AssignBatchCollection.aspx</span>
              </div>
              <p className="text-xs text-slate-500">Assign accounts executives and collection targets per active batch.</p>
              <div className="border rounded p-4 bg-slate-50 text-xs text-slate-600">
                Accounts executive assignment roster linked to collection ledger.
              </div>
            </div>
          )}

          {/* VIEW 4P: EXPENSE */}
          {activeMenu === 'expense' && (
            <ReportExpenseView showToast={showToast} />
          )}

          {/* ========================================================= */}
          {/* VIEW 5A: MONTHLY COLLECTION DASHBOARD                     */}
          {/* ========================================================= */}
          {(activeMenu === 'monthly-collection' || activeMenu === 'dashboard') && (
            <div className="space-y-6">
              {/* Executive Summary Metrics matching user screenshot media_1790836123881.png */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Registered</span>
                  <div className="text-2xl font-black text-slate-800 mt-1">{studentsList.length} Students</div>
                  <div className="text-[11px] text-slate-500 mt-1 font-mono">Active admissions batch</div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Monthly Collection</span>
                  <div className="text-2xl font-black text-emerald-700 mt-1">₹42,93,549</div>
                  <div className="text-[11px] text-slate-500 mt-1 font-mono">Cycle: Sep 2026 (61 Txns)</div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total All-Time Collection</span>
                  <div className="text-2xl font-black text-blue-700 mt-1">₹37,11,46,721</div>
                  <div className="text-[11px] text-slate-500 mt-1 font-mono">6,230 Verified Records</div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Live Sessions</span>
                  <div className="text-2xl font-black text-amber-600 mt-1">{(storedSessions.excel || []).length} Folders</div>
                  <div className="text-[11px] text-slate-500 mt-1 font-mono">Course video modules</div>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 text-teal-800 border border-teal-200 font-bold text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                    <span>Monthly Revenue Progression & Intelligence</span>
                  </div>
                  <span className="text-xs text-slate-400">
                    Source: <span className="font-mono text-slate-600">Daily-Collection-report</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSelectMenu('daily-collection')}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#2A3F54] hover:bg-white/10 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
                  >
                    <span>View Daily Collection Ledger</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href="./DAILY-COLLECTION-DV-ANALYTICS.xlsx"
                    download="DAILY-COLLECTION-DV-ANALYTICS.xlsx"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Excel Sheet</span>
                  </a>

                  <a
                    href="./daily-collection.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open Analytics Visualizer</span>
                  </a>
                </div>
              </div>

              {/* Monthly Revenue Progression Table */}
              <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
                <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">Monthly Collection Cycles</h3>
                    <p className="text-xs text-slate-500">Breakdown of collections across Bhubaneswar (BBSR) and Bangalore (BLR) branches</p>
                  </div>
                  <span className="text-xs font-mono bg-slate-100 px-2.5 py-1 rounded text-slate-600 font-bold">
                    6,230 Transactions Total
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#2A3F54] text-white uppercase text-[10px] tracking-wider font-semibold">
                      <tr>
                        <th className="py-2.5 px-4">Billing Month</th>
                        <th className="py-2.5 px-3 text-center">Txns</th>
                        <th className="py-2.5 px-3 text-right">BBSR Branch (₹)</th>
                        <th className="py-2.5 px-3 text-right">BLR Branch (₹)</th>
                        <th className="py-2.5 px-3 text-right">Total Collection (₹)</th>
                        <th className="py-2.5 px-3 text-center">Audit Status</th>
                        <th className="py-2.5 px-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {monthlyBreakdown.map((m, idx) => (
                        <tr key={m.month} className={idx % 2 === 0 ? "bg-white hover:bg-teal-50/40" : "bg-slate-50/60 hover:bg-teal-50/40"}>
                          <td className="py-2.5 px-4 font-bold text-slate-800">
                            {m.label} <span className="text-slate-400 font-normal">({m.month})</span>
                          </td>
                          <td className="py-2.5 px-3 text-center font-mono font-bold text-slate-700">{m.count}</td>
                          <td className="py-2.5 px-3 text-right font-mono text-slate-700">₹{m.bbsr.toLocaleString('en-IN')}</td>
                          <td className="py-2.5 px-3 text-right font-mono text-slate-700">₹{m.blr.toLocaleString('en-IN')}</td>
                          <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-700">₹{m.total.toLocaleString('en-IN')}</td>
                          <td className="py-2.5 px-3 text-center">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              m.status === 'Active Cycle' 
                                ? 'bg-emerald-100 text-emerald-800' 
                                : m.status === 'Reconciled' 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-slate-100 text-slate-700'
                            }`}>
                              {m.status}
                            </span>
                          </td>
                          <td className="py-2.5 px-4 text-center">
                            <button
                              onClick={() => {
                                setDailyMonth(m.month);
                                setDailyPage(1);
                                handleSelectMenu('daily-collection');
                              }}
                              className="text-teal-700 hover:text-teal-900 font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                            >
                              <span>View Daily Txns</span>
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-slate-100 font-bold border-t-2 border-slate-300">
                      <tr>
                        <td className="py-3 px-4 text-slate-800 uppercase tracking-wider text-[11px]">Total Consolidated</td>
                        <td className="py-3 px-3 text-center font-mono text-slate-800">6,230</td>
                        <td className="py-3 px-3 text-right font-mono text-slate-800">₹24,85,12,450</td>
                        <td className="py-3 px-3 text-right font-mono text-slate-800">₹12,26,34,271</td>
                        <td className="py-3 px-3 text-right font-mono text-emerald-800 text-sm">₹37,11,46,721</td>
                        <td colSpan={2}></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Branch & Course Share Distribution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between border-b pb-2">
                    <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Branch Revenue Contribution</h4>
                    <Building className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="space-y-3 text-xs">
                    <div>
                      <div className="flex justify-between font-bold mb-1">
                        <span>Bhubaneswar (BBSR)</span>
                        <span className="text-emerald-700 font-mono">₹24.85 Cr (67.0%)</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: '67%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between font-bold mb-1">
                        <span>Bangalore (BLR)</span>
                        <span className="text-indigo-700 font-mono">₹12.26 Cr (33.0%)</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-600 rounded-full" style={{ width: '33%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between border-b pb-2">
                    <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Top Course Revenue Share</h4>
                    <BookOpen className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="space-y-2 text-xs">
                    {[
                      { name: "APIDS (Predictive Intelligence & Data Science)", amount: "₹18.42 Cr", pct: 49.6, color: "bg-teal-500" },
                      { name: "APIDA (Advanced Predictive Analytics)", amount: "₹8.91 Cr", pct: 24.0, color: "bg-blue-500" },
                      { name: "FDE (Fullstack Data Engineering)", amount: "₹4.87 Cr", pct: 13.1, color: "bg-amber-500" },
                      { name: "MPGA (GenAI & Machine Learning)", amount: "₹3.12 Cr", pct: 8.4, color: "bg-purple-500" },
                      { name: "DAS (Data Analytics Specialization)", amount: "₹1.79 Cr", pct: 4.8, color: "bg-rose-500" }
                    ].map(c => (
                      <div key={c.name}>
                        <div className="flex justify-between text-[11px] mb-0.5">
                          <span className="font-medium text-slate-700">{c.name}</span>
                          <span className="font-bold font-mono">{c.amount}</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full ${c.color} rounded-full`} style={{ width: `${c.pct}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* VIEW 5B: DAILY COLLECTION REPORT (Searchable Ledger)     */}
          {/* ========================================================= */}
          {activeMenu === 'daily-collection' && (
            <div className="space-y-6">
              {/* Daily Filter & Search Card */}
              <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">Daily Collection Report & Transaction Ledger</h3>
                    <p className="text-xs text-slate-500">Audit trail of student fee receipts, bank deposits, and payment modes</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="inline-flex rounded-lg border border-slate-300 p-0.5 bg-slate-100 text-xs">
                      <button
                        onClick={() => setDailyViewMode('table')}
                        className={`px-3 py-1.5 rounded-md font-bold transition-all cursor-pointer ${
                          dailyViewMode === 'table' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        Transaction Ledger
                      </button>
                      <button
                        onClick={() => setDailyViewMode('visualizer')}
                        className={`px-3 py-1.5 rounded-md font-bold transition-all cursor-pointer ${
                          dailyViewMode === 'visualizer' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        Analytics Engine
                      </button>
                    </div>

                    <a
                      href="./DAILY-COLLECTION-DV-ANALYTICS.xlsx"
                      download="DAILY-COLLECTION-DV-ANALYTICS.xlsx"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export (.xlsx)</span>
                    </a>
                  </div>
                </div>

                {/* Filter Controls Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">Search Student / Counselor</label>
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
                      <input
                        type="text"
                        value={dailySearch}
                        onChange={(e) => { setDailySearch(e.target.value); setDailyPage(1); }}
                        placeholder="Search student, counselor..."
                        className="w-full pl-8 pr-3 py-1.5 border border-slate-300 rounded text-xs focus:outline-none focus:border-teal-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">Month Cycle</label>
                    <select
                      value={dailyMonth}
                      onChange={(e) => { setDailyMonth(e.target.value); setDailyPage(1); }}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs bg-white focus:outline-none"
                    >
                      <option value="ALL">All Time (6,230 Txns)</option>
                      <option value="2026-09">September 2026</option>
                      <option value="2026-08">August 2026</option>
                      <option value="2026-07">July 2026</option>
                      <option value="2026-06">June 2026</option>
                      <option value="2026-05">May 2026</option>
                      <option value="2026-04">April 2026</option>
                      <option value="2026-03">March 2026</option>
                      <option value="2026-02">February 2026</option>
                      <option value="2026-01">January 2026</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">Branch</label>
                    <select
                      value={dailyBranch}
                      onChange={(e) => { setDailyBranch(e.target.value); setDailyPage(1); }}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs bg-white focus:outline-none"
                    >
                      <option value="ALL">All Branches</option>
                      <option value="BBSR">Bhubaneswar (BBSR)</option>
                      <option value="BLR">Bangalore (BLR)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">Course</label>
                    <select
                      value={dailyCourse}
                      onChange={(e) => { setDailyCourse(e.target.value); setDailyPage(1); }}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs bg-white focus:outline-none"
                    >
                      <option value="ALL">All Courses</option>
                      <option value="APIDS">APIDS</option>
                      <option value="APIDA">APIDA</option>
                      <option value="FDE">FDE</option>
                      <option value="MPGA">MPGA</option>
                      <option value="DAS">DAS</option>
                    </select>
                  </div>
                </div>

                {/* Filter Summary Banner */}
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-700">Filtered Records:</span>
                    <span className="font-mono bg-teal-100 text-teal-900 font-bold px-2 py-0.5 rounded">
                      {filteredDailyTransactions.length} of 6,230
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-600">
                      Branch: <span className="font-bold">{dailyBranch}</span> | Course: <span className="font-bold">{dailyCourse}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 font-bold">Total Collection:</span>
                    <span className="font-mono text-sm font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                      ₹{dailyTotalAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              {/* View 1: Transaction Ledger Table */}
              {dailyViewMode === 'table' ? (
                <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-[#2A3F54] text-white uppercase text-[10px] tracking-wider font-semibold">
                        <tr>
                          <th className="py-2.5 px-3 text-center">#</th>
                          <th className="py-2.5 px-3">Date</th>
                          <th className="py-2.5 px-4">Student Name</th>
                          <th className="py-2.5 px-3">Branch</th>
                          <th className="py-2.5 px-3">Course</th>
                          <th className="py-2.5 px-3">Counselor</th>
                          <th className="py-2.5 px-3">Payment Mode</th>
                          <th className="py-2.5 px-4 text-right">Amount (₹)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {paginatedDaily.length === 0 ? (
                          <tr>
                            <td colSpan={8} className="py-8 text-center text-slate-400">
                              No daily collection transactions match the selected filters.
                            </td>
                          </tr>
                        ) : (
                          paginatedDaily.map((txn, index) => (
                            <tr 
                              key={`${txn.student}-${txn.payment_date}-${index}`}
                              className={index % 2 === 0 ? "bg-white hover:bg-teal-50/40" : "bg-slate-50/50 hover:bg-teal-50/40"}
                            >
                              <td className="py-2 px-3 text-center text-slate-400 font-mono text-[11px]">
                                {(dailyPage - 1) * dailyPageSize + index + 1}
                              </td>
                              <td className="py-2 px-3 font-mono text-slate-600 font-medium">
                                {txn.payment_date}
                              </td>
                              <td className="py-2 px-4 font-bold text-slate-800">
                                {txn.student}
                              </td>
                              <td className="py-2 px-3">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  txn.branch === 'BBSR' ? 'bg-blue-100 text-blue-800' : 'bg-indigo-100 text-indigo-800'
                                }`}>
                                  {txn.branch}
                                </span>
                              </td>
                              <td className="py-2 px-3 font-semibold text-slate-700">
                                {txn.course}
                              </td>
                              <td className="py-2 px-3 text-slate-600">
                                {txn.counselor || "Sajid"}
                              </td>
                              <td className="py-2 px-3 text-[11px] text-slate-500 truncate max-w-xs" title={txn.payment_mode}>
                                {txn.payment_mode}
                              </td>
                              <td className="py-2 px-4 text-right font-mono font-bold text-emerald-700">
                                ₹{Number(txn.amount || 0).toLocaleString('en-IN')}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination Footer */}
                  {dailyTotalPages > 1 && (
                    <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-mono">
                        Showing {(dailyPage - 1) * dailyPageSize + 1} to {Math.min(dailyPage * dailyPageSize, filteredDailyTransactions.length)} of {filteredDailyTransactions.length}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          disabled={dailyPage <= 1}
                          onClick={() => setDailyPage(prev => Math.max(1, prev - 1))}
                          className="px-2.5 py-1 border rounded bg-white disabled:opacity-40 font-bold hover:bg-slate-100 cursor-pointer"
                        >
                          Prev
                        </button>
                        <span className="px-2 font-mono text-slate-700 font-bold">
                          {dailyPage} / {dailyTotalPages}
                        </span>
                        <button
                          disabled={dailyPage >= dailyTotalPages}
                          onClick={() => setDailyPage(prev => Math.min(dailyTotalPages, prev + 1))}
                          className="px-2.5 py-1 border rounded bg-white disabled:opacity-40 font-bold hover:bg-slate-100 cursor-pointer"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* View 2: Native Light-Theme Analytics Breakdown */
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* 1. Branch Split */}
                    <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-3">
                      <div className="flex items-center justify-between border-b pb-2">
                        <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Branch Share (Filtered)</h4>
                        <Building className="w-4 h-4 text-slate-400" />
                      </div>
                      <div className="space-y-3 text-xs">
                        <div>
                          <div className="flex justify-between font-bold mb-1">
                            <span>Bhubaneswar (BBSR)</span>
                            <span className="font-mono text-blue-700">₹24,85,12,450</span>
                          </div>
                          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-600 rounded-full" style={{ width: '67%' }}></div>
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono">4,180 Verified Transactions</span>
                        </div>
                        <div>
                          <div className="flex justify-between font-bold mb-1">
                            <span>Bangalore (BLR)</span>
                            <span className="font-mono text-indigo-700">₹12,26,34,271</span>
                          </div>
                          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-600 rounded-full" style={{ width: '33%' }}></div>
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono">2,050 Verified Transactions</span>
                        </div>
                      </div>
                    </div>

                    {/* 2. Top Courses */}
                    <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-3">
                      <div className="flex items-center justify-between border-b pb-2">
                        <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Course Revenue Share</h4>
                        <BookOpen className="w-4 h-4 text-slate-400" />
                      </div>
                      <div className="space-y-2 text-xs">
                        {[
                          { name: "APIDS", amount: "₹18.42 Cr", pct: 49.6, color: "bg-teal-500" },
                          { name: "APIDA", amount: "₹8.91 Cr", pct: 24.0, color: "bg-blue-500" },
                          { name: "FDE", amount: "₹4.87 Cr", pct: 13.1, color: "bg-amber-500" },
                          { name: "MPGA", amount: "₹3.12 Cr", pct: 8.4, color: "bg-purple-500" },
                          { name: "DAS", amount: "₹1.79 Cr", pct: 4.8, color: "bg-rose-500" }
                        ].map(c => (
                          <div key={c.name}>
                            <div className="flex justify-between text-[11px] mb-0.5">
                              <span className="font-medium text-slate-700">{c.name}</span>
                              <span className="font-bold font-mono">{c.amount}</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div className={`h-full ${c.color} rounded-full`} style={{ width: `${c.pct}%` }}></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 3. Payment Methods */}
                    <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-3">
                      <div className="flex items-center justify-between border-b pb-2">
                        <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Top Payment Channels</h4>
                        <DollarSign className="w-4 h-4 text-slate-400" />
                      </div>
                      <div className="space-y-2 text-xs">
                        {[
                          { mode: "DV Analytics ICICI Bank", pct: 64, note: "Direct RTGS / NEFT / IMPS" },
                          { mode: "DV Analytics HDFC Bank", pct: 22, note: "Corporate Account" },
                          { mode: "Cash Deposits", pct: 9, note: "Branch Counters" },
                          { mode: "UPI / QR Payments", pct: 5, note: "Gateway Settlement" }
                        ].map(m => (
                          <div key={m.mode} className="p-2 bg-slate-50 rounded border border-slate-100">
                            <div className="flex justify-between font-bold text-[11px]">
                              <span>{m.mode}</span>
                              <span className="text-teal-700">{m.pct}%</span>
                            </div>
                            <span className="text-[10px] text-slate-400 block">{m.note}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* External Dashboard Launch Card */}
                  <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-xs text-slate-800">Advanced Collection Visualizer Tool</h4>
                      <p className="text-[11px] text-slate-500">Access the standalone interactive analytics workspace with real-time Chart.js engines</p>
                    </div>
                    <a
                      href="./daily-collection.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded font-bold text-xs shadow-xs inline-flex items-center gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Launch In Standalone Window</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* REPORT VIEWS (rpt_*.aspx)                                 */}
          {/* ========================================================= */}
          {activeMenu === 'report-invoice' && (
            <ReportInvoiceView showToast={showToast} />
          )}

          {activeMenu === 'report-student' && (
            <ReportStudentView showToast={showToast} />
          )}

          {activeMenu === 'report-outstanding' && (
            <ReportOutstandingView showToast={showToast} />
          )}

          {activeMenu === 'report-attendance' && (
            <ReportAttendanceView showToast={showToast} />
          )}

          {activeMenu === 'report-assignment' && (
            <ReportAssignmentView showToast={showToast} />
          )}

          {activeMenu === 'report-feedback' && (
            <ReportFeedbackView showToast={showToast} />
          )}

          {activeMenu === 'report-mcq' && (
            <ReportMCQView showToast={showToast} />
          )}

          {activeMenu === 'report-practical' && (
            <ReportPracticalView showToast={showToast} />
          )}

          {activeMenu === 'report-expense' && (
            <ReportExpenseView showToast={showToast} />
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
                <button type="submit" className="mac-btn mac-btn-orange px-5 py-2 text-white rounded-xl font-bold shadow-xs cursor-pointer active:scale-95">Register Student</button>
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
              <button onClick={handleApproveAssignment} className="mac-btn mac-btn-orange px-4 py-2 text-white font-bold rounded-xl shadow-xs cursor-pointer active:scale-95">Approve & Publish Score</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
