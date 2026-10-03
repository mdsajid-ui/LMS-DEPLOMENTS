import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  ClipboardList, 
  FileCheck2, 
  FileText, 
  Briefcase, 
  Mail,
  ShieldCheck, 
  MessagesSquare, 
  Clock, 
  MessageSquarePlus, 
  Compass, 
  ChevronRight,
  LogOut,
  Calendar,
  Layers,
  Sparkles,
  Video,
  User,
  Bell,
  BarChart3,
  Settings
} from 'lucide-react';
import Logo from './Logo';

export default function Sidebar({ 
  currentTab, 
  setCurrentTab, 
  collapsed, 
  setCollapsed,
  student,
  onOpenAdmin
}) {
  const menuItems = [
    { id: 'welcome', label: 'WELCOME & OVERVIEW', icon: Compass, badge: 'Info' },
    { id: 'dashboard', label: 'DASHBOARD', icon: LayoutDashboard },
    { id: 'courses', label: 'COURSES', icon: BookOpen, badge: '4' },
    { id: 'assignments', label: 'ASSIGNMENTS', icon: ClipboardList, badge: '3' },
    { id: 'application-test', label: 'APPLICATION TEST', icon: FileCheck2 },
    { id: 'resume', label: 'RESUME', icon: FileText },
    { id: 'interview-prep', label: 'INTERVIEW PREP KIT', icon: Mail },
    { id: 'mock-interviews', label: 'MOCK INTERVIEWS', icon: ShieldCheck },
    { id: 'discussion-forum', label: 'DISCUSSION FORUM', icon: MessagesSquare },
    { id: 'attendance', label: 'ATTENDANCE', icon: Clock, badge: `${student.attendancePercent}%` },
    { id: 'feedback', label: 'FEEDBACK', icon: MessageSquarePlus },
    { id: 'class', label: 'CLASS', icon: Video, badge: 'Live' },
    { id: 'account-profile', label: 'ACCOUNT PROFILE', icon: User },
    { id: 'notification', label: 'NOTIFICATION', icon: Bell, badge: '250' },
    { id: 'progress-report', label: 'PROGRESS REPORT', icon: BarChart3 },
    { id: 'change-program', label: 'CHANGE PROGRAM', icon: Settings },
  ];

  return (
    <aside 
      className={`sticky top-0 h-screen shrink-0 bg-gradient-to-b from-[#081220] via-[#0d1d36] to-[#060c17] text-slate-200 border-r border-slate-800/70 z-30 flex flex-col transition-all duration-300 ease-in-out select-none shadow-xl ${
        collapsed ? 'w-20' : 'w-72'
      }`}
    >
      {/* macOS Window Controls & Top Brand Logo */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800/80 bg-[#081220]/75 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          {/* macOS Traffic Lights Window Controls */}
          {!collapsed ? (
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
          <Logo collapsed={collapsed} />
        </div>
      </div>

      {/* Student Profile Card (Matching original LMS APIDS 202606 card) */}
      <div className="p-3 border-b border-slate-800/80">
        <div className={`rounded-2xl bg-gradient-to-b from-[#0f2347]/70 to-[#0b1728]/80 border border-slate-700/60 p-3 transition-all shadow-inner ${
          collapsed ? 'flex flex-col items-center p-2' : ''
        }`}>
          <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0">
              <img 
                src={student.avatar} 
                alt={student.name}
                className="w-12 h-12 rounded-lg object-cover ring-2 ring-orange-500/40 shadow-sm"
              />
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-slate-950"></span>
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <span className="inline-block text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20 mb-1">
                  {student.batch}
                </span>
                <h4 className="text-xs font-bold text-white tracking-wide truncate">
                  {student.courseCode}
                </h4>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-0.5">
                  <Calendar className="w-3 h-3 text-slate-500" />
                  <span>{student.startDate}</span>
                </div>
              </div>
            )}
          </div>

          {!collapsed && (
            <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Student ID:</span>
              <span className="font-mono text-slate-200 font-medium">{student.studentId}</span>
            </div>
          )}
        </div>
      </div>

      {/* Nav Menu Items */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1 scrollbar-thin">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              title={collapsed ? item.label : undefined}
              className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl font-bold text-xs tracking-wider transition-all group relative cursor-pointer ${
                isActive 
                  ? 'bg-gradient-to-r from-white via-white to-slate-100 text-slate-950 shadow-[0_2px_10px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,1)] font-bold' 
                  : 'text-slate-300 hover:text-white hover:bg-white/10 font-medium active:scale-[0.98]'
              } ${collapsed ? 'justify-center px-0' : ''}`}
            >
              <Icon className={`w-4 h-4 flex-shrink-0 transition-transform group-hover:scale-110 ${
                isActive ? 'text-slate-950' : 'text-slate-400 group-hover:text-orange-400'
              }`} />
              
              {!collapsed && (
                <>
                  <span className="flex-1 text-left uppercase truncate">{item.label}</span>
                  {item.badge && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      isActive 
                        ? 'bg-slate-200 text-slate-900 font-bold' 
                        : 'bg-orange-500/15 text-orange-400 border border-orange-500/30'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}

              {/* Active pill dot on left - DV Brand Orange Gradient */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-gradient-to-b from-orange-400 via-orange-500 to-amber-500 rounded-r-full shadow-[0_0_8px_rgba(234,88,12,0.6)]"></div>
              )}
            </button>
          );
        })}

        {/* Switch to Admin Portal Button - MacBook Native Button Physics */}
        {onOpenAdmin && (
          <button
            onClick={onOpenAdmin}
            className="w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl mac-btn-navy border border-blue-500/40 text-blue-200 hover:text-white shadow-md transition-all group cursor-pointer mt-3"
            title="Switch to Admin Portal Control"
          >
            <Settings className="w-4 h-4 text-orange-400 shrink-0 group-hover:rotate-90 transition-transform" />
            {!collapsed && (
              <div className="flex-1 flex items-center justify-between text-left">
                <span className="font-semibold text-xs tracking-wide">ADMIN ACCESS</span>
                <span className="px-1.5 py-0.5 text-[9px] font-bold bg-orange-500 text-white rounded uppercase shadow-xs">
                  Portal
                </span>
              </div>
            )}
          </button>
        )}
      </div>

      {/* Bottom Footer Actions */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/80">
        <div className="flex items-center justify-between text-xs text-slate-400">
          {!collapsed ? (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[11px] text-slate-400">DV Portal 2.0 Live</span>
            </div>
          ) : null}
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <Layers className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
