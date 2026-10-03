import React, { useState, useRef } from 'react';
import { 
  ClipboardList, 
  Clock, 
  UploadCloud, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Download,
  Calendar,
  X,
  FileSpreadsheet,
  FileCode,
  FileArchive,
  Send,
  Eye,
  Check
} from 'lucide-react';
import { assignmentsList, studentProfile } from '../data/mockData';
import { downloadFile } from '../utils/excelHelper';
import { getStoredAssignmentsList, subscribeToDataUpdates } from '../utils/lmsStorage';

export default function AssignmentsPage({ student = studentProfile }) {
  const [assignments, setAssignments] = useState(() => {
    const stored = getStoredAssignmentsList();
    // Merge stored admin assignments with mock list
    if (stored && stored.length > 0) {
      return stored.map((item, idx) => ({
        id: item.id || idx + 1,
        title: item.title || `Assignment ${idx + 1}`,
        module: item.application || "EXCEL BASE AND ADVANCED",
        deadline: item.submittedDate || "30-10-2026",
        status: item.status === 'Approved' ? 'Submitted' : (item.status || 'Pending'),
        marks: item.grade || (item.status === 'Approved' ? '95/100' : null),
        remarks: item.remarks || '',
        submittedFile: item.submittedFile || null
      }));
    }
    return assignmentsList;
  });

  React.useEffect(() => {
    const unsub = subscribeToDataUpdates((detail) => {
      const stored = getStoredAssignmentsList();
      if (stored && stored.length > 0) {
        setAssignments(stored.map((item, idx) => ({
          id: item.id || idx + 1,
          title: item.title || `Assignment ${idx + 1}`,
          module: item.application || "EXCEL BASE AND ADVANCED",
          deadline: item.submittedDate || "30-10-2026",
          status: item.status === 'Approved' ? 'Submitted' : (item.status || 'Pending'),
          marks: item.grade || (item.status === 'Approved' ? '95/100' : null),
          remarks: item.remarks || '',
          submittedFile: item.submittedFile || null
        })));
      }
    });
    return () => unsub();
  }, []);
  const [filter, setFilter] = useState('all');
  
  // Currently active assignment being submitted/viewed
  const [activeUploadAsn, setActiveUploadAsn] = useState(null);
  
  // File upload state
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadNotes, setUploadNotes] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [submissionSuccessMsg, setSubmissionSuccessMsg] = useState("");

  const fileInputRef = useRef(null);

  const filtered = assignments.filter(a => {
    if (filter === 'pending') return a.status === 'Pending';
    if (filter === 'submitted') return a.status === 'Submitted';
    return true;
  });

  const handleOpenUploadModal = (assignment) => {
    setActiveUploadAsn(assignment);
    setUploadedFile(null);
    setUploadNotes("");
    setUploadProgress(0);
    setIsUploading(false);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
        raw: file
      });
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setUploadedFile({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
        raw: file
      });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmitSolution = () => {
    if (!uploadedFile) {
      alert("Please select or drop your solution file first (.xlsx, .sql, .py, .ipynb, .zip)");
      return;
    }

    setIsUploading(true);
    setUploadProgress(20);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            // Update assignment state
            setAssignments(current => current.map(item => {
              if (item.id === activeUploadAsn.id) {
                return {
                  ...item,
                  status: 'Submitted',
                  submittedFileName: uploadedFile.name,
                  submittedFileSize: uploadedFile.size,
                  submittedAt: new Date().toLocaleDateString('en-GB') + " " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  studentNotes: uploadNotes
                };
              }
              return item;
            }));

            setIsUploading(false);
            setSubmissionSuccessMsg(`Assignment "${activeUploadAsn.title}" submitted successfully! Evaluator assigned.`);
            setActiveUploadAsn(null);

            setTimeout(() => setSubmissionSuccessMsg(""), 4500);
          }, 400);
          return 100;
        }
        return prev + 25;
      });
    }, 200);
  };

  const handleDownloadTaskTemplate = (asn) => {
    const filename = `${asn.id}_Problem_Workbook.xlsx`;
    downloadFile(filename);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Breadcrumb Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 font-medium">
          <ClipboardList className="w-4 h-4 text-orange-500" />
          <span>/ Courses</span>
          <span>/</span>
          <span className="text-slate-900 font-bold">Assignments & Submissions</span>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2">
          {['all', 'pending', 'submitted'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs capitalize px-3.5 py-1.5 rounded-full font-semibold transition-all cursor-pointer ${
                filter === f
                  ? 'bg-orange-500 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f === 'pending' ? 'Assigned / Pending' : f} ({f === 'all' ? assignments.length : assignments.filter(a => a.status.toLowerCase() === (f === 'pending' ? 'pending' : f)).length})
            </button>
          ))}
        </div>
      </div>

      {/* Success Notification */}
      {submissionSuccessMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-between shadow-2xs animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span>{submissionSuccessMsg}</span>
          </div>
          <button onClick={() => setSubmissionSuccessMsg("")} className="text-emerald-700 hover:text-emerald-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Interactive Solution Upload Drawer / Modal */}
      {activeUploadAsn && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-orange-400 font-bold">
                  Assignment Submission Portal
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white mt-0.5 truncate max-w-sm">
                  {activeUploadAsn.title}
                </h3>
              </div>
              <button 
                onClick={() => setActiveUploadAsn(null)}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between text-xs bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-600 font-medium">Subject Module:</span>
                <span className="font-bold text-slate-900">{activeUploadAsn.subject}</span>
              </div>

              {/* Drag and Drop Upload Area */}
              <div 
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 hover:border-orange-500 rounded-2xl p-6 text-center bg-slate-50/60 hover:bg-orange-50/20 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 group"
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  className="hidden" 
                  accept=".xlsx,.xls,.csv,.sql,.py,.ipynb,.zip,.pdf"
                />
                <div className="w-12 h-12 rounded-2xl bg-orange-100 group-hover:bg-orange-200 text-orange-600 flex items-center justify-center transition-colors">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">
                    Click to browse or drag & drop solution file
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Supports .xlsx, .sql, .py, .ipynb, .zip, .pdf (Max: 50MB)
                  </p>
                </div>
              </div>

              {/* Selected File Card */}
              {uploadedFile && (
                <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileSpreadsheet className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <div className="truncate max-w-[260px]">
                      <span className="text-xs font-bold text-slate-800 block truncate">{uploadedFile.name}</span>
                      <span className="text-[10px] text-emerald-700 font-mono">{uploadedFile.size} • Ready for upload</span>
                    </div>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setUploadedFile(null); }}
                    className="p-1 text-slate-400 hover:text-red-500 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Notes to Evaluator */}
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  Student Notes / Approach Comments (Optional):
                </label>
                <textarea
                  value={uploadNotes}
                  onChange={(e) => setUploadNotes(e.target.value)}
                  placeholder="Mention your approach, formulas or queries used, assumptions, etc..."
                  rows={2}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-slate-800"
                />
              </div>

              {/* Upload Progress Bar */}
              {isUploading && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600">
                    <span>Uploading file to DV Analytics cloud...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-orange-500 transition-all duration-200" 
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveUploadAsn(null)}
                  disabled={isUploading}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmitSolution}
                  disabled={isUploading || !uploadedFile}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-xs transition-all flex items-center gap-2 cursor-pointer ${
                    isUploading || !uploadedFile 
                      ? 'bg-slate-400 cursor-not-allowed opacity-70' 
                      : 'bg-[#2dbd9f] hover:bg-[#25a78c]'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isUploading ? "Uploading..." : "Confirm & Submit Assignment"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assignment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item) => (
          <div 
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs flex flex-col justify-between hover:shadow-md transition-all group"
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
                  {item.status === 'Pending' ? 'Assigned' : item.status}
                </span>
              </div>

              <h3 className="font-bold text-slate-900 text-sm group-hover:text-orange-600 transition-colors leading-snug">
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
                {item.submittedAt && (
                  <div className="flex items-center justify-between text-emerald-700 pt-1">
                    <span>Submitted On:</span>
                    <span className="font-semibold font-mono text-[11px]">{item.submittedAt}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Download & Upload Actions */}
            <div className="mt-5 pt-3 border-t border-slate-100 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleDownloadTaskTemplate(item)}
                  className="py-2.5 px-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center gap-1.5 border border-blue-200 shadow-2xs transition-all cursor-pointer"
                  title="Download Assignment Material / Workbook"
                >
                  <Download className="w-3.5 h-3.5 text-blue-600" />
                  <span>Download Task</span>
                </button>

                <button
                  onClick={() => handleOpenUploadModal(item)}
                  className="py-2.5 px-2 rounded-xl bg-[#2dbd9f] hover:bg-[#25a78c] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                  title="Upload Completed Assignment Solution"
                >
                  <UploadCloud className="w-3.5 h-3.5" />
                  <span>{item.status === 'Submitted' ? 'Re-Upload' : 'Upload Solution'}</span>
                </button>
              </div>

              {item.status === 'Submitted' && (
                <div className="w-full py-2 px-3 text-center text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 truncate">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span className="truncate">{item.submittedFileName || 'Solution.xlsx'}</span>
                  </div>
                  <button
                    onClick={() => downloadFile(item.submittedFileName || 'Solution.xlsx')}
                    className="text-[11px] text-emerald-800 hover:underline font-bold flex items-center gap-0.5 cursor-pointer"
                    title="Download Submitted File"
                  >
                    <Download className="w-3 h-3" />
                    <span>Get</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
