import React, { useState } from 'react';
import { 
  ClipboardList, 
  Clock, 
  UploadCloud, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Download,
  Calendar
} from 'lucide-react';
import { assignmentsList } from '../data/mockData';

export default function AssignmentsPage({ student }) {
  const [assignments, setAssignments] = useState(assignmentsList);
  const [filter, setFilter] = useState('all');
  const [selectedAsn, setSelectedAsn] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleUploadMock = (id) => {
    setAssignments(prev => prev.map(a => {
      if (a.id === id) {
        return { ...a, status: 'Submitted', submissionDate: 'Just now' };
      }
      return a;
    }));
    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 3000);
  };

  const filtered = assignments.filter(a => {
    if (filter === 'pending') return a.status === 'Pending';
    if (filter === 'submitted') return a.status === 'Submitted';
    return true;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
          <ClipboardList className="w-4 h-4 text-orange-500" />
          <span>/</span>
          <span className="text-slate-900 font-semibold">Assignments</span>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2">
          {['all', 'pending', 'submitted'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs capitalize px-3 py-1.5 rounded-xl font-semibold transition-all ${
                filter === f
                  ? 'bg-orange-500 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f} ({f === 'all' ? assignments.length : assignments.filter(a => a.status.toLowerCase() === f).length})
            </button>
          ))}
        </div>
      </div>

      {uploadSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Assignment solution submitted successfully! Mentor evaluation in progress.
        </div>
      )}

      {/* Assignment Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item) => (
          <div 
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-all group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                  {item.id}
                </span>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                  item.status === 'Submitted'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  {item.status}
                </span>
              </div>

              <h3 className="font-bold text-slate-900 text-sm group-hover:text-orange-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Subject: <span className="font-medium text-slate-700">{item.subject}</span>
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-500">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    Due Date:
                  </span>
                  <span className="font-semibold text-red-600">{item.deadline}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Max Marks:</span>
                  <span className="font-bold text-slate-800">{item.totalMarks} Pts</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100">
              {item.status === 'Pending' ? (
                <button
                  onClick={() => handleUploadMock(item.id)}
                  className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <UploadCloud className="w-4 h-4" />
                  Submit Assignment
                </button>
              ) : (
                <div className="w-full py-2 text-center text-xs font-semibold text-emerald-600 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Submitted for Review
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
