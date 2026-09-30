export const studentProfile = {
  name: "SK ABDUL SAJID",
  email: "abdul.sajid@example.com",
  batch: "BATCH 202606",
  courseCode: "APIDS",
  courseName: "Advanced Program in Data Science & AI Skills",
  startDate: "05.06.2026",
  studentId: "DVA-202606-448",
  status: "Active Learner",
  avatar: "./student-avatar.jpg",
  // Live class tracking
  attendancePercent: 60,
  liveAttendedHours: 36,
  liveTotalHours: 60,
  liveAttendedCount: 18,
  liveTotalCount: 30,
  // Recorded video watch time tracking
  totalRecordedHours: 68,
  watchedRecordedHours: 48.5,
  watchedPercent: 71.3,
  completedVideosCount: 14,
  inProgressVideosCount: 4,
  streakDays: 7,
  assignmentsPending: 2,
  assignmentsCompleted: 1,
  courseProgress: 35,
  unreadNotifications: 250,
  catScore: "88%",
  catStatus: "Evaluation Completed"
};

export const weeklyLearningAnalytics = [
  { day: "Mon", liveHours: 2.0, recordedHours: 3.5 },
  { day: "Tue", liveHours: 0.0, recordedHours: 4.2 },
  { day: "Wed", liveHours: 2.5, recordedHours: 1.8 },
  { day: "Thu", liveHours: 0.0, recordedHours: 3.0 },
  { day: "Fri", liveHours: 2.0, recordedHours: 4.0 },
  { day: "Sat", liveHours: 4.0, recordedHours: 2.5 },
  { day: "Sun", liveHours: 3.5, recordedHours: 1.5 },
];

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
      { id: 1, name: "EXCEL BASE AND ADVANCED", sessions: 12, hours: 24, watchedHours: 24, status: "Completed", progress: 100, accessId: 1 },
      { id: 2, name: "EXCEL VBA", sessions: 8, hours: 16, watchedHours: 10.5, status: "In Progress", progress: 65, accessId: 2 },
      { id: 3, name: "SQL SERVER", sessions: 14, hours: 28, watchedHours: 14, status: "In Progress", progress: 50, accessId: 3 },
      { id: 4, name: "SAS BASE AND ADVANCED", sessions: 10, hours: 20, watchedHours: 0, status: "Not Started", progress: 0, accessId: 4 },
      { id: 5, name: "PYTHON PROGRAMMING", sessions: 18, hours: 36, watchedHours: 8, status: "In Progress", progress: 22, accessId: 5 },
      { id: 6, name: "MS ACCESS", sessions: 6, hours: 12, watchedHours: 0, status: "Not Started", progress: 0, accessId: 6 },
      { id: 7, name: "DSA", sessions: 10, hours: 20, watchedHours: 0, status: "Not Started", progress: 0, accessId: 7 }
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
      { id: 8, name: "POWER BI COMPLETE MASTERY", sessions: 14, hours: 28, watchedHours: 2.5, status: "In Progress", progress: 9, accessId: 8 },
      { id: 9, name: "TABLEAU DESKTOP SPECIALIST", sessions: 12, hours: 24, watchedHours: 0, status: "Not Started", progress: 0, accessId: 9 },
      { id: 10, name: "ALTERYX WORKFLOW AUTOMATION", sessions: 8, hours: 16, watchedHours: 0, status: "Not Started", progress: 0, accessId: 10 },
      { id: 11, name: "EXPLORATORY DATA ANALYSIS (EDA)", sessions: 8, hours: 16, watchedHours: 0, status: "Not Started", progress: 0, accessId: 11 }
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
      { id: 12, name: "SUPERVISED & UNSUPERVISED LEARNING", sessions: 16, hours: 32, watchedHours: 0, status: "Not Started", progress: 0, accessId: 12 },
      { id: 13, name: "NATURAL LANGUAGE PROCESSING (NLP)", sessions: 10, hours: 20, watchedHours: 0, status: "Not Started", progress: 0, accessId: 13 },
      { id: 14, name: "DEEP LEARNING WITH PYTORCH", sessions: 12, hours: 24, watchedHours: 0, status: "Not Started", progress: 0, accessId: 14 },
      { id: 15, name: "GENERATIVE AI & PROMPT ENGINEERING", sessions: 8, hours: 16, watchedHours: 0, status: "Not Started", progress: 0, accessId: 15 },
      { id: 16, name: "RAG PIPELINES & LLM AGENTS", sessions: 10, hours: 20, watchedHours: 0, status: "Not Started", progress: 0, accessId: 16 }
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
      { id: 17, name: "AWS CLOUD PRACTITIONER & S3/EC2", sessions: 8, hours: 16, watchedHours: 0, status: "Not Started", progress: 0, accessId: 17 },
      { id: 18, name: "DOCKER CONTAINERIZATION FOR ML", sessions: 6, hours: 12, watchedHours: 0, status: "Not Started", progress: 0, accessId: 18 },
      { id: 19, name: "FASTAPI REST API DEVELOPMENT", sessions: 6, hours: 12, watchedHours: 0, status: "Not Started", progress: 0, accessId: 19 },
      { id: 20, name: "MLOPS PIPELINES & CI/CD", sessions: 8, hours: 16, watchedHours: 0, status: "Not Started", progress: 0, accessId: 20 }
    ]
  }
];

export const excelMasterDriveFolder = "https://drive.google.com/drive/folders/1AYelQA_4SR4NWcKeyWXsx9StEbl4X0fF?usp=sharing";

