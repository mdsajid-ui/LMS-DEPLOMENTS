import React, { useState } from 'react';
import { Table, Database } from 'lucide-react';

export const TableSchemaViewer = ({ tables = [], rawSampleInput = '' }) => {
  const [activeTableIdx, setActiveTableIdx] = useState(0);

  // If explicit tables array is provided
  let parsedTables = Array.isArray(tables) && tables.length > 0 ? tables : [];

  // Fallback: parse sampleInput if it contains SQL markdown table definitions
  if (parsedTables.length === 0 && rawSampleInput) {
    parsedTables = parseMarkdownOrTextTables(rawSampleInput);
  }

  // Default fallback sample table if no explicit table provided
  if (parsedTables.length === 0) {
    parsedTables = [
      {
        tableName: 'EMPLOYEES',
        columns: ['id', 'name', 'department', 'salary'],
        sampleRows: [
          ['101', 'Sarah Jenkins', 'Engineering', '115000'],
          ['104', 'David Chen', 'Engineering', '98000'],
          ['108', 'Elena Rostova', 'Data Science', '125000'],
          ['112', 'Marcus Vance', 'Data Science', '92000'],
          ['115', 'Aria Montgomery', 'Product', '105000']
        ]
      }
    ];
  }

  const safeIdx = activeTableIdx < parsedTables.length ? activeTableIdx : 0;
  const activeTable = parsedTables[safeIdx] || parsedTables[0] || {};
  const activeTableName = activeTable.tableName || activeTable.name || `Table ${safeIdx + 1}`;

  // Process columns safely (can be array of strings or array of objects { name, type, key })
  const rawCols = Array.isArray(activeTable.columns) ? activeTable.columns : [];
  const processedCols = rawCols.map((col, idx) => {
    if (typeof col === 'object' && col !== null) {
      return {
        key: idx,
        name: String(col.name || col.columnName || `col_${idx + 1}`),
        type: col.type ? String(col.type) : '',
        constraint: col.key ? String(col.key) : ''
      };
    }
    return {
      key: idx,
      name: String(col),
      type: '',
      constraint: ''
    };
  });

  // Process rows safely (can be activeTable.sampleRows or activeTable.rows)
  const rawRows = Array.isArray(activeTable.sampleRows) && activeTable.sampleRows.length > 0
    ? activeTable.sampleRows
    : (Array.isArray(activeTable.rows) ? activeTable.rows : []);

  const processedRows = rawRows.map((row) => {
    if (Array.isArray(row)) {
      return row.map(cell => (cell !== null && cell !== undefined ? String(cell) : 'NULL'));
    }
    if (typeof row === 'object' && row !== null) {
      if (processedCols.length > 0) {
        return processedCols.map(colObj => {
          const val = row[colObj.name];
          return val !== null && val !== undefined ? String(val) : 'NULL';
        });
      }
      return Object.values(row).map(val => (val !== null && val !== undefined ? String(val) : 'NULL'));
    }
    return [String(row)];
  });

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 space-y-3 font-sans select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
          <Database className="w-3.5 h-3.5 text-sky-600" />
          <span>Table Details & Schema</span>
        </h3>
        {parsedTables.length > 1 && (
          <span className="text-[10px] bg-sky-50 text-sky-700 font-bold px-2 py-0.5 rounded border border-sky-200">
            {parsedTables.length} Tables Available
          </span>
        )}
      </div>

      {/* Multiple Table Selector Tabs if > 1 table */}
      {parsedTables.length > 1 && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5">
          {parsedTables.map((tbl, idx) => {
            const isActive = safeIdx === idx;
            const tName = tbl.tableName || tbl.name || `Table ${idx + 1}`;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveTableIdx(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#051f40] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                <Table className="w-3.5 h-3.5" />
                <span>{tName}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Table Title & Metadata */}
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
          {activeTableName} ({processedCols.length} Columns)
        </h4>
      </div>

      {/* Scrollable Container for Schema Grid */}
      <div className="overflow-x-auto overflow-y-auto max-h-[280px] border border-sky-200 rounded-lg shadow-2xs bg-white">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#dce9f9] text-[#051f40] border-b border-sky-300 font-bold text-[11px]">
              {processedCols.map((col) => (
                <th key={col.key} className="py-2 px-3 border-r border-sky-200 last:border-r-0 whitespace-nowrap font-bold">
                  <div className="flex items-center gap-1.5">
                    <span>{col.name}</span>
                    {col.type && (
                      <span className="text-[9px] font-mono bg-sky-100/80 text-sky-800 px-1 py-0.2 rounded font-normal">
                        {col.type}
                      </span>
                    )}
                    {col.constraint && (
                      <span className="text-[9px] font-bold bg-amber-100 text-amber-800 px-1 py-0.2 rounded">
                        {col.constraint}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 font-mono text-[11px] text-slate-800">
            {processedRows.map((row, rIdx) => (
              <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white hover:bg-sky-50/50' : 'bg-slate-50/70 hover:bg-sky-50/50'}>
                {row.map((cell, cIdx) => (
                  <td key={cIdx} className="py-1.5 px-3 border-r border-slate-200 last:border-r-0 whitespace-nowrap">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Helper parser for markdown format tables in problem statements
function parseMarkdownOrTextTables(text) {
  if (typeof text !== 'string') return [];
  const lines = text.split(/\r?\n/);
  const tables = [];
  let currentTable = null;

  lines.forEach(line => {
    const trimmed = line.trim();
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      const parts = trimmed.split('|').slice(1, -1).map(p => p.trim());
      if (parts.every(p => p.match(/^:?-+:?$/))) {
        // Separator line
        return;
      }
      if (!currentTable) {
        currentTable = { tableName: 'SCHEMA_TABLE', columns: parts, sampleRows: [] };
      } else {
        currentTable.sampleRows.push(parts);
      }
    } else {
      if (currentTable) {
        tables.push(currentTable);
        currentTable = null;
      }
    }
  });

  if (currentTable) tables.push(currentTable);
  return tables;
}
