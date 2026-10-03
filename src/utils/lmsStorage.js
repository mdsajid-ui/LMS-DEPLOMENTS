import { excelSessions, sqlSessions, pythonSessions, assignmentsList, studentProfile } from '../data/mockData.js';

const STORAGE_KEYS = {
  SESSIONS: 'dva_lms_sessions_v1',
  ASSIGNMENTS: 'dva_lms_assignments_v1',
  FEES: 'dva_lms_fees_v1',
  STUDENTS: 'dva_lms_students_v1',
  RESUMES: 'dva_lms_resumes_v1',
  INTERVIEW_KITS: 'dva_lms_interview_kits_v1',
  ACTIVE_PROFILE: 'dva_lms_active_profile_v1'
};

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
    const raw = localStorage.getItem(STORAGE_KEYS.SESSIONS);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Ensure all keys exist
      if (parsed.excel && parsed.sql && parsed.python) {
        return parsed;
      }
      return { ...defaultSessionsState, ...parsed };
    }
  } catch (e) {
    console.error('Error reading sessions from localStorage:', e);
  }

  try {
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(defaultSessionsState));
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
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(all));
  } catch (e) {
    console.error('Error saving session to localStorage:', e);
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
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(all));
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
    const raw = localStorage.getItem(STORAGE_KEYS.ACTIVE_PROFILE);
    if (raw) return JSON.parse(raw);
  } catch (e) {}

  try {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_PROFILE, JSON.stringify(studentProfile));
  } catch (e) {}
  return studentProfile;
}

export function saveStudentProfile(updatedProfile) {
  const merged = { ...getStoredStudentProfile(), ...updatedProfile };
  try {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_PROFILE, JSON.stringify(merged));
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
    const raw = localStorage.getItem(STORAGE_KEYS.ASSIGNMENTS);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  try {
    localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(initialAdminAssignments));
  } catch (e) {}
  return initialAdminAssignments;
}

export function updateAdminAssignment(id, updateFields) {
  const list = getStoredAssignmentsList();
  const updated = list.map(a => a.id === id ? { ...a, ...updateFields } : a);
  try {
    localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(updated));
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
    localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(updated));
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
    const raw = localStorage.getItem(STORAGE_KEYS.RESUMES);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  try {
    localStorage.setItem(STORAGE_KEYS.RESUMES, JSON.stringify(initialResumesList));
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
    localStorage.setItem(STORAGE_KEYS.RESUMES, JSON.stringify(updated));
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
    localStorage.setItem(STORAGE_KEYS.RESUMES, JSON.stringify(updated));
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
    committedFee: "65000",
    batch: "BATCH 202606",
    course: "APIDS",
    balance: "0",
    amount: "35000",
    modeOfPay: "UPI / Bank Transfer",
    remarks: "Second installment paid in full. Account cleared.",
    referenceDoc: "Receipt_INV_88392.pdf"
  },
  {
    id: 2,
    date: "2026-09-25",
    studentId: "9955774103",
    studentName: "PRIYANKA MISHRA",
    committedFee: "65000",
    batch: "BATCH 202606",
    course: "APIDS",
    balance: "20000",
    amount: "25000",
    modeOfPay: "Net Banking",
    remarks: "First installment. Due date for remaining: 15 Oct 2026.",
    referenceDoc: "Bank_Transfer_Slip.pdf"
  }
];

export function getStoredFees() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FEES);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  try {
    localStorage.setItem(STORAGE_KEYS.FEES, JSON.stringify(initialFeesList));
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
    localStorage.setItem(STORAGE_KEYS.FEES, JSON.stringify(updated));
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
    rollNo: "DVA-202606-448",
    name: "SK ABDUL SAJID",
    email: "sajid.student@dvanalytics.com",
    phone: "9955774102",
    course: "APIDS",
    batch: "BATCH 202606",
    regDate: "2026-06-05",
    totalFee: "65000",
    paidFee: "65000",
    dueFee: "0",
    status: "Active",
    gender: "Male",
    college: "Biju Patnaik University of Technology",
    location: "Bhubaneswar / Kolkata"
  },
  {
    id: 2,
    rollNo: "DVA-202606-449",
    name: "PRIYANKA MISHRA",
    email: "priyanka.m@dvanalytics.com",
    phone: "9812345678",
    course: "APIDS",
    batch: "BATCH 202606",
    regDate: "2026-06-05",
    totalFee: "65000",
    paidFee: "45000",
    dueFee: "20000",
    status: "Active",
    gender: "Female",
    college: "KIIT University",
    location: "Bhubaneswar"
  }
];

export function getStoredStudents() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STUDENTS);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  try {
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(initialRegisteredStudents));
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
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(updated));
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