export const excelSessions = [
  {
    id: "practical-questions",
    title: "Excel Practical Questions",
    isFolder: true,
    driveFolderUrl: "https://drive.google.com/drive/folders/1AYelQA_4SR4NWcKeyWXsx9StEbl4X0fF?usp=sharing",
    items: [
      { id: "p1", title: "Practice Sheet 1: Financial Modeling Scenarios", duration: "File (1.4 MB)", type: "file" },
      { id: "p2", title: "Practice Sheet 2: Multi-Criteria Lookup Cases", duration: "File (890 KB)", type: "file" },
      { id: "p3", title: "Assessment Problem Statement & Solution Guide", duration: "PDF (3.2 MB)", type: "pdf" }
    ]
  },
  {
    id: "session-1",
    title: "B1.SESSION-1",
    fullTitle: "B1.SESSION-1: Advanced Formulae, Dynamic Cell References & Raw Data",
    isFolder: true,
    hasActionButtons: true,
    driveFolderUrl: "https://drive.google.com/drive/folders/1s2bketdfisU7l0tOW3Zglpw5P5tuCeHU",
    vdocipherEmbedUrl: "https://player.vdocipher.com/v2/?otp=20160313versASE3232Tj8PbBLlQCLHDTQp2I37Tn35428tQ5YVO2eMzx1M59M5y&playbackInfo=eyJ2aWRlb0lkIjoiYjVmYzAwZTcxMWI0NDFjMTg2ZjYwMmI2NmQ4NmQ3YTUifQ==",
    videoUrl: "https://player.vdocipher.com/v2/?otp=20160313versASE3232Tj8PbBLlQCLHDTQp2I37Tn35428tQ5YVO2eMzx1M59M5y&playbackInfo=eyJ2aWRlb0lkIjoiYjVmYzAwZTcxMWI0NDFjMTg2ZjYwMmI2NmQ4NmQ3YTUifQ==",
    videoFileName: "SESSION-1.mp4",
    videoSize: "610.1 MB",
    materialFileName: "A2.RAW DATA.zip",
    materialSize: "59.4 MB",
    assignmentFileName: "SESSION-1 ASSIGNMENTS.xlsx",
    assignmentSize: "55 KB",
    duration: "1h 45m",
    watchedMinutes: 105,
    totalMinutes: 105,
    recordingDate: "05.06.2026",
    instructor: "Dr. Sandip Mukherjee",
    summary: "Deep dive into absolute, relative, and mixed references, formula auditing, array formulas, and enterprise retail datasets.",
    items: [
      { 
        id: "s1-1", 
        title: "Excel Session 1 Class 1 Video (Live VdoCipher Stream & SESSION-1.mp4)", 
        duration: "610.1 MB", 
        type: "video",
        embedUrl: "https://player.vdocipher.com/v2/?otp=20160313versASE3232Tj8PbBLlQCLHDTQp2I37Tn35428tQ5YVO2eMzx1M59M5y&playbackInfo=eyJ2aWRlb0lkIjoiYjVmYzAwZTcxMWI0NDFjMTg2ZjYwMmI2NmQ4NmQ3YTUifQ==" 
      },
      { id: "s1-2", title: "A2.RAW DATA.zip (Session Materials & Datasets)", duration: "ZIP (59.4 MB)", type: "file", fileName: "A2.RAW DATA.zip" },
      { id: "s1-3", title: "SESSION-1 ASSIGNMENTS.xlsx (Class Assignment Workbook)", duration: "XLSX (55 KB)", type: "file", fileName: "SESSION-1 ASSIGNMENTS.xlsx" }
    ]
  },
  {
    id: "session-2",
    title: "B2.SESSION-2",
    fullTitle: "B2.SESSION-2: Advanced Lookup Functions (XLOOKUP, INDEX & MATCH) & Outputs",
    isFolder: true,
    hasActionButtons: true,
    driveFolderUrl: "https://drive.google.com/drive/folders/1I3WYsu458O6QP3F0dtYi7pEsIRK7y2iz",
    videoUrl: "https://player.vdocipher.com/v2/?otp=20160313versASE3232Tj8PbBLlQCLHDTQp2I37Tn35428tQ5YVO2eMzx1M59M5y&playbackInfo=eyJ2aWRlb0lkIjoiYjVmYzAwZTcxMWI0NDFjMTg2ZjYwMmI2NmQ4NmQ3YTUifQ==",
    videoFileName: "SESSION-2.mp4",
    videoSize: "580.4 MB",
    materialFileName: "A4.OUTPUT.zip",
    materialSize: "264.4 MB",
    assignmentFileName: "SESSION-2 ASSIGNMENTS.xlsx",
    assignmentSize: "68 KB",
    duration: "2h 10m",
    watchedMinutes: 130,
    totalMinutes: 130,
    recordingDate: "10.06.2026",
    instructor: "Dr. Sandip Mukherjee",
    summary: "Mastering VLOOKUP limitations, dual-directional XLOOKUP, nested INDEX-MATCH, approximate matching for tax brackets and customer segments.",
    items: [
      { id: "s2-1", title: "SESSION-2.mp4 (Class Video Stream)", duration: "580.4 MB", type: "video" },
      { id: "s2-2", title: "A4.OUTPUT.zip (Session Materials & Calculated Outputs)", duration: "ZIP (264.4 MB)", type: "file", fileName: "A4.OUTPUT.zip" },
      { id: "s2-3", title: "SESSION-2 ASSIGNMENTS.xlsx (Lookup Case Studies)", duration: "XLSX (68 KB)", type: "file", fileName: "SESSION-2 ASSIGNMENTS.xlsx" }
    ]
  },
  {
    id: "session-3",
    title: "B3.SESSION-3",
    fullTitle: "B3.SESSION-3: Data Cleaning, Text Functions & Dataset Architecture",
    isFolder: true,
    hasActionButtons: true,
    driveFolderUrl: "https://drive.google.com/drive/folders/13a8ppBbbiswGwsM1-nUOw_esvSadZGSl",
    videoUrl: "https://player.vdocipher.com/v2/?otp=20160313versASE3232Tj8PbBLlQCLHDTQp2I37Tn35428tQ5YVO2eMzx1M59M5y&playbackInfo=eyJ2aWRlb0lkIjoiYjVmYzAwZTcxMWI0NDFjMTg2ZjYwMmI2NmQ4NmQ3YTUifQ==",
    videoFileName: "SESSION-3.mp4",
    videoSize: "540.2 MB",
    materialFileName: "A1.CONTENTS.zip",
    materialSize: "3.9 MB",
    assignmentFileName: "SESSION-3 ASSIGNMENTS.xlsx",
    assignmentSize: "50 KB",
    duration: "1h 55m",
    watchedMinutes: 115,
    totalMinutes: 115,
    recordingDate: "14.06.2026",
    instructor: "Dr. Sandip Mukherjee",
    summary: "REGEX concepts in Excel 365, TEXTSPLIT, TEXTJOIN, TRIM, CLEAN, DATE functions, and dynamic conditional formatting with formula rules.",
    items: [
      { id: "s3-1", title: "SESSION-3.mp4 (Class Video Stream)", duration: "540.2 MB", type: "video" },
      { id: "s3-2", title: "A1.CONTENTS.zip (Session Materials & Clean Datasets)", duration: "ZIP (3.9 MB)", type: "file", fileName: "A1.CONTENTS.zip" },
      { id: "s3-3", title: "SESSION-3 ASSIGNMENTS.xlsx (Data Cleansing Exercises)", duration: "XLSX (50 KB)", type: "file", fileName: "SESSION-3 ASSIGNMENTS.xlsx" }
    ]
  },
  {
    id: "session-4",
    title: "B4.SESSION-4",
    fullTitle: "B4.SESSION-4: Pivot Tables, Slicers & Calculated KPI Fields",
    isFolder: true,
    hasActionButtons: true,
    driveFolderUrl: "https://drive.google.com/drive/folders/1-PH7ApRxSEYKglz96vhPubbLrieEupcb",
    videoUrl: "https://player.vdocipher.com/v2/?otp=20160313versASE3232Tj8PbBLlQCLHDTQp2I37Tn35428tQ5YVO2eMzx1M59M5y&playbackInfo=eyJ2aWRlb0lkIjoiYjVmYzAwZTcxMWI0NDFjMTg2ZjYwMmI2NmQ4NmQ3YTUifQ==",
    videoFileName: "SESSION-4.mp4",
    videoSize: "620.8 MB",
    materialFileName: "A1.CONTENTS.zip",
    materialSize: "24.5 MB",
    assignmentFileName: "SESSION-4 ASSIGNMENTS.xlsx",
    assignmentSize: "75 KB",
    duration: "2h 30m",
    watchedMinutes: 90,
    totalMinutes: 150,
    recordingDate: "17.06.2026",
    instructor: "Dr. Sandip Mukherjee",
    summary: "Pivot tables, custom group groupings, calculated fields, slicers, timeline controls, and building an executive KPI dashboard.",
    items: [
      { id: "s4-1", title: "SESSION-4.mp4 (Class Video Stream)", duration: "620.8 MB", type: "video" },
      { id: "s4-2", title: "A1.CONTENTS.zip (Session Materials & Pivot Templates)", duration: "ZIP (24.5 MB)", type: "file", fileName: "A1.CONTENTS.zip" },
      { id: "s4-3", title: "SESSION-4 ASSIGNMENTS.xlsx (Executive KPI Drilldown)", duration: "XLSX (75 KB)", type: "file", fileName: "SESSION-4 ASSIGNMENTS.xlsx" }
    ]
  },
  {
    id: "session-5",
    title: "B5.SESSION-5",
    fullTitle: "B5.SESSION-5: Power Query ETL, Data Modeling & Transformation",
    isFolder: true,
    hasActionButtons: true,
    driveFolderUrl: "https://drive.google.com/drive/folders/1Hxfml57Jt0uEAidyuhwy3AeLx3fYeRCS",
    videoUrl: "https://player.vdocipher.com/v2/?otp=20160313versASE3232Tj8PbBLlQCLHDTQp2I37Tn35428tQ5YVO2eMzx1M59M5y&playbackInfo=eyJ2aWRlb0lkIjoiYjVmYzAwZTcxMWI0NDFjMTg2ZjYwMmI2NmQ4NmQ3YTUifQ==",
    videoFileName: "SESSION-5.mp4",
    videoSize: "590.5 MB",
    materialFileName: "A1.CONTENTS.zip",
    materialSize: "19.5 MB",
    assignmentFileName: "SESSION-5 ASSIGNMENTS.xlsx",
    assignmentSize: "62 KB",
    duration: "2h 15m",
    watchedMinutes: 135,
    totalMinutes: 135,
    recordingDate: "21.06.2026",
    instructor: "Dr. Sandip Mukherjee",
    summary: "ETL using Power Query, unpivoting tables, multi-file merges, conditional columns, and data modeling best practices.",
    items: [
      { id: "s5-1", title: "SESSION-5.mp4 (Class Video Stream)", duration: "590.5 MB", type: "video" },
      { id: "s5-2", title: "A1.CONTENTS.zip (ETL Queries & Data Models)", duration: "ZIP (19.5 MB)", type: "file", fileName: "A1.CONTENTS.zip" },
      { id: "s5-3", title: "SESSION-5 ASSIGNMENTS.xlsx (Automated Transformation Pipelines)", duration: "XLSX (62 KB)", type: "file", fileName: "SESSION-5 ASSIGNMENTS.xlsx" }
    ]
  },
  {
    id: "session-6",
    title: "B6.SESSION-6",
    fullTitle: "B6.SESSION-6: Executive Dashboards, Macro Intro & Capstone Projects",
    isFolder: true,
    hasActionButtons: true,
    driveFolderUrl: "https://drive.google.com/drive/folders/1hlUEBJH-4CE1l-6jiHGWT32VXAlemT83",
    videoUrl: "https://player.vdocipher.com/v2/?otp=20160313versASE3232Tj8PbBLlQCLHDTQp2I37Tn35428tQ5YVO2eMzx1M59M5y&playbackInfo=eyJ2aWRlb0lkIjoiYjVmYzAwZTcxMWI0NDFjMTg2ZjYwMmI2NmQ4NmQ3YTUifQ==",
    videoFileName: "SESSION-6.mp4",
    videoSize: "680.2 MB",
    materialFileName: "A1.CONTENTS.zip",
    materialSize: "70.6 MB",
    assignmentFileName: "SESSION-6 ASSIGNMENTS.xlsx",
    assignmentSize: "95 KB",
    duration: "2h 45m",
    watchedMinutes: 165,
    totalMinutes: 165,
    recordingDate: "25.06.2026",
    instructor: "Dr. Sandip Mukherjee",
    summary: "Executive interactive dashboards, form controls, dynamic chart ranges, macro introduction, and full capstone project submission.",
    items: [
      { id: "s6-1", title: "SESSION-6.mp4 (Class Video Stream)", duration: "680.2 MB", type: "video" },
      { id: "s6-2", title: "A1.CONTENTS.zip (Capstone Datasets & Macro Workbooks)", duration: "ZIP (70.6 MB)", type: "file", fileName: "A1.CONTENTS.zip" },
      { id: "s6-3", title: "SESSION-6 ASSIGNMENTS.xlsx (Final Excel Capstone Project)", duration: "XLSX (95 KB)", type: "file", fileName: "SESSION-6 ASSIGNMENTS.xlsx" }
    ]
  }
];

