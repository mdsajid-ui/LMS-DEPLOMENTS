import React, { useState } from 'react';
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

export default function AccountProfilePage({ student }) {
  const [saved, setSaved] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const studentInvoices = [
    {
      id: "DVA/2026-27/INV-0142",
      date: "15.06.2026",
      student: student.name,
      rollNo: student.studentId,
      branch: "Bhubaneswar Center",
      course: `${student.courseCode} - Core Analytics & Machine Learning (Term 1)`,
      batch: student.batch,
      totalAmount: 35000,
      baseFee: 29661,
      gst: 5339,
      status: "Paid in Full",
      paymentMode: "Razorpay / UPI",
      refNumber: "PAY_20260615_88129",
      counselor: "Debendra Das Debadutta"
    },
    {
      id: "DVA/2026-27/INV-0289",
      date: "18.08.2026",
      student: student.name,
      rollNo: student.studentId,
      branch: "Bhubaneswar Center",
      course: `${student.courseCode} - Gen AI, Cloud Sandbox & Placement Support (Term 2)`,
      batch: student.batch,
      totalAmount: 30000,
      baseFee: 25424,
      gst: 4576,
      status: "Paid in Full",
      paymentMode: "Net Banking (HDFC)",
      refNumber: "UTR-20260818-44910",
      counselor: "Debendra Das Debadutta"
    }
  ];

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
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

        <button
          onClick={() => setSelectedInvoice(studentInvoices[0])}
          className="px-3.5 py-1.5 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-700 border border-teal-500/30 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Latest Fee Invoice</span>
        </button>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Profile updated successfully!
        </div>
      )}

      {/* Main Profile Info Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex items-center gap-5 pb-6 border-b border-slate-100">
          <img
            src={student.avatar}
            alt={student.name}
            className="w-20 h-20 rounded-2xl object-cover ring-4 ring-orange-500/20"
          />
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-orange-50 text-orange-600 border border-orange-200">
              {student.batch}
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-1">{student.name}</h2>
            <p className="text-xs text-slate-500 font-mono">Student ID: {student.studentId}</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Full Legal Name</label>
              <input
                type="text"
                defaultValue={student.name}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
              <input
                type="email"
                defaultValue={student.email}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Active Program</label>
              <input
                type="text"
                disabled
                defaultValue={`${student.courseCode} - Advanced Program in Data Science`}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Batch Enrollment Date</label>
              <input
                type="text"
                disabled
                defaultValue={student.startDate}
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
              Total Paid: ₹65,000 (100%)
            </span>
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
