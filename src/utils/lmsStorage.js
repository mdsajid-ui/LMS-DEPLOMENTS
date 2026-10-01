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
    uploadedDate: "2026-09-18"
  },
  {
    id: 2,
    studentId: "9812345678",
    studentName: "PRIYANKA MISHRA",
    course: "APIDS",
    batch: "BATCH 202606",
    pdfLink: "https://edu.dvanalyticsmds.com/resumes/Priyanka_Mishra_APIDS.pdf",
    wordLink: "https://edu.dvanalyticsmds.com/resumes/Priyanka_Mishra_APIDS.docx",
    uploadedDate: "2026-09-22"
  },
  {
    id: 3,
    studentId: "9439281720",
    studentName: "SOUVIK SWAIN",
    course: "APIDA",
    batch: "Batch 202209",
    pdfLink: "https://edu.dvanalyticsmds.com/resumes/Souvik_Swain_APIDA.pdf",
    wordLink: "https://edu.dvanalyticsmds.com/resumes/Souvik_Swain_APIDA.docx",
    uploadedDate: "2026-09-28"
  }
];

export function getStoredResumes() {
  try {
    const raw = localStorage.getItem('dva_lms_resumes_v1');
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  try {
    localStorage.setItem('dva_lms_resumes_v1', JSON.stringify(initialResumesList));
  } catch (e) {}
  return initialResumesList;
}

export function saveAdminResume(resumeData) {
  const list = getStoredResumes();
  const created = {
    id: Date.now(),
    uploadedDate: new Date().toISOString().split('T')[0],
    ...resumeData
  };
  const updated = [created, ...list];
  try {
    localStorage.setItem('dva_lms_resumes_v1', JSON.stringify(updated));
  } catch (e) {}
  window.dispatchEvent(new CustomEvent('dva_data_updated', { detail: { type: 'resumes' } }));
  return updated;
}

export function deleteAdminResume(id) {
  const list = getStoredResumes();
  const updated = list.filter(r => r.id !== id);
  try {
    localStorage.setItem('dva_lms_resumes_v1', JSON.stringify(updated));
  } catch (e) {}
  window.dispatchEvent(new CustomEvent('dva_data_updated', { detail: { type: 'resumes' } }));
  return updated;
}

// ==========================================
// ASSIGNMENT APPROVAL PERSISTENCE (AssignmentApproval.aspx)
// ==========================================
const initialAdminAssignments = [
  {
    id: 101,
    studentName: "SK ABDUL SAJID",
    rollNo: "DVA-202606-448",
    batch: "Batch 202209",
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
    batch: "Batch 202209",
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
    studentName: "SOUVIK SWAIN",
    rollNo: "DVA-202209-312",
    batch: "Batch 202209",
    application: "SQL SERVER",
    title: "Window Functions & CTE Analytics",
    submittedFile: "Souvik_SQL_ComplexQueries.sql",
    submittedDate: "30-09-2026",
    status: "Pending",
    grade: "",
    remarks: ""
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
    const raw = localStorage.getItem('dva_lms_admin_assignments_v1');
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  try {
    localStorage.setItem('dva_lms_admin_assignments_v1', JSON.stringify(initialAdminAssignments));
  } catch (e) {}
  return initialAdminAssignments;
}

export function updateAdminAssignment(id, updateFields) {
  const list = getStoredAssignmentsList();
  const updated = list.map(a => a.id === id ? { ...a, ...updateFields } : a);
  try {
    localStorage.setItem('dva_lms_admin_assignments_v1', JSON.stringify(updated));
  } catch (e) {}
  window.dispatchEvent(new CustomEvent('dva_data_updated', { detail: { type: 'assignments' } }));
  return updated;
}