export const sqlMasterDriveFolder = "https://drive.google.com/drive/folders/1nR8A_kcFYpYPIYuknhllAzfv43wlz9GI?usp=sharing";

export const sqlSessions = [
  {
    id: "sql-practical-questions",
    title: "SQL Practical Questions & DDL Scripts",
    isFolder: true,
    driveFolderUrl: sqlMasterDriveFolder,
    items: [
      { id: "sp1", title: "E-Commerce Database Schema Setup.sql", duration: "SQL (1.2 MB)", type: "file" },
      { id: "sp2", title: "Complex Joins & Subqueries Hands-on.sql", duration: "SQL (850 KB)", type: "file" },
      { id: "sp3", title: "Window Functions & CTE Assessment.pdf", duration: "PDF (2.8 MB)", type: "pdf" }
    ]
  },
  {
    id: "sql-session-1",
    title: "SESSION-1",
    fullTitle: "SESSION-1: SQL Relational Architecture, Data Types & DDL/DML",
    isFolder: true,
    hasActionButtons: true,
    driveFolderUrl: sqlMasterDriveFolder,
    videoFileName: "SQL_SESSION-1.mp4",
    videoSize: "540.5 MB",
    materialFileName: "SQL_Session1_Materials.zip",
    materialSize: "48.2 MB",
    assignmentFileName: "SQL_SESSION-1_ASSIGNMENTS.sql",
    assignmentSize: "45 KB",
    duration: "2h 00m",
    recordingDate: "12.06.2026",
    instructor: "Dr. Sandip Mukherjee",
    summary: "Relational database concepts, normalization (1NF, 2NF, 3NF), CREATE, ALTER, DROP, INSERT, UPDATE, and primary/foreign keys.",
    items: [
      { id: "sql-1-1", title: "SQL Session-1 Class-1 Video (Relational Architecture & Constraints)", duration: "1h 10m", type: "video" },
      { id: "sql-1-2", title: "SQL Session-1 Class-2 Video (Hands-on DDL & Table Design)", duration: "50 mins", type: "video" },
      { id: "sql-1-3", title: "SQL_Session1_Materials.zip (Scripts, Datasets & Slides)", duration: "ZIP (48.2 MB)", type: "file", fileName: "SQL_Session1_Materials.zip" },
      { id: "sql-1-4", title: "SQL_SESSION-1_ASSIGNMENTS.sql (DDL Exercises)", duration: "SQL (45 KB)", type: "file", fileName: "SQL_SESSION-1_ASSIGNMENTS.sql" }
    ]
  },
  {
    id: "sql-session-2",
    title: "SESSION-2",
    fullTitle: "SESSION-2: Filtering, Aggregations, GROUP BY & HAVING Clauses",
    isFolder: true,
    hasActionButtons: true,
    driveFolderUrl: sqlMasterDriveFolder,
    videoFileName: "SQL_SESSION-2.mp4",
    videoSize: "510.2 MB",
    materialFileName: "SQL_Session2_Materials.zip",
    materialSize: "55.8 MB",
    assignmentFileName: "SQL_SESSION-2_ASSIGNMENTS.sql",
    assignmentSize: "52 KB",
    duration: "2h 15m",
    recordingDate: "15.06.2026",
    instructor: "Dr. Sandip Mukherjee",
    summary: "SELECT queries, WHERE clause filtering, string pattern matching with LIKE, aggregate functions (SUM, AVG, COUNT), and GROUP BY / HAVING.",
    items: [
      { id: "sql-2-1", title: "SQL Session-2 Class-1 Video (Filtering & Aggregations)", duration: "1h 15m", type: "video" },
      { id: "sql-2-2", title: "SQL Session-2 Class-2 Video (GROUP BY & Multi-level Rollups)", duration: "1h 00m", type: "video" },
      { id: "sql-2-3", title: "SQL_Session2_Materials.zip (Sales Seed Data & Schemas)", duration: "ZIP (55.8 MB)", type: "file", fileName: "SQL_Session2_Materials.zip" },
      { id: "sql-2-4", title: "SQL_SESSION-2_ASSIGNMENTS.sql (Aggregations Problem Set)", duration: "SQL (52 KB)", type: "file", fileName: "SQL_SESSION-2_ASSIGNMENTS.sql" }
    ]
  },
  {
    id: "sql-session-3",
    title: "SESSION-3",
    fullTitle: "SESSION-3: Multi-Table Joins (INNER, LEFT, RIGHT, FULL OUTER & CROSS)",
    isFolder: true,
    hasActionButtons: true,
    driveFolderUrl: sqlMasterDriveFolder,
    videoFileName: "SQL_SESSION-3.mp4",
    videoSize: "620.0 MB",
    materialFileName: "SQL_Session3_Materials.zip",
    materialSize: "62.4 MB",
    assignmentFileName: "SQL_SESSION-3_ASSIGNMENTS.sql",
    assignmentSize: "60 KB",
    duration: "2h 30m",
    recordingDate: "19.06.2026",
    instructor: "Dr. Sandip Mukherjee",
    summary: "Mastering complex table joins, handling NULL values in OUTER JOINs, self joins for employee-manager trees, and cross joins for matrix reporting.",
    items: [
      { id: "sql-3-1", title: "SQL Session-3 Class-1 Video (Join Theory & Venn Diagrams)", duration: "1h 15m", type: "video" },
      { id: "sql-3-2", title: "SQL Session-3 Class-2 Video (Enterprise Multi-Join Queries)", duration: "1h 15m", type: "video" },
      { id: "sql-3-3", title: "SQL_Session3_Materials.zip (Join Datasets & Solutions)", duration: "ZIP (62.4 MB)", type: "file", fileName: "SQL_Session3_Materials.zip" },
      { id: "sql-3-4", title: "SQL_SESSION-3_ASSIGNMENTS.sql (Complex Joins Exercise)", duration: "SQL (60 KB)", type: "file", fileName: "SQL_SESSION-3_ASSIGNMENTS.sql" }
    ]
  },
  {
    id: "sql-session-4",
    title: "SESSION-4",
    fullTitle: "SESSION-4: Subqueries, Correlated Subqueries & Common Table Expressions (CTEs)",
    isFolder: true,
    hasActionButtons: true,
    driveFolderUrl: sqlMasterDriveFolder,
    videoFileName: "SQL_SESSION-4.mp4",
    videoSize: "590.8 MB",
    materialFileName: "SQL_Session4_Materials.zip",
    materialSize: "70.1 MB",
    assignmentFileName: "SQL_SESSION-4_ASSIGNMENTS.sql",
    assignmentSize: "65 KB",
    duration: "2h 20m",
    recordingDate: "23.06.2026",
    instructor: "Dr. Sandip Mukherjee",
    summary: "Nested scalar subqueries, EXISTS vs IN, correlated subqueries, non-recursive and recursive CTEs for hierarchical data navigation.",
    items: [
      { id: "sql-4-1", title: "SQL Session-4 Class-1 Video (Subqueries & EXISTS)", duration: "1h 10m", type: "video" },
      { id: "sql-4-2", title: "SQL Session-4 Class-2 Video (CTEs & Recursive Hierarchies)", duration: "1h 10m", type: "video" },
      { id: "sql-4-3", title: "SQL_Session4_Materials.zip (Recursive CTE Case Studies)", duration: "ZIP (70.1 MB)", type: "file", fileName: "SQL_Session4_Materials.zip" },
      { id: "sql-4-4", title: "SQL_SESSION-4_ASSIGNMENTS.sql (CTE Problem Set)", duration: "SQL (65 KB)", type: "file", fileName: "SQL_SESSION-4_ASSIGNMENTS.sql" }
    ]
  },
  {
    id: "sql-session-5",
    title: "SESSION-5",
    fullTitle: "SESSION-5: Advanced Window Functions (ROW_NUMBER, RANK, DENSE_RANK & LEAD/LAG)",
    isFolder: true,
    hasActionButtons: true,
    driveFolderUrl: sqlMasterDriveFolder,
    videoFileName: "SQL_SESSION-5.mp4",
    videoSize: "660.4 MB",
    materialFileName: "SQL_Session5_Materials.zip",
    materialSize: "84.3 MB",
    assignmentFileName: "SQL_SESSION-5_ASSIGNMENTS.sql",
    assignmentSize: "78 KB",
    duration: "2h 45m",
    recordingDate: "27.06.2026",
    instructor: "Dr. Sandip Mukherjee",
    summary: "OVER() clause, PARTITION BY, ORDER BY, running totals, moving averages, top-N per category with DENSE_RANK, and period-over-period difference with LEAD/LAG.",
    items: [
      { id: "sql-5-1", title: "SQL Session-5 Class-1 Video (Ranking & Window Framing)", duration: "1h 20m", type: "video" },
      { id: "sql-5-2", title: "SQL Session-5 Class-2 Video (Running Sums & LEAD/LAG Analytics)", duration: "1h 25m", type: "video" },
      { id: "sql-5-3", title: "SQL_Session5_Materials.zip (Enterprise Window Function Lab)", duration: "ZIP (84.3 MB)", type: "file", fileName: "SQL_Session5_Materials.zip" },
      { id: "sql-5-4", title: "SQL_SESSION-5_ASSIGNMENTS.sql (Final SQL Capstone)", duration: "SQL (78 KB)", type: "file", fileName: "SQL_SESSION-5_ASSIGNMENTS.sql" }
    ]
  }
];

