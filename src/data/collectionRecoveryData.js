// ============================================================================
// DV ANALYTICS - COLLECTION & RECOVERY INTELLIGENCE DATA MODEL
// Executive Financial Analytics & Recovery Performance for Directors & Managers
// ============================================================================

export const collectionOverviewConfig = {
  currentMonthName: "October 2026",
  currencySymbol: "₹",
  monthlyTarget: 7500000, // ₹75,00,000 Target
  totalDaysInMonth: 31,
  currentDay: 24, // As of Day 24
  workingDaysTotal: 26,
  workingDaysElapsed: 20,
  workingDaysRemaining: 6
};

// 31 Days Daily Collection Data for October 2026 (Actuals up to Day 24, Forecasts Day 25-31)
export const dailyCollectionRecords = [
  { day: 1, date: "01 Oct", amount: 215000, target: 241935, dayName: "Thu", center: { blr: 95000, bbsr: 58000, dxb: 38000, onl: 24000 } },
  { day: 2, date: "02 Oct", amount: 185000, target: 241935, dayName: "Fri", center: { blr: 80000, bbsr: 50000, dxb: 35000, onl: 20000 } },
  { day: 3, date: "03 Oct", amount: 260000, target: 241935, dayName: "Sat", center: { blr: 115000, bbsr: 72000, dxb: 45000, onl: 28000 } },
  { day: 4, date: "04 Oct", amount: 45000, target: 120000, dayName: "Sun", center: { blr: 20000, bbsr: 12000, dxb: 8000, onl: 5000 } }, // Lowest day (Sunday)
  { day: 5, date: "05 Oct", amount: 295000, target: 241935, dayName: "Mon", center: { blr: 130000, bbsr: 80000, dxb: 52000, onl: 33000 } },
  { day: 6, date: "06 Oct", amount: 240000, target: 241935, dayName: "Tue", center: { blr: 105000, bbsr: 65000, dxb: 42000, onl: 28000 } },
  { day: 7, date: "07 Oct", amount: 310000, target: 241935, dayName: "Wed", center: { blr: 135000, bbsr: 85000, dxb: 55000, onl: 35000 } },
  { day: 8, date: "08 Oct", amount: 275000, target: 241935, dayName: "Thu", center: { blr: 120000, bbsr: 75000, dxb: 48000, onl: 32000 } },
  { day: 9, date: "09 Oct", amount: 230000, target: 241935, dayName: "Fri", center: { blr: 100000, bbsr: 62000, dxb: 40000, onl: 28000 } },
  { day: 10, date: "10 Oct", amount: 340000, target: 241935, dayName: "Sat", center: { blr: 150000, bbsr: 92000, dxb: 60000, onl: 38000 } },
  { day: 11, date: "11 Oct", amount: 65000, target: 120000, dayName: "Sun", center: { blr: 28000, bbsr: 18000, dxb: 11000, onl: 8000 } },
  { day: 12, date: "12 Oct", amount: 280000, target: 241935, dayName: "Mon", center: { blr: 122000, bbsr: 76000, dxb: 49000, onl: 33000 } },
  { day: 13, date: "13 Oct", amount: 290000, target: 241935, dayName: "Tue", center: { blr: 126000, bbsr: 78000, dxb: 51000, onl: 35000 } },
  { day: 14, date: "14 Oct", amount: 325000, target: 241935, dayName: "Wed", center: { blr: 142000, bbsr: 88000, dxb: 58000, onl: 37000 } },
  { day: 15, date: "15 Oct", amount: 465000, target: 241935, dayName: "Thu", center: { blr: 205000, bbsr: 128000, dxb: 82000, onl: 50000 } }, // Highest day (Mid-month batch start)
  { day: 16, date: "16 Oct", amount: 285000, target: 241935, dayName: "Fri", center: { blr: 124000, bbsr: 77000, dxb: 51000, onl: 33000 } },
  { day: 17, date: "17 Oct", amount: 315000, target: 241935, dayName: "Sat", center: { blr: 138000, bbsr: 86000, dxb: 56000, onl: 35000 } },
  { day: 18, date: "18 Oct", amount: 75000, target: 120000, dayName: "Sun", center: { blr: 32000, bbsr: 21000, dxb: 13000, onl: 9000 } },
  { day: 19, date: "19 Oct", amount: 270000, target: 241935, dayName: "Mon", center: { blr: 118000, bbsr: 73000, dxb: 48000, onl: 31000 } },
  { day: 20, date: "20 Oct", amount: 260000, target: 241935, dayName: "Tue", center: { blr: 114000, bbsr: 70000, dxb: 46000, onl: 30000 } },
  { day: 21, date: "21 Oct", amount: 295000, target: 241935, dayName: "Wed", center: { blr: 129000, bbsr: 80000, dxb: 53000, onl: 33000 } },
  { day: 22, date: "22 Oct", amount: 310000, target: 241935, dayName: "Thu", center: { blr: 135000, bbsr: 84000, dxb: 55000, onl: 36000 } },
  { day: 23, date: "23 Oct", amount: 240200, target: 241935, dayName: "Fri", center: { blr: 104000, bbsr: 65000, dxb: 43000, onl: 28200 } }, // Yesterday
  { day: 24, date: "24 Oct", amount: 284500, target: 241935, dayName: "Sat", center: { blr: 124500, bbsr: 77000, dxb: 51000, onl: 32000 } }, // Today
  // Projected remaining days (Days 25-31)
  { day: 25, date: "25 Oct", amount: 85000, target: 120000, dayName: "Sun", isProjected: true },
  { day: 26, date: "26 Oct", amount: 320000, target: 241935, dayName: "Mon", isProjected: true },
  { day: 27, date: "27 Oct", amount: 345000, target: 241935, dayName: "Tue", isProjected: true },
  { day: 28, date: "28 Oct", amount: 360000, target: 241935, dayName: "Wed", isProjected: true },
  { day: 29, date: "29 Oct", amount: 380000, target: 241935, dayName: "Thu", isProjected: true },
  { day: 30, date: "30 Oct", amount: 450000, target: 241935, dayName: "Fri", isProjected: true },
  { day: 31, date: "31 Oct", amount: 460000, target: 241935, dayName: "Sat", isProjected: true }
];

