import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Code, 
  FileSpreadsheet, 
  BarChart3, 
  Layers, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Save, 
  Download, 
  Table as TableIcon, 
  Eye, 
  ShieldCheck, 
  Clock, 
  ChevronRight, 
  Sparkles, 
  Terminal, 
  Check, 
  AlertCircle,
  Camera,
  Maximize2,
  UploadCloud,
  FileCheck,
  FolderOpen
} from 'lucide-react';
import { TableSchemaViewer } from './TableSchemaViewer';
import AssessmentExcelUploadModal from './AssessmentExcelUploadModal';
import { CORPORATE_PRACTICAL_SUITES } from '../../data/corporatePracticalBank';
import { subscribeToDataUpdates } from '../../utils/lmsStorage';

export default function PracticalLabEnvironment({ 
  onBack, 
  student, 
  onCompleteLab 
}) {
  // Load initial and custom uploaded suites
  const [allSuites, setAllSuites] = useState(() => {
    try {
      const customRaw = localStorage.getItem('dva_lms_custom_practical_v1');
      const customSuites = customRaw ? JSON.parse(customRaw) : [];
      return [...CORPORATE_PRACTICAL_SUITES, ...customSuites];
    } catch (e) {
      return CORPORATE_PRACTICAL_SUITES;
    }
  });

  const [selectedSuiteId, setSelectedSuiteId] = useState(() => allSuites[0]?.id || 'suite-banking');
  const [selectedDomain, setSelectedDomain] = useState('sql');
  const [selectedLabIndex, setSelectedLabIndex] = useState(0);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  // Sync real-time when new suites are uploaded
  useEffect(() => {
    const unsub = subscribeToDataUpdates((e) => {
      if (e?.type === 'question_bank') {
        try {
          const customRaw = localStorage.getItem('dva_lms_custom_practical_v1');
          const customSuites = customRaw ? JSON.parse(customRaw) : [];
          setAllSuites([...CORPORATE_PRACTICAL_SUITES, ...customSuites]);
        } catch (err) {}
      }
    });
    return () => unsub();
  }, []);

  const activeSuite = allSuites.find(s => s.id === selectedSuiteId) || allSuites[0] || {};
  const currentQuestions = activeSuite.questions || [];
  const currentQuestion = currentQuestions[selectedLabIndex] || currentQuestions[0] || {
    title: 'Data Extraction & Aggregation Lab',
    question: 'Analyze data tables and write query logic to compute analytical aggregates.'
  };

  // Code state per domain
  const [sqlCode, setSqlCode] = useState(`-- Write your SQL query below for ${activeSuite.title}
SELECT 
    t.transaction_id,
    c.customer_name,
    c.city,
    t.amount,
    t.channel,
    t.transaction_status
FROM Transactions t
INNER JOIN Account a ON t.account_id = a.account_id
INNER JOIN Customer c ON a.customer_id = c.customer_id
WHERE t.transaction_status = 'Success'
ORDER BY t.amount DESC
LIMIT 10;`);

  const [pythonCode, setPythonCode] = useState(`import pandas as pd
import numpy as np

# Load corporate data frames
df_sales = pd.DataFrame({
    'Order_ID': [101, 102, 103, 104, 105],
    'Cust_ID': ['CUST_1', 'CUST_2', 'CUST_3', 'CUST_1', 'CUST_4'],
    'Units': [500, 240, 890, 310, 150],
    'Price': [68.0, 120.0, 45.0, 68.0, 210.0]
})

df_sales['Total_Revenue'] = df_sales['Units'] * df_sales['Price']
summary = df_sales.groupby('Cust_ID')['Total_Revenue'].agg(['sum', 'mean', 'count']).reset_index()
summary.columns = ['Customer_ID', 'Total_Revenue', 'Average_Order', 'Order_Count']
print(summary.sort_values(by='Total_Revenue', ascending=False))`);

  const [excelFormula, setExcelFormula] = useState('=XLOOKUP(A2, Products[ID], Products[Price]) * B2');
  const [powerBiDax, setPowerBiDax] = useState(`Total Revenue = SUM(Transactions[amount])\nYoY Growth % = DIVIDE([Total Revenue] - [PY Revenue], [PY Revenue], 0)`);
  const [sasCode, setSasCode] = useState(`PROC MEANS DATA=WORK.BANKING_SUMMARY MEAN STD MIN MAX;\n  CLASS REGION;\n  VAR TRANSACTION_AMOUNT;\nRUN;`);

  // Execution & UI state
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionResult, setExecutionResult] = useState(null);
  const [saveStatus, setSaveStatus] = useState('saved');
  const [schemaModalOpen, setSchemaModalOpen] = useState(false);
  const [submissionComplete, setSubmissionComplete] = useState(false);

  // Sync starter query when question or suite changes
  useEffect(() => {
    setSelectedLabIndex(0);
    setExecutionResult(null);
    if (activeSuite.domain) {
      setSelectedDomain(activeSuite.domain);
    }
  }, [selectedSuiteId]);

  // Tab key indentation
  const handleKeyDown = (e, code, setCode) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const next = code.substring(0, start) + '    ' + code.substring(end);
      setCode(next);
      setSaveStatus('unsaved');
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 4;
      }, 0);
    }
  };

  // Run Code Simulation
  const handleRunCode = () => {
    setIsExecuting(true);
    setExecutionResult({ pending: true, message: `Compiling query against ${activeSuite.title} database engine...` });

    setTimeout(() => {
      setIsExecuting(false);
      if (selectedDomain === 'sql') {
        const sampleRows = activeSuite.id === 'suite-banking' ? [
          ['30001', 'Aditya Bose', 'Mumbai', '₹25,000.00', 'UPI', 'Success'],
          ['30005', 'Priya Sharma', 'Bangalore', '₹18,500.00', 'NetBanking', 'Success'],
          ['30012', 'Vikram Malhotra', 'Delhi', '₹14,200.00', 'Debit Card', 'Success'],
          ['30019', 'Sunita Das', 'Bhubaneswar', '₹9,800.00', 'UPI', 'Success'],
          ['30024', 'Amit Mohanty', 'Bhubaneswar', '₹6,400.00', 'Branch', 'Success']
        ] : activeSuite.id === 'suite-healthcare' ? [
          ['5001', 'Karan Joshi', 'Dr. Rohan Iyer', 'Cardiology', '₹1,200.00', 'Completed'],
          ['5002', 'Meera Sen', 'Dr. Ananya Roy', 'Neurology', '₹1,500.00', 'Completed'],
          ['5003', 'Ramesh Patel', 'Dr. Vikram Shah', 'Orthopedics', '₹900.00', 'Completed'],
          ['5004', 'Fatima Sheikh', 'Dr. Rohan Iyer', 'Cardiology', '₹1,200.00', 'Completed']
        ] : [
          ['ORD001', 'CUST001', 'Electronics', '2', '₹3,598.20', 'Mobile App'],
          ['ORD002', 'CUST008', 'Books', '5', '₹1,450.00', 'Website'],
          ['ORD003', 'CUST015', 'Computing', '1', '₹32,999.00', 'Corporate']
        ];

        const cols = activeSuite.id === 'suite-banking'
          ? ['transaction_id', 'customer_name', 'city', 'amount', 'channel', 'status']
          : activeSuite.id === 'suite-healthcare'
            ? ['appointment_id', 'patient_name', 'doctor_name', 'department', 'consultation_fee', 'status']
            : ['order_id', 'customer_id', 'category', 'qty', 'net_sales', 'channel'];

        setExecutionResult({
          success: true,
          status: 'SQL EXECUTION SUCCESSFUL (200 OK)',
          executionTime: '0.038s',
          rowCount: sampleRows.length,
          columns: cols,
          rows: sampleRows,
          testCasesPassed: 3,
          testCasesTotal: 3,
          message: `✓ Multi-table joins verified across ${activeSuite.tables?.length || 3} tables. Query matches analytical expectations.`
        });
      } else if (selectedDomain === 'python') {
        setExecutionResult({
          success: true,
          status: 'PYTHON 3.11 PANDAS EXECUTION SUCCESSFUL',
          executionTime: '0.065s',
          stdout: `>>> Initializing Python 3.11 Container (Pandas, NumPy, Scikit-Learn)...
DataFrame Shape: (1124, 6)
Grouped Aggregations:
Customer_ID  Total_Revenue  Average_Order  Order_Count
     CUST_3        40050.0        40050.0            1
     CUST_1        55080.0        27540.0            2
     CUST_4        31500.0        31500.0            1
     CUST_2        28800.0        28800.0            1

-------------------------------------------------------
✓ Test Case 1: Merge operations across fact and dimensions PASSED
✓ Test Case 2: GroupBy aggregations and metric sorting PASSED
✓ Test Case 3: Output format validation PASSED
Execution finished with 0 errors.`,
          testCasesPassed: 3,
          testCasesTotal: 3
        });
      } else if (selectedDomain === 'excel') {
        setExecutionResult({
          success: true,
          status: 'DYNAMIC ARRAY EVALUATION SUCCESSFUL',
          executionTime: '0.011s',
          evalValue: '₹4,850.00',
          testCasesPassed: 2,
          testCasesTotal: 2,
          message: 'XLOOKUP dynamic array matched successfully. Formula vectorized properly.'
        });
      } else {
        setExecutionResult({
          success: true,
          status: 'ANALYTICS ENGINE EXECUTION PASSED',
          executionTime: '0.045s',
          stdout: `Summary Analysis generated successfully.\nCalculated Metrics: 100% compliant with question specs.`,
          testCasesPassed: 2,
          testCasesTotal: 2
        });
      }
    }, 600);
  };

  const handleSaveCode = () => {
    setSaveStatus('saved');
  };

  const handleSubmitLab = () => {
    setSubmissionComplete(true);
    if (onCompleteLab) {
      onCompleteLab({
        domain: selectedDomain,
        suiteTitle: activeSuite.title,
        labTitle: currentQuestion.title,
        score: '100/100',
        verdict: 'Qualified'
      });
    }
  };

  return (
    <div className="space-y-4 font-sans text-slate-800">
      {/* Proctoring & Examination Security Banner */}
      <div className="bg-slate-950 text-white px-5 py-3 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-lg border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>PROCTOR GUARD ACTIVE</span>
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline">•</span>
          <span className="text-xs font-mono text-slate-300">
            Candidate: <strong className="text-white">{student?.name || 'SK ABDUL SAJID'}</strong> ({student?.studentId || 'DVA-202606-448'})
          </span>
        </div>

        <div className="flex items-center gap-2.5 text-xs">
          {/* UPLOAD EXCEL LAB BUTTON */}
          <button
            onClick={() => setUploadModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-bold shadow-md transition-all cursor-pointer active:scale-95"
            title="Upload new assessment from Excel workbook (.xlsx)"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload Lab (.xlsx)</span>
          </button>

          <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800 text-slate-300">
            <Camera className="w-3.5 h-3.5 text-teal-400" />
            <span className="hidden sm:inline">Webcam:</span> Verified
          </div>

          <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800 text-orange-400 font-mono font-bold">
            <Clock className="w-3.5 h-3.5" />
            <span>01:24:18</span>
          </div>

          <button
            onClick={onBack}
            className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold cursor-pointer transition-all"
          >
            Exit Lab
          </button>
        </div>
      </div>

      {/* Practical Suite Selector Strip (Official Corporate Datasets & Custom Uploads) */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
        <div className="flex items-center justify-between text-xs pb-1 border-b border-slate-100">
          <span className="font-bold text-slate-800 flex items-center gap-2">
            <Database className="w-4 h-4 text-teal-600" />
            <span>Select Corporate Practical Assessment Suite:</span>
          </span>
          <span className="text-[11px] text-slate-500">
            {allSuites.length} verified suites available
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {allSuites.map((suite) => {
            const isSelected = selectedSuiteId === suite.id;
            return (
              <button
                key={suite.id}
                onClick={() => setSelectedSuiteId(suite.id)}
                className={`px-3 py-2 rounded-xl font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-slate-950 text-white shadow-md'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-teal-400' : 'bg-slate-400'}`}></span>
                <span>{suite.title}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  isSelected ? 'bg-teal-900 text-teal-300' : 'bg-white text-slate-500 border border-slate-200'
                }`}>
                  {suite.questions?.length || 0} Qs
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Language / Domain Selector Strip */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'sql', label: 'PostgreSQL / SQL Engine', icon: Database, color: 'text-cyan-600' },
            { id: 'python', label: 'Python 3.11 Pandas Lab', icon: Code, color: 'text-indigo-600' },
            { id: 'excel', label: 'Excel AI Dynamic Arrays', icon: FileSpreadsheet, color: 'text-emerald-600' },
            { id: 'powerbi', label: 'Power BI DAX Studio', icon: BarChart3, color: 'text-amber-600' },
            { id: 'sas', label: 'SAS Base Analytics', icon: Layers, color: 'text-blue-600' }
          ].map(d => {
            const Icon = d.icon;
            const active = selectedDomain === d.id;
            return (
              <button
                key={d.id}
                onClick={() => { setSelectedDomain(d.id); setExecutionResult(null); }}
                className={`px-3 py-2 rounded-xl font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  active 
                    ? 'bg-slate-950 text-white shadow-md' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-teal-400' : d.color}`} />
                <span>{d.label}</span>
              </button>
            );
          })}
        </div>

        {/* Multi-table Schema Viewer Button */}
        <button
          onClick={() => setSchemaModalOpen(true)}
          className="px-3.5 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 font-bold flex items-center gap-1.5 cursor-pointer transition-all shrink-0"
        >
          <TableIcon className="w-3.5 h-3.5 text-teal-600" />
          <span>Inspect Database Schema ({activeSuite.tables?.length || 4} Tables)</span>
        </button>
      </div>

      {/* Main 2-Column Split: Problem Dossier on Left, Live Sandbox Editor on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Column: Problem Briefing & Instructions (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Lab Problem Picker */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 truncate max-w-[200px]">
                {activeSuite.title}
              </span>
              <span className="text-[10px] font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                Question {selectedLabIndex + 1} of {currentQuestions.length || 1}
              </span>
            </div>

            <select
              value={selectedLabIndex}
              onChange={(e) => setSelectedLabIndex(Number(e.target.value))}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-semibold bg-white focus:outline-none focus:border-teal-500 cursor-pointer"
            >
              {currentQuestions.map((lab, i) => (
                <option key={lab.id || i} value={i}>
                  {i + 1}. {lab.title || lab.question?.slice(0, 60)}
                </option>
              ))}
            </select>
          </div>

          {/* Problem Statement Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4 text-xs">
            <div>
              <span className="inline-block text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200 mb-1.5">
                {currentQuestion.category || activeSuite.badge || 'Corporate Analytics'}
              </span>
              <h3 className="font-bold text-slate-900 text-sm leading-snug">
                {currentQuestion.title || `Problem ${selectedLabIndex + 1}`}
              </h3>
              <p className="text-slate-600 mt-2 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                {currentQuestion.question}
              </p>
            </div>

            {/* Tables Available in this Dataset */}
            {activeSuite.tables && activeSuite.tables.length > 0 && (
              <div className="space-y-1.5 border-t border-slate-100 pt-3">
                <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block">
                  Available Dataset Tables:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeSuite.tables.map(tbl => (
                    <span 
                      key={tbl.name}
                      onClick={() => setSchemaModalOpen(true)}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-teal-50 border border-slate-200 hover:border-teal-200 text-slate-700 hover:text-teal-800 font-mono text-[10px] cursor-pointer transition-colors"
                      title="Click to view schema"
                    >
                      {tbl.name} ({tbl.rowCount || 'Fact'} rows)
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Test Case Criteria */}
            <div className="space-y-2 border-t border-slate-100 pt-3">
              <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block">
                Verification Criteria:
              </span>
              <ul className="space-y-1.5 text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                  <span>Returns accurate grouping and metrics according to problem specifications.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                  <span>Null safety and accurate JOIN condition mapping across primary/foreign keys.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Live Sandbox Editor & Terminal (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Code Editor Frame */}
          <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-xl flex flex-col text-xs">
            
            {/* Editor Action Header */}
            <div className="bg-slate-950 px-4 py-3 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-teal-400" />
                <span className="font-mono font-bold text-slate-200 text-xs uppercase tracking-wide">
                  {selectedDomain.toUpperCase()} Practical Sandbox
                </span>
                <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
                  {saveStatus === 'saved' ? 'All changes saved' : 'Unsaved changes'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleSaveCode}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold flex items-center gap-1.5 cursor-pointer transition-all"
                  title="Save current work"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save</span>
                </button>

                <button
                  onClick={handleRunCode}
                  disabled={isExecuting}
                  className={`px-4 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all shadow-md cursor-pointer ${
                    isExecuting 
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                      : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 active:scale-95'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isExecuting ? 'Executing...' : 'Run Query / Code'}</span>
                </button>
              </div>
            </div>

            {/* Code Input Textarea */}
            <div className="p-4 bg-slate-950/90 font-mono text-xs overflow-auto min-h-[260px] max-h-[360px]">
              {selectedDomain === 'sql' && (
                <textarea
                  value={sqlCode}
                  onChange={(e) => { setSqlCode(e.target.value); setSaveStatus('unsaved'); }}
                  onKeyDown={(e) => handleKeyDown(e, sqlCode, setSqlCode)}
                  className="w-full h-64 bg-transparent text-cyan-300 resize-none outline-none font-mono leading-relaxed"
                  spellCheck="false"
                  placeholder="SELECT * FROM table_name..."
                />
              )}

              {selectedDomain === 'python' && (
                <textarea
                  value={pythonCode}
                  onChange={(e) => { setPythonCode(e.target.value); setSaveStatus('unsaved'); }}
                  onKeyDown={(e) => handleKeyDown(e, pythonCode, setPythonCode)}
                  className="w-full h-64 bg-transparent text-emerald-300 resize-none outline-none font-mono leading-relaxed"
                  spellCheck="false"
                  placeholder="# Write your Python code here..."
                />
              )}

              {selectedDomain === 'excel' && (
                <textarea
                  value={excelFormula}
                  onChange={(e) => { setExcelFormula(e.target.value); setSaveStatus('unsaved'); }}
                  className="w-full h-64 bg-transparent text-amber-300 resize-none outline-none font-mono leading-relaxed"
                  spellCheck="false"
                  placeholder="=FORMULA(args...)"
                />
              )}

              {selectedDomain === 'powerbi' && (
                <textarea
                  value={powerBiDax}
                  onChange={(e) => { setPowerBiDax(e.target.value); setSaveStatus('unsaved'); }}
                  className="w-full h-64 bg-transparent text-orange-300 resize-none outline-none font-mono leading-relaxed"
                  spellCheck="false"
                  placeholder="Measure = CALCULATE(...)"
                />
              )}

              {selectedDomain === 'sas' && (
                <textarea
                  value={sasCode}
                  onChange={(e) => { setSasCode(e.target.value); setSaveStatus('unsaved'); }}
                  className="w-full h-64 bg-transparent text-sky-300 resize-none outline-none font-mono leading-relaxed"
                  spellCheck="false"
                  placeholder="DATA WORK.OUTPUT; RUN;"
                />
              )}
            </div>
          </div>

          {/* Execution Terminal / Results Window */}
          {executionResult && (
            <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-xl text-xs font-mono">
              <div className="bg-slate-950 px-4 py-2.5 flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${executionResult.success ? 'bg-emerald-400' : 'bg-red-400'}`}></span>
                  <span className="font-bold text-slate-200">{executionResult.status}</span>
                </div>
                {executionResult.executionTime && (
                  <span className="text-[10px] text-slate-400 font-mono">Time: {executionResult.executionTime}</span>
                )}
              </div>

              <div className="p-4 space-y-3 max-h-72 overflow-y-auto">
                {executionResult.message && (
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
                    {executionResult.message}
                  </div>
                )}

                {/* SQL Table Output */}
                {executionResult.columns && executionResult.rows && (
                  <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                    <table className="w-full text-left text-[11px] divide-y divide-slate-800">
                      <thead className="bg-slate-900 text-slate-300 font-bold uppercase">
                        <tr>
                          {executionResult.columns.map(col => (
                            <th key={col} className="px-3 py-2">{col}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 text-slate-300">
                        {executionResult.rows.map((row, i) => (
                          <tr key={i} className="hover:bg-slate-900/60">
                            {row.map((cell, ci) => (
                              <td key={ci} className="px-3 py-1.5">{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Python / SAS Stdout Output */}
                {executionResult.stdout && (
                  <pre className="text-slate-300 leading-relaxed overflow-x-auto whitespace-pre-wrap">
                    {executionResult.stdout}
                  </pre>
                )}

                {/* Excel / PowerBI Metric Output */}
                {executionResult.evalValue && (
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-400">Calculated Evaluation:</span>
                    <span className="text-emerald-400 font-bold text-sm">{executionResult.evalValue}</span>
                  </div>
                )}

                {/* Test Assertions Progress */}
                {executionResult.testCasesPassed !== undefined && (
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px]">
                    <span className="text-slate-400">All Automated Test Assertions:</span>
                    <span className="font-bold text-emerald-400 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>{executionResult.testCasesPassed} / {executionResult.testCasesTotal} PASSED</span>
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Submission Card */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-bold text-slate-800 block text-sm">Submit Solution</span>
              <span className="text-[11px] text-slate-500">Record assessment score in your official LMS academic dossier.</span>
            </div>

            <button
              onClick={handleSubmitLab}
              disabled={submissionComplete}
              className={`px-5 py-2.5 rounded-xl font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer ${
                submissionComplete
                  ? 'bg-slate-100 text-emerald-700 border border-emerald-200 cursor-default'
                  : 'bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 active:scale-95'
              }`}
            >
              {submissionComplete ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Lab Submitted & Qualified</span>
                </>
              ) : (
                <>
                  <span>Submit Assessment ➔</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>

      {/* Database Multi-Table Schema Modal */}
      {schemaModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-4xl w-full border border-slate-200/80 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-4 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <TableIcon className="w-5 h-5 text-teal-400" />
                <div>
                  <h4 className="font-bold text-sm">{activeSuite.title} Schema Inspector</h4>
                  <span className="text-[11px] text-slate-400">
                    Inspecting {activeSuite.tables?.length || 4} Relational Tables
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSchemaModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1">
              <TableSchemaViewer tables={activeSuite.tables || []} />
            </div>
          </div>
        </div>
      )}

      {/* Assessment Excel Upload Modal */}
      <AssessmentExcelUploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        defaultType="practical"
        onUploadSuccess={(newSuite) => {
          setSelectedSuiteId(newSuite.id);
        }}
      />
    </div>
  );
}
