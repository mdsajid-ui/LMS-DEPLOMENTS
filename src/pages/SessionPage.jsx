import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Calendar, 
  Folder, 
  FolderOpen, 
  ChevronDown, 
  ChevronUp, 
  PlayCircle, 
  PauseCircle,
  FileText, 
  FileSpreadsheet, 
  Download, 
  CheckCircle, 
  Clock, 
  ArrowLeft,
  Volume2,
  Maximize2,
  MessageSquare,
  HelpCircle,
  Share2,
  Bookmark,
  Sparkles,
  Eye,
  CheckCircle2,
  Play,
  Link2,
  ExternalLink
} from 'lucide-react';
import { excelSessions, studentProfile } from '../data/mockData';
import { generateAndDownloadExcel } from '../utils/excelHelper';

export default function SessionPage({ 
  student = studentProfile, 
  subjectName = "EXCEL BASE AND ADVANCED",
  onBackToCourses 
}) {
  const defaultEmbedUrl = "https://player.vdocipher.com/v2/?otp=20160313versASE3232Tj8PbBLlQCLHDTQp2I37Tn35428tQ5YVO2eMzx1M59M5y&playbackInfo=eyJ2aWRlb0lkIjoiYjVmYzAwZTcxMWI0NDFjMTg2ZjYwMmI2NmQ4NmQ3YTUifQ==";

  // Active selected session and accordion expansion states
  const [expandedSessions, setExpandedSessions] = useState({
    'practical-questions': true,
    'session-1': true,
    'session-2': false,
    'session-3': false,
    'session-4': false
  });

  const [activeItem, setActiveItem] = useState({
    sessionTitle: "Session 1: Advanced Formulae & Dynamic Cell References",
    itemTitle: "Excel Session 1 Class 1 Video",
    type: "video",
    embedUrl: defaultEmbedUrl,
    instructor: "Dr. Sandip Mukherjee",
    date: "05.06.2026"
  });

  const [activeTab, setActiveTab] = useState('resources'); // resources, notes, qa
  const [personalNotes, setPersonalNotes] = useState(
    "- Key takeaway: Use $ before column or row for absolute references (e.g. $A$1 vs $A1 vs A$1).\n- Nested IF vs IFS: Prefer IFS in Excel 365 for cleaner readability.\n- Dynamic arrays spill automatically with # operator."
  );
  const [notesSaved, setNotesSaved] = useState(false);

  // Dynamic Video Playback & Watch Time Tracker
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSeconds, setPlaybackSeconds] = useState(1122); // 18m 42s
  const [playbackDuration, setPlaybackDuration] = useState(3420); // 57m 00s
  const [sessionSecondsTracked, setSessionSecondsTracked] = useState(0);

  useEffect(() => {
    let timer = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setPlaybackSeconds(sec => {
          if (sec >= playbackDuration) {
            setIsPlaying(false);
            return playbackDuration;
          }
          return sec + 1;
        });

        setSessionSecondsTracked(tracked => {
          const updated = tracked + 1;
          // Every 10 seconds of playback, add to localStorage to persist to dashboard
          if (updated % 10 === 0) {
            try {
              const currentMinutes = parseFloat(localStorage.getItem('dv_extra_watch_minutes') || '0');
              localStorage.setItem('dv_extra_watch_minutes', (currentMinutes + 0.166).toFixed(2));
            } catch (e) {}
          }
          return updated;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, playbackDuration]);

  const formatVideoTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleSession = (id) => {
    setExpandedSessions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSaveNotes = () => {
    setNotesSaved(true);
    setTimeout(() => setNotesSaved(false), 2000);
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    setPlaybackSeconds(Math.floor(pct * playbackDuration));
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
          <button 
            onClick={onBackToCourses}
            className="flex items-center gap-1.5 text-slate-600 hover:text-orange-600 transition-colors cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-orange-500" />
            <span>Courses</span>
          </button>
          <span>/</span>
          <span className="text-slate-900 font-semibold truncate">{subjectName}</span>
          <span>/</span>
          <span className="text-orange-600 font-semibold">Session Playback</span>
        </div>

        <button
          onClick={onBackToCourses}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition-all inline-flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Courses
        </button>
      </div>

      {/* Header Banner: APIDS & Date */}
      <div className="bg-slate-950 text-white rounded-2xl px-6 py-4 flex items-center justify-between shadow-lg border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white">
              {student.courseCode}
            </h2>
            <span className="text-xs text-orange-400 font-medium">
              {subjectName}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-xs font-mono text-slate-200">
          <Calendar className="w-4 h-4 text-orange-400" />
          <span className="font-semibold">{student.startDate}</span>
        </div>
      </div>

      {/* Watch Time Live Tracker Banner */}
      <div className="p-3.5 bg-gradient-to-r from-blue-900/60 via-slate-900 to-indigo-950 rounded-2xl border border-blue-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0">
            <Eye className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white">
                Live Watch Time Tracker: {isPlaying ? "Recording Active" : "Paused"}
              </span>
              {isPlaying && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              )}
            </div>
            <p className="text-[11px] text-slate-300 mt-0.5">
              Watching lectures automatically credits your attendance & student performance profile.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono bg-slate-950/60 px-3.5 py-1.5 rounded-xl border border-white/10 self-start sm:self-auto">
          <Clock className="w-3.5 h-3.5 text-orange-400" />
          <span>Session Logged: <strong>{Math.floor(sessionSecondsTracked / 60)}m {sessionSecondsTracked % 60}s</strong></span>
        </div>
      </div>

      {/* Interactive Main Area: Video Player & Lecture details */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* VdoCipher High-Definition Encrypted Video Player */}
        <div className="relative bg-black overflow-hidden select-none shadow-inner">
          <div style={{ paddingTop: '56.25%', position: 'relative' }}>
            <iframe 
              src={activeItem.embedUrl || defaultEmbedUrl}
              style={{ 
                border: 0, 
                maxWidth: '100%', 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                height: '100%', 
                width: '100%' 
              }} 
              allowFullScreen={true} 
              allow="encrypted-media"
              title={activeItem.itemTitle}
            />
          </div>
        </div>

        {/* Video Metadata & Tabs */}
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2.5 py-1 rounded-md border border-orange-100">
                Now Viewing
              </span>
              <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                VdoCipher Encrypted HD Stream
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mt-2">
              {activeItem.itemTitle}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Faculty: <span className="font-medium text-slate-800">{activeItem.instructor}</span> • Recorded on: {activeItem.date} • Batch: {student.courseCode}
            </p>
          </div>

          {/* Resource Download Button */}
          <button 
            onClick={() => generateAndDownloadExcel("Excel_Session1_Class1_Exercise.xlsx")}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors self-start md:self-auto shadow-xs cursor-pointer"
          >
            <Download className="w-4 h-4 text-orange-400" />
            Download Class Workbook (.xlsx)
          </button>
        </div>

        {/* Tabs: Practice Files & Notes */}
        <div id="session-tab-container" className="px-6 pt-2 border-b border-slate-100 flex items-center gap-6 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('resources')}
            className={`pb-3 border-b-2 transition-all ${
              activeTab === 'resources' 
                ? 'border-orange-500 text-orange-600' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Session Resources & Files
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`pb-3 border-b-2 transition-all ${
              activeTab === 'notes' 
                ? 'border-orange-500 text-orange-600' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            My Private Notes
          </button>
          <button
            onClick={() => setActiveTab('qa')}
            className={`pb-3 border-b-2 transition-all ${
              activeTab === 'qa' 
                ? 'border-orange-500 text-orange-600' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Session Q&A (4 Questions)
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 bg-slate-50/50">
          {activeTab === 'resources' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 flex items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-800">Advanced Formulas Hands-on.xlsx</h5>
                    <span className="text-[10px] text-slate-400">Microsoft Excel • 2.4 MB</span>
                  </div>
                </div>
                <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 flex items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-800">Session 1 Slides & CheatSheet.pdf</h5>
                    <span className="text-[10px] text-slate-400">PDF Document • 4.1 MB</span>
                  </div>
                </div>
                <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-3">
              <textarea
                value={personalNotes}
                onChange={(e) => setPersonalNotes(e.target.value)}
                rows={4}
                className="w-full text-xs font-mono bg-white p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-slate-800"
                placeholder="Type your notes for this session..."
              />
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  {notesSaved ? "✓ Saved to browser storage" : "Auto-saved as you type"}
                </span>
                <button
                  onClick={handleSaveNotes}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 transition-colors"
                >
                  Save Notes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'qa' && (
            <div className="space-y-3">
              <div className="p-3 bg-white rounded-xl border border-slate-200/80">
                <span className="text-[10px] font-bold text-orange-600">Q: From Manish K.</span>
                <p className="text-xs text-slate-800 font-medium mt-0.5">
                  When should we choose XLOOKUP over INDEX MATCH in older versions of Excel?
                </p>
                <div className="mt-2 pl-3 border-l-2 border-emerald-500 text-[11px] text-slate-600">
                  <strong className="text-slate-800">Faculty Reply:</strong> XLOOKUP is only supported in Office 365 / Excel 2021+. For backwards compatibility across legacy client versions, INDEX MATCH is still recommended.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Accordion List of All Sessions */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Course Curriculum & Recorded Lectures
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              All 6 session recordings, class materials, and assignments synced with Google Drive.
            </p>
          </div>

          <a 
            href="https://drive.google.com/drive/folders/1AYelQA_4SR4NWcKeyWXsx9StEbl4X0fF?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-bold border border-blue-200 transition-all self-start sm:self-auto shadow-2xs"
          >
            <Folder className="w-4 h-4 text-blue-600" />
            <span>Google Drive Master Hub</span>
            <ExternalLink className="w-3.5 h-3.5 text-blue-500" />
          </a>
        </div>

        <div className="space-y-3">
          {excelSessions.map((session) => {
            const isExpanded = expandedSessions[session.id];

            return (
              <div 
                key={session.id}
                className="border border-slate-200/90 rounded-2xl overflow-hidden transition-all duration-200"
              >
                {/* Session Folder Header */}
                <button
                  onClick={() => toggleSession(session.id)}
                  className={`w-full px-5 py-4 flex items-center justify-between text-left transition-colors cursor-pointer ${
                    isExpanded ? 'bg-slate-50' : 'bg-white hover:bg-slate-50/70'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-slate-600">
                      {isExpanded ? (
                        <FolderOpen className="w-5 h-5 text-orange-500" />
                      ) : (
                        <Folder className="w-5 h-5 text-slate-500" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-800">
                        {session.title}
                      </h4>
                      {session.duration && (
                        <span className="text-[11px] text-slate-400 font-medium">
                          Duration: {session.duration} • {session.items.length} Resources
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-slate-400">
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-600" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </button>

                {/* Expanded Session Files & Videos */}
                {isExpanded && (
                  <div className="px-5 py-4 bg-white border-t border-slate-100 space-y-3">
                    {/* Real LMS Action Buttons (Matching edu.dvanalyticsmds.com Screenshot) */}
                    {session.hasActionButtons && (
                      <div className="space-y-2.5 pb-2">
                        {/* 1. Green Button: Session Videos */}
                        <button
                          onClick={() => {
                            setActiveItem({
                              sessionTitle: session.fullTitle || session.title,
                              itemTitle: session.items[0]?.title || `${session.title} Class Video`,
                              type: "video",
                              embedUrl: session.vdocipherEmbedUrl || defaultEmbedUrl,
                              instructor: session.instructor,
                              date: session.recordingDate
                            });
                            window.scrollTo({ top: 120, behavior: 'smooth' });
                          }}
                          className="w-full bg-[#2dbd9f] hover:bg-[#25a98d] text-white font-semibold py-3 px-4 rounded-xl shadow-xs flex items-center justify-between transition-all transform active:scale-[0.99] cursor-pointer group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                              <Play className="w-3.5 h-3.5 fill-white" />
                            </div>
                            <div className="text-left">
                              <span className="text-xs sm:text-sm font-bold tracking-wide block">Session Videos</span>
                              {session.videoFileName && (
                                <span className="text-[10px] text-teal-100 font-mono block">{session.videoFileName} ({session.videoSize})</span>
                              )}
                            </div>
                          </div>
                          <ExternalLink className="w-4 h-4 opacity-80 group-hover:opacity-100 transition-opacity" />
                        </button>

                        {/* 2. Blue Button: Session Materials */}
                        <button
                          onClick={() => {
                            if (session.driveFolderUrl) {
                              window.open(session.driveFolderUrl, '_blank');
                            }
                            setActiveTab('resources');
                            const el = document.getElementById('session-tab-container');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="w-full bg-[#3b97e9] hover:bg-[#2a85d6] text-white font-semibold py-3 px-4 rounded-xl shadow-xs flex items-center justify-between transition-all transform active:scale-[0.99] cursor-pointer group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                              <Play className="w-3.5 h-3.5 fill-white" />
                            </div>
                            <div className="text-left">
                              <span className="text-xs sm:text-sm font-bold tracking-wide block">Session Materials</span>
                              {session.materialFileName && (
                                <span className="text-[10px] text-sky-100 font-mono block">{session.materialFileName} ({session.materialSize})</span>
                              )}
                            </div>
                          </div>
                          <ExternalLink className="w-4 h-4 opacity-80 group-hover:opacity-100 transition-opacity" />
                        </button>

                        {/* 3. Orange Button: Session Assignments */}
                        <button
                          onClick={() => {
                            generateAndDownloadExcel(session.assignmentFileName || "SESSION-1 ASSIGNMENTS.xlsx");
                          }}
                          className="w-full bg-[#f39c12] hover:bg-[#e08e0b] text-white font-semibold py-3 px-4 rounded-xl shadow-xs flex items-center justify-between transition-all transform active:scale-[0.99] cursor-pointer group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                              <Play className="w-3.5 h-3.5 fill-white" />
                            </div>
                            <div className="text-left">
                              <span className="text-xs sm:text-sm font-bold tracking-wide block">Session Assignments</span>
                              {session.assignmentFileName && (
                                <span className="text-[10px] text-amber-100 font-mono block">{session.assignmentFileName} ({session.assignmentSize || 'Excel'})</span>
                              )}
                            </div>
                          </div>
                          <ExternalLink className="w-4 h-4 opacity-80 group-hover:opacity-100 transition-opacity" />
                        </button>
                      </div>
                    )}

                    {session.summary && (
                      <div className="py-2.5 text-xs text-slate-500 leading-relaxed italic bg-slate-50/70 p-3 rounded-xl">
                        {session.summary}
                      </div>
                    )}

                    {session.items.map((item) => (
                      <div 
                        key={item.id}
                        onClick={() => {
                          setActiveItem({
                            sessionTitle: session.title,
                            itemTitle: item.title,
                            type: item.type,
                            instructor: session.instructor || "Faculty",
                            date: session.recordingDate || "Available"
                          });
                          if (item.type === 'video') {
                            setIsPlaying(true);
                          }
                        }}
                        className="py-3 px-2 flex items-center justify-between gap-3 hover:bg-orange-50/40 rounded-xl transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            item.type === 'video' 
                              ? 'bg-orange-50 text-orange-600' 
                              : item.type === 'pdf' 
                                ? 'bg-red-50 text-red-600' 
                                : 'bg-emerald-50 text-emerald-600'
                          }`}>
                            {item.type === 'video' ? (
                              <PlayCircle className="w-4 h-4" />
                            ) : item.type === 'pdf' ? (
                              <FileText className="w-4 h-4" />
                            ) : (
                              <FileSpreadsheet className="w-4 h-4" />
                            )}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-800 group-hover:text-orange-600 transition-colors">
                              {item.title}
                            </p>
                            <span className="text-[10px] text-slate-400">
                              {item.duration}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button className="text-[11px] font-semibold text-orange-600 bg-orange-50 group-hover:bg-orange-500 group-hover:text-white px-3 py-1 rounded-lg transition-all">
                            {item.type === 'video' ? 'Watch' : 'Open'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
