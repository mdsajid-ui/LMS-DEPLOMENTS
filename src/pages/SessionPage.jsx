import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  Calendar, 
  Folder, 
  FolderOpen, 
  ChevronDown, 
  ChevronUp, 
  PlayCircle, 
  Download, 
  Clock, 
  ArrowLeft,
  Eye,
  Play,
  ExternalLink,
  ShieldAlert,
  Lock,
  RefreshCw,
  FileSpreadsheet,
  FileArchive,
  FileCode,
  CheckCircle2,
  UploadCloud,
  X,
  Send
} from 'lucide-react';
import { getSubjectSessions, studentProfile, excelMasterDriveFolder, sqlMasterDriveFolder, pythonMasterDriveFolder } from '../data/mockData';
import { downloadFile, generateAndDownloadExcel } from '../utils/excelHelper';

export default function SessionPage({ 
  student = studentProfile, 
  subjectName = "EXCEL BASE AND ADVANCED",
  onBackToCourses 
}) {
  const defaultEmbedUrl = "https://player.vdocipher.com/v2/?otp=20160313versASE3232Tj8PbBLlQCLHDTQp2I37Tn35428tQ5YVO2eMzx1M59M5y&playbackInfo=eyJ2aWRlb0lkIjoiYjVmYzAwZTcxMWI0NDFjMTg2ZjYwMmI2NmQ4NmQ3YTUifQ==";

  // View mode: 'sessions' (Session.aspx) vs 'videos' (SessionVideo.aspx)
  const [viewMode, setViewMode] = useState('sessions');
  
  // Current subject sessions
  const sessions = getSubjectSessions(subjectName);
  
  // Selected session for SessionVideo.aspx
  const [selectedSession, setSelectedSession] = useState(() => sessions[1] || sessions[0]);
  
  // Active playing video item
  const [activeVideo, setActiveVideo] = useState({
    sNo: 1,
    title: "Class 1",
    description: "Session 1 Class 1 Video",
    embedUrl: defaultEmbedUrl
  });

  // Video playback engine: 'direct' (unrestricted on mdsajid-ui.github.io), 'vdocipher' (encrypted DRM), 'drive' (Google Drive)
  const [playerEngine, setPlayerEngine] = useState('direct');
  const videoRef = useRef(null);

  // Expandable folder state for Session.aspx
  const [expandedFolders, setExpandedFolders] = useState({
    'session-1': true,
    'sql-session-1': true,
    'py-session-1': true
  });

  // Anti-Screenshot & Screen Capture Blackout Guard
  const [isBlackout, setIsBlackout] = useState(false);
  const [blackoutReason, setBlackoutReason] = useState("");
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [downloadSuccessToast, setDownloadSuccessToast] = useState("");

  // Interactive Upload State inside Session & Materials
  const [activeUploadSession, setActiveUploadSession] = useState(null);
  const [uploadedSessionFile, setUploadedSessionFile] = useState(null);
  const [isUploadingSession, setIsUploadingSession] = useState(false);
  const [sessionUploadProgress, setSessionUploadProgress] = useState(0);
  const [sessionUploadNotes, setSessionUploadNotes] = useState("");
  const sessionFileInputRef = useRef(null);

  const handleOpenUploadModal = (session) => {
    setActiveUploadSession(session);
    setUploadedSessionFile(null);
    setSessionUploadNotes("");
    setSessionUploadProgress(0);
    setIsUploadingSession(false);
  };

  const handleSessionFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedSessionFile({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + " MB"
      });
    }
  };

  const handleSessionSubmit = () => {
    if (!uploadedSessionFile) {
      alert("Please select a solution file first (.xlsx, .sql, .py, .ipynb, .zip)");
      return;
    }
    setIsUploadingSession(true);
    setSessionUploadProgress(25);
    const interval = setInterval(() => {
      setSessionUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploadingSession(false);
            showToast(`Assignment for ${activeUploadSession.title} submitted successfully!`);
            setActiveUploadSession(null);
          }, 400);
          return 100;
        }
        return prev + 25;
      });
    }, 200);
  };

  // Watermark drifting position
  const [watermarkPos, setWatermarkPos] = useState({ x: 20, y: 30 });

  // Floating watermark drift animation
  useEffect(() => {
    const interval = setInterval(() => {
      setWatermarkPos({
        x: Math.floor(Math.random() * 65) + 10,
        y: Math.floor(Math.random() * 65) + 15
      });
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // DRM & Anti-Screen Capture Key Watcher
  useEffect(() => {
    const handleKeyDown = (e) => {
      // PrintScreen key
      if (e.key === 'PrintScreen' || e.keyCode === 44) {
        e.preventDefault();
        triggerBlackout("PrintScreen capture detected");
      }
      // F12 or Inspect shortcut
      if (e.key === 'F12' || ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'C' || e.key === 'c'))) {
        e.preventDefault();
        triggerBlackout("Developer tools inspection blocked");
      }
      // Screen export / Print (Ctrl+P) / Save (Ctrl+S)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 'P' || e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        triggerBlackout("Screen export / Print shortcut blocked");
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [viewMode]);

  const triggerBlackout = (reason) => {
    setIsBlackout(true);
    setBlackoutReason(reason);
  };

  const handleDismissBlackout = () => {
    setIsBlackout(false);
    setBlackoutReason("");
  };

  const toggleFolder = (id) => {
    setExpandedFolders(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleOpenVideos = (session) => {
    setSelectedSession(session);
    setPlayerEngine('direct');
    // Find class video items or synthesize class 1
    const classVideos = (session.items || []).filter(item => item.type === 'video');
    if (classVideos.length > 0) {
      setActiveVideo({
        sNo: 1,
        title: classVideos[0].title || "Class 1",
        description: classVideos[0].title || "Class 1 Video Stream",
        embedUrl: session.vdocipherEmbedUrl || defaultEmbedUrl
      });
    } else {
      setActiveVideo({
        sNo: 1,
        title: `${session.title} - Class 1`,
        description: `${session.title} Class 1 Video Lecture`,
        embedUrl: session.vdocipherEmbedUrl || defaultEmbedUrl
      });
    }
    setViewMode('videos');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlayClass = (sNo, title, description) => {
    setActiveVideo({
      sNo,
      title,
      description: description || `${selectedSession.title} ${title} Video`,
      embedUrl: selectedSession.vdocipherEmbedUrl || defaultEmbedUrl
    });
    setPlayerEngine('direct');
    setIsVideoPlaying(true);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(e => console.log('Autoplay request handled:', e));
      }
    }, 150);
  };

  const handleDownloadMaterials = (session) => {
    const filename = session.materialFileName || `${session.title.replace(/[^a-zA-Z0-9]/g, '_')}_Materials.zip`;
    downloadFile(filename);
    showToast(`Downloading: ${filename}`);
  };

  const handleDownloadAssignments = (session) => {
    const filename = session.assignmentFileName || `${session.title.replace(/[^a-zA-Z0-9]/g, '_')}_Assignments.xlsx`;
    downloadFile(filename);
    showToast(`Downloading: ${filename}`);
  };

  const showToast = (msg) => {
    setDownloadSuccessToast(msg);
    setTimeout(() => setDownloadSuccessToast(""), 3500);
  };

  // Get master folder url based on subject
  const getSubjectDriveUrl = () => {
    const lower = subjectName.toLowerCase();
    if (lower.includes('sql')) return sqlMasterDriveFolder;
    if (lower.includes('python')) return pythonMasterDriveFolder;
    return excelMasterDriveFolder;
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto select-none">
      {/* Toast Notification */}
      {downloadSuccessToast && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white text-xs px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{downloadSuccessToast}</span>
        </div>
      )}

      {/* Breadcrumb Navigation - Strictly matching Screenshot 1-5 */}
      <div className="flex items-center justify-between bg-white px-5 py-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
          <button 
            onClick={onBackToCourses}
            className="text-slate-500 hover:text-orange-600 transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>/ Courses</span>
          </button>
          
          <span className="text-slate-300">/</span>

          {viewMode === 'sessions' ? (
            <span className="text-slate-800 font-bold">Session</span>
          ) : (
            <>
              <button 
                onClick={() => setViewMode('sessions')}
                className="text-slate-500 hover:text-orange-600 transition-colors cursor-pointer"
              >
                Session
              </button>
              <span className="text-slate-300">/</span>
              <span className="text-slate-800 font-bold">Session Videos</span>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          {viewMode === 'videos' ? (
            <button
              onClick={() => setViewMode('sessions')}
              className="text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-all inline-flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Sessions</span>
            </button>
          ) : (
            <button
              onClick={onBackToCourses}
              className="text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-all inline-flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Courses</span>
            </button>
          )}
        </div>
      </div>

      {/* Black Header Card: APIDS & Date (Matching media_1790768119590.png and media_1790768138419.png) */}
      <div className="bg-[#1f242e] text-white rounded-lg px-6 py-4 flex items-center justify-between shadow-md">
        <div className="font-bold text-sm sm:text-base tracking-wide text-white">
          {student.courseCode}
        </div>
        <div className="font-medium text-xs sm:text-sm text-slate-200 font-mono">
          {student.startDate}
        </div>
      </div>

      {/* VIEW A: Session.aspx (Tree / List of Folders & 3 Colored Action Pills) */}
      {viewMode === 'sessions' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs divide-y divide-slate-100 overflow-hidden">
            {sessions.map((session, index) => {
              const isExpanded = !!expandedFolders[session.id];

              return (
                <div key={session.id || index} className="transition-colors">
                  {/* Folder Row Header */}
                  <div
                    onClick={() => toggleFolder(session.id)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50/80 cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3">
                      {isExpanded ? (
                        <FolderOpen className="w-5 h-5 text-amber-500 fill-amber-100" />
                      ) : (
                        <Folder className="w-5 h-5 text-amber-500 fill-amber-100" />
                      )}
                      <span className="font-medium text-sm text-slate-800">
                        {session.title}
                      </span>
                    </div>

                    <div className="text-slate-400">
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-slate-600" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  </div>

                  {/* Expanded Content: 3 Real Colored Action Pills (Matching media_1790768128447.png) */}
                  {isExpanded && (
                    <div className="px-6 py-4 bg-slate-50/40 border-t border-slate-100 space-y-3">
                      {session.hasActionButtons ? (
                        <div className="space-y-3 pl-2 sm:pl-4 max-w-2xl">
                          {/* 1. Green Pill: ▶ Session Videos 🔗 */}
                          <button
                            onClick={() => handleOpenVideos(session)}
                            className="w-full bg-[#2dbd9f] hover:bg-[#25a78c] text-white font-medium text-xs sm:text-sm py-2.5 px-4 rounded-full flex items-center justify-between shadow-2xs transition-all transform active:scale-[0.99] cursor-pointer"
                          >
                            <div className="flex items-center gap-2">
                              <Play className="w-3.5 h-3.5 fill-white" />
                              <span>Session Videos</span>
                            </div>
                            <ExternalLink className="w-3.5 h-3.5 opacity-90" />
                          </button>

                          {/* 2. Blue Pill: ▶ Session Materials 🔗 (Downloads .zip) */}
                          <button
                            onClick={() => handleDownloadMaterials(session)}
                            className="w-full bg-[#3b97e9] hover:bg-[#2b86d6] text-white font-medium text-xs sm:text-sm py-2.5 px-4 rounded-full flex items-center justify-between shadow-2xs transition-all transform active:scale-[0.99] cursor-pointer"
                          >
                            <div className="flex items-center gap-2">
                              <Play className="w-3.5 h-3.5 fill-white" />
                              <span>Session Materials</span>
                            </div>
                            <ExternalLink className="w-3.5 h-3.5 opacity-90" />
                          </button>

                          {/* 3. Orange Pill: ▶ Session Assignments 🔗 (Downloads Assignment) */}
                          <button
                            onClick={() => handleDownloadAssignments(session)}
                            className="w-full bg-[#f39c12] hover:bg-[#de8c0a] text-white font-medium text-xs sm:text-sm py-2.5 px-4 rounded-full flex items-center justify-between shadow-2xs transition-all transform active:scale-[0.99] cursor-pointer"
                          >
                            <div className="flex items-center gap-2">
                              <Play className="w-3.5 h-3.5 fill-white" />
                              <span>Session Assignments</span>
                            </div>
                            <ExternalLink className="w-3.5 h-3.5 opacity-90" />
                          </button>

                          {/* 4. Emerald Pill: ⬆ Upload Session Solution */}
                          <button
                            onClick={() => handleOpenUploadModal(session)}
                            className="w-full bg-[#10b981] hover:bg-[#059669] text-white font-medium text-xs sm:text-sm py-2.5 px-4 rounded-full flex items-center justify-between shadow-2xs transition-all transform active:scale-[0.99] cursor-pointer"
                          >
                            <div className="flex items-center gap-2">
                              <UploadCloud className="w-3.5 h-3.5" />
                              <span>Upload Session Assignment / Solution</span>
                            </div>
                            <ExternalLink className="w-3.5 h-3.5 opacity-90" />
                          </button>
                        </div>
                      ) : (
                        // If it's a practical questions folder
                        <div className="space-y-2 pl-2 sm:pl-4">
                          {(session.items || []).map((file, idx) => (
                            <div 
                              key={idx}
                              onClick={() => {
                                downloadFile(file.title);
                                showToast(`Downloading: ${file.title}`);
                              }}
                              className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200/80 hover:border-orange-300 transition-colors cursor-pointer group"
                            >
                              <div className="flex items-center gap-2 text-xs font-medium text-slate-700 group-hover:text-orange-600">
                                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                                <span>{file.title}</span>
                              </div>
                              <Download className="w-3.5 h-3.5 text-slate-400 group-hover:text-orange-600" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Master Google Drive Hub Link */}
          <div className="flex justify-end pt-2">
            <a 
              href={getSubjectDriveUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors"
            >
              <Folder className="w-3.5 h-3.5 text-blue-500" />
              <span>Open Master Drive Repository</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}

      {/* VIEW B: SessionVideo.aspx (Matching media_1790768138419.png and media_1790768148277.png) */}
      {viewMode === 'videos' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Side: Table (S.No | Link Description | Action [Play]) */}
            <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
              <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between">
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700">
                  {selectedSession.title} - Video Lectures
                </h3>
                <span className="text-[11px] font-semibold text-slate-400">
                  {selectedSession.recordingDate || "05.06.2026"}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-700 font-semibold">
                      <th className="py-2.5 px-4 w-14">S.No</th>
                      <th className="py-2.5 px-4">Link Description</th>
                      <th className="py-2.5 px-4 text-center w-24">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {/* Class 1 Row */}
                    <tr className={`hover:bg-slate-50 transition-colors ${activeVideo.sNo === 1 ? 'bg-teal-50/40' : ''}`}>
                      <td className="py-3 px-4 font-mono font-medium text-slate-600">1</td>
                      <td className="py-3 px-4 font-medium text-slate-800">
                        Class 1
                        <span className="block text-[10px] text-slate-400 font-normal">
                          {selectedSession.videoFileName || "Class Lecture Stream"}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handlePlayClass(1, "Class 1", `${selectedSession.title} Class 1 Video`)}
                          className="inline-flex items-center justify-center gap-1.5 bg-[#2dbd9f] hover:bg-[#25a78c] text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-2xs transition-all cursor-pointer active:scale-95"
                        >
                          <Play className="w-3 h-3 fill-white" />
                          <span>Play</span>
                        </button>
                      </td>
                    </tr>

                    {/* Class 2 Row (For multi-part lectures) */}
                    <tr className={`hover:bg-slate-50 transition-colors ${activeVideo.sNo === 2 ? 'bg-teal-50/40' : ''}`}>
                      <td className="py-3 px-4 font-mono font-medium text-slate-600">2</td>
                      <td className="py-3 px-4 font-medium text-slate-800">
                        Class 2
                        <span className="block text-[10px] text-slate-400 font-normal">
                          Hands-on Problem Solving & Review
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handlePlayClass(2, "Class 2", `${selectedSession.title} Class 2 Advanced Cases`)}
                          className="inline-flex items-center justify-center gap-1.5 bg-[#2dbd9f] hover:bg-[#25a78c] text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-2xs transition-all cursor-pointer active:scale-95"
                        >
                          <Play className="w-3 h-3 fill-white" />
                          <span>Play</span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Fast Session Switcher inside Video View */}
              <div className="p-4 bg-slate-50/70 border-t border-slate-200/70 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  Other Sessions:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {sessions.filter(s => s.hasActionButtons).map((s) => (
                    <button
                      key={s.id}
                      onClick={() => handleOpenVideos(s)}
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                        selectedSession.id === s.id
                          ? 'bg-slate-900 text-white'
                          : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {s.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side: Video Player Container with Domain Engine Selector & Anti-Screenshot / Blackout Protection */}
            <div className="lg:col-span-7 space-y-3">
              {/* Domain & Player Engine Bar (Allowing playback on mdsajid-ui.github.io) */}
              <div className="bg-slate-900 text-white p-3 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="font-semibold text-slate-200">
                    Playback Domain: <span className="text-emerald-400 font-mono">mdsajid-ui.github.io</span> (Active)
                  </span>
                </div>

                <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-[11px] self-start sm:self-auto">
                  <button
                    onClick={() => setPlayerEngine('direct')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      playerEngine === 'direct'
                        ? 'bg-[#2dbd9f] text-white shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Direct Player</span>
                  </button>
                  <button
                    onClick={() => setPlayerEngine('vdocipher')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      playerEngine === 'vdocipher'
                        ? 'bg-[#3b97e9] text-white shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Lock className="w-3 h-3" />
                    <span>VdoCipher DRM</span>
                  </button>
                  <button
                    onClick={() => setPlayerEngine('drive')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      playerEngine === 'drive'
                        ? 'bg-[#f39c12] text-white shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Folder className="w-3 h-3" />
                    <span>Drive Hub</span>
                  </button>
                </div>
              </div>

              <div 
                className="relative bg-black rounded-2xl overflow-hidden shadow-xl border border-slate-800 select-none group"
                onContextMenu={(e) => e.preventDefault()}
              >
                {/* 1. BLACKOUT SHIELD - Activated on PrintScreen, Snipping tool, recording detection */}
                {isBlackout && (
                  <div className="absolute inset-0 z-50 bg-black text-white flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-100">
                    <div className="w-16 h-16 rounded-2xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500 mb-4 animate-bounce">
                      <Lock className="w-8 h-8" />
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-white tracking-wide">
                      Security Alert: Screen Capture Prohibited
                    </h4>
                    <p className="text-xs text-slate-300 max-w-md mt-2 leading-relaxed">
                      This lecture stream is protected under DV Analytics DRM anti-piracy protocol. Screenshots, screen recording, and unauthorized replication are strictly prohibited.
                    </p>
                    <div className="mt-3 text-[11px] font-mono text-red-400 bg-red-950/60 px-3 py-1 rounded-lg border border-red-800/60">
                      Reason: {blackoutReason || "Screen Capture Intercept"} • ID: {student.courseCode}-{student.rollNo || "202606"}
                    </div>
                    <button
                      onClick={handleDismissBlackout}
                      className="mt-5 inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Resume Secure Video Stream</span>
                    </button>
                  </div>
                )}

                {/* 2. Floating Dynamic Watermark (Drifts across screen to prevent cam recording) */}
                <div 
                  className="absolute z-20 pointer-events-none transition-all duration-1000 ease-in-out text-white/30 text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase select-none drop-shadow-md"
                  style={{
                    top: `${watermarkPos.y}%`,
                    left: `${watermarkPos.x}%`,
                    textShadow: '0 1px 2px rgba(0,0,0,0.8)'
                  }}
                >
                  {student.name} • {student.courseCode} • DRM PROTECTED
                </div>

                {/* 3. Secure Video Stream Player */}
                <div style={{ paddingTop: '56.25%', position: 'relative' }}>
                  {playerEngine === 'direct' && (
                    <div className="absolute inset-0 w-full h-full bg-black">
                      <video
                        ref={videoRef}
                        key={`${activeVideo.sNo}-${activeVideo.title}`}
                        controls
                        playsInline
                        controlsList="nodownload noplaybackrate"
                        disablePictureInPicture
                        onPlay={() => setIsVideoPlaying(true)}
                        onPause={() => setIsVideoPlaying(false)}
                        onEnded={() => setIsVideoPlaying(false)}
                        style={{ 
                          border: 0, 
                          maxWidth: '100%', 
                          position: 'absolute', 
                          top: 0, 
                          left: 0, 
                          height: '100%', 
                          width: '100%' 
                        }}
                        className="bg-black w-full h-full object-contain"
                        poster="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
                      >
                        <source src="./sample-lecture.mp4" type="video/mp4" />
                        <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                        Your browser does not support HTML5 video playback.
                      </video>

                      {/* Click-to-Play Overlay when video is not playing */}
                      {!isVideoPlaying && (
                        <div 
                          onClick={() => {
                            if (videoRef.current) {
                              videoRef.current.play().catch(e => console.log('Overlay play error:', e));
                            }
                          }}
                          className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/40 hover:bg-black/25 transition-all cursor-pointer group/overlay"
                        >
                          <div className="w-16 h-16 rounded-full bg-emerald-500 group-hover/overlay:bg-emerald-400 text-white flex items-center justify-center shadow-2xl transform group-hover/overlay:scale-110 transition-all">
                            <Play className="w-8 h-8 fill-white ml-1" />
                          </div>
                          <span className="mt-3 text-xs font-bold text-white tracking-wide bg-slate-900/90 px-4 py-1.5 rounded-full border border-slate-700 shadow-md">
                            Click to Play {activeVideo.title}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {playerEngine === 'vdocipher' && (
                    <iframe 
                      src={activeVideo.embedUrl || defaultEmbedUrl}
                      referrerPolicy="no-referrer"
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
                      allow="encrypted-media *; autoplay *; fullscreen *"
                      title={activeVideo.title}
                    />
                  )}

                  {playerEngine === 'drive' && (
                    <div 
                      style={{ 
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        height: '100%', 
                        width: '100%' 
                      }}
                      className="flex flex-col items-center justify-center p-6 text-center bg-slate-950 text-white space-y-3"
                    >
                      <Folder className="w-12 h-12 text-amber-400" />
                      <h4 className="text-sm font-bold">{selectedSession.title} Master Cloud Video</h4>
                      <p className="text-xs text-slate-400 max-w-sm">
                        Direct Google Drive video stream: {selectedSession.videoFileName || "SESSION-1.mp4"} ({selectedSession.videoSize || "HD"})
                      </p>
                      <a
                        href={selectedSession.driveFolderUrl || getSubjectDriveUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Watch on Google Drive Hub</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Video Info & Quick Resource Downloads */}
              <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      Now Playing
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      {selectedSession.title} : {activeVideo.title}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Faculty: <strong className="text-slate-700">{selectedSession.instructor || "Dr. Sandip Mukherjee"}</strong> • Anti-Piracy DRM Enabled
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <button
                    onClick={() => handleDownloadMaterials(selectedSession)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#3b97e9] hover:bg-[#2b86d6] text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Materials (.zip)</span>
                  </button>

                  <button
                    onClick={() => handleDownloadAssignments(selectedSession)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f39c12] hover:bg-[#de8c0a] text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Assignment</span>
                  </button>

                  <button
                    onClick={() => handleOpenUploadModal(selectedSession)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2dbd9f] hover:bg-[#25a78c] text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                  >
                    <UploadCloud className="w-3.5 h-3.5" />
                    <span>Upload Solution</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Upload Modal for Session Solution */}
      {activeUploadSession && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-teal-400 font-bold">
                  Session Solution Submission
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white mt-0.5 truncate max-w-sm">
                  {activeUploadSession.title}
                </h3>
              </div>
              <button 
                onClick={() => setActiveUploadSession(null)}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div 
                onClick={() => sessionFileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 hover:border-teal-500 rounded-2xl p-6 text-center bg-slate-50/60 hover:bg-teal-50/20 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 group"
              >
                <input 
                  type="file" 
                  ref={sessionFileInputRef} 
                  onChange={handleSessionFileChange} 
                  className="hidden" 
                  accept=".xlsx,.xls,.csv,.sql,.py,.ipynb,.zip,.pdf"
                />
                <div className="w-12 h-12 rounded-2xl bg-teal-100 group-hover:bg-teal-200 text-teal-600 flex items-center justify-center transition-colors">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">
                    Click to browse or drop session exercise file
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Supports .xlsx, .sql, .py, .ipynb, .zip, .pdf (Max: 50MB)
                  </p>
                </div>
              </div>

              {uploadedSessionFile && (
                <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileSpreadsheet className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <div className="truncate max-w-[260px]">
                      <span className="text-xs font-bold text-slate-800 block truncate">{uploadedSessionFile.name}</span>
                      <span className="text-[10px] text-emerald-700 font-mono">{uploadedSessionFile.size} • Ready</span>
                    </div>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setUploadedSessionFile(null); }}
                    className="p-1 text-slate-400 hover:text-red-500 rounded cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  Submission Notes (Optional):
                </label>
                <textarea
                  value={sessionUploadNotes}
                  onChange={(e) => setSessionUploadNotes(e.target.value)}
                  placeholder="Notes about your exercise output, queries, or results..."
                  rows={2}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 text-slate-800"
                />
              </div>

              {isUploadingSession && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600">
                    <span>Uploading solution...</span>
                    <span>{sessionUploadProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-teal-500 transition-all duration-200" 
                      style={{ width: `${sessionUploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveUploadSession(null)}
                  disabled={isUploadingSession}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSessionSubmit}
                  disabled={isUploadingSession || !uploadedSessionFile}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-xs transition-all flex items-center gap-2 cursor-pointer ${
                    isUploadingSession || !uploadedSessionFile 
                      ? 'bg-slate-400 cursor-not-allowed opacity-70' 
                      : 'bg-[#2dbd9f] hover:bg-[#25a78c]'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isUploadingSession ? "Uploading..." : "Confirm & Submit"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer strictly matching Screenshot (Copyright @ 2024 DV ANALYTICS) */}
      <footer className="pt-8 pb-4 text-center text-xs text-slate-400 font-medium tracking-wide">
        Copyright @ 2024 DV ANALYTICS
      </footer>
    </div>
  );
}
