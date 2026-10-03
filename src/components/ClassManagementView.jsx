import React, { useState, useEffect } from 'react';
import {
  Video,
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  Plus,
  Play,
  Edit,
  Trash2,
  Radio,
  Eye,
  EyeOff,
  ShieldCheck,
  Send,
  Sparkles,
  Phone,
  Mail,
  RefreshCw,
  Search,
  Filter,
  FileText,
  AlertCircle
} from 'lucide-react';
import { mentorZoomList } from '../data/mentorZoomData';
import { 
  getStoredLiveClasses, 
  saveLiveClass, 
  updateLiveClassStatus, 
  deleteLiveClass, 
  subscribeToDataUpdates 
} from '../utils/lmsStorage';

export default function ClassManagementView({ showToast, onNavigateToSession }) {
  const [classes, setClasses] = useState(() => getStoredLiveClasses());
  const [mentors] = useState(mentorZoomList);
  const [selectedMentorFilter, setSelectedMentorFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedKey, setCopiedKey] = useState(null);
  const [showPassword, setShowPassword] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState(null);

  // New Class Form State
  const [formData, setFormData] = useState({
    batch: "BATCH 202606",
    cohortInfo: "Ganesh, Sajid • BATCH 202606 / 202608 / 202609",
    subject: "SQL Server Advanced & Practical Data Lab",
    topic: "Practical Lab & Live Doubt Clearing Session",
    mentorId: "DVMENTOR4",
    date: new Date().toISOString().split('T')[0],
    time: "11:00 AM - 06:30 PM",
    status: "LIVE NOW"
  });

  // Sync with cross-tab / local storage updates
  useEffect(() => {
    const unsubscribe = subscribeToDataUpdates((event) => {
      if (event?.type === 'live_classes' || event?.type === 'storage_sync') {
        setClasses(getStoredLiveClasses());
      }
    });
    return () => unsubscribe();
  }, []);

  const handleCopy = (text, key) => {
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    showToast?.(`Copied to clipboard: ${text}`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const togglePasswordVisibility = (mentorId) => {
    setShowPassword(prev => ({ ...prev, [mentorId]: !prev[mentorId] }));
  };

  const handleStatusChange = (id, newStatus) => {
    const updated = updateLiveClassStatus(id, newStatus);
    setClasses(updated);
    showToast?.(`Class status updated to "${newStatus}". Synced to Student LMS.`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this live class schedule?")) {
      const updated = deleteLiveClass(id);
      setClasses(updated);
      showToast?.("Class schedule removed.");
    }
  };

  const handleOpenScheduleModal = (cls = null) => {
    if (cls) {
      setEditingClass(cls);
      setFormData({
        batch: cls.batch,
        cohortInfo: cls.cohortInfo || "",
        subject: cls.subject,
        topic: cls.topic,
        mentorId: cls.mentorId || "DVMENTOR4",
        date: cls.date,
        time: cls.time,
        status: cls.status
      });
    } else {
      setEditingClass(null);
      setFormData({
        batch: "BATCH 202606",
        cohortInfo: "Ganesh, Sajid • BATCH 202606 / 202608 / 202609",
        subject: "SQL Server Advanced & Practical Data Lab",
        topic: "Practical Lab & Live Doubt Clearing Session",
        mentorId: "DVMENTOR4",
        date: new Date().toISOString().split('T')[0],
        time: "11:00 AM - 06:30 PM",
        status: "LIVE NOW"
      });
    }
    setModalOpen(true);
  };

  const handleSaveClass = (e) => {
    e.preventDefault();
    const mentorObj = mentors.find(m => m.id === formData.mentorId) || mentors[0];
    const classPayload = {
      id: editingClass ? editingClass.id : undefined,
      date: formData.date,
      time: formData.time,
      batch: formData.batch,
      cohortInfo: formData.cohortInfo || `${formData.batch} Cohort`,
      subject: formData.subject,
      topic: formData.topic,
      mentor: mentorObj.name,
      mentorId: mentorObj.id,
      email: mentorObj.email,
      phone: mentorObj.phone,
      meetingId: mentorObj.meetingId,
      rawMeetingId: mentorObj.rawMeetingId,
      passcode: mentorObj.passcode,
      zoomJoinUrl: mentorObj.zoomJoinUrl,
      webJoinUrl: mentorObj.webJoinUrl,
      hostStartUrl: `https://zoom.us/s/${mentorObj.rawMeetingId}?pwd=cENiVlhqNVY5SERhUHRwckdJREZMQT09`,
      status: formData.status,
      isPrimary: formData.mentorId === "DVMENTOR4"
    };

    const updated = saveLiveClass(classPayload);
    setClasses(updated);
    setModalOpen(false);
    showToast?.(`✓ Live Class ${editingClass ? 'Updated' : 'Scheduled'}! Synced with Student Portal.`);
  };

  const featuredMentor = mentors.find(m => m.id === "DVMENTOR4") || mentors[0];
  const activeLiveClass = classes.find(c => c.status === "LIVE NOW") || classes[0];

  const filteredClasses = classes.filter(c => {
    const matchMentor = selectedMentorFilter === "ALL" || c.mentorId === selectedMentorFilter;
    const matchSearch = searchTerm === "" || 
      c.batch.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.mentor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchMentor && matchSearch;
  });

  return (
    <div className="space-y-6 text-xs font-sans text-slate-800 animate-in fade-in select-none">
      
      {/* Route & Breadcrumb Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 px-5 rounded border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2 text-slate-600 font-semibold">
          <span className="text-slate-400">/</span>
          <span className="text-slate-900 font-bold text-sm">Class</span>
          <span className="text-slate-400">/</span>
          <span className="text-teal-700 font-mono text-[11px] font-bold">Class.aspx</span>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-200">
            Live Class & Zoom Session Hub
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleOpenScheduleModal()}
            className="mac-btn mac-btn-orange text-white px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 shadow-xs transition-all cursor-pointer active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Schedule Live Class</span>
          </button>
          {onNavigateToSession && (
            <button
              onClick={() => onNavigateToSession("BATCH 202606", "SQL Server Advanced")}
              className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Upload Class Materials (Session.aspx)</span>
            </button>
          )}
        </div>
      </div>

      {/* FEATURED ACTIVE HOST BANNER: DVMENTOR4 (Debashish Sir / Ganesh, Sajid) */}
      <div className="bg-gradient-to-r from-[#172d38] via-[#203a43] to-[#2c5364] text-white rounded-xl p-5 border border-slate-700 shadow-md relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
          <div className="space-y-2.5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-500/25 text-red-300 border border-red-500/40 text-[11px] font-bold">
                <span className="w-2 h-2 rounded-full bg-red-400 animate-ping"></span>
                ACTIVE HOST ROOM • DVMENTOR4
              </span>
              <span className="px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-[10px] font-mono font-bold">
                11:00 AM - 06:30 PM (Ganesh, Sajid)
              </span>
              <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[10px] font-semibold">
                Debashish Sir (089042 50708)
              </span>
            </div>

            <h2 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
              <span>{featuredMentor.facultyName}</span>
              <span className="text-sm font-normal text-slate-300">({featuredMentor.role})</span>
            </h2>

            {/* Quick Host Login Credentials Box */}
            <div className="bg-black/35 backdrop-blur-md border border-slate-600/60 p-3 rounded-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-[11px]">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Zoom / Gmail ID:</span>
                <div className="flex items-center gap-1 text-slate-100 font-mono">
                  <span>{featuredMentor.email}</span>
                  <button 
                    onClick={() => handleCopy(featuredMentor.email, 'dvmentor4-email')}
                    className="p-1 hover:text-teal-300"
                    title="Copy Email"
                  >
                    {copiedKey === 'dvmentor4-email' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Host Password:</span>
                <div className="flex items-center gap-1 font-mono text-emerald-300 font-bold">
                  <span>{showPassword['DVMENTOR4'] ? featuredMentor.password : '••••••••••••'}</span>
                  <button 
                    onClick={() => togglePasswordVisibility('DVMENTOR4')}
                    className="p-1 hover:text-white"
                  >
                    {showPassword['DVMENTOR4'] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  </button>
                  <button 
                    onClick={() => handleCopy(featuredMentor.password, 'dvmentor4-pass')}
                    className="p-1 hover:text-teal-300"
                    title="Copy Password"
                  >
                    {copiedKey === 'dvmentor4-pass' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Meeting ID:</span>
                <div className="flex items-center gap-1 text-white font-mono font-bold tracking-wider">
                  <span>{featuredMentor.meetingId}</span>
                  <button 
                    onClick={() => handleCopy(featuredMentor.rawMeetingId, 'dvmentor4-id')}
                    className="p-1 hover:text-teal-300"
                    title="Copy ID"
                  >
                    {copiedKey === 'dvmentor4-id' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Passcode:</span>
                <div className="flex items-center gap-1 text-teal-300 font-mono font-bold tracking-wider">
                  <span>{featuredMentor.passcode}</span>
                  <button 
                    onClick={() => handleCopy(featuredMentor.passcode, 'dvmentor4-code')}
                    className="p-1 hover:text-teal-300"
                    title="Copy Passcode"
                  >
                    {copiedKey === 'dvmentor4-code' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons for Mentor 4 */}
          <div className="flex flex-col gap-2 shrink-0">
            <a
              href={featuredMentor.zoomJoinUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 shadow-sm transition-all text-xs"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Launch Zoom as Host</span>
            </a>

            <a
              href={featuredMentor.webJoinUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-slate-700/80 hover:bg-slate-600 text-slate-100 font-semibold px-4 py-2 rounded-lg flex items-center justify-center gap-2 border border-slate-600 text-xs transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open in Web Browser</span>
            </a>

            <button
              onClick={() => {
                const inviteText = `DV Analytics Live Class Session\nFaculty: ${featuredMentor.facultyName}\nTime: ${featuredMentor.timings}\nMeeting ID: ${featuredMentor.meetingId}\nPasscode: ${featuredMentor.passcode}\nJoin URL: ${featuredMentor.zoomJoinUrl}`;
                handleCopy(inviteText, 'full-invite');
                showToast?.("Complete Zoom Class invite copied to clipboard!");
              }}
              className="bg-teal-600/30 hover:bg-teal-600/50 text-teal-200 border border-teal-500/40 font-semibold px-3 py-1.5 rounded-lg flex items-center justify-center gap-1.5 text-[11px] transition-colors"
            >
              <Copy className="w-3 h-3" />
              <span>{copiedKey === 'full-invite' ? '✓ Copied Invite' : 'Copy Full Student Invite'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* MENTOR CREDENTIALS & ROOM HUB (DVMENTOR 1 to DVMENTOR 5) */}
      <div className="bg-white rounded border border-slate-200 shadow-2xs overflow-hidden">
        <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-bold text-slate-800 text-xs flex items-center gap-2">
              <Users className="w-4 h-4 text-teal-600" />
              <span>Master Mentor Zoom Accounts & Class Rooms (DVMENTOR1 - 5)</span>
            </h3>
            <p className="text-[11px] text-slate-500">
              Direct access credentials and live classroom launchers for all assigned faculties
            </p>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            5 Active Host Accounts Configured
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-4">
          {mentors.map(m => {
            const isMentor4 = m.id === "DVMENTOR4";
            return (
              <div 
                key={m.id}
                className={`p-3.5 rounded-lg border transition-all ${
                  isMentor4 
                    ? 'border-teal-500 bg-teal-50/20 shadow-xs' 
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                      isMentor4 ? 'bg-teal-600 text-white' : 'bg-slate-800 text-white'
                    }`}>
                      {m.id}
                    </span>
                    <span className="font-bold text-slate-800 text-xs truncate max-w-[150px]">
                      {m.facultyName}
                    </span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                    m.status === 'LIVE NOW' ? 'bg-red-100 text-red-700 animate-pulse' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {m.status}
                  </span>
                </div>

                <div className="space-y-1.5 text-[11px] text-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Email:</span>
                    <span className="font-mono text-slate-700 font-medium truncate max-w-[180px]">{m.email}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Password:</span>
                    <div className="flex items-center gap-1">
                      <span className="font-mono text-slate-800 font-bold">
                        {showPassword[m.id] ? m.password : '••••••••••••'}
                      </span>
                      <button 
                        onClick={() => togglePasswordVisibility(m.id)}
                        className="text-slate-400 hover:text-slate-600"
                      >
                        {showPassword[m.id] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      </button>
                      <button 
                        onClick={() => handleCopy(m.password, `${m.id}-pass`)}
                        className="text-slate-400 hover:text-teal-600"
                        title="Copy Password"
                      >
                        {copiedKey === `${m.id}-pass` ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Meeting ID:</span>
                    <div className="flex items-center gap-1 font-mono font-bold text-slate-900">
                      <span>{m.meetingId}</span>
                      <button 
                        onClick={() => handleCopy(m.rawMeetingId, `${m.id}-id`)}
                        className="text-slate-400 hover:text-teal-600"
                        title="Copy ID"
                      >
                        {copiedKey === `${m.id}-id` ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Passcode:</span>
                    <div className="flex items-center gap-1 font-mono font-bold text-teal-700">
                      <span>{m.passcode}</span>
                      <button 
                        onClick={() => handleCopy(m.passcode, `${m.id}-code`)}
                        className="text-slate-400 hover:text-teal-600"
                        title="Copy Passcode"
                      >
                        {copiedKey === `${m.id}-code` ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-0.5 text-[10px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {m.timings}
                    </span>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                  <a
                    href={m.zoomJoinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 bg-slate-800 hover:bg-slate-900 text-white font-semibold py-1 px-2.5 rounded text-[11px] text-center flex items-center justify-center gap-1"
                  >
                    <Play className="w-3 h-3 fill-white" />
                    <span>Start Host</span>
                  </a>
                  <a
                    href={m.webJoinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1 px-2 border border-slate-300 hover:bg-slate-50 rounded text-slate-700 text-[11px] flex items-center gap-1"
                    title="Web Browser Join"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>Web</span>
                  </a>
                  <button
                    onClick={() => {
                      handleOpenScheduleModal({
                        batch: m.cohort.split('•')[0].trim(),
                        subject: m.subjects[0] || "Analytics",
                        topic: `Live Lecture with ${m.facultyName}`,
                        mentorId: m.id,
                        date: new Date().toISOString().split('T')[0],
                        time: m.timings,
                        status: "SCHEDULED"
                      });
                    }}
                    className="p-1 px-2 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 rounded text-[11px] font-semibold"
                  >
                    Schedule
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SCHEDULED & LIVE CLASSES DATA GRID (Class.aspx) */}
      <div className="bg-white rounded border border-slate-200 shadow-2xs overflow-hidden">
        
        {/* Filter bar */}
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-slate-700 text-xs">Live Schedules:</span>
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-slate-400" />
              <input
                type="text"
                placeholder="Search batch, subject, mentor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1 bg-white border border-slate-300 rounded text-xs focus:outline-none focus:border-teal-500 w-48 sm:w-60"
              />
            </div>

            <select
              value={selectedMentorFilter}
              onChange={(e) => setSelectedMentorFilter(e.target.value)}
              className="bg-white border border-slate-300 rounded px-2.5 py-1 text-xs focus:outline-none focus:border-teal-500 font-medium"
            >
              <option value="ALL">All Mentors</option>
              {mentors.map(m => (
                <option key={m.id} value={m.id}>{m.id} - {m.facultyName}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-500">
              Showing <strong>{filteredClasses.length}</strong> live class sessions
            </span>
          </div>
        </div>

        {/* Classes Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#2a3f54] text-white text-[11px] uppercase tracking-wider font-semibold">
                <th className="py-2.5 px-3">Date & Slot</th>
                <th className="py-2.5 px-3">Batch & Cohort</th>
                <th className="py-2.5 px-3">Subject & Session Agenda</th>
                <th className="py-2.5 px-3">Mentor Account</th>
                <th className="py-2.5 px-3">Meeting ID & Passcode</th>
                <th className="py-2.5 px-3 text-center">Status</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-[11px]">
              {filteredClasses.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-slate-400">
                    No live classes found matching the criteria. Click "Schedule Live Class" to create one.
                  </td>
                </tr>
              ) : (
                filteredClasses.map((cls) => {
                  const isLive = cls.status === "LIVE NOW";
                  return (
                    <tr 
                      key={cls.id} 
                      className={`hover:bg-slate-50/80 transition-colors ${isLive ? 'bg-red-50/20' : ''}`}
                    >
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <div className="font-bold text-slate-800">{cls.date}</div>
                        <div className="text-slate-500 text-[10px] flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{cls.time}</span>
                        </div>
                      </td>

                      <td className="py-2.5 px-3">
                        <div className="font-bold text-teal-800">{cls.batch}</div>
                        <div className="text-slate-500 text-[10px] truncate max-w-[160px]">{cls.cohortInfo}</div>
                      </td>

                      <td className="py-2.5 px-3">
                        <div className="font-semibold text-slate-800">{cls.subject}</div>
                        <div className="text-slate-500 text-[10px]">{cls.topic}</div>
                      </td>

                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <span className="px-1.5 py-0.5 rounded bg-slate-800 text-white font-mono font-bold text-[10px] mr-1.5">
                          {cls.mentorId || 'DVMENTOR'}
                        </span>
                        <span className="font-medium text-slate-700">{cls.mentor}</span>
                      </td>

                      <td className="py-2.5 px-3 whitespace-nowrap font-mono">
                        <div className="flex items-center gap-1 text-slate-900 font-bold">
                          <span>{cls.meetingId}</span>
                          <button 
                            onClick={() => handleCopy(cls.rawMeetingId || cls.meetingId, `grid-id-${cls.id}`)}
                            className="text-slate-400 hover:text-teal-600"
                            title="Copy Meeting ID"
                          >
                            {copiedKey === `grid-id-${cls.id}` ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          </button>
                        </div>
                        <div className="flex items-center gap-1 text-teal-700 text-[10px]">
                          <span>Pass: {cls.passcode}</span>
                          <button 
                            onClick={() => handleCopy(cls.passcode, `grid-pass-${cls.id}`)}
                            className="text-slate-400 hover:text-teal-600"
                            title="Copy Passcode"
                          >
                            {copiedKey === `grid-pass-${cls.id}` ? <Check className="w-2.5 h-2.5 text-emerald-600" /> : <Copy className="w-2.5 h-2.5" />}
                          </button>
                        </div>
                      </td>

                      <td className="py-2.5 px-3 text-center whitespace-nowrap">
                        <select
                          value={cls.status}
                          onChange={(e) => handleStatusChange(cls.id, e.target.value)}
                          className={`text-[10px] font-bold px-2 py-1 rounded-full border cursor-pointer ${
                            isLive
                              ? 'bg-red-100 text-red-700 border-red-300'
                              : cls.status === 'SCHEDULED'
                              ? 'bg-blue-100 text-blue-700 border-blue-300'
                              : 'bg-slate-100 text-slate-600 border-slate-300'
                          }`}
                        >
                          <option value="LIVE NOW">🟢 LIVE NOW</option>
                          <option value="SCHEDULED">🔵 SCHEDULED</option>
                          <option value="COMPLETED">⚪ COMPLETED</option>
                        </select>
                      </td>

                      <td className="py-2.5 px-3 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <a
                            href={cls.zoomJoinUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold p-1 px-2 rounded text-[10px] flex items-center gap-1 shadow-2xs"
                            title="Launch Zoom Host"
                          >
                            <Play className="w-3 h-3 fill-white" />
                            <span>Start</span>
                          </a>

                          <button
                            onClick={() => handleOpenScheduleModal(cls)}
                            className="p-1 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[10px]"
                            title="Edit Class Schedule"
                          >
                            <Edit className="w-3 h-3" />
                          </button>

                          <button
                            onClick={() => handleDelete(cls.id)}
                            className="p-1 px-2 bg-red-50 hover:bg-red-100 text-red-600 rounded text-[10px]"
                            title="Delete"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* SCHEDULE CLASS MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden animate-in zoom-in-95">
            <div className="bg-[#2a3f54] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-teal-400" />
                <h3 className="font-bold text-sm">
                  {editingClass ? 'Edit Live Class Schedule' : 'Schedule New Live Class'}
                </h3>
              </div>
              <button 
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveClass} className="p-5 space-y-3.5 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Target Batch:</label>
                  <select
                    value={formData.batch}
                    onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                    className="w-full border border-slate-300 rounded px-2.5 py-1.5 focus:border-teal-500 focus:outline-none"
                    required
                  >
                    <option value="BATCH 202606">BATCH 202606 (Ganesh, Sajid)</option>
                    <option value="BATCH 202608">BATCH 202608 (APIDS Full Stack)</option>
                    <option value="BATCH 202609">BATCH 202609 (Weekend Data Science)</option>
                    <option value="ALL BATCHES">ALL ACTIVE BATCHES</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Subject / Module:</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full border border-slate-300 rounded px-2.5 py-1.5 focus:border-teal-500 focus:outline-none"
                    required
                  >
                    <option value="SQL Server Advanced & Practical Data Lab">SQL Server Advanced & Practical Lab</option>
                    <option value="Excel Base and Advanced">Excel Base and Advanced</option>
                    <option value="Python Analytics">Python Analytics</option>
                    <option value="Power BI & DAX Modeling">Power BI & DAX Modeling</option>
                    <option value="Machine Learning & GenAI">Machine Learning & GenAI</option>
                    <option value="CDC Placement Mock Viva">CDC Placement Mock Viva</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Topic / Lecture Agenda:</label>
                <input
                  type="text"
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  placeholder="e.g. Practical Lab & Live Doubt Clearing Session"
                  className="w-full border border-slate-300 rounded px-2.5 py-1.5 focus:border-teal-500 focus:outline-none font-medium"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Assigned Mentor Room:</label>
                  <select
                    value={formData.mentorId}
                    onChange={(e) => setFormData({ ...formData, mentorId: e.target.value })}
                    className="w-full border border-slate-300 rounded px-2.5 py-1.5 focus:border-teal-500 focus:outline-none font-semibold text-teal-800"
                    required
                  >
                    {mentors.map(m => (
                      <option key={m.id} value={m.id}>
                        {m.id} - {m.facultyName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Class Live Status:</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full border border-slate-300 rounded px-2.5 py-1.5 focus:border-teal-500 focus:outline-none font-bold"
                  >
                    <option value="LIVE NOW">🟢 LIVE NOW (Broadcasting)</option>
                    <option value="SCHEDULED">🔵 SCHEDULED</option>
                    <option value="COMPLETED">⚪ COMPLETED</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Date:</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full border border-slate-300 rounded px-2.5 py-1.5 focus:border-teal-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Time Slot:</label>
                  <input
                    type="text"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    placeholder="e.g. 11:00 AM - 06:30 PM"
                    className="w-full border border-slate-300 rounded px-2.5 py-1.5 focus:border-teal-500 focus:outline-none font-medium"
                    required
                  />
                </div>
              </div>

              <div className="bg-teal-50 border border-teal-200 rounded p-2.5 text-[11px] text-teal-900 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Real-Time LMS Sync:</strong> Saving this schedule will immediately update the live room and notification banner on all connected student portals!
                </span>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-3 py-1.5 border border-slate-300 rounded text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#26b99a] text-white rounded font-bold hover:bg-[#1f967d] flex items-center gap-1.5 shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{editingClass ? 'Update & Broadcast' : 'Schedule & Broadcast'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
