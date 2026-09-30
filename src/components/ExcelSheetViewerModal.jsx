import React, { useState } from 'react';
import { 
  X, 
  Download, 
  FileSpreadsheet, 
  Table, 
  Check, 
  Filter, 
  Search,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { retailSalesDataset, generateAndDownloadExcel } from '../utils/excelHelper';

export default function ExcelSheetViewerModal({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRegion, setFilterRegion] = useState('All');
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [activeCell, setActiveCell] = useState({ row: 1, col: 'J', val: '₹8,998.20' });

  if (!isOpen) return null;

  const filteredData = retailSalesDataset.filter(item => {
    const matchesSearch = 
      item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = filterRegion === 'All' || item.region === filterRegion;
    return matchesSearch && matchesRegion;
  });

  const handleDownload = () => {
    generateAndDownloadExcel("DV_Analytics_Retail_Sales_Master.csv");
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-300 w-full max-w-6xl h-[88vh] flex flex-col overflow-hidden text-slate-800">
        
        {/* Excel Title Bar (Classic Microsoft Excel Green) */}
        <div className="bg-[#107c41] text-white px-4 py-2.5 flex items-center justify-between select-none">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-white/20 flex items-center justify-center font-bold text-sm text-white">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-semibold tracking-wide flex items-center gap-2">
                Retail_Sales_Raw_Data.xlsx — Excel Live Workbench
                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-800/80 border border-emerald-600">
                  Auto-Opened by Sanvi AI
                </span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="px-3 py-1 bg-white text-[#107c41] hover:bg-emerald-50 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
              title="Download real Excel/CSV file to your desktop"
            >
              {downloadSuccess ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Download className="w-3.5 h-3.5" />}
              <span>{downloadSuccess ? "Downloaded!" : "Download .XLSX / CSV"}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-emerald-800/70 rounded-lg text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Excel Ribbon Toolbar */}
        <div className="bg-slate-100 border-b border-slate-200 px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-slate-500" /> Region:
            </span>
            {['All', 'Bangalore', 'Bhubaneswar', 'Dubai'].map(reg => (
              <button
                key={reg}
                onClick={() => setFilterRegion(reg)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  filterRegion === reg 
                    ? 'bg-[#107c41] text-white shadow-xs' 
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search transactions, customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1 bg-white border border-slate-200 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-[#107c41] w-48 sm:w-64"
              />
            </div>
          </div>
        </div>

        {/* Excel Formula Bar */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-1.5 flex items-center gap-3 text-xs font-mono">
          <div className="w-16 px-2 py-0.5 bg-white border border-slate-200 rounded text-center text-slate-700 font-semibold shadow-2xs">
            {activeCell.col}{activeCell.row}
          </div>
          <span className="text-slate-400 font-bold italic">fx</span>
          <div className="flex-1 bg-white border border-slate-200 rounded px-2.5 py-0.5 text-slate-800 truncate shadow-2xs">
            =XLOOKUP(A{activeCell.row} & B{activeCell.row}, Products!A:A & Products!B:B, Products!C:C, "Not Found", 0)
          </div>
        </div>

        {/* Spreadsheet Data Grid */}
        <div className="flex-1 overflow-auto bg-white">
          <table className="w-full border-collapse text-xs font-mono select-none">
            <thead className="sticky top-0 bg-slate-100 z-10 text-slate-600 border-b border-slate-300">
              <tr>
                <th className="w-10 py-1.5 px-2 bg-slate-200 border-r border-b border-slate-300 text-center font-normal text-[11px] text-slate-500"></th>
                <th className="py-1.5 px-3 border-r border-b border-slate-300 text-left font-semibold text-slate-700">A [TxnID]</th>
                <th className="py-1.5 px-3 border-r border-b border-slate-300 text-left font-semibold text-slate-700">B [Date]</th>
                <th className="py-1.5 px-3 border-r border-b border-slate-300 text-left font-semibold text-slate-700">C [Customer]</th>
                <th className="py-1.5 px-3 border-r border-b border-slate-300 text-left font-semibold text-slate-700">D [Category]</th>
                <th className="py-1.5 px-3 border-r border-b border-slate-300 text-left font-semibold text-slate-700">E [Product]</th>
                <th className="py-1.5 px-3 border-r border-b border-slate-300 text-right font-semibold text-slate-700">F [Units]</th>
                <th className="py-1.5 px-3 border-r border-b border-slate-300 text-right font-semibold text-slate-700">G [Unit Price]</th>
                <th className="py-1.5 px-3 border-r border-b border-slate-300 text-right font-semibold text-slate-700">H [Gross Rev]</th>
                <th className="py-1.5 px-3 border-r border-b border-slate-300 text-right font-semibold text-slate-700">I [Disc %]</th>
                <th className="py-1.5 px-3 border-r border-b border-slate-300 text-right font-semibold text-[#107c41]">J [Net Revenue]</th>
                <th className="py-1.5 px-3 border-r border-b border-slate-300 text-left font-semibold text-slate-700">K [Region]</th>
                <th className="py-1.5 px-3 border-b border-slate-300 text-left font-semibold text-slate-700">L [Payment]</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, idx) => {
                const rowNum = idx + 1;
                const isSelected = activeCell.row === rowNum;

                return (
                  <tr 
                    key={row.id}
                    onClick={() => setActiveCell({ row: rowNum, col: 'J', val: `₹${row.net.toLocaleString('en-IN')}` })}
                    className={`hover:bg-emerald-50/60 cursor-pointer transition-colors ${
                      isSelected ? 'bg-emerald-100/40 ring-1 ring-inset ring-[#107c41]' : idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'
                    }`}
                  >
                    <td className="py-1.5 px-2 bg-slate-100 border-r border-b border-slate-200 text-center text-slate-500 font-sans text-[11px]">
                      {rowNum}
                    </td>
                    <td className="py-1.5 px-3 border-r border-b border-slate-200 text-slate-800 font-semibold">{row.id}</td>
                    <td className="py-1.5 px-3 border-r border-b border-slate-200 text-slate-600">{row.date}</td>
                    <td className="py-1.5 px-3 border-r border-b border-slate-200 text-slate-900 font-medium font-sans">{row.customer}</td>
                    <td className="py-1.5 px-3 border-r border-b border-slate-200 text-slate-600 font-sans">{row.category}</td>
                    <td className="py-1.5 px-3 border-r border-b border-slate-200 text-slate-800 font-sans truncate max-w-xs">{row.product}</td>
                    <td className="py-1.5 px-3 border-r border-b border-slate-200 text-right text-slate-700">{row.units}</td>
                    <td className="py-1.5 px-3 border-r border-b border-slate-200 text-right text-slate-700">₹{row.price.toLocaleString('en-IN')}</td>
                    <td className="py-1.5 px-3 border-r border-b border-slate-200 text-right text-slate-700">₹{row.gross.toLocaleString('en-IN')}</td>
                    <td className="py-1.5 px-3 border-r border-b border-slate-200 text-right text-amber-600 font-bold">{(row.discount * 100).toFixed(0)}%</td>
                    <td className="py-1.5 px-3 border-r border-b border-slate-200 text-right font-bold text-[#107c41] bg-emerald-50/30">
                      ₹{row.net.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-1.5 px-3 border-r border-b border-slate-200 text-slate-700 font-sans">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                        row.region === 'Bangalore' ? 'bg-blue-50 text-blue-700' :
                        row.region === 'Bhubaneswar' ? 'bg-orange-50 text-orange-700' :
                        'bg-purple-50 text-purple-700'
                      }`}>
                        {row.region}
                      </span>
                    </td>
                    <td className="py-1.5 px-3 border-b border-slate-200 text-slate-600 font-sans">{row.payment}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Excel Status Bar & Bottom Sheet Tabs */}
        <div className="bg-slate-100 border-t border-slate-300 px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="px-3 py-1 bg-white border border-b-2 border-b-[#107c41] text-[#107c41] font-bold rounded-t text-xs shadow-2xs">
              Retail_Sales_Raw
            </span>
            <span className="px-3 py-1 bg-slate-200/60 text-slate-600 font-medium rounded-t text-xs hover:bg-slate-200 cursor-pointer">
              Pivot_Summary
            </span>
            <span className="px-3 py-1 bg-slate-200/60 text-slate-600 font-medium rounded-t text-xs hover:bg-slate-200 cursor-pointer">
              Lookup_Master
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-500 font-mono">
            <span>COUNT: {filteredData.length}</span>
            <span>SUM(Net): ₹{filteredData.reduce((acc, c) => acc + c.net, 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
            <button
              onClick={handleDownload}
              className="text-[#107c41] font-bold hover:underline flex items-center gap-1 cursor-pointer font-sans"
            >
              <Download className="w-3 h-3" /> Save to Computer (.xlsx/.csv)
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
