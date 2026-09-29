export const studentProfile = {
  name: "SK ABDUL SAJID",
  email: "abdul.sajid@example.com",
  batch: "BATCH 202606",
  courseCode: "APIDS",
  courseName: "Advanced Program in Data Science & AI Skills",
  startDate: "05.06.2026",
  studentId: "DVA-202606-448",
  status: "Active Learner",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  attendancePercent: 60,
  assignmentsPending: 100,
  courseProgress: 15,
  unreadNotifications: 250,
};

export const courseCategories = [
  {
    id: "dbms-programming",
    title: "DBMS AND PROGRAMMING",
    color: "teal",
    accentColor: "#0d9488",
    bgGradient: "from-teal-500 to-emerald-600",
    badgeBg: "bg-teal-50 text-teal-700 border-teal-200",
    icon: "database",
    totalModules: 7,
    completedModules: 1,
    subjects: [
      { id: 1, name: "EXCEL BASE AND ADVANCED", sessions: 12, hours: 24, status: "In Progress", progress: 35, accessId: 1 },
      { id: 2, name: "EXCEL VBA", sessions: 8, hours: 16, status: "Not Started", progress: 0, accessId: 2 },
      { id: 3, name: "SQL SERVER", sessions: 14, hours: 28, status: "Not Started", progress: 0, accessId: 3 },
      { id: 4, name: "SAS BASE AND ADVANCED", sessions: 10, hours: 20, status: "Not Started", progress: 0, accessId: 4 },
      { id: 5, name: "PYTHON PROGRAMMING", sessions: 18, hours: 36, status: "Not Started", progress: 0, accessId: 5 },
      { id: 6, name: "MS ACCESS", sessions: 6, hours: 12, status: "Not Started", progress: 0, accessId: 6 },
      { id: 7, name: "DSA", sessions: 10, hours: 20, status: "Not Started", progress: 0, accessId: 7 }
    ]
  },
  {
    id: "data-analysis-visualization",
    title: "DATA ANALYSIS & VISUALIZATION",
    color: "amber",
    accentColor: "#f59e0b",
    bgGradient: "from-amber-500 to-orange-500",
    badgeBg: "bg-amber-50 text-amber-700 border-amber-200",
    icon: "bar-chart-3",
    totalModules: 4,
    completedModules: 0,
    subjects: [
      { id: 8, name: "POWER BI COMPLETE MASTERY", sessions: 14, hours: 28, status: "Not Started", progress: 0, accessId: 8 },
      { id: 9, name: "TABLEAU DESKTOP SPECIALIST", sessions: 12, hours: 24, status: "Not Started", progress: 0, accessId: 9 },
      { id: 10, name: "ALTERYX WORKFLOW AUTOMATION", sessions: 8, hours: 16, status: "Not Started", progress: 0, accessId: 10 },
      { id: 11, name: "EXPLORATORY DATA ANALYSIS (EDA)", sessions: 8, hours: 16, status: "Not Started", progress: 0, accessId: 11 }
    ]
  },
  {
    id: "machine-learning-gen-ai",
    title: "MACHINE LEARNING & GEN AI",
    color: "rose",
    accentColor: "#f43f5e",
    bgGradient: "from-rose-500 to-red-600",
    badgeBg: "bg-rose-50 text-rose-700 border-rose-200",
    icon: "brain-circuit",
    totalModules: 5,
    completedModules: 0,
    subjects: [
      { id: 12, name: "SUPERVISED & UNSUPERVISED LEARNING", sessions: 16, hours: 32, status: "Not Started", progress: 0, accessId: 12 },
      { id: 13, name: "NATURAL LANGUAGE PROCESSING (NLP)", sessions: 10, hours: 20, status: "Not Started", progress: 0, accessId: 13 },
      { id: 14, name: "DEEP LEARNING WITH PYTORCH", sessions: 12, hours: 24, status: "Not Started", progress: 0, accessId: 14 },
      { id: 15, name: "GENERATIVE AI & PROMPT ENGINEERING", sessions: 8, hours: 16, status: "Not Started", progress: 0, accessId: 15 },
      { id: 16, name: "RAG PIPELINES & LLM AGENTS", sessions: 10, hours: 20, status: "Not Started", progress: 0, accessId: 16 }
    ]
  },
  {
    id: "cloud-computing-deployment",
    title: "CLOUD COMPUTING AND AI DEPLOYMENT",
    color: "blue",
    accentColor: "#2563eb",
    bgGradient: "from-blue-600 to-indigo-600",
    badgeBg: "bg-blue-50 text-blue-700 border-blue-200",
    icon: "cloud",
    totalModules: 4,
    completedModules: 0,
    subjects: [
      { id: 17, name: "AWS CLOUD PRACTITIONER & S3/EC2", sessions: 8, hours: 16, status: "Not Started", progress: 0, accessId: 17 },
      { id: 18, name: "DOCKER CONTAINERIZATION FOR ML", sessions: 6, hours: 12, status: "Not Started", progress: 0, accessId: 18 },
      { id: 19, name: "FASTAPI REST API DEVELOPMENT", sessions: 6, hours: 12, status: "Not Started", progress: 0, accessId: 19 },
      { id: 20, name: "MLOPS PIPELINES & CI/CD", sessions: 8, hours: 16, status: "Not Started", progress: 0, accessId: 20 }
    ]
  }
];

