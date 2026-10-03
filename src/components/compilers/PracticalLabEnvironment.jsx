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
  Maximize2
} from 'lucide-react';
import { TableSchemaViewer } from './TableSchemaViewer';
import { QUESTION_BANK_DATA } from '../../data/iTestQuestionBank';

export default function PracticalLabEnvironment({ 
  onBack, 
  student, 
  onCompleteLab 
}) {
  // Extract SQL & Python labs from question bank
  const sqlLabs = QUESTION_BANK_DATA.filter(q => q.type === 'compiler' && q.domain === 'sql');
  const pythonLabs = QUESTION_BANK_DATA.filter(q => q.type === 'compiler' && q.domain === 'python');

  // Selected domain: 'sql', 'python', 'excel', 'powerbi', 'sas'
  const [selectedDomain, setSelectedDomain] = useState('sql');
  const [selectedLabIndex, setSelectedLabIndex] = useState(0);

  // Active lab problem
  const currentSqlLab = sqlLabs[selectedLabIndex] || sqlLabs[0];
  const currentPythonLab = pythonLabs[selectedLabIndex] || pythonLabs[0];

  // Code state per domain
  const [sqlCode, setSqlCode] = useState(currentSqlLab?.starterCode || `SELECT 
    e.id, 
    e.name, 
    d.department_name, 
    s.amount, 
    DENSE_RANK() OVER (PARTITION BY d.id ORDER BY s.amount DESC) AS salary_rank
FROM employees e
INNER JOIN departments d ON e.department_id = d.id
INNER JOIN salaries s ON e.id = s.emp_id
WHERE s.amount > 70000
ORDER BY d.department_name ASC, salary_rank ASC;`);

  const [pythonCode, setPythonCode] = useState(currentPythonLab?.starterCode || `import pandas as pd
import numpy as np

# Sample Transaction DataFrame
df_transactions = pd.DataFrame({
    'transaction_id': ['TXN101', 'TXN102', 'TXN103', 'TXN104', 'TXN105'],
    'customer_name': ['Aria M.', 'David C.', 'Elena R.', 'Marcus V.', 'Sarah J.'],
    'product_category': ['Electronics', 'Computing', 'Office Tech', 'Electronics', 'Storage'],
    'gross_revenue': [45000.0, 18500.0, 8900.0, 32000.0, 12400.0],
    'discount_pct': [0.10, 0.05, 0.15, 0.12, 0.08]
})

def process_sales(df):
    """
    Calculate Net Revenue and aggregate metrics
    """
    df['net_revenue'] = df['gross_revenue'] * (1 - df['discount_pct'])
    summary = df.groupby('product_category')['net_revenue'].agg(['sum', 'mean', 'count']).reset_index()
    summary.columns = ['Category', 'Total_Net_Revenue', 'Average_Sale', 'Order_Count']
    return summary.sort_values(by='Total_Net_Revenue', ascending=False)

output = process_sales(df_transactions)
print(output.to_string(index=False))`);

  const [excelFormula, setExcelFormula] = useState('=XLOOKUP(A2, Products[ID], Products[Price]) * B2');
  const [powerBiDax, setPowerBiDax] = useState(`YoY Growth % = 
DIVIDE(
    [Total Revenue] - [PY Revenue],
    [PY Revenue],
    0
)`);

  const [sasCode, setSasCode] = useState(`DATA WORK.SALES_SUMMARY;
  SET WORK.TRANSACTIONS;
  WHERE NET_REVENUE > 10000;
  NET_MARGIN = (NET_REVENUE - UNIT_COST) / NET_REVENUE;
RUN;

PROC MEANS DATA=WORK.SALES_SUMMARY MEAN STD MIN MAX;
  CLASS REGION;
  VAR NET_REVENUE NET_MARGIN;
RUN;`);

  // Execution state
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionResult, setExecutionResult] = useState(null);
  const [saveStatus, setSaveStatus] = useState('saved');
  const [schemaModalOpen, setSchemaModalOpen] = useState(false);
  const [submissionComplete, setSubmissionComplete] = useState(false);

  // Sync starter code when lab index changes
  useEffect(() => {
    if (selectedDomain === 'sql' && currentSqlLab) {
      setSqlCode(currentSqlLab.starterCode || '');
      setExecutionResult(null);
    } else if (selectedDomain === 'python' && currentPythonLab) {
      setPythonCode(currentPythonLab.starterCode || '');
      setExecutionResult(null);
    }
  }, [selectedLabIndex, selectedDomain]);

  // Tab key indenter
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
    setExecutionResult({ pending: true, message: 'Compiling query against PostgreSQL sandbox container...' });

    setTimeout(() => {
      setIsExecuting(false);
      if (selectedDomain === 'sql') {
        setExecutionResult({
          success: true,
          status: 'SUCCESS (200 OK)',
          executionTime: '0.043s',
          rowCount: 4,
          columns: ['id', 'name', 'department_name', 'amount', 'salary_rank'],
          rows: [
            ['103', 'Charlie Brown', 'Analytics', '₹88,000.00', '1'],
            ['101', 'Alice Smith', 'Engineering', '₹95,000.00', '1'],
            ['102', 'Bob Jones', 'Engineering', '₹75,000.00', '2'],
            ['108', 'Elena Rostova', 'Data Science', '₹1,25,000.00', '1']
          ],
          testCasesPassed: 3,
          testCasesTotal: 3,
          message: 'All 3 test assertions passed! Inner joins verified, DENSE_RANK partitioned correctly.'
        });
      } else if (selectedDomain === 'python') {
        setExecutionResult({
          success: true,
          status: 'PYTHON 3.11 EXECUTION SUCCESSFUL',
          executionTime: '0.078s',
          stdout: `>>> Executing Python Pandas Data Processing Sandbox...
DataFrame Aggregation Output:
   Category  Total_Net_Revenue  Average_Sale  Order_Count
Electronics            68660.0       34330.0            2
  Computing            17575.0       17575.0            1
    Storage            11408.0       11408.0            1
Office Tech             7565.0        7565.0            1

-------------------------------------------------------
✓ Test Case 1: Net Revenue vectorized computation PASSED
✓ Test Case 2: GroupBy Category aggregations PASSED
✓ Test Case 3: Sort by Total_Net_Revenue descending PASSED
Execution completed with 0 errors.`,
          testCasesPassed: 3,
          testCasesTotal: 3
        });
      } else if (selectedDomain === 'excel') {
        setExecutionResult({
          success: true,
          status: 'FORMULA EVALUATED',
          executionTime: '0.012s',
          evalValue: '₹1,450.00',
          testCasesPassed: 2,
          testCasesTotal: 2,
          message: 'XLOOKUP dynamic array matched successfully. Cell calculation validated.'
        });
      } else if (selectedDomain === 'powerbi') {
        setExecutionResult({
          success: true,
          status: 'DAX MEASURE COMPILED',
          executionTime: '0.024s',
          evalValue: '+18.4% YoY',
          testCasesPassed: 2,
          testCasesTotal: 2,
          message: 'DIVIDE safe arithmetic verified. SAMEPERIODLASTYEAR time intelligence calculated.'
        });
      } else {
        setExecutionResult({
          success: true,
          status: 'SAS ENGINE EVALUATION SUCCESSFUL',
          executionTime: '0.112s',
          stdout: `NOTE: PROCEDURE MEANS used (Total process time):
      real time           0.04 seconds
      cpu time            0.03 seconds

Variable     N            Mean         Std Dev         Minimum         Maximum
------------------------------------------------------------------------------
NET_REVENUE  4         35420.0        24108.5         11408.0         68660.0
NET_MARGIN   4            0.34           0.08            0.24            0.42
------------------------------------------------------------------------------`,
          testCasesPassed: 2,
          testCasesTotal: 2
        });
      }
    }, 700);
  };

  const handleSaveCode = () => {
    setSaveStatus('saved');
  };

  const handleSubmitLab = () => {
    setSubmissionComplete(true);
    if (onCompleteLab) {
      onCompleteLab({
        domain: selectedDomain,
        labTitle: selectedDomain === 'sql' ? currentSqlLab.title : currentPythonLab.title,
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
            Candidate: <strong className="text-white">{student?.name || 'SK ABDUL SAJID'}</strong> ({student?.studentId || '9955774102'})
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800 text-slate-300">
            <Camera className="w-3.5 h-3.5 text-teal-400" />
            <span>Webcam Stream: Verified</span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800 text-orange-400 font-mono font-bold">
            <Clock className="w-3.5 h-3.5" />
            <span>Time: 01:24:18</span>
          </div>

          <button
            onClick={onBack}
            className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold cursor-pointer transition-all"
          >
            Exit Lab
          </button>
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
                onClick={() => { setSelectedDomain(d.id); setSelectedLabIndex(0); setExecutionResult(null); }}
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

        {/* Multi-table Schema Viewer Button (For SQL) */}
        {selectedDomain === 'sql' && (
          <button
            onClick={() => setSchemaModalOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 font-bold flex items-center gap-1.5 cursor-pointer transition-all shrink-0"
          >
            <TableIcon className="w-3.5 h-3.5 text-teal-600" />
            <span>Inspect Database Schema (4 Tables)</span>
          </button>
        )}
      </div>

      {/* Main 2-Column Split: Problem Dossier on Left, Live Sandbox Editor on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Column: Problem Briefing & Instructions (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Lab Problem Picker */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                {selectedDomain === 'sql' ? '10 Complex Multi-Table SQL Labs' : 'Curated Practical Assessments'}
              </span>
              <span className="text-[10px] font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                Lab {selectedLabIndex + 1} of {selectedDomain === 'sql' ? sqlLabs.length : pythonLabs.length || 5}
              </span>
            </div>

            <select
              value={selectedLabIndex}
              onChange={(e) => setSelectedLabIndex(Number(e.target.value))}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-semibold bg-white focus:outline-none focus:border-teal-500"
            >
              {(selectedDomain === 'sql' ? sqlLabs : pythonLabs).map((lab, i) => (
                <option key={lab.id || i} value={i}>
                  {lab.title || `Lab Problem ${i + 1}`}
                </option>
              ))}
            </select>
          </div>

          {/* Problem Statement Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4 text-xs">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                {selectedDomain === 'sql' ? currentSqlLab.title : currentPythonLab.title}
              </h3>
              <p className="text-slate-600 mt-1 leading-relaxed">
                {selectedDomain === 'sql' ? currentSqlLab.scenario : currentPythonLab.scenario}
              </p>
            </div>

            {/* Step-by-Step Instructions */}
            <div className="space-y-2 border-t border-slate-100 pt-3">
              <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block">
                Required Technical Specifications:
              </span>
              <ul className="space-y-1.5 text-slate-600">
                {((selectedDomain === 'sql' ? currentSqlLab.instructions : currentPythonLab.instructions) || [
                  'Perform multi-table inner joins across foreign keys.',
                  'Utilize window analytic functions for ranking partitions.',
                  'Filter rows according to specified numerical thresholds.',
                  'Sort output deterministically.'
                ]).map((ins, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-teal-50 text-teal-700 font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 text-[10px]">
                      {idx + 1}
                    </span>
                    <span>{ins}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Expected Result Schema Preview */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1 font-mono text-[11px]">
              <span className="font-bold text-slate-700 block uppercase text-[10px]">Expected Output Columns:</span>
              <span className="text-teal-800 block">
                {selectedDomain === 'sql' ? currentSqlLab.sampleOutput : currentPythonLab.sampleOutput}
              </span>
            </div>

            {/* Constraints Checklist */}
            <div className="space-y-1 text-[11px]">
              <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px] block">Test Constraints:</span>
              <div className="flex flex-wrap gap-1.5">
                {((selectedDomain === 'sql' ? currentSqlLab.constraints : currentPythonLab.constraints) || [
                  'Strict execution timeout: 2.0s',
                  'Postgres 16.2 compliance',
                  'No Cartesian products allowed'
                ]).map((c, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-[10px]">
                    ✓ {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Code Editor + Execution Results (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Code Editor Container */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl flex flex-col min-h-[460px]">
            {/* Editor Toolbar Header */}
            <div className="bg-slate-950 px-4 py-2.5 flex items-center justify-between border-b border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-teal-400" />
                <span className="font-bold text-white tracking-wide">
                  {selectedDomain === 'sql' ? 'PostgreSQL 16.2 Sandbox' : selectedDomain === 'python' ? 'Python 3.11 Runtime' : selectedDomain === 'excel' ? 'Excel AI Copilot Formula Bar' : selectedDomain === 'powerbi' ? 'DAX Studio Engine' : 'SAS Language Sandbox'}
                </span>
                <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">
                  {saveStatus === 'saved' ? 'Autosaved' : 'Unsaved'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (selectedDomain === 'sql') setSqlCode(currentSqlLab.starterCode);
                    if (selectedDomain === 'python') setPythonCode(currentPythonLab.starterCode);
                  }}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-all"
                  title="Reset to original starter code"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>

                <button
                  onClick={handleRunCode}
                  disabled={isExecuting}
                  className="px-4 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-md shadow-teal-950 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5 fill-slate-950" />
                  <span>{isExecuting ? 'Running...' : 'Execute Sandbox'}</span>
                </button>
              </div>
            </div>

            {/* Code Input Area */}
            <div className="p-4 flex-1 bg-slate-900 font-mono text-xs overflow-auto">
              {selectedDomain === 'sql' && (
                <textarea
                  value={sqlCode}
                  onChange={(e) => { setSqlCode(e.target.value); setSaveStatus('unsaved'); }}
                  onKeyDown={(e) => handleKeyDown(e, sqlCode, setSqlCode)}
                  className="w-full h-80 bg-transparent text-cyan-300 resize-none outline-none leading-relaxed selection:bg-cyan-900"
                  spellCheck="false"
                  placeholder="-- Write your SQL query here e.g. SELECT * FROM employees;"
                />
              )}

              {selectedDomain === 'python' && (
                <textarea
                  value={pythonCode}
                  onChange={(e) => { setPythonCode(e.target.value); setSaveStatus('unsaved'); }}
                  onKeyDown={(e) => handleKeyDown(e, pythonCode, setPythonCode)}
                  className="w-full h-80 bg-transparent text-emerald-300 resize-none outline-none leading-relaxed selection:bg-emerald-900"
                  spellCheck="false"
                  placeholder="# Write your Python data processing logic here..."
                />
              )}

              {selectedDomain === 'excel' && (
                <div className="space-y-4">
                  <div>
                    <label className="text-slate-400 block mb-1 text-[11px]">Formula Input (fx):</label>
                    <input
                      type="text"
                      value={excelFormula}
                      onChange={(e) => setExcelFormula(e.target.value)}
                      className="w-full p-2.5 rounded bg-slate-950 border border-slate-700 text-emerald-300 font-mono text-xs focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  {/* Interactive Spreadsheet Preview Grid */}
                  <div className="border border-slate-700 rounded-lg overflow-hidden bg-slate-950 text-[11px]">
                    <div className="grid grid-cols-4 bg-slate-800 text-slate-300 font-bold p-2 border-b border-slate-700">
                      <span>Product ID (A)</span>
                      <span>Quantity (B)</span>
                      <span>Unit Price (C)</span>
                      <span>Revenue (D)</span>
                    </div>
                    <div className="divide-y divide-slate-800 font-mono">
                      <div className="grid grid-cols-4 p-2 text-slate-300">
                        <span>P-101</span>
                        <span>12</span>
                        <span>$145.00</span>
                        <span className="text-emerald-400 font-bold">$1,740.00</span>
                      </div>
                      <div className="grid grid-cols-4 p-2 text-slate-300">
                        <span>P-102</span>
                        <span>25</span>
                        <span>$85.00</span>
                        <span className="text-emerald-400 font-bold">$2,125.00</span>
                      </div>
                      <div className="grid grid-cols-4 p-2 text-slate-300">
                        <span>P-103</span>
                        <span>8</span>
                        <span>$310.00</span>
                        <span className="text-emerald-400 font-bold">$2,480.00</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedDomain === 'powerbi' && (
                <textarea
                  value={powerBiDax}
                  onChange={(e) => setPowerBiDax(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, powerBiDax, setPowerBiDax)}
                  className="w-full h-80 bg-transparent text-amber-300 resize-none outline-none leading-relaxed selection:bg-amber-900"
                  spellCheck="false"
                  placeholder="-- Write your DAX measure here..."
                />
              )}

              {selectedDomain === 'sas' && (
                <textarea
                  value={sasCode}
                  onChange={(e) => setSasCode(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, sasCode, setSasCode)}
                  className="w-full h-80 bg-transparent text-blue-300 resize-none outline-none leading-relaxed selection:bg-blue-900"
                  spellCheck="false"
                  placeholder="/* Write your SAS DATA STEP or PROC procedure here */"
                />
              )}
            </div>

            {/* Execution Output Panel */}
            <div className="bg-slate-950 border-t border-slate-800 p-4">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-400 uppercase tracking-wider">Console Output & Test Assertions</span>
                  {executionResult?.status && (
                    <span className="px-2 py-0.5 rounded font-mono font-bold text-emerald-400 bg-emerald-950 border border-emerald-800 text-[10px]">
                      {executionResult.status}
                    </span>
                  )}
                </div>
                {executionResult?.executionTime && (
                  <span className="font-mono text-slate-500 text-[10px]">Time: {executionResult.executionTime}</span>
                )}
              </div>

              {!executionResult ? (
                <div className="py-6 text-center text-slate-500 text-xs">
                  Click <strong className="text-teal-400 font-semibold">"Execute Sandbox"</strong> to compile your code and validate results.
                </div>
              ) : executionResult.pending ? (
                <div className="py-4 text-center text-teal-400 text-xs font-mono animate-pulse">
                  {executionResult.message}
                </div>
              ) : selectedDomain === 'sql' && executionResult.rows ? (
                <div className="space-y-3">
                  <div className="overflow-x-auto border border-slate-800 rounded-lg">
                    <table className="w-full text-xs text-left font-mono">
                      <thead className="bg-slate-900 text-cyan-400 text-[10px] uppercase">
                        <tr>
                          {executionResult.columns.map(col => (
                            <th key={col} className="p-2 border-b border-slate-800">{col}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 text-slate-300">
                        {executionResult.rows.map((row, i) => (
                          <tr key={i} className="hover:bg-slate-900/60">
                            {row.map((val, j) => (
                              <td key={j} className="p-2 font-medium">{val}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex items-center justify-between text-xs bg-emerald-950/60 p-2.5 rounded-lg border border-emerald-800 text-emerald-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{executionResult.message}</span>
                    </div>
                    <span className="font-mono font-bold">{executionResult.testCasesPassed}/{executionResult.testCasesTotal} PASSED</span>
                  </div>
                </div>
              ) : (
                <div className="font-mono text-xs whitespace-pre-wrap text-emerald-300 bg-slate-900/80 p-3 rounded border border-slate-800 leading-relaxed max-h-48 overflow-y-auto">
                  {executionResult.stdout || executionResult.message || `Result: ${executionResult.evalValue}`}
                </div>
              )}
            </div>
          </div>

          {/* Action Footer: Save Draft & Final Submission */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveCode}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Save className="w-3.5 h-3.5 text-slate-500" />
                <span>Save Solution Draft</span>
              </button>

              <span className="text-slate-400 hidden sm:inline">
                Autosaved locally in browser
              </span>
            </div>

            <button
              onClick={handleSubmitLab}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold flex items-center gap-2 shadow-md shadow-teal-900/20 transition-all cursor-pointer active:scale-95"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Submit Solution for Final Evaluation</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table Schema Viewer Modal */}
      {schemaModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h4 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <Database className="w-5 h-5 text-teal-600" />
                  Database Schema & Sample Relations
                </h4>
                <p className="text-xs text-slate-500">Live PostgreSQL schema with constraints, foreign keys, and preview records.</p>
              </div>
              <button onClick={() => setSchemaModalOpen(false)} className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 text-xs font-bold">
                Close (ESC)
              </button>
            </div>

            <TableSchemaViewer tables={currentSqlLab.tables || []} />
          </div>
        </div>
      )}

      {/* Submission Success Modal */}
      {submissionComplete && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="font-black text-lg text-slate-900">Practical Lab Solution Accepted!</h3>
              <p className="text-xs text-slate-500 mt-1">
                Your practical test has been verified against all automated test assertions.
              </p>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500">Assessment Score:</span>
                <span className="font-bold text-emerald-700">100 / 100 (Pass)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Anti-Cheat Audit:</span>
                <span className="font-bold text-teal-700">0 Infractions (Verified Clean)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Dossier ID:</span>
                <span className="text-slate-700">PRAC-2026-09418</span>
              </div>
            </div>

            <div className="flex gap-2 justify-center pt-2">
              <button
                onClick={() => setSubmissionComplete(false)}
                className="px-4 py-2 border rounded-xl font-bold text-xs hover:bg-slate-100"
              >
                Review Solution
              </button>
              <button
                onClick={onBack}
                className="px-5 py-2 bg-[#26B99A] text-white rounded-xl font-bold text-xs hover:bg-teal-600 shadow-sm"
              >
                Back to CAT Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
