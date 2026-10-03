import React from 'react';
import { 
  TrendingUp, 
  Target, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowUpRight, 
  PhoneCall, 
  Sparkles, 
  ShieldAlert, 
  Clock, 
  Users,
  ChevronRight,
  Send
} from 'lucide-react';
import { enhancedCollectionInsights, currencyINR } from '../../data/analyticsSuiteData';

export default function EnhancedDailyCollectionInsights({ onSelectStudent, showToast }) {
  const { daily } = enhancedCollectionInsights;

  return (
    <div className="space-y-4 mb-6">
      {/* Dynamic Headline Insight Alert Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-950 p-4 border border-emerald-500/40 shadow-xl backdrop-blur-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 block">
                Daily Recovery Intelligence Insight • {daily.date}
              </span>
              <p className="text-xs sm:text-sm font-semibold text-white mt-0.5">
                Today&apos;s collections reached <span className="text-emerald-400 font-bold">{daily.achievementPct}%</span> of target ({currencyINR(daily.actual)} vs target {currencyINR(daily.target)}). 
                {daily.surplus > 0 ? (
                  <span className="text-emerald-300 font-bold"> +{currencyINR(daily.surplus)} surplus. </span>
                ) : (
                  <span className="text-amber-300 font-bold"> {currencyINR(daily.remainingTarget)} remaining. </span>
                )}
                Prioritize <strong className="text-orange-400">{daily.priorityActionAccounts.length} overdue accounts</strong> with commitments due today.
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
            Target Achieved
          </span>
        </div>
      </div>

      {/* 4 Mini Telemetry Cards for Daily Insights */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
        <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-3.5 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">WoW Saturday Comparison</span>
          <div className="text-base font-bold text-white mt-1 flex items-baseline gap-2">
            <span>{currencyINR(daily.actual)}</span>
            <span className="text-[11px] text-emerald-400 font-mono flex items-center">
              <ArrowUpRight className="w-3 h-3" /> +{daily.prevComparableDay.variancePct}%
            </span>
          </div>
          <span className="text-[10px] text-slate-400 mt-0.5 block">vs {currencyINR(daily.prevComparableDay.amount)} (17 Oct)</span>
        </div>

        <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-3.5 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Due Today Recovery</span>
          <div className="text-base font-bold text-emerald-400 mt-1">
            {currencyINR(daily.paymentsDueToday.receivedAmount)}
          </div>
          <span className="text-[10px] text-slate-400 mt-0.5 block">
            {daily.paymentsDueToday.receivedCount} of {daily.paymentsDueToday.count} accounts realized
          </span>
        </div>

        <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-3.5 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Promise-To-Pay (PTP)</span>
          <div className="text-base font-bold text-cyan-400 mt-1">
            {daily.ptpCommitments.adherenceRate}% Adherence
          </div>
          <span className="text-[10px] text-slate-400 mt-0.5 block">
            {daily.ptpCommitments.honoredCount} Honored • {daily.ptpCommitments.missedCount} Missed
          </span>
        </div>

        <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-3.5 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Top Telecaller Today</span>
          <div className="text-base font-bold text-white mt-1 truncate">
            {daily.collectorLeaderboard[0].name}
          </div>
          <span className="text-[10px] text-emerald-400 mt-0.5 block font-mono">
            {currencyINR(daily.collectorLeaderboard[0].collected)} (PTP 100%)
          </span>
        </div>
      </div>

      {/* Priority Action Accounts & Collector Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Priority Action Queue */}
        <div className="lg:col-span-2 rounded-xl bg-slate-900/80 border border-slate-800 p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-orange-400" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Recommended Actions: High Priority Overdue & PTP Queue
              </h4>
            </div>
            <span className="text-[10px] font-mono text-slate-400">Prioritized by overdue age & risk</span>
          </div>

          <div className="divide-y divide-slate-800/60">
            {daily.priorityActionAccounts.map((act) => (
              <div key={act.id} className="py-2.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{act.student}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-orange-400 font-bold">{act.batch}</span>
                    <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                      act.risk === 'Critical' ? 'bg-red-500/20 text-red-300' : act.risk === 'High' ? 'bg-amber-500/20 text-amber-300' : 'bg-blue-500/20 text-blue-300'
                    }`}>
                      {act.risk} Risk
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5 flex flex-wrap items-center gap-2">
                    <span>Due: <strong className="text-emerald-400 font-mono">{currencyINR(act.dueAmount)}</strong></span>
                    <span>•</span>
                    <span>Age: <strong className="text-slate-300">{act.overdueDays} days</strong></span>
                    <span>•</span>
                    <span className="text-cyan-300">{act.ptpStatus}</span>
                  </div>
                  <p className="text-[11px] text-slate-300 italic mt-0.5">
                    → Action: {act.action} (Assigned: {act.telecaller})
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <a
                    href={`tel:${act.phone}`}
                    className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 transition-colors cursor-pointer"
                    title={`Call ${act.student}`}
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => showToast?.(`Payment reminder SMS & WhatsApp dispatched to ${act.student}`)}
                    className="px-2.5 py-1.5 rounded-lg bg-orange-500/20 text-orange-300 hover:bg-orange-500/30 text-[10px] font-bold transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Send className="w-3 h-3" />
                    <span>Send UPI Link</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Collector Performance Ranking */}
        <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-cyan-400" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Collector Leaderboard
              </h4>
            </div>
            <span className="text-[10px] text-emerald-400 font-bold">Today</span>
          </div>

          <div className="space-y-2 text-xs">
            {daily.collectorLeaderboard.map((c) => (
              <div key={c.id} className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{c.name}</span>
                  <span className="font-mono font-bold text-emerald-400">{currencyINR(c.collected)}</span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>Calls: <strong className="text-slate-200">{c.calls}</strong> • PTP: <strong className="text-cyan-300">{c.ptpHonored}</strong></span>
                  <span className="text-amber-400 font-bold">★ {c.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
