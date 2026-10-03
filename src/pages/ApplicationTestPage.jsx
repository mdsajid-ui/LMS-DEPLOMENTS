import React, { useState, useEffect, useRef } from 'react';
import { 
  FileEdit, 
  Calendar, 
  BookOpen, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  ChevronLeft,
  Play,
  RotateCcw,
  Download,
  UploadCloud,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Sparkles,
  BookmarkCheck,
  Table as TableIcon,
  Terminal,
  ShieldCheck
} from 'lucide-react';
import { 
  catMcqQuestionsBank, 
  catPracticalProblems, 
  catInterviewDossier, 
  studentProfile 
} from '../data/mockData';
import PracticalLabEnvironment from '../components/compilers/PracticalLabEnvironment';

export default function ApplicationTestPage({ student = studentProfile }) {
  const [activeSection, setActiveSection] = useState(null); // null, 'mcq', 'practical', 'interview'

  // ================= MCQ STATE =================
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState({});
  const [mcqSubmitted, setMcqSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 mins
  const [timerRunning, setTimerRunning] = useState(true);
  const [showReview, setShowReview] = useState(false);

  // Filtered questions
  const filteredMcqs = selectedCategory === 'All' 
    ? catMcqQuestionsBank 
    : catMcqQuestionsBank.filter(q => q.subject.toLowerCase().includes(selectedCategory.toLowerCase()));

  // Active question
  const currentQ = filteredMcqs[currentQuestionIndex] || filteredMcqs[0];

  // Timer countdown
  useEffect(() => {
    let interval = null;
    if (activeSection === 'mcq' && timerRunning && timeLeft > 0 && !mcqSubmitted) {
      interval = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeSection, timerRunning, timeLeft, mcqSubmitted]);

  // Format timer
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // MCQ answer selection
  const handleSelectOption = (qId, optionIdx) => {
    if (mcqSubmitted) return;
    setUserAnswers(prev => ({
      ...prev,
      [qId]: optionIdx
    }));
  };

  // Flag toggle
  const toggleFlag = (qId) => {
    setFlaggedQuestions(prev => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  // Compute MCQ Score
  const calculateScore = () => {
    let correctCount = 0;
    filteredMcqs.forEach(q => {
      if (userAnswers[q.id] === q.correct) {
        correctCount += 1;
      }
    });
    return {
      correct: correctCount,
      total: filteredMcqs.length,
      percentage: Math.round((correctCount / filteredMcqs.length) * 100)
    };
  };

  const scoreResult = calculateScore();

  // Reset MCQ
  const handleResetMcq = () => {
    setUserAnswers({});
    setFlaggedQuestions({});
    setMcqSubmitted(false);
    setShowReview(false);
    setTimeLeft(1800);
    setTimerRunning(true);
    setCurrentQuestionIndex(0);
  };

  // ================= PRACTICAL LAB STATE =================
  const practicalCase = catPracticalProblems[0];
  const [practicalMode, setPracticalMode] = useState('sql'); // 'sql' or 'python'
  const [codeQuery, setCodeQuery] = useState(practicalCase.starterSql);
  const [queryOutput, setQueryOutput] = useState(null);
  const [isRunningCode, setIsRunningCode] = useState(false);
  const [testCasesPassed, setTestCasesPassed] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleSwitchLanguage = (lang) => {
    setPracticalMode(lang);
    setCodeQuery(lang === 'sql' ? practicalCase.starterSql : practicalCase.starterPython);
    setQueryOutput(null);
    setTestCasesPassed(false);
  };

  const handleExecuteCode = () => {
    setIsRunningCode(true);
    setTimeout(() => {
      setIsRunningCode(false);
      if (practicalMode === 'sql') {
        setQueryOutput({
          type: 'table',
          columns: ['branch', 'net_revenue', 'revenue_rank'],
          rows: [
            ['Bengaluru East', '₹ 34,750', '1'],
            ['Kolkata North', '₹ 38,250', '2'],
            ['Mumbai Central', '₹ 31,520', '3'],
            ['Delhi NCR', '₹ 14,352', '4']
          ],
          rowCount: 4,
          executionTime: '24ms'
        });
      } else {
        setQueryOutput({
          type: 'console',
          text: `>>> Running Python 3.11 Pandas Analytics Sandbox...
DataFrame Output:
           Branch  Total_Revenue  Orders_Count
1   Kolkata North        38250.0             1
0  Bengaluru East        34750.0             2
2  Mumbai Central        31520.0             2
3       Delhi NCR        14352.0             1

[Process completed successfully in 0.082s]`
        });
      }
      setTestCasesPassed(true);
    }, 800);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    setUploadedFile(file.name);
    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);
    }, 1500);
  };

  // ================= PERSONAL INTERVIEW STATE =================
  const [interviewMode, setInterviewMode] = useState('mock'); // 'mock' or 'booking'
  const [cameraActive, setCameraActive] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [selectedPiIndex, setSelectedPiIndex] = useState(0);
  const [candidateResponse, setCandidateResponse] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [aiEvaluationResult, setAiEvaluationResult] = useState(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [selectedPanelist, setSelectedPanelist] = useState(catInterviewDossier.panelists[0].name);
  const [selectedSlot, setSelectedSlot] = useState("Saturday 4:00 PM IST");
  const videoRef = useRef(null);

  // Toggle Camera
  const toggleCamera = async () => {
    if (cameraActive) {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        stream.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
      setCameraActive(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setCameraActive(true);
      } catch (_err) {
        // Fallback simulated camera
        setCameraActive(true);
      }
    }
  };

  // Toggle Mic
  const toggleMic = () => {
    setMicActive(!micActive);
  };

  const handleEvaluateAnswer = () => {
    if (!candidateResponse.trim()) return;
    setIsEvaluating(true);
    setTimeout(() => {
      setIsEvaluating(false);
      setAiEvaluationResult({
        clarityScore: 88,
        problemSolvingScore: 92,
        communicationScore: 85,
        overallVerdict: "Pass / Highly Recommended",
        positiveRemarks: "Strong understanding of clustered indexing mechanisms and awareness of the trade-offs on high-frequency INSERT tables.",
        areasOfImprovement: "Consider mentioning index fragmentation and page fill-factor adjustments for enterprise DBA scenarios."
      });
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Breadcrumb (Matching User's Screenshot: Candidates Application Test (CAT)) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
          <FileEdit className="w-4 h-4 text-orange-500" />
          <span>/</span>
          <span className="text-slate-900 font-semibold">Candidates Application Test (CAT)</span>
          {activeSection && (
            <>
              <span>/</span>
              <span className="text-orange-600 font-semibold capitalize">
                {activeSection === 'mcq' ? 'Multiple Choice Questions' : activeSection === 'practical' ? 'Practical Question Lab' : 'Personal Interview'}
              </span>
            </>
          )}
        </div>

        {activeSection && (
          <button
            onClick={() => setActiveSection(null)}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition-all inline-flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Back to CAT Menu
          </button>
        )}
      </div>

      {/* Header Banner: APIDS & Date (Matching Exact Black Pill in screenshot) */}
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

      {/* ================= SECTION 0: THE 3 CORE SELECTION CARDS (AS IN SCREENSHOT) ================= */}
      {!activeSection ? (
        <div className="space-y-4">
          {/* Card 1: Multiple Choice Question (MCQ) - Royal Blue #3498db */}
          <button
            onClick={() => setActiveSection('mcq')}
            className="w-full bg-[#3498db] hover:bg-[#2980b9] text-white rounded-2xl px-6 py-5 flex items-center justify-between shadow-md hover:shadow-lg transition-all group transform active:scale-[0.99] text-left cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-xl bg-white/20 backdrop-blur-sm">
                <FileEdit className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold tracking-wide">
                  Multiple Choice Question (MCQ)
                </h3>
                <p className="text-xs text-blue-100 font-normal mt-0.5">
                  SQL, Python, Excel & Statistics • 30 Mins • Auto-Evaluated Scorecard
                </p>
              </div>
            </div>

            <div className="w-10 h-10 rounded-full bg-white/20 group-hover:bg-white/30 flex items-center justify-center transition-all group-hover:translate-x-1 flex-shrink-0">
              <ArrowRight className="w-5 h-5 text-white" />
            </div>
          </button>

          {/* Card 2: Practical Question - Warm Amber #f39c12 */}
          <button
            onClick={() => setActiveSection('practical')}
            className="w-full bg-[#f39c12] hover:bg-[#e67e22] text-white rounded-2xl px-6 py-5 flex items-center justify-between shadow-md hover:shadow-lg transition-all group transform active:scale-[0.99] text-left cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-xl bg-white/20 backdrop-blur-sm">
                <FileEdit className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold tracking-wide">
                  Practical Question
                </h3>
                <p className="text-xs text-amber-100 font-normal mt-0.5">
                  Hands-on Dataset Cleaning, Interactive SQL/Python Sandbox & Workbook Upload
                </p>
              </div>
            </div>

            <div className="w-10 h-10 rounded-full bg-white/20 group-hover:bg-white/30 flex items-center justify-center transition-all group-hover:translate-x-1 flex-shrink-0">
              <ArrowRight className="w-5 h-5 text-white" />
            </div>
          </button>

          {/* Card 3: Personal Interview - Coral / Red #e74c3c */}
          <button
            onClick={() => setActiveSection('interview')}
            className="w-full bg-[#e74c3c] hover:bg-[#c0392b] text-white rounded-2xl px-6 py-5 flex items-center justify-between shadow-md hover:shadow-lg transition-all group transform active:scale-[0.99] text-left cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-xl bg-white/20 backdrop-blur-sm">
                <FileEdit className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold tracking-wide">
                  Personal Interview
                </h3>
                <p className="text-xs text-rose-100 font-normal mt-0.5">
                  AI Mock Interview Simulator with Camera/Mic & 1-on-1 Faculty Viva Voce
                </p>
              </div>
            </div>

            <div className="w-10 h-10 rounded-full bg-white/20 group-hover:bg-white/30 flex items-center justify-center transition-all group-hover:translate-x-1 flex-shrink-0">
              <ArrowRight className="w-5 h-5 text-white" />
            </div>
          </button>
        </div>
      ) : activeSection === 'mcq' ? (
        /* ================= SECTION 1: FULL MCQ TEST SYSTEM ================= */
        <div className="space-y-6">
          {!mcqSubmitted ? (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
              {/* Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-100 gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-0.5 rounded-full">
                      Candidates Benchmark Assessment
                    </span>
                    <span className="text-xs text-slate-400">
                      Question {currentQuestionIndex + 1} of {filteredMcqs.length}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">
                    Multiple Choice Questions (MCQ) Assessment
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  {/* Countdown Timer */}
                  <div className={`flex items-center gap-2 text-xs font-mono font-bold px-3.5 py-2 rounded-xl border ${
                    timeLeft < 300 
                      ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' 
                      : 'bg-slate-50 text-slate-800 border-slate-200'
                  }`}>
                    <Clock className="w-4 h-4 text-orange-500" />
                    <span>{formatTime(timeLeft)} Left</span>
                  </div>

                  <button
                    onClick={() => toggleFlag(currentQ.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                      flaggedQuestions[currentQ.id]
                        ? 'bg-amber-500 text-white border-amber-600'
                        : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    <BookmarkCheck className="w-3.5 h-3.5" />
                    {flaggedQuestions[currentQ.id] ? 'Flagged' : 'Flag'}
                  </button>
                </div>
              </div>

              {/* Subject Category Filter Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-semibold">
                {['All', 'SQL Server', 'Excel Advanced', 'Python', 'Machine Learning', 'Power BI'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setCurrentQuestionIndex(0);
                    }}
                    className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                      selectedCategory === cat
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Active Question Box */}
              <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-blue-600 bg-blue-100/60 px-2 py-0.5 rounded">
                    {currentQ.subject}
                  </span>
                  {flaggedQuestions[currentQ.id] && (
                    <span className="text-[11px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      ★ Marked for Review
                    </span>
                  )}
                </div>

                <h4 className="text-base font-bold text-slate-900 leading-snug">
                  <span className="text-blue-600 mr-2">Q{currentQuestionIndex + 1}.</span>
                  {currentQ.q}
                </h4>

                {/* Radio Options */}
                <div className="space-y-2.5 pt-2">
                  {currentQ.options.map((opt, optIdx) => {
                    const isSelected = userAnswers[currentQ.id] === optIdx;
                    return (
                      <label 
                        key={optIdx} 
                        onClick={() => handleSelectOption(currentQ.id, optIdx)}
                        className={`flex items-start gap-3 p-3.5 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-blue-50 border-blue-500 text-blue-900 shadow-xs' 
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center flex-shrink-0 transition-all ${
                          isSelected ? 'border-blue-600 bg-blue-600' : 'border-slate-300 bg-white'
                        }`}>
                          {isSelected && <span className="w-1.5 h-1.5 bg-white rounded-full"></span>}
                        </div>
                        <span className="leading-relaxed">{opt}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Question Navigation Palette & Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100">
                {/* Question Numbers Quick Switcher */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {filteredMcqs.map((q, idx) => {
                    const isAnswered = userAnswers[q.id] !== undefined;
                    const isFlagged = flaggedQuestions[q.id];
                    const isCurrent = currentQuestionIndex === idx;

                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentQuestionIndex(idx)}
                        className={`w-8 h-8 rounded-lg text-xs font-bold transition-all relative ${
                          isCurrent 
                            ? 'ring-2 ring-blue-600 ring-offset-2' 
                            : ''
                        } ${
                          isFlagged
                            ? 'bg-amber-400 text-slate-900'
                            : isAnswered
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>

                {/* Prev / Next & Submit */}
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    disabled={currentQuestionIndex === 0}
                    onClick={() => setCurrentQuestionIndex(i => Math.max(0, i - 1))}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs disabled:opacity-40 hover:bg-slate-50 transition-colors"
                  >
                    Previous
                  </button>

                  {currentQuestionIndex < filteredMcqs.length - 1 ? (
                    <button
                      onClick={() => setCurrentQuestionIndex(i => Math.min(filteredMcqs.length - 1, i + 1))}
                      className="px-5 py-2 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors shadow-xs"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      onClick={() => setMcqSubmitted(true)}
                      className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all active:scale-95"
                    >
                      Submit Assessment
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* ================= MCQ RESULTS & PERFORMANCE SCORECARD ================= */
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-100 gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    Assessment Evaluation Completed
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-1">
                    Your MCQ Benchmark Scorecard
                  </h3>
                  <p className="text-xs text-slate-500">
                    Calculated against DV Analytics 2026 Cohort Benchmark Standards.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowReview(!showReview)}
                    className="px-4 py-2 rounded-xl border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-xs transition-colors"
                  >
                    {showReview ? "Hide Answer Explanations" : "Review All Questions & Answers"}
                  </button>
                  <button
                    onClick={handleResetMcq}
                    className="px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 font-semibold text-xs transition-colors flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Retake Test
                  </button>
                </div>
              </div>

              {/* Score Badges Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 text-center">
                  <span className="text-xs text-blue-600 font-semibold uppercase">Overall Score</span>
                  <p className="text-3xl font-extrabold text-blue-900 mt-1">
                    {scoreResult.percentage}%
                  </p>
                  <span className="text-[11px] text-blue-600">
                    {scoreResult.correct} of {scoreResult.total} Correct
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-center">
                  <span className="text-xs text-emerald-600 font-semibold uppercase">Cohort Percentile</span>
                  <p className="text-3xl font-extrabold text-emerald-900 mt-1">
                    94th
                  </p>
                  <span className="text-[11px] text-emerald-600">Top 6% in APIDS 202606</span>
                </div>

                <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200/80 text-center">
                  <span className="text-xs text-purple-600 font-semibold uppercase">CAT Benchmark</span>
                  <p className="text-3xl font-extrabold text-purple-900 mt-1">
                    {scoreResult.percentage >= 70 ? "PASSED" : "REVIEW"}
                  </p>
                  <span className="text-[11px] text-purple-600">Cut-off: 70%</span>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-center">
                  <span className="text-xs text-amber-600 font-semibold uppercase">Next Milestone</span>
                  <p className="text-lg font-bold text-amber-900 mt-2">
                    Practical Lab
                  </p>
                  <button 
                    onClick={() => setActiveSection('practical')}
                    className="text-xs font-bold text-amber-700 underline mt-1 block"
                  >
                    Open Lab &rarr;
                  </button>
                </div>
              </div>

              {/* Review Question Drawer */}
              {showReview && (
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h4 className="text-sm font-bold text-slate-800">
                    Detailed Explanations & Answer Key:
                  </h4>
                  {filteredMcqs.map((q, idx) => {
                    const studentAns = userAnswers[q.id];
                    const isCorrect = studentAns === q.correct;
                    return (
                      <div 
                        key={q.id}
                        className={`p-4 rounded-2xl border ${
                          isCorrect 
                            ? 'bg-emerald-50/40 border-emerald-200' 
                            : 'bg-rose-50/40 border-rose-200'
                        } space-y-2`}
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-900">
                            Q{idx + 1}. {q.q}
                          </span>
                          <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                            isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                          }`}>
                            {isCorrect ? 'Correct (+1)' : 'Incorrect (0)'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600">
                          <strong>Your Answer:</strong> {studentAns !== undefined ? q.options[studentAns] : 'Not Answered'} | <strong className="text-emerald-700">Correct Answer:</strong> {q.options[q.correct]}
                        </p>
                        <p className="text-xs text-slate-500 italic bg-white p-2.5 rounded-xl border border-slate-200">
                          <strong>Explanation:</strong> {q.explanation}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      ) : activeSection === 'practical' ? (
        /* ================= SECTION 2: I-TEST PRACTICAL WORKBENCH & MULTI-LANGUAGE COMPILER ================= */
        <PracticalLabEnvironment 
          onBack={() => setActiveSection(null)} 
          student={student} 
        />
      ) : (
        /* ================= SECTION 3: PERSONAL INTERVIEW (PI) SIMULATOR & BOOKING ================= */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full">
                Faculty Viva Voce & AI Simulator
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                Personal Interview (PI) Evaluation
              </h3>
              <p className="text-xs text-slate-500">
                Interactive video evaluation designed to test conceptual clarity and problem communication.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setInterviewMode('mock')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  interviewMode === 'mock' 
                    ? 'bg-rose-500 text-white shadow-xs' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                AI Mock Interviewer
              </button>
              <button
                onClick={() => setInterviewMode('booking')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  interviewMode === 'booking' 
                    ? 'bg-rose-500 text-white shadow-xs' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Book Faculty Viva Slot
              </button>
            </div>
          </div>

          {interviewMode === 'mock' ? (
            /* AI Mock Interview Booth */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column: Video & Audio Preview Booth */}
              <div className="space-y-4">
                <div className="relative aspect-video bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex flex-col justify-between p-4 text-white">
                  {cameraActive ? (
                    <video 
                      ref={videoRef} 
                      autoPlay 
                      playsInline 
                      muted 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                      <CameraOff className="w-10 h-10 mb-2 opacity-60" />
                      <span className="text-xs font-medium">Camera Feed Inactive</span>
                      <span className="text-[10px] text-slate-500 mt-0.5">Click 'Start Camera' below to test webcam</span>
                    </div>
                  )}

                  {/* Overlays */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-white">
                      Candidate: {student.name}
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] bg-red-600 text-white px-2 py-0.5 rounded-full font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                      LIVE PI BOOTH
                    </span>
                  </div>

                  {/* Bottom Controls */}
                  <div className="relative z-10 flex items-center justify-between bg-black/60 backdrop-blur-md p-2 rounded-xl border border-white/10">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={toggleCamera}
                        className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                          cameraActive ? 'bg-emerald-600 text-white' : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        {cameraActive ? <Camera className="w-3.5 h-3.5" /> : <CameraOff className="w-3.5 h-3.5" />}
                        {cameraActive ? 'Camera On' : 'Start Camera'}
                      </button>

                      <button
                        onClick={toggleMic}
                        className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                          micActive ? 'bg-emerald-600 text-white' : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        {micActive ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
                        {micActive ? 'Mic Active' : 'Enable Mic'}
                      </button>
                    </div>

                    <span className="text-[10px] font-mono text-slate-300">
                      Audio: {micActive ? "48kHz OK" : "Muted"}
                    </span>
                  </div>
                </div>

                {/* Rubric Criteria Pills */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {catInterviewDossier.rubric.map((r, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-800">
                        <span>{r.criterion}</span>
                        <span className="text-orange-600">{r.weight}%</span>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1 line-clamp-1">{r.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: AI Interviewer Question & Answering */}
              <div className="space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-rose-700 uppercase tracking-wide">
                        Question {selectedPiIndex + 1} of {catInterviewDossier.interviewQuestions.length} • {catInterviewDossier.interviewQuestions[selectedPiIndex].topic}
                      </span>
                      <div className="flex gap-1">
                        {catInterviewDossier.interviewQuestions.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setSelectedPiIndex(idx);
                              setAiEvaluationResult(null);
                            }}
                            className={`w-6 h-6 rounded text-xs font-bold ${
                              selectedPiIndex === idx ? 'bg-rose-600 text-white' : 'bg-white text-slate-700'
                            }`}
                          >
                            {idx + 1}
                          </button>
                        ))}
                      </div>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 leading-snug">
                      "{catInterviewDossier.interviewQuestions[selectedPiIndex].question}"
                    </h4>
                  </div>

                  {/* Response Textarea */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">
                      Speak or Type Your Viva Response:
                    </label>
                    <textarea
                      rows={4}
                      value={candidateResponse}
                      onChange={(e) => setCandidateResponse(e.target.value)}
                      placeholder="Type your structured explanation here (or dictate response with mic active)..."
                      className="w-full text-xs p-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-slate-800 bg-white"
                    />
                  </div>

                  <button
                    onClick={handleEvaluateAnswer}
                    disabled={isEvaluating || !candidateResponse.trim()}
                    className="w-full py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
                  >
                    <Sparkles className="w-4 h-4" />
                    {isEvaluating ? "Analyzing Conceptual Depth with AI..." : "Submit Answer for Instant AI Rubric Scoring"}
                  </button>
                </div>

                {/* AI Feedback Card */}
                {aiEvaluationResult && (
                  <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2.5 animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-800">
                        AI Rubric Scorecard
                      </span>
                      <span className="text-xs font-bold px-2 py-0.5 bg-emerald-600 text-white rounded">
                        {aiEvaluationResult.overallVerdict}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="bg-white p-2 rounded-lg border border-emerald-100">
                        <span className="text-[10px] text-slate-500 block">Clarity</span>
                        <strong className="text-emerald-700">{aiEvaluationResult.clarityScore}%</strong>
                      </div>
                      <div className="bg-white p-2 rounded-lg border border-emerald-100">
                        <span className="text-[10px] text-slate-500 block">Logic</span>
                        <strong className="text-emerald-700">{aiEvaluationResult.problemSolvingScore}%</strong>
                      </div>
                      <div className="bg-white p-2 rounded-lg border border-emerald-100">
                        <span className="text-[10px] text-slate-500 block">Artic.</span>
                        <strong className="text-emerald-700">{aiEvaluationResult.communicationScore}%</strong>
                      </div>
                    </div>

                    <p className="text-xs text-slate-700">
                      <strong>Mentor Insight:</strong> {aiEvaluationResult.positiveRemarks}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Mode 2: 1-on-1 Faculty Viva Voce Booking */
            <div className="space-y-5">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Select Faculty Panelist & Timetable Slot:
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {catInterviewDossier.panelists.map((panel) => (
                    <div 
                      key={panel.name}
                      onClick={() => setSelectedPanelist(panel.name)}
                      className={`p-4 rounded-xl border text-xs cursor-pointer transition-all ${
                        selectedPanelist === panel.name 
                          ? 'border-rose-500 bg-rose-50/50 shadow-xs' 
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <h5 className="font-bold text-slate-900">{panel.name}</h5>
                      <p className="text-[11px] text-slate-500">{panel.role} ({panel.exp})</p>
                      <span className="text-[10px] text-rose-600 font-semibold block mt-2">
                        Available: {panel.slots}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Choose Time Slot:
                  </label>
                  <select 
                    value={selectedSlot}
                    onChange={(e) => setSelectedSlot(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-white"
                  >
                    <option>Saturday 4:00 PM IST (Online Google Meet)</option>
                    <option>Saturday 6:00 PM IST (Online Google Meet)</option>
                    <option>Sunday 11:30 AM IST (Online Google Meet)</option>
                    <option>Sunday 3:00 PM IST (Online Google Meet)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Panel meeting link and preparation dossier will be sent to <strong>{student.email}</strong>.
                </span>
                <button
                  onClick={() => setBookingConfirmed(true)}
                  className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-all active:scale-95"
                >
                  Confirm PI Viva Slot
                </button>
              </div>

              {bookingConfirmed && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Viva slot successfully confirmed with <strong>{selectedPanelist}</strong> for <strong>{selectedSlot}</strong>.</span>
                  </div>
                  <button className="px-3 py-1 rounded-lg bg-emerald-700 text-white text-[11px] font-bold">
                    Download Calendar Invite (.ics)
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
