import React from 'react';
import { 
  TrendingUp, 
  Target, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowUpRight, 
  Sparkles, 
  ShieldAlert, 
  Clock, 
  Users,
  Compass,
  PieChart as PieIcon,
  Layers,
  ArrowRight
} from 'lucide-react';
import { enhancedCollectionInsights, currencyINR, formatLakhsCr } from '../../data/analyticsSuiteData';

export default function EnhancedMonthlyCollectionInsights({ showToast }) {
  const { monthly } = enhancedCollectionInsights;

  return (
    <div className="space-y-4 mb-6">
      {/* Dynamic Headline Insight Alert Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-slate-950 p-4 border border-blue-500/40 shadow-xl backdrop-blur-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-blue-400 block">
                Monthly Revenue Performance & Velocity Cockpit • {monthly.month}
              </span>
              <p className="text-xs sm:text-sm font-semibold text-white mt-0.5">
                Month-to-Date collections reached <span className="text-emerald-400 font-bold">{monthly.achievementPct}%</span> of monthly target ({formatLakhsCr(monthly.mtdCollection)} vs {formatLakhsCr(monthly.monthlyTarget)}). 
                Remaining gap: <span className="text-amber-300 font-bold">{formatLakhsCr(monthly.remainingGap)}</span> with <strong className="text-white">{monthly.workingDaysRemaining} working days left</strong>.
                Required daily velocity is <strong className="text-orange-400">{formatLakhsCr(monthly.requiredDailyRunRate)}/day</strong>.
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
            Paced for 109.8% Goal
          </span>
        </div>
      </div>

      {/* 4 Telemetry Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
        <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-3.5 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Month-End Projection</span>
          <div className="text-base font-bold text-emerald-400 mt-1 flex items-baseline gap-2">
            <span>{formatLakhsCr(monthly.projectedMonthEnd)}</span>
            <span className="text-[11px] text-emerald-300 font-mono">
              ({monthly.expectedTargetAchievementPct}%)
            </span>
          </div>
          <span className="text-[10px] text-slate-400 mt-0.5 block truncate" title={monthly.projectionCalculationBasis}>
            Basis: Actual run-rate {formatLakhsCr(monthly.currentActualDailyRunRate)}/day
          </span>
        </div>

        <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-3.5 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">MoM Elapsed Growth</span>
          <div className="text-base font-bold text-cyan-400 mt-1 flex items-baseline gap-1">
            <span>+{monthly.priorMonthElapsedComparison.momGrowthPct}%</span>
            <span className="text-[11px] text-slate-400 font-normal">vs Sep (Day 20)</span>
          </div>
          <span className="text-[10px] text-emerald-400 mt-0.5 block font-mono">
            +{formatLakhsCr(monthly.priorMonthElapsedComparison.momGrowthAmount)} gain
          </span>
        </div>

        <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-3.5 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Required Run Rate</span>
          <div className="text-base font-bold text-orange-400 mt-1">
            {formatLakhsCr(monthly.requiredDailyRunRate)} / day
          </div>
          <span className="text-[10px] text-slate-400 mt-0.5 block">
            Across {monthly.workingDaysRemaining} remaining collection days
          </span>
        </div>

        <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-3.5 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Actual Run Rate</span>
          <div className="text-base font-bold text-emerald-400 mt-1">
            {formatLakhsCr(monthly.currentActualDailyRunRate)} / day
          </div>
          <span className="text-[10px] text-emerald-300 mt-0.5 block font-mono">
            Surplus: +{formatLakhsCr(monthly.currentActualDailyRunRate - monthly.requiredDailyRunRate)}/day
          </span>
        </div>
      </div>

      {/* Overdue Aging Buckets & Priority Closing Plan */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Overdue Aging Buckets */}
        <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Overdue Aging Buckets & Probability Recovery
            </h4>
            <span className="text-[10px] text-slate-400 font-mono">Total Outstanding: ₹39.9L</span>
          </div>

          <div className="space-y-2.5">
            {monthly.overdueAgingBuckets.map((b) => (
              <div key={b.bucket} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-300 font-mono">{b.bucket}</span>
                    <span className="text-[10px] text-slate-400 font-normal">({b.status})</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-white font-bold">{formatLakhsCr(b.totalAmount)}</span>
                    <span className="text-[10px] text-emerald-400 ml-2 font-mono">({b.recoveryRate}% prob)</span>
                  </div>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${b.recoveryRate}%`, backgroundColor: b.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Priority Actions to Close Gap */}
        <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Priority Actions to Secure October Target
            </h4>
            <span className="text-[10px] text-emerald-400 font-bold">Action Roadmap</span>
          </div>

          <div className="space-y-2 text-xs">
            {monthly.priorityClosingActions.map((action, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-2.5 text-slate-300">
                <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-300 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <span className="leading-snug">{action}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