export const pythonMasterDriveFolder = "https://drive.google.com/drive/folders/1x86D2j38HxNJWavtVGRZWTmSdHQ6tnpG?usp=sharing";

export const pythonSessions = [
  {
    id: "py-practical-questions",
    title: "Python Data Science Notebooks & Scripts",
    isFolder: true,
    driveFolderUrl: pythonMasterDriveFolder,
    items: [
      { id: "pyp1", title: "Python Basics & Algorithmic Problem Solving.ipynb", duration: "IPYNB (3.4 MB)", type: "file" },
      { id: "pyp2", title: "NumPy & Pandas Vectorized Operations.ipynb", duration: "IPYNB (4.1 MB)", type: "file" },
      { id: "pyp3", title: "Exploratory Data Analysis (EDA) Best Practices.pdf", duration: "PDF (5.2 MB)", type: "pdf" }
    ]
  },
  {
    id: "py-session-1",
    title: "SESSION-1",
    fullTitle: "SESSION-1: Python Fundamentals, Data Structures & Control Flow",
    isFolder: true,
    hasActionButtons: true,
    driveFolderUrl: pythonMasterDriveFolder,
    videoFileName: "PYTHON_SESSION-1.mp4",
    videoSize: "580.0 MB",
    materialFileName: "Python_Session1_Materials.zip",
    materialSize: "35.2 MB",
    assignmentFileName: "PYTHON_SESSION-1_ASSIGNMENTS.py",
    assignmentSize: "32 KB",
    duration: "2h 00m",
    recordingDate: "02.07.2026",
    instructor: "Dr. Sandip Mukherjee",
    summary: "Variables, primitive data types, lists, dictionaries, tuples, sets, list comprehensions, if-else conditionals, for/while loops, and custom functions.",
    items: [
      { id: "py-1-1", title: "Python Session-1 Class-1 Video (Python Syntax & Data Structures)", duration: "1h 10m", type: "video" },
      { id: "py-1-2", title: "Python Session-1 Class-2 Video (Functions & Comprehensions)", duration: "50 mins", type: "video" },
      { id: "py-1-3", title: "Python_Session1_Materials.zip (Jupyter Notebooks & Code)", duration: "ZIP (35.2 MB)", type: "file", fileName: "Python_Session1_Materials.zip" },
      { id: "py-1-4", title: "PYTHON_SESSION-1_ASSIGNMENTS.py (Syntax Problem Set)", duration: "Python (32 KB)", type: "file", fileName: "PYTHON_SESSION-1_ASSIGNMENTS.py" }
    ]
  },
  {
    id: "py-session-2",
    title: "SESSION-2",
    fullTitle: "SESSION-2: Object-Oriented Programming (OOP) & Exception Handling",
    isFolder: true,
    hasActionButtons: true,
    driveFolderUrl: pythonMasterDriveFolder,
    videoFileName: "PYTHON_SESSION-2.mp4",
    videoSize: "550.4 MB",
    materialFileName: "Python_Session2_Materials.zip",
    materialSize: "40.1 MB",
    assignmentFileName: "PYTHON_SESSION-2_ASSIGNMENTS.py",
    assignmentSize: "40 KB",
    duration: "2h 10m",
    recordingDate: "05.07.2026",
    instructor: "Dr. Sandip Mukherjee",
    summary: "Classes, instances, inheritance, encapsulation, polymorphism, custom dunder methods, try-except-finally error handling, and modular imports.",
    items: [
      { id: "py-2-1", title: "Python Session-2 Class-1 Video (Classes & Inheritance)", duration: "1h 05m", type: "video" },
      { id: "py-2-2", title: "Python Session-2 Class-2 Video (Custom Exceptions & Modules)", duration: "1h 05m", type: "video" },
      { id: "py-2-3", title: "Python_Session2_Materials.zip (OOP Practice Code)", duration: "ZIP (40.1 MB)", type: "file", fileName: "Python_Session2_Materials.zip" },
      { id: "py-2-4", title: "PYTHON_SESSION-2_ASSIGNMENTS.py (OOP Design Exercise)", duration: "Python (40 KB)", type: "file", fileName: "PYTHON_SESSION-2_ASSIGNMENTS.py" }
    ]
  },
  {
    id: "py-session-3",
    title: "SESSION-3",
    fullTitle: "SESSION-3: NumPy Numerical Computing & Vectorized Mathematics",
    isFolder: true,
    hasActionButtons: true,
    driveFolderUrl: pythonMasterDriveFolder,
    videoFileName: "PYTHON_SESSION-3.mp4",
    videoSize: "590.2 MB",
    materialFileName: "Python_Session3_Materials.zip",
    materialSize: "45.0 MB",
    assignmentFileName: "PYTHON_SESSION-3_ASSIGNMENTS.ipynb",
    assignmentSize: "68 KB",
    duration: "2h 15m",
    recordingDate: "09.07.2026",
    instructor: "Dr. Sandip Mukherjee",
    summary: "N-dimensional arrays, matrix multiplications, broadcasting rules, boolean indexing, random sampling, and linear algebra operations.",
    items: [
      { id: "py-3-1", title: "Python Session-3 Class-1 Video (NumPy Arrays & Broadcasting)", duration: "1h 10m", type: "video" },
      { id: "py-3-2", title: "Python Session-3 Class-2 Video (Vectorization & Linear Algebra)", duration: "1h 05m", type: "video" },
      { id: "py-3-3", title: "Python_Session3_Materials.zip (NumPy Labs & Benchmarks)", duration: "ZIP (45.0 MB)", type: "file", fileName: "Python_Session3_Materials.zip" },
      { id: "py-3-4", title: "PYTHON_SESSION-3_ASSIGNMENTS.ipynb (Matrix Operations)", duration: "IPYNB (68 KB)", type: "file", fileName: "PYTHON_SESSION-3_ASSIGNMENTS.ipynb" }
    ]
  },
  {
    id: "py-session-4",
    title: "SESSION-4",
    fullTitle: "SESSION-4: Pandas Data Manipulation & Series / DataFrame Mastery",
    isFolder: true,
    hasActionButtons: true,
    driveFolderUrl: pythonMasterDriveFolder,
    videoFileName: "PYTHON_SESSION-4.mp4",
    videoSize: "640.8 MB",
    materialFileName: "Python_Session4_Materials.zip",
    materialSize: "65.4 MB",
    assignmentFileName: "PYTHON_SESSION-4_ASSIGNMENTS.ipynb",
    assignmentSize: "85 KB",
    duration: "2h 30m",
    recordingDate: "13.07.2026",
    instructor: "Dr. Sandip Mukherjee",
    summary: "Loading CSV/JSON/SQL into DataFrames, loc/iloc indexing, column transformations, filtering, handling missing values, and data type casting.",
    items: [
      { id: "py-4-1", title: "Python Session-4 Class-1 Video (DataFrame Ingestion & loc/iloc)", duration: "1h 15m", type: "video" },
      { id: "py-4-2", title: "Python Session-4 Class-2 Video (Data Cleaning with Pandas)", duration: "1h 15m", type: "video" },
      { id: "py-4-3", title: "Python_Session4_Materials.zip (Dirty Datasets & Solutions)", duration: "ZIP (65.4 MB)", type: "file", fileName: "Python_Session4_Materials.zip" },
      { id: "py-4-4", title: "PYTHON_SESSION-4_ASSIGNMENTS.ipynb (Data Wrangling Lab)", duration: "IPYNB (85 KB)", type: "file", fileName: "PYTHON_SESSION-4_ASSIGNMENTS.ipynb" }
    ]
  },
  {
    id: "py-session-5",
    title: "SESSION-5",
    fullTitle: "SESSION-5: GroupBy Aggregations, Merging, Pivoting & Reshaping",
    isFolder: true,
    hasActionButtons: true,
    driveFolderUrl: pythonMasterDriveFolder,
    videoFileName: "PYTHON_SESSION-5.mp4",
    videoSize: "610.0 MB",
    materialFileName: "Python_Session5_Materials.zip",
    materialSize: "72.0 MB",
    assignmentFileName: "PYTHON_SESSION-5_ASSIGNMENTS.ipynb",
    assignmentSize: "92 KB",
    duration: "2h 25m",
    recordingDate: "17.07.2026",
    instructor: "Dr. Sandip Mukherjee",
    summary: "groupby(), agg(), transform(), merge(), concat(), pivot_table(), melt(), and multi-index hierarchical data manipulation.",
    items: [
      { id: "py-5-1", title: "Python Session-5 Class-1 Video (GroupBy & Transform)", duration: "1h 10m", type: "video" },
      { id: "py-5-2", title: "Python Session-5 Class-2 Video (Merging & Reshaping Data)", duration: "1h 15m", type: "video" },
      { id: "py-5-3", title: "Python_Session5_Materials.zip (Multi-Table Merges)", duration: "ZIP (72.0 MB)", type: "file", fileName: "Python_Session5_Materials.zip" },
      { id: "py-5-4", title: "PYTHON_SESSION-5_ASSIGNMENTS.ipynb (Aggregation Benchmarks)", duration: "IPYNB (92 KB)", type: "file", fileName: "PYTHON_SESSION-5_ASSIGNMENTS.ipynb" }
    ]
  },
  {
    id: "py-session-6",
    title: "SESSION-6",
    fullTitle: "SESSION-6: Data Visualization (Matplotlib, Seaborn & Plotly)",
    isFolder: true,
    hasActionButtons: true,
    driveFolderUrl: pythonMasterDriveFolder,
    videoFileName: "PYTHON_SESSION-6.mp4",
    videoSize: "630.5 MB",
    materialFileName: "Python_Session6_Materials.zip",
    materialSize: "58.0 MB",
    assignmentFileName: "PYTHON_SESSION-6_ASSIGNMENTS.ipynb",
    assignmentSize: "78 KB",
    duration: "2h 30m",
    recordingDate: "21.07.2026",
    instructor: "Dr. Sandip Mukherjee",
    summary: "Line charts, bar plots, distribution histograms, boxplots, heatmaps with correlation matrices, and interactive charts with Plotly.",
    items: [
      { id: "py-6-1", title: "Python Session-6 Class-1 Video (Matplotlib & Seaborn Styling)", duration: "1h 15m", type: "video" },
      { id: "py-6-2", title: "Python Session-6 Class-2 Video (Interactive Plotly Visualizations)", duration: "1h 15m", type: "video" },
      { id: "py-6-3", title: "Python_Session6_Materials.zip (Visualization Templates)", duration: "ZIP (58.0 MB)", type: "file", fileName: "Python_Session6_Materials.zip" },
      { id: "py-6-4", title: "PYTHON_SESSION-6_ASSIGNMENTS.ipynb (Executive Charting Lab)", duration: "IPYNB (78 KB)", type: "file", fileName: "PYTHON_SESSION-6_ASSIGNMENTS.ipynb" }
    ]
  },
  {
    id: "py-session-7",
    title: "SESSION-7",
    fullTitle: "SESSION-7: Exploratory Data Analysis (EDA) & Feature Engineering",
    isFolder: true,
    hasActionButtons: true,
    driveFolderUrl: pythonMasterDriveFolder,
    videoFileName: "PYTHON_SESSION-7.mp4",
    videoSize: "670.0 MB",
    materialFileName: "Python_Session7_Materials.zip",
    materialSize: "80.5 MB",
    assignmentFileName: "PYTHON_SESSION-7_ASSIGNMENTS.ipynb",
    assignmentSize: "110 KB",
    duration: "2h 40m",
    recordingDate: "25.07.2026",
    instructor: "Dr. Sandip Mukherjee",
    summary: "End-to-end real world dataset profiling, outlier detection (IQR, Z-Score), skewness correction, categorical encoding (One-Hot, Ordinal), and feature scaling.",
    items: [
      { id: "py-7-1", title: "Python Session-7 Class-1 Video (EDA Pipeline Architecture)", duration: "1h 20m", type: "video" },
      { id: "py-7-2", title: "Python Session-7 Class-2 Video (Feature Scaling & Encodings)", duration: "1h 20m", type: "video" },
      { id: "py-7-3", title: "Python_Session7_Materials.zip (Real Estate Raw Dataset)", duration: "ZIP (80.5 MB)", type: "file", fileName: "Python_Session7_Materials.zip" },
      { id: "py-7-4", title: "PYTHON_SESSION-7_ASSIGNMENTS.ipynb (Full EDA Notebook)", duration: "IPYNB (110 KB)", type: "file", fileName: "PYTHON_SESSION-7_ASSIGNMENTS.ipynb" }
    ]
  },
  {
    id: "py-session-8",
    title: "SESSION-8",
    fullTitle: "SESSION-8: End-to-End Analytics Capstone & Production Scripting",
    isFolder: true,
    hasActionButtons: true,
    driveFolderUrl: pythonMasterDriveFolder,
    videoFileName: "PYTHON_SESSION-8.mp4",
    videoSize: "720.0 MB",
    materialFileName: "Python_Session8_Materials.zip",
    materialSize: "95.0 MB",
    assignmentFileName: "PYTHON_SESSION-8_CAPSTONE.ipynb",
    assignmentSize: "140 KB",
    duration: "3h 00m",
    recordingDate: "29.07.2026",
    instructor: "Dr. Sandip Mukherjee",
    summary: "Production-grade Python modular scripts, logging, argparse CLI parameters, automated report generation, and final project defense.",
    items: [
      { id: "py-8-1", title: "Python Session-8 Class-1 Video (Production Scripting & Logging)", duration: "1h 30m", type: "video" },
      { id: "py-8-2", title: "Python Session-8 Class-2 Video (Capstone Project Presentation)", duration: "1h 30m", type: "video" },
      { id: "py-8-3", title: "Python_Session8_Materials.zip (Production Capstone Skeleton)", duration: "ZIP (95.0 MB)", type: "file", fileName: "Python_Session8_Materials.zip" },
      { id: "py-8-4", title: "PYTHON_SESSION-8_CAPSTONE.ipynb (Final Python Capstone)", duration: "IPYNB (140 KB)", type: "file", fileName: "PYTHON_SESSION-8_CAPSTONE.ipynb" }
    ]
  }
];

