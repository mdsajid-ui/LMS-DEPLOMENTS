import { excelSessions, sqlSessions, pythonSessions, assignmentsList, studentProfile } from '../data/mockData';

const STORAGE_KEYS = {
  SESSIONS: 'dva_lms_sessions_v1',
  ASSIGNMENTS: 'dva_lms_assignments_v1',
  FEES: 'dva_lms_fees_v1',
  STUDENTS: 'dva_lms_students_v1'
};

// Default initial state
const defaultSessionsState = {
  excel: excelSessions,
  sql: sqlSessions,
  python: pythonSessions
};

// Helper to get all sessions from localStorage or default
export function getAllStoredSessions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SESSIONS);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Error reading sessions from localStorage:', e);
  }
  // Initialize default
  try {
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(defaultSessionsState));
  } catch (e) {}
  return defaultSessionsState;
}

// Get sessions for a specific subject
export function getSubjectStoredSessions(subjectName) {
  const all = getAllStoredSessions();
  const lower = (subjectName || '').toLowerCase();
  if (lower.includes('sql')) return all.sql || sqlSessions;
  if (lower.includes('python')) return all.python || pythonSessions;
  return all.excel || excelSessions;
}

// Save a newly uploaded session item from Admin Portal (Session.aspx)
export function saveAdminSession({
  date,
  mentor,
  batch,
  application,
  sessionTitle,
  sortOrder,
  topicType,
  uploadedLink,
  description
}) {
  const all = getAllStoredSessions();
  const lower = (application || '').toLowerCase();
  let key = 'excel';
  if (lower.includes('sql')) key = 'sql';
  else if (lower.includes('python')) key = 'python';

  const subjectSessions = [...(all[key] || [])];

  // Check if session folder already exists (e.g. B1.SESSION-1)
  const normTitle = (sessionTitle || '').trim().toUpperCase();
  let folderIndex = subjectSessions.findIndex(s => 
    (s.title && s.title.trim().toUpperCase() === normTitle) || 
    (s.id && s.id.toLowerCase() === normTitle.toLowerCase().replace(/[^a-z0-9]/g, '-'))
  );

  const newItem = {
    id: `item-${Date.now()}`,
    title: description || `${normTitle} ${topicType}`,
    type: topicType === 'CLASS VIDEOS' ? 'video' : 'file',
    duration: topicType === 'CLASS VIDEOS' ? 'HD Video Stream' : 'File Download',
    embedUrl: uploadedLink,
    fileName: description || `${normTitle}_${topicType}.zip`
  };

  if (folderIndex >= 0) {
    // Update existing folder
    const targetFolder = { ...subjectSessions[folderIndex] };
    const items = [...(targetFolder.items || [])];

    if (topicType === 'CLASS VIDEOS') {
      targetFolder.vdocipherEmbedUrl = uploadedLink;
      targetFolder.videoUrl = uploadedLink;
      targetFolder.videoFileName = description || `${normTitle}.mp4`;
      targetFolder.recordingDate = date;
      targetFolder.instructor = mentor;
      // Add or replace video in items
      const vIdx = items.findIndex(it => it.type === 'video');
      if (vIdx >= 0) {
        items[vIdx] = { ...items[vIdx], title: description || `${normTitle} Video`, embedUrl: uploadedLink };
      } else {
        items.unshift(newItem);
      }
    } else if (topicType === 'MATERIALS') {
      targetFolder.materialFileName = description || `${normTitle}_Materials.zip`;
      targetFolder.driveFolderUrl = uploadedLink;
      items.push(newItem);
    } else if (topicType === 'ASSIGNMENTS') {
      targetFolder.assignmentFileName = description || `${normTitle}_Assignments.xlsx`;
      items.push(newItem);
    }

    targetFolder.items = items;
    subjectSessions[folderIndex] = targetFolder;
  } else {
    // Create new folder
    const newFolder = {
      id: normTitle.toLowerCase().replace(/[^a-z0-9]/g, '-') || `session-${Date.now()}`,
      title: normTitle,
      fullTitle: `${normTitle}: ${description || application}`,
      isFolder: true,
      hasActionButtons: true,
      driveFolderUrl: uploadedLink,
      vdocipherEmbedUrl: topicType === 'CLASS VIDEOS' ? uploadedLink : undefined,
      videoUrl: topicType === 'CLASS VIDEOS' ? uploadedLink : undefined,
      videoFileName: topicType === 'CLASS VIDEOS' ? (description || `${normTitle}.mp4`) : undefined,
      materialFileName: topicType === 'MATERIALS' ? (description || `${normTitle}_Materials.zip`) : undefined,
      assignmentFileName: topicType === 'ASSIGNMENTS' ? (description || `${normTitle}_Assignments.xlsx`) : undefined,
      duration: "2h 00m",
      recordingDate: date,
      instructor: mentor,
      items: [newItem]
    };
    subjectSessions.push(newFolder);
  }

  all[key] = subjectSessions;
  try {
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(all));
  } catch (e) {
    console.error('Error saving session to localStorage:', e);
  }

  // Dispatch custom event for same-window instant update
  window.dispatchEvent(new CustomEvent('dva_data_updated', { detail: { type: 'sessions', key } }));
  return all[key];
}

// Delete a session folder or item
export function deleteAdminSession(sessionId, subjectName) {
  const all = getAllStoredSessions();
  const lower = (subjectName || '').toLowerCase();
  let key = 'excel';
  if (lower.includes('sql')) key = 'sql';
  else if (lower.includes('python')) key = 'python';

  all[key] = (all[key] || []).filter(s => s.id !== sessionId);
  try {
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(all));
  } catch (e) {}

  window.dispatchEvent(new CustomEvent('dva_data_updated', { detail: { type: 'sessions', key } }));
  return all[key];
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
    ...feeData
  };
  const updated = [newFee, ...fees];
  try {
    localStorage.setItem(STORAGE_KEYS.FEES, JSON.stringify(updated));
  } catch (e) {}
  window.dispatchEvent(new CustomEvent('dva_data_updated', { detail: { type: 'fees' } }));
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
    rollNo: `DVA-${studentData.batch.replace(/[^0-9]/g, '')}-${Math.floor(Math.random() * 400 + 460)}`,
    ...studentData
  };
  const updated = [created, ...students];
  try {
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(updated));
  } catch (e) {}
  window.dispatchEvent(new CustomEvent('dva_data_updated', { detail: { type: 'students' } }));
  return updated;
}
