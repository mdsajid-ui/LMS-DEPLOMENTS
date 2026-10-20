import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Shield, 
  Save, 
  CheckCircle2, 
  Lock,
  FileText, 
  Download, 
  Printer, 
  ExternalLink, 
  Receipt, 
  CreditCard, 
  Building2, 
  Check 
} from 'lucide-react';
import InvoiceFormatModal from '../components/InvoiceFormatModal';
import { getStoredFees, saveStudentProfile, subscribeToDataUpdates } from '../utils/lmsStorage';

export default function AccountProfilePage({ student }) {
  const [saved, setSaved] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Form State
  const [name, setName] = useState(student?.name || '');
  const [email, setEmail] = useState(student?.email || '');
  const [phone, setPhone] = useState(student?.phone || student?.studentId || '');

  // Keep form in sync when prop updates
  useEffect(() => {
    if (student) {
      setName(student.name || '');
      setEmail(student.email || '');
      setPhone(student.phone || student.studentId || '');
    }
  }, [student]);

  // Load fees related to this student from LMS Storage
  const [feesList, setFeesList] = useState(() => getStoredFees());

  useEffect(() => {
    const unsub = subscribeToDataUpdates((event) => {
      if (event.type === 'fees' || event.type === 'students') {
        setFeesList(getStoredFees());
      }
    });
    return unsub;
  }, []);

  // Filter invoices for current student
  const studentInvoices = React.useMemo(() => {
    if (!student) return [];
    const sRoll = (student.studentId || student.rollNo || '').trim().toLowerCase();
    const sName = (student.name || '').trim().toLowerCase();
    const sPhone = (student.phone || student.studentId || '').trim();

    const matched = feesList.filter(f => {
      const fRoll = (f.rollNo || '').trim().toLowerCase();
      const fStudentId = (f.studentId || '').trim().toLowerCase();
      const fName = (f.studentName || '').trim().toLowerCase();

      return (
        (sRoll && (fRoll === sRoll || fStudentId === sRoll)) ||
        (sPhone && (fStudentId === sPhone || fRoll === sPhone)) ||
        (sName && (fName === sName || fName.includes(sName)))
      );
    });

    if (matched.length > 0) {
      return matched.map((f, idx) => {
        const total = parseFloat(String(f.amount || 0).replace(/[^0-9.]/g, '')) || 0;
        const base = Math.round(total / 1.18);
        const gst = total - base;

        return {
          id: `DVA/2026-27/INV-${String(f.id || (100 + idx)).padStart(4, '0')}`,
          date: f.date || '15.06.2026',
          student: f.studentName || student.name,
          rollNo: f.rollNo || student.studentId || student.rollNo,
          branch: "Bhubaneswar Center",
          course: `${f.course || student.courseCode || 'APIDS'} - Core Analytics & Machine Learning`,
          batch: f.batch || student.batch,
          totalAmount: total,
          baseFee: base,
          gst: gst,
          status: "Paid in Full",
          paymentMode: f.modeOfPay || "Razorpay / UPI",
          refNumber: f.referenceDoc || `PAY_${(f.date || '20260615').replace(/[^0-9]/g, '')}_${88120 + idx}`,
          counselor: "Debendra Das Debadutta"
        };
      });
    }

    // Default fallback invoice if none recorded yet
    const fallbackTotal = parseFloat(String(student.paidFee || 35000).replace(/[^0-9.]/g, '')) || 35000;
    const fallbackBase = Math.round(fallbackTotal / 1.18);
    return [
      {
        id: `DVA/2026-27/INV-0142`,
        date: student.startDate || "15.06.2026",
        student: student.name,
        rollNo: student.studentId || student.rollNo,
        branch: "Bhubaneswar Center",
        course: `${student.courseCode || 'APIDS'} - Core Analytics & Machine Learning`,
        batch: student.batch,
        totalAmount: fallbackTotal,
        baseFee: fallbackBase,
        gst: fallbackTotal - fallbackBase,
        status: "Paid in Full",
        paymentMode: "Razorpay / UPI",
        refNumber: "PAY_20260615_88129",
        counselor: "Debendra Das Debadutta"
      }
    ];
  }, [feesList, student]);

  // Calculate total paid & due
  const totalPaid = studentInvoices.reduce((sum, inv) => sum + (inv.totalAmount || 0), 0);
  const committedFee = parseFloat(String(student?.totalFee || student?.committedFee || 65000).replace(/[^0-9.]/g, '')) || 65000;
  const balanceFee = Math.max(0, committedFee - totalPaid);

  const handleSave = (e) => {
    e.preventDefault();
    saveStudentProfile({
      ...student,
      name,
      email,
      phone
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
          <User className="w-4 h-4 text-orange-500" />
          <span>/</span>
          <span className="text-slate-900 font-semibold">Account Profile & Official Invoices</span>
        </div>

        {studentInvoices.length > 0 && (
          <button
            onClick={() => setSelectedInvoice(studentInvoices[0])}
            className="px-3.5 py-1.5 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-700 border border-teal-500/30 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Latest Fee Invoice</span>
          </button>
        )}
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Profile updated successfully! All changes are synced with Admin Portal.
        </div>
      )}

      {/* Main Profile Info Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex items-center gap-5 pb-6 border-b border-slate-100">
          <img
            src={student?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256"}
            alt={name || student?.name}
            className="w-20 h-20 rounded-2xl object-cover ring-4 ring-orange-500/20"
          />
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-orange-50 text-orange-600 border border-orange-200">
              {student?.batch || "BATCH 202606"}
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-1">{name || student?.name}</h2>
            <p className="text-xs text-slate-500 font-mono">Student ID: {student?.studentId || student?.rollNo}</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Full Legal Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Active Program</label>
              <input
                type="text"
                disabled
                value={`${student?.courseCode || 'APIDS'} - Advanced Program in Data Science`}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" /> Save Profile Changes
            </button>
          </div>
        </form>
      </div>

      {/* Official Fee Invoices & Tax Receipts Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Receipt className="w-4 h-4 text-teal-600" />
              Official Fee Invoices & Tax Receipts
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              GST Tax Invoices compliant with Section 31 of CGST Act. Valid for reimbursement and tax declarations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
              Total Paid: ₹{totalPaid.toLocaleString('en-IN')}
            </span>
            {balanceFee > 0 ? (
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-red-50 text-red-600 border border-red-200">
                Balance Due: ₹{balanceFee.toLocaleString('en-IN')}
              </span>
            ) : (
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-teal-50 text-teal-700 border border-teal-200">
                Fee Cleared
              </span>
            )}
          </div>
        </div>

        {/* Invoices Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider text-[10px]">
                <th className="py-2.5 px-3 font-bold">Invoice No</th>
                <th className="py-2.5 px-3 font-bold">Date</th>
                <th className="py-2.5 px-3 font-bold">Particulars / Module</th>
                <th className="py-2.5 px-3 font-bold text-right">Taxable (₹)</th>
                <th className="py-2.5 px-3 font-bold text-right">GST 18% (₹)</th>
                <th className="py-2.5 px-3 font-bold text-right">Total (₹)</th>
                <th className="py-2.5 px-3 font-bold text-center">Status</th>
                <th className="py-2.5 px-3 font-bold text-right">Invoice Format</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {studentInvoices.map((inv, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-teal-700">{inv.id}</td>
                  <td className="py-3 px-3 font-mono text-slate-600">{inv.date}</td>
                  <td className="py-3 px-3">
                    <span className="font-bold text-slate-900 block">{inv.course}</span>
                    <span className="text-[10px] text-slate-400 font-mono">Ref: {inv.refNumber}</span>
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-slate-600">₹{inv.baseFee.toLocaleString('en-IN')}</td>
                  <td className="py-3 px-3 text-right font-mono text-slate-500">₹{inv.gst.toLocaleString('en-IN')}</td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">₹{inv.totalAmount.toLocaleString('en-IN')}</td>
                  <td className="py-3 px-3 text-center">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => setSelectedInvoice(inv)}
                      className="px-2.5 py-1 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-[11px] border border-teal-200 transition-colors inline-flex items-center gap-1 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5 text-teal-600" />
                      <span>View Invoice</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Official Tax Invoice Format Modal */}
      <InvoiceFormatModal
        isOpen={!!selectedInvoice}
        invoice={selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
      />
    </div>
  );
}