export function getSubjectSessions(subjectName) {
  const lower = (subjectName || '').toLowerCase();
  if (lower.includes('sql')) return sqlSessions;
  if (lower.includes('python')) return pythonSessions;
  return excelSessions;
}

export const assignmentsList = [
  {
    id: "ASN-EX-01",
    title: "SESSION-1 ASSIGNMENTS: Dynamic Cell References & Absolute Formulas",
    subject: "Excel Base and Advanced",
    deadline: "10 Oct 2026",
    totalMarks: 100,
    status: "Pending",
    submissionDate: null,
    score: null,
    feedback: "Downloaded directly from Google Drive repository (B1.SESSION-1).",
    description: "Practice absolute, relative, and mixed references with enterprise retail scenarios. Complete formulas for gross revenue, net margin, and lookup values.",
    starterFile: "SESSION-1 ASSIGNMENTS.xlsx",
    driveUrl: "https://drive.google.com/drive/folders/1s2bketdfisU7l0tOW3Zglpw5P5tuCeHU"
  },
  {
    id: "ASN-EX-02",
    title: "SESSION-2 ASSIGNMENTS: Advanced XLOOKUP & Multi-Criteria Matching",
    subject: "Excel Base and Advanced",
    deadline: "14 Oct 2026",
    totalMarks: 100,
    status: "Pending",
    submissionDate: null,
    score: null,
    feedback: "Downloaded from Google Drive B2.SESSION-2 folder.",
    description: "Implement nested INDEX-MATCH, approximate matching for commission bands, and multi-directional XLOOKUP queries.",
    starterFile: "SESSION-2 ASSIGNMENTS.xlsx",
    driveUrl: "https://drive.google.com/drive/folders/1I3WYsu458O6QP3F0dtYi7pEsIRK7y2iz"
  },
  {
    id: "ASN-EX-03",
    title: "SESSION-3 ASSIGNMENTS: Data Cleansing, Text Functions & Formatting",
    subject: "Excel Base and Advanced",
    deadline: "18 Oct 2026",
    totalMarks: 100,
    status: "Pending",
    submissionDate: null,
    score: null,
    feedback: "Downloaded from Google Drive B3.SESSION-3 folder.",
    description: "Clean dirty unstructured customer logs using TEXTSPLIT, TEXTJOIN, TRIM, CLEAN, and custom conditional formatting rules.",
    starterFile: "SESSION-3 ASSIGNMENTS.xlsx",
    driveUrl: "https://drive.google.com/drive/folders/13a8ppBbbiswGwsM1-nUOw_esvSadZGSl"
  },
  {
    id: "ASN-EX-04",
    title: "SESSION-4 ASSIGNMENTS: Pivot Tables, Calculated Fields & Slicers",
    subject: "Excel Base and Advanced",
    deadline: "22 Oct 2026",
    totalMarks: 100,
    status: "Pending",
    submissionDate: null,
    score: null,
    feedback: "Downloaded from Google Drive B4.SESSION-4 folder.",
    description: "Construct interactive summary pivot tables with timeline slicers, calculated items, and drill-down product hierarchies.",
    starterFile: "SESSION-4 ASSIGNMENTS.xlsx",
    driveUrl: "https://drive.google.com/drive/folders/1-PH7ApRxSEYKglz96vhPubbLrieEupcb"
  },
  {
    id: "ASN-EX-05",
    title: "SESSION-5 ASSIGNMENTS: Power Query Automated ETL Pipelines",
    subject: "Excel Base and Advanced",
    deadline: "26 Oct 2026",
    totalMarks: 100,
    status: "Pending",
    submissionDate: null,
    score: null,
    feedback: "Downloaded from Google Drive B5.SESSION-5 folder.",
    description: "Ingest and merge multi-sheet CSV datasets, unpivot financial tables, and automate monthly recurring pipeline transformations.",
    starterFile: "SESSION-5 ASSIGNMENTS.xlsx",
    driveUrl: "https://drive.google.com/drive/folders/1Hxfml57Jt0uEAidyuhwy3AeLx3fYeRCS"
  },
  {
    id: "ASN-EX-06",
    title: "SESSION-6 ASSIGNMENTS: Capstone Executive Dashboard & Macro Automation",
    subject: "Excel Base and Advanced",
    deadline: "30 Oct 2026",
    totalMarks: 100,
    status: "Pending",
    submissionDate: null,
    score: null,
    feedback: "Downloaded from Google Drive B6.SESSION-6 folder.",
    description: "Build an executive C-suite KPI dashboard with interactive dynamic charting, form buttons, and introductory VBA macro scripts.",
    starterFile: "SESSION-6 ASSIGNMENTS.xlsx",
    driveUrl: "https://drive.google.com/drive/folders/1hlUEBJH-4CE1l-6jiHGWT32VXAlemT83"
  },
  {
    id: "ASN-03",
    title: "E-Commerce Database Schema & Complex Joins",
    subject: "SQL Server",
    deadline: "29 Oct 2026",
    totalMarks: 100,
    status: "Submitted",
    submissionDate: "28 Sep 2026",
    score: 94,
    feedback: "Exceptional indexing optimization and use of Common Table Expressions (CTEs). Well done!",
    description: "Design a 3NF relational schema with Customers, Orders, OrderItems, Products, and Payments. Write window functions for running revenue and 30-day customer churn.",
    starterFile: "Ecommerce_DDL_Seed.sql"
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
    avatar: "./student-avatar.jpg",
    tag: "Python",
    replies: 4,
    upvotes: 8,
    time: "2 days ago",
    answered: false
  }
];

