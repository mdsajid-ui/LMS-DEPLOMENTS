import { excelSessions, sqlSessions, pythonSessions, assignmentsList, studentProfile } from '../data/mockData.js';
import { sealPayload, unsealPayload, sanitizeString } from './securityShield.js';

const STORAGE_KEYS = {
  SESSIONS: 'dva_lms_sessions_v1',
  ASSIGNMENTS: 'dva_lms_assignments_v1',
  FEES: 'dva_lms_fees_v1',
  STUDENTS: 'dva_lms_students_v1',
  RESUMES: 'dva_lms_resumes_v1',
  INTERVIEW_KITS: 'dva_lms_interview_kits_v1',
  ACTIVE_PROFILE: 'dva_lms_active_profile_v1',
  LIVE_CLASSES: 'dva_lms_live_classes_v1'
};

/**
 * Military-Grade Cryptographic Storage Adapters:
 * Encrypts and cryptographically signs data to prevent DevTools manipulation or score forgery.
 */
export function getSecureItem(key, fallback = null) {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return unsealPayload(raw, fallback);
  } catch (e) {
    return fallback;
  }
}

export function setSecureItem(key, data) {
  if (typeof window === 'undefined') return;
  try {
    const sealed = sealPayload(data);
    localStorage.setItem(key, sealed);
  } catch (e) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (err) {}
  }
}

// ==========================================
// REAL-TIME BROADCAST & MULTI-TAB SYNC
// ==========================================
let syncChannel = null;
try {
  if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
    syncChannel = new BroadcastChannel('dva_lms_sync_channel');
  }
} catch (e) {
  console.warn('BroadcastChannel not initialized:', e);
}

/**
 * Notifies all listeners (current window, other tabs, and other windows)
 * that data was updated in the admin portal.
 */
export function notifyDataUpdated(detail) {
  if (typeof window === 'undefined') return;

  const eventPayload = {
    ...detail,
    timestamp: Date.now()
  };

  // 1. Same-window custom event
  try {
    window.dispatchEvent(new CustomEvent('dva_data_updated', { detail: eventPayload }));
  } catch (e) {}

  // 2. Cross-tab BroadcastChannel
  try {
    if (syncChannel) {
      syncChannel.postMessage(eventPayload);
    }
  } catch (e) {}
}

/**
 * Subscribes a React component to live updates across tabs, windows, and same window.
 * Returns an unregister cleanup function.
 */
export function subscribeToDataUpdates(callback) {
  if (typeof window === 'undefined') return () => {};

  const handleCustom = (e) => {
    if (e && e.detail) callback(e.detail);
  };

  const handleStorage = (e) => {
    callback({ type: 'storage_sync', key: e.key, newValue: e.newValue });
  };

  const handleBroadcast = (e) => {
    if (e && e.data) callback(e.data);
  };

  window.addEventListener('dva_data_updated', handleCustom);
  window.addEventListener('storage', handleStorage);
  if (syncChannel) {
    syncChannel.addEventListener('message', handleBroadcast);
  }

  return () => {
    window.removeEventListener('dva_data_updated', handleCustom);
    window.removeEventListener('storage', handleStorage);
    if (syncChannel) {
      syncChannel.removeEventListener('message', handleBroadcast);
    }
  };
}

/**
 * Universal Video URL Parser: Detects YouTube, Google Drive, VdoCipher, Vimeo, or direct MP4/WebM/blob
 */
