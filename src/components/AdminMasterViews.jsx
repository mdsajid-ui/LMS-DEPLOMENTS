import React, { useState, useMemo } from 'react';
import { 
  initialUsersMaster, 
  initialBranchesMaster, 
  initialSkillsMaster, 
  initialApplicationsMaster, 
  initialCoursesMaster 
} from '../data/adminMasterData';
import { ArrowUpDown, X, Plus, Edit2, Lock, CheckCircle2 } from 'lucide-react';

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