// Candidates Application Test (CAT) - Multiple Choice Questions Bank
export const catMcqQuestionsBank = [
  {
    id: 1,
    subject: "SQL Server",
    q: "Which SQL clause is used to filter records after aggregation with GROUP BY?",
    options: ["WHERE", "HAVING", "ORDER BY", "FILTER"],
    correct: 1,
    explanation: "HAVING is evaluated after GROUP BY aggregation, whereas WHERE filters individual rows before grouping takes place."
  },
  {
    id: 2,
    subject: "Excel Advanced",
    q: "In Excel 365, what does the '#' operator denote when appended to a cell reference like 'B2#'?",
    options: ["Error in dynamic formula", "Spilled range operator", "Absolute row lock", "External workbook reference"],
    correct: 1,
    explanation: "The hash symbol (#) is the Spilled Range Operator in Excel 365, referencing all cells produced by a dynamic array formula starting at B2."
  },
  {
    id: 3,
    subject: "Python Data Science",
    q: "In Python Pandas, which method is the most efficient to remove missing or NaN values from a DataFrame?",
    options: ["df.drop_null()", "df.dropna()", "df.remove_nan()", "df.filter_na()"],
    correct: 1,
    explanation: "df.dropna() drops rows or columns with null values based on the 'axis' and 'how' parameters."
  },
  {
    id: 4,
    subject: "SQL Server",
    q: "What is the key difference between RANK() and DENSE_RANK() when two rows have equal values?",
    options: [
      "RANK() assigns identical ranks and skips subsequent ranks; DENSE_RANK() does not skip",
      "DENSE_RANK() only works on unique values",
      "RANK() sorts ascending while DENSE_RANK() sorts descending",
      "Both produce identical outputs in all SQL standards"
    ],
    correct: 0,
    explanation: "If two rows tie for rank 1, RANK() assigns 1, 1, 3 (skips 2), whereas DENSE_RANK() assigns 1, 1, 2 (no gaps in ranking sequence)."
  },
  {
    id: 5,
    subject: "Machine Learning",
    q: "In Supervised Machine Learning, what problem arises when a model performs exceptionally well on training data but poorly on unseen test data?",
    options: ["High Bias / Underfitting", "High Variance / Overfitting", "Data Drift", "Information Gain Loss"],
    correct: 1,
    explanation: "Overfitting (high variance) occurs when a model learns noise and specific details of the training set rather than generalizable underlying patterns."
  },
  {
    id: 6,
    subject: "Power BI & DAX",
    q: "Which DAX function in Power BI is used to modify the filter context of a calculation?",
    options: ["FILTER()", "CALCULATE()", "RELATED()", "SUMMARIZE()"],
    correct: 1,
    explanation: "CALCULATE() evaluates an expression in a context modified by given filters, making it the most powerful DAX function."
  },
  {
    id: 7,
    subject: "Python Programming",
    q: "What is the time complexity of looking up a key in a standard Python dictionary under average conditions?",
    options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
    correct: 2,
    explanation: "Python dictionaries use hash tables under the hood, yielding O(1) constant average time complexity for key lookups."
  },
  {
    id: 8,
    subject: "Excel Advanced",
    q: "How does XLOOKUP handle search order when searching from bottom-to-top in a column?",
    options: [
      "Set search_mode parameter to -1",
      "Set match_mode parameter to 2",
      "Sort the table descending first",
      "XLOOKUP only supports top-down searches"
    ],
    correct: 0,
    explanation: "XLOOKUP supports reverse searching natively by supplying search_mode = -1 (last-to-first)."
  }
];

