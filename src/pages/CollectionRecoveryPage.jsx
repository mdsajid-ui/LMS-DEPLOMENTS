import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Target, 
  Calendar, 
  Award, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowUpRight, 
  ArrowDownRight, 
  Users, 
  Building2, 
  FileSpreadsheet, 
  Download, 
  Printer, 
  Sparkles, 
  Compass, 
  Filter, 
  RefreshCw, 
  BarChart3, 
  PieChart, 
  Clock, 
  Activity, 
  Layers, 
  ChevronRight,
  Maximize2,
  Code2
} from 'lucide-react';
import { 
  collectionOverviewConfig, 
  dailyCollectionRecords, 
  monthlyCollectionTrends, 
  weeklyCollections, 
  centerCollectionBreakdown, 
  programContribution, 
  collectionLeaderboard, 
  getCollectionKPIs 
} from '../data/collectionRecoveryData';
import { generateAndDownloadExcel } from '../utils/excelHelper';

export default function CollectionRecoveryPage({ student }) {
  const [selectedCenter, setSelectedCenter] = useState('all'); // 'all', 'blr', 'bbsr', 'dxb', 'onl'
  const [activeViewTab, setActiveViewTab] = useState('executive'); // 'executive', 'daily_trend', 'calendar', 'leaderboard', 'powerbi'
  const [hoveredDay, setHoveredDay] = useState(null);
  const [isExporting, setIsExporting] = useState(false);

  // Compute live KPIs
  const kpis = useMemo(() => getCollectionKPIs(), []);

  // Filtered daily records based on center
  const displayDailyRecords = useMemo(() => {
    if (selectedCenter === 'all') return dailyCollectionRecords;
    return dailyCollectionRecords.map(r => ({
      ...r,
      amount: r.center ? r.center[selectedCenter] || 0 : Math.round(r.amount * 0.3)
    }));
  }, [selectedCenter]);

  // Format INR Currency
  const formatINR = (val) => {
    if (val === undefined || val === null) return "₹0";
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  // Format compact number (e.g. ₹58.4L)
  const formatLakhs = (val) => {
    if (!val) return "₹0";
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`;
    return formatINR(val);
  };

  // Export collection data to CSV / Excel
  const handleExportData = () => {
    setIsExporting(true);
    try {
      const csvHeader = "Day,Date,Day_Name,Target_INR,Collected_INR,Cumulative_Actual_INR,Status\n";
      let cumulative = 0;
      const csvRows = dailyCollectionRecords.map(r => {
        cumulative += r.amount;
        return `${r.day},"${r.date}","${r.dayName}",${r.target},${r.amount},${cumulative},"${r.isProjected ? 'Projected' : 'Actual'}"`;
      }).join("\n");

      const blob = new Blob([csvHeader + csvRows], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `DV_Analytics_Collection_Master_${collectionOverviewConfig.currentMonthName.replace(" ", "_")}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (_e) {
      generateAndDownloadExcel("DV_Analytics_Retail_Sales_Master.csv");
    } finally {
      setTimeout(() => setIsExporting(false), 800);
    }
  };

  // Daily Chart Max Scale
  const maxDailyVal = Math.max(...displayDailyRecords.map(r => r.amount), 500000);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto animate-in fade-in duration-300">
      
      {/* ========================================================================= */}
      {/* 1. EXECUTIVE HEADER & 5-SECOND DECISION BANNER                             */}
      {/* ========================================================================= */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-950 p-6 border border-slate-800/80 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                Live Recovery Hub
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-[11px] font-semibold flex items-center gap-1.5 border border-slate-700">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {collectionOverviewConfig.currentMonthName} • Day {kpis.daysElapsed} of {collectionOverviewConfig.totalDaysInMonth}
              </span>
              <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[11px] font-semibold">
                Director & Executive Portal
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
              Collection & Recovery Dashboard
              <Sparkles className="w-5 h-5 text-amber-400 animate-pulse hidden sm:inline" />
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
              Real-time cashflow intelligence, daily run-rate trajectory, center contributions, and predictive recovery models for DV Analytics.
            </p>
          </div>

          {/* Quick Action Center & Filters */}
          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
            {/* Center Selector Dropdown */}
            <div className="relative flex-1 sm:flex-initial">
              <select
                value={selectedCenter}
                onChange={(e) => setSelectedCenter(e.target.value)}
                className="w-full sm:w-auto bg-slate-950/80 text-xs font-semibold text-slate-200 border border-slate-700/80 rounded-xl px-3.5 py-2.5 pr-8 focus:outline-none focus:border-emerald-400 transition-all cursor-pointer shadow-sm appearance-none"
              >
                <option value="all">🏢 All Training Centers (Global)</option>
                <option value="blr">📍 Bangalore Head Office</option>
                <option value="bbsr">📍 Bhubaneswar Center</option>
                <option value="dxb">📍 Dubai International</option>
                <option value="onl">🌐 Online Virtual Cohorts</option>
              </select>
            </div>

            {/* Export Master Dataset */}
            <button
              onClick={handleExportData}
              disabled={isExporting}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-900/30 flex items-center gap-2 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
              title="Download Collection Master CSV / Excel dataset"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>{isExporting ? "Exporting..." : "Export Excel"}</span>
            </button>

            {/* Print / Window Full View */}
            <button
              onClick={() => window.print()}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all cursor-pointer"
              title="Print Executive Dashboard Report"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 5-SECOND DECISION BANNER (Traffic Light System) */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 flex items-center gap-3.5 shadow-inner">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center flex-shrink-0 text-emerald-400">
              <CheckCircle2 className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Executive Verdict</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              </div>
              <h4 className="text-xs font-bold text-white mt-0.5">ON TRACK TO SURPASS TARGET</h4>
              <p className="text-[11px] text-emerald-300/80">Projected {formatLakhs(kpis.projectedMonthEnd)} (109.8%)</p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Daily Run Rate (DRR)</span>
              <span className="text-base font-extrabold text-white mt-0.5 block">{formatINR(kpis.dailyRunRate)}</span>
              <span className="text-[10px] text-emerald-400 flex items-center gap-0.5 mt-0.5">
                <ArrowUpRight className="w-3 h-3" /> +₹6,320 vs RRR requirement
              </span>
            </div>
            <Activity className="w-5 h-5 text-emerald-400 opacity-60" />
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Required Run Rate (RRR)</span>
              <span className="text-base font-extrabold text-white mt-0.5 block">{formatINR(kpis.requiredRunRate)}</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Needed for remaining {kpis.daysRemaining} days</span>
            </div>
            <Target className="w-5 h-5 text-blue-400 opacity-60" />
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Target Probability</span>
              <span className="text-base font-extrabold text-emerald-400 mt-0.5 block">{kpis.confidenceProbability}</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">AI Confidence Interval (92/100 Health)</span>
            </div>
            <Award className="w-5 h-5 text-amber-400 opacity-60" />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. TOP 12 KPI SECTION (EXECUTIVE CARDS)                                   */}
      {/* ========================================================================= */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-emerald-500" />
            Core Collection KPIs & Financial Meters
          </h2>
          <span className="text-xs text-slate-500">Live data synced from bank gateway</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {/* 1. Today's Collection */}
          <div className="rounded-2xl bg-white dark:bg-slate-900 p-4 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group">
            <span className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400 block truncate">
              Today's Collection
            </span>
            <div className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mt-1">
              {formatINR(kpis.todayCollection)}
            </div>
            <div className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+{kpis.dayOnDayGrowth}% vs Yesterday</span>
            </div>
          </div>

          {/* 2. Yesterday Collection */}
          <div className="rounded-2xl bg-white dark:bg-slate-900 p-4 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
            <span className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400 block truncate">
              Yesterday Collection
            </span>
            <div className="text-lg sm:text-xl font-extrabold text-slate-800 dark:text-slate-200 mt-1">
              {formatINR(kpis.yesterdayCollection)}
            </div>
            <span className="mt-2 block text-[11px] text-slate-500 dark:text-slate-400">
              Settled • 18 Transactions
            </span>
          </div>

          {/* 3. Month-to-Date (MTD) Collection */}
          <div className="rounded-2xl bg-gradient-to-br from-emerald-500/10 to-transparent bg-white dark:bg-slate-900 p-4 border border-emerald-500/30 shadow-sm hover:shadow-md transition-all">
            <span className="text-[11px] font-bold uppercase text-emerald-700 dark:text-emerald-400 block truncate">
              MTD Collection
            </span>
            <div className="text-lg sm:text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
              {formatLakhs(kpis.mtdCollection)}
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-emerald-500 h-full rounded-full transition-all duration-1000"
                style={{ width: `${Math.min(100, kpis.achievementPercent)}%` }}
              ></div>
            </div>
          </div>

          {/* 4. Monthly Target */}
          <div className="rounded-2xl bg-white dark:bg-slate-900 p-4 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
            <span className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400 block truncate">
              Monthly Target
            </span>
            <div className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mt-1">
              {formatLakhs(kpis.monthlyTarget)}
            </div>
            <span className="mt-2 block text-[11px] text-slate-500 dark:text-slate-400">
              Approved by Director
            </span>
          </div>

          {/* 5. Achievement % */}
          <div className="rounded-2xl bg-white dark:bg-slate-900 p-4 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
            <span className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400 block truncate">
              Achievement %
            </span>
            <div className="text-lg sm:text-xl font-black text-blue-600 dark:text-blue-400 mt-1">
              {kpis.achievementPercent}%
            </div>
            <div className="mt-2 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <span>+2.4% ahead of schedule</span>
            </div>
          </div>

          {/* 6. Outstanding Gap to Target */}
          <div className="rounded-2xl bg-white dark:bg-slate-900 p-4 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
            <span className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400 block truncate">
              Gap to Target
            </span>
            <div className="text-lg sm:text-xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">
              {formatLakhs(kpis.outstandingGap)}
            </div>
            <span className="mt-2 block text-[11px] text-slate-500 dark:text-slate-400">
              {kpis.daysRemaining} Days remaining in Oct
            </span>
          </div>

          {/* 7. Daily Run Rate (DRR) */}
          <div className="rounded-2xl bg-white dark:bg-slate-900 p-4 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
            <span className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400 block truncate">
              Daily Run Rate (DRR)
            </span>
            <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-1">
              {formatINR(kpis.dailyRunRate)}
            </div>
            <span className="mt-1 block text-[10px] text-slate-500">
              Avg pace over 24 elapsed days
            </span>
          </div>

          {/* 8. Required Run Rate (RRR) */}
          <div className="rounded-2xl bg-white dark:bg-slate-900 p-4 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
            <span className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400 block truncate">
              Required Run Rate (RRR)
            </span>
            <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-1">
              {formatINR(kpis.requiredRunRate)}
            </div>
            <span className="mt-1 block text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
              DRR exceeds RRR (Healthy)
            </span>
          </div>

          {/* 9. Collection Growth % */}
          <div className="rounded-2xl bg-white dark:bg-slate-900 p-4 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
            <span className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400 block truncate">
              Collection Growth %
            </span>
            <div className="text-base sm:text-lg font-bold text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
              <ArrowUpRight className="w-4 h-4" />
              +14.2% MoM
            </div>
            <span className="mt-1 block text-[10px] text-slate-500">
              vs September ₹51.2L MTD
            </span>
          </div>

          {/* 10. Average Daily Collection */}
          <div className="rounded-2xl bg-white dark:bg-slate-900 p-4 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
            <span className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400 block truncate">
              Avg Daily Collection
            </span>
            <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-1">
              {formatINR(kpis.averageDailyCollection)}
            </div>
            <span className="mt-1 block text-[10px] text-slate-500">
              Working day avg: ₹2.16L
            </span>
          </div>

          {/* 11. Highest Collection Day */}
          <div className="rounded-2xl bg-white dark:bg-slate-900 p-4 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
            <span className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400 block truncate">
              Highest Collection Day
            </span>
            <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-1">
              {formatINR(kpis.highestDay.amount)}
            </div>
            <span className="mt-1 block text-[10px] text-blue-600 dark:text-blue-400 font-semibold">
              {kpis.highestDay.date} ({kpis.highestDay.dayName})
            </span>
          </div>

          {/* 12. Lowest Collection Day */}
          <div className="rounded-2xl bg-white dark:bg-slate-900 p-4 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
            <span className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400 block truncate">
              Lowest Collection Day
            </span>
            <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-1">
              {formatINR(kpis.lowestDay.amount)}
            </div>
            <span className="mt-1 block text-[10px] text-slate-500">
              {kpis.lowestDay.date} ({kpis.lowestDay.dayName} Sunday)
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. INTERACTIVE DASHBOARD VIEWS & NAV TABS                                 */}
      {/* ========================================================================= */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto scrollbar-none text-xs font-bold gap-2">
        <button
          onClick={() => setActiveViewTab('executive')}
          className={`py-3 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeViewTab === 'executive'
              ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Executive Overview & Trajectory</span>
        </button>

        <button
          onClick={() => setActiveViewTab('daily_trend')}
          className={`py-3 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeViewTab === 'daily_trend'
              ? 'border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/20'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>31-Day Daily Trend & Benchmarks</span>
        </button>

        <button
          onClick={() => setActiveViewTab('calendar')}
          className={`py-3 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeViewTab === 'calendar'
              ? 'border-purple-500 text-purple-600 dark:text-purple-400 bg-purple-50/50 dark:bg-purple-950/20'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Collection Heatmap Calendar</span>
        </button>

        <button
          onClick={() => setActiveViewTab('leaderboard')}
          className={`py-3 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeViewTab === 'leaderboard'
              ? 'border-amber-500 text-amber-600 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-950/20'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Center & Team Leaderboard</span>
        </button>

        <button
          onClick={() => setActiveViewTab('powerbi')}
          className={`py-3 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeViewTab === 'powerbi'
              ? 'border-teal-500 text-teal-600 dark:text-teal-400 bg-teal-50/50 dark:bg-teal-950/20'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Code2 className="w-4 h-4" />
          <span>Power BI DAX & Theme Spec</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 4. VIEW CONTENT: EXECUTIVE OVERVIEW                                       */}
      {/* ========================================================================= */}
      {activeViewTab === 'executive' && (
        <div className="space-y-6">
          {/* Main Visuals Grid: Cumulative Curve + Center Contribution */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Running Collection Progress & Trajectory Chart (2 Cols) */}
            <div className="lg:col-span-2 rounded-3xl bg-white dark:bg-slate-900 p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    Running Collection Progress vs Target Trajectory
                  </h3>
                  <p className="text-xs text-slate-500">Cumulative actuals crossing linear monthly run rate</p>
                </div>
                <div className="flex items-center gap-4 text-xs font-semibold">
                  <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                    <span className="w-3 h-1 bg-slate-400 rounded-full"></span>
                    Target Path (₹75L)
                  </span>
                  <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                    <span className="w-3 h-1 bg-emerald-500 rounded-full"></span>
                    Actual Cumulative (₹58.4L)
                  </span>
                </div>
              </div>

              {/* High-Performance SVG Cumulative Curve */}
              <div className="h-64 sm:h-72 w-full pt-4">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 800 240" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Gridlines */}
                  {[0, 60, 120, 180, 240].map((y, idx) => (
                    <g key={idx}>
                      <line x1="0" y1={y} x2="800" y2={y} stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeDasharray="3 3" />
                      <text x="5" y={y - 4} fontSize="9" fill="#94a3b8">
                        {idx === 0 ? "₹75L" : idx === 1 ? "₹55L" : idx === 2 ? "₹35L" : idx === 3 ? "₹15L" : "₹0"}
                      </text>
                    </g>
                  ))}

                  {/* Target Linear Line (from (0,240) to (800,0)) */}
                  <line x1="0" y1="240" x2="800" y2="0" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5 5" />

                  {/* Cumulative Actual Area & Path */}
                  {(() => {
                    let runningActual = 0;
                    const points = [];
                    const actuals = dailyCollectionRecords.filter(r => !r.isProjected);
                    actuals.forEach((r, idx) => {
                      runningActual += r.amount;
                      const x = (r.day / 31) * 800;
                      const y = 240 - ((runningActual / 7500000) * 240);
                      points.push({ x, y, amount: runningActual, day: r.day, dailyAmt: r.amount });
                    });

                    const dPath = points.reduce((acc, pt, idx) => `${acc} ${idx === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`, '');
                    const dArea = `${dPath} L ${points[points.length - 1].x} 240 L 0 240 Z`;

                    return (
                      <>
                        <path d={dArea} fill="url(#actualGradient)" />
                        <path d={dPath} fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
                        
                        {/* Day Markers */}
                        {points.map((pt, idx) => (
                          <circle 
                            key={idx}
                            cx={pt.x} 
                            cy={pt.y} 
                            r={idx === points.length - 1 ? 5 : 2.5}
                            fill="#10b981"
                            stroke="#ffffff"
                            strokeWidth={idx === points.length - 1 ? "2" : "1"}
                            className="cursor-pointer hover:r-6 transition-all"
                            onMouseEnter={() => setHoveredDay(pt)}
                            onMouseLeave={() => setHoveredDay(null)}
                          />
                        ))}
                      </>
                    );
                  })()}
                </svg>
              </div>

              {/* Day Inspection Callout */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span className="text-slate-600 dark:text-slate-300">
                    {hoveredDay 
                      ? `Day ${hoveredDay.day}: Collected ${formatINR(hoveredDay.dailyAmt)} • Cumulative ${formatINR(hoveredDay.amount)}`
                      : `Current Crossover: As of Day 24, collections are ₹58,40,700 (Surpassing 75% target milestone).`}
                  </span>
                </div>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold hidden sm:inline">
                  Pace: +109.8% Forecast
                </span>
              </div>
            </div>

            {/* Center-wise Contribution Breakdown (1 Col) */}
            <div className="rounded-3xl bg-white dark:bg-slate-900 p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-blue-500" />
                    Center Contribution
                  </h3>
                  <span className="text-[11px] font-semibold text-slate-400">Oct 2026</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Regional target recovery split</p>

                <div className="space-y-4 mt-5">
                  {centerCollectionBreakdown.map((c) => (
                    <div key={c.id} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }}></span>
                          {c.name}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-slate-900 dark:text-white">{formatLakhs(c.collected)}</span>
                          <span className="text-[10px] text-slate-500">({c.sharePercent}%)</span>
                        </div>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-700" 
                          style={{ width: `${c.achievement}%`, backgroundColor: c.color }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span>Target: {formatLakhs(c.target)}</span>
                        <span className={c.achievement >= 80 ? 'text-emerald-500 font-semibold' : 'text-amber-500 font-semibold'}>
                          {c.achievement}% achieved
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Program Cohort Mini Breakdown */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[11px] font-bold uppercase text-slate-400 block mb-2">Program Contribution</span>
                <div className="flex h-3 w-full rounded-full overflow-hidden">
                  {programContribution.map((p, idx) => (
                    <div 
                      key={idx} 
                      style={{ width: `${p.percentage}%`, backgroundColor: p.color }}
                      title={`${p.program}: ${p.percentage}% (${formatLakhs(p.amount)})`}
                      className="hover:opacity-80 transition-opacity cursor-pointer"
                    ></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 text-[10px] text-slate-500 mt-2">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500"></span> APIDS 46%</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-cyan-500"></span> APIDA 24%</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> DAS 16%</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-500"></span> APCF 9%</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-pink-500"></span> FDE 5%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Historical Comparison + Weekly Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Monthly Trends (Jan - Oct 2026) */}
            <div className="rounded-3xl bg-white dark:bg-slate-900 p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-blue-500" />
                    Monthly Historical Collection Trend (2026)
                  </h3>
                  <p className="text-xs text-slate-500">10-month scaling curve vs targets</p>
                </div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                  +14.2% Growth
                </span>
              </div>

              <div className="h-56 flex items-end justify-between gap-2 pt-6">
                {monthlyCollectionTrends.map((m, idx) => {
                  const isCurrent = idx === monthlyCollectionTrends.length - 1;
                  const heightPercent = (m.actual / 7500000) * 100;
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                      <span className="text-[10px] font-mono text-slate-500 group-hover:text-emerald-500 transition-colors opacity-0 group-hover:opacity-100">
                        {formatLakhs(m.actual)}
                      </span>
                      <div className="w-full max-w-[28px] bg-slate-100 dark:bg-slate-800 rounded-t-lg relative flex items-end justify-center overflow-hidden h-full">
                        <div 
                          className={`w-full rounded-t-lg transition-all duration-700 ${
                            isCurrent 
                              ? 'bg-gradient-to-t from-emerald-600 to-teal-400 animate-pulse' 
                              : 'bg-blue-500/80 hover:bg-blue-500'
                          }`}
                          style={{ height: `${heightPercent}%` }}
                        ></div>
                      </div>
                      <span className={`text-[11px] font-semibold ${isCurrent ? 'text-emerald-500 font-bold' : 'text-slate-500'}`}>
                        {m.month}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Weekly Comparison vs Last Month */}
            <div className="rounded-3xl bg-white dark:bg-slate-900 p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Activity className="w-4 h-4 text-purple-500" />
                    Weekly Performance vs Last Month
                  </h3>
                  <p className="text-xs text-slate-500">October vs September week-by-week</p>
                </div>
                <span className="text-xs text-slate-500">Week 1-4 Complete</span>
              </div>

              <div className="space-y-4 pt-2">
                {weeklyCollections.map((w, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-800 dark:text-slate-200">{w.week}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-slate-400">Sep: {formatLakhs(w.prevMonth)}</span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">
                          {w.actual > 0 ? formatLakhs(w.actual) : "Projected ₹15.0L"}
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-purple-500 h-full rounded-full transition-all duration-700" 
                        style={{ width: `${Math.min(100, w.actual > 0 ? (w.actual / w.target) * 100 : 0)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. VIEW CONTENT: 31-DAY DAILY TREND                                       */}
      {/* ========================================================================= */}
      {activeViewTab === 'daily_trend' && (
        <div className="rounded-3xl bg-white dark:bg-slate-900 p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-500" />
                Complete 31-Day October Collection Record
              </h3>
              <p className="text-xs text-slate-500">Daily collections vs daily benchmark line (₹2,41,935/day)</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-slate-500">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                Daily Target
              </span>
              <span className="flex items-center gap-1.5 text-emerald-500">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                Actual Collected
              </span>
            </div>
          </div>

          {/* Full Daily Chart */}
          <div className="h-72 w-full pt-4">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 930 240" preserveAspectRatio="none">
              {/* Benchmark Line (₹2,41,935) */}
              <line 
                x1="0" 
                y1={240 - ((241935 / maxDailyVal) * 240)} 
                x2="930" 
                y2={240 - ((241935 / maxDailyVal) * 240)} 
                stroke="#3b82f6" 
                strokeWidth="1.5" 
                strokeDasharray="4 4" 
              />

              {displayDailyRecords.map((r, idx) => {
                const x = idx * 30 + 15;
                const barHeight = (r.amount / maxDailyVal) * 220;
                const y = 240 - barHeight;
                const isOver = r.amount >= r.target;

                return (
                  <g 
                    key={idx} 
                    className="cursor-pointer group"
                    onMouseEnter={() => setHoveredDay(r)}
                    onMouseLeave={() => setHoveredDay(null)}
                  >
                    <rect
                      x={x - 9}
                      y={y}
                      width={18}
                      height={barHeight}
                      rx={4}
                      fill={r.isProjected ? "#64748b" : isOver ? "#10b981" : "#f59e0b"}
                      opacity={r.isProjected ? 0.4 : 0.9}
                      className="group-hover:opacity-100 transition-opacity"
                    />
                    <text 
                      x={x} 
                      y="255" 
                      fontSize="9" 
                      fill="#64748b" 
                      textAnchor="middle" 
                      className="font-mono font-semibold"
                    >
                      {r.day}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Hover Inspector Banner */}
          {hoveredDay ? (
            <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 flex items-center justify-between text-xs animate-in fade-in">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center font-mono">
                  {hoveredDay.day}
                </span>
                <div>
                  <h4 className="font-bold text-white">{hoveredDay.date} ({hoveredDay.dayName})</h4>
                  <span className="text-slate-400 text-[11px]">
                    Status: <strong className="text-emerald-400">{hoveredDay.isProjected ? "Projected" : "Actual Collected"}</strong>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-6 font-mono text-right">
                <div>
                  <span className="text-[10px] text-slate-400 block">Target</span>
                  <span className="font-bold text-slate-300">{formatINR(hoveredDay.target)}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Collection</span>
                  <span className="text-sm font-black text-emerald-400">{formatINR(hoveredDay.amount)}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Variance</span>
                  <span className={`text-xs font-bold ${hoveredDay.amount >= hoveredDay.target ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {hoveredDay.amount >= hoveredDay.target ? `+${formatINR(hoveredDay.amount - hoveredDay.target)}` : `-${formatINR(hoveredDay.target - hoveredDay.amount)}`}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-2 text-xs text-slate-500 italic">
              Hover over any daily bar to inspect detailed collection amount and variance.
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. VIEW CONTENT: COLLECTION HEATMAP CALENDAR                              */}
      {/* ========================================================================= */}
      {activeViewTab === 'calendar' && (
        <div className="rounded-3xl bg-white dark:bg-slate-900 p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-500" />
                October 2026 Collection Heatmap Calendar
              </h3>
              <p className="text-xs text-slate-500">Visual performance intensity across all 31 days</p>
            </div>
            
            {/* Color Legend */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-600"></span> High (&gt;₹2.8L)</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-500"></span> Healthy (₹2.2L - ₹2.8L)</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-amber-500"></span> Moderate (₹1.5L - ₹2.2L)</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-rose-500"></span> Low (&lt;₹1.5L)</span>
            </div>
          </div>

          {/* Calendar Grid (7 columns: Sun - Sat) */}
          <div className="grid grid-cols-7 gap-2.5">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, idx) => (
              <div key={idx} className="text-center font-bold text-xs text-slate-400 py-1 uppercase tracking-wider">
                {day}
              </div>
            ))}

            {/* Empty slots for Oct 1 (Oct 1 2026 is Thursday -> 4 empty slots: Sun, Mon, Tue, Wed) */}
            {[0, 1, 2, 3].map(e => (
              <div key={`empty-${e}`} className="h-24 rounded-2xl bg-slate-50/50 dark:bg-slate-950/20 border border-transparent"></div>
            ))}

            {/* 31 Calendar Days */}
            {dailyCollectionRecords.map((r) => {
              const isHigh = r.amount >= 280000;
              const isHealthy = r.amount >= 220000 && r.amount < 280000;
              const isModerate = r.amount >= 150000 && r.amount < 220000;
              const isLow = r.amount < 150000;
              const isToday = r.day === collectionOverviewConfig.currentDay;

              return (
                <div
                  key={r.day}
                  onMouseEnter={() => setHoveredDay(r)}
                  onMouseLeave={() => setHoveredDay(null)}
                  className={`h-24 p-2.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isToday 
                      ? 'ring-2 ring-emerald-400 shadow-md' 
                      : ''
                  } ${
                    r.isProjected
                      ? 'bg-slate-100/60 dark:bg-slate-950/40 border-dashed border-slate-300 dark:border-slate-800'
                      : isHigh
                        ? 'bg-emerald-500/15 border-emerald-500/40 hover:bg-emerald-500/25'
                        : isHealthy
                          ? 'bg-emerald-500/10 border-emerald-500/30 hover:bg-emerald-500/20'
                          : isModerate
                            ? 'bg-amber-500/10 border-amber-500/30 hover:bg-amber-500/20'
                            : 'bg-rose-500/10 border-rose-500/30 hover:bg-rose-500/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200">
                      {r.day}
                    </span>
                    {isToday && (
                      <span className="text-[9px] font-bold bg-emerald-500 text-white px-1.5 py-0.2 rounded-full">
                        Today
                      </span>
                    )}
                  </div>

                  <div>
                    <span className="text-xs font-black block text-slate-900 dark:text-white truncate">
                      {formatINR(r.amount)}
                    </span>
                    <span className="text-[10px] text-slate-500 block truncate">
                      {r.isProjected ? "Est. Forecast" : `${r.dayName}`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. VIEW CONTENT: CENTER & TEAM LEADERBOARD                                */}
      {/* ========================================================================= */}
      {activeViewTab === 'leaderboard' && (
        <div className="rounded-3xl bg-white dark:bg-slate-900 p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-500" />
                Collection Executive Leaderboard & Performance
              </h3>
              <p className="text-xs text-slate-500">Individual targets, collected totals, and recovery efficiency</p>
            </div>
            <span className="text-xs text-slate-400">5 Regional Leads Active</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase text-[10px]">
                  <th className="py-3 px-4">Rank & Executive</th>
                  <th className="py-3 px-4">Center / Region</th>
                  <th className="py-3 px-4">Monthly Target</th>
                  <th className="py-3 px-4">Collected Total</th>
                  <th className="py-3 px-4">Achievement %</th>
                  <th className="py-3 px-4">Recovery Rate</th>
                  <th className="py-3 px-4 text-right">Performance Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {collectionLeaderboard.map((lead) => (
                  <tr key={lead.rank} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/40 transition-colors">
                    <td className="py-3.5 px-4 flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono font-bold text-xs ${
                        lead.rank === 1 ? 'bg-amber-400 text-slate-950' : lead.rank === 2 ? 'bg-slate-300 text-slate-900' : 'bg-slate-700 text-slate-200'
                      }`}>
                        {lead.rank}
                      </span>
                      <img src={lead.avatar} alt={lead.name} className="w-8 h-8 rounded-lg object-cover ring-1 ring-slate-700" />
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white block">{lead.name}</span>
                        <span className="text-[10px] text-slate-400">{lead.role}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-slate-700 dark:text-slate-300">
                      {lead.center}
                    </td>

                    <td className="py-3.5 px-4 font-mono text-slate-600 dark:text-slate-400">
                      {formatINR(lead.target)}
                    </td>

                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900 dark:text-white">
                      {formatINR(lead.collected)}
                    </td>

                    <td className="py-3.5 px-4 font-mono font-bold">
                      <span className={lead.achievement >= 100 ? 'text-emerald-500' : 'text-blue-500'}>
                        {lead.achievement}%
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-slate-600 dark:text-slate-300">
                      {lead.recoveryRate}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        lead.achievement >= 110 
                          ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30' 
                          : lead.achievement >= 100 
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' 
                            : 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 8. VIEW CONTENT: POWER BI DAX SPEC                                        */}
      {/* ========================================================================= */}
      {activeViewTab === 'powerbi' && (
        <div className="rounded-3xl bg-white dark:bg-slate-900 p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Code2 className="w-5 h-5 text-teal-500" />
                Power BI Enterprise DAX Expressions & Color Spec
              </h3>
              <p className="text-xs text-slate-500">Ready-to-use DAX measures for Microsoft Power BI Desktop & Service</p>
            </div>
            <span className="text-xs font-mono bg-teal-500/15 text-teal-400 border border-teal-500/30 px-3 py-1 rounded-full">
              Power BI DAX v2026.1
            </span>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                1. Month-to-Date (MTD) Collection Measure:
              </span>
              <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-emerald-400 overflow-x-auto">
{`Total_MTD_Collection = 
CALCULATE(
    SUM(Daily_Collections[Amount]),
    DATESMTD('Calendar'[Date])
)`}
              </pre>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                2. Required Run Rate (RRR) per Remaining Day:
              </span>
              <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-cyan-400 overflow-x-auto">
{`Required_Run_Rate = 
VAR MonthlyTarget = [Monthly_Target_Measure]
VAR CurrentMTD = [Total_MTD_Collection]
VAR OutstandingGap = MonthlyTarget - CurrentMTD
VAR RemainingDays = 
    COUNTROWS(
        FILTER(
            ALL('Calendar'),
            'Calendar'[Month] = MAX('Calendar'[Month]) && 
            'Calendar'[Date] > TODAY()
        )
    )
RETURN
    IF(RemainingDays > 0, DIVIDE(OutstandingGap, RemainingDays, 0), 0)`}
              </pre>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                3. Executive Traffic Light Status (Green / Amber / Red):
              </span>
              <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-amber-400 overflow-x-auto">
{`Collection_Status_KPI = 
VAR ProjectedTotal = [Projected_Month_End_Collection]
VAR TargetAmt = [Monthly_Target_Measure]
RETURN
    SWITCH(
        TRUE(),
        ProjectedTotal >= TargetAmt, "#10b981",  // Green
        ProjectedTotal >= TargetAmt * 0.95, "#f59e0b", // Amber
        "#ef4444" // Red (Critical Alert)
    )`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 9. EXECUTIVE SUMMARY & AI INSIGHTS ACCORDION                              */}
      {/* ========================================================================= */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800/80 shadow-xl space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Executive Recovery Summary & Strategic Focus
            </h3>
          </div>
          <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            Auto-Generated Insights
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300 leading-relaxed pt-1">
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></span>
              <p>
                <strong>Daily Recovery Velocity:</strong> Today's collection reached <strong>{formatINR(kpis.todayCollection)}</strong>, up <strong>+{kpis.dayOnDayGrowth}%</strong> compared to yesterday ({formatINR(kpis.yesterdayCollection)}), with strong momentum from Bangalore HQ and Dubai cohorts.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></span>
              <p>
                <strong>Target Milestones:</strong> MTD recovery stands at <strong>{formatLakhs(kpis.mtdCollection)}</strong> ({kpis.achievementPercent}% of monthly target), putting DV Analytics <strong>+₹2.4L ahead</strong> of linear target pacing.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></span>
              <p>
                <strong>Month-End Projection:</strong> At current daily run rate of <strong>{formatINR(kpis.dailyRunRate)}/day</strong>, expected month-end collection is projected at <strong>{formatLakhs(kpis.projectedMonthEnd)}</strong> (a surplus of {formatLakhs(kpis.projectedSurplus)} over target).
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0"></span>
              <p>
                <strong>Recommended Management Focus:</strong> Prioritize follow-ups for APIDS Batch 202606 installment balances in Online Global cohorts to ensure remaining <strong>{formatLakhs(kpis.outstandingGap)}</strong> gap closes by Oct 29.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
