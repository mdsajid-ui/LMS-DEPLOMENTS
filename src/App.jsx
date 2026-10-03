import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import NotificationModal from './components/NotificationModal';
import ScheduleModal from './components/ScheduleModal';
import SupportModal from './components/SupportModal';
import ZoomMeetingModal from './components/ZoomMeetingModal';
import SanviAssistant from './components/SanviAssistant';
import ErrorBoundary from './components/ErrorBoundary';

import WelcomePage from './pages/WelcomePage';
import DashboardPage from './pages/DashboardPage';
import CoursesPage from './pages/CoursesPage';
import SessionPage from './pages/SessionPage';
import AssignmentsPage from './pages/AssignmentsPage';
import ApplicationTestPage from './pages/ApplicationTestPage';
import ResumePage from './pages/ResumePage';
import InterviewPrepPage from './pages/InterviewPrepPage';
import MockInterviewsPage from './pages/MockInterviewsPage';
import DiscussionForumPage from './pages/DiscussionForumPage';
import AttendancePage from './pages/AttendancePage';
import FeedbackPage from './pages/FeedbackPage';
import ClassPage from './pages/ClassPage';
import AccountProfilePage from './pages/AccountProfilePage';
import NotificationPage from './pages/NotificationPage';
import ProgressReportPage from './pages/ProgressReportPage';
import ChangeProgramPage from './pages/ChangeProgramPage';
import AdminPortalPage from './pages/AdminPortalPage';

import { studentProfile } from './data/mockData';