// Candidates Application Test (CAT) - Practical Problem Scenarios
export const catPracticalProblems = [
  {
    id: "CAT-PRAC-01",
    title: "Omnichannel Retail Store Sales & Churn Analytics",
    difficulty: "Advanced",
    duration: "60 Mins",
    marks: 100,
    objective: "Analyze a multi-branch retail transactions dataset (25,000 records). Clean inconsistent customer names, compute month-over-month revenue growth using SQL Window Functions or Pandas, and identify top quartile buyers for loyalty targeting.",
    starterDataset: [
      { order_id: "ORD-9011", customer_id: "C-104", branch: "Bengaluru East", product_category: "Electronics", quantity: 2, unit_price: 18500, discount_pct: 0.10, order_date: "2026-05-12" },
      { order_id: "ORD-9012", customer_id: "C-209", branch: "Mumbai Central", product_category: "Home & Decor", quantity: 4, unit_price: 3200, discount_pct: 0.05, order_date: "2026-05-14" },
      { order_id: "ORD-9013", customer_id: "C-104", branch: "Bengaluru East", product_category: "Accessories", quantity: 1, unit_price: 1450, discount_pct: 0.00, order_date: "2026-05-19" },
      { order_id: "ORD-9014", customer_id: "C-338", branch: "Kolkata North", product_category: "Electronics", quantity: 1, unit_price: 45000, discount_pct: 0.15, order_date: "2026-05-22" },
      { order_id: "ORD-9015", customer_id: "C-512", branch: "Delhi NCR", product_category: "Fitness", quantity: 3, unit_price: 5200, discount_pct: 0.08, order_date: "2026-05-25" },
      { order_id: "ORD-9016", customer_id: "C-209", branch: "Mumbai Central", product_category: "Electronics", quantity: 1, unit_price: 22000, discount_pct: 0.12, order_date: "2026-05-28" }
    ],
    starterSql: `-- Write your SQL solution below:
-- Objective 1: Calculate Total Net Revenue per Branch
-- Objective 2: Rank Branches by Net Revenue using DENSE_RANK()

SELECT 
    branch,
    SUM(quantity * unit_price * (1 - discount_pct)) AS net_revenue,
    DENSE_RANK() OVER (ORDER BY SUM(quantity * unit_price * (1 - discount_pct)) DESC) AS revenue_rank
FROM retail_transactions
GROUP BY branch
ORDER BY net_revenue DESC;`,
    starterPython: `# Write your Python Pandas solution below:
import pandas as pd
import numpy as np

# Load transactions
df = pd.DataFrame(starter_data)

# 1. Compute Net Line Total
df['net_amount'] = df['quantity'] * df['unit_price'] * (1 - df['discount_pct'])

# 2. Group by branch and aggregate
branch_summary = df.groupby('branch')['net_amount'].agg(['sum', 'count']).reset_index()
branch_summary.columns = ['Branch', 'Total_Revenue', 'Orders_Count']
branch_summary = branch_summary.sort_values(by='Total_Revenue', ascending=False)

print(branch_summary)`
  }
];

// Candidates Application Test (CAT) - Personal Interview Dossier
export const catInterviewDossier = {
  rubric: [
    { criterion: "Technical & Conceptual Clarity", weight: 35, desc: "Understanding of SQL querying, Python vectorization, Excel data models, and ML fundamentals." },
    { criterion: "Problem Structuring & Logic", weight: 30, desc: "Ability to dissect ambiguous business problems into structured analytics steps." },
    { criterion: "Practical Tool Knowledge", weight: 20, desc: "Hands-on familiarity with SSMS, Power BI, JupyterLab, and Excel 365 formulas." },
    { criterion: "Communication & Confidence", weight: 15, desc: "Concise explanations, articulation of past projects, and viva confidence." }
  ],
  panelists: [
    { name: "Dr. Sandip Mukherjee", role: "Chief Academic Mentor & Data Architect", exp: "18+ Yrs", slots: "Sat 4:00 PM, Sun 11:30 AM" },
    { name: "Prof. Priya Sengupta", role: "Senior Data Science & AI Faculty", exp: "12+ Yrs", slots: "Sat 6:00 PM, Sun 3:00 PM" }
  ],
  interviewQuestions: [
    {
      id: "PI-1",
      topic: "SQL Server & Optimization",
      question: "Explain the difference between Clustered Index and Non-Clustered Index. When would you avoid adding an index?",
      keyPoints: "Clustered index defines physical order of data (only 1 per table); Non-clustered index creates separate pointer leaf pages. Avoid over-indexing columns with frequent INSERT/UPDATE operations or low cardinality (e.g. Boolean flags)."
    },
    {
      id: "PI-2",
      topic: "Python & Machine Learning",
      question: "How do you detect and mitigate multicollinearity in a multiple linear regression model?",
      keyPoints: "Calculate Variance Inflation Factor (VIF > 5 indicates high multicollinearity); inspect correlation heatmaps; drop collinear features or apply dimensionality reduction like PCA or Ridge (L2) Regularization."
    },
    {
      id: "PI-3",
      topic: "Excel & Data Modeling",
      question: "How does the Excel Data Model differ from standard worksheet formulas when dealing with 2 million rows of data?",
      keyPoints: "Excel Data Model uses the xVelocity in-memory columnar database engine (Power Pivot). It bypasses the 1,048,576 row worksheet limit, compresses data significantly, and enables relationships without slow VLOOKUP functions."
    }
  ]
};

// DV Jarvis Assistant Helpline & Coordination Directory
export const dvHelplineNumbers = {
  academicCoordinator: {
    name: "Academic Coordinator Helpline",
    contactPerson: "Rahul Ghosh",
    phone: "+91 98300 12345",
    whatsapp: "+91 98300 12345",
    whatsappLink: "https://wa.me/919830012345?text=Hello%20DV%20Analytics%20Coordinator,%20I%20need%20help%20with%20my%20APIDS%20cohort",
    email: "coordinator@dvanalyticsmds.com",
    timings: "Mon - Sat: 10:00 AM - 7:30 PM IST",
    purpose: "Batch schedule changes, leave applications, live lecture link access, and attendance reconciliation."
  },
  assignmentHelpDesk: {
    name: "Assignment & Project Evaluation Desk",
    contactPerson: "Faculty Support Desk",
    phone: "+91 98300 67890",
    email: "assignments@dvanalyticsmds.com",
    timings: "Mon - Fri: 11:00 AM - 8:00 PM IST",
    purpose: "Doubts in assignment questions, submission errors, workbook rubric clarifications."
  },
  labAndServerAdmin: {
    name: "Lab Infrastructure & Tool Access Admin",
    contactPerson: "System Administrator (Internal IT)",
    phone: "+91 98300 45678",
    email: "labs@dvanalyticsmds.com",
    timings: "Available 24x7 for cloud VM tickets",
    purpose: "JupyterHub logins, SQL Server VM ports, Power BI Pro license allocation, and dataset downloads."
  },
  placementCell: {
    name: "Placement & Mock Interview Cell",
    contactPerson: "Placement Officer",
    phone: "+91 98300 98765",
    email: "careers@dvanalyticsmds.com",
    timings: "Mon - Sat: 10:00 AM - 6:00 PM IST",
    purpose: "CAT evaluation review, resume ATS scoring, and interview scheduling."
  }
};

// DV Tool Connection Guide
export const dvToolConnections = [
  {
    tool: "JupyterLab / Python AI Sandbox",
    status: "Active & Connected",
    endpoint: "https://jupyter.dvanalytics.internal:8888",
    accessType: "Browser Web Client",
    credentialsGuide: "Use your Student ID (DVA-202606-448) as username. One-time OTP sent to registered WhatsApp."
  },
  {
    tool: "Microsoft SQL Server (SSMS / DBeaver)",
    status: "Active & Online",
    endpoint: "sqlserver.dvanalytics.internal,1433",
    database: "DVA_Retail_Analytics_DB",
    accessType: "TCP/IP Connection",
    credentialsGuide: "Authentication: SQL Server Auth. User: student_202606. Pass: DvaStudent@2026#"
  },
  {
    tool: "Power BI Desktop Gateway",
    status: "Configured",
    endpoint: "DirectQuery / Import from DVA_Retail_Analytics_DB",
    accessType: "Desktop Software",
    credentialsGuide: "Open Power BI -> Get Data -> SQL Server -> Enter Server IP above -> Use SQL credentials."
  },
  {
    tool: "Microsoft Excel 365 Data Modeling",
    status: "Linked",
    endpoint: "Power Query / OData feed",
    accessType: "Desktop Software",
    credentialsGuide: "Download dataset workbooks directly from LMS Session resources tab. Compatible with Office 2019/2021/365."
  }
];