// Historical Monthly Collections (Jan 2026 - Oct 2026)
export const monthlyCollectionTrends = [
  { month: "Jan", target: 5000000, actual: 4820000, achievement: 96.4, growth: 12.0 },
  { month: "Feb", target: 5200000, actual: 5150000, achievement: 99.0, growth: 6.8 },
  { month: "Mar", target: 5500000, actual: 5740000, achievement: 104.3, growth: 11.5 },
  { month: "Apr", target: 5800000, actual: 5690000, achievement: 98.1, growth: -0.9 },
  { month: "May", target: 6200000, actual: 6380000, achievement: 102.9, growth: 12.1 },
  { month: "Jun", target: 6500000, actual: 6810000, achievement: 104.8, growth: 6.7 },
  { month: "Jul", target: 6800000, actual: 6720000, achievement: 98.8, growth: -1.3 },
  { month: "Aug", target: 7000000, actual: 7240000, achievement: 103.4, growth: 7.7 },
  { month: "Sep", target: 7200000, actual: 7120000, achievement: 98.9, growth: -1.7 },
  { month: "Oct (MTD)", target: 7500000, actual: 5840700, projected: 8240700, achievement: 77.87, growth: 14.2 }
];

// Weekly Breakdown for October
export const weeklyCollections = [
  { week: "Week 1 (Oct 1-7)", target: 1693545, actual: 1650000, prevMonth: 1480000, progress: 97.4 },
  { week: "Week 2 (Oct 8-14)", target: 1693545, actual: 1740000, prevMonth: 1560000, progress: 102.7 },
  { week: "Week 3 (Oct 15-21)", target: 1693545, actual: 1765000, prevMonth: 1610000, progress: 104.2 },
  { week: "Week 4 (Oct 22-28)", target: 1693545, actual: 1585700, prevMonth: 1520000, progress: 93.6 },
  { week: "Week 5 (Oct 29-31)", target: 725806, actual: 0, projected: 1500000, prevMonth: 950000, progress: 0 }
];

// Center-wise Performance
export const centerCollectionBreakdown = [
  {
    id: "blr",
    name: "Bangalore HQ",
    location: "Karnataka, India",
    lead: "Rajesh Sharma",
    target: 3200000,
    collected: 2560000,
    achievement: 80.0,
    sharePercent: 43.8,
    color: "#3b82f6",
    status: "on_track"
  },
  {
    id: "bbsr",
    name: "Bhubaneswar Center",
    location: "Odisha, India",
    lead: "Amit Mohanty",
    target: 2000000,
    collected: 1585000,
    achievement: 79.25,
    sharePercent: 27.1,
    color: "#10b981",
    status: "on_track"
  },
  {
    id: "dxb",
    name: "Dubai International",
    location: "Dubai, UAE",
    lead: "Farah Al-Mansoori",
    target: 1400000,
    collected: 1060000,
    achievement: 75.71,
    sharePercent: 18.2,
    color: "#f59e0b",
    status: "slightly_behind"
  },
  {
    id: "onl",
    name: "Online & Global Virtual",
    location: "Global Remote",
    lead: "Priya Patel",
    target: 900000,
    collected: 635700,
    achievement: 70.63,
    sharePercent: 10.9,
    color: "#8b5cf6",
    status: "slightly_behind"
  }
];

