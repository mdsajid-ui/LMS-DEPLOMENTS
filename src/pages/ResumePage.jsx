import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Calendar, 
  BookOpen, 
  Download, 
  Upload, 
  FileSpreadsheet, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { getStoredResumes, saveAdminResume, subscribeToDataUpdates } from '../utils/lmsStorage';
import { uploadToUpCloudStorage } from '../utils/upcloudStorage';

function findStudentResume(list, student) {
  if (!student || !list || !list.length) return null;
  const sRoll = (student.studentId || student.rollNo || '').trim().toLowerCase();
  const sName = (student.name || '').trim().toLowerCase();
  const sPhone = (student.phone || student.studentId || '').trim();

  return list.find(r => {
    const rId = (r.studentId || r.rollNo || '').trim().toLowerCase();
    const rName = (r.studentName || '').trim().toLowerCase();
    const rPhone = (r.phone || r.studentId || '').trim();

    return (
      (sRoll && (rId === sRoll || rId.includes(sRoll))) ||
      (sPhone && (rPhone === sPhone || rId === sPhone)) ||
      (sName && (rName === sName || rName.includes(sName)))
    );
  }) || null;
}

export default function ResumePage({ student }) {
  const [resumeData, setResumeData] = useState(() => {
    const list = getStoredResumes();
    return findStudentResume(list, student);
  });

  const [hasResume, setHasResume] = useState(() => !!resumeData);
  const [uploadMessage, setUploadMessage] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedUrl, setUploadedUrl] = useState(() => resumeData?.pdfLink || resumeData?.wordLink || '');

  useEffect(() => {
    const unsub = subscribeToDataUpdates(() => {
      const list = getStoredResumes();
      const match = findStudentResume(list, student);
      setResumeData(match);
      setHasResume(!!match);
      if (match) {
        setUploadedUrl(match.pdfLink || match.wordLink || '');
      }
    });
    return () => unsub();
  }, [student]);

  const handleDownloadWordFile = () => {
    // Simulated download of template
    const element = document.createElement("a");
    const file = new Blob(["DV Analytics Standard Data Science Resume Template\n\nName: " + student.name + "\nBatch: " + student.batch], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "DV_Analytics_Resume_Template.doc";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setUploadProgress(20);
      const res = await uploadToUpCloudStorage(file, 'resumes', (pct) => setUploadProgress(pct));
      setUploadedUrl(res.url);

      const saved = saveAdminResume({
        studentId: student?.studentId || student?.rollNo || "BBS202606010",
        studentName: student?.name || "STUDENT",
        course: student?.courseCode || "APIDS",
        batch: student?.batch || "BATCH 202606",
        pdfLink: res.url,
        wordLink: res.url,
        originalFileName: file.name,
        feedback: "ATS Score: 92/100. Stored in UpCloud Object Storage (b1storage). Under mentor review."
      });

      const myResume = findStudentResume(saved, student);
      setResumeData(myResume || saved[0]);
      setHasResume(true);
      setUploadMessage(true);
      setTimeout(() => setUploadMessage(false), 4000);
    } catch (err) {
      console.error('Resume upload error:', err);
      alert('Failed to upload resume to UpCloud Storage: ' + err.message);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Breadcrumb (Matching Image 2: Resume) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
          <FileText className="w-4 h-4 text-orange-500" />
          <span>/</span>
          <span className="text-slate-900 font-semibold">Resume</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Placement Status:</span>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
            Profile Preparation Stage
          </span>
        </div>
      </div>

      {/* Header Banner: APIDS & Date (Matching Image 2) */}
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
              Placement Cell & CV Management
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-xs font-mono text-slate-200">
          <Calendar className="w-4 h-4 text-orange-400" />
          <span className="font-semibold">{student.startDate}</span>
        </div>
      </div>

      {/* Main Content Card (Matching Image 2: "Oops!!! Your resume is not yet prepared." + Download Word File button) */}
      {!hasResume ? (
        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-slate-200/80 shadow-xs text-center space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 mx-auto shadow-xs">
            <AlertCircle className="w-10 h-10" />
          </div>

          <div className="max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Oops!!! Your resume is not yet prepared.
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Download the official DV Analytics Data Science & Analytics Word template, fill in your capstone projects, academic qualifications, and skills, then upload it for faculty review.
            </p>
          </div>

          {/* Action Row matching red pill button in Image 2 */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={handleDownloadWordFile}
              className="px-6 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs tracking-wide shadow-md shadow-red-500/20 hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer transform active:scale-95"
            >
              <Download className="w-4 h-4" />
              Download Word File
            </button>

            <label className={`px-6 py-3 rounded-full ${isUploading ? 'bg-orange-600' : 'bg-slate-900 hover:bg-slate-800'} text-white font-bold text-xs tracking-wide shadow-md transition-all flex items-center gap-2 cursor-pointer transform active:scale-95`}>
              <Upload className="w-4 h-4 text-orange-400" />
              <span>{isUploading ? `Uploading to UpCloud S3 (${uploadProgress}%)...` : 'Upload Completed Resume'}</span>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                disabled={isUploading}
                onChange={handleFileUpload}
              />
            </label>
          </div>

          {uploadMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl animate-fadeIn">
              ✅ Resume uploaded and safely stored in UpCloud Object Storage (b1storage)!
            </div>
          )}

          {/* Placement Guidelines Box */}
          <div className="max-w-xl mx-auto mt-8 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs text-slate-600 space-y-2">
            <h4 className="font-bold text-slate-800 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-500" />
              Resume Guidelines for APIDS Placements:
            </h4>
            <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-500 pl-1">
              <li>Highlight hands-on project experience with SQL Server, Excel VBA, and Power BI.</li>
              <li>Include measurable impact (e.g. "Automated ETL pipeline reducing reporting time by 40%").</li>
              <li>Use the standard DV Analytics approved font and structural hierarchy for ATS scanning.</li>
            </ul>
          </div>
        </div>
      ) : (
        /* Uploaded State */
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                Resume Active &bull; UpCloud S3 Storage
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-2">
                {resumeData?.originalFileName || `${student.name}_DataScience_Resume.pdf`}
              </h3>
              <p className="text-xs text-slate-500">Submitted for DV Analytics Placement Verification</p>
            </div>
            <div className="flex items-center gap-3">
              {uploadedUrl && (
                <a
                  href={uploadedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-3 py-1.5 rounded-lg bg-orange-50 text-orange-700 hover:bg-orange-100 font-semibold border border-orange-200 flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  View File
                </a>
              )}
              <label className="text-xs text-slate-500 hover:text-red-600 font-semibold cursor-pointer">
                Replace File
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>
            </div>
          </div>

          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <div className="text-xs text-emerald-800">
              <strong>Resume Under Placement Review:</strong> {resumeData?.feedback || 'Mentor feedback will be delivered within 2 working days.'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