export default function App() {
  const checkIsAdminUrl = () => {
    const hash = window.location.hash.toLowerCase();
    const search = window.location.search.toLowerCase();
    const pathname = window.location.pathname.toLowerCase();
    return hash.includes('admin') || search.includes('admin') || pathname.includes('/admin');
  };

  const [isAdminPortal, setIsAdminPortal] = useState(() => checkIsAdminUrl());

  useEffect(() => {
    const handleUrlChange = () => {
      setIsAdminPortal(checkIsAdminUrl());
    };
    window.addEventListener('hashchange', handleUrlChange);
    window.addEventListener('popstate', handleUrlChange);
    return () => {
      window.removeEventListener('hashchange', handleUrlChange);
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, []);

  const handleOpenAdmin = () => {
    window.location.hash = '/admin/Reg.aspx';
    setIsAdminPortal(true);
  };

  const handleBackToStudentLms = () => {
    window.location.hash = '';
    history.pushState("", document.title, window.location.pathname + window.location.search);
    setIsAdminPortal(false);
  };

  const [currentTab, setCurrentTab] = useState('welcome');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState('BATCH 202606');
  const [selectedSubject, setSelectedSubject] = useState('EXCEL BASE AND ADVANCED');

  // Modals state
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [supportTab, setSupportTab] = useState('hotline');
  const [sanviAssistantOpen, setSanviAssistantOpen] = useState(false);
  const [zoomModalOpen, setZoomModalOpen] = useState(false);

  const handleOpenChat = () => {
    // Open Sanvi Voice AI Assistant directly
    setSanviAssistantOpen(true);
  };

  const handleOpenSupport = () => {
    setSupportTab('hotline');
    setSupportOpen(true);
  };

  const handleSelectSubject = (subject) => {
    setSelectedSubject(subject.name);
    setCurrentTab('session');
  };

  if (isAdminPortal) {
    return (
      <ErrorBoundary onReset={handleBackToStudentLms}>
        <AdminPortalPage onBackToStudentLms={handleBackToStudentLms} />
        {/* Floating Quick Switcher Pill (Admin Mode) */}
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-slate-950/90 text-white p-1.5 pl-3.5 rounded-full shadow-2xl border border-teal-500/50 backdrop-blur-md text-xs select-none animate-in fade-in duration-300">
          <div className="flex items-center gap-1.5 pr-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[11px] font-semibold text-teal-300">Admin Access Active</span>
          </div>
          <button
            onClick={handleBackToStudentLms}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs shadow-md transition-all cursor-pointer active:scale-95"
            title="Return to Student LMS to verify student reflection"
          >
            <span>View Student LMS ➔</span>
          </button>
        </div>
      </ErrorBoundary>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex font-sans antialiased overflow-x-hidden">
      {/* Left Navigation Sidebar */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        student={studentProfile}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0 transition-all duration-300">
        {/* Top Navbar Header */}
        <Header
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
          student={studentProfile}
          onOpenNotifications={() => setNotificationsOpen(true)}
          onOpenSchedule={() => setScheduleOpen(true)}
          onOpenSupport={handleOpenSupport}
          onOpenChat={handleOpenChat}
          onOpenAdmin={handleOpenAdmin}
          onOpenZoom={() => setZoomModalOpen(true)}
          selectedBatch={selectedBatch}
          setSelectedBatch={setSelectedBatch}
          onNavigateToProgressReport={() => setCurrentTab('progress-report')}
        />

        {/* Page Content View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <ErrorBoundary onReset={() => setCurrentTab('courses')}>
            {currentTab === 'welcome' && (
            <WelcomePage
              onNavigateToCourse={() => setCurrentTab('courses')}
              onNavigateToDashboard={() => setCurrentTab('dashboard')}
            />
          )}

          {currentTab === 'dashboard' && (
            <DashboardPage
              student={studentProfile}
              onNavigateToCourses={() => setCurrentTab('courses')}
              onNavigateToAssignments={() => setCurrentTab('assignments')}
              onNavigateToAttendance={() => setCurrentTab('attendance')}
              onNavigateToSession={() => setCurrentTab('session')}
              onNavigateToCat={() => setCurrentTab('application-test')}
              onNavigateToProgressReport={() => setCurrentTab('progress-report')}
              onOpenSanviAssistant={() => setSanviAssistantOpen(true)}
            />
          )}

          {currentTab === 'courses' && (
            <CoursesPage
              student={studentProfile}
              onSelectSubject={handleSelectSubject}
            />
          )}

          {currentTab === 'session' && (
            <SessionPage
              student={studentProfile}
              subjectName={selectedSubject}
              onBackToCourses={() => setCurrentTab('courses')}
            />
          )}

          {currentTab === 'assignments' && (
            <AssignmentsPage
              student={studentProfile}
            />
          )}

          {currentTab === 'application-test' && (
            <ApplicationTestPage 
              student={studentProfile} 
            />
          )}

          {currentTab === 'resume' && (
            <ResumePage
              student={studentProfile}
            />
          )}

          {currentTab === 'interview-prep' && (
            <InterviewPrepPage 
              student={studentProfile}
            />
          )}

          {currentTab === 'mock-interviews' && (
            <MockInterviewsPage />
          )}

          {currentTab === 'discussion-forum' && (
            <DiscussionForumPage />
          )}

          {currentTab === 'attendance' && (
            <AttendancePage
              student={studentProfile}
            />
          )}

          {currentTab === 'feedback' && (
            <FeedbackPage
              student={studentProfile}
            />
          )}

          {currentTab === 'class' && (
            <ClassPage
              student={studentProfile}
            />
          )}

          {currentTab === 'account-profile' && (
            <AccountProfilePage
              student={studentProfile}
            />
          )}

          {currentTab === 'notification' && (
            <NotificationPage />
          )}

          {currentTab === 'progress-report' && (
            <ProgressReportPage
              student={studentProfile}
            />
          )}

          {currentTab === 'change-program' && (
            <ChangeProgramPage
              student={studentProfile}
            />
          )}
          </ErrorBoundary>
        </main>

        {/* Modern Minimal Footer */}
        <footer className="py-4 px-6 border-t border-slate-200/70 bg-white/70 text-center text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; 2026 DV Analytics. All Rights Reserved.</span>
          <div className="flex items-center gap-4 text-[11px] text-slate-500 font-medium">
            <span className="hover:text-slate-800 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-slate-800 cursor-pointer">Honor Code & LMS Policy</span>
            <span>•</span>
            <span className="hover:text-slate-800 cursor-pointer">Support Desk</span>
          </div>
        </footer>
      </div>

      {/* Global Modals & Jarvis DV Assistant */}
      <NotificationModal
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />

      <ScheduleModal
        isOpen={scheduleOpen}
        onClose={() => setScheduleOpen(false)}
      />

      <SupportModal
        isOpen={supportOpen}
        onClose={() => setSupportOpen(false)}
        initialTab={supportTab}
      />

      <ZoomMeetingModal
        isOpen={zoomModalOpen}
        onClose={() => setZoomModalOpen(false)}
        defaultMentorId="DVMENTOR4"
      />

      {/* Sanvi Voice AI Assistant (Floats across all screens with two-way voice & Jarvis actions) */}
      <SanviAssistant
        isOpenExternal={sanviAssistantOpen}
        onCloseExternal={() => setSanviAssistantOpen(false)}
        currentTab={currentTab}
        onNavigate={(tab) => setCurrentTab(tab)}
      />

      {/* Floating Quick Switcher Pill (Student Mode) */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2 bg-slate-950/90 text-white p-1.5 pl-3.5 rounded-full shadow-2xl border border-slate-700/80 backdrop-blur-md text-xs select-none animate-in fade-in duration-300">
        <div className="flex items-center gap-1.5 pr-1">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-[11px] font-semibold text-slate-300">Student Access Active</span>
        </div>
        <button
          onClick={handleOpenAdmin}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer active:scale-95"
          title="Open Admin Portal to upload videos, manage sessions, and update records"
        >
          <span>Admin Portal ➔</span>
        </button>
      </div>
    </div>
  );
}