// Pre-loaded solutions & guidance for DV Assistant
export const dvAssignmentSolutions = {
  "ASN-01": {
    title: "Retail Sales Performance Analysis (Excel)",
    guideSummary: "This assignment requires dynamic arrays and multi-criteria lookup. Don't use legacy nested IFs when IFS or XLOOKUP can accomplish it in one formula.",
    keyFormulas: [
      "=XLOOKUP(A2 & B2, Products!A:A & Products!B:B, Products!C:C, \"Not Found\", 0)",
      "=SUMIFS(Sales[NetRevenue], Sales[Region], @RegionList, Sales[OrderYear], 2026)",
      "=PERCENTILE.INC(Sales[Margin], 0.90)"
    ],
    stepByStep: [
      "1. Ensure headers in Row 1 have no trailing whitespace (apply TRIM in Power Query if needed).",
      "2. Calculate Gross Revenue = [Quantity] * [Unit Price].",
      "3. Apply Discount = Gross * [Discount %]. Net Revenue = Gross - Discount.",
      "4. Create a dynamic Pivot Table grouping Region by Order Quarter.",
      "5. Add Slicers for 'Product Category' and 'Payment Mode'."
    ]
  },
  "ASN-02": {
    title: "Automated Invoice Generator with VBA Macro",
    guideSummary: "Use a clean subroutine with error handling. Store customer records in a hidden sheet and populate the printable invoice template dynamically.",
    vbaSnippet: `Sub GenerateInvoicePDF()
    Dim wsInvoice As Worksheet, pdfPath As String
    Set wsInvoice = ThisWorkbook.Sheets("Invoice_Template")
    pdfPath = ThisWorkbook.Path & "\\Invoice_" & wsInvoice.Range("C4").Value & ".pdf"
    
    wsInvoice.ExportAsFixedFormat Type:=xlTypePDF, _
        Filename:=pdfPath, _
        Quality:=xlQualityStandard, _
        OpenAfterPublish:=False
    MsgBox "Invoice generated successfully at: " & pdfPath, vbInformation, "DV Automation"
End Sub`,
    stepByStep: [
      "1. Design template layout in sheet 'Invoice_Template'.",
      "2. Write `Sub CalculateTotal()` to iterate rows with Do While loop until empty cell.",
      "3. Hook the button click to `GenerateInvoicePDF` subroutine.",
      "4. Save workbook strictly as Excel Macro-Enabled Workbook (*.xlsm)."
    ]
  },
  "ASN-03": {
    title: "E-Commerce Database Schema & Complex Joins",
    guideSummary: "Leverage Window Functions like SUM(...) OVER (PARTITION BY ... ORDER BY ...) and CTEs for clean maintainable code.",
    sqlSnippet: `WITH CustomerOrderAgg AS (
    SELECT 
        c.customer_id,
        c.customer_name,
        COUNT(o.order_id) AS total_orders,
        SUM(o.order_amount) AS total_spent,
        MAX(o.order_date) AS last_order_date
    FROM Customers c
    JOIN Orders o ON c.customer_id = o.customer_id
    GROUP BY c.customer_id, c.customer_name
)
SELECT 
    customer_id,
    customer_name,
    total_spent,
    DENSE_RANK() OVER (ORDER BY total_spent DESC) AS spending_rank,
    CASE 
        WHEN DATEDIFF(day, last_order_date, GETDATE()) > 90 THEN 'At Risk / Churned'
        ELSE 'Active'
    END AS churn_segment
FROM CustomerOrderAgg;`,
    stepByStep: [
      "1. Verify Primary Keys and Foreign Key constraints across Customers, Orders, and OrderItems.",
      "2. Create non-clustered index on Orders(customer_id, order_date).",
      "3. Execute the CTE query above in SSMS to generate the churn & ranking summary."
    ]
  }
};

// Full Company Knowledge Base from https://www.dvanalyticsmds.com/
export const dvCompanyProfile = {
  companyName: "DV Analytics (DV Data & Analytics Pvt Ltd)",
  founder: "Debendra Das Debadutta",
  director: "Debendra Das Debadutta",
  founderRole: "Founder & Managing Director of DV Analytics",
  founderFact: "Debendra Das Debadutta is the founder and Managing Director of DV Analytics.",
  founderBio: "Debendra Das Debadutta is the founder and Managing Director of DV Analytics (DV Data & Analytics Pvt Ltd). A visionary leader and educator in data analytics and artificial intelligence, he established DV Analytics to provide industry-aligned practical training in Data Science, Machine Learning, Generative AI, and Industrial Analytics, empowering learners across India and internationally to build successful tech careers.",
  website: "https://www.dvanalyticsmds.com/",
  officialEmail: "info@dvanalyticsmds.com",
  phoneNumbers: ["+91-9019030033", "+91-9830012345"],
  locations: [
    {
      city: "Bangalore",
      state: "Karnataka",
      country: "India",
      role: "Head Office & Training Center",
      address: "Bangalore, Karnataka, India"
    },
    {
      city: "Bhubaneswar",
      state: "Odisha",
      country: "India",
      role: "Regional Center & Training Institute",
      address: "Bhubaneswar, Odisha, India"
    },
    {
      city: "Dubai",
      state: "Dubai",
      country: "United Arab Emirates",
      role: "International Office",
      address: "Dubai, UAE"
    },
    {
      city: "Online / Global",
      state: "Worldwide",
      country: "Global",
      role: "Live Online & Flexi Learning",
      address: "https://www.dvanalyticsmds.com"
    }
  ],
  corePrograms: [
    {
      code: "APIDS",
      name: "Advanced Program in Industrial Data Science with AI Deployment",
      duration: "6-8 Months",
      tools: ["Python", "SQL Server", "Excel AI", "Power BI", "Tableau", "SAS", "PySpark", "Machine Learning", "Deep Learning", "Generative AI", "Agentic AI", "MLOps", "AWS/Azure"]
    },
    {
      code: "APIDA",
      name: "Advanced Program in Industrial Data Science with Gen AI",
      duration: "6 Months",
      tools: ["Python", "SQL", "Excel AI", "Power BI", "Tableau", "Statistics", "Machine Learning", "Generative AI", "RAG", "LLMs"]
    },
    {
      code: "DAS",
      name: "Data Analytics Specialist",
      duration: "4-5 Months",
      tools: ["SQL Server", "Excel AI", "Python", "Power BI", "Tableau", "Business Analytics", "Interactive Dashboards"]
    },
    {
      code: "APCF",
      name: "AI Integrated Advanced Program in Cybersecurity & Forensics",
      duration: "6 Months",
      tools: ["Networking", "Linux", "Ethical Hacking", "SOC", "SIEM", "Splunk", "Digital Forensics", "Cloud Security"]
    },
    {
      code: "FDE",
      name: "AI Forward Deployment Engineer",
      duration: "6 Months",
      tools: ["Python", "APIs", "RAG", "AI Agents", "LangChain", "Cloud Deployment", "Enterprise Integrations"]
    },
    {
      code: "FLP",
      name: "Flexi Learning Program in Data Science & AI",
      duration: "Self-Paced with Mentorship",
      tools: ["Python", "SQL", "Machine Learning", "AI Projects"]
    }
  ],
  placementAssistance: {
    guarantee: "100% Placement Assistance with 1-on-1 Mentorship",
    hiringPartnersCount: "100+ Global & Indian Corporate Partners",
    services: [
      "1-on-1 Resume Optimization and ATS Formatting",
      "GitHub Portfolio and Project Demonstration Reviews",
      "Technical Mock Interviews (SQL, Python, ML, GenAI)",
      "HR Viva & Salary Negotiation Coaching",
      "Direct Referrals to Hiring Partners in Bangalore, Bhubaneswar, and Nationwide"
    ]
  },
  industryProjects: [
    "Banking & Finance: Credit Risk Application Scorecard, ECL, AML, Fraud Detection",
    "Telecom: Customer Churn Prediction, Network Faults, Lifetime Value",
    "E-Commerce: Recommendation Engine, Dynamic Pricing, Churn, RAG Shopping Assistant",
    "Healthcare: Disease Risk Prediction, Medical Image Analysis, Clinical Decision Support",
    "Manufacturing: Predictive Maintenance, Defect Detection with Computer Vision, Digital Twins",
    "Pharmaceuticals: Drug Discovery Analytics, Pharmacovigilance AI Automation"
  ]
};

