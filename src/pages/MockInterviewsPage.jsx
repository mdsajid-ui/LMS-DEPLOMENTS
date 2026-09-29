import React, { useState } from 'react';
import { ShieldCheck, Calendar, Clock, UserCheck, Video, Star, CheckCircle } from 'lucide-react';

export default function MockInterviewsPage() {
  const [booked, setBooked] = useState(false);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500 font-medium bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <ShieldCheck className="w-4 h-4 text-orange-500" />
        <span>/</span>
        <span className="text-slate-900 font-semibold">1-on-1 Mock Interviews</span>
      </div>

      {booked && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          Mock interview slot successfully booked! Google Meet link has been sent to your registered email.
        </div>
      )}

      {/* Main Booking Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Schedule Your Industry Technical Mock</h2>
          <p className="text-xs text-slate-500 mt-1">
            Simulate real corporate technical interviews with senior data scientists and receive detailed 360° feedback reports.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Slot 1 */}
          <div className="p-5 rounded-2xl border border-slate-200 hover:border-orange-400 transition-all bg-slate-50/50 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                Technical Round 1
              </span>
              <h4 className="font-bold text-slate-900 text-sm mt-2">SQL, Database Design & Advanced Excel</h4>
              <p className="text-xs text-slate-500 mt-1">Mentor: Senior Lead Data Analyst (Ex-Mu Sigma)</p>

              <div className="mt-4 space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Saturday, 04 Oct 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>5:00 PM - 5:45 PM IST (45 Mins)</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setBooked(true)}
              className="mt-5 w-full py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <Video className="w-4 h-4" /> Book Slot (Available)
            </button>
          </div>

          {/* Slot 2 */}
          <div className="p-5 rounded-2xl border border-slate-200 hover:border-orange-400 transition-all bg-slate-50/50 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                Technical Round 2
              </span>
              <h4 className="font-bold text-slate-900 text-sm mt-2">Python, Machine Learning & Gen AI Architecture</h4>
              <p className="text-xs text-slate-500 mt-1">Mentor: Principal AI Engineer</p>

              <div className="mt-4 space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Sunday, 05 Oct 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>11:00 AM - 11:45 AM IST</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setBooked(true)}
              className="mt-5 w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <Video className="w-4 h-4" /> Book Slot (Available)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