export const excelSessions = [
  {
    id: "practical-questions",
    title: "Excel Practical Questions",
    isFolder: true,
    items: [
      { id: "p1", title: "Practice Sheet 1: Financial Modeling Scenarios", duration: "File (1.4 MB)", type: "file" },
      { id: "p2", title: "Practice Sheet 2: Multi-Criteria Lookup Cases", duration: "File (890 KB)", type: "file" },
      { id: "p3", title: "Assessment Problem Statement & Solution Guide", duration: "PDF (3.2 MB)", type: "pdf" }
    ]
  },
  {
    id: "session-1",
    title: "Session 1: Advanced Formulae & Dynamic Cell References",
    isFolder: true,
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    duration: "1h 45m",
    recordingDate: "07.06.2026",
    instructor: "Dr. Sandip Mukherjee",
    summary: "Deep dive into absolute, relative, and mixed references, formula auditing, array formulas, and core best practices for enterprise datasets.",
    items: [
      { id: "s1-1", title: "Session Recording (Part 1 - Core Concepts)", duration: "48 mins", type: "video" },
      { id: "s1-2", title: "Session Recording (Part 2 - Live Hands-on)", duration: "57 mins", type: "video" },
      { id: "s1-3", title: "Class Slide Deck (Formulas.pptx)", duration: "PDF (4.8 MB)", type: "pdf" },
      { id: "s1-4", title: "Class Exercise Workbook - Raw Data", duration: "XLSX (2.1 MB)", type: "file" }
    ]
  },
  {
    id: "session-2",
    title: "Session 2: Advanced Lookup Functions (XLOOKUP, INDEX & MATCH)",
    isFolder: true,
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    duration: "2h 10m",
    recordingDate: "10.06.2026",
    instructor: "Dr. Sandip Mukherjee",
    summary: "Mastering VLOOKUP limitations, dual-directional XLOOKUP, nested INDEX-MATCH, approximate matching for tax brackets and customer segments.",
    items: [
      { id: "s2-1", title: "Session Recording: Deep Dive XLOOKUP", duration: "1h 15m", type: "video" },
      { id: "s2-2", title: "Two-way Matrix Lookup Workshop", duration: "55 mins", type: "video" },
      { id: "s2-3", title: "Exercise Solutions & Edge Cases", duration: "XLSX (1.8 MB)", type: "file" }
    ]
  },
  {
    id: "session-3",
    title: "Session 3: Data Cleaning, Text Manipulations & Formatting",
    isFolder: true,
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    duration: "1h 55m",
    recordingDate: "14.06.2026",
    instructor: "Dr. Sandip Mukherjee",
    summary: "REGEX concepts in Excel 365, TEXTSPLIT, TEXTJOIN, TRIM, CLEAN, DATE functions, and dynamic conditional formatting with formula rules.",
    items: [
      { id: "s3-1", title: "Full Session Recording", duration: "1h 55m", type: "video" },
      { id: "s3-2", title: "Dirty Retail Dataset Practice File", duration: "CSV (5.4 MB)", type: "file" }
    ]
  },
  {
    id: "session-4",
    title: "Session 4: Pivot Tables, Power Query & Business Dashboards",
    isFolder: true,
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    duration: "2h 30m",
    recordingDate: "17.06.2026",
    instructor: "Dr. Sandip Mukherjee",
    summary: "ETL using Power Query, unpivoting tables, calculated fields, slicers, timeline controls, and building an executive KPI dashboard.",
    items: [
      { id: "s4-1", title: "Power Query ETL Walkthrough", duration: "1h 10m", type: "video" },
      { id: "s4-2", title: "Dashboard Architecture & KPI Cards", duration: "1h 20m", type: "video" },
      { id: "s4-3", title: "Completed Executive Dashboard Template", duration: "XLSX (8.2 MB)", type: "file" }
    ]
  }
];

