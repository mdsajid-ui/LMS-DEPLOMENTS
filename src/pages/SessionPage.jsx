import React, { useState } from 'react';
import { 
  BookOpen, 
  Calendar, 
  Folder, 
  FolderOpen, 
  ChevronDown, 
  ChevronUp, 
  PlayCircle, 
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
  Bookmark
} from 'lucide-react';
import { excelSessions } from '../data/mockData';

export default function SessionPage({ 
  student, 
  subjectName = "EXCEL BASE AND ADVANCED",
  onBackToCourses 
}) {
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
    itemTitle: "Session Recording (Part 1 - Core Concepts)",
    type: "video",
    instructor: "Dr. Sandip Mukherjee",
    date: "07.06.2026"
  });

  const [activeTab, setActiveTab] = useState('resources'); // resources, notes, qa
  const [personalNotes, setPersonalNotes] = useState(
    "- Key takeaway: Use $ before column or row for absolute references (e.g. $A$1 vs $A1 vs A$1).\n- Nested IF vs IFS: Prefer IFS in Excel 365 for cleaner readability.\n- Dynamic arrays spill automatically with # operator."
  );
  const [notesSaved, setNotesSaved] = useState(false);

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

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Breadcrumb (Matching Image 5) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
          <button 
            onClick={onBackToCourses}
            className="flex items-center gap-1.5 text-slate-600 hover:text-orange-600 transition-colors"
          >
            <BookOpen className="w-4 h-4 text-orange-500" />
            <span>Courses</span>
          </button>
          <span>/</span>
          <span className="text-slate-900 font-semibold truncate">{subjectName}</span>
          <span>/</span>
          <span className="text-orange-600 font-semibold">Session</span>
        </div>

        <button
          onClick={onBackToCourses}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition-all inline-flex items-center gap-1.5 self-start sm:self-auto"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Courses
        </button>
      </div>

      {/* Header Banner: APIDS & Date (Matching Image 5) */}
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

      {/* Interactive Main Area: Video Player & Lecture details */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Simulated High-Res Video Player */}
        <div className="relative aspect-video sm:aspect-[21/9] bg-slate-950 flex flex-col justify-between p-4 sm:p-6 text-white group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 z-10 pointer-events-none"></div>

          {/* Background Poster / Graphic */}
          <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:16px_16px]"></div>

          {/* Top Bar inside player */}
          <div className="relative z-20 flex items-center justify-between">
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs font-medium text-slate-200">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              {activeItem.sessionTitle}
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition-all backdrop-blur-md">
                <Bookmark className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition-all backdrop-blur-md">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Center Play Button */}
          <div className="relative z-20 self-center flex flex-col items-center">
            <button className="w-16 h-16 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 text-white flex items-center justify-center shadow-xl shadow-orange-500/30 transform hover:scale-110 active:scale-95 transition-all">
              <PlayCircle className="w-9 h-9" />
            </button>
            <span className="text-xs font-semibold text-white/90 mt-2 bg-black/50 px-3 py-0.5 rounded-full backdrop-blur-xs">
              Click to Play High-Definition Recording
            </span>
          </div>

          {/* Bottom Video Progress & Controls */}
          <div className="relative z-20 space-y-2">
            <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden cursor-pointer">
              <div className="w-1/3 bg-orange-500 h-full rounded-full"></div>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px]">18:42 / 57:00</span>
                <span className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-mono">1.0x</span>
                <span className="px-1.5 py-0.5 rounded bg-white/10 text-[10px]">1080p HD</span>
              </div>
              <div className="flex items-center gap-3">
                <Volume2 className="w-4 h-4 cursor-pointer hover:text-white" />
                <Maximize2 className="w-4 h-4 cursor-pointer hover:text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Video Metadata & Tabs */}
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2.5 py-1 rounded-md border border-orange-100">
              Now Viewing
            </span>
            <h3 className="text-lg font-bold text-slate-900 mt-2">
              {activeItem.itemTitle}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Faculty: <span className="font-medium text-slate-800">{activeItem.instructor}</span> • Recorded on: {activeItem.date}
            </p>
          </div>

          {/* Resource Download Button */}
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors self-start md:self-auto shadow-xs">
            <Download className="w-4 h-4 text-orange-400" />
            Download Class Workbooks (.zip)
          </button>
        </div>

        {/* Tabs: Practice Files & Notes */}
        <div className="px-6 pt-2 border-b border-slate-100 flex items-center gap-6 text-xs font-semibold">
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

      {/* Accordion List of All Sessions (Matching Image 5) */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Course Curriculum & Recorded Lectures
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Click on any folder to expand the session recordings, practice assignments, and dataset files.
          </p>
        </div>

        <div className="space-y-3">
          {excelSessions.map((session) => {
            const isExpanded = expandedSessions[session.id];

            return (
              <div 
                key={session.id}
                className="border border-slate-200/90 rounded-2xl overflow-hidden transition-all duration-200"
              >
                {/* Session Folder Header (Matches folder icon + chevron in Image 5) */}
                <button
                  onClick={() => toggleSession(session.id)}
                  className={`w-full px-5 py-4 flex items-center justify-between text-left transition-colors ${
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
                  <div className="px-5 py-3 bg-white border-t border-slate-100 divide-y divide-slate-100">
                    {session.summary && (
                      <div className="py-2.5 text-xs text-slate-500 leading-relaxed italic bg-slate-50/60 p-3 rounded-xl mb-2">
                        {session.summary}
                      </div>
                    )}

                    {session.items.map((item) => (
                      <div 
                        key={item.id}
                        onClick={() => setActiveItem({
                          sessionTitle: session.title,
                          itemTitle: item.title,
                          type: item.type,
                          instructor: session.instructor || "Faculty",
                          date: session.recordingDate || "Available"
                        })}
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