export function parseVideoUrl(rawUrl) {
  if (!rawUrl) return { type: 'direct', src: './sample-lecture.mp4' };
  const url = String(rawUrl).trim();

  // YouTube match
  const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  if (ytMatch && ytMatch[1]) {
    return {
      type: 'youtube',
      embedUrl: `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?autoplay=1&rel=0&modestbranding=1`,
      videoId: ytMatch[1]
    };
  }

  // Google Drive match
  if (url.includes('drive.google.com')) {
    const driveFileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (driveFileMatch && driveFileMatch[1]) {
      return {
        type: 'drive',
        embedUrl: `https://drive.google.com/file/d/${driveFileMatch[1]}/preview`,
        fileId: driveFileMatch[1]
      };
    }
    return {
      type: 'drive',
      embedUrl: url.replace('/view', '/preview'),
      fileId: ''
    };
  }

  // VdoCipher match
  if (url.includes('player.vdocipher.com') || url.includes('vdocipher')) {
    return {
      type: 'vdocipher',
      embedUrl: url
    };
  }

  // Vimeo match
  const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeoMatch && vimeoMatch[1]) {
    return {
      type: 'vimeo',
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`,
      videoId: vimeoMatch[1]
    };
  }

  // Direct video file (MP4, WebM, blob:, uploaded link, etc.)
  return {
    type: 'direct',
    src: url
  };
}

// Default initial sessions
const defaultSessionsState = {
  excel: excelSessions,
  sql: sqlSessions,
  python: pythonSessions
};

// ==========================================
// SESSIONS PERSISTENCE & SMART MATCHING
// ==========================================

export function getAllStoredSessions() {
  try {
    const parsed = getSecureItem(STORAGE_KEYS.SESSIONS, null);
    if (parsed) {
      // Ensure all keys exist
      if (parsed.excel && parsed.sql && parsed.python) {
        return parsed;
      }
      return { ...defaultSessionsState, ...parsed };
    }
  } catch (e) {
    console.error('Error reading sessions from storage:', e);
  }

  try {
    setSecureItem(STORAGE_KEYS.SESSIONS, defaultSessionsState);
  } catch (e) {}
  return defaultSessionsState;
}

export function getSubjectStoredSessions(subjectName) {
  const all = getAllStoredSessions();
  const lower = (subjectName || '').toLowerCase();
  if (lower.includes('sql')) return all.sql || sqlSessions;
  if (lower.includes('python')) return all.python || pythonSessions;
  return all.excel || excelSessions;
}

/**
 * Smart Session Matcher:
 * Intelligently matches user input like "Excel session 1", "Session 1", "Session-1",
 * "SESSION 1 VIDEO", "B1.SESSION-1", "Session One", etc. to existing session items.
 */
export function findSessionFolderIndex(sessionsList, rawTitle) {
  if (!rawTitle || !Array.isArray(sessionsList) || sessionsList.length === 0) return -1;
  const clean = String(rawTitle).trim().toLowerCase();

  // 1. Direct match on title or id
  let idx = sessionsList.findIndex(s => {
    const sTitle = (s.title || '').trim().toLowerCase();
    const sId = (s.id || '').trim().toLowerCase();
    return sTitle === clean || sId === clean || sTitle.replace(/[^a-z0-9]/g, '') === clean.replace(/[^a-z0-9]/g, '');
  });
  if (idx >= 0) return idx;

  // 2. Extract session number (e.g. 1 from "Session 1", "Session-1", "Excel Session 1", "Session One")
  const wordMap = { 'one': '1', 'two': '2', 'three': '3', 'four': '4', 'five': '5', 'six': '6', 'seven': '7', 'eight': '8' };
  let extractedNum = null;
  const wordMatch = clean.match(/session\s*[-_.]?\s*(one|two|three|four|five|six|seven|eight)/i);
  if (wordMatch) {
    extractedNum = wordMap[wordMatch[1].toLowerCase()];
  } else {
    const numMatch = clean.match(/session\s*[-_.]?\s*(\d+)/i) || clean.match(/\b(?:b\d+\.)?session[-_ ]?(\d+)\b/i) || clean.match(/\b(\d+)\b/);
    if (numMatch) {
      extractedNum = numMatch[1];
    }
  }

  if (extractedNum) {
    const targetTokenA = `session-${extractedNum}`;
    const targetTokenB = `session ${extractedNum}`;
    const targetTokenC = `session-${extractedNum.padStart(2, '0')}`;
    const targetTokenD = `b${extractedNum}.session-${extractedNum}`;

    idx = sessionsList.findIndex(s => {
      const sTitle = (s.title || '').toLowerCase();
      const sId = (s.id || '').toLowerCase();
      return (
        sTitle.includes(targetTokenA) ||
        sTitle.includes(targetTokenB) ||
        sTitle.includes(targetTokenC) ||
        sTitle.includes(targetTokenD) ||
        sId === targetTokenA ||
        sId.includes(targetTokenA)
      );
    });
    if (idx >= 0) return idx;
  }

  // 3. Fallback: Contains substring in fullTitle or title
  idx = sessionsList.findIndex(s => {
    const sTitle = (s.title || '').toLowerCase();
    const sFull = (s.fullTitle || '').toLowerCase();
    return (sTitle && clean.includes(sTitle)) || (sFull && clean.includes(sFull));
  });

  return idx;
}

/**
 * Saves or updates a session from Admin Portal (Session.aspx / LiveSessionView).
 * Immediately synchronizes with Student LMS.
 */
export function saveAdminSession({
  date = new Date().toISOString().split('T')[0],
  mentor = "Dr. Sandip Mukherjee",
  batch = "BATCH 202606",
  application = "EXCEL BASE AND ADVANCED",
  sessionTitle = "B1.SESSION-1",
  sortOrder = "1",
  topicType = "CLASS VIDEOS",
  uploadedLink = "",
  description = ""
}) {
  const all = getAllStoredSessions();
  const lower = (application || '').toLowerCase();
  let key = 'excel';
  if (lower.includes('sql')) key = 'sql';
  else if (lower.includes('python')) key = 'python';

  const subjectSessions = [...(all[key] || [])];
  const normTitle = (sessionTitle || '').trim();
  const rawUrl = (uploadedLink || '').trim();
  const folderIndex = findSessionFolderIndex(subjectSessions, normTitle);

  const newItem = {
    id: `item-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    title: description || `${normTitle} ${topicType === 'CLASS VIDEOS' ? 'Video Lecture' : topicType}`,
    type: topicType === 'CLASS VIDEOS' ? 'video' : 'file',
    duration: topicType === 'CLASS VIDEOS' ? 'HD Video Stream' : 'File Download',
    embedUrl: rawUrl,
    videoUrl: rawUrl,
    fileName: description || `${normTitle.replace(/[^a-zA-Z0-9]/g, '_')}_${topicType === 'CLASS VIDEOS' ? 'Lecture.mp4' : 'Materials.zip'}`,
    uploadedDate: date,
    instructor: mentor,
    isLiveUpdated: true
  };

  let updatedFolderTitle = normTitle;

  if (folderIndex >= 0) {
    // Update existing folder
    const targetFolder = { ...subjectSessions[folderIndex] };
    const items = [...(targetFolder.items || [])];
    updatedFolderTitle = targetFolder.title || normTitle;

    if (topicType === 'CLASS VIDEOS') {
      targetFolder.vdocipherEmbedUrl = rawUrl;
      targetFolder.videoUrl = rawUrl;
      targetFolder.videoFileName = description || `${updatedFolderTitle}.mp4`;
      targetFolder.recordingDate = date;
      targetFolder.instructor = mentor;
      targetFolder.hasActionButtons = true;
      targetFolder.isLiveUpdated = true;

      // Update existing video item or prepend
      const vIdx = items.findIndex(it => it.type === 'video');
      if (vIdx >= 0) {
        items[vIdx] = {
          ...items[vIdx],
          title: description || `${updatedFolderTitle} Class Video`,
          embedUrl: rawUrl,
          videoUrl: rawUrl,
          fileName: description || `${updatedFolderTitle}.mp4`,
          uploadedDate: date,
          instructor: mentor,
          isLiveUpdated: true
        };
      } else {
        items.unshift(newItem);
      }
    } else if (topicType === 'MATERIALS') {
      targetFolder.materialFileName = description || `${updatedFolderTitle}_Materials.zip`;
      targetFolder.driveFolderUrl = rawUrl || targetFolder.driveFolderUrl;
      targetFolder.hasActionButtons = true;
      targetFolder.isLiveUpdated = true;
      items.push(newItem);
    } else if (topicType === 'ASSIGNMENTS') {
      targetFolder.assignmentFileName = description || `${updatedFolderTitle}_Assignments.xlsx`;
      targetFolder.hasActionButtons = true;
      targetFolder.isLiveUpdated = true;
      items.push(newItem);
    }

    targetFolder.items = items;
    subjectSessions[folderIndex] = targetFolder;
  } else {
    // Create new session folder
    const safeId = normTitle.toLowerCase().replace(/[^a-z0-9]/g, '-') || `session-${Date.now()}`;
    const newFolder = {
      id: safeId,
      title: normTitle.toUpperCase(),
      fullTitle: `${normTitle}: ${description || application}`,
      isFolder: true,
      hasActionButtons: true,
      isLiveUpdated: true,
      driveFolderUrl: rawUrl,
      vdocipherEmbedUrl: topicType === 'CLASS VIDEOS' ? rawUrl : undefined,
      videoUrl: topicType === 'CLASS VIDEOS' ? rawUrl : undefined,
      videoFileName: topicType === 'CLASS VIDEOS' ? (description || `${normTitle}.mp4`) : undefined,
      materialFileName: topicType === 'MATERIALS' ? (description || `${normTitle}_Materials.zip`) : undefined,
      assignmentFileName: topicType === 'ASSIGNMENTS' ? (description || `${normTitle}_Assignments.xlsx`) : undefined,
      duration: "2h 00m",
      recordingDate: date,
      instructor: mentor,
      batch: batch,
      items: [newItem]
    };
    subjectSessions.push(newFolder);
    updatedFolderTitle = newFolder.title;
  }

  all[key] = subjectSessions;
  try {
    setSecureItem(STORAGE_KEYS.SESSIONS, all);
  } catch (e) {
    console.error('Error saving session to storage:', e);
  }

  // Instant notification to all open tabs and Student LMS
  notifyDataUpdated({
    type: 'sessions',
    subject: key,
    sessionTitle: updatedFolderTitle,
    action: 'upload',
    topicType,
    url: rawUrl,
    message: `${updatedFolderTitle} (${topicType}) updated by Admin`
  });

  return all[key];
}

