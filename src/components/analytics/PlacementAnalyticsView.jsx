import React, { useState } from 'react';
import { 
  Briefcase, 
  Award, 
  TrendingUp, 
  Building2, 
  CheckCircle2, 
  Calendar, 
  Users, 
  Target, 
  Sparkles, 
  ChevronRight, 
  ArrowUpRight, 
  BarChart3,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { placementAnalyticsData } from '../../data/analyticsSuiteData';

export default function PlacementAnalyticsView({ initialSubTab = 'placement', showToast }) {
  const [activeTab, setActiveTab] = useState(initialSubTab); // 'placement', 'interview'
  const { placementDashboard, interviewTracking } = placementAnalyticsData;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* ========================================================================= */}
      {/* 1. HERO BANNER                                                            */}
      {/* ========================================================================= */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-950 p-6 border border-slate-800/80 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Corporate Relations & Career Defense
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/10 text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                87.1% Placement Conversion
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight">
              Placement Velocity & Mock Interview Analytics
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Real-time monitoring of corporate drives, CTC distribution bands, recruiter hiring partners, and mock interview competency scores.
            </p>
          </div>

          {/* Subtab Selector */}
          <div className="flex flex-wrap items-center gap-2 bg-[#0c182c]/80 p-1.5 rounded-2xl border border-white/10 shrink-0">
            <button
              onClick={() => setActiveTab('placement')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'placement'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Placement Dashboard</span>
            </button>
            <button
              onClick={() => setActiveTab('interview')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'interview'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>Interview Tracking</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. TAB 1: PLACEMENT DASHBOARD                                             */}
      {/* ========================================================================= */}
      {activeTab === 'placement' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 shadow-xl backdrop-blur-md">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Placed</span>
              <div className="text-2xl font-black text-emerald-400 mt-1">
                {placementDashboard.kpis.totalPlaced} <span className="text-xs text-slate-400 font-normal">/ {placementDashboard.kpis.eligibleCandidates}</span>
              </div>
              <div className="text-[11px] text-emerald-300 font-semibold mt-1">
                ✓ {placementDashboard.kpis.placementRatePct}% Success Rate
              </div>
            </div>

            <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 shadow-xl backdrop-blur-md">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Average CTC</span>
              <div className="text-2xl font-black text-white mt-1">
                ₹{placementDashboard.kpis.averageCtcLpa} LPA
              </div>
              <div className="text-[11px] text-blue-400 font-semibold mt-1">
                ↑ 14.2% YoY Package Growth
              </div>
            </div>

            <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 shadow-xl backdrop-blur-md">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Highest Package</span>
              <div className="text-2xl font-black text-pink-400 mt-1">
                ₹{placementDashboard.kpis.highestCtcLpa} LPA
              </div>
              <div className="text-[11px] text-slate-400 mt-1">Fractal Analytics Lead ML</div>
            </div>

            <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 shadow-xl backdrop-blur-md">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Hiring Partners</span>
              <div className="text-2xl font-black text-amber-400 mt-1">
                {placementDashboard.kpis.activeHiringPartners} Corporates
              </div>
              <div className="text-[11px] text-amber-300 font-semibold mt-1">
                {placementDashboard.kpis.ongoingCampusDrives} Ongoing Drives
              </div>
            </div>
          </div>

          {/* CTC Bands & Top Recruiters */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* CTC Brackets */}
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 shadow-xl space-y-4">
              <h3 className="font-bold text-white text-sm">Package Brackets Distribution (CTC)</h3>
              <div className="space-y-3">
                {placementDashboard.ctcDistribution.map((b) => (
                  <div key={b.bracket} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-300">{b.bracket}</span>
                      <span className="font-mono text-white font-bold">{b.count} Offers ({b.pct}%)</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${b.pct}%`, backgroundColor: b.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Role Split */}
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 shadow-xl space-y-4">
              <h3 className="font-bold text-white text-sm">Role & Competency Allocation</h3>
              <div className="space-y-3">
                {placementDashboard.roleDistribution.map((r) => (
                  <div key={r.role} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-orange-400" />
                      <span className="font-bold text-xs text-white">{r.role}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-xs text-emerald-400">{r.count} Placed</span>
                      <span className="text-[10px] text-slate-400 font-normal"> ({r.pct}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Recruiters Table */}
          <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 overflow-hidden shadow-xl">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white text-sm">Top Enterprise Recruiting Partners</h3>
                <p className="text-xs text-slate-400">Total hiring volume, average compensation, and industry sector</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-300">
                <thead className="bg-[#0b1728] text-slate-400 uppercase text-[10px] tracking-wider font-semibold border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Corporate Partner</th>
                    <th className="py-3 px-3">Industry Sector</th>
                    <th className="py-3 px-3 text-center">Hires Total</th>
                    <th className="py-3 px-3 text-right">Average Package</th>
                    <th className="py-3 px-4 text-center">Partnership Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {placementDashboard.topRecruiters.map((rec) => (
                    <tr key={rec.company} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-orange-400" />
                        <span>{rec.company}</span>
                      </td>
                      <td className="py-3 px-3 text-slate-300">{rec.sector}</td>
                      <td className="py-3 px-3 text-center font-mono font-bold text-emerald-400">{rec.hires} Students</td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-white">{rec.avgPackage}</td>
                      <td className="py-3 px-4 text-center">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          Active Tier 1
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. TAB 2: INTERVIEW TRACKING                                              */}
      {/* ========================================================================= */}
      {activeTab === 'interview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 shadow-xl backdrop-blur-md">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Mock Mocks Done</span>
              <div className="text-2xl font-black text-white mt-1">
                {interviewTracking.kpis.mockInterviewsConducted}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">Faculty & industry panel</div>
            </div>

            <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 shadow-xl backdrop-blur-md">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">1st-Attempt Pass</span>
              <div className="text-2xl font-black text-emerald-400 mt-1">
                {interviewTracking.kpis.clearedFirstAttemptPct}%
              </div>
              <div className="text-[11px] text-emerald-300 font-semibold mt-1">
                High readiness index
              </div>
            </div>

            <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 shadow-xl backdrop-blur-md">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Corporate Rounds</span>
              <div className="text-2xl font-black text-blue-400 mt-1">
                {interviewTracking.kpis.corporateInterviewsScheduled} Scheduled
              </div>
              <div className="text-[11px] text-blue-300 font-semibold mt-1">
                {interviewTracking.kpis.finalRoundsInProgress} in final round
              </div>
            </div>

            <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 shadow-xl backdrop-blur-md">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Offer Acceptance</span>
              <div className="text-2xl font-black text-purple-400 mt-1">
                {interviewTracking.kpis.offerAcceptanceRatePct}%
              </div>
              <div className="text-[11px] text-purple-300 font-semibold mt-1">
                Excellent candidate yield
              </div>
            </div>
          </div>

          {/* Competency Scores & Upcoming Drives */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 shadow-xl space-y-4">
              <h3 className="font-bold text-white text-sm">Technical Defense Competency Benchmarks</h3>
              <div className="space-y-3">
                {interviewTracking.competencyRatings.map((c) => (
                  <div key={c.competency} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-300">{c.competency}</span>
                      <span className="font-mono text-emerald-400 font-bold">{c.score}% <span className="text-[10px] text-slate-400 font-normal">(Bench: {c.benchmark}%)</span></span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${c.score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Drives Calendar */}
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 shadow-xl space-y-4">
              <h3 className="font-bold text-white text-sm">Immediate Corporate Hiring Drives Pipeline</h3>
              <div className="space-y-3">
                {interviewTracking.upcomingDrives.map((d) => (
                  <div key={d.company} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-white flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-orange-400" />
                        {d.company}
                      </span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {d.package}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-300">
                      Role: <strong className="text-white">{d.roles}</strong> • Openings: <strong className="text-orange-400">{d.vacancies}</strong>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800">
                      <span>Drive Date: {d.date}</span>
                      <span className="text-blue-400 font-semibold">{d.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
