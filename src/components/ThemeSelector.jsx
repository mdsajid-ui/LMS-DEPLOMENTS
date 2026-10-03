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
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className={`relative inline-block ${className}`} ref={containerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="mac-btn mac-btn-glass px-2.5 sm:px-3 py-1.5 rounded-full flex items-center gap-2 group cursor-pointer border shadow-2xs hover:shadow-xs transition-all select-none"
        title={`Current Theme: ${activeThemeMeta.label}. Click to select from 4 award-winning styles.`}
        aria-label="Change Application Theme"
        aria-expanded={open}
      >
        {/* Dynamic Dual-Color Swatch */}
        <div className="flex items-center -space-x-1 shrink-0">
          <span 
            className="w-3 h-3 rounded-full border border-black/20 shadow-2xs ring-1 ring-white/40"
            style={{ backgroundColor: activeThemeMeta.dotColor }}
          />
          <span 
            className="w-3 h-3 rounded-full border border-black/20 shadow-2xs ring-1 ring-white/40"
            style={{ backgroundColor: activeThemeMeta.dotSecondary }}
          />
        </div>

        <span className="text-xs font-bold tracking-tight text-inherit flex items-center gap-1.5">
          <span>{activeThemeMeta.icon}</span>
          <span className={compact ? 'hidden md:inline' : 'inline'}>{activeThemeMeta.shortLabel}</span>
        </span>

        <ChevronDown className={`w-3 h-3 opacity-60 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {/* Popover Menu with Scroll Protection and Max-Height Constraint */}
      {open && (
        <div 
          className="absolute right-0 mt-2 w-80 max-w-[92vw] rounded-2xl shadow-2xl p-2 z-50 border theme-dropdown-surface flex flex-col max-h-[calc(100vh-85px)] animate-in fade-in zoom-in-95 duration-150"
          style={{
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
          }}
        >
          {/* Header (Pinned) */}
          <div className="px-3 py-2 border-b theme-dropdown-border flex items-center justify-between shrink-0">
            <div className="flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-xs font-bold tracking-wider uppercase opacity-90">Select Theme</span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-500 border border-amber-500/30">
              4 Themes
            </span>
          </div>

          {/* Scrollable Theme List */}
          <div className="p-1 space-y-1 overflow-y-auto flex-1 overscroll-contain scrollbar-thin">
            {Object.values(THEMES).map((item) => {
              const isSelected = theme === item.id;
              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => {
                    setTheme(item.id);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-all cursor-pointer group select-none ${
                    isSelected
                      ? 'theme-option-active ring-1 ring-amber-500/50 shadow-xs'
                      : 'hover:bg-slate-500/10'
                  }`}
                >
                  {/* Swatch & Icon */}
                  <div className="relative shrink-0">
                    <div 
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-base shadow-xs border border-white/20"
                      style={{ 
                        background: `linear-gradient(135deg, ${item.dotColor} 0%, ${item.dotSecondary} 100%)` 
                      }}
                    >
                      <span>{item.icon}</span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 pr-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-bold truncate">
                        {item.label}
                      </span>
                      <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-black/10 text-inherit border border-black/10 shrink-0">
                        {item.tag}
                      </span>
                    </div>
                    <p className="text-[11px] opacity-70 leading-tight truncate mt-0.5" title={item.description}>
                      {item.description}
                    </p>
                  </div>

                  {/* Radio / Check Circle */}
                  <div className="shrink-0 flex items-center">
                    {isSelected ? (
                      <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-xs">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    ) : (
                      <span className="w-4 h-4 rounded-full border border-current opacity-25 group-hover:opacity-60 transition-opacity"></span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Footer note (Pinned) */}
          <div className="px-3 py-1.5 mt-1 border-t theme-dropdown-border text-[10px] opacity-60 text-center shrink-0">
            Auto-saves & syncs across Student & Admin Portals
          </div>
        </div>
      )}
    </div>
  );
}