/**
 * Delete a session folder or item from Admin Portal (sessiondelete.aspx)
 */
export function deleteAdminSession(sessionId, subjectName) {
  const all = getAllStoredSessions();
  const lower = (subjectName || '').toLowerCase();
  let key = 'excel';
  if (lower.includes('sql')) key = 'sql';
  else if (lower.includes('python')) key = 'python';

  const beforeLen = (all[key] || []).length;
  all[key] = (all[key] || []).filter(s => s.id !== sessionId);

  try {
    setSecureItem(STORAGE_KEYS.SESSIONS, all);
  } catch (e) {}

  notifyDataUpdated({
    type: 'sessions',
    subject: key,
    action: 'delete',
    sessionId,
    message: `Session deleted from ${key.toUpperCase()}`
  });

  return all[key];
}

// ==========================================
// STUDENT PROFILE SYNCHRONIZATION
// ==========================================
export function getStoredStudentProfile() {
  try {
    const parsed = getSecureItem(STORAGE_KEYS.ACTIVE_PROFILE, null);
    if (parsed) return parsed;
  } catch (e) {}

  try {
    setSecureItem(STORAGE_KEYS.ACTIVE_PROFILE, studentProfile);
  } catch (e) {}
  return studentProfile;
}

export function saveStudentProfile(updatedProfile) {
  const merged = { ...getStoredStudentProfile(), ...updatedProfile };
  try {
    setSecureItem(STORAGE_KEYS.ACTIVE_PROFILE, merged);
  } catch (e) {}

  notifyDataUpdated({
    type: 'profile',
    data: merged,
    message: 'Student profile updated'
  });
  return merged;
}

