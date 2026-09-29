import React, { useState } from 'react';
import { Settings, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ChangeProgramPage({ student }) {
  const [selectedCohort, setSelectedCohort] = useState('weekend');
  const [requested, setRequested] = useState(false);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500 font-medium bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <Settings className="w-4 h-4 text-orange-500" />
        <span>/</span>
        <span className="text-slate-900 font-semibold">Change Program & Cohort Transfer</span>
      </div>

      {requested && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Cohort transfer request submitted to Academic Dean. You will be contacted within 24 hours.
        </div>
      )}

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Transfer Cohort / Specialization</h3>
          <p className="text-xs text-slate-500 mt-0.5">Switch between weekday live batches, weekend cohorts, or add electives.</p>
        </div>

        <div className="space-y-3">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-600">Current Program:</span>
            <span className="font-bold text-slate-900">{student.courseCode} ({student.batch})</span>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-2">Request Transfer To:</label>
            <div className="space-y-2">
              {[
                { id: 'weekend', title: 'APIDS Weekend Cohort (Saturday & Sunday 10 AM - 2 PM)' },
                { id: 'genai', title: 'APIDS + Advanced Generative AI & Agentic Engineering Specialization' },
                { id: 'self-paced', title: 'Flexible Self-Paced Track with Weekly Mentor Review' }
              ].map(opt => (
                <label 
                  key={opt.id} 
                  className={`flex items-center gap-3 p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    selectedCohort === opt.id ? 'bg-orange-50 border-orange-400 text-orange-950 font-bold' : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="cohort"
                    checked={selectedCohort === opt.id}
                    onChange={() => setSelectedCohort(opt.id)}
                    className="text-orange-500"
                  />
                  <span>{opt.title}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={() => setRequested(true)}
            className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Submit Transfer Request
          </button>
        </div>
      </div>
    </div>
  );
}