// Program / Course Cohort Recovery Contribution
export const programContribution = [
  { program: "APIDS (AI & Data Science)", code: "APIDS", percentage: 46, amount: 2686722, color: "#f97316" },
  { program: "APIDA (GenAI Analytics)", code: "APIDA", percentage: 24, amount: 1401768, color: "#06b6d4" },
  { program: "DAS (Data Analytics Specialist)", code: "DAS", percentage: 16, amount: 934512, color: "#10b981" },
  { program: "APCF (Cybersecurity)", code: "APCF", percentage: 9, amount: 525663, color: "#a855f7" },
  { program: "FDE (Forward Deployment)", code: "FDE", percentage: 5, amount: 292035, color: "#ec4899" }
];

// Team Leader & Recovery Executive Leaderboard
export const collectionLeaderboard = [
  {
    rank: 1,
    name: "Rajesh Sharma",
    role: "Senior Collection Lead",
    center: "Bangalore HQ",
    target: 1250000,
    collected: 1480000,
    achievement: 118.4,
    recoveryRate: "96.2%",
    status: "Super Achiever",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
  },
  {
    rank: 2,
    name: "Priya Patel",
    role: "Global Corporate Recovery",
    center: "Online Global",
    target: 1150000,
    collected: 1240000,
    achievement: 107.8,
    recoveryRate: "94.5%",
    status: "Target Exceeded",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80"
  },
  {
    rank: 3,
    name: "Amit Mohanty",
    role: "Regional Collection Manager",
    center: "Bhubaneswar",
    target: 1100000,
    collected: 1120000,
    achievement: 101.8,
    recoveryRate: "92.1%",
    status: "Target Achieved",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
  },
  {
    rank: 4,
    name: "Farah Al-Mansoori",
    role: "International Accounts Executive",
    center: "Dubai UAE",
    target: 1100000,
    collected: 1045000,
    achievement: 95.0,
    recoveryRate: "89.4%",
    status: "On Track",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
  },
  {
    rank: 5,
    name: "Karan Verma",
    role: "Student FinCare Advisor",
    center: "Bangalore HQ",
    target: 950000,
    collected: 955700,
    achievement: 100.6,
    recoveryRate: "91.8%",
    status: "Target Achieved",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
  }
];

// Helper to compute live executive KPI metrics
export function getCollectionKPIs() {
  const actualRecords = dailyCollectionRecords.filter(r => !r.isProjected);
  const mtdCollection = actualRecords.reduce((acc, curr) => acc + curr.amount, 0);
  const monthlyTarget = collectionOverviewConfig.monthlyTarget;
  const achievementPercent = ((mtdCollection / monthlyTarget) * 100).toFixed(2);
  
  const todayRecord = dailyCollectionRecords.find(r => r.day === collectionOverviewConfig.currentDay) || actualRecords[actualRecords.length - 1];
  const yesterdayRecord = dailyCollectionRecords.find(r => r.day === collectionOverviewConfig.currentDay - 1) || actualRecords[actualRecords.length - 2];
  
  const todayCollection = todayRecord.amount;
  const yesterdayCollection = yesterdayRecord.amount;
  const dayOnDayGrowth = (((todayCollection - yesterdayCollection) / yesterdayCollection) * 100).toFixed(1);

  const daysElapsed = collectionOverviewConfig.currentDay;
  const daysRemaining = collectionOverviewConfig.totalDaysInMonth - daysElapsed;
  
  const dailyRunRate = Math.round(mtdCollection / daysElapsed);
  const outstandingGap = monthlyTarget - mtdCollection;
  const requiredRunRate = daysRemaining > 0 ? Math.round(outstandingGap / daysRemaining) : 0;
  
  const highestDay = [...actualRecords].sort((a, b) => b.amount - a.amount)[0];
  const lowestDay = [...actualRecords].sort((a, b) => a.amount - b.amount)[0];
  
  const projectedMonthEnd = Math.round(mtdCollection + (dailyRunRate * daysRemaining));
  const projectedSurplus = projectedMonthEnd - monthlyTarget;

  // Traffic Light Status
  // Green: Projected >= Target and DRR >= RRR * 0.9
  // Amber: Projected within 5% of target
  // Red: Serious shortfall
  let healthStatus = "green";
  if (projectedMonthEnd < monthlyTarget * 0.95) {
    healthStatus = "red";
  } else if (projectedMonthEnd < monthlyTarget) {
    healthStatus = "amber";
  }

  return {
    todayCollection,
    yesterdayCollection,
    dayOnDayGrowth,
    mtdCollection,
    monthlyTarget,
    achievementPercent,
    dailyRunRate,
    requiredRunRate,
    outstandingGap,
    averageDailyCollection: dailyRunRate,
    highestDay,
    lowestDay,
    projectedMonthEnd,
    projectedSurplus,
    daysElapsed,
    daysRemaining,
    healthStatus,
    collectionVelocity: "₹18,450 / hr",
    collectionStabilityIndex: "94.2%",
    recoveryEfficiencyScore: 92,
    confidenceProbability: "96.4%"
  };
}