// ==========================================
// ASSIGNMENT APPROVAL PERSISTENCE (AssignmentApproval.aspx)
// ==========================================
const initialAdminAssignments = [
  {
    id: 101,
    studentName: "SK ABDUL SAJID",
    rollNo: "DVA-202606-448",
    batch: "BATCH 202606",
    application: "EXCEL BASE AND ADVANCED",
    title: "Financial Modeling & Pivot Automation",
    submittedFile: "Abdul_Sajid_Excel_Assignment4.xlsx",
    submittedDate: "28-09-2026",
    status: "Pending",
    grade: "",
    remarks: ""
  },
  {
    id: 102,
    studentName: "PRIYANKA MISHRA",
    rollNo: "DVA-202606-449",
    batch: "BATCH 202606",
    application: "PYTHON PROGRAMMING",
    title: "Pandas Data Cleaning & Feature Engineering",
    submittedFile: "Priyanka_Python_Pandas.ipynb",
    submittedDate: "29-09-2026",
    status: "Approved",
    grade: "A+",
    remarks: "Excellent handling of missing values and datetime manipulation."
  },
  {
    id: 103,
    studentName: "SK ABDUL SAJID",
    rollNo: "DVA-202606-448",
    batch: "BATCH 202606",
    application: "SQL SERVER",
    title: "Window Functions & CTE Analytics",
    submittedFile: "Abdul_Sajid_SQL_ComplexQueries.sql",
    submittedDate: "30-09-2026",
    status: "Approved",
    grade: "A",
    remarks: "Great use of ROW_NUMBER() and DENSE_RANK() partitioning."
  },
  {
    id: 104,
    studentName: "SWATILEKHA SETHI",
    rollNo: "DVA-202209-314",
    batch: "Batch 202209",
    application: "POWER BI",
    title: "Executive Sales KPI Dashboard",
    submittedFile: "Swatilekha_Sales_Dashboard.pbix",
    submittedDate: "01-10-2026",
    status: "Pending",
    grade: "",
    remarks: ""
  },
  {
    id: 105,
    studentName: "ANANYA MOHANTY",
    rollNo: "DVA-202301-501",
    batch: "Batch 202301",
    application: "MACHINE LEARNING AND AI",
    title: "Random Forest & XGBoost Customer Churn",
    submittedFile: "Ananya_ML_ChurnModel.ipynb",
    submittedDate: "01-10-2026",
    status: "Pending",
    grade: "",
    remarks: ""
  }
];

export function getStoredAssignmentsList() {
  try {
    const parsed = getSecureItem(STORAGE_KEYS.ASSIGNMENTS, null);
    if (parsed) return parsed;
  } catch (e) {}
  try {
    setSecureItem(STORAGE_KEYS.ASSIGNMENTS, initialAdminAssignments);
  } catch (e) {}
  return initialAdminAssignments;
}

export function updateAdminAssignment(id, updateFields) {
  const list = getStoredAssignmentsList();
  const updated = list.map(a => a.id === id ? { ...a, ...updateFields } : a);
  try {
    setSecureItem(STORAGE_KEYS.ASSIGNMENTS, updated);
  } catch (e) {}

  notifyDataUpdated({
    type: 'assignments',
    assignmentId: id,
    data: updateFields,
    message: `Assignment updated: Status is now ${updateFields.status || 'Updated'}`
  });
  return updated;
}

export function saveAdminAssignment(assignmentData) {
  const list = getStoredAssignmentsList();
  const newAsn = {
    id: Date.now(),
    submittedDate: new Date().toISOString().split('T')[0],
    status: "Pending",
    grade: "",
    remarks: "",
    ...assignmentData
  };
  const updated = [newAsn, ...list];
  try {
    setSecureItem(STORAGE_KEYS.ASSIGNMENTS, updated);
  } catch (e) {}

  notifyDataUpdated({
    type: 'assignments',
    action: 'create',
    assignment: newAsn,
    message: `New assignment created: ${newAsn.title}`
  });
  return updated;
}

