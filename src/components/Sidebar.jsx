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
  student
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
      className={`fixed top-0 left-0 h-screen bg-slate-950 text-slate-200 border-r border-slate-800/80 z-40 flex flex-col transition-all duration-300 ease-in-out ${
        collapsed ? 'w-20' : 'w-72'
      }`}
    >
      {/* Top Brand Logo */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-md">
        <Logo collapsed={collapsed} />
      </div>

      {/* Student Profile Card (Matching original LMS APIDS 202606 card) */}
      <div className="p-3 border-b border-slate-800/80">
        <div className={`rounded-xl bg-gradient-to-b from-slate-900 to-slate-900/90 border border-slate-800 p-3 transition-all ${
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
              className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl font-bold text-xs tracking-wider transition-all group relative ${
                isActive 
                  ? 'bg-white text-slate-950 shadow-md font-bold' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/90 font-medium'
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
                        : 'bg-slate-800 text-orange-400 border border-slate-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}

              {/* Active pill dot on left */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-white rounded-r-full"></div>
              )}
            </button>
          );
        })}
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
