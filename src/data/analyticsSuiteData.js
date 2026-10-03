// ============================================================================
// DV ANALYTICS - ENTERPRISE ANALYTICS DASHBOARD SUITE DATA MODEL
// Source of truth for Academic, Student, Placement, Executive & Collection Insights
// ============================================================================

export const currencyINR = (val) => {
  if (val === undefined || val === null) return "₹0";
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(val);
};

export const formatLakhsCr = (val) => {
  if (!val) return "₹0";
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`;
  return currencyINR(val);
};

// ============================================================================
// 1. ENHANCED DAILY & MONTHLY COLLECTION INSIGHTS DATA
// ============================================================================
export const enhancedCollectionInsights = {
  daily: {
    date: "24 Oct 2026",
    dayName: "Saturday",
    target: 241935,
    actual: 284500,
    achievementPct: 117.6,
    surplus: 42565,
    remainingTarget: 0,
    status: "TARGET_ACHIEVED",
    prevComparableDay: {
      date: "17 Oct 2026 (Last Saturday)",
      amount: 260000,
      variancePct: 9.42,
      varianceAmount: 24500
    },
    paymentsDueToday: {
      count: 18,
      totalAmount: 490000,
      receivedCount: 11,
      receivedAmount: 284500,
      pendingCount: 7,
      pendingAmount: 205500
    },
    ptpCommitments: {
      totalDueToday: 12,
      honoredCount: 8,
      honoredAmount: 195000,
      pendingCount: 3,
      pendingAmount: 64500,
      missedCount: 1,
      missedAmount: 25000,
      adherenceRate: 88.9
    },
    collectorLeaderboard: [
      { id: 1, name: "Rakesh Jena", target: 80000, collected: 95000, calls: 18, ptpHonored: "4/4", rating: 4.9, badge: "Top Collector" },
      { id: 2, name: "Sneha Pattnaik", target: 70000, collected: 82000, calls: 15, ptpHonored: "3/3", rating: 4.8, badge: "High Velocity" },
      { id: 3, name: "Manoj Kumar", target: 60000, collected: 64000, calls: 12, ptpHonored: "2/3", rating: 4.6, badge: "Consistent" },
      { id: 4, name: "Priya Das", target: 45000, collected: 43500, calls: 11, ptpHonored: "2/2", rating: 4.5, badge: "Follow-up Pro" }
    ],
    priorityActionAccounts: [
      { id: "ACT-108", student: "Subhashree Pradhan", phone: "+91 98610 88214", batch: "BATCH 202606", course: "APIDS", dueAmount: 30000, overdueDays: 14, ptpStatus: "PTP Today (4 PM)", risk: "Medium", telecaller: "Rakesh Jena", action: "Call to confirm IMPS transaction receipt" },
      { id: "ACT-142", student: "Vikramaditya Roy", phone: "+91 94371 55219", batch: "BATCH 202608", course: "FDE", dueAmount: 25000, overdueDays: 22, ptpStatus: "Missed Yesterday", risk: "High", telecaller: "Sneha Pattnaik", action: "Immediate escalation & installment split proposal" },
      { id: "ACT-098", student: "Alok Ranjan Jena", phone: "+91 82490 11478", batch: "BATCH 202604", course: "APIDA", dueAmount: 35000, overdueDays: 8, ptpStatus: "PTP Today (6 PM)", risk: "Low", telecaller: "Manoj Kumar", action: "Send payment gateway UPI link via SMS/WhatsApp" },
      { id: "ACT-167", student: "Ananya Tripathy", phone: "+91 70081 33621", batch: "BATCH 202609", course: "MPGA", dueAmount: 20000, overdueDays: 5, ptpStatus: "First Reminder", risk: "Low", telecaller: "Priya Das", action: "Verify scholarship deduction and collect remaining" },
      { id: "ACT-204", student: "Deepak Satapathy", phone: "+91 99380 44102", batch: "BATCH 202606", course: "APIDS", dueAmount: 40000, overdueDays: 31, ptpStatus: "Critical Overdue", risk: "Critical", telecaller: "Rakesh Jena", action: "Managerial conference call & batch seat hold notice" }
    ]
  },
  monthly: {
    month: "October 2026",
    monthlyTarget: 7500000,
    mtdCollection: 5840700,
    achievementPct: 77.87,
    remainingGap: 1659300,
    workingDaysTotal: 26,
    workingDaysElapsed: 20,
    workingDaysRemaining: 6,
    requiredDailyRunRate: 276550,
    currentActualDailyRunRate: 292035,
    projectedMonthEnd: 8240700,
    projectionCalculationBasis: "Current run-rate of ₹2,92,035/day × 6 remaining working days + ₹5,84,070 mid-month corporate fee commitments.",
    expectedTargetAchievementPct: 109.87,
    priorMonthElapsedComparison: {
      priorMonthName: "September 2026 (Elapsed 20 Days)",
      priorAmount: 5510000,
      momGrowthPct: 6.0,
      momGrowthAmount: 330700
    },
    overdueAgingBuckets: [
      { bucket: "1 - 15 Days", totalAmount: 1850000, recoveryRate: 92.4, status: "Healthy Flow", color: "#10b981" },
      { bucket: "16 - 30 Days", totalAmount: 1120000, recoveryRate: 78.6, status: "Active Pursuit", color: "#f59e0b" },
      { bucket: "31 - 60 Days", totalAmount: 680000, recoveryRate: 54.2, status: "Elevated Risk", color: "#f97316" },
      { bucket: "60+ Days", totalAmount: 340000, recoveryRate: 28.5, status: "Legal / Escalated", color: "#ef4444" }
    ],
    collectionByCourse: [
      { course: "APIDS", target: 3600000, collected: 2950000, pct: 81.9, share: 50.5 },
      { course: "APIDA", target: 1800000, collected: 1420000, pct: 78.8, share: 24.3 },
      { course: "FDE", target: 1100000, collected: 810700, pct: 73.7, share: 13.9 },
      { course: "MPGA", target: 650000, collected: 430000, pct: 66.2, share: 7.4 },
      { course: "DAS", target: 350000, collected: 230000, pct: 65.7, share: 3.9 }
    ],
    priorityClosingActions: [
      "Follow up on 14 corporate sponsored batch candidates (₹4.2L potential)",
      "Activate early renewal fee incentive for BATCH 202606 graduating to Capstone",
      "Assign top 2 accounts executives to Bangalore cohort installments",
      "Implement zero-cost EMI transition for 6 students with >30 days delay"
    ]
  }
};

// ============================================================================
// 2. ACADEMIC ANALYTICS DATA MODEL
// ============================================================================
export const academicAnalyticsData = {
  mentorDashboard: {
    kpis: {
      totalActiveMentors: 12,
      classesConducted: 486,
      mentorAttendancePct: 98.4,
      studentFeedbackScore: 4.84, // Out of 5.0
      averageRating: 4.88,
      doubtResolutionTime: "28 mins",
      pendingAssignmentReviews: 14,
      mentorUtilizationPct: 88.6
    },
    mentorsList: [
      {
        id: "MNT-01",
        name: "DEBENDRA DEBADUTTA DAS",
        role: "Founder & Chief Data Scientist",
        specialization: "APIDS, Machine Learning, Python, SAS",
        classesConducted: 168,
        attendancePct: 100,
        studentRating: 4.96,
        sampleSize: 340,
        doubtTurnaround: "18 mins",
        pendingReviews: 2,
        utilizationPct: 96,
        status: "Elite",
        avatar: "./student-avatar.jpg",
        trend: "+0.04"
      },
      {
        id: "MNT-02",
        name: "GANESH K KUMAR",
        role: "Lead Analytics Consultant",
        specialization: "SQL Server, Power BI, Advanced Modeling",
        classesConducted: 94,
        attendancePct: 98.8,
        studentRating: 4.90,
        sampleSize: 215,
        doubtTurnaround: "24 mins",
        pendingReviews: 3,
        utilizationPct: 91,
        status: "Outstanding",
        avatar: "./student-avatar.jpg",
        trend: "+0.08"
      },
      {
        id: "MNT-03",
        name: "LAXMI NR",
        role: "Principal Big Data Architect",
        specialization: "Big Data Engineering, Hadoop, PySpark",
        classesConducted: 78,
        attendancePct: 98.2,
        studentRating: 4.85,
        sampleSize: 180,
        doubtTurnaround: "32 mins",
        pendingReviews: 4,
        utilizationPct: 87,
        status: "Outstanding",
        avatar: "./student-avatar.jpg",
        trend: "+0.02"
      },
      {
        id: "MNT-04",
        name: "AYUSHKANT PANDA",
        role: "Senior Automation Specialist",
        specialization: "Excel Base/Advanced, VBA, Macros",
        classesConducted: 62,
        attendancePct: 98.0,
        studentRating: 4.82,
        sampleSize: 160,
        doubtTurnaround: "22 mins",
        pendingReviews: 1,
        utilizationPct: 85,
        status: "High Performing",
        avatar: "./student-avatar.jpg",
        trend: "+0.05"
      },
      {
        id: "MNT-05",
        name: "UNMESH PANIGRAHI",
        role: "Statistical Modeler",
        specialization: "SAS Base & Advanced, Clinical Analytics",
        classesConducted: 45,
        attendancePct: 97.4,
        studentRating: 4.78,
        sampleSize: 125,
        doubtTurnaround: "36 mins",
        pendingReviews: 2,
        utilizationPct: 82,
        status: "Good",
        avatar: "./student-avatar.jpg",
        trend: "-0.02"
      },
      {
        id: "MNT-06",
        name: "GANESH RATH",
        role: "BI & Visualization Lead",
        specialization: "Tableau, Alteryx, Storytelling with Data",
        classesConducted: 39,
        attendancePct: 98.5,
        studentRating: 4.86,
        sampleSize: 110,
        doubtTurnaround: "26 mins",
        pendingReviews: 2,
        utilizationPct: 84,
        status: "Outstanding",
        avatar: "./student-avatar.jpg",
        trend: "+0.06"
      }
    ],
    insights: {
      bestPerforming: "Debendra Debadutta Das (4.96/5.0 with 340 ratings)",
      mostEngaged: "Ganesh K Kumar (94 classes, 98.8% attendance, 24m doubt turnaround)",
      requiringAttention: "Delayed Evaluation Alert: Laxmi NR has 4 pending PySpark lab reviews >48 hrs",
      rankingBasis: "Weighted score: 45% Student Feedback, 25% Session Attendance, 15% Review Turnaround, 15% Class Completion."
    }
  },

  classMonitoring: {
    kpis: {
      classesScheduledToday: 14,
      classesConductedToday: 11,
      classesCancelled: 0,
      classesRescheduled: 1,
      averageAttendancePct: 92.4,
      liveSessionCompletionPct: 97.8
    },
    liveSchedule: [
      { id: "CLS-101", batch: "BATCH 202606", subject: "PYTHON FOR DATA SCIENCE", topic: "Object-Oriented Programming & Custom Iterators", mentor: "Debendra Das", time: "09:00 AM - 11:30 AM", attendance: "42/45 (93%)", status: "Completed", streamQuality: "1080p HD Stable" },
      { id: "CLS-102", batch: "BATCH 202608", subject: "SQL SERVER ENTERPRISE", topic: "Window Functions & Common Table Expressions (CTEs)", mentor: "Ganesh K Kumar", time: "11:30 AM - 01:30 PM", attendance: "36/38 (95%)", status: "Completed", streamQuality: "1080p HD Stable" },
      { id: "CLS-103", batch: "BATCH 202604", subject: "EXCEL VBA & AUTOMATION", topic: "UserForms, Events & Dynamic Ribbon Integration", mentor: "Ayushkant Panda", time: "02:00 PM - 04:00 PM", attendance: "28/30 (93%)", status: "Completed", streamQuality: "1080p HD Stable" },
      { id: "CLS-104", batch: "BATCH 202609", subject: "SAS BASE & ADVANCED", topic: "PROC SQL Joins vs Data Step Merges", mentor: "Unmesh Panigrahi", time: "04:30 PM - 06:30 PM", attendance: "31/34 (91%)", status: "In Progress", streamQuality: "Live Broadcasting" },
      { id: "CLS-105", batch: "DV BATCH 202210", subject: "TABLEAU VISUALIZATION", topic: "Level of Detail (LOD) Expressions & Parameter Actions", mentor: "Ganesh Rath", time: "07:00 PM - 09:00 PM", attendance: "Pending", status: "Scheduled", streamQuality: "Ready" },
      { id: "CLS-106", batch: "BATCH 202606", subject: "BIG DATA PYSPARK", topic: "RDD Operations & Broadcast Variables", mentor: "Laxmi NR", time: "07:30 PM - 09:30 PM", attendance: "Pending", status: "Rescheduled", streamQuality: "Moved to Tomorrow 9 AM" }
    ],
    hourlyAttendanceTimeline: [
      { time: "09 AM", attendance: 94, scheduled: 2 },
      { time: "11 AM", attendance: 96, scheduled: 3 },
      { time: "02 PM", attendance: 92, scheduled: 2 },
      { time: "04 PM", attendance: 91, scheduled: 3 },
      { time: "07 PM", attendance: 95, scheduled: 4 }
    ]
  },

  batchPerformance: {
    kpis: {
      activeCohortsCount: 8,
      avgSyllabusCoveragePct: 79.4,
      avgBatchAttendancePct: 91.8,
      onTrackBatches: 7,
      atRiskBatches: 1,
      practicalPassRate: 94.2
    },
    batchesRoster: [
      { batch: "BATCH 202606", course: "APIDS", enrolled: 45, syllabusPct: 86, attendancePct: 94.2, passRate: 97.5, health: "On Track", mentorLead: "Debendra Das", completionTarget: "Nov 2026" },
      { batch: "BATCH 202608", course: "FDE", enrolled: 38, syllabusPct: 78, attendancePct: 92.5, passRate: 94.0, health: "On Track", mentorLead: "Laxmi NR", completionTarget: "Dec 2026" },
      { batch: "BATCH 202604", course: "APIDA", enrolled: 32, syllabusPct: 92, attendancePct: 95.0, passRate: 98.0, health: "On Track", mentorLead: "Ganesh K Kumar", completionTarget: "Oct 2026" },
      { batch: "BATCH 202609", course: "MPGA", enrolled: 34, syllabusPct: 62, attendancePct: 86.4, passRate: 88.0, health: "At Risk", mentorLead: "Unmesh Panigrahi", completionTarget: "Jan 2027" },
      { batch: "DV BATCH 202210", course: "APIDS", enrolled: 42, syllabusPct: 96, attendancePct: 96.0, passRate: 99.0, health: "On Track", mentorLead: "Debendra Das", completionTarget: "Oct 2026" },
      { batch: "DV BATCH 202211", course: "DAS", enrolled: 28, syllabusPct: 70, attendancePct: 90.0, passRate: 92.0, health: "On Track", mentorLead: "Ayushkant Panda", completionTarget: "Dec 2026" }
    ]
  }
};

// ============================================================================
// 3. STUDENT ANALYTICS DATA MODEL
// ============================================================================
export const studentAnalyticsData = {
  learningProgress: {
    kpis: {
      totalEnrolledStudents: 420,
      avgCourseProgressPct: 78.4,
      completedModulesCount: 18,
      avgVideoWatchHours: "142 hrs",
      fastLearnersPct: 28.5,
      slowLearnersPct: 6.2
    },
    distributionTiers: [
      { range: "90% - 100% (Completed / Capstone)", count: 118, pct: 28.1, color: "#10b981" },
      { range: "75% - 89% (Advanced Topics)", count: 164, pct: 39.0, color: "#3b82f6" },
      { range: "50% - 74% (Core Applications)", count: 96, pct: 22.9, color: "#f59e0b" },
      { range: "Below 50% (Requires Nudge)", count: 42, pct: 10.0, color: "#ef4444" }
    ],
    subjectMastery: [
      { subject: "Excel Base & Advanced", avgScore: 94.2, completionRate: 98.4 },
      { subject: "SQL Server Enterprise", avgScore: 89.6, completionRate: 95.0 },
      { subject: "Python Programming", avgScore: 86.8, completionRate: 91.2 },
      { subject: "Power BI & Tableau", avgScore: 92.0, completionRate: 94.5 },
      { subject: "Machine Learning & AI", avgScore: 83.5, completionRate: 84.0 },
      { subject: "Big Data & PySpark", avgScore: 81.2, completionRate: 79.5 }
    ]
  },

  lmsEngagement: {
    kpis: {
      dailyActiveUsers: 312,
      monthlyActiveUsers: 415,
      stickinessRatio: 75.2, // DAU / MAU
      peakPlatformHours: "07:30 PM - 10:30 PM",
      avgSessionDuration: "58 mins",
      inactiveStudentsAlert: 14 // >7 days without login
    },
    deviceBreakdown: [
      { device: "Desktop & Laptop", pct: 68.4, sessions: 2840, color: "#3b82f6" },
      { device: "Mobile Phone (PWA)", pct: 24.2, sessions: 1005, color: "#10b981" },
      { device: "Tablet / iPad", pct: 7.4, sessions: 308, color: "#f59e0b" }
    ],
    hourlyHeatmap: [
      { hour: "06:00 AM", active: 28 },
      { hour: "09:00 AM", active: 110 },
      { hour: "12:00 PM", active: 85 },
      { hour: "03:00 PM", active: 94 },
      { hour: "06:00 PM", active: 185 },
      { hour: "08:00 PM", active: 295 },
      { hour: "10:00 PM", active: 240 },
      { hour: "12:00 AM", active: 45 }
    ]
  },

  assignmentTracking: {
    kpis: {
      totalSubmissions: 1248,
      submissionCompliancePct: 91.2,
      onTimeSubmissionPct: 84.6,
      lateSubmissionPct: 15.4,
      avgGradingTurnaroundHours: 14.5,
      resubmissionRatePct: 4.8
    },
    gradeDistribution: [
      { grade: "A+ (90 - 100%)", count: 680, pct: 54.5, color: "#10b981" },
      { grade: "A (80 - 89%)", count: 340, pct: 27.2, color: "#3b82f6" },
      { grade: "B (70 - 79%)", count: 168, pct: 13.5, color: "#f59e0b" },
      { grade: "Needs Improvement (<70%)", count: 60, pct: 4.8, color: "#ef4444" }
    ]
  }
};

// ============================================================================
// 4. PLACEMENT ANALYTICS DATA MODEL
// ============================================================================
export const placementAnalyticsData = {
  placementDashboard: {
    kpis: {
      eligibleCandidates: 186,
      totalPlaced: 162,
      placementRatePct: 87.1,
      averageCtcLpa: 8.45,
      highestCtcLpa: 24.50,
      activeHiringPartners: 124,
      ongoingCampusDrives: 18
    },
    ctcDistribution: [
      { bracket: "₹15+ LPA (Elite Tier)", count: 22, pct: 13.6, color: "#ec4899" },
      { bracket: "₹10 - 15 LPA (High Growth)", count: 48, pct: 29.6, color: "#8b5cf6" },
      { bracket: "₹6 - 10 LPA (Core Analytics)", count: 72, pct: 44.5, color: "#3b82f6" },
      { bracket: "₹4 - 6 LPA (Foundation)", count: 20, pct: 12.3, color: "#10b981" }
    ],
    topRecruiters: [
      { company: "Mu Sigma", hires: 24, avgPackage: "₹8.5 LPA", sector: "Decision Sciences" },
      { company: "Fractal Analytics", hires: 18, avgPackage: "₹11.2 LPA", sector: "AI & Analytics" },
      { company: "Tiger Analytics", hires: 16, avgPackage: "₹10.5 LPA", sector: "Advanced Analytics" },
      { company: "Deloitte USI", hires: 14, avgPackage: "₹9.8 LPA", sector: "Consulting" },
      { company: "Accenture AI", hires: 12, avgPackage: "₹8.8 LPA", sector: "IT & Strategy" },
      { company: "LatentView Analytics", hires: 10, avgPackage: "₹9.2 LPA", sector: "Data Engineering" },
      { company: "PwC India", hires: 8, avgPackage: "₹9.5 LPA", sector: "Financial Services" },
      { company: "Genpact Enterprise", hires: 8, avgPackage: "₹7.4 LPA", sector: "Risk Analytics" }
    ],
    roleDistribution: [
      { role: "Data Scientist / ML Engineer", count: 52, pct: 32.1 },
      { role: "Predictive Analytics Specialist", count: 42, pct: 25.9 },
      { role: "Power BI / Tableau BI Consultant", count: 38, pct: 23.5 },
      { role: "Data Engineer (PySpark/SQL)", count: 30, pct: 18.5 }
    ]
  },

  interviewTracking: {
    kpis: {
      mockInterviewsConducted: 342,
      clearedFirstAttemptPct: 76.8,
      corporateInterviewsScheduled: 48,
      finalRoundsInProgress: 22,
      offerAcceptanceRatePct: 94.2
    },
    competencyRatings: [
      { competency: "Business Case Studies & Strategy", score: 92.4, benchmark: 85.0 },
      { competency: "SQL Query Optimization & Data Modeling", score: 89.6, benchmark: 80.0 },
      { competency: "Statistical Modeling & SAS / Python", score: 86.8, benchmark: 78.0 },
      { competency: "Machine Learning Algorithms & Metrics", score: 84.2, benchmark: 75.0 },
      { competency: "Technical Communication & Confidence", score: 88.5, benchmark: 80.0 }
    ],
    upcomingDrives: [
      { company: "Fractal Analytics", date: "28 Oct 2026", vacancies: 8, package: "₹10.5 - 13.5 LPA", roles: "Data Scientist II", status: "Shortlist Ready" },
      { company: "Tiger Analytics", date: "30 Oct 2026", vacancies: 6, package: "₹9.0 - 12.0 LPA", roles: "Analyst - Decision Science", status: "Slot Allocated" },
      { company: "Deloitte Risk & Financial", date: "03 Nov 2026", vacancies: 10, package: "₹9.2 - 11.0 LPA", roles: "Consultant Analytics", status: "Invited" }
    ]
  }
};

// ============================================================================
// 5. EXECUTIVE DASHBOARD DATA MODEL (DIRECTOR OVERVIEW & HEALTH SCORE)
// ============================================================================
export const executiveDashboardData = {
  directorOverview: {
    kpis: {
      totalActiveStudents: 420,
      allTimeAlumni: 6230,
      totalPipelineRevenue: 27300000, // ₹2.73 Cr
      realizedInflowMTD: 5840700,    // ₹58.4 L
      operatingExpenditureMTD: 1820000, // ₹18.2 L
      netOperatingMarginPct: 68.8,
      placementSuccessRatePct: 87.1,
      academicSlaCompliancePct: 98.4
    },
    strategicPillars: [
      { name: "Academic Delivery", score: 98.4, status: "Superior", lead: "Debendra Das", target: "95%+" },
      { name: "Placement Conversion", score: 87.1, status: "High Growth", lead: "Corporate Relations", target: "85%+" },
      { name: "Fee Realization Velocity", score: 91.2, status: "Strong", lead: "Accounts Team", target: "90%+" },
      { name: "Student Net Promoter Score", score: 95.4, status: "World Class (NPS +74)", lead: "Student Affairs", target: "90%+" },
      { name: "Faculty Utilization & SLA", score: 92.0, status: "Optimal", lead: "Operations Lead", target: "88%+" }
    ],
    financialSummary: {
      grossInflowFY26: 371146721, // ₹37.11 Cr
      bhubaneswarBranchRevenue: 248512450, // ₹24.85 Cr
      bangaloreBranchRevenue: 122634271,  // ₹12.26 Cr
      avgRevenuePerStudent: 59574,
      collectionEfficiencyPct: 92.4,
      refundReversalRatePct: 0.38
    }
  },

  revenueAnalytics: {
    cashVsAccrual: {
      cashCollectedMTD: 5840700,
      accrualCommittedFee: 6850000,
      accrualRealizationRate: 85.27,
      deferredReceivable: 1009300
    },
    courseProfitability: [
      { course: "APIDS", revenue: "₹18.42 Cr", marginPct: 74.2, enrolled: 3120, cac: "₹3,800", ltv: "₹65,000" },
      { course: "APIDA", revenue: "₹8.91 Cr", marginPct: 69.5, enrolled: 1450, cac: "₹4,200", ltv: "₹62,000" },
      { course: "FDE", revenue: "₹4.87 Cr", marginPct: 66.8, enrolled: 780, cac: "₹4,900", ltv: "₹68,000" },
      { course: "MPGA", revenue: "₹3.12 Cr", marginPct: 71.0, enrolled: 520, cac: "₹5,100", ltv: "₹72,000" },
      { course: "DAS", revenue: "₹1.79 Cr", marginPct: 64.0, enrolled: 360, cac: "₹3,500", ltv: "₹48,000" }
    ],
    branchUnitEconomics: {
      bbsr: { revenue: "₹24.85 Cr", share: 67.0, opexRatio: "26.4%", margin: "73.6%", status: "High Margin Core" },
      blr: { revenue: "₹12.26 Cr", share: 33.0, opexRatio: "38.2%", margin: "61.8%", status: "Rapid Expansion Hub" }
    }
  },

  instituteHealthScore: {
    compositeScore: 92.8, // Grade A+ Elite Status
    grade: "Grade A+ (Elite Analytics Institute)",
    maxScore: 100,
    pillars: [
      {
        id: "academic",
        name: "Academic Excellence & SLA",
        score: 94.6,
        weightPct: 25,
        status: "Benchmark",
        description: "Curriculum delivery, mentor feedback (4.84/5.0), and 98.4% class completion rate."
      },
      {
        id: "placement",
        name: "Placement Velocity & CTC Growth",
        score: 91.2,
        weightPct: 25,
        status: "High Growth",
        description: "87.1% placement rate, ₹8.45 LPA average CTC, 124 corporate hiring partners."
      },
      {
        id: "financial",
        name: "Financial Health & Collection Velocity",
        score: 89.8,
        weightPct: 20,
        status: "Strong",
        description: "₹58.4L MTD collection, 92.4% recovery rate, low 0.38% refund reversal."
      },
      {
        id: "student",
        name: "Student Experience & Retention",
        score: 95.4,
        weightPct: 15,
        status: "Superior",
        description: "Net Promoter Score +74, 91.2% assignment compliance, 75.2% LMS stickiness."
      },
      {
        id: "operations",
        name: "Infrastructure & Mentor Governance",
        score: 93.0,
        weightPct: 15,
        status: "Optimized",
        description: "98.4% mentor attendance, 28 min doubt turnaround, 1080p live stream stability."
      }
    ],
    historicalTrend: [
      { month: "May 2026", score: 88.4 },
      { month: "Jun 2026", score: 89.8 },
      { month: "Jul 2026", score: 90.6 },
      { month: "Aug 2026", score: 91.8 },
      { month: "Sep 2026", score: 92.2 },
      { month: "Oct 2026", score: 92.8 }
    ],
    recommendations: [
      "Scale BATCH 202606 corporate capstone evaluations to accelerate placement velocity.",
      "Transition remaining 14 at-risk students in MPGA cohort to dedicated mentor doubt sessions.",
      "Introduce AI Mock Interview automated feedback to boost first-attempt clearance to >85%."
    ]
  }
};
