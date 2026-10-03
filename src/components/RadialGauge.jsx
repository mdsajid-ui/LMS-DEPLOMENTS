import React from 'react';

export default function RadialGauge({
  title,
  percentage = 0,
  status = 'Pending',
  color = '#ef4444',
  size = 180,
  strokeWidth = 13,
  subtitle,
  icon: Icon
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/80 hover:shadow-md transition-all flex flex-col justify-between text-center relative overflow-hidden group h-full select-none">
      {/* Top Header - Fixed height so all 4 card headers are strictly aligned */}
      <div className="w-full h-11 flex items-center justify-between border-b border-slate-100/90 pb-2 mb-2">
        <div className="flex items-center gap-1.5 min-w-0 pr-1 text-left">
          {Icon && <Icon className="w-4 h-4 text-slate-500 shrink-0" />}
          <h3 className="font-bold text-slate-800 text-xs sm:text-sm truncate" title={title}>
            {title}
          </h3>
        </div>
        <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold shrink-0 whitespace-nowrap ${
          percentage > 50 
            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
            : percentage > 0 
              ? 'bg-amber-50 text-amber-700 border border-amber-200' 
              : 'bg-slate-100 text-slate-600 border border-slate-200'
        }`}>
          {percentage}% Done
        </span>
      </div>

      {/* SVG Radial Gauge - Centered in flex-1 container to ensure identical vertical center across all 4 cards */}
      <div className="flex-1 flex items-center justify-center my-1 py-1">
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
          <svg width={size} height={size} className="transform -rotate-90">
            {/* Background Track */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#e2e8f0"
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeLinecap="round"
            />
            {/* Animated Value Stroke */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={color}
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>

          {/* Center Text Info */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-2">
            <span className="text-[11px] font-bold text-slate-500 tracking-wider uppercase truncate max-w-full">
              {status}
            </span>
            <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight my-0.5">
              {percentage}%
            </span>
            {subtitle && (
              <span className="text-[11px] text-slate-400 font-medium truncate max-w-[130px]" title={subtitle}>
                {subtitle}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer quick action / summary - Strict uniform height & baseline */}
      <div className="w-full h-8 pt-2.5 mt-auto border-t border-slate-100/90 flex items-center justify-between text-xs text-slate-500">
        <span className="text-[11px]">Target: 100%</span>
        <span className="font-semibold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer flex items-center gap-0.5">
          <span>View details</span>
          <span>&rarr;</span>
        </span>
      </div>
    </div>
  );
}