// ==========================================
// RESUME UPLOAD PERSISTENCE (UploadResume.aspx)
// ==========================================
const initialResumesList = [
  {
    id: 1,
    studentId: "9955774102",
    studentName: "SK ABDUL SAJID",
    course: "APIDS",
    batch: "BATCH 202606",
    pdfLink: "https://edu.dvanalyticsmds.com/resumes/SK_Abdul_Sajid_APIDS.pdf",
    wordLink: "https://edu.dvanalyticsmds.com/resumes/SK_Abdul_Sajid_APIDS.docx",
    uploadedDate: "2026-09-18",
    status: "Approved",
    feedback: "ATS Score: 92/100. Approved for Tier-1 placements."
  },
  {
    id: 2,
    studentId: "9812345678",
    studentName: "PRIYANKA MISHRA",
    course: "APIDS",
    batch: "BATCH 202606",
    pdfLink: "https://edu.dvanalyticsmds.com/resumes/Priyanka_Mishra_APIDS.pdf",
    wordLink: "https://edu.dvanalyticsmds.com/resumes/Priyanka_Mishra_APIDS.docx",
    uploadedDate: "2026-09-22",
    status: "Approved",
    feedback: "Ready for client submission."
  },
  {
    id: 3,
    studentId: "9439281720",
    studentName: "SOUVIK SWAIN",
    course: "APIDA",
    batch: "Batch 202209",
    pdfLink: "https://edu.dvanalyticsmds.com/resumes/Souvik_Swain_APIDA.pdf",
    wordLink: "https://edu.dvanalyticsmds.com/resumes/Souvik_Swain_APIDA.docx",
    uploadedDate: "2026-09-28",
    status: "Pending",
    feedback: "Awaiting final review."
  }
];

export function getStoredResumes() {
  try {
    const parsed = getSecureItem(STORAGE_KEYS.RESUMES, null);
    if (parsed) return parsed;
  } catch (e) {}
  try {
    setSecureItem(STORAGE_KEYS.RESUMES, initialResumesList);
  } catch (e) {}
  return initialResumesList;
}

export function saveAdminResume(resumeData) {
  const list = getStoredResumes();
  const created = {
    id: Date.now(),
    uploadedDate: new Date().toISOString().split('T')[0],
    status: "Approved",
    ...resumeData
  };
  const updated = [created, ...list];
  try {
    setSecureItem(STORAGE_KEYS.RESUMES, updated);
  } catch (e) {}

  notifyDataUpdated({
    type: 'resumes',
    action: 'save',
    resume: created,
    message: `Resume for ${created.studentName} updated by Admin`
  });
  return updated;
}

export function deleteAdminResume(id) {
  const list = getStoredResumes();
  const updated = list.filter(r => r.id !== id);
  try {
    setSecureItem(STORAGE_KEYS.RESUMES, updated);
  } catch (e) {}

  notifyDataUpdated({
    type: 'resumes',
    action: 'delete',
    id,
    message: 'Resume deleted'
  });
  return updated;
}

// ==========================================
// FEE MANAGEMENT PERSISTENCE (Fee.aspx)
// ==========================================
const initialFeesList = [
  {
    id: 1,
    date: "2026-10-01",
    studentId: "9955774102",
    studentName: "SK ABDUL SAJID",
    rollNo: "DVA-202606-448",
    committedFee: "65000",
    batch: "BATCH 202606",
    course: "APIDS",
    balance: "0",
    amount: "35000",
    installment1: "35000",
    installment2: "30000",
    installment3: "0",
    modeOfPay: "UPI / Bank Transfer",
    remarks: "Full course fee cleared in two installments.",
    referenceDoc: "Receipt_INV_88392.pdf"
  },
  {
    id: 2,
    date: "2026-09-04",
    studentId: "6201323342",
    studentName: "SAHIL JAIN",
    rollNo: "BLR202609005",
    committedFee: "300000",
    batch: "BATCH 202608-FDE",
    course: "FDE",
    balance: "200000",
    amount: "100000",
    installment1: "100000",
    installment2: "0",
    installment3: "0",
    modeOfPay: "Bank Transfer",
    remarks: "1st installment received. Balance 200000 due.",
    referenceDoc: "Receipt_BLR202609005.pdf"
  },
  {
    id: 3,
    date: "2026-09-07",
    studentId: "8103963163",
    studentName: "SURABHI CHAURASIA",
    rollNo: "BLR202609007",
    committedFee: "300000",
    batch: "Self Study Batch",
    course: "APIDS",
    balance: "100000",
    amount: "100000",
    installment1: "100000",
    installment2: "100000",
    installment3: "0",
    modeOfPay: "Net Banking",
    remarks: "2nd installment received. Balance 100000 due.",
    referenceDoc: "Receipt_BLR202609007.pdf"
  },
  {
    id: 4,
    date: "2026-09-13",
    studentId: "9439240898",
    studentName: "AMIT DASH",
    rollNo: "BBS202609014",
    committedFee: "300000",
    batch: "BATCH 202609",
    course: "APIDS",
    balance: "0",
    amount: "100000",
    installment1: "100000",
    installment2: "100000",
    installment3: "100000",
    modeOfPay: "UPI / NEFT",
    remarks: "3rd and final installment paid in full. Account cleared.",
    referenceDoc: "Receipt_BBS202609014.pdf"
  },
  {
    id: 5,
    date: "2026-09-13",
    studentId: "8123428609",
    studentName: "BISWAJIT RK",
    rollNo: "BBS202609010",
    committedFee: "300000",
    batch: "BATCH 202609",
    course: "APIDS",
    balance: "200000",
    amount: "100000",
    installment1: "100000",
    installment2: "0",
    installment3: "0",
    modeOfPay: "Cheque / DD",
    remarks: "1st installment received. Balance 200000 due.",
    referenceDoc: "Receipt_BBS202609010.pdf"
  },
  {
    id: 6,
    date: "2026-09-13",
    studentId: "8142030658",
    studentName: "NAGARAJU SARASWATHI",
    rollNo: "BLR202609008",
    committedFee: "300000",
    batch: "BATCH 202609",
    course: "APIDA",
    balance: "200000",
    amount: "100000",
    installment1: "100000",
    installment2: "0",
    installment3: "0",
    modeOfPay: "Bank Transfer",
    remarks: "1st installment received. Balance 200000 due.",
    referenceDoc: "Receipt_BLR202609008.pdf"
  },
  {
    id: 7,
    date: "2026-09-13",
    studentId: "9556539717",
    studentName: "TAPAN MAHAPATRA",
    rollNo: "BBS202609009",
    committedFee: "300000",
    batch: "BATCH 202609",
    course: "APIDS",
    balance: "100000",
    amount: "100000",
    installment1: "100000",
    installment2: "100000",
    installment3: "0",
    modeOfPay: "UPI Transfer",
    remarks: "2nd installment received. Balance 100000 due.",
    referenceDoc: "Receipt_BBS202609009.pdf"
  }
];

