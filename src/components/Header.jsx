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
  Sparkles
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
  selectedBatch,
  setSelectedBatch
}) {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 transition-all shadow-xs">
      {/* Left side: Hamburger Toggle & Search */}
      <div className="flex items-center gap-3 md:gap-4 flex-1">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
          title="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Bar */}
        <div className="hidden md:flex items-center relative max-w-md w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search modules, assignments, topics (e.g. XLOOKUP, SQL)..."
            className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-xs pl-9 pr-4 py-2 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all placeholder:text-slate-400"
          />
          <kbd className="absolute right-2.5 text-[10px] bg-slate-200/80 text-slate-600 px-1.5 py-0.5 rounded font-mono pointer-events-none">
            Ctrl+K
          </kbd>
        </div>
      </div>

      {/* Right side: Top action buttons matching original LMS icons & logo */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Live Zoom Classroom Button */}
        <button
          onClick={onOpenZoom}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-bold transition-all shadow-2xs cursor-pointer active:scale-95"
          title="Join Live Zoom Meeting (DVMENTOR4 Room)"
        >
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
          <span className="hidden sm:inline">Join Live</span>
          <Video className="w-3.5 h-3.5" />
        </button>
        {/* Support Hotline Icon Button */}
        <button
          onClick={onOpenSupport}
          className="p-2 rounded-xl text-slate-600 hover:text-orange-600 hover:bg-orange-50/60 transition-colors relative"
          title="Student Support & Hotline"
        >
          <PhoneCall className="w-4 h-4" />
        </button>

        {/* Live Chat / Mentorship Icon Button */}
        <button
          onClick={onOpenChat}
          className="p-2 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50/60 transition-colors relative"
          title="Live Mentor Chat"
        >
          <MessageSquare className="w-4 h-4" />
        </button>

        {/* Class Calendar & Schedule Icon Button */}
        <button
          onClick={onOpenSchedule}
          className="p-2 rounded-xl text-slate-600 hover:text-emerald-600 hover:bg-emerald-50/60 transition-colors relative"
          title="Class Schedule & Timetable"
        >
          <CalendarDays className="w-4 h-4" />
        </button>

        {/* Mail / Notifications with 250 badge (matches original LMS) */}
        <button
          onClick={onOpenNotifications}
          className="p-2 rounded-xl text-slate-600 hover:text-orange-600 hover:bg-orange-50/60 transition-colors relative"
          title="Student Inbox & Announcements"
        >
          <Mail className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white font-bold text-[10px] px-1.5 py-0.2 rounded-full shadow-sm animate-pulse">
            250
          </span>
        </button>

        {/* Divider */}
        <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>

        {/* Admin Portal Direct Access Button */}
        {onOpenAdmin && (
          <button
            onClick={onOpenAdmin}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95 group"
            title="Switch to Admin Access Portal (Session.aspx, Reg.aspx, Fee.aspx)"
          >
            <Settings className="w-3.5 h-3.5 text-teal-400 group-hover:rotate-45 transition-transform" />
            <span>Admin Access</span>
          </button>
        )}

        {/* Student Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2.5 p-1.5 pr-2.5 rounded-xl hover:bg-slate-100 transition-colors group"
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
                  onClick={() => { setProfileOpen(false); onNavigateToProgressReport?.(); }}
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
                <button className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 text-xs font-semibold flex items-center gap-2.5">
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
