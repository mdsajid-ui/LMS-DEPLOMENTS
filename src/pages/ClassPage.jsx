import React, { useState } from 'react';
import { 
  Video, 
  Calendar, 
  Clock, 
  ExternalLink, 
  PlayCircle, 
  Users, 
  CheckCircle,
  Copy,
  Check,
  Radio,
  User,
  ShieldCheck,
  Phone,
  Mail,
  Sparkles
} from 'lucide-react';
import ZoomMeetingModal from '../components/ZoomMeetingModal';
import { mentorZoomList, defaultActiveMentor } from '../data/mentorZoomData';
import { getStoredLiveClasses, subscribeToDataUpdates } from '../utils/lmsStorage';

export default function ClassPage({ student }) {
  const [zoomModalOpen, setZoomModalOpen] = useState(false);
  const [activeMentorId, setActiveMentorId] = useState("DVMENTOR4");
  const [copiedId, setCopiedId] = useState(false);
  const [copiedPass, setCopiedPass] = useState(false);
  const [liveClasses, setLiveClasses] = useState(() => getStoredLiveClasses());

  useEffect(() => {
    const unsub = subscribeToDataUpdates((e) => {
      if (e?.type === 'live_classes' || e?.type === 'storage_sync') {
        setLiveClasses(getStoredLiveClasses());
      }
    });
    return () => unsub();
  }, []);

  const currentActiveClass = liveClasses.find(c => c.status === "LIVE NOW") || liveClasses[0];
  const featuredMentor = mentorZoomList.find(m => m.id === (currentActiveClass?.mentorId || "DVMENTOR4")) || defaultActiveMentor;

  const handleOpenZoom = (mentorId = "DVMENTOR4") => {
    setActiveMentorId(mentorId);
    setZoomModalOpen(true);
  };

  const handleCopy = (text, isPass = false) => {
    navigator.clipboard?.writeText(text);
    if (isPass) {
      setCopiedPass(true);
      setTimeout(() => setCopiedPass(false), 2000);
    } else {
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto font-sans text-slate-800">
      {/* Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
          <Video className="w-4 h-4 text-orange-500" />
          <span>/</span>
          <span className="text-slate-900 font-bold tracking-tight">Live Classroom & Mentorship Rooms</span>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
            Zoom Enterprise HD
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => handleOpenZoom("DVMENTOR4")}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all cursor-pointer transform active:scale-95"
          >
            <Video className="w-4 h-4" />
            <span>Join Mentor 4 Room</span>
          </button>
        </div>
      </div>

      {/* Featured Live Room Banner (DVMENTOR4 - Debashish Sir / Ganesh, Sajid) */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-black tracking-wide">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                LIVE NOW • ACTIVE SESSION
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-mono font-bold">
                Room: DVMENTOR4
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Live Practical Class & Doubt Clearing Lab
            </h2>
            
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Instructor: <strong className="text-white">{featuredMentor.facultyName}</strong> ({featuredMentor.role}) • Cohort: <span className="text-teal-300 font-semibold">{featuredMentor.cohort}</span>
            </p>

            {/* Quick credentials chip */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
              <div className="bg-slate-900/90 border border-slate-700/80 px-3 py-1.5 rounded-xl flex items-center gap-2">
                <span className="text-slate-400 text-[11px]">Meeting ID:</span>
                <span className="font-mono font-bold text-white tracking-wide">{featuredMentor.meetingId}</span>
                <button 
                  onClick={() => handleCopy(featuredMentor.rawMeetingId, false)} 
                  className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
                  title="Copy Meeting ID"
                >
                  {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="bg-slate-900/90 border border-slate-700/80 px-3 py-1.5 rounded-xl flex items-center gap-2">
                <span className="text-slate-400 text-[11px]">Passcode:</span>
                <span className="font-mono font-bold text-emerald-400 tracking-wide">{featuredMentor.passcode}</span>
                <button 
                  onClick={() => handleCopy(featuredMentor.passcode, true)} 
                  className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
                  title="Copy Passcode"
                >
                  {copiedPass ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="bg-slate-900/90 border border-slate-700/80 px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-slate-300">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                <span>{featuredMentor.timings}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 flex-shrink-0">
            <button 
              onClick={() => handleOpenZoom("DVMENTOR4")}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-sm shadow-xl hover:shadow-2xl transition-all transform active:scale-95 cursor-pointer"
            >
              <Video className="w-5 h-5 animate-pulse" />
              <span>Join Live Zoom Lecture</span>
              <ExternalLink className="w-4 h-4 opacity-80" />
            </button>

            <button
              onClick={() => window.open(featuredMentor.webJoinUrl, '_blank')}
              className="px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-semibold text-center border border-slate-700 transition-colors cursor-pointer"
            >
              Join in Web Browser (No App Required)
            </button>
          </div>
        </div>
      </div>

      {/* All 5 Mentor Rooms Grid */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base">All DV Analytics Mentor Rooms (1 to 5)</h3>
            <p className="text-xs text-slate-500">Switch rooms depending on your scheduled faculty and subject module</p>
          </div>
          <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full self-start sm:self-auto">
            5 Dedicated Zoom Rooms
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
          {mentorZoomList.map((m) => {
            const isLive = m.status === 'LIVE NOW';
            return (
              <div 
                key={m.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                  isLive 
                    ? 'bg-blue-50/50 border-blue-200 shadow-xs hover:border-blue-300' 
                    : 'bg-slate-50/70 border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-slate-900 text-white">
                      {m.id}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isLive 
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                        : 'bg-slate-200 text-slate-600'
                    }`}>
                      {m.status}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-900 mt-1">{m.name}</h4>
                    <p className="text-[11px] text-slate-500">{m.role}</p>
                  </div>

                  <div className="text-[11px] space-y-1 pt-1 border-t border-slate-200/60 font-mono text-slate-600">
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-sans">Meeting ID:</span>
                      <span className="font-bold">{m.meetingId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-sans">Passcode:</span>
                      <span className="font-bold text-emerald-700">{m.passcode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-sans">Timings:</span>
                      <span className="text-slate-700 font-sans text-[10px]">{m.timings}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-200/60 flex items-center gap-2">
                  <button
                    onClick={() => handleOpenZoom(m.id)}
                    className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      isLive 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs' 
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Join Room</span>
                  </button>
                  <button
                    onClick={() => handleCopy(m.rawMeetingId, false)}
                    className="p-1.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 text-slate-600"
                    title="Copy Meeting ID"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Class Schedule & Broadcast Center */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-teal-600" />
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">Scheduled Live Class Timetable</h3>
              <p className="text-xs text-slate-500">Live sessions broadcasted by DV Analytics Admin & Faculty Team</p>
            </div>
          </div>
          <span className="text-xs font-bold text-teal-800 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full self-start sm:self-auto flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
            Synced with Admin Portal
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                <th className="py-2.5 px-3">Date & Slot</th>
                <th className="py-2.5 px-3">Batch</th>
                <th className="py-2.5 px-3">Subject & Session Agenda</th>
                <th className="py-2.5 px-3">Mentor Room</th>
                <th className="py-2.5 px-3 text-center">Status</th>
                <th className="py-2.5 px-3 text-right">Join Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {liveClasses.map((cls) => {
                const isLive = cls.status === "LIVE NOW";
                return (
                  <tr key={cls.id} className={`hover:bg-slate-50/70 transition-colors ${isLive ? 'bg-red-50/30' : ''}`}>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="font-bold text-slate-900">{cls.date}</div>
                      <div className="text-slate-500 text-[11px] flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{cls.time}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded-full font-bold text-[11px] bg-teal-50 text-teal-800 border border-teal-200">
                        {cls.batch}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-900">{cls.subject}</div>
                      <div className="text-slate-500 text-[11px]">{cls.topic}</div>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="font-mono font-bold text-slate-800 mr-1.5">{cls.mentorId}</span>
                      <span className="text-slate-600 text-[11px]">({cls.mentor?.split('(')[0] || cls.mentor})</span>
                    </td>
                    <td className="py-3 px-3 text-center whitespace-nowrap">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold inline-flex items-center gap-1 ${
                        isLive 
                          ? 'bg-red-100 text-red-700 animate-pulse border border-red-200' 
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}>
                        {isLive && <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>}
                        {cls.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenZoom(cls.mentorId || "DVMENTOR4")}
                          className={`py-1.5 px-3 rounded-xl font-bold text-[11px] flex items-center gap-1 transition-all cursor-pointer ${
                            isLive
                              ? 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-xs'
                              : 'bg-slate-900 hover:bg-slate-800 text-white'
                          }`}
                        >
                          <Video className="w-3.5 h-3.5" />
                          <span>{isLive ? 'Join Live Now' : 'Enter Room'}</span>
                        </button>
                        <a
                          href={cls.webJoinUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 px-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 text-[11px] font-semibold transition-colors"
                          title="Join via Web Browser"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Troubleshooting Banner */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-900">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-700 flex items-center justify-center font-bold">
            ?
          </div>
          <div>
            <strong className="block text-slate-900">Live Classes Schedule Joining Problem?</strong>
            <span className="text-amber-800">
              Pop-ups blocked or Zoom passcode prompt? Click the "Join in Web Browser" button inside the modal to bypass app issues.
            </span>
          </div>
        </div>
        <button
          onClick={() => handleOpenZoom("DVMENTOR4")}
          className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs whitespace-nowrap cursor-pointer transition-colors"
        >
          View Troubleshooting
        </button>
      </div>

      {/* Zoom Modal */}
      <ZoomMeetingModal
        isOpen={zoomModalOpen}
        onClose={() => setZoomModalOpen(false)}
        defaultMentorId={activeMentorId}
      />
    </div>
  );
}