export const assignmentsList = [
  {
    id: "ASN-01",
    title: "Retail Sales Performance Analysis (Excel)",
    subject: "Excel Base and Advanced",
    deadline: "15 Oct 2026",
    totalMarks: 100,
    status: "Pending",
    submissionDate: null,
    score: null,
    feedback: "Awaiting submission before cutoff date."
  },
  {
    id: "ASN-02",
    title: "Automated Invoice Generator with VBA Macro",
    subject: "Excel VBA",
    deadline: "22 Oct 2026",
    totalMarks: 100,
    status: "Pending",
    submissionDate: null,
    score: null,
    feedback: "Upload .xlsm file with documented subroutines."
  },
  {
    id: "ASN-03",
    title: "E-Commerce Database Schema & Complex Joins",
    subject: "SQL Server",
    deadline: "29 Oct 2026",
    totalMarks: 100,
    status: "Pending",
    submissionDate: null,
    score: null,
    feedback: "Submit query scripts and ER diagram export."
  }
];

export const applicationTests = [
  {
    id: "TEST-101",
    title: "APIDS Module 1: Comprehensive Aptitude & SQL Assessment",
    duration: "60 Mins",
    totalQuestions: 40,
    passingScore: 70,
    deadline: "12 Oct 2026",
    status: "Available",
    score: null
  },
  {
    id: "TEST-102",
    title: "Python Data Structures & Algorithm Benchmark",
    duration: "90 Mins",
    totalQuestions: 25,
    passingScore: 75,
    deadline: "25 Oct 2026",
    status: "Locked",
    score: null
  },
  {
    id: "TEST-103",
    title: "Diagnostic Baseline Assessment (Onboarding)",
    duration: "45 Mins",
    totalQuestions: 30,
    passingScore: 50,
    deadline: "Completed",
    status: "Completed",
    score: "88%"
  }
];

export const notificationsList = [
  {
    id: 1,
    title: "New Session Uploaded",
    message: "Session 4: Pivot Tables & Power Query is now available for playback.",
    time: "10 mins ago",
    unread: true,
    type: "session"
  },
  {
    id: 2,
    title: "Upcoming Live Doubt Clearing Session",
    message: "Mentor doubt clearing scheduled for Saturday at 6:00 PM IST.",
    time: "2 hours ago",
    unread: true,
    type: "schedule"
  },
  {
    id: 3,
    title: "Assignment Due Notice",
    message: "Assignment 1 (Retail Sales Performance) is due in 3 days.",
    time: "1 day ago",
    unread: true,
    type: "assignment"
  },
  {
    id: 4,
    title: "Resume Review Slot Open",
    message: "DV Placement cell opened 15 new slots for mock ATS evaluation.",
    time: "2 days ago",
    unread: false,
    type: "placement"
  }
];

export const forumTopics = [
  {
    id: "F-1",
    title: "How to handle multi-criteria XLOOKUP when duplicate rows exist?",
    author: "Rahul Sharma",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
    tag: "Excel",
    replies: 7,
    upvotes: 14,
    time: "3 hours ago",
    answered: true
  },
  {
    id: "F-2",
    title: "SQL Window Functions: Difference between RANK() and DENSE_RANK()",
    author: "Pooja Verma",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    tag: "SQL Server",
    replies: 12,
    upvotes: 29,
    time: "1 day ago",
    answered: true
  },
  {
    id: "F-3",
    title: "Virtual environment setup in VSCode for Python Data Science",
    author: "SK Abdul Sajid",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    tag: "Python",
    replies: 4,
    upvotes: 8,
    time: "2 days ago",
    answered: false
  }
];