export function getStoredFees() {
  try {
    const parsed = getSecureItem(STORAGE_KEYS.FEES, null);
    if (parsed) {
      const existingRolls = new Set(parsed.map(f => f.rollNo || f.studentId));
      const missing = initialFeesList.filter(f => !existingRolls.has(f.rollNo) && !existingRolls.has(f.studentId));
      if (missing.length > 0) {
        const merged = [...parsed, ...missing];
        setSecureItem(STORAGE_KEYS.FEES, merged);
        return merged;
      }
      return parsed;
    }
  } catch (e) {}
  try {
    setSecureItem(STORAGE_KEYS.FEES, initialFeesList);
  } catch (e) {}
  return initialFeesList;
}

export function saveAdminFee(feeData) {
  const fees = getStoredFees();
  const newFee = {
    id: Date.now(),
    date: new Date().toISOString().split('T')[0],
    ...feeData
  };
  const updated = [newFee, ...fees];
  try {
    setSecureItem(STORAGE_KEYS.FEES, updated);
  } catch (e) {}

  notifyDataUpdated({
    type: 'fees',
    fee: newFee,
    message: `Payment of ₹${newFee.amount} recorded for ${newFee.studentName}`
  });
  return updated;
}

// ==========================================
// STUDENT REGISTRATION PERSISTENCE (Reg.aspx)
// ==========================================
const initialRegisteredStudents = [
  {
    id: 1,
    rollNo: "BLR202609005",
    name: "SAHIL JAIN",
    email: "Connectwithsahiljain@gmail.com",
    phone: "6201323342",
    emergencyPhone: "9559055633",
    course: "FDE",
    batch: "BATCH 202608-FDE",
    regDate: "2026-09-04",
    dob: "07-11-1999",
    gender: "Male",
    education: "B.Tech",
    totalFee: "300000",
    paidFee: "100000",
    installment1: "100000",
    installment2: "0",
    installment3: "0",
    dueFee: "200000",
    status: "Active",
    college: "Technical University",
    location: "Nallurhali Whitefield, Bengaluru"
  },
  {
    id: 2,
    rollNo: "BLR202609007",
    name: "SURABHI CHAURASIA",
    email: "surabhi.chaurasiausa@gmail.com",
    phone: "8103963163",
    emergencyPhone: "9425146259",
    course: "APIDS",
    batch: "Self Study Batch",
    regDate: "2026-09-07",
    dob: "24-02-1993",
    gender: "Female",
    education: "M.TECH",
    totalFee: "300000",
    paidFee: "200000",
    installment1: "100000",
    installment2: "100000",
    installment3: "0",
    dueFee: "100000",
    status: "Active",
    college: "Postgraduate Institute",
    location: "ABC, Bengaluru"
  },
  {
    id: 3,
    rollNo: "BBS202609014",
    name: "AMIT DASH",
    email: "AMITDASH0202@GMAIL.COM",
    phone: "9439240898",
    emergencyPhone: "9438907966",
    course: "APIDS",
    batch: "BATCH 202609",
    regDate: "2026-09-13",
    dob: "22-02-2002",
    gender: "Male",
    education: "B tech",
    totalFee: "300000",
    paidFee: "300000",
    installment1: "100000",
    installment2: "100000",
    installment3: "100000",
    dueFee: "0",
    status: "Active",
    college: "Biju Patnaik University of Technology",
    location: "B101 Laxmi Ashiyana, Balianta, Bhubaneswar, 752101"
  },
  {
    id: 4,
    rollNo: "BBS202609010",
    name: "BISWAJIT RK",
    email: "biswajitrk123@gmail.com",
    phone: "8123428609",
    emergencyPhone: "9901285472",
    course: "APIDS",
    batch: "BATCH 202609",
    regDate: "2026-09-13",
    dob: "17-11-2005",
    gender: "Male",
    education: "Graduate",
    totalFee: "300000",
    paidFee: "100000",
    installment1: "100000",
    installment2: "0",
    installment3: "0",
    dueFee: "200000",
    status: "Active",
    college: "Bangalore University",
    location: "203, 2nd floor, Lavanya Tulip, Whitefield, Bengaluru - 560066"
  },
  {
    id: 5,
    rollNo: "BLR202609008",
    name: "NAGARAJU SARASWATHI",
    email: "snagaraju119@gmail.com",
    phone: "8142030658",
    emergencyPhone: "9951175290",
    course: "APIDA",
    batch: "BATCH 202609",
    regDate: "2026-09-13",
    dob: "06-04-1993",
    gender: "Male",
    education: "MCA",
    totalFee: "300000",
    paidFee: "100000",
    installment1: "100000",
    installment2: "0",
    installment3: "0",
    dueFee: "200000",
    status: "Active",
    college: "Andhra University",
    location: "chintalavalli(post) musunuru(MD) Eluru(DT) pin:521207"
  },
  {
    id: 6,
    rollNo: "BBS202609009",
    name: "TAPAN MAHAPATRA",
    email: "pmahapatratapan@gmail.com",
    phone: "9556539717",
    emergencyPhone: "7750802742",
    course: "APIDS",
    batch: "BATCH 202609",
    regDate: "2026-09-13",
    dob: "09-02-2001",
    gender: "Male",
    education: "B-tech",
    totalFee: "300000",
    paidFee: "200000",
    installment1: "100000",
    installment2: "100000",
    installment3: "0",
    dueFee: "100000",
    status: "Active",
    college: "Utkal University",
    location: "LIG-52/10 HB Colony chandra sekhar pur, bhubaneswar"
  },
  {
    id: 7,
    rollNo: "DVA-202606-448",
    name: "SK ABDUL SAJID",
    email: "sajid.student@dvanalytics.com",
    phone: "9955774102",
    emergencyPhone: "9876543210",
    course: "APIDS",
    batch: "BATCH 202606",
    regDate: "2026-06-05",
    dob: "15-08-2000",
    gender: "Male",
    education: "B.Tech (CSE)",
    totalFee: "65000",
    paidFee: "65000",
    installment1: "35000",
    installment2: "30000",
    installment3: "0",
    dueFee: "0",
    status: "Active",
    college: "Biju Patnaik University of Technology",
    location: "Bhubaneswar / Kolkata"
  }
];

