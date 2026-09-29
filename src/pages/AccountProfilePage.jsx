import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, Shield, Save, CheckCircle2, Lock } from 'lucide-react';

export default function AccountProfilePage({ student }) {
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500 font-medium bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <User className="w-4 h-4 text-orange-500" />
        <span>/</span>
        <span className="text-slate-900 font-semibold">Account Profile</span>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Profile updated successfully!
        </div>
      )}

      {/* Main Profile Info Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex items-center gap-5 pb-6 border-b border-slate-100">
          <img
            src={student.avatar}
            alt={student.name}
            className="w-20 h-20 rounded-2xl object-cover ring-4 ring-orange-500/20"
          />
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-orange-50 text-orange-600 border border-orange-200">
              {student.batch}
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-1">{student.name}</h2>
            <p className="text-xs text-slate-500 font-mono">Student ID: {student.studentId}</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Full Legal Name</label>
              <input
                type="text"
                defaultValue={student.name}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
              <input
                type="email"
                defaultValue={student.email}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Active Program</label>
              <input
                type="text"
                disabled
                defaultValue={`${student.courseCode} - Advanced Program in Data Science`}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Batch Enrollment Date</label>
              <input
                type="text"
                disabled
                defaultValue={student.startDate}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" /> Save Profile Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
