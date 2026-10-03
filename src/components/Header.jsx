import React, { useState } from 'react';
import { 
  Menu, 
  PhoneCall, 
  MessageSquare, 
  CalendarDays, 
  Mail, 
  ChevronDown, 
  Search, 
  Bell, 
  LogOut, 
  User, 
  Settings, 
  ExternalLink,
  HelpCircle,
  Sparkles,
  Video,
  BarChart3
} from 'lucide-react';
import Logo from './Logo';

export default function Header({ 
  collapsed, 
  setCollapsed, 
  student, 
  onOpenNotifications, 
  onOpenSchedule, 
  onOpenSupport,
  onOpenChat,
  onOpenAdmin,
  onOpenZoom,
  onNavigateToProgressReport,
  onNavigateToAccountProfile,
  onLogout,
  selectedBatch,
  setSelectedBatch
}) {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="h-16 bg-white/80 backdrop-blur-2xl border-b border-slate-200/80 sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 transition-all shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      {/* Left side: Hamburger Toggle & macOS Spotlight Search */}
      <div className="flex items-center gap-3 md:gap-4 flex-1">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="mac-btn mac-btn-glass p-2 rounded-xl text-slate-700 hover:text-slate-950 cursor-pointer"
          title="Toggle Navigation"
        >
          <Menu className="w-4 h-4" />
        </button>

        {/* macOS Spotlight Search Bar */}
        <div className="hidden md:flex items-center relative max-w-md w-full bg-slate-100/80 hover:bg-slate-100 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 rounded-full px-3.5 py-1.5 border border-slate-200/90 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] transition-all">
          <Search className="w-3.5 h-3.5 text-slate-400 pointer-events-none mr-2 shrink-0" />
          <input
            type="text"
            placeholder="Spotlight Search: modules, SQL, Python, Excel..."
            className="w-full bg-transparent text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none"
          />
          <kbd className="ml-2 text-[10px] bg-white border border-slate-300/80 text-slate-500 px-1.5 py-0.5 rounded shadow-2xs font-mono pointer-events-none shrink-0">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right side: Top action buttons with MacBook button mechanics */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Live Zoom Classroom Button - MacBook Live Push Button */}
        <button
          onClick={onOpenZoom}
          className="mac-btn mac-btn-live px-3.5 py-1.5 rounded-full text-xs font-bold gap-1.5 shadow-sm active:scale-95"
          title="Join Live Zoom Meeting (DVMENTOR4 Room)"
        >
          <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
          <span className="hidden sm:inline">Join Live</span>
          <Video className="w-3.5 h-3.5" />
        </button>

        {/* Support Hotline Icon Button */}
        <button
          onClick={onOpenSupport}
          className="mac-btn mac-btn-glass p-2 rounded-xl text-slate-600 hover:text-orange-600 transition-colors relative"
          title="Student Support & Hotline"
        >
          <PhoneCall className="w-3.5 h-3.5" />
        </button>

        {/* Live Chat / Mentorship Icon Button */}
        <button
          onClick={onOpenChat}
          className="mac-btn mac-btn-glass p-2 rounded-xl text-slate-600 hover:text-blue-600 transition-colors relative"
          title="Live Mentor Chat"
        >
          <MessageSquare className="w-3.5 h-3.5" />
        </button>

        {/* Class Calendar & Schedule Icon Button */}
        <button
          onClick={onOpenSchedule}
          className="mac-btn mac-btn-glass p-2 rounded-xl text-slate-600 hover:text-emerald-600 transition-colors relative"
          title="Class Schedule & Timetable"
        >
          <CalendarDays className="w-3.5 h-3.5" />
        </button>

        {/* Mail / Notifications with 250 badge (matches original LMS) */}
        <button
          onClick={onOpenNotifications}
          className="mac-btn mac-btn-glass p-2 rounded-xl text-slate-600 hover:text-orange-600 transition-colors relative"
          title="Student Inbox & Announcements"
        >
          <Mail className="w-3.5 h-3.5" />
          <span className="absolute -top-1 -right-1 bg-orange-600 text-white font-bold text-[9px] px-1.5 py-0.2 rounded-full shadow-xs animate-pulse">
            250
          </span>
        </button>

        {/* Divider */}
        <div className="h-6 w-px bg-slate-200/80 hidden sm:block"></div>

        {/* Admin Portal Direct Access Button - MacBook Branded Navy Push Button */}
        {onOpenAdmin && (
          <button
            onClick={onOpenAdmin}
            className="mac-btn mac-btn-navy px-3 py-1.5 rounded-xl text-xs font-bold gap-1.5 shadow-xs cursor-pointer group active:scale-95"
            title="Switch to Admin Access Portal (Session.aspx, Reg.aspx, Fee.aspx)"
          >
            <Settings className="w-3.5 h-3.5 text-orange-400 group-hover:rotate-45 transition-transform" />
            <span>Admin Access</span>
          </button>
        )}

        {/* Student Profile dropdown with MacBook Glass styling */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="mac-btn mac-btn-glass p-1 pl-1.5 pr-2.5 rounded-full flex items-center gap-2 group cursor-pointer"
          >
            <img
              src={student.avatar}
              alt={student.name}
              className="w-8 h-8 rounded-lg object-cover ring-2 ring-slate-200 group-hover:ring-orange-500/50 transition-all"
            />
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-800 tracking-tight leading-tight">
                {student.name}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                {student.courseCode}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 transition-transform" />
          </button>

          {/* Profile Dropdown Menu */}
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200/80 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-3 border-b border-slate-100">
                <p className="text-xs text-slate-400 font-medium">Signed in as</p>
                <p className="text-sm font-bold text-slate-900 truncate">{student.name}</p>
                <p className="text-xs text-orange-600 font-mono mt-0.5">{student.studentId}</p>
              </div>

              <div className="py-1 text-xs text-slate-700">
                {onOpenAdmin && (
                  <button 
                    onClick={() => { setProfileOpen(false); onOpenAdmin(); }} 
                    className="w-full text-left px-4 py-2 hover:bg-teal-50 text-teal-700 font-bold flex items-center gap-2.5 border-b border-slate-100 cursor-pointer"
                  >
                    <Settings className="w-4 h-4 text-teal-600" /> Switch to Admin Access
                  </button>
                )}
                {onNavigateToProgressReport && (
                  <button 
                    onClick={() => { setProfileOpen(false); onNavigateToProgressReport(); }} 
                    className="w-full text-left px-4 py-2 hover:bg-orange-50 text-orange-700 font-bold flex items-center gap-2.5 border-b border-slate-100 cursor-pointer"
                  >
                    <BarChart3 className="w-4 h-4 text-orange-600" /> Progress Report &amp; Grade Card
                  </button>
                )}
                <button 
                  onClick={() => { setProfileOpen(false); onNavigateToAccountProfile ? onNavigateToAccountProfile() : onNavigateToProgressReport?.(); }}
                  className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2.5 cursor-pointer"
                >
                  <User className="w-4 h-4 text-slate-400" /> My Profile &amp; Enrollment
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2.5">
                  <Settings className="w-4 h-4 text-slate-400" /> Account Preferences
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2.5">
                  <HelpCircle className="w-4 h-4 text-slate-400" /> LMS Help Documentation
                </button>
              </div>

              <div className="pt-1 border-t border-slate-100">
                <button 
                  onClick={() => {
                    setProfileOpen(false);
                    onLogout?.();
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 text-xs font-semibold flex items-center gap-2.5 cursor-pointer transition-colors"
                >
                  <LogOut className="w-4 h-4 text-red-500" /> Logout Session
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Corner DV Analytics Logo (As seen in the original LMS top right header) */}
        <div className="hidden xl:flex items-center pl-3 border-l border-slate-200">
          <Logo />
        </div>
      </div>
    </header>
  );
}
