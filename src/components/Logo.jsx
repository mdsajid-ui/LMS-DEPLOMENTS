import React from 'react';

export default function Logo({ collapsed = false, className = '' }) {
  if (collapsed) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-900 to-slate-800 border border-slate-700/60 shadow-lg flex items-center justify-center font-bold text-xl tracking-tight">
          <span className="text-orange-500 font-black">D</span>
          <span className="text-blue-500 font-extrabold -ml-0.5">V</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-900 to-slate-800 border border-slate-700/60 shadow-md flex items-center justify-center font-bold text-xl tracking-tight flex-shrink-0">
        <span className="text-orange-500 font-black text-2xl">D</span>
        <span className="text-blue-500 font-extrabold text-2xl -ml-0.5">V</span>
      </div>
      <div className="flex flex-col">
        <div className="flex items-baseline">
          <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
            <span className="text-orange-500">DV</span> Analytics
          </span>
        </div>
        <span className="text-[10px] font-medium tracking-wider text-slate-500 -mt-1 italic">
          Transforming You
        </span>
      </div>
    </div>
  );
}
