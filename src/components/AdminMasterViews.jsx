import React, { useState, useMemo } from 'react';
import { 
  initialUsersMaster, 
  initialBranchesMaster, 
  initialSkillsMaster, 
  initialApplicationsMaster, 
  initialCoursesMaster,
  initialBatchesMaster,
  initialMentorsMaster,
  initialSelfPaceMaster,
  initialPaymentApprovals,
  initialRegistrationLinks
} from '../data/adminMasterData';
import { 
  ArrowUpDown, 
  X, 
  Plus, 
  Edit2, 
  Lock, 
  CheckCircle2, 
  Eye, 
  Check, 
  Trash2, 
  Send,
  Calendar,
  Mail,
  Phone,
  UploadCloud,
  FileText,
  ExternalLink,
  Search,
  Shuffle,
  Download,
  Video,
  Play
} from 'lucide-react';
import { 
  getStoredStudents, 
  saveAdminStudent, 
  getStoredFees, 
  saveAdminFee,
  getAllStoredSessions,
  saveAdminSession,
  deleteAdminSession,
  getStoredResumes,
  saveAdminResume,
  deleteAdminResume,
  getStoredAssignmentsList,
  updateAdminAssignment
} from '../utils/lmsStorage';

export const masterApplicationDropdownList = [
  "All",
  "EXCEL BASE AND ADVANCED",
  "EXCEL VBA",
  "SQL SERVER",
  "SAS BASE AND ADVANCED",
  "PYTHON PROGRAMMING",
  "R PROGRAMMING",
  "BIG DATA & DATA ENGINEERING MODULES",
  "ALTERYX",
  "TABLEAU",
  "POWER BI",
  "ADVANCED ANALYTICS IN EXCEL",
  "ADVANCED ANALYTICS IN PYTHON",
  "ADVANCED ANALYTICS IN SAS",
  "MACHINE LEARNING AND AI",
  "MACHINE LEARNING IN PYTHON",
  "DEEP LEARNING AND AI IN PYTHON, KERAS AND TENSORFLOW",
  "AWS CLOUD COMPUTING"
];

// Common Table Top Controls
function TableControls({ pageSize, setPageSize, search, setSearch, onPageReset }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-700 py-1">
      <div className="flex items-center gap-1.5">
        <span>Show</span>
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            onPageReset();
          }}
          className="border border-slate-300 rounded px-2 py-1 text-xs bg-white focus:outline-none focus:border-teal-500 shadow-2xs"
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <span>entries</span>
      </div>

      <div className="flex items-center gap-1.5">
        <span className="font-semibold text-slate-700">Search:</span>
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            onPageReset();
          }}
          className="border border-slate-300 rounded px-2.5 py-1 text-xs focus:outline-none focus:border-teal-500 bg-white min-w-[180px] shadow-2xs"
        />
      </div>
    </div>
  );
}

// Common Table Pagination Controls
function TablePagination({ currentPage, totalPages, totalEntries, pageSize, setPage }) {
  const start = totalEntries === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalEntries);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600 pt-2 select-none">
      <div>
        Showing {start} to {end} of {totalEntries} entries
      </div>

      <div className="flex items-center border border-slate-300 rounded overflow-hidden divide-x divide-slate-300 shadow-2xs">
        <button
          disabled={currentPage === 1}
          onClick={() => setPage(p => Math.max(1, p - 1))}
          className="px-3 py-1 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-slate-700 font-medium"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`px-3 py-1 font-semibold transition-colors ${
              currentPage === p 
                ? 'bg-[#337ab7] text-white' 
                : 'bg-white hover:bg-slate-100 text-slate-700'
            }`}
          >
            {p}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          className="px-3 py-1 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-slate-700 font-medium"
        >
          Next
        </button>
      </div>
    </div>
  );
}

