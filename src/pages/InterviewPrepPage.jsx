import React, { useState } from 'react';
import { Briefcase, BookOpen, Search, Download, CheckCircle, ChevronRight, Star } from 'lucide-react';

export default function InterviewPrepPage() {
  const [activeCategory, setActiveCategory] = useState('sql');

  const questions = [
    {
      id: 1,
      category: 'sql',
      company: 'Amazon / Fractal Analytics',
      difficulty: 'Medium',
      q: 'Find the second highest salary without using TOP or LIMIT clauses.',
      ans: 'Use subquery: SELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees); Or using DENSE_RANK() OVER (ORDER BY salary DESC).'
    },
    {
      id: 2,
      category: 'sql',
      company: 'Deloitte / TCS',
      difficulty: 'Hard',
      q: 'Explain the difference between UNION and UNION ALL with performance implications.',
      ans: 'UNION removes duplicate rows using an internal distinct sort, incurring high CPU cost. UNION ALL concatenates results directly without deduplication, making it significantly faster.'
    },
    {
      id: 3,
      category: 'python',
      company: 'Mu Sigma / Tiger Analytics',
      difficulty: 'Medium',
      q: 'How does Python handle memory management and what is the GIL?',
      ans: 'Python uses private heap memory managed by the Python memory manager. The Global Interpreter Lock (GIL) is a mutex that prevents multiple native threads from executing Python bytecodes simultaneously.'
    },
    {
      id: 4,
      category: 'excel',
      company: 'EY / PwC',
      difficulty: 'Easy',
      q: 'What is the main advantage of XLOOKUP over VLOOKUP?',
      ans: 'XLOOKUP searches both to the left and right, defaults to exact match, does not require column index numbers, and handles vertical and horizontal lookup natively without failing when columns are inserted.'
    }
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500 font-medium bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <Briefcase className="w-4 h-4 text-orange-500" />
        <span>/</span>
        <span className="text-slate-900 font-semibold">Interview Prep Kit</span>
      </div>

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">Placement Acceleration</span>
          <h2 className="text-2xl font-bold tracking-tight mt-1">Data Science Interview Question Bank</h2>
          <p className="text-xs text-slate-300 mt-1">
            Over 500+ real interview questions asked at top MNCs, analytics firms, and tech startups.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md transition-all self-start md:self-auto">
          <Download className="w-4 h-4" /> Download Full PDF Kit
        </button>
      </div>

      {/* Categories Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'all', label: 'All Domains' },
          { id: 'sql', label: 'SQL & Database' },
          { id: 'python', label: 'Python & Data Structures' },
          { id: 'excel', label: 'Advanced Excel & Business Analytics' },
          { id: 'ml', label: 'Machine Learning & Stats' },
          { id: 'bi', label: 'Power BI & Tableau' }
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`text-xs px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Question Cards */}
      <div className="space-y-4">
        {questions
          .filter(q => activeCategory === 'all' || q.category === activeCategory)
          .map((q) => (
            <div key={q.id} className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:border-orange-300 transition-all">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                  {q.company}
                </span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                  q.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-700' : q.difficulty === 'Medium' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'
                }`}>
                  {q.difficulty}
                </span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm mt-1">{q.q}</h4>
              <div className="mt-3 p-3 bg-slate-50 rounded-xl text-xs text-slate-700 font-mono leading-relaxed border border-slate-200/60">
                <strong className="text-slate-900 font-sans block mb-1">Recommended Solution:</strong>
                {q.ans}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