export function getStoredStudents() {
  try {
    const parsed = getSecureItem(STORAGE_KEYS.STUDENTS, null);
    if (parsed) {
      const existingRolls = new Set(parsed.map(s => s.rollNo));
      const missing = initialRegisteredStudents.filter(s => !existingRolls.has(s.rollNo));
      if (missing.length > 0) {
        const merged = [...parsed, ...missing];
        setSecureItem(STORAGE_KEYS.STUDENTS, merged);
        return merged;
      }
      return parsed;
    }
  } catch (e) {}
  try {
    setSecureItem(STORAGE_KEYS.STUDENTS, initialRegisteredStudents);
  } catch (e) {}
  return initialRegisteredStudents;
}

export function saveAdminStudent(studentData) {
  const students = getStoredStudents();
  const created = {
    id: Date.now(),
    rollNo: studentData.rollNo || `DVA-${(studentData.batch || '202606').replace(/[^0-9]/g, '')}-${Math.floor(Math.random() * 400 + 460)}`,
    regDate: new Date().toISOString().split('T')[0],
    status: "Active",
    ...studentData
  };
  const updated = [created, ...students];
  try {
    setSecureItem(STORAGE_KEYS.STUDENTS, updated);
  } catch (e) {}

  // If this student matches current logged-in student, update active profile
  if (created.name && created.name.toUpperCase().includes('SAJID')) {
    saveStudentProfile({
      name: created.name,
      email: created.email,
      phone: created.phone,
      batch: created.batch,
      course: created.course,
      rollNo: created.rollNo
    });
  }

  notifyDataUpdated({
    type: 'students',
    student: created,
    message: `Student registered: ${created.name}`
  });
  return updated;
}

