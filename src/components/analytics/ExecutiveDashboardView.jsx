import React, { useState } from 'react';
import { 
  Building, 
  DollarSign, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle2, 
  Award, 
  Users, 
  Calendar, 
  BarChart3, 
  Activity, 
  AlertTriangle, 
  Sparkles, 
  PieChart as PieIcon, 
  Compass, 
  ArrowUpRight,
  TrendingDown
} from 'lucide-react';
import { executiveDashboardData, currencyINR, formatLakhsCr } from '../../data/analyticsSuiteData';

export default function ExecutiveDashboardView({ initialSubTab = 'director', showToast }) {
  const [activeTab, setActiveTab] = useState(initialSubTab); // 'director', 'revenue', 'health'
  const { directorOverview, revenueAnalytics, instituteHealthScore } = executiveDashboardData;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* ========================================================================= */}
      {/* 1. HERO BANNER                                                            */}
      {/* ========================================================================= */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-950 p-6 border border-slate-800/80 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Executive Leadership Telemetry
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/10 text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Score: 92.8 / 100 (Grade A+ Elite)
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight">
              Executive Directorate & Institutional Health Index
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Consolidated governance cockpit for institutional performance, multi-center revenue realization, gross margins, and composite accreditation metrics.
            </p>
          </div>

          {/* Subtab Selector */}
          <div className="flex flex-wrap items-center gap-2 bg-[#0c182c]/80 p-1.5 rounded-2xl border border-white/10 shrink-0">
            <button
              onClick={() => setActiveTab('director')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'director'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Building className="w-3.5 h-3.5" />
              <span>Director Overview</span>
            </button>
            <button
              onClick={() => setActiveTab('revenue')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'revenue'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>Revenue Analytics</span>
            </button>
            <button
              onClick={() => setActiveTab('health')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'health'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Institute Health Score</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. TAB 1: DIRECTOR OVERVIEW                                               */}
      {/* ========================================================================= */}
      {activeTab === 'director' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 shadow-xl backdrop-blur-md">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Enrolments</span>
              <div className="text-2xl font-black text-white mt-1">
                {directorOverview.kpis.totalActiveStudents} Active
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                All-time alumni: {directorOverview.kpis.allTimeAlumni.toLocaleString()}
              </div>
            </div>

            <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 shadow-xl backdrop-blur-md">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Fee Pipeline</span>
              <div className="text-2xl font-black text-emerald-400 mt-1">
                {formatLakhsCr(directorOverview.kpis.totalPipelineRevenue)}
              </div>
              <div className="text-[11px] text-emerald-300 font-semibold mt-1">
                Realized MTD: {formatLakhsCr(directorOverview.kpis.realizedInflowMTD)}
              </div>
            </div>

            <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 shadow-xl backdrop-blur-md">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Operating Margin</span>
              <div className="text-2xl font-black text-cyan-400 mt-1">
                {directorOverview.kpis.netOperatingMarginPct}%
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                OpEx MTD: {formatLakhsCr(directorOverview.kpis.operatingExpenditureMTD)}
              </div>
            </div>

            <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 shadow-xl backdrop-blur-md">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">SLA Compliance</span>
              <div className="text-2xl font-black text-purple-400 mt-1">
                {directorOverview.kpis.academicSlaCompliancePct}%
              </div>
              <div className="text-[11px] text-purple-300 font-semibold mt-1">
                Placement Success: {directorOverview.kpis.placementSuccessRatePct}%
              </div>
            </div>
          </div>

          {/* Strategic Departmental Pillars */}
          <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 shadow-xl space-y-4">
            <h3 className="font-bold text-white text-sm">Strategic Departmental Governance Radar</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {directorOverview.strategicPillars.map((p) => (
                <div key={p.name} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">{p.name}</span>
                  <div className="text-xl font-black text-white font-mono">{p.score}%</div>
                  <div className="text-[10px] text-emerald-400 font-semibold">{p.status}</div>
                  <div className="text-[9px] text-slate-400 pt-1 border-t border-slate-800">
                    Lead: {p.lead}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Macro Institutional Balance Sheet */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 shadow-xl space-y-3">
              <h3 className="font-bold text-white text-sm">Consolidated Financial Architecture</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-2 border-b border-slate-800">
                  <span className="text-slate-300">Gross All-Time Realized Inflow</span>
                  <span className="font-mono font-bold text-emerald-400">{formatLakhsCr(directorOverview.financialSummary.grossInflowFY26)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-800">
                  <span className="text-slate-300">Bhubaneswar Center Total</span>
                  <span className="font-mono font-bold text-blue-400">{formatLakhsCr(directorOverview.financialSummary.bhubaneswarBranchRevenue)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-800">
                  <span className="text-slate-300">Bangalore Center Total</span>
                  <span className="font-mono font-bold text-indigo-400">{formatLakhsCr(directorOverview.financialSummary.bangaloreBranchRevenue)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-800">
                  <span className="text-slate-300">Average Realized Per Student</span>
                  <span className="font-mono font-bold text-white">{currencyINR(directorOverview.financialSummary.avgRevenuePerStudent)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-300">Refund / Reversal Rate</span>
                  <span className="font-mono font-bold text-emerald-400">{directorOverview.financialSummary.refundReversalRatePct}% (Ultra Low)</span>
                </div>
              </div>
            </div>

            {/* Strategic Notes */}
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 shadow-xl space-y-3">
              <h3 className="font-bold text-white text-sm">Directorate Priorities & Key Levers</h3>
              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-slate-200">
                  <strong className="text-blue-300 block mb-0.5">1. Placement Velocity Milestone:</strong>
                  Achieved 87.1% placement conversion. Top recruiter Mu Sigma absorbed 24 data science candidates at an average of ₹8.5 LPA.
                </div>
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-slate-200">
                  <strong className="text-emerald-300 block mb-0.5">2. Cash Flow Health:</strong>
                  Collection efficiency maintained at 92.4%. Remaining ₹16.59L October target gap is covered by ₹18.5L in low-risk &lt;15 day aging accounts.
                </div>
                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-slate-200">
                  <strong className="text-purple-300 block mb-0.5">3. GenAI Program Expansion:</strong>
                  MPGA (Machine Learning & GenAI) launched with 34 students; target margin projected at 71.0% with strong enterprise hiring demand.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. TAB 2: REVENUE ANALYTICS                                               */}
      {/* ========================================================================= */}
      {activeTab === 'revenue' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 shadow-xl backdrop-blur-md">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Cash Realized (MTD)</span>
              <div className="text-2xl font-black text-emerald-400 mt-1">
                {formatLakhsCr(revenueAnalytics.cashVsAccrual.cashCollectedMTD)}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">Bank verified receipts</div>
            </div>

            <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 shadow-xl backdrop-blur-md">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Accrual Committed</span>
              <div className="text-2xl font-black text-white mt-1">
                {formatLakhsCr(revenueAnalytics.cashVsAccrual.accrualCommittedFee)}
              </div>
              <div className="text-[11px] text-blue-400 font-semibold mt-1">
                {revenueAnalytics.cashVsAccrual.accrualRealizationRate}% Realization Rate
              </div>
            </div>

            <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 shadow-xl backdrop-blur-md">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Deferred Receivable</span>
              <div className="text-2xl font-black text-amber-400 mt-1">
                {formatLakhsCr(revenueAnalytics.cashVsAccrual.deferredReceivable)}
              </div>
              <div className="text-[11px] text-amber-300 mt-1">Scheduled in Next Cycle</div>
            </div>

            <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 shadow-xl backdrop-blur-md">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">LTV / CAC Ratio</span>
              <div className="text-2xl font-black text-purple-400 mt-1">
                15.5x
              </div>
              <div className="text-[11px] text-purple-300 font-semibold mt-1">
                CAC ₹4.2K vs LTV ₹65K
              </div>
            </div>
          </div>

          {/* Program Profitability Breakdown */}
          <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 overflow-hidden shadow-xl">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white text-sm">Program-Wise Revenue & Gross Margin Matrix</h3>
                <p className="text-xs text-slate-400">Total gross revenue, unit gross margin %, enrollment volume, and acquisition metrics</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-300">
                <thead className="bg-[#0b1728] text-slate-400 uppercase text-[10px] tracking-wider font-semibold border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Course Code & Description</th>
                    <th className="py-3 px-3 text-right">Consolidated Revenue</th>
                    <th className="py-3 px-3 text-center">Gross Margin %</th>
                    <th className="py-3 px-3 text-center">Enrolled Alumni</th>
                    <th className="py-3 px-3 text-right">CAC (Acquisition)</th>
                    <th className="py-3 px-3 text-right">LTV (Lifetime Value)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {revenueAnalytics.courseProfitability.map((c) => (
                    <tr key={c.course} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-4 font-bold text-white">
                        <span className="text-orange-400 font-mono mr-2">{c.course}</span>
                        {c.course === 'APIDS' ? 'Advanced Predictive Intelligence & Data Science' : c.course === 'APIDA' ? 'Advanced Predictive Analytics' : c.course === 'FDE' ? 'Fullstack Data Engineering' : c.course === 'MPGA' ? 'Machine Learning & GenAI' : 'Data Analytics Specialization'}
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-emerald-400">{c.revenue}</td>
                      <td className="py-3 px-3 text-center">
                        <span className="px-2 py-0.5 rounded font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                          {c.marginPct}%
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center font-mono">{c.enrolled.toLocaleString()}</td>
                      <td className="py-3 px-3 text-right font-mono text-slate-400">{c.cac}</td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-white">{c.ltv}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. TAB 3: INSTITUTE HEALTH SCORE                                          */}
      {/* ========================================================================= */}
      {activeTab === 'health' && (
        <div className="space-y-6">
          {/* Main Composite Score Showcase Card */}
          <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-[#0e1e38] to-slate-950 p-6 border border-emerald-500/30 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Institutional Composite Index
                </span>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl lg:text-5xl font-black text-white tracking-tight">
                    {instituteHealthScore.compositeScore}
                  </span>
                  <span className="text-xl text-slate-400 font-bold">/ 100</span>
                  <span className="px-3 py-1 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20">
                    Grade A+ (Elite Institute)
                  </span>
                </div>
                <p className="text-xs text-slate-300 max-w-xl">
                  Evaluated across Academic SLA, Placement Velocity, Financial Collection Realization, Student NPS, and Infrastructure Uptime.
                </p>
              </div>

              {/* Historical Trajectory Pills */}
              <div className="bg-slate-900/80 p-4 rounded-2xl border border-white/10 shrink-0 space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">6-Month Score Momentum</span>
                <div className="flex items-end gap-2 h-16 pt-2">
                  {instituteHealthScore.historicalTrend.map((t) => (
                    <div key={t.month} className="text-center space-y-1">
                      <div 
                        className="w-8 rounded-t-lg bg-emerald-500/80 flex items-center justify-center text-[9px] font-mono font-bold text-white transition-all hover:bg-emerald-400"
                        style={{ height: `${Math.max(20, (t.score - 80) * 4)}px` }}
                      >
                        {t.score}
                      </div>
                      <span className="text-[8px] text-slate-400 block truncate w-8">{t.month.split(' ')[0]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 5 Pillars Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {instituteHealthScore.pillars.map((pillar) => (
              <div key={pillar.id} className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300">{pillar.name}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {pillar.status}
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-black text-white font-mono">{pillar.score}</span>
                  <span className="text-[10px] text-slate-400 font-mono">Weight: {pillar.weightPct}%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" style={{ width: `${pillar.score}%` }} />
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>

          {/* Executive Strategic Recommendations */}
          <div className="rounded-2xl bg-gradient-to-r from-emerald-950/30 via-slate-900 to-blue-950/30 p-5 border border-emerald-500/30 shadow-xl space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Strategic Recommendations to Elevate Composite Index to &gt;95.0
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {instituteHealthScore.recommendations.map((rec, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900/80 border border-white/5 text-xs text-slate-300 flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
