import React from 'react';

export default function RadialGauge({
  title,
  percentage = 0,
  status = 'Pending',
  color = '#ef4444',
  size = 200,
  strokeWidth = 14,
  subtitle,
  icon: Icon
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // If status is Pending and percentage is 0 or 100% pending
  const isCompleted = status.toLowerCase().includes('completed') || percentage > 0;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 hover:shadow-md transition-all flex flex-col items-center justify-between text-center relative overflow-hidden group">
      {/* Top Header */}
      <div className="w-full flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
        <h3 className="font-semibold text-slate-800 text-base flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4 text-slate-500" />}
          {title}
        </h3>
        <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
          percentage > 50 
            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
            : percentage > 0 
              ? 'bg-amber-50 text-amber-700 border border-amber-200' 
              : 'bg-slate-100 text-slate-600 border border-slate-200'
        }`}>
          {percentage}% Done
        </span>
      </div>

      {/* SVG Radial Gauge */}
      <div className="relative my-2 flex items-center justify-center">
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
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-sm font-semibold text-slate-500 tracking-wide uppercase">
            {status}
          </span>
          <span className="text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">
            {percentage}%
          </span>
          {subtitle && (
            <span className="text-xs text-slate-400 mt-1 max-w-[120px] truncate">
              {subtitle}
            </span>
          )}
        </div>
      </div>

      {/* Footer quick action / summary */}
      <div className="w-full pt-3 mt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Target: 100%</span>
        <span className="font-medium text-blue-600 hover:text-blue-700 cursor-pointer">
          View details &rarr;
        </span>
      </div>
    </div>
  );
}