// ==========================================
// 8. LIVE CLASSROOM & ZOOM SCHEDULE SYNC
// ==========================================
export const initialLiveClasses = [
  {
    id: "live-cls-101",
    date: new Date().toISOString().split('T')[0],
    time: "11:00 AM - 06:30 PM",
    batch: "BATCH 202606",
    cohortInfo: "Ganesh, Sajid • BATCH 202606 / 202608 / 202609",
    subject: "SQL Server Advanced & Practical Data Lab",
    topic: "Practical Lab & Live Doubt Clearing Session",
    mentor: "Debashish Sir (DVMENTOR4)",
    mentorId: "DVMENTOR4",
    email: "dvmentor4.2024@gmail.com",
    phone: "089042 50708 (Debashish Sir)",
    meetingId: "754 061 9228",
    rawMeetingId: "7540619228",
    passcode: "281340",
    zoomJoinUrl: "https://zoom.us/j/7540619228?pwd=cENiVlhqNVY5SERhUHRwckdJREZMQT09",
    webJoinUrl: "https://app.zoom.us/wc/7540619228/join?pwd=cENiVlhqNVY5SERhUHRwckdJREZMQT09",
    hostStartUrl: "https://zoom.us/s/7540619228?pwd=cENiVlhqNVY5SERhUHRwckdJREZMQT09",
    status: "LIVE NOW",
    isPrimary: true
  },
  {
    id: "live-cls-102",
    date: new Date().toISOString().split('T')[0],
    time: "07:00 PM - 09:00 PM",
    batch: "BATCH 202608",
    cohortInfo: "APIDS Master Cohort • BATCH 202608",
    subject: "Excel Base and Advanced",
    topic: "Power Query Automation, DAX & Dynamic Modeling",
    mentor: "Debendra Debadutta Das (DVMENTOR1)",
    mentorId: "DVMENTOR1",
    email: "dvmentor1@dvanalyticsmds.com",
    phone: "089042 50701",
    meetingId: "812 345 6789",
    rawMeetingId: "8123456789",
    passcode: "100200",
    zoomJoinUrl: "https://zoom.us/j/8123456789?pwd=DVMENTOR1PASS",
    webJoinUrl: "https://zoom.us/wc/join/8123456789?pwd=DVMENTOR1PASS",
    hostStartUrl: "https://zoom.us/s/8123456789?pwd=DVMENTOR1PASS",
    status: "SCHEDULED",
    isPrimary: false
  },
  {
    id: "live-cls-103",
    date: new Date().toISOString().split('T')[0],
    time: "10:00 AM - 01:00 PM",
    batch: "BATCH 202609",
    cohortInfo: "Weekend Data Science • BATCH 202609",
    subject: "Python Analytics",
    topic: "Pandas Data Cleaning, GroupBy & Visualizations",
    mentor: "Dr. Sandip Mukherjee (DVMENTOR2)",
    mentorId: "DVMENTOR2",
    email: "dvmentor2@dvanalyticsmds.com",
    phone: "089042 50702",
    meetingId: "823 456 7890",
    rawMeetingId: "8234567890",
    passcode: "200300",
    zoomJoinUrl: "https://zoom.us/j/8234567890?pwd=DVMENTOR2PASS",
    webJoinUrl: "https://zoom.us/wc/join/8234567890?pwd=DVMENTOR2PASS",
    hostStartUrl: "https://zoom.us/s/8234567890?pwd=DVMENTOR2PASS",
    status: "SCHEDULED",
    isPrimary: false
  }
];

export function getStoredLiveClasses() {
  if (typeof window === 'undefined') return initialLiveClasses;
  try {
    const parsed = getSecureItem(STORAGE_KEYS.LIVE_CLASSES, null);
    if (parsed && Array.isArray(parsed) && parsed.length > 0) return parsed;
  } catch (e) {}
  try {
    setSecureItem(STORAGE_KEYS.LIVE_CLASSES, initialLiveClasses);
  } catch (e) {}
  return initialLiveClasses;
}

export function saveLiveClass(classData) {
  const current = getStoredLiveClasses();
  let updated;
  if (classData.id) {
    const exists = current.some(c => c.id === classData.id);
    if (exists) {
      updated = current.map(c => c.id === classData.id ? { ...c, ...classData } : c);
    } else {
      updated = [classData, ...current];
    }
  } else {
    const newClass = {
      ...classData,
      id: `live-cls-${Date.now()}`
    };
    updated = [newClass, ...current];
  }

  try {
    setSecureItem(STORAGE_KEYS.LIVE_CLASSES, updated);
  } catch (e) {}

  notifyDataUpdated({
    type: 'live_classes',
    classes: updated,
    message: `Live class updated: ${classData.subject || 'Live Session'}`
  });

  return updated;
}

export function updateLiveClassStatus(id, newStatus) {
  const current = getStoredLiveClasses();
  const updated = current.map(c => {
    if (c.id === id) {
      return { ...c, status: newStatus };
    }
    // If setting to LIVE NOW, other classes for same batch can be scheduled
    return c;
  });

  try {
    setSecureItem(STORAGE_KEYS.LIVE_CLASSES, updated);
  } catch (e) {}

  notifyDataUpdated({
    type: 'live_classes',
    classes: updated,
    message: `Live class status changed to ${newStatus}`
  });

  return updated;
}

export function deleteLiveClass(id) {
  const current = getStoredLiveClasses();
  const updated = current.filter(c => c.id !== id);

  try {
    setSecureItem(STORAGE_KEYS.LIVE_CLASSES, updated);
  } catch (e) {}

  notifyDataUpdated({
    type: 'live_classes',
    classes: updated,
    message: 'Live class schedule deleted'
  });

  return updated;
}

