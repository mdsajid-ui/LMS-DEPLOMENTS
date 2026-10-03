import React from 'react';
import dvLogo from '../assets/dv-logo.png';

export default function Logo({ collapsed = false, className = '' }) {
  if (collapsed) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="w-10 h-10 rounded-xl bg-white p-1.5 flex items-center justify-center shadow-sm border border-slate-200/90 hover:shadow-md transition-shadow">
          <img 
            src={dvLogo} 
            alt="DV Analytics" 
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="h-10 px-3 py-1 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-200/90 hover:shadow-md transition-all">
        <img 
          src={dvLogo} 
          alt="DV Analytics - Transforming You" 
          className="h-8 w-auto object-contain max-w-[175px]"
        />
      </div>
    </div>
  );
}