// =========================================================================
// 1. USER MASTER VIEW (Matching Screenshot 1: edu.dvanalyticsmds.com/admin/usermaster.aspx)
// =========================================================================
export function UserMasterView({ showToast }) {
  const [users, setUsers] = useState(initialUsersMaster);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("id");
  const [sortAsc, setSortAsc] = useState(true);

  // Modals
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalItem, setEditModalItem] = useState(null);
  const [passwordModalUser, setPasswordModalUser] = useState(null);

  // Form states
  const [newUser, setNewUser] = useState({
    name: "",
    userLevel: "Mentor",
    username: "",
    password: "",
    status: "Active"
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const filteredUsers = useMemo(() => {
    let result = users.filter(u => 
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.userLevel.toLowerCase().includes(search.toLowerCase()) ||
      u.username.toLowerCase().includes(search.toLowerCase())
    );

    result.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();
      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });

    return result;
  }, [users, search, sortField, sortAsc]);

  const totalPages = Math.ceil(filteredUsers.length / pageSize) || 1;
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleToggleStatus = (userId) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const nextStatus = u.status === 'Active' ? 'Inactive' : 'Active';
        showToast(`User ${u.name} is now ${nextStatus}`);
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.username) {
      alert("Please fill in Name and User Name");
      return;
    }
    const created = {
      id: Date.now(),
      name: newUser.name.toUpperCase(),
      userLevel: newUser.userLevel,
      username: newUser.username.toLowerCase(),
      status: newUser.status
    };
    setUsers([created, ...users]);
    setCreateModalOpen(false);
    showToast(`User ${created.name} created successfully!`);
    setNewUser({ name: "", userLevel: "Mentor", username: "", password: "", status: "Active" });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setUsers(prev => prev.map(u => u.id === editModalItem.id ? editModalItem : u));
    showToast(`User ${editModalItem.name} updated successfully!`);
    setEditModalItem(null);
  };

  return (
    <div className="space-y-4">
      {/* Create User Button */}
      <div>
        <button
          onClick={() => setCreateModalOpen(true)}
          className="bg-[#26B99A] hover:bg-[#1f967d] text-white text-xs font-semibold px-3 py-1.5 rounded-[3px] shadow-2xs cursor-pointer inline-flex items-center gap-1 transition-colors"
        >
          Create User
        </button>
      </div>

      {/* Table Controls (Show X entries & Search) */}
      <TableControls
        pageSize={pageSize}
        setPageSize={setPageSize}
        search={search}
        setSearch={setSearch}
        onPageReset={() => setCurrentPage(1)}
      />

      {/* Table */}
      <div className="overflow-x-auto border border-slate-200 bg-white">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-300 bg-white">
              <th 
                onClick={() => handleSort('id')}
                className="border border-slate-200 px-3 py-2.5 font-bold text-slate-800 text-center select-none cursor-pointer w-16"
              >
                <div className="flex items-center justify-center gap-1">
                  <span>S.No</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
              <th 
                onClick={() => handleSort('name')}
                className="border border-slate-200 px-4 py-2.5 font-bold text-slate-800 text-center select-none cursor-pointer"
              >
                <div className="flex items-center justify-center gap-1">
                  <span>Name</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
              <th 
                onClick={() => handleSort('userLevel')}
                className="border border-slate-200 px-4 py-2.5 font-bold text-slate-800 text-center select-none cursor-pointer"
              >
                <div className="flex items-center justify-center gap-1">
                  <span>User Level</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
              <th 
                onClick={() => handleSort('username')}
                className="border border-slate-200 px-4 py-2.5 font-bold text-slate-800 text-center select-none cursor-pointer"
              >
                <div className="flex items-center justify-center gap-1">
                  <span>User Name</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
              <th className="border border-slate-200 px-4 py-2.5 font-bold text-slate-800 text-center select-none w-64">
                <div className="flex items-center justify-center gap-1">
                  <span>Action</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-slate-500">No matching records found</td>
              </tr>
            ) : (
              paginatedUsers.map((user, idx) => (
                <tr key={user.id} className="hover:bg-slate-50 border-b border-slate-200 transition-colors">
                  <td className="border border-slate-200 px-3 py-2 text-center text-slate-700">
                    {(currentPage - 1) * pageSize + idx + 1}
                  </td>
                  <td className="border border-slate-200 px-4 py-2 text-center text-slate-800 font-medium">
                    {user.name}
                  </td>
                  <td className="border border-slate-200 px-4 py-2 text-center text-slate-700">
                    {user.userLevel}
                  </td>
                  <td className="border border-slate-200 px-4 py-2 text-center text-slate-700">
                    {user.username}
                  </td>
                  <td className="border border-slate-200 px-3 py-2 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => setEditModalItem({ ...user })}
                        className="bg-[#f0ad4e] hover:bg-[#ec971f] text-white px-2.5 py-0.5 rounded-[3px] border border-[#eea236] text-[11px] font-medium cursor-pointer shadow-2xs"
                      >
                        Edit
                      </button>
                      {user.status === 'Active' ? (
                        <button
                          onClick={() => handleToggleStatus(user.id)}
                          className="bg-[#26b99a] hover:bg-[#209e83] text-white px-2.5 py-0.5 rounded-[3px] border border-[#209e83] text-[11px] font-medium cursor-pointer shadow-2xs"
                        >
                          Make Inactive
                        </button>
                      ) : (
                        <button
                          onClick={() => handleToggleStatus(user.id)}
                          className="bg-[#d9534f] hover:bg-[#c9302c] text-white px-2.5 py-0.5 rounded-[3px] border border-[#d43f3a] text-[11px] font-medium cursor-pointer shadow-2xs"
                        >
                          Make Active
                        </button>
                      )}
                      <button
                        onClick={() => setPasswordModalUser(user)}
                        className="bg-[#337ab7] hover:bg-[#286090] text-white px-2.5 py-0.5 rounded-[3px] border border-[#2e6da4] text-[11px] font-medium cursor-pointer shadow-2xs"
                      >
                        Change Password
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalEntries={filteredUsers.length}
        pageSize={pageSize}
        setPage={setCurrentPage}
      />

      {/* CREATE USER MODAL */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 space-y-4 text-xs font-sans">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-bold text-sm text-slate-800">Create New User</h3>
              <button onClick={() => setCreateModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreateSubmit} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. DEBENDRA DEBADATA DAS"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-1.5 focus:outline-none focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">User Level *</label>
                <select
                  value={newUser.userLevel}
                  onChange={(e) => setNewUser({ ...newUser, userLevel: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-1.5 focus:outline-none focus:border-teal-500 bg-white"
                >
                  <option value="Super Admin">Super Admin</option>
                  <option value="Admin">Admin</option>
                  <option value="Mentor">Mentor</option>
                  <option value="L&D">L&D</option>
                  <option value="Payroll Admin">Payroll Admin</option>
                  <option value="Accounts">Accounts</option>
                  <option value="Telecaller">Telecaller</option>
                  <option value="Placement Officer">Placement Officer</option>
                  <option value="HR Admin">HR Admin</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">User Name (Login ID) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. debendra or email"
                  value={newUser.username}
                  onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-1.5 focus:outline-none focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Default Password *</label>
                <input
                  type="password"
                  required
                  defaultValue="@2288"
                  className="w-full border border-slate-300 rounded px-3 py-1.5 focus:outline-none focus:border-teal-500"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-3 py-1.5 border border-slate-300 rounded hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#26B99A] text-white rounded font-bold hover:bg-[#1f967d]"
                >
                  Save User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT USER MODAL */}
      {editModalItem && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 space-y-4 text-xs font-sans">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-bold text-sm text-slate-800">Edit User ({editModalItem.name})</h3>
              <button onClick={() => setEditModalItem(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={editModalItem.name}
                  onChange={(e) => setEditModalItem({ ...editModalItem, name: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-1.5 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">User Level</label>
                <select
                  value={editModalItem.userLevel}
                  onChange={(e) => setEditModalItem({ ...editModalItem, userLevel: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-1.5 focus:outline-none bg-white"
                >
                  <option value="Super Admin">Super Admin</option>
                  <option value="Admin">Admin</option>
                  <option value="Mentor">Mentor</option>
                  <option value="L&D">L&D</option>
                  <option value="Payroll Admin">Payroll Admin</option>
                  <option value="Accounts">Accounts</option>
                  <option value="Telecaller">Telecaller</option>
                  <option value="Placement Officer">Placement Officer</option>
                  <option value="HR Admin">HR Admin</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">User Name</label>
                <input
                  type="text"
                  required
                  value={editModalItem.username}
                  onChange={(e) => setEditModalItem({ ...editModalItem, username: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-1.5 focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setEditModalItem(null)}
                  className="px-3 py-1.5 border border-slate-300 rounded hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#f0ad4e] text-white rounded font-bold hover:bg-[#ec971f]"
                >
                  Update User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CHANGE PASSWORD MODAL */}
      {passwordModalUser && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 space-y-4 text-xs font-sans">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-bold text-sm text-slate-800">Change Password</h3>
              <button onClick={() => setPasswordModalUser(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-slate-600">
              Update password for <span className="font-bold text-slate-800">{passwordModalUser.name}</span> ({passwordModalUser.username})
            </p>
            <div className="space-y-2">
              <input
                type="password"
                placeholder="Enter new password"
                defaultValue="@2288"
                className="w-full border border-slate-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-500"
              />
              <input
                type="password"
                placeholder="Confirm new password"
                defaultValue="@2288"
                className="w-full border border-slate-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                type="button"
                onClick={() => setPasswordModalUser(null)}
                className="px-3 py-1.5 border border-slate-300 rounded hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  showToast(`Password successfully updated for ${passwordModalUser.name}!`);
                  setPasswordModalUser(null);
                }}
                className="px-4 py-1.5 bg-[#337ab7] text-white rounded font-bold hover:bg-[#286090]"
              >
                Save Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// =========================================================================
// 2. BRANCH MASTER VIEW (Matching Screenshot 2: edu.dvanalyticsmds.com/admin/BranchMaster.aspx)
// =========================================================================
export function BranchMasterView({ showToast }) {
  const [branches, setBranches] = useState(initialBranchesMaster);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalItem, setEditModalItem] = useState(null);

  const [newBranch, setNewBranch] = useState({
    branch: "",
    managerName: "",
    email: "",
    contactNo: "",
    address: "",
    gstNumber: ""
  });

  const filteredBranches = useMemo(() => {
    return branches.filter(b => 
      b.branch.toLowerCase().includes(search.toLowerCase()) ||
      b.managerName.toLowerCase().includes(search.toLowerCase()) ||
      b.email.toLowerCase().includes(search.toLowerCase()) ||
      b.contactNo.includes(search) ||
      b.address.toLowerCase().includes(search.toLowerCase()) ||
      b.gstNumber.toLowerCase().includes(search.toLowerCase())
    );
  }, [branches, search]);

  const totalPages = Math.ceil(filteredBranches.length / pageSize) || 1;
  const paginatedBranches = filteredBranches.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!newBranch.branch || !newBranch.managerName) {
      alert("Please fill in Branch and Manager Name");
      return;
    }
    const created = {
      id: Date.now(),
      branch: newBranch.branch.toUpperCase(),
      managerName: newBranch.managerName.toUpperCase(),
      email: newBranch.email,
      contactNo: newBranch.contactNo,
      address: newBranch.address,
      gstNumber: newBranch.gstNumber || "-"
    };
    setBranches([...branches, created]);
    setCreateModalOpen(false);
    showToast(`Branch ${created.branch} created successfully!`);
    setNewBranch({ branch: "", managerName: "", email: "", contactNo: "", address: "", gstNumber: "" });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setBranches(prev => prev.map(b => b.id === editModalItem.id ? editModalItem : b));
    showToast(`Branch ${editModalItem.branch} updated successfully!`);
    setEditModalItem(null);
  };

  return (
    <div className="space-y-4">
      {/* Create Branch Button */}
      <div>
        <button
          onClick={() => setCreateModalOpen(true)}
          className="bg-[#26B99A] hover:bg-[#1f967d] text-white text-xs font-semibold px-3 py-1.5 rounded-[3px] shadow-2xs cursor-pointer inline-flex items-center gap-1 transition-colors"
        >
          Create Branch
        </button>
      </div>

      {/* Table Controls */}
      <TableControls
        pageSize={pageSize}
        setPageSize={setPageSize}
        search={search}
        setSearch={setSearch}
        onPageReset={() => setCurrentPage(1)}
      />

      {/* Table */}
      <div className="overflow-x-auto border border-slate-200 bg-white">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-300 bg-white">
              <th className="border border-slate-200 px-3 py-2.5 font-bold text-slate-800 text-center select-none w-14">
                <div className="flex items-center justify-center gap-1">
                  <span>S.No</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
              <th className="border border-slate-200 px-4 py-2.5 font-bold text-slate-800 text-center select-none">
                <div className="flex items-center justify-center gap-1">
                  <span>Branch</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
              <th className="border border-slate-200 px-4 py-2.5 font-bold text-slate-800 text-center select-none">
                <div className="flex items-center justify-center gap-1">
                  <span>Manager Name</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
              <th className="border border-slate-200 px-4 py-2.5 font-bold text-slate-800 text-center select-none">
                <div className="flex items-center justify-center gap-1">
                  <span>Email ID</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
              <th className="border border-slate-200 px-4 py-2.5 font-bold text-slate-800 text-center select-none">
                <div className="flex items-center justify-center gap-1">
                  <span>Contactno</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
              <th className="border border-slate-200 px-4 py-2.5 font-bold text-slate-800 text-center select-none min-w-[280px]">
                <div className="flex items-center justify-center gap-1">
                  <span>Address</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
              <th className="border border-slate-200 px-4 py-2.5 font-bold text-slate-800 text-center select-none">
                <div className="flex items-center justify-center gap-1">
                  <span>Gst Number</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
              <th className="border border-slate-200 px-4 py-2.5 font-bold text-slate-800 text-center select-none w-20">
                <div className="flex items-center justify-center gap-1">
                  <span>Action</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedBranches.map((b, idx) => (
              <tr key={b.id} className="hover:bg-slate-50 border-b border-slate-200 transition-colors">
                <td className="border border-slate-200 px-3 py-2 text-center text-slate-700">
                  {(currentPage - 1) * pageSize + idx + 1}
                </td>
                <td className="border border-slate-200 px-4 py-2 text-center text-slate-800 font-semibold">
                  {b.branch}
                </td>
                <td className="border border-slate-200 px-4 py-2 text-center text-slate-700">
                  {b.managerName}
                </td>
                <td className="border border-slate-200 px-4 py-2 text-center text-slate-700">
                  {b.email}
                </td>
                <td className="border border-slate-200 px-4 py-2 text-center text-slate-700">
                  {b.contactNo}
                </td>
                <td className="border border-slate-200 px-4 py-2 text-left text-slate-700 leading-snug">
                  {b.address}
                </td>
                <td className="border border-slate-200 px-4 py-2 text-center text-slate-700">
                  {b.gstNumber}
                </td>
                <td className="border border-slate-200 px-3 py-2 text-center whitespace-nowrap">
                  <button
                    onClick={() => setEditModalItem({ ...b })}
                    className="bg-[#d9534f] hover:bg-[#c9302c] text-white px-3 py-0.5 rounded-[3px] border border-[#d43f3a] text-[11px] font-medium cursor-pointer shadow-2xs"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalEntries={filteredBranches.length}
        pageSize={pageSize}
        setPage={setCurrentPage}
      />

      {/* CREATE MODAL */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 space-y-4 text-xs font-sans">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-bold text-sm text-slate-800">Create New Branch</h3>
              <button onClick={() => setCreateModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreateSubmit} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Branch Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. HYDERABAD"
                  value={newBranch.branch}
                  onChange={(e) => setNewBranch({ ...newBranch, branch: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-1.5 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Manager Name *</label>
                <input
                  type="text"
                  required
                  value={newBranch.managerName}
                  onChange={(e) => setNewBranch({ ...newBranch, managerName: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-1.5 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Email ID</label>
                <input
                  type="email"
                  value={newBranch.email}
                  onChange={(e) => setNewBranch({ ...newBranch, email: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-1.5 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Contact Number</label>
                <input
                  type="text"
                  value={newBranch.contactNo}
                  onChange={(e) => setNewBranch({ ...newBranch, contactNo: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-1.5 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Address</label>
                <textarea
                  rows={2}
                  value={newBranch.address}
                  onChange={(e) => setNewBranch({ ...newBranch, address: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-1.5 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">GST Number</label>
                <input
                  type="text"
                  value={newBranch.gstNumber}
                  onChange={(e) => setNewBranch({ ...newBranch, gstNumber: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-1.5 focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-3 py-1.5 border border-slate-300 rounded hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#26B99A] text-white rounded font-bold hover:bg-[#1f967d]"
                >
                  Save Branch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editModalItem && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 space-y-4 text-xs font-sans">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-bold text-sm text-slate-800">Edit Branch ({editModalItem.branch})</h3>
              <button onClick={() => setEditModalItem(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Branch Name</label>
                <input
                  type="text"
                  required
                  value={editModalItem.branch}
                  onChange={(e) => setEditModalItem({ ...editModalItem, branch: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-1.5 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Manager Name</label>
                <input
                  type="text"
                  required
                  value={editModalItem.managerName}
                  onChange={(e) => setEditModalItem({ ...editModalItem, managerName: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-1.5 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Email ID</label>
                <input
                  type="email"
                  value={editModalItem.email}
                  onChange={(e) => setEditModalItem({ ...editModalItem, email: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-1.5 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Contact Number</label>
                <input
                  type="text"
                  value={editModalItem.contactNo}
                  onChange={(e) => setEditModalItem({ ...editModalItem, contactNo: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-1.5 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Address</label>
                <textarea
                  rows={2}
                  value={editModalItem.address}
                  onChange={(e) => setEditModalItem({ ...editModalItem, address: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-1.5 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">GST Number</label>
                <input
                  type="text"
                  value={editModalItem.gstNumber}
                  onChange={(e) => setEditModalItem({ ...editModalItem, gstNumber: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-1.5 focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setEditModalItem(null)}
                  className="px-3 py-1.5 border border-slate-300 rounded hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#d9534f] text-white rounded font-bold hover:bg-[#c9302c]"
                >
                  Update Branch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// =========================================================================
// 3. SKILL MASTER VIEW (Matching Screenshot 3: edu.dvanalyticsmds.com/admin/skillMaster.aspx)
// =========================================================================
export function SkillMasterView({ showToast }) {
  const [skills, setSkills] = useState(initialSkillsMaster);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalItem, setEditModalItem] = useState(null);
  const [newSkillName, setNewSkillName] = useState("");

  const filteredSkills = useMemo(() => {
    return skills.filter(s => s.skill.toLowerCase().includes(search.toLowerCase()));
  }, [skills, search]);

  const totalPages = Math.ceil(filteredSkills.length / pageSize) || 1;
  const paginatedSkills = filteredSkills.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    const created = {
      id: Date.now(),
      skill: newSkillName.trim().toUpperCase()
    };
    setSkills([...skills, created]);
    setCreateModalOpen(false);
    setNewSkillName("");
    showToast(`Skill ${created.skill} created successfully!`);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setSkills(prev => prev.map(s => s.id === editModalItem.id ? editModalItem : s));
    showToast(`Skill updated successfully!`);
    setEditModalItem(null);
  };

  return (
    <div className="space-y-4">
      <div>
        <button
          onClick={() => setCreateModalOpen(true)}
          className="bg-[#26B99A] hover:bg-[#1f967d] text-white text-xs font-semibold px-3 py-1.5 rounded-[3px] shadow-2xs cursor-pointer inline-flex items-center gap-1 transition-colors"
        >
          Create Skill
        </button>
      </div>

      <TableControls
        pageSize={pageSize}
        setPageSize={setPageSize}
        search={search}
        setSearch={setSearch}
        onPageReset={() => setCurrentPage(1)}
      />

      <div className="overflow-x-auto border border-slate-200 bg-white">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-300 bg-white">
              <th className="border border-slate-200 px-3 py-2.5 font-bold text-slate-800 text-center select-none w-16">
                <div className="flex items-center justify-center gap-1">
                  <span>S.No</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
              <th className="border border-slate-200 px-4 py-2.5 font-bold text-slate-800 text-center select-none">
                <div className="flex items-center justify-center gap-1">
                  <span>Skill</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
              <th className="border border-slate-200 px-4 py-2.5 font-bold text-slate-800 text-center select-none w-24">
                <div className="flex items-center justify-center gap-1">
                  <span>Action</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedSkills.map((s, idx) => (
              <tr key={s.id} className="hover:bg-slate-50 border-b border-slate-200 transition-colors">
                <td className="border border-slate-200 px-3 py-2 text-center text-slate-700">
                  {(currentPage - 1) * pageSize + idx + 1}
                </td>
                <td className="border border-slate-200 px-4 py-2 text-center text-slate-800 font-medium">
                  {s.skill}
                </td>
                <td className="border border-slate-200 px-3 py-2 text-center whitespace-nowrap">
                  <button
                    onClick={() => setEditModalItem({ ...s })}
                    className="bg-[#d9534f] hover:bg-[#c9302c] text-white px-3 py-0.5 rounded-[3px] border border-[#d43f3a] text-[11px] font-medium cursor-pointer shadow-2xs"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalEntries={filteredSkills.length}
        pageSize={pageSize}
        setPage={setCurrentPage}
      />

      {/* CREATE MODAL */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 space-y-4 text-xs font-sans">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-bold text-sm text-slate-800">Create New Skill</h3>
              <button onClick={() => setCreateModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreateSubmit} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Skill Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. GENERATIVE AI & LLMS"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  className="w-full border border-slate-300 rounded px-3 py-1.5 focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-3 py-1.5 border border-slate-300 rounded hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#26B99A] text-white rounded font-bold hover:bg-[#1f967d]"
                >
                  Save Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editModalItem && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 space-y-4 text-xs font-sans">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-bold text-sm text-slate-800">Edit Skill</h3>
              <button onClick={() => setEditModalItem(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Skill Name</label>
                <input
                  type="text"
                  required
                  value={editModalItem.skill}
                  onChange={(e) => setEditModalItem({ ...editModalItem, skill: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-1.5 focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setEditModalItem(null)}
                  className="px-3 py-1.5 border border-slate-300 rounded hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#d9534f] text-white rounded font-bold hover:bg-[#c9302c]"
                >
                  Update Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// =========================================================================
// 4. APPLICATION MASTER VIEW (Matching Screenshot 4: edu.dvanalyticsmds.com/admin/AppMaster.aspx)
// =========================================================================
export function AppMasterView({ showToast }) {
  const [apps, setApps] = useState(initialApplicationsMaster);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalItem, setEditModalItem] = useState(null);

  const [newApp, setNewApp] = useState({
    application: "",
    skill: "DBMS AND PROGRAMMING"
  });

  const filteredApps = useMemo(() => {
    return apps.filter(a => 
      a.application.toLowerCase().includes(search.toLowerCase()) ||
      a.skill.toLowerCase().includes(search.toLowerCase())
    );
  }, [apps, search]);

  const totalPages = Math.ceil(filteredApps.length / pageSize) || 1;
  const paginatedApps = filteredApps.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!newApp.application.trim()) return;
    const created = {
      id: Date.now(),
      application: newApp.application.trim().toUpperCase(),
      skill: newApp.skill
    };
    setApps([...apps, created]);
    setCreateModalOpen(false);
    setNewApp({ application: "", skill: "DBMS AND PROGRAMMING" });
    showToast(`Application ${created.application} created successfully!`);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setApps(prev => prev.map(a => a.id === editModalItem.id ? editModalItem : a));
    showToast(`Application updated successfully!`);
    setEditModalItem(null);
  };

  return (
    <div className="space-y-4">
      <div>
        <button
          onClick={() => setCreateModalOpen(true)}
          className="bg-[#26B99A] hover:bg-[#1f967d] text-white text-xs font-semibold px-3 py-1.5 rounded-[3px] shadow-2xs cursor-pointer inline-flex items-center gap-1 transition-colors"
        >
          Create Application
        </button>
      </div>

      <TableControls
        pageSize={pageSize}
        setPageSize={setPageSize}
        search={search}
        setSearch={setSearch}
        onPageReset={() => setCurrentPage(1)}
      />

      <div className="overflow-x-auto border border-slate-200 bg-white">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-300 bg-white">
              <th className="border border-slate-200 px-3 py-2.5 font-bold text-slate-800 text-center select-none w-16">
                <div className="flex items-center justify-center gap-1">
                  <span>S.No</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
              <th className="border border-slate-200 px-4 py-2.5 font-bold text-slate-800 text-center select-none">
                <div className="flex items-center justify-center gap-1">
                  <span>Application</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
              <th className="border border-slate-200 px-4 py-2.5 font-bold text-slate-800 text-center select-none">
                <div className="flex items-center justify-center gap-1">
                  <span>Skill</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
              <th className="border border-slate-200 px-4 py-2.5 font-bold text-slate-800 text-center select-none w-24">
                <div className="flex items-center justify-center gap-1">
                  <span>Action</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedApps.map((a, idx) => (
              <tr key={a.id} className="hover:bg-slate-50 border-b border-slate-200 transition-colors">
                <td className="border border-slate-200 px-3 py-2 text-center text-slate-700">
                  {(currentPage - 1) * pageSize + idx + 1}
                </td>
                <td className="border border-slate-200 px-4 py-2 text-center text-slate-800 font-medium">
                  {a.application}
                </td>
                <td className="border border-slate-200 px-4 py-2 text-center text-slate-700">
                  {a.skill}
                </td>
                <td className="border border-slate-200 px-3 py-2 text-center whitespace-nowrap">
                  <button
                    onClick={() => setEditModalItem({ ...a })}
                    className="bg-[#d9534f] hover:bg-[#c9302c] text-white px-3 py-0.5 rounded-[3px] border border-[#d43f3a] text-[11px] font-medium cursor-pointer shadow-2xs"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalEntries={filteredApps.length}
        pageSize={pageSize}
        setPage={setCurrentPage}
      />

      {/* CREATE MODAL */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 space-y-4 text-xs font-sans">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-bold text-sm text-slate-800">Create Application</h3>
              <button onClick={() => setCreateModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreateSubmit} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Application Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SNOWFLAKE WAREHOUSE"
                  value={newApp.application}
                  onChange={(e) => setNewApp({ ...newApp, application: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-1.5 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Associated Skill *</label>
                <select
                  value={newApp.skill}
                  onChange={(e) => setNewApp({ ...newApp, skill: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-1.5 focus:outline-none bg-white"
                >
                  {initialSkillsMaster.map(s => (
                    <option key={s.id} value={s.skill}>{s.skill}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-3 py-1.5 border border-slate-300 rounded hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#26B99A] text-white rounded font-bold hover:bg-[#1f967d]"
                >
                  Save Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editModalItem && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 space-y-4 text-xs font-sans">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-bold text-sm text-slate-800">Edit Application</h3>
              <button onClick={() => setEditModalItem(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Application Name</label>
                <input
                  type="text"
                  required
                  value={editModalItem.application}
                  onChange={(e) => setEditModalItem({ ...editModalItem, application: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-1.5 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Skill</label>
                <select
                  value={editModalItem.skill}
                  onChange={(e) => setEditModalItem({ ...editModalItem, skill: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-1.5 focus:outline-none bg-white"
                >
                  {initialSkillsMaster.map(s => (
                    <option key={s.id} value={s.skill}>{s.skill}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setEditModalItem(null)}
                  className="px-3 py-1.5 border border-slate-300 rounded hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#d9534f] text-white rounded font-bold hover:bg-[#c9302c]"
                >
                  Update Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// =========================================================================
// 5. COURSE MASTER VIEW (Matching Screenshot 5: edu.dvanalyticsmds.com/admin/CourseMaster.aspx)
// =========================================================================
export function CourseMasterView({ showToast }) {
  const [courses, setCourses] = useState(initialCoursesMaster);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalItem, setEditModalItem] = useState(null);

  const [newCourse, setNewCourse] = useState({
    courseName: "",
    courseFee: "150000"
  });

  const filteredCourses = useMemo(() => {
    return courses.filter(c => 
      c.courseName.toLowerCase().includes(search.toLowerCase()) ||
      c.courseFee.includes(search)
    );
  }, [courses, search]);

  const totalPages = Math.ceil(filteredCourses.length / pageSize) || 1;
  const paginatedCourses = filteredCourses.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!newCourse.courseName.trim()) return;
    const created = {
      id: Date.now(),
      courseName: newCourse.courseName.trim().toUpperCase(),
      courseFee: newCourse.courseFee || "0"
    };
    setCourses([...courses, created]);
    setCreateModalOpen(false);
    setNewCourse({ courseName: "", courseFee: "150000" });
    showToast(`Course ${created.courseName} created successfully!`);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setCourses(prev => prev.map(c => c.id === editModalItem.id ? editModalItem : c));
    showToast(`Course ${editModalItem.courseName} updated successfully!`);
    setEditModalItem(null);
  };

  return (
    <div className="space-y-4">
      <div>
        <button
          onClick={() => setCreateModalOpen(true)}
          className="bg-[#26B99A] hover:bg-[#1f967d] text-white text-xs font-semibold px-3 py-1.5 rounded-[3px] shadow-2xs cursor-pointer inline-flex items-center gap-1 transition-colors"
        >
          Create Course
        </button>
      </div>

      <TableControls
        pageSize={pageSize}
        setPageSize={setPageSize}
        search={search}
        setSearch={setSearch}
        onPageReset={() => setCurrentPage(1)}
      />

      <div className="overflow-x-auto border border-slate-200 bg-white">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-300 bg-white">
              <th className="border border-slate-200 px-3 py-2.5 font-bold text-slate-800 text-center select-none w-16">
                <div className="flex items-center justify-center gap-1">
                  <span>S.No</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
              <th className="border border-slate-200 px-4 py-2.5 font-bold text-slate-800 text-center select-none">
                <div className="flex items-center justify-center gap-1">
                  <span>Course Name</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
              <th className="border border-slate-200 px-4 py-2.5 font-bold text-slate-800 text-center select-none">
                <div className="flex items-center justify-center gap-1">
                  <span>Course Fee</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
              <th className="border border-slate-200 px-4 py-2.5 font-bold text-slate-800 text-center select-none w-24">
                <div className="flex items-center justify-center gap-1">
                  <span>Action</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedCourses.map((c, idx) => (
              <tr key={c.id} className="hover:bg-slate-50 border-b border-slate-200 transition-colors">
                <td className="border border-slate-200 px-3 py-2 text-center text-slate-700">
                  {(currentPage - 1) * pageSize + idx + 1}
                </td>
                <td className="border border-slate-200 px-4 py-2 text-center text-slate-800 font-medium">
                  {c.courseName}
                </td>
                <td className="border border-slate-200 px-4 py-2 text-center text-slate-700">
                  {c.courseFee}
                </td>
                <td className="border border-slate-200 px-3 py-2 text-center whitespace-nowrap">
                  <button
                    onClick={() => setEditModalItem({ ...c })}
                    className="bg-[#d9534f] hover:bg-[#c9302c] text-white px-3 py-0.5 rounded-[3px] border border-[#d43f3a] text-[11px] font-medium cursor-pointer shadow-2xs"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalEntries={filteredCourses.length}
        pageSize={pageSize}
        setPage={setCurrentPage}
      />

      {/* CREATE MODAL */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 space-y-4 text-xs font-sans">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-bold text-sm text-slate-800">Create Course</h3>
              <button onClick={() => setCreateModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreateSubmit} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Course Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. DATA SCIENCE MASTER"
                  value={newCourse.courseName}
                  onChange={(e) => setNewCourse({ ...newCourse, courseName: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-1.5 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Course Fee (₹) *</label>
                <input
                  type="number"
                  required
                  value={newCourse.courseFee}
                  onChange={(e) => setNewCourse({ ...newCourse, courseFee: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-1.5 focus:outline-none font-mono"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-3 py-1.5 border border-slate-300 rounded hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#26B99A] text-white rounded font-bold hover:bg-[#1f967d]"
                >
                  Save Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editModalItem && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 space-y-4 text-xs font-sans">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-bold text-sm text-slate-800">Edit Course</h3>
              <button onClick={() => setEditModalItem(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Course Name</label>
                <input
                  type="text"
                  required
                  value={editModalItem.courseName}
                  onChange={(e) => setEditModalItem({ ...editModalItem, courseName: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-1.5 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Course Fee (₹)</label>
                <input
                  type="number"
                  required
                  value={editModalItem.courseFee}
                  onChange={(e) => setEditModalItem({ ...editModalItem, courseFee: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-1.5 focus:outline-none font-mono"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setEditModalItem(null)}
                  className="px-3 py-1.5 border border-slate-300 rounded hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#d9534f] text-white rounded font-bold hover:bg-[#c9302c]"
                >
                  Update Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// =========================================================================
// 6. BATCH MASTER VIEW (Matching Screenshot 1: edu.dvanalyticsmds.com/admin/BatchMaster.aspx)
// =========================================================================
export function BatchMasterView({ showToast }) {
  const [batches, setBatches] = useState(initialBatchesMaster);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalItem, setEditModalItem] = useState(null);

  const [newBatch, setNewBatch] = useState({
    batchName: "",
    startDate: new Date().toLocaleDateString('en-GB').replace(/\//g, '.'),
    endDate: "31.12.2026"
  });

  const filteredBatches = useMemo(() => {
    return batches.filter(b => 
      b.batchName.toLowerCase().includes(search.toLowerCase()) ||
      b.startDate.includes(search) ||
      b.endDate.includes(search)
    );
  }, [batches, search]);

  const totalPages = Math.ceil(filteredBatches.length / pageSize) || 1;
  const paginatedBatches = filteredBatches.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!newBatch.batchName.trim()) return;
    const created = {
      id: Date.now(),
      batchName: newBatch.batchName.trim().toUpperCase(),
      startDate: newBatch.startDate,
      endDate: newBatch.endDate
    };
    setBatches([...batches, created]);
    setCreateModalOpen(false);
    setNewBatch({ batchName: "", startDate: new Date().toLocaleDateString('en-GB').replace(/\//g, '.'), endDate: "31.12.2026" });
    showToast(`Batch ${created.batchName} created successfully!`);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setBatches(prev => prev.map(b => b.id === editModalItem.id ? editModalItem : b));
    showToast(`Batch updated successfully!`);
    setEditModalItem(null);
  };

  return (
    <div className="space-y-4 font-sans">
      <div>
        <button
          onClick={() => setCreateModalOpen(true)}
          className="bg-[#26B99A] hover:bg-[#1f967d] text-white text-xs font-semibold px-3 py-1.5 rounded-[3px] shadow-2xs cursor-pointer inline-flex items-center gap-1 transition-colors"
        >
          Create Batch
        </button>
      </div>

      <TableControls
        pageSize={pageSize}
        setPageSize={setPageSize}
        search={search}
        setSearch={setSearch}
        onPageReset={() => setCurrentPage(1)}
      />

      <div className="overflow-x-auto border border-slate-200 bg-white">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-300 bg-white">
              <th className="border border-slate-200 px-3 py-2.5 font-bold text-slate-800 text-center select-none w-16">
                <div className="flex items-center justify-center gap-1">
                  <span>S.No</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
              <th className="border border-slate-200 px-4 py-2.5 font-bold text-slate-800 text-center select-none">
                <div className="flex items-center justify-center gap-1">
                  <span>Batch Name</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
              <th className="border border-slate-200 px-4 py-2.5 font-bold text-slate-800 text-center select-none">
                <div className="flex items-center justify-center gap-1">
                  <span>Batch Start Date</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
              <th className="border border-slate-200 px-4 py-2.5 font-bold text-slate-800 text-center select-none">
                <div className="flex items-center justify-center gap-1">
                  <span>Batch End Date</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
              <th className="border border-slate-200 px-4 py-2.5 font-bold text-slate-800 text-center select-none w-24">
                <div className="flex items-center justify-center gap-1">
                  <span>Action</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedBatches.map((b, idx) => (
              <tr key={b.id} className="hover:bg-slate-50 border-b border-slate-200 transition-colors">
                <td className="border border-slate-200 px-3 py-2 text-center text-slate-700">
                  {(currentPage - 1) * pageSize + idx + 1}
                </td>
                <td className="border border-slate-200 px-4 py-2 text-center text-slate-800 font-medium">
                  {b.batchName}
                </td>
                <td className="border border-slate-200 px-4 py-2 text-center text-slate-700">
                  {b.startDate}
                </td>
                <td className="border border-slate-200 px-4 py-2 text-center text-slate-700">
                  {b.endDate}
                </td>
                <td className="border border-slate-200 px-3 py-2 text-center whitespace-nowrap">
                  <button
                    onClick={() => setEditModalItem({ ...b })}
                    className="bg-[#d9534f] hover:bg-[#c9302c] text-white px-3 py-0.5 rounded-[3px] border border-[#d43f3a] text-[11px] font-medium cursor-pointer shadow-2xs"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalEntries={filteredBatches.length}
        pageSize={pageSize}
        setPage={setCurrentPage}
      />

      {/* CREATE MODAL */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 space-y-4 text-xs font-sans">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-bold text-sm text-slate-800">Create Batch</h3>
              <button onClick={() => setCreateModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreateSubmit} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Batch Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. BATCH 202610"
                  value={newBatch.batchName}
                  onChange={(e) => setNewBatch({ ...newBatch, batchName: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-1.5 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Start Date</label>
                <input
                  type="text"
                  value={newBatch.startDate}
                  onChange={(e) => setNewBatch({ ...newBatch, startDate: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-1.5 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">End Date</label>
                <input
                  type="text"
                  value={newBatch.endDate}
                  onChange={(e) => setNewBatch({ ...newBatch, endDate: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-1.5 focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-3 py-1.5 border border-slate-300 rounded hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#26B99A] text-white rounded font-bold hover:bg-[#1f967d]"
                >
                  Save Batch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editModalItem && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 space-y-4 text-xs font-sans">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-bold text-sm text-slate-800">Edit Batch</h3>
              <button onClick={() => setEditModalItem(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Batch Name</label>
                <input
                  type="text"
                  required
                  value={editModalItem.batchName}
                  onChange={(e) => setEditModalItem({ ...editModalItem, batchName: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-1.5 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Start Date</label>
                <input
                  type="text"
                  value={editModalItem.startDate}
                  onChange={(e) => setEditModalItem({ ...editModalItem, startDate: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-1.5 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">End Date</label>
                <input
                  type="text"
                  value={editModalItem.endDate}
                  onChange={(e) => setEditModalItem({ ...editModalItem, endDate: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-1.5 focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setEditModalItem(null)}
                  className="px-3 py-1.5 border border-slate-300 rounded hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#d9534f] text-white rounded font-bold hover:bg-[#c9302c]"
                >
                  Update Batch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// =========================================================================
// 7. MENTOR MASTER VIEW (Matching Screenshot 2: edu.dvanalyticsmds.com/admin/MentorMaster.aspx)
// =========================================================================
export function MentorMasterView({ showToast }) {
  const [mentors, setMentors] = useState(initialMentorsMaster);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalItem, setEditModalItem] = useState(null);

  const [newMentor, setNewMentor] = useState({
    name: "",
    regDate: new Date().toLocaleDateString('en-GB')
  });

  const filteredMentors = useMemo(() => {
    return mentors.filter(m => 
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.regDate.includes(search)
    );
  }, [mentors, search]);

  const totalPages = Math.ceil(filteredMentors.length / pageSize) || 1;
  const paginatedMentors = filteredMentors.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleToggleStatus = (id) => {
    setMentors(prev => prev.map(m => {
      if (m.id === id) {
        const next = m.status === 'Active' ? 'Inactive' : 'Active';
        showToast(`Mentor ${m.name} marked ${next}`);
        return { ...m, status: next };
      }
      return m;
    }));
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!newMentor.name.trim()) return;
    const created = {
      id: Date.now(),
      name: newMentor.name.trim().toUpperCase(),
      regDate: newMentor.regDate,
      status: "Active"
    };
    setMentors([...mentors, created]);
    setCreateModalOpen(false);
    setNewMentor({ name: "", regDate: new Date().toLocaleDateString('en-GB') });
    showToast(`Mentor ${created.name} added successfully!`);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setMentors(prev => prev.map(m => m.id === editModalItem.id ? editModalItem : m));
    showToast(`Mentor updated successfully!`);
    setEditModalItem(null);
  };

  return (
    <div className="space-y-4 font-sans">
      <div>
        <button
          onClick={() => setCreateModalOpen(true)}
          className="bg-[#26B99A] hover:bg-[#1f967d] text-white text-xs font-semibold px-3 py-1.5 rounded-[3px] shadow-2xs cursor-pointer inline-flex items-center gap-1 transition-colors"
        >
          Create Mentor
        </button>
      </div>

      <TableControls
        pageSize={pageSize}
        setPageSize={setPageSize}
        search={search}
        setSearch={setSearch}
        onPageReset={() => setCurrentPage(1)}
      />

      <div className="overflow-x-auto border border-slate-200 bg-white">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-300 bg-white">
              <th className="border border-slate-200 px-3 py-2.5 font-bold text-slate-800 text-center select-none w-16">
                <div className="flex items-center justify-center gap-1">
                  <span>S.No</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
              <th className="border border-slate-200 px-4 py-2.5 font-bold text-slate-800 text-center select-none">
                <div className="flex items-center justify-center gap-1">
                  <span>Registration Date</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
              <th className="border border-slate-200 px-4 py-2.5 font-bold text-slate-800 text-center select-none">
                <div className="flex items-center justify-center gap-1">
                  <span>Mentor Name</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
              <th className="border border-slate-200 px-4 py-2.5 font-bold text-slate-800 text-center select-none w-44">
                <div className="flex items-center justify-center gap-1">
                  <span>Action</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedMentors.map((m, idx) => (
              <tr key={m.id} className="hover:bg-slate-50 border-b border-slate-200 transition-colors">
                <td className="border border-slate-200 px-3 py-2 text-center text-slate-700">
                  {(currentPage - 1) * pageSize + idx + 1}
                </td>
                <td className="border border-slate-200 px-4 py-2 text-center text-slate-700">
                  {m.regDate}
                </td>
                <td className="border border-slate-200 px-4 py-2 text-center text-slate-800 font-medium">
                  {m.name}
                </td>
                <td className="border border-slate-200 px-3 py-2 text-center whitespace-nowrap">
                  <div className="flex items-center justify-center gap-1.5">
                    <button
                      onClick={() => setEditModalItem({ ...m })}
                      className="bg-[#337ab7] hover:bg-[#286090] text-white px-2.5 py-0.5 rounded-[3px] border border-[#2e6da4] text-[11px] font-medium cursor-pointer shadow-2xs"
                    >
                      Edit
                    </button>
                    {m.status === 'Active' ? (
                      <button
                        onClick={() => handleToggleStatus(m.id)}
                        className="bg-[#26b99a] hover:bg-[#209e83] text-white px-2.5 py-0.5 rounded-[3px] border border-[#209e83] text-[11px] font-medium cursor-pointer shadow-2xs"
                      >
                        Make Inactive
                      </button>
                    ) : (
                      <button
                        onClick={() => handleToggleStatus(m.id)}
                        className="bg-[#d9534f] hover:bg-[#c9302c] text-white px-2.5 py-0.5 rounded-[3px] border border-[#d43f3a] text-[11px] font-medium cursor-pointer shadow-2xs"
                      >
                        Make Active
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalEntries={filteredMentors.length}
        pageSize={pageSize}
        setPage={setCurrentPage}
      />

      {/* CREATE MODAL */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 space-y-4 text-xs font-sans">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-bold text-sm text-slate-800">Create Mentor</h3>
              <button onClick={() => setCreateModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreateSubmit} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Mentor Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. PRIYANKA MISHRA"
                  value={newMentor.name}
                  onChange={(e) => setNewMentor({ ...newMentor, name: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-1.5 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Registration Date</label>
                <input
                  type="text"
                  value={newMentor.regDate}
                  onChange={(e) => setNewMentor({ ...newMentor, regDate: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-1.5 focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-3 py-1.5 border border-slate-300 rounded hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#26B99A] text-white rounded font-bold hover:bg-[#1f967d]"
                >
                  Save Mentor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editModalItem && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 space-y-4 text-xs font-sans">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-bold text-sm text-slate-800">Edit Mentor</h3>
              <button onClick={() => setEditModalItem(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Mentor Name</label>
                <input
                  type="text"
                  required
                  value={editModalItem.name}
                  onChange={(e) => setEditModalItem({ ...editModalItem, name: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-1.5 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Registration Date</label>
                <input
                  type="text"
                  value={editModalItem.regDate}
                  onChange={(e) => setEditModalItem({ ...editModalItem, regDate: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-1.5 focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setEditModalItem(null)}
                  className="px-3 py-1.5 border border-slate-300 rounded hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#337ab7] text-white rounded font-bold hover:bg-[#286090]"
                >
                  Update Mentor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// =========================================================================
// 8. SELF PACED MASTER VIEW / Non Live Training (Screenshot 3: SelfPaceMaster.aspx)
// =========================================================================
export function SelfPaceMasterView({ showToast }) {
  const [selfPaces, setSelfPaces] = useState(initialSelfPaceMaster);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalItem, setEditModalItem] = useState(null);
  const [newDesc, setNewDesc] = useState("");

  const filteredPaces = useMemo(() => {
    return selfPaces.filter(p => p.description.toLowerCase().includes(search.toLowerCase()));
  }, [selfPaces, search]);

  const totalPages = Math.ceil(filteredPaces.length / pageSize) || 1;
  const paginatedPaces = filteredPaces.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!newDesc.trim()) return;
    const created = {
      id: Date.now(),
      description: newDesc.trim()
    };
    setSelfPaces([...selfPaces, created]);
    setCreateModalOpen(false);
    setNewDesc("");
    showToast(`Self Paced Module added successfully!`);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setSelfPaces(prev => prev.map(p => p.id === editModalItem.id ? editModalItem : p));
    showToast(`Updated successfully!`);
    setEditModalItem(null);
  };

  return (
    <div className="space-y-4 font-sans">
      <div>
        <button
          onClick={() => setCreateModalOpen(true)}
          className="bg-[#26B99A] hover:bg-[#1f967d] text-white text-xs font-semibold px-3 py-1.5 rounded-[3px] shadow-2xs cursor-pointer inline-flex items-center gap-1 transition-colors"
        >
          Create New
        </button>
      </div>

      <TableControls
        pageSize={pageSize}
        setPageSize={setPageSize}
        search={search}
        setSearch={setSearch}
        onPageReset={() => setCurrentPage(1)}
      />

      <div className="overflow-x-auto border border-slate-200 bg-white">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-300 bg-white">
              <th className="border border-slate-200 px-3 py-2.5 font-bold text-slate-800 text-center select-none w-16">
                <div className="flex items-center justify-center gap-1">
                  <span>S.No</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
              <th className="border border-slate-200 px-4 py-2.5 font-bold text-slate-800 text-center select-none">
                <div className="flex items-center justify-center gap-1">
                  <span>Description</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
              <th className="border border-slate-200 px-4 py-2.5 font-bold text-slate-800 text-center select-none w-24">
                <div className="flex items-center justify-center gap-1">
                  <span>Action</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedPaces.map((p, idx) => (
              <tr key={p.id} className="hover:bg-slate-50 border-b border-slate-200 transition-colors">
                <td className="border border-slate-200 px-3 py-2 text-center text-slate-700">
                  {(currentPage - 1) * pageSize + idx + 1}
                </td>
                <td className="border border-slate-200 px-4 py-2 text-center text-slate-800 font-medium">
                  {p.description}
                </td>
                <td className="border border-slate-200 px-3 py-2 text-center whitespace-nowrap">
                  <button
                    onClick={() => setEditModalItem({ ...p })}
                    className="bg-[#d9534f] hover:bg-[#c9302c] text-white px-3 py-0.5 rounded-[3px] border border-[#d43f3a] text-[11px] font-medium cursor-pointer shadow-2xs"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalEntries={filteredPaces.length}
        pageSize={pageSize}
        setPage={setCurrentPage}
      />

      {/* CREATE MODAL */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 space-y-4 text-xs font-sans">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-bold text-sm text-slate-800">Create Self Paced Item</h3>
              <button onClick={() => setCreateModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreateSubmit} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Description *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mini Module 5"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full border border-slate-300 rounded px-3 py-1.5 focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-3 py-1.5 border border-slate-300 rounded hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#26B99A] text-white rounded font-bold hover:bg-[#1f967d]"
                >
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editModalItem && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 space-y-4 text-xs font-sans">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-bold text-sm text-slate-800">Edit Self Paced Item</h3>
              <button onClick={() => setEditModalItem(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Description</label>
                <input
                  type="text"
                  required
                  value={editModalItem.description}
                  onChange={(e) => setEditModalItem({ ...editModalItem, description: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-1.5 focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setEditModalItem(null)}
                  className="px-3 py-1.5 border border-slate-300 rounded hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#d9534f] text-white rounded font-bold hover:bg-[#c9302c]"
                >
                  Update Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// =========================================================================
// 9. PAYMENT APPROVAL VIEW (Screenshot 4: PayApproval.aspx)
// =========================================================================
export function PaymentApprovalView({ showToast }) {
  const [approvals, setApprovals] = useState(initialPaymentApprovals);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [viewDetailItem, setViewDetailItem] = useState(null);

  const filteredApprovals = useMemo(() => {
    return approvals.filter(a => 
      a.studentName.toLowerCase().includes(search.toLowerCase()) ||
      a.studentId.toLowerCase().includes(search.toLowerCase()) ||
      a.refNo.includes(search) ||
      a.date.includes(search)
    );
  }, [approvals, search]);

  const totalPages = Math.ceil(filteredApprovals.length / pageSize) || 1;
  const paginatedApprovals = filteredApprovals.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleApprove = (id, studentName) => {
    setApprovals(prev => prev.filter(a => a.id !== id));
    showToast(`Payment of ₹68,000 for ${studentName} Approved & Reconciled!`);
  };

  const handleReject = (id, studentName) => {
    setApprovals(prev => prev.filter(a => a.id !== id));
    showToast(`Payment for ${studentName} Rejected.`);
  };

  return (
    <div className="space-y-4 font-sans">
      <TableControls
        pageSize={pageSize}
        setPageSize={setPageSize}
        search={search}
        setSearch={setSearch}
        onPageReset={() => setCurrentPage(1)}
      />

      <div className="overflow-x-auto border border-slate-200 bg-white">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-300 bg-white">
              <th className="border border-slate-200 px-3 py-2.5 font-bold text-slate-800 text-center select-none w-14">
                <div className="flex items-center justify-center gap-1">
                  <span>S.No</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
              <th className="border border-slate-200 px-3 py-2.5 font-bold text-slate-800 text-center select-none">
                <div className="flex items-center justify-center gap-1">
                  <span>Date</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
              <th className="border border-slate-200 px-4 py-2.5 font-bold text-slate-800 text-center select-none">
                <div className="flex items-center justify-center gap-1">
                  <span>Student Name</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
              <th className="border border-slate-200 px-4 py-2.5 font-bold text-slate-800 text-center select-none">
                <div className="flex items-center justify-center gap-1">
                  <span>Student ID</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
              <th className="border border-slate-200 px-4 py-2.5 font-bold text-slate-800 text-center select-none">
                <div className="flex items-center justify-center gap-1">
                  <span>Amount</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
              <th className="border border-slate-200 px-4 py-2.5 font-bold text-slate-800 text-center select-none">
                <div className="flex items-center justify-center gap-1">
                  <span>Mode Of Pay</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
              <th className="border border-slate-200 px-4 py-2.5 font-bold text-slate-800 text-center select-none">
                <div className="flex items-center justify-center gap-1">
                  <span>Ref. No</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
              <th className="border border-slate-200 px-4 py-2.5 font-bold text-slate-800 text-center select-none">
                <div className="flex items-center justify-center gap-1">
                  <span>Amount</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
              <th className="border border-slate-200 px-4 py-2.5 font-bold text-slate-800 text-center select-none w-48">
                <div className="flex items-center justify-center gap-1">
                  <span>Action</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedApprovals.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-6 text-slate-500">All payments approved and reconciled!</td>
              </tr>
            ) : (
              paginatedApprovals.map((a, idx) => (
                <tr key={a.id} className="hover:bg-slate-50 border-b border-slate-200 transition-colors">
                  <td className="border border-slate-200 px-3 py-2 text-center text-slate-700">
                    {(currentPage - 1) * pageSize + idx + 1}
                  </td>
                  <td className="border border-slate-200 px-3 py-2 text-center text-slate-700">
                    {a.date}
                  </td>
                  <td className="border border-slate-200 px-4 py-2 text-center text-slate-800 font-medium">
                    {a.studentName}
                  </td>
                  <td className="border border-slate-200 px-4 py-2 text-center text-slate-700 font-mono">
                    {a.studentId}
                  </td>
                  <td className="border border-slate-200 px-4 py-2 text-center text-slate-700 font-mono">
                    {a.amount}
                  </td>
                  <td className="border border-slate-200 px-4 py-2 text-center text-slate-700">
                    {a.modeOfPay}
                  </td>
                  <td className="border border-slate-200 px-4 py-2 text-center text-slate-700 font-mono">
                    {a.refNo}
                  </td>
                  <td className="border border-slate-200 px-4 py-2 text-center text-slate-700 font-mono">
                    {a.totalAmount}
                  </td>
                  <td className="border border-slate-200 px-3 py-2 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => setViewDetailItem(a)}
                        className="bg-[#337ab7] hover:bg-[#286090] text-white px-2.5 py-0.5 rounded-[3px] border border-[#2e6da4] text-[11px] font-medium cursor-pointer shadow-2xs"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleApprove(a.id, a.studentName)}
                        className="bg-[#26b99a] hover:bg-[#209e83] text-white px-2.5 py-0.5 rounded-[3px] border border-[#209e83] text-[11px] font-medium cursor-pointer shadow-2xs"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(a.id, a.studentName)}
                        className="bg-[#d9534f] hover:bg-[#c9302c] text-white px-2.5 py-0.5 rounded-[3px] border border-[#d43f3a] text-[11px] font-medium cursor-pointer shadow-2xs"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalEntries={filteredApprovals.length}
        pageSize={pageSize}
        setPage={setCurrentPage}
      />

      {/* DETAIL MODAL */}
      {viewDetailItem && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 space-y-4 text-xs font-sans">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-bold text-sm text-slate-800">Payment Verification Details</h3>
              <button onClick={() => setViewDetailItem(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 text-slate-700">
              <div className="flex justify-between border-b pb-1">
                <span className="font-bold">Student Name:</span>
                <span>{viewDetailItem.studentName}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="font-bold">Student ID:</span>
                <span className="font-mono">{viewDetailItem.studentId}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="font-bold">Amount:</span>
                <span className="font-bold text-emerald-600 font-mono">₹{viewDetailItem.amount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="font-bold">Payment Mode:</span>
                <span>{viewDetailItem.modeOfPay}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="font-bold">Reference / UTR:</span>
                <span className="font-mono">{viewDetailItem.refNo}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="font-bold">Transaction Date:</span>
                <span>{viewDetailItem.date}</span>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t">
              <button
                type="button"
                onClick={() => setViewDetailItem(null)}
                className="px-3 py-1.5 border border-slate-300 rounded hover:bg-slate-100"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  handleApprove(viewDetailItem.id, viewDetailItem.studentName);
                  setViewDetailItem(null);
                }}
                className="px-4 py-1.5 bg-[#26B99A] text-white rounded font-bold hover:bg-[#1f967d]"
              >
                Approve Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// =========================================================================
// 10. REGISTRATION LINK VIEW (Screenshot 5: external_link.aspx)
// =========================================================================
export function RegistrationLinkView({ showToast }) {
  const [links, setLinks] = useState(initialRegistrationLinks);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: ""
  });

  const filteredLinks = useMemo(() => {
    return links.filter(l => 
      l.firstName.toLowerCase().includes(search.toLowerCase()) ||
      l.lastName.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase()) ||
      l.mobile.includes(search)
    );
  }, [links, search]);

  const totalPages = Math.ceil(filteredLinks.length / pageSize) || 1;
  const paginatedLinks = filteredLinks.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete registration link for ${name}?`)) {
      setLinks(prev => prev.filter(l => l.id !== id));
      showToast(`Link for ${name} deleted.`);
    }
  };

  const handleResend = (email, mobile) => {
    showToast(`Registration invite re-sent to ${email} & ${mobile}!`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.mobile) {
      alert("Please fill all required fields");
      return;
    }
    const created = {
      id: Date.now(),
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      mobile: form.mobile,
      createdOn: new Date().toLocaleDateString('en-GB').replace(/\//g, '.')
    };
    setLinks([created, ...links]);
    setCreateModalOpen(false);
    setForm({ firstName: "", lastName: "", email: "", mobile: "" });
    showToast(`Registration link generated & dispatched to ${created.email}!`);
  };

  return (
    <div className="space-y-4 font-sans relative">
      <div>
        <button
          onClick={() => setCreateModalOpen(true)}
          className="bg-[#204d74] hover:bg-[#1a3d5c] text-white text-xs font-semibold px-3 py-1.5 rounded-[3px] shadow-2xs cursor-pointer inline-flex items-center gap-1 transition-colors"
        >
          Create Link
        </button>
      </div>

      <TableControls
        pageSize={pageSize}
        setPageSize={setPageSize}
        search={search}
        setSearch={setSearch}
        onPageReset={() => setCurrentPage(1)}
      />

      <div className="overflow-x-auto border border-slate-200 bg-white">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-300 bg-white">
              <th className="border border-slate-200 px-3 py-2.5 font-bold text-slate-800 text-center select-none w-14">
                <div className="flex items-center justify-center gap-1">
                  <span>S.No</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
              <th className="border border-slate-200 px-4 py-2.5 font-bold text-slate-800 text-center select-none">
                <div className="flex items-center justify-center gap-1">
                  <span>First Name</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
              <th className="border border-slate-200 px-4 py-2.5 font-bold text-slate-800 text-center select-none">
                <div className="flex items-center justify-center gap-1">
                  <span>Last Name</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
              <th className="border border-slate-200 px-4 py-2.5 font-bold text-slate-800 text-center select-none">
                <div className="flex items-center justify-center gap-1">
                  <span>Email ID</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
              <th className="border border-slate-200 px-4 py-2.5 font-bold text-slate-800 text-center select-none">
                <div className="flex items-center justify-center gap-1">
                  <span>Mobile No.</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
              <th className="border border-slate-200 px-4 py-2.5 font-bold text-slate-800 text-center select-none">
                <div className="flex items-center justify-center gap-1">
                  <span>Created On</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
              <th className="border border-slate-200 px-4 py-2.5 font-bold text-slate-800 text-center select-none w-36">
                <div className="flex items-center justify-center gap-1">
                  <span>Action</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedLinks.map((l, idx) => (
              <tr key={l.id} className="hover:bg-slate-50 border-b border-slate-200 transition-colors">
                <td className="border border-slate-200 px-3 py-2 text-center text-slate-700">
                  {(currentPage - 1) * pageSize + idx + 1}
                </td>
                <td className="border border-slate-200 px-4 py-2 text-center text-slate-800 font-medium">
                  {l.firstName}
                </td>
                <td className="border border-slate-200 px-4 py-2 text-center text-slate-800 font-medium">
                  {l.lastName}
                </td>
                <td className="border border-slate-200 px-4 py-2 text-center text-slate-700">
                  {l.email}
                </td>
                <td className="border border-slate-200 px-4 py-2 text-center text-slate-700 font-mono">
                  {l.mobile}
                </td>
                <td className="border border-slate-200 px-4 py-2 text-center text-slate-700">
                  {l.createdOn}
                </td>
                <td className="border border-slate-200 px-3 py-2 text-center whitespace-nowrap">
                  <div className="flex items-center justify-center gap-1.5">
                    <button
                      onClick={() => handleDelete(l.id, `${l.firstName} ${l.lastName}`)}
                      className="bg-[#d9534f] hover:bg-[#c9302c] text-white px-2.5 py-0.5 rounded-[3px] border border-[#d43f3a] text-[11px] font-medium cursor-pointer shadow-2xs"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleResend(l.email, l.mobile)}
                      className="bg-[#26b99a] hover:bg-[#209e83] text-white px-2.5 py-0.5 rounded-[3px] border border-[#209e83] text-[11px] font-medium cursor-pointer shadow-2xs"
                    >
                      Re-Send
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalEntries={filteredLinks.length}
        pageSize={pageSize}
        setPage={setCurrentPage}
      />

      {/* CREATE LINK MODAL - Exact match for Screenshot 5 */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded shadow-2xl max-w-sm w-full p-5 space-y-4 text-xs font-sans border border-slate-300 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-semibold text-sm text-slate-800">Create Link</h3>
              <button 
                onClick={() => setCreateModalOpen(false)} 
                className="text-slate-400 hover:text-slate-600 text-base font-bold leading-none cursor-pointer"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 pt-1">
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  First Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  className="w-full border border-slate-300 rounded px-2.5 py-1.5 focus:outline-none focus:border-teal-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Last Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  className="w-full border border-slate-300 rounded px-2.5 py-1.5 focus:outline-none focus:border-teal-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Email ID<span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-slate-300 rounded px-2.5 py-1.5 focus:outline-none focus:border-teal-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Mobile No.<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.mobile}
                  onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                  className="w-full border border-slate-300 rounded px-2.5 py-1.5 focus:outline-none focus:border-teal-500 bg-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-4 py-1.5 border border-slate-300 rounded hover:bg-slate-100 text-slate-700 cursor-pointer font-medium"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#26b99a] hover:bg-[#1f967d] text-white rounded font-bold cursor-pointer transition-colors shadow-2xs"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// =========================================================================
// 11. REGISTRATION VIEW (Screenshots 1, 2, 3, 4: Reg.aspx & Reg.aspx?status=Add)
// =========================================================================
export function RegistrationView({ showToast }) {
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'add'
  const [students, setStudents] = useState(() => getStoredStudents());
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  // Filters on list view
  const [filterFromDate, setFilterFromDate] = useState("");
  const [filterToDate, setFilterToDate] = useState("");
  const [filterCourse, setFilterCourse] = useState("All Course");
  const [filterBatch, setFilterBatch] = useState("All Batch");

  // Registration Form State (Screenshots 2, 3, 4)
  const [regForm, setRegForm] = useState({
    date: "01-10-2026",
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    age: "",
    gender: "Male",
    education: "",
    yearOfPassing: "",
    experience: "",
    aadharNo: "",
    panNo: "",
    email1: "",
    email2: "",
    mobile1: "",
    mobile2: "",
    whatsAppNo: "",
    emergencyContact: "",
    localAddress: "",
    permanentAddress: "",
    bloodGroup: "O+",
    branch: "BHUBANESHWAR",
    batchId: "BATCH 202606",
    course: "APIDS",
    courseFee: "350000",
    discountType: "Scholarship",
    discountValue: "0",
    committedFee: "350000",
    installment: "3",
    paymentBy: "Student" // 'Student' | 'Bank'
  });

  const handleCourseChange = (courseName) => {
    const feeMap = {
      "APIDS": 350000,
      "APIDA": 295000,
      "MPGA": 141600,
      "APCF": 150000,
      "AIML": 259600,
      "BASIC PACK": 80000,
      "INTERMEDIATE PACK": 100000,
      "ADVANCED PACK": 120000
    };
    const baseFee = feeMap[courseName] || 65000;
    const disc = parseInt(regForm.discountValue || 0);
    const committed = Math.max(0, baseFee - disc);
    setRegForm(prev => ({
      ...prev,
      course: courseName,
      courseFee: baseFee.toString(),
      committedFee: committed.toString()
    }));
  };

  const handleDiscountChange = (val) => {
    const disc = parseInt(val || 0);
    const base = parseInt(regForm.courseFee || 350000);
    const committed = Math.max(0, base - disc);
    setRegForm(prev => ({
      ...prev,
      discountValue: val,
      committedFee: committed.toString()
    }));
  };

  const handleDobChange = (val) => {
    let computedAge = "";
    if (val) {
      const birthYear = new Date(val).getFullYear();
      if (!isNaN(birthYear)) {
        computedAge = (2026 - birthYear).toString();
      }
    }
    setRegForm(prev => ({
      ...prev,
      dob: val,
      age: computedAge || prev.age
    }));
  };

  const handleSubmitRegistration = (e) => {
    e.preventDefault();
    if (!regForm.firstName || !regForm.lastName || !regForm.mobile1) {
      alert("Please fill in First Name, Last Name, and Mobile Number");
      return;
    }
    const fullName = `${regForm.firstName} ${regForm.middleName ? regForm.middleName + ' ' : ''}${regForm.lastName}`.trim().toUpperCase();
    const created = {
      name: fullName,
      email: regForm.email1 || `${regForm.firstName.toLowerCase()}@dvanalytics.com`,
      phone: regForm.mobile1,
      course: regForm.course,
      batch: regForm.batchId,
      regDate: "2026-10-01",
      totalFee: `₹${parseInt(regForm.committedFee).toLocaleString('en-IN')}`,
      paidFee: `₹${Math.round(parseInt(regForm.committedFee) * 0.5).toLocaleString('en-IN')}`,
      dueFee: `₹${Math.round(parseInt(regForm.committedFee) * 0.5).toLocaleString('en-IN')}`,
      status: "Active",
      gender: regForm.gender,
      college: regForm.education || "University",
      location: regForm.branch
    };

    const updated = saveAdminStudent(created);
    setStudents(updated);
    setViewMode('list');
    showToast(`✓ Student ${fullName} registered successfully in ${created.course}!`);
  };

  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      const matchSearch = !search || 
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.rollNo?.toLowerCase().includes(search.toLowerCase()) ||
        s.course.toLowerCase().includes(search.toLowerCase()) ||
        s.batch.toLowerCase().includes(search.toLowerCase());
      const matchCourse = filterCourse === "All Course" || s.course === filterCourse;
      const matchBatch = filterBatch === "All Batch" || s.batch === filterBatch;
      return matchSearch && matchCourse && matchBatch;
    });
  }, [students, search, filterCourse, filterBatch]);

  const totalPages = Math.ceil(filteredStudents.length / pageSize) || 1;
  const paginatedStudents = filteredStudents.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // -------------------------------------------------------------
  // RENDER ADD MODE (Exact match for Screenshots 2, 3, 4)
  // -------------------------------------------------------------
  if (viewMode === 'add') {
    return (
      <div className="bg-white p-6 sm:p-8 rounded-sm border border-slate-200 shadow-2xs font-sans text-xs space-y-6">
        <form onSubmit={handleSubmitRegistration} className="space-y-6">
          {/* SECTION 1: Personal & Educational Details */}
          <div className="space-y-3.5 max-w-4xl mx-auto">
            {/* Date */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              <label className="sm:col-span-3 text-right font-bold text-slate-700">
                Date <span className="text-red-500">*</span>
              </label>
              <div className="sm:col-span-9">
                <input
                  type="text"
                  value={regForm.date}
                  onChange={(e) => setRegForm({ ...regForm, date: e.target.value })}
                  className="w-full max-w-lg px-3 py-1.5 border border-slate-300 rounded text-xs focus:outline-none focus:border-teal-500 bg-white"
                  required
                />
              </div>
            </div>

            {/* First Name */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              <label className="sm:col-span-3 text-right font-bold text-slate-700">
                First Name <span className="text-red-500">*</span>
              </label>
              <div className="sm:col-span-9">
                <input
                  type="text"
                  required
                  placeholder="Enter First Name"
                  value={regForm.firstName}
                  onChange={(e) => setRegForm({ ...regForm, firstName: e.target.value })}
                  className="w-full max-w-lg px-3 py-1.5 border border-slate-300 rounded text-xs focus:outline-none focus:border-teal-500 bg-white"
                />
              </div>
            </div>

            {/* Middle Name */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              <label className="sm:col-span-3 text-right font-bold text-slate-700">
                Middle Name
              </label>
              <div className="sm:col-span-9">
                <input
                  type="text"
                  placeholder="Enter Middle Name (Optional)"
                  value={regForm.middleName}
                  onChange={(e) => setRegForm({ ...regForm, middleName: e.target.value })}
                  className="w-full max-w-lg px-3 py-1.5 border border-slate-300 rounded text-xs focus:outline-none focus:border-teal-500 bg-white"
                />
              </div>
            </div>

            {/* Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              <label className="sm:col-span-3 text-right font-bold text-slate-700">
                Last Name <span className="text-red-500">*</span>
              </label>
              <div className="sm:col-span-9">
                <input
                  type="text"
                  required
                  placeholder="Enter Last Name"
                  value={regForm.lastName}
                  onChange={(e) => setRegForm({ ...regForm, lastName: e.target.value })}
                  className="w-full max-w-lg px-3 py-1.5 border border-slate-300 rounded text-xs focus:outline-none focus:border-teal-500 bg-white"
                />
              </div>
            </div>

            {/* DOB */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              <label className="sm:col-span-3 text-right font-bold text-slate-700">
                DOB <span className="text-red-500">*</span>
              </label>
              <div className="sm:col-span-9">
                <input
                  type="date"
                  required
                  value={regForm.dob}
                  onChange={(e) => handleDobChange(e.target.value)}
                  className="w-full max-w-lg px-3 py-1.5 border border-slate-300 rounded text-xs focus:outline-none focus:border-teal-500 bg-white"
                />
              </div>
            </div>

            {/* Age */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              <label className="sm:col-span-3 text-right font-bold text-slate-700">
                Age <span className="text-red-500">*</span>
              </label>
              <div className="sm:col-span-9">
                <input
                  type="number"
                  required
                  placeholder="e.g. 24"
                  value={regForm.age}
                  onChange={(e) => setRegForm({ ...regForm, age: e.target.value })}
                  className="w-full max-w-lg px-3 py-1.5 border border-slate-300 rounded text-xs focus:outline-none focus:border-teal-500 bg-white font-mono"
                />
              </div>
            </div>

            {/* Gender */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              <label className="sm:col-span-3 text-right font-bold text-slate-700">
                Gender <span className="text-red-500">*</span>
              </label>
              <div className="sm:col-span-9">
                <select
                  value={regForm.gender}
                  onChange={(e) => setRegForm({ ...regForm, gender: e.target.value })}
                  className="w-full max-w-lg px-3 py-1.5 border border-slate-300 rounded text-xs focus:outline-none focus:border-teal-500 bg-white"
                >
                  <option value="Select Gender">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Education */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              <label className="sm:col-span-3 text-right font-bold text-slate-700">
                Education <span className="text-red-500">*</span>
              </label>
              <div className="sm:col-span-9">
                <input
                  type="text"
                  required
                  placeholder="e.g. B.Tech / MCA / B.Sc"
                  value={regForm.education}
                  onChange={(e) => setRegForm({ ...regForm, education: e.target.value })}
                  className="w-full max-w-lg px-3 py-1.5 border border-slate-300 rounded text-xs focus:outline-none focus:border-teal-500 bg-white"
                />
              </div>
            </div>

            {/* Year Of Passing */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              <label className="sm:col-span-3 text-right font-bold text-slate-700">
                Year Of Passing
              </label>
              <div className="sm:col-span-9">
                <input
                  type="text"
                  placeholder="e.g. 2024"
                  value={regForm.yearOfPassing}
                  onChange={(e) => setRegForm({ ...regForm, yearOfPassing: e.target.value })}
                  className="w-full max-w-lg px-3 py-1.5 border border-slate-300 rounded text-xs focus:outline-none focus:border-teal-500 bg-white font-mono"
                />
              </div>
            </div>

            {/* Experience */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              <label className="sm:col-span-3 text-right font-bold text-slate-700">
                Experience <span className="text-red-500">*</span>
              </label>
              <div className="sm:col-span-9">
                <input
                  type="text"
                  required
                  placeholder="e.g. Fresher or 2 Years"
                  value={regForm.experience}
                  onChange={(e) => setRegForm({ ...regForm, experience: e.target.value })}
                  className="w-full max-w-lg px-3 py-1.5 border border-slate-300 rounded text-xs focus:outline-none focus:border-teal-500 bg-white"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: Identity & Contact Details (Screenshot 3) */}
          <div className="border-t border-slate-200 pt-5 space-y-4 max-w-4xl mx-auto">
            {/* Aadhar & PAN */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-slate-700">Aadhar No. <span className="text-red-500">*</span></label>
                  <span className="text-red-500 cursor-pointer hover:underline text-[11px] font-medium">*View Aadhar</span>
                </div>
                <input
                  type="text"
                  placeholder="Enter Aadhar Number"
                  value={regForm.aadharNo}
                  onChange={(e) => setRegForm({ ...regForm, aadharNo: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs focus:outline-none focus:border-teal-500 bg-white font-mono"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-slate-700">PAN No. <span className="text-red-500">*</span></label>
                  <span className="text-red-500 cursor-pointer hover:underline text-[11px] font-medium">*View PAN</span>
                </div>
                <input
                  type="text"
                  placeholder="Enter PAN Number"
                  value={regForm.panNo}
                  onChange={(e) => setRegForm({ ...regForm, panNo: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs focus:outline-none focus:border-teal-500 bg-white font-mono uppercase"
                />
              </div>
            </div>

            {/* Email 1 & 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Email ID 1 <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-2.5 top-2" />
                  <input
                    type="email"
                    required
                    placeholder="Enter Email ID 1"
                    value={regForm.email1}
                    onChange={(e) => setRegForm({ ...regForm, email1: e.target.value })}
                    className="w-full pl-9 pr-3 py-1.5 border border-slate-300 rounded text-xs focus:outline-none focus:border-teal-500 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Email ID 2</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-2.5 top-2" />
                  <input
                    type="email"
                    placeholder="Enter Email ID 2"
                    value={regForm.email2}
                    onChange={(e) => setRegForm({ ...regForm, email2: e.target.value })}
                    className="w-full pl-9 pr-3 py-1.5 border border-slate-300 rounded text-xs focus:outline-none focus:border-teal-500 bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Mobile 1 & 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Mobile No. 1 <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-2.5 top-2" />
                  <input
                    type="text"
                    required
                    placeholder="Enter Mobile Number 1"
                    value={regForm.mobile1}
                    onChange={(e) => setRegForm({ ...regForm, mobile1: e.target.value })}
                    className="w-full pl-9 pr-3 py-1.5 border border-slate-300 rounded text-xs focus:outline-none focus:border-teal-500 bg-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Mobile No. 2</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-2.5 top-2" />
                  <input
                    type="text"
                    placeholder="Enter Mobile Number 2"
                    value={regForm.mobile2}
                    onChange={(e) => setRegForm({ ...regForm, mobile2: e.target.value })}
                    className="w-full pl-9 pr-3 py-1.5 border border-slate-300 rounded text-xs focus:outline-none focus:border-teal-500 bg-white font-mono"
                  />
                </div>
              </div>
            </div>

            {/* WhatsApp & Emergency */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">WhatsApp No. <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  placeholder="WhatsApp No.(Add Contry Code eg:919876543210)"
                  value={regForm.whatsAppNo}
                  onChange={(e) => setRegForm({ ...regForm, whatsAppNo: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs focus:outline-none focus:border-teal-500 bg-white font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Emergency Contact No. <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  placeholder="Enter Emergency Contact No."
                  value={regForm.emergencyContact}
                  onChange={(e) => setRegForm({ ...regForm, emergencyContact: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs focus:outline-none focus:border-teal-500 bg-white font-mono"
                />
              </div>
            </div>

            {/* Local & Permanent Address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Local Address <span className="text-red-500">*</span></label>
                <textarea
                  rows={3}
                  placeholder="Local Address (Maximum 250 characters)"
                  value={regForm.localAddress}
                  onChange={(e) => setRegForm({ ...regForm, localAddress: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs focus:outline-none focus:border-teal-500 bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Permanent Address <span className="text-red-500">*</span></label>
                <textarea
                  rows={3}
                  placeholder="Permanent Address (Maximum 250 characters)"
                  value={regForm.permanentAddress}
                  onChange={(e) => setRegForm({ ...regForm, permanentAddress: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs focus:outline-none focus:border-teal-500 bg-white"
                />
              </div>
            </div>

            {/* Document Review Links */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-[11px]">
              <div>
                <span className="font-bold text-slate-700">Consent Form <span className="text-red-500">*</span></span>
                <span className="text-red-500 ml-1 cursor-pointer hover:underline block font-medium">View Consent Form</span>
              </div>
              <div>
                <span className="font-bold text-slate-700">Placement Assitance Document <span className="text-red-500">*</span></span>
                <span className="text-red-500 ml-1 cursor-pointer hover:underline block font-medium">View Placement Assitance Document</span>
              </div>
              <div>
                <span className="font-bold text-slate-700">Cancelation & Refund Policy <span className="text-red-500">*</span></span>
                <span className="text-red-500 ml-1 cursor-pointer hover:underline block font-medium">View Cancelation & Refund Document</span>
              </div>
            </div>
          </div>

          {/* SECTION 3: Course & Fee Details (Screenshot 4) */}
          <div className="border-t border-slate-200 pt-5 space-y-3.5 max-w-4xl mx-auto">
            {/* Blood Group */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              <label className="sm:col-span-3 text-right font-bold text-slate-700">
                Blood Group <span className="text-red-500">*</span>
              </label>
              <div className="sm:col-span-9">
                <select
                  value={regForm.bloodGroup}
                  onChange={(e) => setRegForm({ ...regForm, bloodGroup: e.target.value })}
                  className="w-full max-w-lg px-3 py-1.5 border border-slate-300 rounded text-xs focus:outline-none bg-white"
                >
                  <option value="Select Blood Group">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
            </div>

            {/* Branch */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              <label className="sm:col-span-3 text-right font-bold text-slate-700">
                Branch <span className="text-red-500">*</span>
              </label>
              <div className="sm:col-span-9">
                <select
                  value={regForm.branch}
                  onChange={(e) => setRegForm({ ...regForm, branch: e.target.value })}
                  className="w-full max-w-lg px-3 py-1.5 border border-slate-300 rounded text-xs focus:outline-none bg-white font-medium"
                >
                  <option value="Select Branch">Select Branch</option>
                  <option value="BANGALORE">BANGALORE</option>
                  <option value="BHUBANESHWAR">BHUBANESHWAR</option>
                  <option value="DUBAI">DUBAI</option>
                </select>
              </div>
            </div>

            {/* Batch ID */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              <label className="sm:col-span-3 text-right font-bold text-slate-700">
                Batch ID <span className="text-red-500">*</span>
              </label>
              <div className="sm:col-span-9">
                <select
                  value={regForm.batchId}
                  onChange={(e) => setRegForm({ ...regForm, batchId: e.target.value })}
                  className="w-full max-w-lg px-3 py-1.5 border border-slate-300 rounded text-xs focus:outline-none bg-white"
                >
                  <option value="Select Batch">Select Batch</option>
                  {initialBatchesMaster.map(b => (
                    <option key={b.id} value={b.batchName}>{b.batchName}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Course */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              <label className="sm:col-span-3 text-right font-bold text-slate-700">
                Course <span className="text-red-500">*</span>
              </label>
              <div className="sm:col-span-9">
                <select
                  value={regForm.course}
                  onChange={(e) => handleCourseChange(e.target.value)}
                  className="w-full max-w-lg px-3 py-1.5 border border-slate-300 rounded text-xs focus:outline-none bg-white font-semibold"
                >
                  <option value="Select Course">Select Course</option>
                  {initialCoursesMaster.map(c => (
                    <option key={c.id} value={c.courseName}>{c.courseName}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Course Fee */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              <label className="sm:col-span-3 text-right font-bold text-slate-700">
                Course Fee <span className="text-red-500">*</span>
              </label>
              <div className="sm:col-span-9">
                <input
                  type="text"
                  readOnly
                  value={regForm.courseFee}
                  className="w-full max-w-lg px-3 py-1.5 border border-slate-300 rounded text-xs bg-slate-100 font-mono font-bold text-slate-700"
                />
              </div>
            </div>

            {/* Discount Type & Value */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              <label className="sm:col-span-3 text-right font-bold text-slate-700">
                Discount Type
              </label>
              <div className="sm:col-span-9 flex items-center gap-2 max-w-lg">
                <select
                  value={regForm.discountType}
                  onChange={(e) => setRegForm({ ...regForm, discountType: e.target.value })}
                  className="flex-1 px-3 py-1.5 border border-slate-300 rounded text-xs focus:outline-none bg-white"
                >
                  <option value="Select Discount">Select Discount</option>
                  <option value="Scholarship">Scholarship</option>
                  <option value="Early Bird">Early Bird</option>
                  <option value="Corporate">Corporate</option>
                </select>
                <input
                  type="number"
                  placeholder="Discount Value"
                  value={regForm.discountValue}
                  onChange={(e) => handleDiscountChange(e.target.value)}
                  className="w-32 px-3 py-1.5 border border-slate-300 rounded text-xs focus:outline-none bg-white font-mono"
                />
              </div>
            </div>

            {/* Committed Fee */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              <label className="sm:col-span-3 text-right font-bold text-slate-700">
                Committed Fee <span className="text-red-500">*</span>
              </label>
              <div className="sm:col-span-9">
                <input
                  type="text"
                  readOnly
                  value={regForm.committedFee}
                  className="w-full max-w-lg px-3 py-1.5 border border-slate-300 rounded text-xs bg-slate-100 font-mono font-bold text-emerald-700"
                />
              </div>
            </div>

            {/* No. Of Installment */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              <label className="sm:col-span-3 text-right font-bold text-slate-700">
                No. Of Installment <span className="text-red-500">*</span>
              </label>
              <div className="sm:col-span-9">
                <select
                  value={regForm.installment}
                  onChange={(e) => setRegForm({ ...regForm, installment: e.target.value })}
                  className="w-full max-w-lg px-3 py-1.5 border border-slate-300 rounded text-xs focus:outline-none bg-white"
                >
                  <option value="Select Installment">Select Installment</option>
                  <option value="1">1 Installment (Full Payment)</option>
                  <option value="2">2 Installments</option>
                  <option value="3">3 Installments</option>
                  <option value="4">4 Installments</option>
                </select>
              </div>
            </div>

            {/* Payment By */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              <label className="sm:col-span-3 text-right font-bold text-slate-700">
                Payment By <span className="text-red-500">*</span>
              </label>
              <div className="sm:col-span-9 flex items-center gap-4">
                <label className="flex items-center gap-1.5 cursor-pointer font-semibold text-slate-800">
                  <input
                    type="radio"
                    name="paymentBy"
                    value="Student"
                    checked={regForm.paymentBy === 'Student'}
                    onChange={() => setRegForm({ ...regForm, paymentBy: 'Student' })}
                    className="text-teal-600 focus:ring-teal-500"
                  />
                  <span>Student</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer font-semibold text-slate-800">
                  <input
                    type="radio"
                    name="paymentBy"
                    value="Bank"
                    checked={regForm.paymentBy === 'Bank'}
                    onChange={() => setRegForm({ ...regForm, paymentBy: 'Bank' })}
                    className="text-teal-600 focus:ring-teal-500"
                  />
                  <span>Bank</span>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex items-center gap-2 max-w-lg sm:ml-[25%]">
              <button
                type="submit"
                className="bg-[#26b99a] hover:bg-[#1f967d] text-white font-bold text-xs px-5 py-2 rounded-[3px] shadow-2xs cursor-pointer transition-colors"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className="bg-[#337ab7] hover:bg-[#286090] text-white font-bold text-xs px-5 py-2 rounded-[3px] shadow-2xs cursor-pointer transition-colors"
              >
                Back
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER LIST MODE (Exact match for Screenshot 1: Reg.aspx)
  // -------------------------------------------------------------
  return (
    <div className="space-y-4 font-sans">
      {/* Top Action Button */}
      <div>
        <button
          onClick={() => setViewMode('add')}
          className="bg-[#26B99A] hover:bg-[#1f967d] text-white text-xs font-semibold px-3 py-1.5 rounded-[3px] shadow-2xs cursor-pointer inline-flex items-center gap-1 transition-colors"
        >
          Create Registration
        </button>
      </div>

      {/* Filter Bar (Matches Screenshot 1) */}
      <div className="bg-white p-4 rounded-sm border border-slate-200 shadow-2xs flex flex-wrap items-end gap-3 text-xs">
        <div>
          <label className="block text-slate-600 font-semibold mb-1">From Date</label>
          <div className="relative">
            <input
              type="date"
              value={filterFromDate}
              onChange={(e) => setFilterFromDate(e.target.value)}
              className="border border-slate-300 rounded px-2.5 py-1.5 text-xs bg-white focus:outline-none focus:border-teal-500 w-36"
            />
          </div>
        </div>

        <div>
          <label className="block text-slate-600 font-semibold mb-1">To Date</label>
          <div className="relative">
            <input
              type="date"
              value={filterToDate}
              onChange={(e) => setFilterToDate(e.target.value)}
              className="border border-slate-300 rounded px-2.5 py-1.5 text-xs bg-white focus:outline-none focus:border-teal-500 w-36"
            />
          </div>
        </div>

        <div>
          <label className="block text-slate-600 font-semibold mb-1">Course ID</label>
          <select
            value={filterCourse}
            onChange={(e) => setFilterCourse(e.target.value)}
            className="border border-slate-300 rounded px-2.5 py-1.5 text-xs bg-white focus:outline-none focus:border-teal-500 min-w-[140px]"
          >
            <option value="All Course">All Course</option>
            {initialCoursesMaster.map(c => (
              <option key={c.id} value={c.courseName}>{c.courseName}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-slate-600 font-semibold mb-1">Batch ID</label>
          <select
            value={filterBatch}
            onChange={(e) => setFilterBatch(e.target.value)}
            className="border border-slate-300 rounded px-2.5 py-1.5 text-xs bg-white focus:outline-none focus:border-teal-500 min-w-[140px]"
          >
            <option value="All Batch">All Batch</option>
            {initialBatchesMaster.map(b => (
              <option key={b.id} value={b.batchName}>{b.batchName}</option>
            ))}
          </select>
        </div>

        <div>
          <button
            onClick={() => showToast(`Filter applied: ${filterCourse}, ${filterBatch}`)}
            className="bg-[#337ab7] hover:bg-[#286090] text-white font-bold text-xs px-5 py-1.5 rounded-[3px] shadow-2xs cursor-pointer transition-colors"
          >
            Search
          </button>
        </div>
      </div>

      {/* Table Controls */}
      <TableControls
        pageSize={pageSize}
        setPageSize={setPageSize}
        search={search}
        setSearch={setSearch}
        onPageReset={() => setCurrentPage(1)}
      />

      {/* Registered Students Table */}
      <div className="overflow-x-auto border border-slate-200 bg-white">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-300 bg-white">
              <th className="border border-slate-200 px-3 py-2.5 font-bold text-slate-800 text-center select-none w-14">
                <div className="flex items-center justify-center gap-1">
                  <span>S.No</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
              <th className="border border-slate-200 px-4 py-2.5 font-bold text-slate-800 text-center select-none">
                <div className="flex items-center justify-center gap-1">
                  <span>Student ID / Roll</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
              <th className="border border-slate-200 px-4 py-2.5 font-bold text-slate-800 text-center select-none">
                <div className="flex items-center justify-center gap-1">
                  <span>Student Name</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
              <th className="border border-slate-200 px-4 py-2.5 font-bold text-slate-800 text-center select-none">
                <div className="flex items-center justify-center gap-1">
                  <span>Course</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
              <th className="border border-slate-200 px-4 py-2.5 font-bold text-slate-800 text-center select-none">
                <div className="flex items-center justify-center gap-1">
                  <span>Batch</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
              <th className="border border-slate-200 px-4 py-2.5 font-bold text-slate-800 text-center select-none">
                <div className="flex items-center justify-center gap-1">
                  <span>Total Fee</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
              <th className="border border-slate-200 px-4 py-2.5 font-bold text-slate-800 text-center select-none">
                <div className="flex items-center justify-center gap-1">
                  <span>Paid</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
              <th className="border border-slate-200 px-4 py-2.5 font-bold text-slate-800 text-center select-none">
                <div className="flex items-center justify-center gap-1">
                  <span>Due</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
              <th className="border border-slate-200 px-4 py-2.5 font-bold text-slate-800 text-center select-none w-28">
                <div className="flex items-center justify-center gap-1">
                  <span>Action</span>
                  <span className="text-slate-400 text-[10px]">⇅</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedStudents.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-6 text-slate-500">No matching registration records</td>
              </tr>
            ) : (
              paginatedStudents.map((s, idx) => (
                <tr key={s.id || idx} className="hover:bg-slate-50 border-b border-slate-200 transition-colors">
                  <td className="border border-slate-200 px-3 py-2 text-center text-slate-700">
                    {(currentPage - 1) * pageSize + idx + 1}
                  </td>
                  <td className="border border-slate-200 px-4 py-2 text-center text-slate-700 font-mono">
                    {s.rollNo || `DVA-2026-${100 + idx}`}
                  </td>
                  <td className="border border-slate-200 px-4 py-2 text-center text-slate-800 font-medium">
                    {s.name}
                  </td>
                  <td className="border border-slate-200 px-4 py-2 text-center text-slate-700">
                    {s.course}
                  </td>
                  <td className="border border-slate-200 px-4 py-2 text-center text-slate-700">
                    {s.batch}
                  </td>
                  <td className="border border-slate-200 px-4 py-2 text-center text-slate-700 font-mono">
                    {s.totalFee}
                  </td>
                  <td className="border border-slate-200 px-4 py-2 text-center text-emerald-700 font-mono font-bold">
                    {s.paidFee}
                  </td>
                  <td className="border border-slate-200 px-4 py-2 text-center text-red-600 font-mono">
                    {s.dueFee}
                  </td>
                  <td className="border border-slate-200 px-3 py-2 text-center whitespace-nowrap">
                    <button
                      onClick={() => {
                        window.location.hash = '/admin/Fee.aspx';
                        showToast(`Initiating fee payment for ${s.name}`);
                      }}
                      className="bg-[#337ab7] hover:bg-[#286090] text-white px-2.5 py-0.5 rounded-[3px] border border-[#2e6da4] text-[11px] font-medium cursor-pointer shadow-2xs"
                    >
                      Collect Fee
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalEntries={filteredStudents.length}
        pageSize={pageSize}
        setPage={setCurrentPage}
      />
    </div>
  );
}

// =========================================================================
// 12. FEE VIEW (Screenshot 5: Fee.aspx)
// =========================================================================
export function FeeView({ showToast }) {
  const students = useMemo(() => getStoredStudents(), []);
  const [feeForm, setFeeForm] = useState({
    date: "01-10-2026",
    studentId: "9955774102",
    committedFee: "65000",
    batch: "BATCH 202606",
    course: "APIDS",
    balance: "30000",
    amount: "35000",
    modeOfPay: "UPI",
    remarks: "Quarterly installment paid via UPI",
    refDoc: ""
  });

  const handleStudentIdChange = (idVal) => {
    setFeeForm(prev => ({
      ...prev,
      studentId: idVal
    }));
    const found = students.find(s => s.phone === idVal || s.rollNo?.includes(idVal));
    if (found) {
      const commFee = parseInt(found.totalFee?.replace(/[^0-9]/g, '') || 65000);
      const paid = parseInt(found.paidFee?.replace(/[^0-9]/g, '') || 0);
      const bal = Math.max(0, commFee - paid);
      setFeeForm(prev => ({
        ...prev,
        committedFee: commFee.toString(),
        batch: found.batch,
        course: found.course,
        balance: bal.toString(),
        remarks: `Payment collection for ${found.name} (${found.rollNo || idVal})`
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!feeForm.studentId || !feeForm.amount) {
      alert("Please provide Student ID and Amount");
      return;
    }

    saveAdminFee({
      date: feeForm.date,
      studentId: feeForm.studentId,
      studentName: students.find(s => s.phone === feeForm.studentId)?.name || "STUDENT " + feeForm.studentId,
      committedFee: feeForm.committedFee,
      batch: feeForm.batch,
      course: feeForm.course,
      balance: Math.max(0, parseInt(feeForm.balance || 0) - parseInt(feeForm.amount || 0)).toString(),
      amount: feeForm.amount,
      modeOfPay: feeForm.modeOfPay,
      remarks: feeForm.remarks,
      referenceDoc: feeForm.refDoc || "Receipt_INV_88392.pdf"
    });

    showToast(`✓ Fee payment of ₹${parseInt(feeForm.amount).toLocaleString('en-IN')} submitted successfully!`);
    setFeeForm(prev => ({
      ...prev,
      amount: "",
      balance: Math.max(0, parseInt(prev.balance || 0) - parseInt(prev.amount || 0)).toString()
    }));
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-sm border border-slate-200 shadow-2xs font-sans text-xs space-y-4 max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Date */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          <label className="sm:col-span-3 text-right font-bold text-slate-700">
            Date <span className="text-red-500">*</span>
          </label>
          <div className="sm:col-span-9">
            <input
              type="text"
              required
              value={feeForm.date}
              onChange={(e) => setFeeForm({ ...feeForm, date: e.target.value })}
              className="w-full max-w-lg px-3 py-1.5 border border-slate-300 rounded text-xs focus:outline-none focus:border-teal-500 bg-white"
            />
          </div>
        </div>

        {/* Student ID */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          <label className="sm:col-span-3 text-right font-bold text-slate-700">
            Student ID <span className="text-red-500">*</span>
          </label>
          <div className="sm:col-span-9">
            <input
              type="text"
              required
              placeholder="e.g. 9955774102 or Student Roll"
              value={feeForm.studentId}
              onChange={(e) => handleStudentIdChange(e.target.value)}
              className="w-full max-w-lg px-3 py-1.5 border border-slate-300 rounded text-xs focus:outline-none focus:border-teal-500 bg-white font-mono font-medium"
            />
          </div>
        </div>

        {/* Committed Fee */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          <label className="sm:col-span-3 text-right font-bold text-slate-700">
            Commited Fee <span className="text-red-500">*</span>
          </label>
          <div className="sm:col-span-9">
            <input
              type="text"
              readOnly
              value={feeForm.committedFee}
              className="w-full max-w-lg px-3 py-1.5 border border-slate-300 rounded text-xs bg-slate-100 font-mono font-bold text-slate-700"
            />
          </div>
        </div>

        {/* Batch */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          <label className="sm:col-span-3 text-right font-bold text-slate-700">
            Batch <span className="text-red-500">*</span>
          </label>
          <div className="sm:col-span-9">
            <select
              value={feeForm.batch}
              onChange={(e) => setFeeForm({ ...feeForm, batch: e.target.value })}
              className="w-full max-w-lg px-3 py-1.5 border border-slate-300 rounded text-xs focus:outline-none bg-white"
            >
              {initialBatchesMaster.map(b => (
                <option key={b.id} value={b.batchName}>{b.batchName}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Course */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          <label className="sm:col-span-3 text-right font-bold text-slate-700">
            Course <span className="text-red-500">*</span>
          </label>
          <div className="sm:col-span-9">
            <select
              value={feeForm.course}
              onChange={(e) => setFeeForm({ ...feeForm, course: e.target.value })}
              className="w-full max-w-lg px-3 py-1.5 border border-slate-300 rounded text-xs focus:outline-none bg-white font-semibold"
            >
              {initialCoursesMaster.map(c => (
                <option key={c.id} value={c.courseName}>{c.courseName}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Balance */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          <label className="sm:col-span-3 text-right font-bold text-slate-700">
            Balance <span className="text-red-500">*</span>
          </label>
          <div className="sm:col-span-9">
            <input
              type="text"
              readOnly
              value={feeForm.balance}
              className="w-full max-w-lg px-3 py-1.5 border border-slate-300 rounded text-xs bg-slate-100 font-mono font-bold text-red-600"
            />
          </div>
        </div>

        {/* Amount */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          <label className="sm:col-span-3 text-right font-bold text-slate-700">
            Amount <span className="text-red-500">*</span>
          </label>
          <div className="sm:col-span-9">
            <input
              type="number"
              required
              placeholder="Enter Installment Amount"
              value={feeForm.amount}
              onChange={(e) => setFeeForm({ ...feeForm, amount: e.target.value })}
              className="w-full max-w-lg px-3 py-1.5 border border-slate-300 rounded text-xs focus:outline-none focus:border-teal-500 bg-white font-mono font-bold text-slate-800"
            />
          </div>
        </div>

        {/* Mode Of Pay */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          <label className="sm:col-span-3 text-right font-bold text-slate-700">
            Mode Of Pay <span className="text-red-500">*</span>
          </label>
          <div className="sm:col-span-9">
            <select
              value={feeForm.modeOfPay}
              onChange={(e) => setFeeForm({ ...feeForm, modeOfPay: e.target.value })}
              className="w-full max-w-lg px-3 py-1.5 border border-slate-300 rounded text-xs focus:outline-none bg-white font-medium"
            >
              <option value="Select Mode of Pay">Select Mode of Pay</option>
              <option value="UPI">UPI</option>
              <option value="Net Banking">Net Banking</option>
              <option value="Debit / Credit Card">Debit / Credit Card</option>
              <option value="Cash">Cash</option>
              <option value="Cheque">Cheque</option>
            </select>
          </div>
        </div>

        {/* Remarks */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-start">
          <label className="sm:col-span-3 text-right font-bold text-slate-700 pt-1.5">
            Remarks
          </label>
          <div className="sm:col-span-9">
            <textarea
              rows={3}
              placeholder="Enter payment notes, UTR, or bank reference"
              value={feeForm.remarks}
              onChange={(e) => setFeeForm({ ...feeForm, remarks: e.target.value })}
              className="w-full max-w-lg px-3 py-1.5 border border-slate-300 rounded text-xs focus:outline-none focus:border-teal-500 bg-white"
            />
          </div>
        </div>

        {/* Upload Reference Document */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          <label className="sm:col-span-3 text-right font-bold text-slate-700">
            Upload Reference Document
          </label>
          <div className="sm:col-span-9">
            <input
              type="file"
              onChange={(e) => setFeeForm({ ...feeForm, refDoc: e.target.files?.[0]?.name || "" })}
              className="text-xs text-slate-600 file:mr-3 file:py-1 file:px-3 file:rounded file:border file:border-slate-300 file:text-xs file:bg-slate-50 hover:file:bg-slate-100 cursor-pointer"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2 sm:ml-[25%]">
          <button
            type="submit"
            className="bg-[#26b99a] hover:bg-[#1f967d] text-white font-bold text-xs px-6 py-2 rounded-[3px] shadow-2xs cursor-pointer transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

// =========================================================================
// 13. LIVE SESSION VIEW (Screenshots 1 & 2: edu.dvanalyticsmds.com/admin/Session.aspx)
// =========================================================================
export function LiveSessionView({ showToast }) {
  const [sessionsMap, setSessionsMap] = useState(() => getAllStoredSessions());
  const [filterBatch, setFilterBatch] = useState("All Batch");
  const [filterApp, setFilterApp] = useState("Select Application");
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // Form matching Screenshot 2
  const [form, setForm] = useState({
    date: "01-10-2026",
    mentor: "Select Mentor",
    batch: "Batch 202209",
    application: "Select Application",
    sessionTitle: "",
    sortOrder: "1",
    uploadedLink: "",
    topicType: "CLASS VIDEOS"
  });

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!form.sessionTitle.trim()) {
      showToast("Please enter a session title");
      return;
    }
    saveAdminSession({
      date: form.date,
      mentor: form.mentor === "Select Mentor" ? "Dr. Sandip Mukherjee" : form.mentor,
      batch: form.batch,
      application: form.application === "Select Application" ? "EXCEL BASE AND ADVANCED" : form.application,
      sessionTitle: form.sessionTitle.trim(),
      sortOrder: form.sortOrder,
      topicType: form.topicType,
      uploadedLink: form.uploadedLink || "https://embed.vdocipher.com/demo/stream-preview",
      description: `${form.sessionTitle} Video Lecture`
    });
    setSessionsMap(getAllStoredSessions());
    setCreateModalOpen(false);
    showToast(`Session "${form.sessionTitle}" created and live in student LMS!`);
    setForm({
      date: "01-10-2026",
      mentor: "Select Mentor",
      batch: "Batch 202209",
      application: "Select Application",
      sessionTitle: "",
      sortOrder: "1",
      uploadedLink: "",
      topicType: "CLASS VIDEOS"
    });
  };

  // Convert sessionsMap into flat array for display
  const allSessionsList = useMemo(() => {
    const list = [];
    Object.entries(sessionsMap).forEach(([subj, sessions]) => {
      (sessions || []).forEach((s, idx) => {
        list.push({
          id: s.id || `${subj}-${idx}`,
          subjectKey: subj,
          title: s.title || `Session ${idx + 1}`,
          application: subj.toUpperCase() === 'EXCEL' ? 'EXCEL BASE AND ADVANCED' : (subj.toUpperCase() === 'SQL' ? 'SQL SERVER' : 'PYTHON PROGRAMMING'),
          batch: s.batch || 'Batch 202209',
          date: s.recordingDate || '2026-09-15',
          mentor: s.instructor || 'Dr. Sandip Mukherjee',
          sortOrder: idx + 1,
          videoUrl: s.vdocipherEmbedUrl || s.videoUrl || s.driveFolderUrl || ''
        });
      });
    });
    return list;
  }, [sessionsMap]);

  const filteredSessions = useMemo(() => {
    return allSessionsList.filter(s => {
      const matchBatch = filterBatch === "All Batch" || s.batch === filterBatch;
      const matchApp = filterApp === "Select Application" || filterApp === "All" || s.application.toLowerCase().includes(filterApp.toLowerCase()) || filterApp.toLowerCase().includes(s.subjectKey);
      return matchBatch && matchApp;
    });
  }, [allSessionsList, filterBatch, filterApp]);

  return (
    <div className="bg-white rounded border border-slate-200 shadow-xs p-6 space-y-5 text-xs font-sans">
      {/* Top Action Button - Exactly as Screenshot 1 */}
      <div>
        <button
          onClick={() => setCreateModalOpen(true)}
          className="bg-[#26b99a] hover:bg-[#1f967d] text-white font-medium text-xs px-3.5 py-1.5 rounded-[3px] shadow-2xs cursor-pointer transition-colors"
        >
          Create Session
        </button>
      </div>

      {/* Filter Bar - Exactly as Screenshot 1 */}
      <div className="bg-slate-50/70 border border-slate-200/90 rounded p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        {/* Batch ID */}
        <div className="flex items-center gap-2 flex-1 max-w-sm">
          <label className="text-slate-700 font-bold whitespace-nowrap text-xs">
            Batch ID
          </label>
          <div className="flex items-center flex-1 border border-slate-300 rounded bg-white overflow-hidden shadow-2xs">
            <select
              value={filterBatch}
              onChange={(e) => setFilterBatch(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="All Batch">All Batch</option>
              {initialBatchesMaster.map(b => (
                <option key={b.id} value={b.batchName}>{b.batchName}</option>
              ))}
            </select>
            <button 
              type="button"
              onClick={() => setFilterBatch("All Batch")}
              title="Reset Batch"
              className="px-2 py-1.5 text-slate-400 hover:text-slate-600 border-l border-slate-200 bg-slate-50 cursor-pointer"
            >
              <Shuffle className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Application */}
        <div className="flex items-center gap-2 flex-1 max-w-sm">
          <label className="text-slate-700 font-bold whitespace-nowrap text-xs">
            Application
          </label>
          <div className="flex items-center flex-1 border border-slate-300 rounded bg-white overflow-hidden shadow-2xs">
            <select
              value={filterApp}
              onChange={(e) => setFilterApp(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="Select Application">Select Application</option>
              {masterApplicationDropdownList.map((app, idx) => (
                <option key={idx} value={app}>{app}</option>
              ))}
            </select>
            <button 
              type="button"
              onClick={() => setFilterApp("Select Application")}
              title="Reset Application"
              className="px-2 py-1.5 text-slate-400 hover:text-slate-600 border-l border-slate-200 bg-slate-50 cursor-pointer"
            >
              <Shuffle className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Blue Search Button */}
        <div>
          <button
            type="button"
            onClick={() => showToast(`Search applied for ${filterBatch} | ${filterApp}`)}
            className="bg-[#337ab7] hover:bg-[#286090] text-white font-medium text-xs px-5 py-1.5 rounded-[3px] shadow-2xs cursor-pointer transition-colors"
          >
            Search
          </button>
        </div>
      </div>

      {/* Sessions Data Table */}
      <div className="overflow-x-auto border border-slate-200 rounded">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-[#2A3F54] text-white">
            <tr>
              <th className="py-2.5 px-3">#</th>
              <th className="py-2.5 px-3">Date</th>
              <th className="py-2.5 px-3">Batch</th>
              <th className="py-2.5 px-3">Application</th>
              <th className="py-2.5 px-3">Session Title</th>
              <th className="py-2.5 px-3">Mentor</th>
              <th className="py-2.5 px-3 text-center">Order</th>
              <th className="py-2.5 px-3">Content Link</th>
              <th className="py-2.5 px-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredSessions.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-6 text-center text-slate-400 font-medium">
                  No sessions found matching current filter. Click "Create Session" above to add new lectures.
                </td>
              </tr>
            ) : (
              filteredSessions.map((s, idx) => (
                <tr key={s.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-mono text-slate-400">{idx + 1}</td>
                  <td className="py-2.5 px-3 font-mono">{s.date}</td>
                  <td className="py-2.5 px-3 font-mono font-medium text-teal-700">{s.batch}</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-800">{s.application}</td>
                  <td className="py-2.5 px-3 font-bold text-slate-900">{s.title}</td>
                  <td className="py-2.5 px-3 text-slate-600">{s.mentor}</td>
                  <td className="py-2.5 px-3 text-center font-mono">{s.sortOrder}</td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-blue-600 truncate max-w-[200px]">
                    {s.videoUrl ? (
                      <span className="flex items-center gap-1">
                        <Video className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span className="truncate">{s.videoUrl}</span>
                      </span>
                    ) : (
                      <span className="text-slate-400">Class Materials</span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <button
                      onClick={() => showToast(`Playing/Verifying: ${s.title}`)}
                      className="bg-[#26b99a] hover:bg-[#1f967d] text-white px-2 py-0.5 rounded-[3px] text-[10px] font-medium cursor-pointer shadow-2xs"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* CREATE SESSION MODAL - Exactly matching Screenshot 2 */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded shadow-2xl max-w-md w-full p-6 space-y-4 text-xs font-sans border border-slate-300 animate-in fade-in zoom-in-95">
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-2.5">
              <h3 className="font-semibold text-sm text-slate-800">Create Session</h3>
              <button
                type="button"
                onClick={() => setCreateModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold leading-none cursor-pointer"
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleCreateSubmit} className="space-y-3.5 pt-1">
              {/* Date * */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Date<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="dd-mm-yyyy"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full border border-slate-300 rounded px-3 py-1.5 focus:outline-none focus:border-teal-500 bg-white font-mono text-xs"
                  />
                  <Calendar className="w-4 h-4 text-slate-400 absolute right-3 top-2 pointer-events-none" />
                </div>
              </div>

              {/* Mentor * */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Mentor<span className="text-red-500">*</span>
                </label>
                <select
                  value={form.mentor}
                  onChange={(e) => setForm({ ...form, mentor: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-1.5 focus:outline-none focus:border-teal-500 bg-white text-xs"
                >
                  <option value="Select Mentor">Select Mentor</option>
                  {initialMentorsMaster.map(m => (
                    <option key={m.id} value={m.mentorName}>{m.mentorName}</option>
                  ))}
                  <option value="Dr. Sandip Mukherjee">Dr. Sandip Mukherjee</option>
                  <option value="SAJID">SAJID</option>
                </select>
              </div>

              {/* Batch * */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Batch<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Batch 202209 or BATCH 202606"
                  value={form.batch}
                  onChange={(e) => setForm({ ...form, batch: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-1.5 focus:outline-none focus:border-teal-500 bg-white text-xs font-mono"
                />
              </div>

              {/* Application * */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Application<span className="text-red-500">*</span>
                </label>
                <select
                  value={form.application}
                  onChange={(e) => setForm({ ...form, application: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-1.5 focus:outline-none focus:border-teal-500 bg-white text-xs"
                >
                  <option value="Select Application">Select Application</option>
                  {masterApplicationDropdownList.filter(a => a !== 'All').map((app, idx) => (
                    <option key={idx} value={app}>{app}</option>
                  ))}
                </select>
              </div>

              {/* Session * */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Session<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. B1.SESSION-1 or Advanced Pivot Tables"
                  value={form.sessionTitle}
                  onChange={(e) => setForm({ ...form, sessionTitle: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-1.5 focus:outline-none focus:border-teal-500 bg-white text-xs font-medium"
                />
              </div>

              {/* Sort Order * */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Sort Order<span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  value={form.sortOrder}
                  onChange={(e) => setForm({ ...form, sortOrder: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-1.5 focus:outline-none focus:border-teal-500 bg-white text-xs font-mono"
                />
              </div>

              {/* Video URL (Seamless LMS live sync) */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Video Embed / Stream URL (Optional)
                </label>
                <input
                  type="text"
                  placeholder="https://player.vdocipher.com/v2/?otp=... or video URL"
                  value={form.uploadedLink}
                  onChange={(e) => setForm({ ...form, uploadedLink: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-1.5 focus:outline-none focus:border-teal-500 bg-white text-xs font-mono"
                />
              </div>

              {/* Modal Footer - Exactly matching Screenshot 2 */}
              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-4 py-1.5 border border-slate-300 rounded hover:bg-slate-100 text-slate-700 cursor-pointer font-medium text-xs transition-colors"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#26b99a] hover:bg-[#1f967d] text-white rounded font-bold cursor-pointer transition-colors shadow-2xs text-xs"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// =========================================================================
// 14. LIVE SESSION - DELETE VIEW (Screenshot 3: edu.dvanalyticsmds.com/admin/sessiondelete.aspx)
// =========================================================================
export function LiveSessionDeleteView({ showToast }) {
  const [sessionsMap, setSessionsMap] = useState(() => getAllStoredSessions());
  const [selectedBatch, setSelectedBatch] = useState("Batch 202209");
  const [selectedApp, setSelectedApp] = useState("EXCEL BASE AND ADVANCED");

  const sessionsList = useMemo(() => {
    const list = [];
    Object.entries(sessionsMap).forEach(([subj, sessions]) => {
      (sessions || []).forEach((s, idx) => {
        list.push({
          id: s.id,
          subjectKey: subj,
          title: s.title || `Session ${idx + 1}`,
          application: subj.toUpperCase() === 'EXCEL' ? 'EXCEL BASE AND ADVANCED' : (subj.toUpperCase() === 'SQL' ? 'SQL SERVER' : 'PYTHON PROGRAMMING'),
          batch: s.batch || 'Batch 202209',
          date: s.recordingDate || '2026-09-15',
          mentor: s.instructor || 'Dr. Sandip Mukherjee'
        });
      });
    });
    return list;
  }, [sessionsMap]);

  const filteredList = useMemo(() => {
    return sessionsList.filter(s => {
      const matchBatch = !selectedBatch || s.batch === selectedBatch;
      const matchApp = selectedApp === "All" || s.application.toLowerCase().includes(selectedApp.toLowerCase()) || selectedApp.toLowerCase().includes(s.subjectKey);
      return matchBatch && matchApp;
    });
  }, [sessionsList, selectedBatch, selectedApp]);

  const handleDelete = (sessionId, subjectKey, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"? This will delete the session from the Student LMS immediately.`)) {
      deleteAdminSession(sessionId, subjectKey);
      setSessionsMap(getAllStoredSessions());
      showToast(`Session "${title}" deleted successfully.`);
    }
  };

  return (
    <div className="bg-white rounded border border-slate-200 shadow-xs p-6 space-y-6 text-xs font-sans">
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Batch * - Tag Pill Box matching Screenshot 3 */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          <label className="sm:col-span-3 text-right font-bold text-slate-700">
            Batch <span className="text-red-500">*</span>
          </label>
          <div className="sm:col-span-9 flex items-center gap-2">
            <div className="w-full flex items-center flex-wrap gap-1.5 px-3 py-1.5 border border-slate-300 rounded bg-white min-h-[34px]">
              {selectedBatch ? (
                <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-800 font-mono text-xs px-2 py-0.5 rounded border border-slate-300">
                  <button
                    type="button"
                    onClick={() => setSelectedBatch("")}
                    className="text-slate-400 hover:text-red-600 font-bold leading-none cursor-pointer"
                  >
                    ×
                  </button>
                  <span>{selectedBatch}</span>
                </span>
              ) : (
                <select
                  onChange={(e) => setSelectedBatch(e.target.value)}
                  className="w-full bg-transparent text-xs focus:outline-none"
                >
                  <option value="">Select Batch to Delete Sessions...</option>
                  {initialBatchesMaster.map(b => (
                    <option key={b.id} value={b.batchName}>{b.batchName}</option>
                  ))}
                </select>
              )}
            </div>
          </div>
        </div>

        {/* Application - Full Dropdown matching Screenshot 3 */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          <label className="sm:col-span-3 text-right font-bold text-slate-700">
            Application
          </label>
          <div className="sm:col-span-9">
            <select
              value={selectedApp}
              onChange={(e) => setSelectedApp(e.target.value)}
              className="w-full px-3 py-1.5 border border-slate-300 rounded bg-white text-xs focus:outline-none font-medium text-slate-800"
            >
              {masterApplicationDropdownList.map((app, idx) => (
                <option key={idx} value={app}>{app}</option>
              ))}
            </select>
          </div>
        </div>

        {/* List label */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-start pt-2">
          <label className="sm:col-span-3 text-right font-bold text-slate-700 pt-1">
            List
          </label>
          <div className="sm:col-span-9 space-y-2">
            <div className="overflow-x-auto border border-slate-200 rounded">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-[#2A3F54] text-white">
                  <tr>
                    <th className="py-2 px-3">Session Title</th>
                    <th className="py-2 px-3">Application</th>
                    <th className="py-2 px-3">Date</th>
                    <th className="py-2 px-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredList.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-5 text-center text-slate-400">
                        No sessions found for {selectedBatch || 'all batches'} in {selectedApp}.
                      </td>
                    </tr>
                  ) : (
                    filteredList.map(s => (
                      <tr key={s.id} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-bold text-slate-800">{s.title}</td>
                        <td className="py-2.5 px-3 text-slate-600">{s.application}</td>
                        <td className="py-2.5 px-3 font-mono">{s.date}</td>
                        <td className="py-2.5 px-3 text-center">
                          <button
                            type="button"
                            onClick={() => handleDelete(s.id, s.subjectKey, s.title)}
                            className="bg-[#d9534f] hover:bg-[#c9302c] text-white px-2.5 py-0.5 rounded-[3px] border border-[#d43f3a] text-[11px] font-medium cursor-pointer shadow-2xs"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// 15. ASSIGNMENT APPROVAL VIEW (Screenshot 4: edu.dvanalyticsmds.com/admin/AssignmentApproval.aspx)
// =========================================================================
export function AssignmentApprovalView({ showToast }) {
  const [assignments, setAssignments] = useState(() => getStoredAssignmentsList());
  const [filterBatch, setFilterBatch] = useState("All Batch");
  const [filterApp, setFilterApp] = useState("All");
  const [reviewModalItem, setReviewModalItem] = useState(null);
  const [gradeInput, setGradeInput] = useState("A+");
  const [remarksInput, setRemarksInput] = useState("");

  const filtered = useMemo(() => {
    return assignments.filter(a => {
      const matchBatch = filterBatch === "All Batch" || a.batch === filterBatch;
      const matchApp = filterApp === "All" || a.application === filterApp;
      return matchBatch && matchApp;
    });
  }, [assignments, filterBatch, filterApp]);

  const handleApprove = (id, studentName) => {
    updateAdminAssignment(id, { status: "Approved", grade: "A" });
    setAssignments(getStoredAssignmentsList());
    showToast(`Assignment for ${studentName} approved!`);
  };

  const handleSaveReview = (e) => {
    e.preventDefault();
    if (!reviewModalItem) return;
    updateAdminAssignment(reviewModalItem.id, {
      status: "Approved",
      grade: gradeInput,
      remarks: remarksInput
    });
    setAssignments(getStoredAssignmentsList());
    setReviewModalItem(null);
    showToast(`Feedback submitted for ${reviewModalItem.studentName}!`);
  };

  return (
    <div className="bg-white rounded border border-slate-200 shadow-xs p-6 space-y-5 text-xs font-sans">
      {/* Filter Box matching Screenshot 4 */}
      <div className="max-w-md bg-white border border-slate-200 rounded p-4 space-y-3 shadow-2xs">
        {/* Batch */}
        <div>
          <label className="block text-slate-700 font-bold mb-1">Batch</label>
          <select
            value={filterBatch}
            onChange={(e) => setFilterBatch(e.target.value)}
            className="w-full px-3 py-1.5 border border-slate-300 rounded bg-white text-xs focus:outline-none"
          >
            <option value="All Batch">All Batch</option>
            {initialBatchesMaster.map(b => (
              <option key={b.id} value={b.batchName}>{b.batchName}</option>
            ))}
          </select>
        </div>

        {/* Application */}
        <div>
          <label className="block text-slate-700 font-bold mb-1">Application</label>
          <select
            value={filterApp}
            onChange={(e) => setFilterApp(e.target.value)}
            className="w-full px-3 py-1.5 border border-slate-300 rounded bg-white text-xs focus:outline-none"
          >
            {masterApplicationDropdownList.map((app, idx) => (
              <option key={idx} value={app}>{app}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="overflow-x-auto border border-slate-200 rounded">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-[#2A3F54] text-white">
            <tr>
              <th className="py-2.5 px-3">#</th>
              <th className="py-2.5 px-3">Student Name</th>
              <th className="py-2.5 px-3">Roll No</th>
              <th className="py-2.5 px-3">Batch</th>
              <th className="py-2.5 px-3">Application</th>
              <th className="py-2.5 px-3">Task Title</th>
              <th className="py-2.5 px-3">Submitted File</th>
              <th className="py-2.5 px-3">Date</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={10} className="py-6 text-center text-slate-400">
                  No assignment submissions found matching filter criteria.
                </td>
              </tr>
            ) : (
              filtered.map((a, idx) => (
                <tr key={a.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-mono text-slate-400">{idx + 1}</td>
                  <td className="py-2.5 px-3 font-bold text-slate-800">{a.studentName}</td>
                  <td className="py-2.5 px-3 font-mono text-teal-700">{a.rollNo}</td>
                  <td className="py-2.5 px-3 font-mono">{a.batch}</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-700">{a.application}</td>
                  <td className="py-2.5 px-3">{a.title}</td>
                  <td className="py-2.5 px-3">
                    <button
                      onClick={() => showToast(`Downloading: ${a.submittedFile}`)}
                      className="text-blue-600 hover:underline flex items-center gap-1 font-mono text-[11px] cursor-pointer"
                    >
                      <Download className="w-3 h-3" />
                      <span>{a.submittedFile}</span>
                    </button>
                  </td>
                  <td className="py-2.5 px-3 font-mono">{a.submittedDate}</td>
                  <td className="py-2.5 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      a.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {a.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-1.5">
                      {a.status !== 'Approved' && (
                        <button
                          onClick={() => handleApprove(a.id, a.studentName)}
                          className="bg-[#26b99a] hover:bg-[#1f967d] text-white px-2 py-0.5 rounded-[3px] text-[10px] font-medium cursor-pointer shadow-2xs"
                        >
                          Approve
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setReviewModalItem(a);
                          setGradeInput(a.grade || "A+");
                          setRemarksInput(a.remarks || "");
                        }}
                        className="bg-[#337ab7] hover:bg-[#286090] text-white px-2 py-0.5 rounded-[3px] text-[10px] font-medium cursor-pointer shadow-2xs"
                      >
                        Feedback
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Review Modal */}
      {reviewModalItem && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded shadow-2xl max-w-sm w-full p-5 space-y-4 text-xs font-sans border border-slate-300">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-semibold text-sm text-slate-800">Assignment Review</h3>
              <button onClick={() => setReviewModalItem(null)} className="text-slate-400 hover:text-slate-600 font-bold">×</button>
            </div>
            <form onSubmit={handleSaveReview} className="space-y-3">
              <div>
                <span className="block text-slate-500 font-medium">Student</span>
                <span className="font-bold text-slate-800">{reviewModalItem.studentName} ({reviewModalItem.rollNo})</span>
              </div>
              <div>
                <span className="block text-slate-500 font-medium">Task</span>
                <span className="font-medium text-slate-700">{reviewModalItem.title}</span>
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Grade</label>
                <select
                  value={gradeInput}
                  onChange={(e) => setGradeInput(e.target.value)}
                  className="w-full border border-slate-300 rounded px-2.5 py-1.5 focus:outline-none"
                >
                  <option value="A+">A+ (Outstanding)</option>
                  <option value="A">A (Very Good)</option>
                  <option value="B+">B+ (Good)</option>
                  <option value="B">B (Needs Improvement)</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Mentor Feedback / Remarks</label>
                <textarea
                  rows={3}
                  value={remarksInput}
                  onChange={(e) => setRemarksInput(e.target.value)}
                  placeholder="Enter mentor remarks for the student..."
                  className="w-full border border-slate-300 rounded px-2.5 py-1.5 focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setReviewModalItem(null)}
                  className="px-3 py-1.5 border border-slate-300 rounded hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#26b99a] text-white rounded font-bold hover:bg-[#1f967d]"
                >
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// =========================================================================
// 16. UPLOAD RESUME VIEW (Screenshot 5: edu.dvanalyticsmds.com/admin/UploadResume.aspx)
// =========================================================================
export function UploadResumeView({ showToast, onBack }) {
  const [resumes, setResumes] = useState(() => getStoredResumes());
  const [students] = useState(() => getStoredStudents());
  const [form, setForm] = useState({
    batch: "Select Batch",
    course: "Select Course",
    studentId: "Select Student ID",
    pdfLink: "",
    wordLink: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.studentId === "Select Student ID") {
      showToast("Please select a Student ID");
      return;
    }
    const student = students.find(s => s.phone === form.studentId || s.rollNo === form.studentId);
    saveAdminResume({
      studentId: form.studentId,
      studentName: student ? student.name : "SK ABDUL SAJID",
      course: form.course === "Select Course" ? "APIDS" : form.course,
      batch: form.batch === "Select Batch" ? "Batch 202209" : form.batch,
      pdfLink: form.pdfLink,
      wordLink: form.wordLink
    });
    setResumes(getStoredResumes());
    showToast("Resume uploaded successfully!");
    setForm({
      batch: "Select Batch",
      course: "Select Course",
      studentId: "Select Student ID",
      pdfLink: "",
      wordLink: ""
    });
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete resume entry for ${name}?`)) {
      deleteAdminResume(id);
      setResumes(getStoredResumes());
      showToast(`Resume entry for ${name} removed.`);
    }
  };

  return (
    <div className="bg-white rounded border border-slate-200 shadow-xs p-6 space-y-6 text-xs font-sans">
      {/* Centered Form matching Screenshot 5 */}
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
        {/* Batch * */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          <label className="sm:col-span-4 text-right font-bold text-slate-700">
            Batch <span className="text-red-500">*</span>
          </label>
          <div className="sm:col-span-8">
            <select
              value={form.batch}
              onChange={(e) => setForm({ ...form, batch: e.target.value })}
              className="w-full px-3 py-1.5 border border-slate-300 rounded bg-white text-xs focus:outline-none"
            >
              <option value="Select Batch">Select Batch</option>
              {initialBatchesMaster.map(b => (
                <option key={b.id} value={b.batchName}>{b.batchName}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Course * */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          <label className="sm:col-span-4 text-right font-bold text-slate-700">
            Course <span className="text-red-500">*</span>
          </label>
          <div className="sm:col-span-8">
            <select
              value={form.course}
              onChange={(e) => setForm({ ...form, course: e.target.value })}
              className="w-full px-3 py-1.5 border border-slate-300 rounded bg-white text-xs focus:outline-none"
            >
              <option value="Select Course">Select Course</option>
              {initialCoursesMaster.map(c => (
                <option key={c.id} value={c.courseName}>{c.courseName}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Student ID * */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          <label className="sm:col-span-4 text-right font-bold text-slate-700">
            Student ID <span className="text-red-500">*</span>
          </label>
          <div className="sm:col-span-8">
            <select
              value={form.studentId}
              onChange={(e) => setForm({ ...form, studentId: e.target.value })}
              className="w-full px-3 py-1.5 border border-slate-300 rounded bg-white text-xs focus:outline-none font-mono"
            >
              <option value="Select Student ID">Select Student ID</option>
              {students.map(s => (
                <option key={s.id} value={s.phone || s.rollNo}>
                  {s.phone} - {s.name} ({s.rollNo})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Resume Link(PDF) * */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          <label className="sm:col-span-4 text-right font-bold text-slate-700">
            Resume Link(PDF)<span className="text-red-500">*</span>
          </label>
          <div className="sm:col-span-8">
            <input
              type="text"
              required
              placeholder="Enter Google Drive or Cloud link for PDF resume"
              value={form.pdfLink}
              onChange={(e) => setForm({ ...form, pdfLink: e.target.value })}
              className="w-full px-3 py-1.5 border border-slate-300 rounded bg-white text-xs focus:outline-none focus:border-teal-500 font-mono"
            />
          </div>
        </div>

        {/* Resume Link(WORD) * */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          <label className="sm:col-span-4 text-right font-bold text-slate-700">
            Resume Link(WORD)<span className="text-red-500">*</span>
          </label>
          <div className="sm:col-span-8">
            <input
              type="text"
              required
              placeholder="Enter Google Drive or Cloud link for Word (.docx) resume"
              value={form.wordLink}
              onChange={(e) => setForm({ ...form, wordLink: e.target.value })}
              className="w-full px-3 py-1.5 border border-slate-300 rounded bg-white text-xs focus:outline-none focus:border-teal-500 font-mono"
            />
          </div>
        </div>

        {/* Buttons matching Screenshot 5: Submit (Teal) & Back (Blue) */}
        <div className="sm:ml-[33.33%] pt-2 flex items-center gap-3">
          <button
            type="submit"
            className="bg-[#26b99a] hover:bg-[#1f967d] text-white font-medium text-xs px-6 py-2 rounded-[3px] shadow-2xs cursor-pointer transition-colors"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={onBack}
            className="bg-[#337ab7] hover:bg-[#286090] text-white font-medium text-xs px-6 py-2 rounded-[3px] shadow-2xs cursor-pointer transition-colors"
          >
            Back
          </button>
        </div>
      </form>

      {/* Uploaded Resumes Ledger */}
      <div className="pt-6 border-t border-slate-200 space-y-3">
        <span className="font-bold text-xs uppercase tracking-wider text-slate-700 block">
          Uploaded Student Resumes Registry
        </span>
        <div className="overflow-x-auto border border-slate-200 rounded">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-[#2A3F54] text-white">
              <tr>
                <th className="py-2 px-3">Student ID</th>
                <th className="py-2 px-3">Student Name</th>
                <th className="py-2 px-3">Course</th>
                <th className="py-2 px-3">Batch</th>
                <th className="py-2 px-3">PDF Resume</th>
                <th className="py-2 px-3">Word Resume</th>
                <th className="py-2 px-3">Date</th>
                <th className="py-2 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {resumes.map(r => (
                <tr key={r.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-mono font-bold text-teal-700">{r.studentId}</td>
                  <td className="py-2.5 px-3 font-bold text-slate-800">{r.studentName}</td>
                  <td className="py-2.5 px-3 font-semibold text-blue-700">{r.course}</td>
                  <td className="py-2.5 px-3 font-mono">{r.batch}</td>
                  <td className="py-2.5 px-3 font-mono text-[11px]">
                    <a href={r.pdfLink} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      <span>PDF Link</span>
                    </a>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-[11px]">
                    <a href={r.wordLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      <span>DOCX Link</span>
                    </a>
                  </td>
                  <td className="py-2.5 px-3 font-mono">{r.uploadedDate}</td>
                  <td className="py-2.5 px-3 text-center">
                    <button
                      onClick={() => handleDelete(r.id, r.studentName)}
                      className="text-red-500 hover:text-red-700 cursor-pointer p-1"
                      title="Delete Resume"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


