import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../utils/themeContext';
import { Palette, Check, Sparkles, ChevronDown } from 'lucide-react';

export default function ThemeSelector({ compact = false, className = '' }) {
  const { theme, setTheme, THEMES, activeThemeMeta } = useTheme();
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative inline-block ${className}`} ref={containerRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
        className="mac-btn mac-btn-glass px-2.5 sm:px-3 py-1.5 rounded-full flex items-center gap-2 group cursor-pointer border shadow-2xs hover:shadow-xs transition-all"
        title={`Current Theme: ${activeThemeMeta.label}. Click to switch between 4 award-winning themes.`}
        aria-label="Change Application Theme"
      >
        {/* Dynamic Dual-Color Swatch */}
        <div className="flex items-center -space-x-1 shrink-0">
          <span 
            className="w-3 h-3 rounded-full border border-black/20 shadow-2xs"
            style={{ backgroundColor: activeThemeMeta.dotColor }}
          />
          <span 
            className="w-3 h-3 rounded-full border border-black/20 shadow-2xs"
            style={{ backgroundColor: activeThemeMeta.dotSecondary }}
          />
        </div>

        <span className="text-xs font-bold tracking-tight text-inherit flex items-center gap-1.5">
          <span>{activeThemeMeta.icon}</span>
          <span className={compact ? 'hidden md:inline' : 'inline'}>{activeThemeMeta.shortLabel}</span>
        </span>

        <ChevronDown className={`w-3 h-3 opacity-60 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {/* Popover Menu */}
      {open && (
        <div 
          className="absolute right-0 mt-2 w-72 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150 border theme-dropdown-surface"
          style={{
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
          }}
        >
          {/* Header */}
          <div className="px-3 py-2 border-b theme-dropdown-border flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-xs font-bold tracking-wider uppercase opacity-80">Select Theme</span>
            </div>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-500 border border-amber-500/30">
              4 Master Styles
            </span>
          </div>

          {/* Theme List */}
          <div className="p-1 space-y-1">
            {Object.values(THEMES).map((item) => {
              const isSelected = theme === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setTheme(item.id);
                    setOpen(false);
                  }}
                  className={`w-full flex items-start gap-3 p-2.5 rounded-xl text-left transition-all cursor-pointer group ${
                    isSelected
                      ? 'theme-option-active ring-1 ring-amber-500/40'
                      : 'hover:bg-slate-500/10'
                  }`}
                >
                  {/* Swatch & Icon */}
                  <div className="relative shrink-0 mt-0.5">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm shadow-xs border border-white/20"
                         style={{ 
                           background: `linear-gradient(135deg, ${item.dotColor} 0%, ${item.dotSecondary} 100%)` 
                         }}>
                      <span>{item.icon}</span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold truncate flex items-center gap-1">
                        {item.label}
                      </span>
                      {isSelected && (
                        <span className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] opacity-70 leading-snug line-clamp-1 mt-0.5">
                      {item.description}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-black/10 text-inherit border border-black/10">
                        {item.tag}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Footer note */}
          <div className="px-3 py-1.5 mt-1 border-t theme-dropdown-border text-[10px] opacity-60 text-center">
            Persists automatically across Student & Admin Portals
          </div>
        </div>
      )}
    </div>
  );
}
