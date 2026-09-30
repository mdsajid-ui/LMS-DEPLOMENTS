import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import NotificationModal from './components/NotificationModal';
import ScheduleModal from './components/ScheduleModal';
import SupportModal from './components/SupportModal';
import SanviAssistant from './components/SanviAssistant';

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

import { studentProfile } from './data/mockData';

export default function App() {
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

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex font-sans antialiased">
      {/* Left Navigation Sidebar */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        student={studentProfile}
      />

      {/* Main Content Area */}
      <div 
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          sidebarCollapsed ? 'pl-20' : 'pl-72'
        }`}
      >
        {/* Top Navbar Header */}
        <Header
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
          student={studentProfile}
          onOpenNotifications={() => setNotificationsOpen(true)}
          onOpenSchedule={() => setScheduleOpen(true)}
          onOpenSupport={handleOpenSupport}
          onOpenChat={handleOpenChat}
          selectedBatch={selectedBatch}
          setSelectedBatch={setSelectedBatch}
        />

        {/* Page Content View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
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

      {/* Sanvi Voice AI Assistant (Floats across all screens with two-way voice & Jarvis actions) */}
      <SanviAssistant
        isOpenExternal={sanviAssistantOpen}
        onCloseExternal={() => setSanviAssistantOpen(false)}
        currentTab={currentTab}
        onNavigate={(tab) => setCurrentTab(tab)}
      />
    </div>
  );
}
