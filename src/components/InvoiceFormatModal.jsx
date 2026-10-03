import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  Check, 
  Copy, 
  QrCode, 
  ShieldCheck, 
  Building2, 
  FileText, 
  Award,
  CreditCard,
  ExternalLink,
  Calendar,
  CheckCircle2
} from 'lucide-react';

export default function InvoiceFormatModal({ invoice, isOpen, onClose }) {
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen || !invoice) return null;

  // Defaults and calculations
  const invoiceId = invoice.id || invoice.invoiceNo || "DVA-2026-INV-0842";
  const invoiceDate = invoice.date || "01.10.2026";
  const studentName = invoice.student || invoice.studentName || "Sajid";
  const rollNo = invoice.rollNo || invoice.studentId || "DV-APIDS-2026-042";
  const course = invoice.course || "APIDS (Advanced Program in Industrial Data Science & AI)";
  const batch = invoice.batch || "BATCH 202606";
  const branch = invoice.branch || "Bhubaneswar (Saheed Nagar Center)";
  const paymentMode = invoice.paymentMode || invoice.modeOfPay || "UPI / Net Banking";
  const refNumber = invoice.refNumber || invoice.referenceDoc || "UTR-20261001-99824";
  const counselor = invoice.counselor || "Debendra Das Debadutta";

  const totalAmount = invoice.totalAmount ? Number(invoice.totalAmount) : (invoice.amount ? Number(invoice.amount) : 65000);
  const baseFee = invoice.baseFee ? Number(invoice.baseFee) : Math.round(totalAmount / 1.18);
  const totalGst = invoice.gst ? Number(invoice.gst) : (totalAmount - baseFee);
  const cgst = Math.round(totalGst / 2);
  const sgst = totalGst - cgst;

  // Number to Indian words helper
  const amountToWords = (num) => {
    if (!num) return "Zero Rupees Only";
    const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
    const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    
    const n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return num + " Rupees";
    let str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';
    return "Rupees " + str.trim() + " Only";
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://edu.dvanalyticsmds.com/verify-invoice?id=${invoiceId}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-slate-300 overflow-hidden flex flex-col max-h-[94vh] text-slate-800 font-sans">
        
        {/* Modal Top Control Bar (Hidden on print) */}
        <div className="bg-slate-900 text-white px-5 py-3 flex items-center justify-between border-b border-slate-800 print:hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-extrabold text-white">Official Tax Invoice Format</h3>
              <p className="text-[10px] text-slate-400">GST-Compliant Student Fee Receipt • Section 31 CGST Act</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              title="Copy verification URL"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? "Copied Link" : "Copy Link"}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer text-lg leading-none"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Invoice Body */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-6 bg-white print:p-8 print:m-0" id="official-tax-invoice-sheet">
          
          {/* Company Brand Header */}
          <div className="border-b-2 border-slate-900 pb-5">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#202d3d] text-white flex items-center justify-center font-black text-sm tracking-wider shadow-sm">
                    DV
                  </div>
                  <div>
                    <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-none">
                      DV DATA & ANALYTICS PVT. LTD.
                    </h1>
                    <span className="text-[11px] font-bold text-teal-700 uppercase tracking-wider block mt-1">
                      Premier Industrial Institute for Data Science, AI & Cloud Computing
                    </span>
                  </div>
                </div>

                <div className="mt-3 text-[11px] text-slate-600 space-y-0.5 leading-relaxed">
                  <p><strong>Corporate Office:</strong> No. 42, 3rd Floor, Outer Ring Road, Marathahalli, Bangalore, Karnataka - 560037</p>
                  <p><strong>Regional Center:</strong> Plot No. A/122, Saheed Nagar, Bhubaneswar, Odisha - 751007</p>
                  <p><strong>Web:</strong> https://www.dvanalyticsmds.com | <strong>Email:</strong> billing@dvanalyticsmds.com | <strong>Tel:</strong> +91-9019030033</p>
                </div>
              </div>

              <div className="text-left sm:text-right text-xs space-y-1">
                <div className="inline-block px-3 py-1 bg-slate-900 text-white rounded font-mono font-bold text-[11px] uppercase tracking-wider">
                  TAX INVOICE / RECEIPT
                </div>
                <div className="text-[10px] text-slate-500 font-bold uppercase mt-1">Original for Recipient</div>
                <div className="text-[11px] text-slate-700 pt-1">
                  <strong>CIN:</strong> <span className="font-mono">U74900OR2017PTC027150</span><br />
                  <strong>GSTIN:</strong> <span className="font-mono font-bold text-teal-800">21AAACD4498E1Z4</span><br />
                  <strong>PAN:</strong> <span className="font-mono">AAACD4498E</span>
                </div>
              </div>
            </div>
          </div>

          {/* Invoice & Student Metadata Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
            {/* Left: Invoice Metadata */}
            <div className="space-y-1.5 divide-y divide-slate-200/70">
              <div className="flex items-center justify-between pb-1">
                <span className="text-slate-500 font-semibold">Invoice No:</span>
                <strong className="font-mono font-bold text-slate-900 text-sm">{invoiceId}</strong>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-slate-500 font-semibold">Invoice Date:</span>
                <span className="font-mono font-bold text-slate-800">{invoiceDate}</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-slate-500 font-semibold">Place of Supply:</span>
                <span className="font-bold text-slate-800">State Code: 21 (Odisha)</span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-slate-500 font-semibold">Reverse Charge Applicable:</span>
                <span className="font-bold text-slate-800">No (Forward Charge)</span>
              </div>
            </div>

            {/* Right: Student Bill-To */}
            <div className="space-y-1.5 divide-y divide-slate-200/70">
              <div className="flex items-center justify-between pb-1">
                <span className="text-slate-500 font-semibold">Student Name:</span>
                <strong className="font-bold text-slate-900 text-sm">{studentName}</strong>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-slate-500 font-semibold">Roll No / Student ID:</span>
                <span className="font-mono font-bold text-teal-800">{rollNo}</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-slate-500 font-semibold">Assigned Cohort Batch:</span>
                <span className="font-semibold text-slate-800">{batch}</span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-slate-500 font-semibold">Enrolled Center:</span>
                <span className="font-semibold text-slate-800">{branch}</span>
              </div>
            </div>
          </div>

          {/* Itemized Particulars Table */}
          <div className="overflow-x-auto border border-slate-300 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white uppercase text-[10px] tracking-wider font-semibold font-mono">
                  <th className="py-2.5 px-3 w-10 text-center">#</th>
                  <th className="py-2.5 px-3">Description of Services</th>
                  <th className="py-2.5 px-3 text-center">HSN/SAC</th>
                  <th className="py-2.5 px-3 text-right">Taxable Value (₹)</th>
                  <th className="py-2.5 px-3 text-right">CGST (9%)</th>
                  <th className="py-2.5 px-3 text-right">SGST (9%)</th>
                  <th className="py-2.5 px-4 text-right">Total (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="py-3 px-3 text-center font-mono text-slate-400 font-bold">1</td>
                  <td className="py-3 px-3">
                    <strong className="text-slate-900 block font-bold">{course}</strong>
                    <span className="text-[11px] text-slate-500 block mt-0.5">
                      Professional Industrial Training, Cloud Sandbox Allocation, LMS Access & Placement Cell Support.
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center font-mono font-bold text-slate-600">999293</td>
                  <td className="py-3 px-3 text-right font-mono font-semibold text-slate-800">
                    ₹{baseFee.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-slate-600">
                    ₹{cgst.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-slate-600">
                    ₹{sgst.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-black text-slate-900">
                    ₹{totalAmount.toLocaleString('en-IN')}
                  </td>
                </tr>
              </tbody>
              <tfoot className="bg-slate-100 border-t-2 border-slate-300 font-bold text-slate-900">
                <tr>
                  <td colSpan={3} className="py-2.5 px-4 text-right font-mono font-extrabold uppercase text-[11px]">
                    Total Taxable Base:
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono">₹{baseFee.toLocaleString('en-IN')}</td>
                  <td className="py-2.5 px-3 text-right font-mono">₹{cgst.toLocaleString('en-IN')}</td>
                  <td className="py-2.5 px-3 text-right font-mono">₹{sgst.toLocaleString('en-IN')}</td>
                  <td className="py-2.5 px-4 text-right font-mono font-black text-emerald-700 text-sm">
                    ₹{totalAmount.toLocaleString('en-IN')}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Amount in Words */}
          <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200/80 text-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider block">Total Amount in Words:</span>
              <strong className="text-emerald-950 font-serif text-sm italic">{amountToWords(totalAmount)}</strong>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-600 text-white rounded-md text-xs font-bold font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" /> PAID IN FULL
            </div>
          </div>

          {/* Payment Settlement & Bank Particulars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Payment Details */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-teal-600" />
                Payment Settlement Acknowledgment
              </span>
              <div className="text-[11px] text-slate-600 space-y-1 pt-1">
                <p><strong>Payment Instrument:</strong> {paymentMode}</p>
                <p><strong>Transaction / UTR Ref:</strong> <span className="font-mono font-bold text-slate-800">{refNumber}</span></p>
                <p><strong>Counselor / Authorized Officer:</strong> {counselor}</p>
                <p><strong>Settlement Status:</strong> Credited to DV Data & Analytics Pvt Ltd Account</p>
              </div>
            </div>

            {/* Bank Details for Verification */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-indigo-600" />
                Company Bank Verification Record
              </span>
              <div className="text-[11px] text-slate-600 space-y-1 pt-1">
                <p><strong>Bank:</strong> HDFC Bank Ltd</p>
                <p><strong>Account Name:</strong> DV DATA & ANALYTICS PRIVATE LIMITED</p>
                <p><strong>Current A/C No:</strong> <span className="font-mono font-bold text-slate-800">50200028491823</span></p>
                <p><strong>IFSC Code:</strong> <span className="font-mono font-bold text-slate-800">HDFC0000456</span> (Marathahalli)</p>
              </div>
            </div>
          </div>

          {/* Legal Declarations & Digital Signatures */}
          <div className="pt-4 border-t border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            {/* QR Code Validation */}
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-slate-100 border border-slate-300 rounded-lg flex flex-col items-center justify-center text-slate-700 p-1">
                <QrCode className="w-10 h-10 text-slate-800" />
                <span className="text-[8px] font-mono font-bold uppercase mt-0.5">Scan Verify</span>
              </div>
              <div className="text-[10px] space-y-0.5">
                <p className="font-bold text-slate-700">Digital Tax Compliance Seal</p>
                <p>Generated automatically under GST e-Invoice guidelines.</p>
                <p className="font-mono text-teal-700">Verify: edu.dvanalyticsmds.com/verify-invoice</p>
              </div>
            </div>

            {/* Signature Box */}
            <div className="text-right">
              <div className="inline-block border-b border-slate-400 pb-1 px-4 text-center">
                <span className="font-serif italic font-bold text-slate-800 text-sm block">Debendra Das Debadutta</span>
                <span className="text-[10px] text-slate-400 uppercase font-mono">Managing Director & Finance Signatory</span>
              </div>
              <p className="text-[9px] text-slate-400 mt-1">For DV DATA & ANALYTICS PRIVATE LIMITED</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
