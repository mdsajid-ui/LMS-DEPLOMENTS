import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import { 
  UploadCloud, 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Sparkles, 
  Download, 
  FileCheck,
  Database,
  Layers,
  HelpCircle,
  Eye,
  Check
} from 'lucide-react';
import { notifyDataUpdated } from '../../utils/lmsStorage';

export default function AssessmentExcelUploadModal({ 
  isOpen, 
  onClose, 
  onUploadSuccess,
  defaultType = 'practical' // 'practical' | 'mcq'
}) {
  const [activeType, setActiveType] = useState(defaultType);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [parsedPreview, setParsedPreview] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  // 1. Download Sample Templates
  const handleDownloadTemplate = (type) => {
    if (type === 'mcq') {
      const sampleData = [
        {
          'Question': 'In Python, which function is used to return an iterator of tuples containing count and value?',
          'Option A': 'enumerate()',
          'Option B': 'zip()',
          'Option C': 'map()',
          'Option D': 'range()',
          'Correct Answer': 'A',
          'Explanation': 'enumerate() adds a counter to an iterable and returns it as an enumerate object.'
        },
        {
          'Question': 'Which SQL clause is used to filter aggregated groups created by GROUP BY?',
          'Option A': 'WHERE',
          'Option B': 'HAVING',
          'Option C': 'QUALIFY',
          'Option D': 'ORDER BY',
          'Correct Answer': 'B',
          'Explanation': 'HAVING filters aggregate row groups, whereas WHERE filters individual rows prior to grouping.'
        },
        {
          'Question': 'In Excel, which modern dynamic array formula looks up a value in a column and returns an item from another column?',
          'Option A': 'VLOOKUP',
          'Option B': 'HLOOKUP',
          'Option C': 'XLOOKUP',
          'Option D': 'MATCH',
          'Correct Answer': 'C',
          'Explanation': 'XLOOKUP searches a range or an array, and returns an item corresponding to the first match it finds.'
        }
      ];
      const ws = XLSX.utils.json_to_sheet(sampleData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'MCQ_Questions');
      ws['!cols'] = [
        { wch: 60 }, { wch: 25 }, { wch: 25 }, { wch: 25 }, { wch: 25 }, { wch: 15 }, { wch: 50 }
      ];
      XLSX.writeFile(wb, 'DV_Analytics_MCQ_Upload_Template.xlsx');
    } else {
      // Practical Template
      const questionsData = [
        { 'Question No': '1', 'Question Title': 'Customer Transaction Volume Analysis', 'Question Prompt': 'Find total Transaction_Amount and number of successful transactions for each Payment_Mode, sorted from highest to lowest amount.' },
        { 'Question No': '2', 'Question Title': 'Top 10 High Value Customers', 'Question Prompt': 'List top 10 customers by total Transaction_Amount along with Customer_Name, City, and total number of transactions.' },
        { 'Question No': '3', 'Question Title': 'Department Headcount and Salary Ranks', 'Question Prompt': 'Write a query to rank employees within their department by salary using DENSE_RANK() descending.' }
      ];
      const tableData = [
        { 'customer_id': 10001, 'customer_name': 'Aditya Bose', 'gender': 'M', 'city': 'Mumbai', 'customer_segment': 'SME', 'balance': 234049 },
        { 'customer_id': 10002, 'customer_name': 'Priya Sharma', 'gender:': 'F', 'city': 'Bangalore', 'customer_segment': 'Retail', 'balance': 158200 }
      ];

      const wb = XLSX.utils.book_new();
      const wsQ = XLSX.utils.json_to_sheet(questionsData);
      const wsT = XLSX.utils.json_to_sheet(tableData);
      XLSX.utils.book_append_sheet(wb, wsQ, 'Questions');
      XLSX.utils.book_append_sheet(wb, wsT, 'Sample_Customer_Table');
      wsQ['!cols'] = [{ wch: 15 }, { wch: 40 }, { wch: 80 }];
      XLSX.writeFile(wb, 'DV_Analytics_Practical_Lab_Template.xlsx');
    }
  };

  // 2. Handle File Selection and Parsing
  const handleFileSelected = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setIsProcessing(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const data = await file.arrayBuffer();
      const wb = XLSX.read(data, { type: 'array' });
      
      if (activeType === 'mcq') {
        // Parse MCQ Format
        const allQuestions = [];
        wb.SheetNames.forEach(sheetName => {
          const ws = wb.Sheets[sheetName];
          const rawRows = XLSX.utils.sheet_to_json(ws, { defval: '' });
          
          rawRows.forEach((row, idx) => {
            const keys = Object.keys(row);
            const getVal = (pattern) => {
              const matchedKey = keys.find(k => new RegExp(pattern, 'i').test(k.trim()));
              return matchedKey ? String(row[matchedKey]).trim() : '';
            };

            const qText = getVal('^question') || getVal('^prompt') || getVal('^q\\.?$');
            if (!qText || qText.length < 5) return;

            const optA = getVal('option\\s*a') || getVal('^a$') || 'Option A';
            const optB = getVal('option\\s*b') || getVal('^b$') || 'Option B';
            const optC = getVal('option\\s*c') || getVal('^c$') || 'Option C';
            const optD = getVal('option\\s*d') || getVal('^d$') || 'Option D';
            const rawAns = getVal('correct') || getVal('answer') || 'A';
            const explanation = getVal('explanation') || 'Standard validated assessment solution.';

            let correctIdx = 0;
            const cleanAns = rawAns.toUpperCase().trim();
            if (cleanAns === 'B' || cleanAns === '1' || cleanAns === optB.toUpperCase()) correctIdx = 1;
            else if (cleanAns === 'C' || cleanAns === '2' || cleanAns === optC.toUpperCase()) correctIdx = 2;
            else if (cleanAns === 'D' || cleanAns === '3' || cleanAns === optD.toUpperCase()) correctIdx = 3;

            allQuestions.push({
              id: `custom-mcq-${Date.now()}-${idx}`,
              subject: 'Custom Assessment',
              difficulty: 'Intermediate',
              question: qText,
              options: [optA, optB, optC, optD],
              correct: correctIdx,
              explanation
            });
          });
        });

        if (allQuestions.length === 0) {
          throw new Error('No valid MCQ questions detected. Please verify columns: Question, Option A, Option B, Option C, Option D, Correct Answer.');
        }

        setParsedPreview({
          type: 'mcq',
          fileName: file.name,
          totalQuestions: allQuestions.length,
          questions: allQuestions
        });
      } else {
        // Parse Practical Format
        const detectedSheets = wb.SheetNames;
        const questions = [];
        const tables = [];

        detectedSheets.forEach(sheetName => {
          const ws = wb.Sheets[sheetName];
          const rows = XLSX.utils.sheet_to_json(ws, { header: 1 });
          
          const isQuestionSheet = sheetName.toLowerCase().includes('question') || 
                                  sheetName.toLowerCase().includes('lms') || 
                                  sheetName.toLowerCase().includes('practical');

          if (isQuestionSheet) {
            rows.forEach((r, idx) => {
              const text = r && (r[1] || r[0]) ? String(r[1] || r[0]).trim() : '';
              if (/^\d+[\.:\)]/.test(text) || /^Q\d+/i.test(text)) {
                questions.push({
                  id: `custom-lab-${Date.now()}-${idx}`,
                  number: questions.length + 1,
                  title: text.replace(/^Q?\d+[\.:\)]\s*/i, '').slice(0, 80) + '...',
                  question: text.replace(/^Q?\d+[\.:\)]\s*/i, ''),
                  domain: 'sql',
                  dataset: file.name.replace(/\.[^/.]+$/, ''),
                  category: sheetName
                });
              }
            });
          } else {
            // Treat as database table sheet
            if (rows.length > 0 && rows[0].length > 0) {
              const columns = rows[0].filter(Boolean).map(String);
              tables.push({
                name: sheetName,
                columns,
                rowCount: rows.length - 1
              });
            }
          }
        });

        // Fallback if no specific question sheet pattern was matched
        if (questions.length === 0) {
          detectedSheets.forEach(sheetName => {
            const ws = wb.Sheets[sheetName];
            const rows = XLSX.utils.sheet_to_json(ws, { header: 1 });
            rows.forEach((r, idx) => {
              const text = r && r[0] ? String(r[0]).trim() : '';
              if (text.length > 20 && !text.includes('\t') && idx < 50) {
                questions.push({
                  id: `custom-lab-${Date.now()}-${idx}`,
                  number: questions.length + 1,
                  title: text.slice(0, 80) + '...',
                  question: text,
                  domain: 'sql',
                  dataset: file.name.replace(/\.[^/.]+$/, ''),
                  category: sheetName
                });
              }
            });
          });
        }

        if (questions.length === 0 && tables.length === 0) {
          throw new Error('Unable to extract questions or dataset tables from the workbook.');
        }

        setParsedPreview({
          type: 'practical',
          fileName: file.name,
          suiteTitle: file.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' '),
          tables,
          totalQuestions: questions.length,
          questions
        });
      }
    } catch (err) {
      setErrorMsg(err.message || 'Failed to parse Excel workbook.');
    } finally {
      setIsProcessing(false);
    }
  };

  // 3. Confirm and Save to LMS Storage
  const handleSaveToLms = () => {
    if (!parsedPreview) return;

    try {
      if (parsedPreview.type === 'mcq') {
        const existingRaw = localStorage.getItem('dva_lms_custom_mcq_v1');
        const existing = existingRaw ? JSON.parse(existingRaw) : [];
        const merged = [...parsedPreview.questions, ...existing];
        localStorage.setItem('dva_lms_custom_mcq_v1', JSON.stringify(merged));

        notifyDataUpdated({
          type: 'question_bank',
          subType: 'mcq',
          count: parsedPreview.totalQuestions,
          message: `Uploaded ${parsedPreview.totalQuestions} MCQ Questions from ${parsedPreview.fileName}`
        });

        setSuccessMsg(`✓ Successfully loaded ${parsedPreview.totalQuestions} MCQ Questions into Question Bank!`);
        if (onUploadSuccess) onUploadSuccess(parsedPreview);
        setTimeout(() => {
          onClose();
        }, 1200);
      } else {
        // Practical Labs Suite
        const existingRaw = localStorage.getItem('dva_lms_custom_practical_v1');
        const existing = existingRaw ? JSON.parse(existingRaw) : [];
        const newSuite = {
          id: `custom-suite-${Date.now()}`,
          title: parsedPreview.suiteTitle || 'Custom Uploaded Assessment',
          domain: 'sql',
          badge: 'Uploaded Excel Lab',
          description: `Custom practical assessment extracted from ${parsedPreview.fileName} with ${parsedPreview.tables.length} dataset tables.`,
          tables: parsedPreview.tables.length > 0 ? parsedPreview.tables : [
            { name: 'Dataset_Master', columns: ['id', 'metric', 'value', 'status'], rowCount: 100 }
          ],
          questions: parsedPreview.questions
        };

        const merged = [newSuite, ...existing];
        localStorage.setItem('dva_lms_custom_practical_v1', JSON.stringify(merged));

        notifyDataUpdated({
          type: 'question_bank',
          subType: 'practical',
          suite: newSuite,
          message: `Uploaded Practical Suite: ${newSuite.title} (${parsedPreview.totalQuestions} questions)`
        });

        setSuccessMsg(`✓ Successfully added Practical Assessment Suite "${newSuite.title}" with ${parsedPreview.totalQuestions} questions!`);
        if (onUploadSuccess) onUploadSuccess(newSuite);
        setTimeout(() => {
          onClose();
        }, 1200);
      }
    } catch (err) {
      setErrorMsg(`Save failed: ${err.message}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200/80 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/20 text-teal-300 flex items-center justify-center border border-teal-500/30">
              <UploadCloud className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-snug">Excel Assessment & Question Bank Uploader</h3>
              <p className="text-xs text-slate-400">Directly ingest corporate practical questions, datasets, or MCQ banks</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs">
          
          {/* Assessment Type Toggle */}
          <div className="flex rounded-2xl bg-slate-100 p-1 border border-slate-200">
            <button
              onClick={() => { setActiveType('practical'); setParsedPreview(null); }}
              className={`flex-1 py-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeType === 'practical'
                  ? 'bg-white text-slate-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Database className="w-4 h-4 text-teal-600" />
              <span>Practical Assessment Lab (Tables & Queries)</span>
            </button>
            <button
              onClick={() => { setActiveType('mcq'); setParsedPreview(null); }}
              className={`flex-1 py-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeType === 'mcq'
                  ? 'bg-white text-slate-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <HelpCircle className="w-4 h-4 text-indigo-600" />
              <span>MCQ Question Bank</span>
            </button>
          </div>

          {/* Download Verified Template Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <FileSpreadsheet className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <span className="font-bold text-slate-800 block text-xs">
                  {activeType === 'practical' ? 'Practical Lab Excel Format' : 'MCQ Question Bank Format'}
                </span>
                <span className="text-[11px] text-slate-500">
                  {activeType === 'practical' 
                    ? 'Requires sheet with Question No & Prompt + optional dataset table sheets.' 
                    : 'Requires columns: Question, Option A, Option B, Option C, Option D, Correct Answer.'}
                </span>
              </div>
            </div>
            <button
              onClick={() => handleDownloadTemplate(activeType)}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-bold border border-slate-300 flex items-center gap-1.5 cursor-pointer transition-all shadow-2xs shrink-0"
            >
              <Download className="w-3.5 h-3.5 text-emerald-600" />
              <span>Download Template (.xlsx)</span>
            </button>
          </div>

          {/* File Drop / Select Area */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-teal-500/40 hover:border-teal-500 rounded-3xl p-8 text-center bg-teal-50/20 hover:bg-teal-50/40 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 group"
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileSelected} 
              accept=".xlsx,.xls,.csv" 
              className="hidden" 
            />
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <UploadCloud className="w-6 h-6 text-teal-600" />
            </div>
            <span className="font-bold text-slate-800 text-sm">
              {selectedFile ? selectedFile.name : 'Click to select or drag & drop Excel workbook'}
            </span>
            <span className="text-[11px] text-slate-400">
              Supports .xlsx, .xls, .csv files up to 25MB
            </span>
          </div>

          {/* Processing State */}
          {isProcessing && (
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-800 flex items-center gap-2 text-xs">
              <span className="w-3.5 h-3.5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></span>
              <span>Analyzing worksheets, extracting question headers, and mapping data schemas...</span>
            </div>
          )}

          {/* Error Alert */}
          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Success Alert */}
          {successMsg && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Parsed Preview Section */}
          {parsedPreview && !isProcessing && (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Validation Success: {parsedPreview.totalQuestions} questions detected</span>
                </span>
                <span className="text-[11px] font-mono font-bold bg-white px-2 py-0.5 rounded border border-slate-200 text-teal-700">
                  {parsedPreview.fileName}
                </span>
              </div>

              {parsedPreview.tables && parsedPreview.tables.length > 0 && (
                <div className="space-y-1">
                  <span className="font-bold text-slate-600 text-[11px]">Database Tables Extracted:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {parsedPreview.tables.map(t => (
                      <span key={t.name} className="px-2 py-1 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 font-mono text-[10px]">
                        <strong>{t.name}</strong> ({t.columns.length} cols, {t.rowCount} rows)
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Sample Questions Preview */}
              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                <span className="font-bold text-slate-600 text-[11px]">Questions Sample:</span>
                {parsedPreview.questions.slice(0, 5).map((q, idx) => (
                  <div key={q.id || idx} className="p-2 rounded-xl bg-white border border-slate-200 text-[11px]">
                    <div className="font-bold text-slate-800 flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">
                        {idx + 1}
                      </span>
                      <span>{q.title || q.question.slice(0, 70)}</span>
                    </div>
                    {q.options && (
                      <div className="grid grid-cols-2 gap-1 mt-1.5 pl-6 text-[10px] text-slate-500">
                        {q.options.map((opt, oi) => (
                          <span key={oi} className={oi === q.correct ? 'font-bold text-emerald-600' : ''}>
                            {String.fromCharCode(65 + oi)}. {opt} {oi === q.correct ? '✓' : ''}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 transition cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleSaveToLms}
            disabled={!parsedPreview || isProcessing}
            className={`px-5 py-2 rounded-xl font-bold flex items-center gap-2 transition cursor-pointer shadow-md ${
              parsedPreview && !isProcessing
                ? 'bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Check className="w-4 h-4" />
            <span>Confirm & Ingest Questions ({parsedPreview ? parsedPreview.totalQuestions : 0})</span>
          </button>
        </div>

      </div>
    </div>
  );
}
