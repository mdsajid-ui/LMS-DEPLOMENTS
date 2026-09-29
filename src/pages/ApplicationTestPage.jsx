import React, { useState } from 'react';
import { 
  FileEdit, 
  Calendar, 
  BookOpen, 
  ArrowRight, 
  HelpCircle, 
  Code, 
  Users, 
  CheckCircle2, 
  Clock, 
  Award,
  ChevronLeft
} from 'lucide-react';

export default function ApplicationTestPage({ student }) {
  const [activeSection, setActiveSection] = useState(null); // null, 'mcq', 'practical', 'interview'

  // MCQ state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [mcqSubmitted, setMcqSubmitted] = useState(false);

  const mcqQuestions = [
    {
      id: 1,
      q: "Which SQL clause is used to filter records after aggregation with GROUP BY?",
      options: ["WHERE", "HAVING", "ORDER BY", "FILTER"],
      correct: 1
    },
    {
      id: 2,
      q: "In Excel, what does the '#' operator denote after a dynamic formula range?",
      options: ["Error in reference", "Spilled range operator", "Absolute lock", "Table column reference"],
      correct: 1
    },
    {
      id: 3,
      q: "In Python Pandas, which method is used to remove missing/NaN values from a DataFrame?",
      options: ["df.drop_null()", "df.dropna()", "df.remove_nan()", "df.filter_na()"],
      correct: 1
    }
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Breadcrumb (Matching Image: Candidates Application Test (CAT)) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
          <FileEdit className="w-4 h-4 text-orange-500" />
          <span>/</span>
          <span className="text-slate-900 font-semibold">Candidates Application Test (CAT)</span>
          {activeSection && (
            <>
              <span>/</span>
              <span className="text-orange-600 font-semibold capitalize">{activeSection}</span>
            </>
          )}
        </div>

        {activeSection && (
          <button
            onClick={() => setActiveSection(null)}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 px-3 py-1.5 rounded-xl transition-all inline-flex items-center gap-1.5 self-start sm:self-auto"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Back to CAT Menu
          </button>
        )}
      </div>

      {/* Header Banner: APIDS & Date (Matching Black Pill Header in screenshot) */}
      <div className="bg-slate-950 text-white rounded-2xl px-6 py-4 flex items-center justify-between shadow-lg border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white">
              {student.courseCode}
            </h2>
            <span className="text-xs text-slate-400">
              Evaluation & Benchmark Assessment Portal
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-xs font-mono text-slate-200">
          <Calendar className="w-4 h-4 text-orange-400" />
          <span className="font-semibold">{student.startDate}</span>
        </div>
      </div>

      {!activeSection ? (
        /* The 3 Core Evaluation Blocks (Matching Exact Design & Colors in screenshot) */
        <div className="space-y-4">
          {/* Card 1: Multiple Choice Question (MCQ) - Royal Blue */}
          <button
            onClick={() => setActiveSection('mcq')}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-2xl px-6 py-5 flex items-center justify-between shadow-sm hover:shadow-md transition-all group transform active:scale-[0.99] text-left"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
                <FileEdit className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold tracking-wide">
                  Multiple Choice Question (MCQ)
                </h3>
                <p className="text-xs text-blue-100 font-normal mt-0.5">
                  Analytical Aptitude, SQL & Data Science Fundamentals • 30 Mins
                </p>
              </div>
            </div>

            <div className="w-10 h-10 rounded-full bg-white/20 group-hover:bg-white/30 flex items-center justify-center transition-all group-hover:translate-x-1">
              <ArrowRight className="w-5 h-5 text-white" />
            </div>
          </button>

          {/* Card 2: Practical Question - Warm Amber / Yellow */}
          <button
            onClick={() => setActiveSection('practical')}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white rounded-2xl px-6 py-5 flex items-center justify-between shadow-sm hover:shadow-md transition-all group transform active:scale-[0.99] text-left"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
                <FileEdit className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold tracking-wide">
                  Practical Question
                </h3>
                <p className="text-xs text-amber-100 font-normal mt-0.5">
                  Hands-on Dataset Cleaning, Formula Execution & SQL Queries • 60 Mins
                </p>
              </div>
            </div>

            <div className="w-10 h-10 rounded-full bg-white/20 group-hover:bg-white/30 flex items-center justify-center transition-all group-hover:translate-x-1">
              <ArrowRight className="w-5 h-5 text-white" />
            </div>
          </button>

          {/* Card 3: Personal Interview - Coral / Red */}
          <button
            onClick={() => setActiveSection('interview')}
            className="w-full bg-rose-500 hover:bg-rose-600 text-white rounded-2xl px-6 py-5 flex items-center justify-between shadow-sm hover:shadow-md transition-all group transform active:scale-[0.99] text-left"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
                <FileEdit className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold tracking-wide">
                  Personal Interview
                </h3>
                <p className="text-xs text-rose-100 font-normal mt-0.5">
                  1-on-1 Faculty Evaluation & Practical Case Study Discussion
                </p>
              </div>
            </div>

            <div className="w-10 h-10 rounded-full bg-white/20 group-hover:bg-white/30 flex items-center justify-center transition-all group-hover:translate-x-1">
              <ArrowRight className="w-5 h-5 text-white" />
            </div>
          </button>
        </div>
      ) : activeSection === 'mcq' ? (
        /* MCQ Assessment Simulator */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                Active Assessment
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-2">Multiple Choice Questions (MCQ)</h3>
              <p className="text-xs text-slate-500">Attempt all questions to evaluate your theoretical clarity.</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl">
              <Clock className="w-4 h-4 text-orange-500" />
              <span>28:45 Left</span>
            </div>
          </div>

          <div className="space-y-6">
            {mcqQuestions.map((q, idx) => (
              <div key={q.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <h4 className="text-sm font-bold text-slate-900">
                  <span className="text-blue-600 mr-2">Q{idx + 1}.</span> {q.q}
                </h4>
                <div className="space-y-2">
                  {q.options.map((opt, optIdx) => (
                    <label 
                      key={optIdx} 
                      className={`flex items-center gap-3 p-3 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                        selectedAnswers[q.id] === optIdx 
                          ? 'bg-blue-50 border-blue-400 text-blue-900' 
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`q-${q.id}`}
                        checked={selectedAnswers[q.id] === optIdx}
                        onChange={() => setSelectedAnswers({ ...selectedAnswers, [q.id]: optIdx })}
                        className="text-blue-600"
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              {Object.keys(selectedAnswers).length} of {mcqQuestions.length} answered
            </span>
            <button
              onClick={() => setMcqSubmitted(true)}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all"
            >
              Submit MCQ Responses
            </button>
          </div>

          {mcqSubmitted && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-2xl flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              MCQ assessment submitted successfully! Your score has been calculated and updated on your profile.
            </div>
          )}
        </div>
      ) : activeSection === 'practical' ? (
        /* Practical Question Lab */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5">
          <div className="pb-4 border-b border-slate-100">
            <span className="text-xs font-bold uppercase text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md">
              Practical Coding Lab
            </span>
            <h3 className="text-lg font-bold text-slate-900 mt-2">Practical Case Study & Dataset Challenge</h3>
            <p className="text-xs text-slate-500">Download the raw case dataset, perform the requested aggregations, and upload your finalized workbook.</p>
          </div>

          <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200 space-y-2">
            <h4 className="text-xs font-bold text-slate-900">Task Objective:</h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              Analyze monthly retail store transactions. Clean column names with improper whitespace, implement XLOOKUP to map inventory SKUs to vendor categories, and construct a dynamic Pivot Table summarizing quarterly GMV by region.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center gap-2">
              Download Question Dataset (.xlsx)
            </button>
            <button className="px-4 py-2.5 rounded-xl bg-orange-500 text-white font-bold text-xs flex items-center gap-2">
              Upload Solved Solution (.xlsx)
            </button>
          </div>
        </div>
      ) : (
        /* Personal Interview Slot */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5">
          <div className="pb-4 border-b border-slate-100">
            <span className="text-xs font-bold uppercase text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md">
              Faculty Viva Voce
            </span>
            <h3 className="text-lg font-bold text-slate-900 mt-2">Personal Interview (PI) Evaluation</h3>
            <p className="text-xs text-slate-500">Scheduled 1-on-1 viva with academic panel to assess conceptual grounding.</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-600">Interview Status:</span>
              <span className="font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                Slot Ready for Scheduling
              </span>
            </div>
            <p className="text-xs text-slate-500">Available time slots: Saturday & Sunday afternoon cohorts.</p>
          </div>

          <button className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-all">
            Confirm PI Time Slot
          </button>
        </div>
      )}
    </div>
  );
}
