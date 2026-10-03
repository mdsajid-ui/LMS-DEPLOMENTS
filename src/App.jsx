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
import LoginPage from './pages/LoginPage';

import { studentProfile as initialStudentProfile } from './data/mockData';
import { getStoredStudentProfile, saveStudentProfile, subscribeToDataUpdates } from './utils/lmsStorage';

export default function App() {
  const checkIsAdminUrl = () => {
    const hash = window.location.hash.toLowerCase();
    const search = window.location.search.toLowerCase();
    const pathname = window.location.pathname.toLowerCase();
    return hash.includes('admin') || search.includes('admin') || pathname.includes('/admin');
  };

  const checkIsLoginUrl = () => {
    const hash = window.location.hash.toLowerCase();
    const search = window.location.search.toLowerCase();
    return hash.includes('login') || search.includes('login');
  };

  const [isAdminPortal, setIsAdminPortal] = useState(() => checkIsAdminUrl());
  const [activeStudent, setActiveStudent] = useState(() => getStoredStudentProfile());
  const [isStudentAuthenticated, setIsStudentAuthenticated] = useState(() => {
    if (typeof window === 'undefined') return true;
    const authFlag = localStorage.getItem('dva_student_authenticated');
    if (authFlag === 'false') return false;
    return true;
  });
  const [showLoginScreen, setShowLoginScreen] = useState(() => checkIsLoginUrl());

  useEffect(() => {
    const handleUrlChange = () => {
      setIsAdminPortal(checkIsAdminUrl());
      if (checkIsLoginUrl()) {
        setShowLoginScreen(true);
      }
    };
    window.addEventListener('hashchange', handleUrlChange);
    window.addEventListener('popstate', handleUrlChange);
    return () => {
      window.removeEventListener('hashchange', handleUrlChange);
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, []);

  // Listen for real-time student profile updates
  useEffect(() => {
    const unsubscribe = subscribeToDataUpdates((event) => {
      if (event?.type === 'profile' || event?.type === 'storage_sync') {
        setActiveStudent(getStoredStudentProfile());
      }
    });
    return () => unsubscribe();
  }, []);

  // Enforce zero window scroll so header and sidebar never scroll off-screen
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
    }
  }, []);

  const handleOpenAdmin = (targetHash = '/admin/Reg.aspx') => {
    window.location.hash = typeof targetHash === 'string' ? targetHash : '/admin/Reg.aspx';
    setIsAdminPortal(true);
  };

  const handleBackToStudentLms = () => {
    window.location.hash = '';
    history.pushState("", document.title, window.location.pathname + window.location.search);
    setIsAdminPortal(false);
    setShowLoginScreen(false);
  };

  const handleStudentLoginSuccess = (profile) => {
    setActiveStudent(profile);
    setIsStudentAuthenticated(true);
    setShowLoginScreen(false);
    setIsAdminPortal(false);
    localStorage.setItem('dva_student_authenticated', 'true');
    window.location.hash = '';
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminPortal(true);
    setShowLoginScreen(false);
    window.location.hash = '/admin/Reg.aspx';
  };

  const handleStudentLogout = () => {
    setIsStudentAuthenticated(false);
    setShowLoginScreen(true);
    localStorage.setItem('dva_student_authenticated', 'false');
    window.location.hash = '#/login';
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

  if (showLoginScreen || (!isStudentAuthenticated && !isAdminPortal)) {
    return (
      <ErrorBoundary onReset={() => { setShowLoginScreen(false); setIsStudentAuthenticated(true); }}>
        <LoginPage 
          onStudentLoginSuccess={handleStudentLoginSuccess}
          onAdminLoginSuccess={handleAdminLoginSuccess}
        />
      </ErrorBoundary>
    );
  }

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

  const studentData = activeStudent || initialStudentProfile;

  return (
    <ErrorBoundary onReset={() => window.location.reload()}>
      <div className="h-screen bg-[#f8fafc] text-slate-900 flex font-sans antialiased overflow-hidden">
        {/* Left Navigation Sidebar */}
        <Sidebar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
          student={studentData}
          onOpenAdmin={handleOpenAdmin}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-full min-w-0 transition-all duration-300 overflow-hidden">
          {/* Top Navbar Header */}
          <Header
            collapsed={sidebarCollapsed}
            setCollapsed={setSidebarCollapsed}
            student={studentData}
            onOpenNotifications={() => setNotificationsOpen(true)}
            onOpenSchedule={() => setScheduleOpen(true)}
            onOpenSupport={handleOpenSupport}
            onOpenChat={handleOpenChat}
            onOpenAdmin={handleOpenAdmin}
            onOpenZoom={() => setZoomModalOpen(true)}
            selectedBatch={selectedBatch}
            setSelectedBatch={setSelectedBatch}
            onNavigateToProgressReport={() => setCurrentTab('progress-report')}
            onNavigateToAccountProfile={() => setCurrentTab('account-profile')}
            onLogout={handleStudentLogout}
          />

          {/* Page Content View */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto min-h-0 pb-28 scrollbar-thin">
            <ErrorBoundary onReset={() => setCurrentTab('courses')}>
              {currentTab === 'welcome' && (
              <WelcomePage
                onNavigateToCourse={() => setCurrentTab('courses')}
                onNavigateToDashboard={() => setCurrentTab('dashboard')}
              />
            )}

            {currentTab === 'dashboard' && (
              <DashboardPage
                student={studentData}
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
                student={studentData}
                onSelectSubject={handleSelectSubject}
              />
            )}

            {currentTab === 'session' && (
              <SessionPage
                student={studentData}
                subjectName={selectedSubject}
                onBackToCourses={() => setCurrentTab('courses')}
              />
            )}

            {currentTab === 'assignments' && (
              <AssignmentsPage
                student={studentData}
              />
            )}

            {currentTab === 'application-test' && (
              <ApplicationTestPage 
                student={studentData} 
              />
            )}

            {currentTab === 'resume' && (
              <ResumePage
                student={studentData}
              />
            )}

            {currentTab === 'interview-prep' && (
              <InterviewPrepPage 
                student={studentData}
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
                student={studentData}
              />
            )}

            {currentTab === 'feedback' && (
              <FeedbackPage
                student={studentData}
              />
            )}

            {currentTab === 'class' && (
              <ClassPage
                student={studentData}
              />
            )}

            {currentTab === 'account-profile' && (
              <AccountProfilePage
                student={studentData}
              />
            )}

            {currentTab === 'notification' && (
              <NotificationPage />
            )}

            {currentTab === 'progress-report' && (
              <ProgressReportPage
                student={studentData}
              />
            )}

            {currentTab === 'change-program' && (
              <ChangeProgramPage
                student={studentData}
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
          onOpenExternal={() => setSanviAssistantOpen(true)}
          onCloseExternal={() => setSanviAssistantOpen(false)}
          currentTab={currentTab}
          onNavigate={(tab) => setCurrentTab(tab)}
          onOpenAdmin={handleOpenAdmin}
        />

        {/* Floating Quick Switcher Pill (Student Mode) - Centered Dynamic Island */}
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 bg-slate-950/90 text-white p-1.5 pl-3.5 rounded-full shadow-2xl border border-slate-700/80 backdrop-blur-md text-xs select-none animate-in fade-in duration-300">
          <div className="flex items-center gap-1.5 pr-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[11px] font-semibold text-slate-300 truncate max-w-[130px]">
              {studentData?.name || "Student"}
            </span>
          </div>
          <button
            onClick={handleOpenAdmin}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer active:scale-95"
            title="Open Admin Portal"
          >
            <span>Admin ➔</span>
          </button>
          <button
            onClick={handleStudentLogout}
            className="px-2.5 py-1.5 rounded-full bg-slate-800 hover:bg-red-900/60 text-slate-300 hover:text-red-300 text-xs transition-colors cursor-pointer"
            title="Log out of student account"
          >
            Logout
          </button>
        </div>
      </div>
    </ErrorBoundary>
  );
}
