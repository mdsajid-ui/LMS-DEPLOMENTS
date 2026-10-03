import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Download, 
  Printer, 
  Calendar, 
  Filter, 
  ChevronLeft, 
  ChevronRight, 
  FileSpreadsheet, 
  FileText, 
  DollarSign, 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Building, 
  BookOpen, 
  Award, 
  Star, 
  Layers, 
  Send,
  Eye,
  Check,
  X,
  CreditCard,
  Briefcase
} from 'lucide-react';
import { exportArrayToCsv } from '../utils/excelHelper';
import collectionData from '../data/collectionReportData.json';
import { getStoredStudents, getStoredFees, getStoredAssignmentsList } from '../utils/lmsStorage';

// =========================================================================
// 1. REPORT: INVOICE REPORT (rpt_Invoice.aspx)
// =========================================================================
export function ReportInvoiceView({ showToast }) {
  const [search, setSearch] = useState("");
  const [branch, setBranch] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [fromDate, setFromDate] = useState("2026-01-01");
  const [toDate, setToDate] = useState("2026-12-31");
  const [page, setPage] = useState(1);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Generate realistic invoice entries merged with real collection records
  const invoiceRecords = useMemo(() => {
    const students = getStoredStudents();
    const fees = getStoredFees();

    // Map the first 120 collection transactions to official invoice records
    const seedRecords = collectionData.slice(0, 150).map((c, i) => {
      const invNum = `INV-2026-${String(4000 + i).padStart(5, '0')}`;
      const feeAmt = c.amount || 35000;
      const baseFee = Math.round(feeAmt / 1.18);
      const gst = feeAmt - baseFee;
      const totalCommitted = feeAmt > 40000 ? feeAmt : 65000;
      const status = feeAmt >= totalCommitted ? "Paid in Full" : "Partial Paid";

      return {
        id: invNum,
        date: c.payment_date || "2026-06-15",
        student: c.student,
        rollNo: `DVA-${c.branch}-${c.course}-${String(100 + (i % 800))}`,
        branch: c.branch || "BBSR",
        course: c.course || "APIDS",
        batch: "BATCH 202606",
        baseFee: baseFee,
        gst: gst,
        totalAmount: feeAmt,
        paymentMode: c.payment_mode || "UPI Transfer",
        counselor: c.counselor || "Sajid",
        status: status,
        refNumber: `TXN-${100000 + i * 37}`
      };
    });

    return seedRecords;
  }, []);

  const filteredInvoices = useMemo(() => {
    return invoiceRecords.filter(item => {
      const matchSearch = !search || 
        item.student.toLowerCase().includes(search.toLowerCase()) ||
        item.id.toLowerCase().includes(search.toLowerCase()) ||
        item.rollNo.toLowerCase().includes(search.toLowerCase()) ||
        item.counselor.toLowerCase().includes(search.toLowerCase());
      const matchBranch = branch === "ALL" || item.branch === branch;
      const matchStatus = statusFilter === "ALL" || item.status === statusFilter;
      const matchDate = (!fromDate || item.date >= fromDate) && (!toDate || item.date <= toDate);
      return matchSearch && matchBranch && matchStatus && matchDate;
    });
  }, [invoiceRecords, search, branch, statusFilter, fromDate, toDate]);

  const totalInvoiced = useMemo(() => {
    return filteredInvoices.reduce((acc, cur) => acc + cur.totalAmount, 0);
  }, [filteredInvoices]);

  const totalGst = useMemo(() => {
    return filteredInvoices.reduce((acc, cur) => acc + cur.gst, 0);
  }, [filteredInvoices]);

  const pageSize = 15;
  const totalPages = Math.ceil(filteredInvoices.length / pageSize) || 1;
  const paginatedList = filteredInvoices.slice((page - 1) * pageSize, page * pageSize);

  const handleExportCsv = () => {
    const headers = ["Invoice No", "Date", "Student Name", "Roll No", "Branch", "Course", "Batch", "Base Amount (INR)", "GST 18% (INR)", "Total Invoiced (INR)", "Payment Mode", "Status", "Counselor"];
    const rows = filteredInvoices.map(i => [
      i.id,
      i.date,
      i.student,
      i.rollNo,
      i.branch,
      i.course,
      i.batch,
      i.baseFee,
      i.gst,
      i.totalAmount,
      i.paymentMode,
      i.status,
      i.counselor
    ]);
    exportArrayToCsv(headers, rows, `Invoice_Report_${new Date().toISOString().split('T')[0]}`);
    showToast?.("Invoice Report exported successfully!");
  };

  return (
    <div className="space-y-5">
      {/* Header and Filter Control Bar */}
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-teal-100 text-teal-800 font-mono text-[10px] font-bold">rpt_Invoice.aspx</span>
              <h3 className="font-bold text-slate-800 text-base">Fee Invoice & Tax Invoice Register</h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">GST-compliant invoice generation, student payment receipts, and collection tax breakdowns.</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-300 transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Ledger</span>
            </button>

            <button
              onClick={handleExportCsv}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Excel / CSV</span>
            </button>
          </div>
        </div>

        {/* 4 Summary Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Invoices</span>
            <span className="text-lg font-black text-slate-800 font-mono">{filteredInvoices.length} Slips</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">Filtered period</span>
          </div>

          <div className="p-3 bg-emerald-50/60 rounded border border-emerald-200">
            <span className="text-[10px] uppercase font-bold text-emerald-700 block">Total Invoiced Amount</span>
            <span className="text-lg font-black text-emerald-800 font-mono">₹{totalInvoiced.toLocaleString('en-IN')}</span>
            <span className="text-[10px] text-emerald-600 block mt-0.5">Gross fee billing</span>
          </div>

          <div className="p-3 bg-blue-50/60 rounded border border-blue-200">
            <span className="text-[10px] uppercase font-bold text-blue-700 block">GST Component (18%)</span>
            <span className="text-lg font-black text-blue-800 font-mono">₹{totalGst.toLocaleString('en-IN')}</span>
            <span className="text-[10px] text-blue-600 block mt-0.5">Input tax credit eligible</span>
          </div>

          <div className="p-3 bg-teal-50/60 rounded border border-teal-200">
            <span className="text-[10px] uppercase font-bold text-teal-700 block">Avg Invoice Ticket</span>
            <span className="text-lg font-black text-teal-800 font-mono">
              ₹{filteredInvoices.length ? Math.round(totalInvoiced / filteredInvoices.length).toLocaleString('en-IN') : 0}
            </span>
            <span className="text-[10px] text-teal-600 block mt-0.5">Per receipt billing</span>
          </div>
        </div>

        {/* Filter Input Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs pt-1">
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Search Invoice / Student</label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search name, INV-*, roll..."
                className="w-full pl-8 pr-3 py-1.5 border border-slate-300 rounded text-xs focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Branch Center</label>
            <select
              value={branch}
              onChange={(e) => { setBranch(e.target.value); setPage(1); }}
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs bg-white focus:outline-none"
            >
              <option value="ALL">All Branches (BBSR & BLR)</option>
              <option value="BBSR">Bhubaneswar (BBSR)</option>
              <option value="BLR">Bangalore (BLR)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Payment Status</label>
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs bg-white focus:outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="Paid in Full">Paid in Full</option>
              <option value="Partial Paid">Partial Paid</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">From Date</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => { setFromDate(e.target.value); setPage(1); }}
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs bg-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">To Date</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => { setToDate(e.target.value); setPage(1); }}
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs bg-white focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Invoice Data Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#2A3F54] text-white uppercase text-[10px] tracking-wider font-semibold">
              <tr>
                <th className="py-2.5 px-3 text-center">#</th>
                <th className="py-2.5 px-3">Invoice No</th>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-4">Student Name</th>
                <th className="py-2.5 px-3">Roll No</th>
                <th className="py-2.5 px-3">Branch</th>
                <th className="py-2.5 px-3">Course</th>
                <th className="py-2.5 px-3 text-right">Taxable (₹)</th>
                <th className="py-2.5 px-3 text-right">GST 18% (₹)</th>
                <th className="py-2.5 px-4 text-right">Total (₹)</th>
                <th className="py-2.5 px-3 text-center">Status</th>
                <th className="py-2.5 px-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedList.length === 0 ? (
                <tr>
                  <td colSpan={12} className="py-8 text-center text-slate-400">
                    No invoice records match the selected filters.
                  </td>
                </tr>
              ) : (
                paginatedList.map((inv, idx) => (
                  <tr key={inv.id} className={idx % 2 === 0 ? "bg-white hover:bg-teal-50/40" : "bg-slate-50/50 hover:bg-teal-50/40"}>
                    <td className="py-2 px-3 text-center text-slate-400 font-mono text-[11px]">
                      {(page - 1) * pageSize + idx + 1}
                    </td>
                    <td className="py-2 px-3 font-mono font-bold text-teal-800">
                      {inv.id}
                    </td>
                    <td className="py-2 px-3 font-mono text-slate-600">
                      {inv.date}
                    </td>
                    <td className="py-2 px-4 font-bold text-slate-800">
                      {inv.student}
                    </td>
                    <td className="py-2 px-3 font-mono text-slate-500 text-[11px]">
                      {inv.rollNo}
                    </td>
                    <td className="py-2 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        inv.branch === 'BBSR' ? 'bg-blue-100 text-blue-800' : 'bg-indigo-100 text-indigo-800'
                      }`}>
                        {inv.branch}
                      </span>
                    </td>
                    <td className="py-2 px-3 font-semibold text-slate-700">
                      {inv.course}
                    </td>
                    <td className="py-2 px-3 text-right font-mono text-slate-600">
                      ₹{inv.baseFee.toLocaleString('en-IN')}
                    </td>
                    <td className="py-2 px-3 text-right font-mono text-slate-500">
                      ₹{inv.gst.toLocaleString('en-IN')}
                    </td>
                    <td className="py-2 px-4 text-right font-mono font-bold text-emerald-700">
                      ₹{inv.totalAmount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-2 px-3 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        inv.status === 'Paid in Full' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-center">
                      <button
                        onClick={() => setSelectedInvoice(inv)}
                        className="text-teal-700 hover:text-teal-900 font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                        title="View printable tax invoice receipt"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Slip</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-mono">
              Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, filteredInvoices.length)} of {filteredInvoices.length} invoices
            </span>
            <div className="flex items-center gap-1">
              <button
                disabled={page <= 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
                className="px-2.5 py-1 border rounded bg-white disabled:opacity-40 font-bold hover:bg-slate-100 cursor-pointer"
              >
                Prev
              </button>
              <span className="px-2 font-mono text-slate-700 font-bold">{page} / {totalPages}</span>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                className="px-2.5 py-1 border rounded bg-white disabled:opacity-40 font-bold hover:bg-slate-100 cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Printable Invoice Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 shadow-2xl border border-slate-300 space-y-4 text-xs font-sans">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h4 className="font-black text-base text-slate-900">DV ANALYTICS & DATA LABS PVT LTD</h4>
                <p className="text-[11px] text-slate-500">Official Tax Invoice & Fee Acknowledgment Receipt</p>
              </div>
              <button onClick={() => setSelectedInvoice(null)} className="p-1 hover:bg-slate-100 rounded">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3 rounded border border-slate-200 text-[11px]">
              <div>
                <span className="text-slate-400 block font-bold uppercase">Invoice No:</span>
                <span className="font-mono font-bold text-slate-800 text-xs">{selectedInvoice.id}</span>
                <span className="text-slate-400 block font-bold uppercase mt-2">Invoice Date:</span>
                <span className="font-mono text-slate-800">{selectedInvoice.date}</span>
                <span className="text-slate-400 block font-bold uppercase mt-2">GSTIN / ARN:</span>
                <span className="font-mono text-slate-800">21AAACD4498E1Z4</span>
              </div>
              <div>
                <span className="text-slate-400 block font-bold uppercase">Billed To (Student):</span>
                <span className="font-bold text-slate-900 text-xs block">{selectedInvoice.student}</span>
                <span className="font-mono text-slate-600 block">{selectedInvoice.rollNo}</span>
                <span className="text-slate-600 block">Branch Center: {selectedInvoice.branch}</span>
                <span className="text-slate-600 block">Course Program: {selectedInvoice.course} ({selectedInvoice.batch})</span>
              </div>
            </div>

            <table className="w-full border text-xs">
              <thead className="bg-[#2A3F54] text-white">
                <tr>
                  <th className="py-2 px-3 text-left">Description</th>
                  <th className="py-2 px-3 text-right">Taxable Amount</th>
                  <th className="py-2 px-3 text-right">CGST (9%)</th>
                  <th className="py-2 px-3 text-right">SGST (9%)</th>
                  <th className="py-2 px-3 text-right">Total Net</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2.5 px-3">
                    <span className="font-bold block">{selectedInvoice.course} Tuition & Lab Fees</span>
                    <span className="text-[10px] text-slate-400">Payment Mode: {selectedInvoice.paymentMode} (Ref: {selectedInvoice.refNumber})</span>
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono">₹{selectedInvoice.baseFee.toLocaleString('en-IN')}</td>
                  <td className="py-2.5 px-3 text-right font-mono">₹{Math.round(selectedInvoice.gst / 2).toLocaleString('en-IN')}</td>
                  <td className="py-2.5 px-3 text-right font-mono">₹{Math.round(selectedInvoice.gst / 2).toLocaleString('en-IN')}</td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-800">₹{selectedInvoice.totalAmount.toLocaleString('en-IN')}</td>
                </tr>
              </tbody>
              <tfoot className="bg-slate-100 font-bold">
                <tr>
                  <td colSpan={4} className="py-2 px-3 text-right uppercase">Net Amount Paid:</td>
                  <td className="py-2 px-3 text-right font-mono text-sm text-emerald-700">₹{selectedInvoice.totalAmount.toLocaleString('en-IN')}</td>
                </tr>
              </tfoot>
            </table>

            <div className="pt-3 border-t flex items-center justify-between text-[11px] text-slate-500">
              <span>Counselor: {selectedInvoice.counselor} | Authorized Digital Receipt</span>
              <div className="flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 bg-slate-800 text-white rounded font-bold hover:bg-slate-900 cursor-pointer"
                >
                  Print Invoice
                </button>
                <button
                  onClick={() => {
                    showToast?.("Invoice PDF generated and queued for download!");
                    setSelectedInvoice(null);
                  }}
                  className="px-3 py-1.5 bg-[#26B99A] text-white rounded font-bold hover:bg-teal-600 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// =========================================================================
// 2. REPORT: STUDENT ENROLLMENT REPORT (rpt_Student.aspx)
// =========================================================================
export function ReportStudentView({ showToast }) {
  const [search, setSearch] = useState("");
  const [course, setCourse] = useState("ALL");
  const [batch, setBatch] = useState("ALL");
  const [page, setPage] = useState(1);

  const students = useMemo(() => {
    return getStoredStudents();
  }, []);

  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      const matchSearch = !search || 
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.phone.includes(search) ||
        (s.rollNo && s.rollNo.toLowerCase().includes(search.toLowerCase())) ||
        (s.email && s.email.toLowerCase().includes(search.toLowerCase()));
      const matchCourse = course === "ALL" || s.course === course;
      const matchBatch = batch === "ALL" || s.batch === batch;
      return matchSearch && matchCourse && matchBatch;
    });
  }, [students, search, course, batch]);

  const pageSize = 15;
  const totalPages = Math.ceil(filteredStudents.length / pageSize) || 1;
  const paginatedList = filteredStudents.slice((page - 1) * pageSize, page * pageSize);

  const handleExportCsv = () => {
    const headers = ["Roll No", "Student Name", "Phone", "Email", "Course", "Batch", "Reg Date", "Committed Fee", "Paid Fee", "Due Balance", "Status"];
    const rows = filteredStudents.map(s => [
      s.rollNo || "N/A",
      s.name,
      s.phone,
      s.email || "N/A",
      s.course,
      s.batch,
      s.regDate,
      s.totalFee,
      s.paidFee,
      s.dueFee,
      s.status || "Active"
    ]);
    exportArrayToCsv(headers, rows, `Student_Enrollment_Report_${new Date().toISOString().split('T')[0]}`);
    showToast?.("Student Report exported successfully!");
  };

  return (
    <div className="space-y-5">
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-teal-100 text-teal-800 font-mono text-[10px] font-bold">rpt_Student.aspx</span>
              <h3 className="font-bold text-slate-800 text-base">Student Admission & Enrollment Master Report</h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Comprehensive learner roster, cohort distribution, contact registry, and payment health.</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCsv}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Student Roster (.xlsx)</span>
            </button>
          </div>
        </div>

        {/* Summary Metric Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded border">
            <span className="text-[10px] uppercase font-bold text-slate-400">Total Enrolled</span>
            <span className="text-lg font-black text-slate-800 block font-mono">{filteredStudents.length} Students</span>
          </div>
          <div className="p-3 bg-blue-50/60 rounded border border-blue-200">
            <span className="text-[10px] uppercase font-bold text-blue-700">APIDS Enrolled</span>
            <span className="text-lg font-black text-blue-800 block font-mono">
              {filteredStudents.filter(s => s.course === 'APIDS').length} Learners
            </span>
          </div>
          <div className="p-3 bg-indigo-50/60 rounded border border-indigo-200">
            <span className="text-[10px] uppercase font-bold text-indigo-700">APIDA Enrolled</span>
            <span className="text-lg font-black text-indigo-800 block font-mono">
              {filteredStudents.filter(s => s.course === 'APIDA').length} Learners
            </span>
          </div>
          <div className="p-3 bg-teal-50/60 rounded border border-teal-200">
            <span className="text-[10px] uppercase font-bold text-teal-700">Active Cohort Rate</span>
            <span className="text-lg font-black text-teal-800 block font-mono">98.4%</span>
          </div>
        </div>

        {/* Filter Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Search Student</label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search student name, phone, roll..."
                className="w-full pl-8 pr-3 py-1.5 border border-slate-300 rounded text-xs focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Filter Course</label>
            <select
              value={course}
              onChange={(e) => { setCourse(e.target.value); setPage(1); }}
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs bg-white"
            >
              <option value="ALL">All Courses</option>
              <option value="APIDS">APIDS</option>
              <option value="APIDA">APIDA</option>
              <option value="MPGA">MPGA</option>
              <option value="FDE">FDE</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Filter Batch</label>
            <select
              value={batch}
              onChange={(e) => { setBatch(e.target.value); setPage(1); }}
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs bg-white"
            >
              <option value="ALL">All Batches</option>
              <option value="BATCH 202606">BATCH 202606</option>
              <option value="Batch 202209">Batch 202209</option>
              <option value="Batch 202210">Batch 202210</option>
            </select>
          </div>
        </div>
      </div>

      {/* Student List Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#2A3F54] text-white uppercase text-[10px] tracking-wider font-semibold">
              <tr>
                <th className="py-2.5 px-3 text-center">#</th>
                <th className="py-2.5 px-3">Roll No</th>
                <th className="py-2.5 px-4">Student Name</th>
                <th className="py-2.5 px-3">Contact</th>
                <th className="py-2.5 px-3">Course</th>
                <th className="py-2.5 px-3">Batch</th>
                <th className="py-2.5 px-3">Admission Date</th>
                <th className="py-2.5 px-3 text-right">Committed (₹)</th>
                <th className="py-2.5 px-3 text-right">Paid (₹)</th>
                <th className="py-2.5 px-3 text-right">Due (₹)</th>
                <th className="py-2.5 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedList.map((s, idx) => (
                <tr key={s.id || idx} className={idx % 2 === 0 ? "bg-white hover:bg-teal-50/40" : "bg-slate-50/50 hover:bg-teal-50/40"}>
                  <td className="py-2 px-3 text-center text-slate-400 font-mono text-[11px]">
                    {(page - 1) * pageSize + idx + 1}
                  </td>
                  <td className="py-2 px-3 font-mono font-bold text-slate-700">
                    {s.rollNo || `DVA-2026-${100 + idx}`}
                  </td>
                  <td className="py-2 px-4 font-bold text-slate-800">
                    {s.name}
                  </td>
                  <td className="py-2 px-3 font-mono text-slate-600">
                    {s.phone}
                  </td>
                  <td className="py-2 px-3 font-semibold text-teal-800">
                    {s.course}
                  </td>
                  <td className="py-2 px-3 text-slate-600">
                    {s.batch}
                  </td>
                  <td className="py-2 px-3 font-mono text-slate-500">
                    {s.regDate}
                  </td>
                  <td className="py-2 px-3 text-right font-mono text-slate-700">
                    {s.totalFee}
                  </td>
                  <td className="py-2 px-3 text-right font-mono font-bold text-emerald-700">
                    {s.paidFee}
                  </td>
                  <td className="py-2 px-3 text-right font-mono font-bold text-rose-600">
                    {s.dueFee}
                  </td>
                  <td className="py-2 px-3 text-center">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {s.status || "Active"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-mono">
              Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, filteredStudents.length)} of {filteredStudents.length} students
            </span>
            <div className="flex items-center gap-1">
              <button
                disabled={page <= 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
                className="px-2.5 py-1 border rounded bg-white disabled:opacity-40 font-bold hover:bg-slate-100 cursor-pointer"
              >
                Prev
              </button>
              <span className="px-2 font-mono text-slate-700 font-bold">{page} / {totalPages}</span>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                className="px-2.5 py-1 border rounded bg-white disabled:opacity-40 font-bold hover:bg-slate-100 cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// =========================================================================
// 3. REPORT: OUTSTANDING / FEE DUES REPORT (rpt_Outstanding.aspx)
// =========================================================================
export function ReportOutstandingView({ showToast }) {
  const [search, setSearch] = useState("");
  const [branch, setBranch] = useState("ALL");
  const [page, setPage] = useState(1);

  // Generate realistic outstanding dues records from students
  const outstandingRecords = useMemo(() => {
    const students = getStoredStudents();
    return students.map((s, idx) => {
      const comm = parseInt(String(s.totalFee).replace(/[^0-9]/g, '') || "65000");
      const paid = parseInt(String(s.paidFee).replace(/[^0-9]/g, '') || "35000");
      const balance = Math.max(0, comm - paid);
      const daysOverdue = 15 + ((idx * 17) % 65);
      const followUpStatus = daysOverdue > 45 ? "PTP Broken (Follow-up)" : daysOverdue > 30 ? "Reminder Sent" : "Upcoming Due";

      return {
        id: `DUE-${1000 + idx}`,
        name: s.name,
        rollNo: s.rollNo || `DVA-2026-${100 + idx}`,
        phone: s.phone,
        course: s.course,
        batch: s.batch,
        branch: idx % 3 === 0 ? "BLR" : "BBSR",
        committedFee: comm,
        paidFee: paid,
        balance: balance,
        daysOverdue: daysOverdue,
        nextDueDate: "2026-10-15",
        counselor: "Sajid",
        followUpStatus: followUpStatus
      };
    }).filter(r => r.balance > 0);
  }, []);

  const filtered = useMemo(() => {
    return outstandingRecords.filter(r => {
      const matchSearch = !search || 
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.phone.includes(search) ||
        r.rollNo.toLowerCase().includes(search.toLowerCase());
      const matchBranch = branch === "ALL" || r.branch === branch;
      return matchSearch && matchBranch;
    });
  }, [outstandingRecords, search, branch]);

  const totalOutstanding = useMemo(() => {
    return filtered.reduce((acc, cur) => acc + cur.balance, 0);
  }, [filtered]);

  const pageSize = 15;
  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginatedList = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleExportCsv = () => {
    const headers = ["Roll No", "Student Name", "Phone", "Course", "Batch", "Branch", "Committed Fee", "Collected Fee", "Outstanding Balance", "Days Overdue", "Next Due Date", "Follow-up Status", "Counselor"];
    const rows = filtered.map(r => [
      r.rollNo,
      r.name,
      r.phone,
      r.course,
      r.batch,
      r.branch,
      r.committedFee,
      r.paidFee,
      r.balance,
      r.daysOverdue,
      r.nextDueDate,
      r.followUpStatus,
      r.counselor
    ]);
    exportArrayToCsv(headers, rows, `Outstanding_Fees_Report_${new Date().toISOString().split('T')[0]}`);
    showToast?.("Outstanding Report exported successfully!");
  };

  return (
    <div className="space-y-5">
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-teal-100 text-teal-800 font-mono text-[10px] font-bold">rpt_Outstanding.aspx</span>
              <h3 className="font-bold text-slate-800 text-base">Student Fee Dues & Outstanding Balance Report</h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Audit receivables, installment payment delays, aging buckets, and counselor recovery queues.</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCsv}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Dues Ledger (.xlsx)</span>
            </button>
          </div>
        </div>

        {/* Summary Metric Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-rose-50/60 rounded border border-rose-200">
            <span className="text-[10px] uppercase font-bold text-rose-700">Total Outstanding Balance</span>
            <span className="text-lg font-black text-rose-800 block font-mono">₹{totalOutstanding.toLocaleString('en-IN')}</span>
            <span className="text-[10px] text-rose-600 block mt-0.5">Pending collection</span>
          </div>

          <div className="p-3 bg-slate-50 rounded border">
            <span className="text-[10px] uppercase font-bold text-slate-400">Students with Pending Dues</span>
            <span className="text-lg font-black text-slate-800 block font-mono">{filtered.length} Students</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">Active payment plans</span>
          </div>

          <div className="p-3 bg-amber-50/60 rounded border border-amber-200">
            <span className="text-[10px] uppercase font-bold text-amber-700">Overdue &gt; 30 Days</span>
            <span className="text-lg font-black text-amber-800 block font-mono">
              {filtered.filter(r => r.daysOverdue > 30).length} Accounts
            </span>
            <span className="text-[10px] text-amber-600 block mt-0.5">Priority follow-up</span>
          </div>

          <div className="p-3 bg-emerald-50/60 rounded border border-emerald-200">
            <span className="text-[10px] uppercase font-bold text-emerald-700">Collection Recovery Rate</span>
            <span className="text-lg font-black text-emerald-800 block font-mono">76.4%</span>
            <span className="text-[10px] text-emerald-600 block mt-0.5">On-time installment ratio</span>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Search Student / Phone</label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search student, roll, contact..."
                className="w-full pl-8 pr-3 py-1.5 border border-slate-300 rounded text-xs focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Branch Center</label>
            <select
              value={branch}
              onChange={(e) => { setBranch(e.target.value); setPage(1); }}
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs bg-white"
            >
              <option value="ALL">All Branches (BBSR & BLR)</option>
              <option value="BBSR">Bhubaneswar (BBSR)</option>
              <option value="BLR">Bangalore (BLR)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Outstanding Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#2A3F54] text-white uppercase text-[10px] tracking-wider font-semibold">
              <tr>
                <th className="py-2.5 px-3 text-center">#</th>
                <th className="py-2.5 px-3">Roll No</th>
                <th className="py-2.5 px-4">Student Name</th>
                <th className="py-2.5 px-3">Contact</th>
                <th className="py-2.5 px-3">Course</th>
                <th className="py-2.5 px-3">Branch</th>
                <th className="py-2.5 px-3 text-right">Committed (₹)</th>
                <th className="py-2.5 px-3 text-right">Collected (₹)</th>
                <th className="py-2.5 px-4 text-right">Balance Due (₹)</th>
                <th className="py-2.5 px-3 text-center">Overdue Days</th>
                <th className="py-2.5 px-3 text-center">Follow-up</th>
                <th className="py-2.5 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedList.map((r, idx) => (
                <tr key={r.id} className={idx % 2 === 0 ? "bg-white hover:bg-teal-50/40" : "bg-slate-50/50 hover:bg-teal-50/40"}>
                  <td className="py-2 px-3 text-center text-slate-400 font-mono text-[11px]">
                    {(page - 1) * pageSize + idx + 1}
                  </td>
                  <td className="py-2 px-3 font-mono font-bold text-slate-700">
                    {r.rollNo}
                  </td>
                  <td className="py-2 px-4 font-bold text-slate-800">
                    {r.name}
                  </td>
                  <td className="py-2 px-3 font-mono text-slate-600">
                    {r.phone}
                  </td>
                  <td className="py-2 px-3 font-semibold text-slate-700">
                    {r.course}
                  </td>
                  <td className="py-2 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      r.branch === 'BBSR' ? 'bg-blue-100 text-blue-800' : 'bg-indigo-100 text-indigo-800'
                    }`}>
                      {r.branch}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-right font-mono text-slate-600">
                    ₹{r.committedFee.toLocaleString('en-IN')}
                  </td>
                  <td className="py-2 px-3 text-right font-mono text-emerald-700 font-bold">
                    ₹{r.paidFee.toLocaleString('en-IN')}
                  </td>
                  <td className="py-2 px-4 text-right font-mono font-black text-rose-700">
                    ₹{r.balance.toLocaleString('en-IN')}
                  </td>
                  <td className="py-2 px-3 text-center font-mono">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      r.daysOverdue > 45 ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {r.daysOverdue} days
                    </span>
                  </td>
                  <td className="py-2 px-3 text-center text-[10px] font-bold text-slate-600">
                    {r.followUpStatus}
                  </td>
                  <td className="py-2 px-3 text-center">
                    <button
                      onClick={() => showToast?.(`Fee reminder notification sent to ${r.name} (${r.phone})`)}
                      className="px-2 py-1 rounded bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-300 font-bold text-[10px] inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Send className="w-2.5 h-2.5" />
                      <span>Remind</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-mono">
              Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, filtered.length)} of {filtered.length} dues
            </span>
            <div className="flex items-center gap-1">
              <button
                disabled={page <= 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
                className="px-2.5 py-1 border rounded bg-white disabled:opacity-40 font-bold hover:bg-slate-100 cursor-pointer"
              >
                Prev
              </button>
              <span className="px-2 font-mono text-slate-700 font-bold">{page} / {totalPages}</span>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                className="px-2.5 py-1 border rounded bg-white disabled:opacity-40 font-bold hover:bg-slate-100 cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// =========================================================================
// 4. REPORT: ATTENDANCE COMPLIANCE REPORT (rpt_Attendance.aspx)
// =========================================================================
export function ReportAttendanceView({ showToast }) {
  const [search, setSearch] = useState("");
  const [filterCompliance, setFilterCompliance] = useState("ALL");
  const [page, setPage] = useState(1);

  const attendanceRecords = useMemo(() => {
    const students = getStoredStudents();
    return students.map((s, idx) => {
      const totalSessions = 32;
      const attended = Math.max(18, 32 - ((idx * 3) % 11));
      const pct = parseFloat(((attended / totalSessions) * 100).toFixed(1));
      const status = pct >= 80 ? "Regular (Compliant)" : pct >= 75 ? "Satisfactory" : "Low Attendance (<75%)";

      return {
        id: `ATT-${100 + idx}`,
        name: s.name,
        rollNo: s.rollNo || `DVA-2026-${100 + idx}`,
        course: s.course,
        batch: s.batch,
        totalSessions: totalSessions,
        attended: attended,
        absent: totalSessions - attended,
        percentage: pct,
        complianceStatus: status,
        lastActive: "2026-09-28"
      };
    });
  }, []);

  const filtered = useMemo(() => {
    return attendanceRecords.filter(r => {
      const matchSearch = !search || 
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.rollNo.toLowerCase().includes(search.toLowerCase());
      const matchCompliance = filterCompliance === "ALL" || r.complianceStatus.includes(filterCompliance);
      return matchSearch && matchCompliance;
    });
  }, [attendanceRecords, search, filterCompliance]);

  const pageSize = 15;
  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginatedList = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleExportCsv = () => {
    const headers = ["Roll No", "Student Name", "Course", "Batch", "Total Sessions", "Attended", "Absent", "Attendance %", "Compliance Status", "Last Attended"];
    const rows = filtered.map(r => [
      r.rollNo,
      r.name,
      r.course,
      r.batch,
      r.totalSessions,
      r.attended,
      r.absent,
      r.percentage,
      r.complianceStatus,
      r.lastActive
    ]);
    exportArrayToCsv(headers, rows, `Attendance_Register_Report_${new Date().toISOString().split('T')[0]}`);
    showToast?.("Attendance Report exported successfully!");
  };

  return (
    <div className="space-y-5">
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-teal-100 text-teal-800 font-mono text-[10px] font-bold">rpt_Attendance.aspx</span>
              <h3 className="font-bold text-slate-800 text-base">Student Biometric & Lecture Attendance Compliance Report</h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Live Zoom attendance logs, video watch completion, minimum 75% exam eligibility verification.</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCsv}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Attendance Register (.xlsx)</span>
            </button>
          </div>
        </div>

        {/* KPI Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-emerald-50/60 rounded border border-emerald-200">
            <span className="text-[10px] uppercase font-bold text-emerald-700">Average Cohort Attendance</span>
            <span className="text-lg font-black text-emerald-800 block font-mono">87.5%</span>
            <span className="text-[10px] text-emerald-600 block mt-0.5">Active participation</span>
          </div>

          <div className="p-3 bg-slate-50 rounded border">
            <span className="text-[10px] uppercase font-bold text-slate-400">Total Classes Delivered</span>
            <span className="text-lg font-black text-slate-800 block font-mono">32 Sessions</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">64 Total Lecture Hours</span>
          </div>

          <div className="p-3 bg-rose-50/60 rounded border border-rose-200">
            <span className="text-[10px] uppercase font-bold text-rose-700">Low Attendance Alerts</span>
            <span className="text-lg font-black text-rose-800 block font-mono">
              {filtered.filter(r => r.percentage < 75).length} Students
            </span>
            <span className="text-[10px] text-rose-600 block mt-0.5">Below 75% threshold</span>
          </div>

          <div className="p-3 bg-blue-50/60 rounded border border-blue-200">
            <span className="text-[10px] uppercase font-bold text-blue-700">Exam Eligibility</span>
            <span className="text-lg font-black text-blue-800 block font-mono">94.2%</span>
            <span className="text-[10px] text-blue-600 block mt-0.5">Qualified for CAT exam</span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Search Student</label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search student or roll number..."
                className="w-full pl-8 pr-3 py-1.5 border border-slate-300 rounded text-xs focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Compliance Filter</label>
            <select
              value={filterCompliance}
              onChange={(e) => { setFilterCompliance(e.target.value); setPage(1); }}
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs bg-white"
            >
              <option value="ALL">All Compliance Levels</option>
              <option value="Compliant">Regular (Compliant &gt;= 80%)</option>
              <option value="Satisfactory">Satisfactory (75% - 80%)</option>
              <option value="Low Attendance">Attendance Warning (&lt; 75%)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#2A3F54] text-white uppercase text-[10px] tracking-wider font-semibold">
              <tr>
                <th className="py-2.5 px-3 text-center">#</th>
                <th className="py-2.5 px-3">Roll No</th>
                <th className="py-2.5 px-4">Student Name</th>
                <th className="py-2.5 px-3">Course</th>
                <th className="py-2.5 px-3">Batch</th>
                <th className="py-2.5 px-3 text-center">Total Sessions</th>
                <th className="py-2.5 px-3 text-center">Attended</th>
                <th className="py-2.5 px-3 text-center">Absent</th>
                <th className="py-2.5 px-4 text-right">Attendance %</th>
                <th className="py-2.5 px-3 text-center">Compliance Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedList.map((r, idx) => (
                <tr key={r.id} className={idx % 2 === 0 ? "bg-white hover:bg-teal-50/40" : "bg-slate-50/50 hover:bg-teal-50/40"}>
                  <td className="py-2 px-3 text-center text-slate-400 font-mono text-[11px]">
                    {(page - 1) * pageSize + idx + 1}
                  </td>
                  <td className="py-2 px-3 font-mono font-bold text-slate-700">
                    {r.rollNo}
                  </td>
                  <td className="py-2 px-4 font-bold text-slate-800">
                    {r.name}
                  </td>
                  <td className="py-2 px-3 font-semibold text-slate-700">
                    {r.course}
                  </td>
                  <td className="py-2 px-3 text-slate-600">
                    {r.batch}
                  </td>
                  <td className="py-2 px-3 text-center font-mono font-bold text-slate-700">
                    {r.totalSessions}
                  </td>
                  <td className="py-2 px-3 text-center font-mono font-bold text-emerald-700">
                    {r.attended}
                  </td>
                  <td className="py-2 px-3 text-center font-mono font-bold text-rose-600">
                    {r.absent}
                  </td>
                  <td className="py-2 px-4 text-right font-mono font-bold">
                    <span className={`px-2 py-0.5 rounded ${
                      r.percentage >= 80 ? 'text-emerald-700 bg-emerald-50' : r.percentage >= 75 ? 'text-blue-700 bg-blue-50' : 'text-rose-700 bg-rose-50'
                    }`}>
                      {r.percentage}%
                    </span>
                  </td>
                  <td className="py-2 px-3 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      r.percentage >= 80 ? 'bg-emerald-100 text-emerald-800' : r.percentage >= 75 ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {r.complianceStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-mono">
              Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, filtered.length)} of {filtered.length} records
            </span>
            <div className="flex items-center gap-1">
              <button
                disabled={page <= 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
                className="px-2.5 py-1 border rounded bg-white disabled:opacity-40 font-bold hover:bg-slate-100 cursor-pointer"
              >
                Prev
              </button>
              <span className="px-2 font-mono text-slate-700 font-bold">{page} / {totalPages}</span>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                className="px-2.5 py-1 border rounded bg-white disabled:opacity-40 font-bold hover:bg-slate-100 cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// =========================================================================
// 5. REPORT: ASSIGNMENT SUBMISSION & SCORING REPORT (rpt_Assignment.aspx)
// =========================================================================
export function ReportAssignmentView({ showToast }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const assignments = useMemo(() => {
    const list = getStoredAssignmentsList();
    if (list && list.length > 0) return list;
    return [
      { id: 101, studentName: "SK ABDUL SAJID", rollNo: "DVA-202606-448", batch: "BATCH 202606", subject: "EXCEL BASE AND ADVANCED", title: "SESSION-1 ASSIGNMENTS - Dynamic References", submittedDate: "2026-06-10", status: "Approved", score: "98/100", feedback: "Formulas structured accurately." },
      { id: 102, studentName: "PRIYANKA MISHRA", rollNo: "DVA-202606-449", batch: "BATCH 202606", subject: "EXCEL BASE AND ADVANCED", title: "SESSION-1 ASSIGNMENTS - Dynamic References", submittedDate: "2026-06-11", status: "Pending", score: "", feedback: "" },
      { id: 103, studentName: "PRABHAT KUMAR SAHOO", rollNo: "DVA-202606-450", batch: "BATCH 202606", subject: "SQL SERVER", title: "SESSION-3 ASSIGNMENTS - CTEs & Window Functions", submittedDate: "2026-06-14", status: "Approved", score: "92/100", feedback: "Optimized queries." },
      { id: 104, studentName: "ROHIT VERMA", rollNo: "DVA-202606-451", batch: "BATCH 202606", subject: "PYTHON PROGRAMMING", title: "SESSION-2 ASSIGNMENTS - Pandas Data Wrangling", submittedDate: "2026-06-16", status: "Approved", score: "95/100", feedback: "Vectorized operations utilized properly." },
      { id: 105, studentName: "POOJA ACHARYA", rollNo: "DVA-202606-452", batch: "BATCH 202606", subject: "POWER BI", title: "SESSION-1 ASSIGNMENTS - DAX Measures & Star Schema", submittedDate: "2026-06-18", status: "Approved", score: "89/100", feedback: "Clear visualization hierarchy." }
    ];
  }, []);

  const filtered = useMemo(() => {
    return assignments.filter(a => {
      return !search || 
        a.studentName.toLowerCase().includes(search.toLowerCase()) ||
        a.rollNo.toLowerCase().includes(search.toLowerCase()) ||
        a.subject.toLowerCase().includes(search.toLowerCase()) ||
        a.title.toLowerCase().includes(search.toLowerCase());
    });
  }, [assignments, search]);

  const handleExportCsv = () => {
    const headers = ["Roll No", "Student Name", "Batch", "Subject Module", "Assignment Title", "Submission Date", "Status", "Score", "Mentor Feedback"];
    const rows = filtered.map(a => [
      a.rollNo,
      a.studentName,
      a.batch,
      a.subject,
      a.title,
      a.submittedDate,
      a.status,
      a.score || "Unreviewed",
      a.feedback || "None"
    ]);
    exportArrayToCsv(headers, rows, `Assignment_Evaluation_Report_${new Date().toISOString().split('T')[0]}`);
    showToast?.("Assignment Report exported successfully!");
  };

  return (
    <div className="space-y-5">
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-teal-100 text-teal-800 font-mono text-[10px] font-bold">rpt_Assignment.aspx</span>
              <h3 className="font-bold text-slate-800 text-base">Assignment Submission & Grading Master Report</h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Faculty scoring register, evaluation turn-around times, and cohort homework compliance.</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCsv}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Assignment Register (.xlsx)</span>
            </button>
          </div>
        </div>

        {/* Filter */}
        <div className="w-full sm:w-80">
          <label className="block text-[11px] font-bold text-slate-600 mb-1">Search Submission</label>
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search by student, subject, topic..."
              className="w-full pl-8 pr-3 py-1.5 border border-slate-300 rounded text-xs focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#2A3F54] text-white uppercase text-[10px] tracking-wider font-semibold">
              <tr>
                <th className="py-2.5 px-3 text-center">#</th>
                <th className="py-2.5 px-3">Roll No</th>
                <th className="py-2.5 px-4">Student Name</th>
                <th className="py-2.5 px-3">Subject</th>
                <th className="py-2.5 px-4">Assignment Topic</th>
                <th className="py-2.5 px-3">Submitted Date</th>
                <th className="py-2.5 px-3 text-center">Status</th>
                <th className="py-2.5 px-3 text-center">Score</th>
                <th className="py-2.5 px-4">Mentor Feedback</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((a, idx) => (
                <tr key={a.id} className={idx % 2 === 0 ? "bg-white hover:bg-teal-50/40" : "bg-slate-50/50 hover:bg-teal-50/40"}>
                  <td className="py-2 px-3 text-center text-slate-400 font-mono text-[11px]">
                    {idx + 1}
                  </td>
                  <td className="py-2 px-3 font-mono font-bold text-slate-700">
                    {a.rollNo}
                  </td>
                  <td className="py-2 px-4 font-bold text-slate-800">
                    {a.studentName}
                  </td>
                  <td className="py-2 px-3 font-semibold text-teal-800">
                    {a.subject}
                  </td>
                  <td className="py-2 px-4 text-slate-700 font-medium truncate max-w-xs" title={a.title}>
                    {a.title}
                  </td>
                  <td className="py-2 px-3 font-mono text-slate-500">
                    {a.submittedDate}
                  </td>
                  <td className="py-2 px-3 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      a.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {a.status}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-center font-mono font-bold text-emerald-700">
                    {a.score || "—"}
                  </td>
                  <td className="py-2 px-4 text-slate-500 text-[11px] truncate max-w-xs" title={a.feedback}>
                    {a.feedback || "Awaiting evaluation by assigned mentor"}
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

// =========================================================================
// 6. REPORT: STUDENT FEEDBACK REPORT (rpt_Feedback.aspx)
// =========================================================================
export function ReportFeedbackView({ showToast }) {
  const [search, setSearch] = useState("");
  const feedbackList = [
    { id: "FB-01", date: "2026-09-24", student: "SK ABDUL SAJID", mentor: "DEBENDRA DEBADUTTA DAS", course: "APIDS", subject: "EXCEL BASE AND ADVANCED", rating: 5, comments: "Exceptional explanation of dynamic array formulas and real-time troubleshooting.", sentiment: "Positive" },
    { id: "FB-02", date: "2026-09-25", student: "PRIYANKA MISHRA", mentor: "DEBENDRA DEBADUTTA DAS", course: "APIDS", subject: "EXCEL BASE AND ADVANCED", rating: 5, comments: "Clear practical examples and structured assignments.", sentiment: "Positive" },
    { id: "FB-03", date: "2026-09-26", student: "ROHIT VERMA", mentor: "PRABHAT KUMAR SAHOO", course: "APIDS", subject: "SQL SERVER", rating: 4, comments: "Great lab session on CTEs and window partitions. Requested more case study files.", sentiment: "Positive" },
    { id: "FB-04", date: "2026-09-28", student: "POOJA ACHARYA", mentor: "SANGHAMITRA PARIDA", course: "APIDA", subject: "PYTHON PROGRAMMING", rating: 5, comments: "Very supportive with NumPy broadcasting and vectorization logic.", sentiment: "Positive" },
    { id: "FB-05", date: "2026-09-29", student: "DIPAK BEHERA", mentor: "DEBENDRA DEBADUTTA DAS", course: "APIDS", subject: "EXCEL VBA", rating: 5, comments: "Automated macro scripts explained step-by-step.", sentiment: "Positive" }
  ];

  const filtered = feedbackList.filter(f => 
    !search || 
    f.student.toLowerCase().includes(search.toLowerCase()) ||
    f.mentor.toLowerCase().includes(search.toLowerCase()) ||
    f.subject.toLowerCase().includes(search.toLowerCase())
  );

  const handleExportCsv = () => {
    const headers = ["Feedback ID", "Date", "Student Name", "Faculty Mentor", "Course", "Subject", "Rating (1-5)", "Comments", "Sentiment"];
    const rows = filtered.map(f => [f.id, f.date, f.student, f.mentor, f.course, f.subject, f.rating, f.comments, f.sentiment]);
    exportArrayToCsv(headers, rows, `Feedback_Report_${new Date().toISOString().split('T')[0]}`);
    showToast?.("Feedback Report exported successfully!");
  };

  return (
    <div className="space-y-5">
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-teal-100 text-teal-800 font-mono text-[10px] font-bold">rpt_Feedback.aspx</span>
              <h3 className="font-bold text-slate-800 text-base">Faculty & Course Feedback Matrix Report</h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Learner satisfaction indexes, Net Promoter Score (NPS), mentor ratings, and syllabus feedback.</p>
          </div>

          <button
            onClick={handleExportCsv}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Feedback Matrix (.xlsx)</span>
          </button>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-amber-50/60 rounded border border-amber-200">
            <span className="text-[10px] uppercase font-bold text-amber-700">Average Faculty Rating</span>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-lg font-black text-amber-800 font-mono">4.9 / 5.0</span>
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            </div>
            <span className="text-[10px] text-amber-600 block mt-0.5">Top-tier satisfaction</span>
          </div>

          <div className="p-3 bg-slate-50 rounded border">
            <span className="text-[10px] uppercase font-bold text-slate-400">Total Reviews</span>
            <span className="text-lg font-black text-slate-800 block font-mono">248 Verified</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">Continuous feedback</span>
          </div>

          <div className="p-3 bg-emerald-50/60 rounded border border-emerald-200">
            <span className="text-[10px] uppercase font-bold text-emerald-700">Net Promoter Score (NPS)</span>
            <span className="text-lg font-black text-emerald-800 block font-mono">+78</span>
            <span className="text-[10px] text-emerald-600 block mt-0.5">High learner advocacy</span>
          </div>

          <div className="p-3 bg-teal-50/60 rounded border border-teal-200">
            <span className="text-[10px] uppercase font-bold text-teal-700">Lead Mentor Score</span>
            <span className="text-lg font-black text-teal-800 block font-mono">5.0 / 5.0</span>
            <span className="text-[10px] text-teal-600 block mt-0.5">Debendra Das Debadutta</span>
          </div>
        </div>

        <div className="w-full sm:w-80">
          <label className="block text-[11px] font-bold text-slate-600 mb-1">Search Feedback</label>
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search faculty, student, subject..."
              className="w-full pl-8 pr-3 py-1.5 border border-slate-300 rounded text-xs focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#2A3F54] text-white uppercase text-[10px] tracking-wider font-semibold">
              <tr>
                <th className="py-2.5 px-3 text-center">#</th>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-4">Student</th>
                <th className="py-2.5 px-4">Faculty / Mentor</th>
                <th className="py-2.5 px-3">Subject Module</th>
                <th className="py-2.5 px-3 text-center">Rating</th>
                <th className="py-2.5 px-5">Student Testimonial</th>
                <th className="py-2.5 px-3 text-center">Sentiment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((f, idx) => (
                <tr key={f.id} className={idx % 2 === 0 ? "bg-white hover:bg-teal-50/40" : "bg-slate-50/50 hover:bg-teal-50/40"}>
                  <td className="py-2 px-3 text-center text-slate-400 font-mono text-[11px]">{idx + 1}</td>
                  <td className="py-2 px-3 font-mono text-slate-500">{f.date}</td>
                  <td className="py-2 px-4 font-bold text-slate-800">{f.student}</td>
                  <td className="py-2 px-4 font-semibold text-teal-800">{f.mentor}</td>
                  <td className="py-2 px-3 text-slate-700">{f.subject}</td>
                  <td className="py-2 px-3 text-center">
                    <span className="inline-flex items-center gap-1 font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      <span>{f.rating}.0</span>
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    </span>
                  </td>
                  <td className="py-2 px-5 text-slate-600 italic">"{f.comments}"</td>
                  <td className="py-2 px-3 text-center">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {f.sentiment}
                    </span>
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

// =========================================================================
// 7. REPORT: MCQ / CAT EXAM REPORT (rpt_MCQ.aspx)
// =========================================================================
export function ReportMCQView({ showToast }) {
  const [search, setSearch] = useState("");
  const mcqScores = [
    { id: "CAT-101", date: "2026-06-25", student: "SK ABDUL SAJID", rollNo: "DVA-202606-448", module: "CAT-01: Excel Fundamentals & Advanced Formulas", questions: 50, correct: 48, scorePct: 96, status: "Passed", percentile: "99.4%" },
    { id: "CAT-102", date: "2026-07-20", student: "SK ABDUL SAJID", rollNo: "DVA-202606-448", module: "CAT-02: SQL Server Relational Algebra & DDL/DML", questions: 50, correct: 46, scorePct: 92, status: "Passed", percentile: "97.1%" },
    { id: "CAT-103", date: "2026-08-15", student: "PRIYANKA MISHRA", rollNo: "DVA-202606-449", module: "CAT-01: Excel Fundamentals & Advanced Formulas", questions: 50, correct: 45, scorePct: 90, status: "Passed", percentile: "95.0%" },
    { id: "CAT-104", date: "2026-08-28", student: "ROHIT VERMA", rollNo: "DVA-202606-451", module: "CAT-02: SQL Server Relational Algebra & DDL/DML", questions: 50, correct: 44, scorePct: 88, status: "Passed", percentile: "91.8%" },
    { id: "CAT-105", date: "2026-09-10", student: "DIPAK BEHERA", rollNo: "DVA-202606-454", module: "CAT-03: Python OOP & Applied Statistics", questions: 50, correct: 47, scorePct: 94, status: "Passed", percentile: "98.2%" }
  ];

  const filtered = mcqScores.filter(m => 
    !search || 
    m.student.toLowerCase().includes(search.toLowerCase()) ||
    m.rollNo.toLowerCase().includes(search.toLowerCase()) ||
    m.module.toLowerCase().includes(search.toLowerCase())
  );

  const handleExportCsv = () => {
    const headers = ["Test Code", "Date", "Roll No", "Student Name", "Test Module", "Total Qs", "Correct", "Score %", "Percentile", "Status"];
    const rows = filtered.map(m => [m.id, m.date, m.rollNo, m.student, m.module, m.questions, m.correct, `${m.scorePct}%`, m.percentile, m.status]);
    exportArrayToCsv(headers, rows, `MCQ_CAT_Exam_Report_${new Date().toISOString().split('T')[0]}`);
    showToast?.("MCQ Exam Report exported successfully!");
  };

  return (
    <div className="space-y-5">
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-teal-100 text-teal-800 font-mono text-[10px] font-bold">rpt_MCQ.aspx</span>
              <h3 className="font-bold text-slate-800 text-base">CAT Common Aptitude & MCQ Examination Report</h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Automated online assessment scores, percentile distributions, and module benchmark criteria.</p>
          </div>

          <button
            onClick={handleExportCsv}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export MCQ Scorecard (.xlsx)</span>
          </button>
        </div>

        <div className="w-full sm:w-80">
          <label className="block text-[11px] font-bold text-slate-600 mb-1">Search Exam Scores</label>
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search candidate, test code, topic..."
              className="w-full pl-8 pr-3 py-1.5 border border-slate-300 rounded text-xs focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#2A3F54] text-white uppercase text-[10px] tracking-wider font-semibold">
              <tr>
                <th className="py-2.5 px-3 text-center">Test Code</th>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Roll No</th>
                <th className="py-2.5 px-4">Student Name</th>
                <th className="py-2.5 px-4">Exam Module</th>
                <th className="py-2.5 px-3 text-center">Questions</th>
                <th className="py-2.5 px-3 text-center">Correct</th>
                <th className="py-2.5 px-3 text-right">Score %</th>
                <th className="py-2.5 px-3 text-center">Percentile</th>
                <th className="py-2.5 px-3 text-center">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((m, idx) => (
                <tr key={m.id} className={idx % 2 === 0 ? "bg-white hover:bg-teal-50/40" : "bg-slate-50/50 hover:bg-teal-50/40"}>
                  <td className="py-2 px-3 text-center font-mono font-bold text-teal-800">{m.id}</td>
                  <td className="py-2 px-3 font-mono text-slate-500">{m.date}</td>
                  <td className="py-2 px-3 font-mono font-bold text-slate-700">{m.rollNo}</td>
                  <td className="py-2 px-4 font-bold text-slate-800">{m.student}</td>
                  <td className="py-2 px-4 text-slate-700 font-medium">{m.module}</td>
                  <td className="py-2 px-3 text-center font-mono">{m.questions}</td>
                  <td className="py-2 px-3 text-center font-mono font-bold text-emerald-700">{m.correct}</td>
                  <td className="py-2 px-3 text-right font-mono font-black text-emerald-700">{m.scorePct}%</td>
                  <td className="py-2 px-3 text-center font-mono text-blue-700 font-bold">{m.percentile}</td>
                  <td className="py-2 px-3 text-center">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {m.status}
                    </span>
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

// =========================================================================
// 8. REPORT: PRACTICAL & CAPSTONE LAB REPORT (rpt_Practical.aspx)
// =========================================================================
export function ReportPracticalView({ showToast }) {
  const [search, setSearch] = useState("");
  const practicalList = [
    { id: "PRAC-01", date: "2026-08-18", student: "SK ABDUL SAJID", rollNo: "DVA-202606-448", project: "Credit Risk Application Scorecard & Logistic Regression", domain: "Banking & Finance", codeScore: 96, vivaScore: 98, grade: "A+", evaluator: "Debendra Das Debadutta" },
    { id: "PRAC-02", date: "2026-09-02", student: "SK ABDUL SAJID", rollNo: "DVA-202606-448", project: "E-Commerce Market Basket Analysis with FP-Growth", domain: "Retail & E-Commerce", codeScore: 94, vivaScore: 95, grade: "A", evaluator: "Senior AI Faculty" },
    { id: "PRAC-03", date: "2026-09-20", student: "PRIYANKA MISHRA", rollNo: "DVA-202606-449", project: "Hospital Patient Readmission Clinical Classifier", domain: "Healthcare & Life Sciences", codeScore: 92, vivaScore: 94, grade: "A", evaluator: "Clinical Data Lead" },
    { id: "PRAC-04", date: "2026-09-22", student: "ROHIT VERMA", rollNo: "DVA-202606-451", project: "Automated ETL Data Pipeline with Apache Airflow & Snowflake", domain: "Cloud Data Engineering", codeScore: 95, vivaScore: 93, grade: "A", evaluator: "Data Engineering Lead" },
    { id: "PRAC-05", date: "2026-09-25", student: "POOJA ACHARYA", rollNo: "DVA-202606-452", project: "Enterprise Power BI Financial Consolidation Dashboard", domain: "Business Intelligence", codeScore: 97, vivaScore: 96, grade: "A+", evaluator: "BI Principal Architect" }
  ];

  const filtered = practicalList.filter(p => 
    !search || 
    p.student.toLowerCase().includes(search.toLowerCase()) ||
    p.rollNo.toLowerCase().includes(search.toLowerCase()) ||
    p.project.toLowerCase().includes(search.toLowerCase())
  );

  const handleExportCsv = () => {
    const headers = ["Practical ID", "Date", "Roll No", "Student Name", "Capstone Project Title", "Domain", "Code Score", "Defense Viva Score", "Final Grade", "Evaluator"];
    const rows = filtered.map(p => [p.id, p.date, p.rollNo, p.student, p.project, p.domain, p.codeScore, p.vivaScore, p.grade, p.evaluator]);
    exportArrayToCsv(headers, rows, `Practical_Capstone_Exam_Report_${new Date().toISOString().split('T')[0]}`);
    showToast?.("Practical Lab Report exported successfully!");
  };

  return (
    <div className="space-y-5">
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-teal-100 text-teal-800 font-mono text-[10px] font-bold">rpt_Practical.aspx</span>
              <h3 className="font-bold text-slate-800 text-base">Practical Lab & Industry Capstone Defense Report</h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Live project code evaluations, architecture vivas, and defense grades awarded by industry panelists.</p>
          </div>

          <button
            onClick={handleExportCsv}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Practical Report (.xlsx)</span>
          </button>
        </div>

        <div className="w-full sm:w-80">
          <label className="block text-[11px] font-bold text-slate-600 mb-1">Search Practical Evaluations</label>
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search candidate, domain, evaluator..."
              className="w-full pl-8 pr-3 py-1.5 border border-slate-300 rounded text-xs focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#2A3F54] text-white uppercase text-[10px] tracking-wider font-semibold">
              <tr>
                <th className="py-2.5 px-3 text-center">#</th>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Roll No</th>
                <th className="py-2.5 px-4">Student Name</th>
                <th className="py-2.5 px-5">Capstone Project Title</th>
                <th className="py-2.5 px-3">Domain</th>
                <th className="py-2.5 px-3 text-center">Code (100)</th>
                <th className="py-2.5 px-3 text-center">Viva (100)</th>
                <th className="py-2.5 px-3 text-center">Grade</th>
                <th className="py-2.5 px-4">Evaluator</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((p, idx) => (
                <tr key={p.id} className={idx % 2 === 0 ? "bg-white hover:bg-teal-50/40" : "bg-slate-50/50 hover:bg-teal-50/40"}>
                  <td className="py-2 px-3 text-center text-slate-400 font-mono text-[11px]">{idx + 1}</td>
                  <td className="py-2 px-3 font-mono text-slate-500">{p.date}</td>
                  <td className="py-2 px-3 font-mono font-bold text-slate-700">{p.rollNo}</td>
                  <td className="py-2 px-4 font-bold text-slate-800">{p.student}</td>
                  <td className="py-2 px-5 text-slate-700 font-semibold">{p.project}</td>
                  <td className="py-2 px-3 text-slate-600">{p.domain}</td>
                  <td className="py-2 px-3 text-center font-mono font-bold text-slate-700">{p.codeScore}</td>
                  <td className="py-2 px-3 text-center font-mono font-bold text-slate-700">{p.vivaScore}</td>
                  <td className="py-2 px-3 text-center">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 font-mono">
                      {p.grade}
                    </span>
                  </td>
                  <td className="py-2 px-4 text-slate-700 font-medium">{p.evaluator}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// 9. REPORT: CENTER & OPERATIONS EXPENSE REPORT (rpt_Expense.aspx)
// =========================================================================
export function ReportExpenseView({ showToast }) {
  const [search, setSearch] = useState("");
  const [branch, setBranch] = useState("ALL");

  const expenseRecords = [
    { id: "EXP-2026-081", date: "2026-09-02", category: "Faculty Stipend & Honorarium", branch: "BBSR", payee: "Debendra Das Debadutta", desc: "Senior Mentor honorarium for APIDS & APIDA modules (August)", amount: 185000, paymentMode: "Direct Bank NEFT", approvedBy: "Director" },
    { id: "EXP-2026-082", date: "2026-09-05", category: "Cloud & AI Infrastructure", branch: "Corporate", payee: "Amazon Web Services (AWS)", desc: "GPU compute instances for deep learning sandbox labs", amount: 64200, paymentMode: "Corporate Card", approvedBy: "IT Lead" },
    { id: "EXP-2026-083", date: "2026-09-08", category: "Center Infrastructure & Utilities", branch: "BBSR", payee: "DLF Cybercity Facilities", desc: "Bhubaneswar training facility rental & broadband high-speed fiber", amount: 145000, paymentMode: "Bank Transfer", approvedBy: "Admin Operations" },
    { id: "EXP-2026-084", date: "2026-09-10", category: "Software Licensing & LMS Hosting", branch: "Corporate", payee: "VdoCipher Media Inc.", desc: "DRM encrypted video streaming bandwidth & player licenses", amount: 38400, paymentMode: "Razorpay Corporate", approvedBy: "L&D Head" },
    { id: "EXP-2026-085", date: "2026-09-12", category: "Center Infrastructure & Utilities", branch: "BLR", payee: "Koramangala Tech Park Ops", desc: "Bangalore center workstation maintenance & power backup", amount: 128000, paymentMode: "Bank Transfer", approvedBy: "Admin Operations" },
    { id: "EXP-2026-086", date: "2026-09-15", category: "Faculty Stipend & Honorarium", branch: "BLR", payee: "Prabhat Kumar Sahoo", desc: "SQL & Big Data faculty stipend (August)", amount: 120000, paymentMode: "Direct Bank NEFT", approvedBy: "Director" },
    { id: "EXP-2026-087", date: "2026-09-18", category: "Student Courseware & Kits", branch: "BBSR", payee: "PrintExpress India", desc: "Printed curriculum binders, certificates, and welcome kits", amount: 28500, paymentMode: "UPI Corporate", approvedBy: "Operations" }
  ];

  const filtered = expenseRecords.filter(e => {
    const matchSearch = !search || 
      e.payee.toLowerCase().includes(search.toLowerCase()) ||
      e.desc.toLowerCase().includes(search.toLowerCase()) ||
      e.category.toLowerCase().includes(search.toLowerCase());
    const matchBranch = branch === "ALL" || e.branch === branch;
    return matchSearch && matchBranch;
  });

  const totalExpense = filtered.reduce((acc, cur) => acc + cur.amount, 0);

  const handleExportCsv = () => {
    const headers = ["Voucher No", "Date", "Category", "Branch", "Payee / Vendor", "Description", "Amount (INR)", "Payment Mode", "Approved By"];
    const rows = filtered.map(e => [e.id, e.date, e.category, e.branch, e.payee, e.desc, e.amount, e.paymentMode, e.approvedBy]);
    exportArrayToCsv(headers, rows, `Center_Expense_Ledger_${new Date().toISOString().split('T')[0]}`);
    showToast?.("Expense Report exported successfully!");
  };

  return (
    <div className="space-y-5">
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-teal-100 text-teal-800 font-mono text-[10px] font-bold">rpt_Expense.aspx</span>
              <h3 className="font-bold text-slate-800 text-base">Center Operations & Academic Expenditure Report</h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Faculty honorariums, AWS cloud compute, software DRM licenses, and center facility outlays.</p>
          </div>

          <button
            onClick={handleExportCsv}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Expense Ledger (.xlsx)</span>
          </button>
        </div>

        {/* 4 Expense Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-rose-50/60 rounded border border-rose-200">
            <span className="text-[10px] uppercase font-bold text-rose-700">Total Monthly Outlay</span>
            <span className="text-lg font-black text-rose-800 block font-mono">₹{totalExpense.toLocaleString('en-IN')}</span>
            <span className="text-[10px] text-rose-600 block mt-0.5">Operating budget</span>
          </div>

          <div className="p-3 bg-blue-50/60 rounded border border-blue-200">
            <span className="text-[10px] uppercase font-bold text-blue-700">Faculty Honorariums</span>
            <span className="text-lg font-black text-blue-800 block font-mono">₹3,05,000</span>
            <span className="text-[10px] text-blue-600 block mt-0.5">Instructional delivery</span>
          </div>

          <div className="p-3 bg-indigo-50/60 rounded border border-indigo-200">
            <span className="text-[10px] uppercase font-bold text-indigo-700">Cloud & DRM Streaming</span>
            <span className="text-lg font-black text-indigo-800 block font-mono">₹1,02,600</span>
            <span className="text-[10px] text-indigo-600 block mt-0.5">AWS & VdoCipher</span>
          </div>

          <div className="p-3 bg-teal-50/60 rounded border border-teal-200">
            <span className="text-[10px] uppercase font-bold text-teal-700">Facilities & Utilities</span>
            <span className="text-lg font-black text-teal-800 block font-mono">₹2,73,000</span>
            <span className="text-[10px] text-teal-600 block mt-0.5">BBSR & BLR centers</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Search Expense / Payee</label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search vendor, category, description..."
                className="w-full pl-8 pr-3 py-1.5 border border-slate-300 rounded text-xs focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Branch</label>
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs bg-white"
            >
              <option value="ALL">All Branches</option>
              <option value="BBSR">Bhubaneswar (BBSR)</option>
              <option value="BLR">Bangalore (BLR)</option>
              <option value="Corporate">Corporate / Cloud</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#2A3F54] text-white uppercase text-[10px] tracking-wider font-semibold">
              <tr>
                <th className="py-2.5 px-3 text-center">Voucher No</th>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Branch</th>
                <th className="py-2.5 px-4">Payee / Vendor</th>
                <th className="py-2.5 px-5">Description</th>
                <th className="py-2.5 px-3">Payment Mode</th>
                <th className="py-2.5 px-4 text-right">Amount (₹)</th>
                <th className="py-2.5 px-3 text-center">Approved By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((e, idx) => (
                <tr key={e.id} className={idx % 2 === 0 ? "bg-white hover:bg-teal-50/40" : "bg-slate-50/50 hover:bg-teal-50/40"}>
                  <td className="py-2 px-3 text-center font-mono font-bold text-teal-800">{e.id}</td>
                  <td className="py-2 px-3 font-mono text-slate-500">{e.date}</td>
                  <td className="py-2 px-3 font-semibold text-slate-700">{e.category}</td>
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                      {e.branch}
                    </span>
                  </td>
                  <td className="py-2 px-4 font-bold text-slate-800">{e.payee}</td>
                  <td className="py-2 px-5 text-slate-600">{e.desc}</td>
                  <td className="py-2 px-3 font-mono text-slate-500 text-[11px]">{e.paymentMode}</td>
                  <td className="py-2 px-4 text-right font-mono font-bold text-rose-700">
                    ₹{e.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-2 px-3 text-center text-slate-600 font-medium">{e.approvedBy}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-slate-100 font-bold border-t-2">
              <tr>
                <td colSpan={7} className="py-2.5 px-4 uppercase text-slate-800">Total Filtered Expenditures:</td>
                <td className="py-2.5 px-4 text-right font-mono text-rose-800 text-sm">₹{totalExpense.toLocaleString('en-IN')}</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
