import React, { useState } from 'react';
import { 
  FileEdit, 
  Calendar, 
  BookOpen, 
  Folder, 
  FolderOpen, 
  ChevronDown, 
  ChevronUp, 
  Download, 
  CheckCircle2, 
  Code, 
  Sparkles, 
  Briefcase, 
  FileText, 
  ExternalLink, 
  Copy, 
  Check, 
  Terminal, 
  Award,
  BookMarked,
  Lightbulb,
  MessageSquare
} from 'lucide-react';
import { studentProfile } from '../data/mockData';

export default function InterviewPrepPage({ student = studentProfile }) {
  // Expanded state for each step (supports multi-expand or accordion)
  const [expandedSteps, setExpandedSteps] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false
  });

  const [copiedKey, setCopiedKey] = useState(null);

  const toggleStep = (stepNumber) => {
    setExpandedSteps(prev => ({
      ...prev,
      [stepNumber]: !prev[stepNumber]
    }));
  };

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // The 7 Steps matching the exact colors and design from the screenshot
  const stepsData = [
    {
      step: 1,
      title: "Step 1: Resume Engineering & ATS Optimization",
      colorClass: "bg-[#1abc9c] hover:bg-[#16a085]",
      borderClass: "border-[#16a085]/30",
      description: "Industry-standard resume templates, ATS parsing rules, power action verbs, and portfolio project architecture.",
      sections: [
        {
          heading: "ATS (Applicant Tracking System) Score Guidelines",
          items: [
            "Use single-column standard format without graphical rating bars or tables that confuse ATS parsers.",
            "Include core keywords: SQL (CTEs, Window Functions), Python (Pandas, NumPy, Scikit-Learn), Power BI (DAX, Star Schema), ETL Pipelines.",
            "Quantify achievements with business impact metrics: 'Optimized SQL queries reducing execution time by 40%' or 'Automated reconciliation saving 12 manual hours/week'."
          ]
        },
        {
          heading: "Downloadable Placement Dossiers",
          downloadItems: [
            { name: "DV Analytics Harvard-Standard Resume Template (.docx)", size: "450 KB", type: "Word" },
            { name: "50+ High-Impact Action Verbs & Bullet Formulas (.pdf)", size: "1.2 MB", type: "PDF" },
            { name: "Top 10 GitHub Portfolio Readme Starter Files (.zip)", size: "3.4 MB", type: "ZIP" }
          ]
        }
      ]
    },
    {
      step: 2,
      title: "Step 2: Core SQL & Relational Database Mastery",
      colorClass: "bg-[#f39c12] hover:bg-[#e67e22]",
      borderClass: "border-[#e67e22]/30",
      description: "Top 50 technical interview questions asked at Amazon, Deloitte, Fractal, and Tiger Analytics.",
      sections: [
        {
          heading: "Top Interview SQL Queries & Answers",
          qaList: [
            {
              q: "How to find the Nth highest salary without using TOP or LIMIT?",
              ans: `SELECT salary FROM (
    SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) as rnk 
    FROM Employees
) t WHERE rnk = 2; -- (Replace 2 with N)`
            },
            {
              q: "What is the difference between WHERE and HAVING?",
              ans: "WHERE filters rows before aggregation (GROUP BY), whereas HAVING filters aggregated groups after GROUP BY calculations have occurred."
            },
            {
              q: "Explain Clustered vs Non-Clustered Indexes.",
              ans: "A Clustered index physically sorts the actual rows on disk (only 1 per table, usually Primary Key). A Non-Clustered index creates a separate B-Tree structure storing index keys and row locators (up to 999 per table in SQL Server)."
            }
          ]
        }
      ]
    },
    {
      step: 3,
      title: "Step 3: Advanced Excel & Business Modeling",
      colorClass: "bg-[#e74c3c] hover:bg-[#c0392b]",
      borderClass: "border-[#c0392b]/30",
      description: "Formula mechanics, dynamic arrays, nested lookups, Power Query transformations, and dashboard scenarios.",
      sections: [
        {
          heading: "Must-Know Excel Interview Problem Statements",
          qaList: [
            {
              q: "When would you prefer INDEX MATCH over XLOOKUP?",
              ans: "XLOOKUP is exclusive to Excel 365 and Excel 2021+. For legacy clients (Excel 2013/2016/2019) or multi-user cross-version workbooks, INDEX MATCH guarantees 100% backwards compatibility without #NAME? errors."
            },
            {
              q: "What are Dynamic Arrays and the '#' Spilled Range Operator?",
              ans: "Formulas like UNIQUE(), SORT(), and FILTER() return multiple cells automatically into adjacent cells ('spill'). The '#' symbol attached to the source cell (e.g. A2#) dynamically references the entire spilled array size."
            }
          ]
        }
      ]
    },
    {
      step: 4,
      title: "Step 4: Python & Data Science Technical Rounds",
      colorClass: "bg-[#007bff] hover:bg-[#0069d9]",
      borderClass: "border-[#0069d9]/30",
      description: "Pandas dataframe manipulations, memory optimization, lambda functions, and algorithm complexity.",
      sections: [
        {
          heading: "Python Data Analytics Questions",
          qaList: [
            {
              q: "Difference between .loc[] and .iloc[] in Pandas?",
              ans: ".loc[] is label-based (accesses rows and columns by their index names/labels or boolean arrays). .iloc[] is purely integer-position based (0 to length-1 of the axis)."
            },
            {
              q: "How to handle memory constraints when loading a 10 GB CSV file into Pandas?",
              ans: "1) Use the 'chunksize' parameter in pd.read_csv(chunksize=100000). 2) Specify explicit memory-efficient dtypes (e.g. int32 instead of int64, category for low-cardinality strings). 3) Load only necessary columns using 'usecols'."
            }
          ]
        }
      ]
    },
    {
      step: 5,
      title: "Step 5: Machine Learning & Generative AI",
      colorClass: "bg-[#3498db] hover:bg-[#2980b9]",
      borderClass: "border-[#2980b9]/30",
      description: "Supervised & unsupervised algorithms, metric evaluation, prompt engineering, and RAG pipelines.",
      sections: [
        {
          heading: "Data Science & AI Conceptual Viva",
          qaList: [
            {
              q: "When should you prioritize Precision over Recall (and vice versa)?",
              ans: "Prioritize Precision when False Positives are costly (e.g. spam detection, loan default classification). Prioritize Recall when False Negatives are dangerous (e.g. medical cancer screening, fraud detection)."
            },
            {
              q: "What is RAG (Retrieval-Augmented Generation) in Generative AI?",
              ans: "RAG combines an external vector database (like Chroma/Pinecone) with a large language model. When a query is asked, relevant knowledge chunks are retrieved via semantic search and provided in the prompt context to prevent LLM hallucinations."
            }
          ]
        }
      ]
    },
    {
      step: 6,
      title: "Step 6: Business Case Studies & Guesstimates",
      colorClass: "bg-[#1abc9c] hover:bg-[#16a085]",
      borderClass: "border-[#16a085]/30",
      description: "Root cause analysis frameworks, metric tree decomposition, and consulting guesstimates.",
      sections: [
        {
          heading: "Live Business Analytics Case Scenarios",
          items: [
            "Root Cause Framework: If weekly active users (WAU) dropped by 12%, break down by: Acquisition vs Retention -> Platform (iOS, Android, Web) -> Geography -> App release version -> Server downtime.",
            "A/B Testing Checklist: Define Null/Alternative Hypothesis, ensure minimum detectable effect (MDE), sample size statistical power (80%), significance alpha (5%), and avoid peeking bias."
          ]
        }
      ]
    },
    {
      step: 7,
      title: "Step 7: Behavioral HR Rounds & Salary Negotiation",
      colorClass: "bg-[#f39c12] hover:bg-[#e67e22]",
      borderClass: "border-[#e67e22]/30",
      description: "STAR method responses, handling career gaps/transitions, and salary negotiation tactics.",
      sections: [
        {
          heading: "Behavioral Mastery & Negotiation Strategies",
          items: [
            "STAR Method: Structure answers into Situation, Task, Action taken, and measurable Result.",
            "Career Switch Story: Articulate past domain expertise + data skills as an unfair advantage rather than a liability.",
            "Salary Negotiation Rule: Never state a single fixed number first; provide a researched bracket and anchor based on responsibilities."
          ]
        }
      ]
    }
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Breadcrumb (Matching Image: Edit Icon / My Interview Kit) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
          <FileEdit className="w-4 h-4 text-orange-500" />
          <span>/</span>
          <span className="text-slate-900 font-semibold">My Interview Kit</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Comprehensive Preparation:</span>
          <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-full">
            7 Steps to Placement
          </span>
        </div>
      </div>

      {/* Header Banner: APIDS & Date (Matching Black Pill in Image) */}
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
              Placement Preparation & Technical Interview Kit
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-xs font-mono text-slate-200">
          <Calendar className="w-4 h-4 text-orange-400" />
          <span className="font-semibold">{student.startDate}</span>
        </div>
      </div>

      {/* The 7 Accordion Steps (Directly Matching Screenshot) */}
      <div className="space-y-4">
        {stepsData.map((item) => {
          const isExpanded = expandedSteps[item.step];

          return (
            <div 
              key={item.step}
              className="rounded-2xl overflow-hidden shadow-xs border border-slate-200/80 transition-all duration-200"
            >
              {/* Step Header Button (Matching Colorful Bar in Screenshot) */}
              <button
                onClick={() => toggleStep(item.step)}
                className={`w-full ${item.colorClass} text-white px-6 py-4 sm:py-5 flex items-center justify-between transition-all duration-150 cursor-pointer select-none group text-left`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-white/90">
                    {isExpanded ? (
                      <FolderOpen className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    ) : (
                      <Folder className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold tracking-wide text-white">
                      Step {item.step}
                    </h3>
                    <p className="text-xs text-white/90 font-normal mt-0.5 line-clamp-1 hidden sm:block">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="w-9 h-9 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-all flex-shrink-0">
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-white" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-white" />
                  )}
                </div>
              </button>

              {/* Step Expanded Content */}
              {isExpanded && (
                <div className="p-6 bg-white border-t border-slate-100 space-y-6 animate-in fade-in duration-200">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Module Focus
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                  </div>

                  {item.sections.map((sec, secIdx) => (
                    <div key={secIdx} className="space-y-3">
                      <h5 className="text-xs font-bold uppercase text-slate-700 tracking-wider flex items-center gap-1.5">
                        <Lightbulb className="w-3.5 h-3.5 text-orange-500" />
                        {sec.heading}
                      </h5>

                      {/* Regular bullet items */}
                      {sec.items && (
                        <div className="space-y-2">
                          {sec.items.map((bullet, bIdx) => (
                            <div key={bIdx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50/70 p-3 rounded-xl border border-slate-200/60 leading-relaxed">
                              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 flex-shrink-0"></span>
                              <span>{bullet}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Downloadable files */}
                      {sec.downloadItems && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {sec.downloadItems.map((doc, docIdx) => (
                            <div key={docIdx} className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-orange-400 hover:shadow-xs transition-all flex flex-col justify-between gap-3 group">
                              <div className="flex items-start gap-2.5">
                                <FileText className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                                <div>
                                  <h6 className="text-xs font-bold text-slate-800 group-hover:text-orange-600 transition-colors">
                                    {doc.name}
                                  </h6>
                                  <span className="text-[10px] text-slate-400 font-mono">{doc.type} • {doc.size}</span>
                                </div>
                              </div>
                              <button className="w-full py-1.5 px-3 rounded-lg bg-slate-900 text-white text-[11px] font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5 self-end">
                                <Download className="w-3.5 h-3.5 text-orange-400" />
                                Download File
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* QA Code List */}
                      {sec.qaList && (
                        <div className="space-y-3">
                          {sec.qaList.map((qa, qaIdx) => (
                            <div key={qaIdx} className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-2">
                              <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                                <span className="flex items-center gap-2">
                                  <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px]">
                                    Q{qaIdx + 1}
                                  </span>
                                  {qa.q}
                                </span>
                                <button
                                  onClick={() => handleCopy(qa.ans, `qa-${item.step}-${qaIdx}`)}
                                  className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1 font-normal cursor-pointer"
                                  title="Copy answer"
                                >
                                  {copiedKey === `qa-${item.step}-${qaIdx}` ? (
                                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5" />
                                  )}
                                  <span>{copiedKey === `qa-${item.step}-${qaIdx}` ? "Copied" : "Copy"}</span>
                                </button>
                              </div>

                              <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-xs font-mono text-slate-800 leading-relaxed whitespace-pre-wrap">
                                {qa.ans}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
