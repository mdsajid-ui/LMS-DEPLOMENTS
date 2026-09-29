import React from 'react';
import { X, Mail, Bell, Check, Trash2, ArrowRight } from 'lucide-react';
import { notificationsList } from '../data/mockData';

export default function NotificationModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 sm:p-6 bg-slate-950/40 backdrop-blur-xs animate-in fade-in">
      <div 
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden flex flex-col max-h-[85vh] animate-in slide-in-from-right-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">Student Notifications</h3>
              <p className="text-[11px] text-slate-400">250 Unread Messages & Alerts</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Notification Stream */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1 divide-y divide-slate-100">
          {notificationsList.map((n) => (
            <div key={n.id} className="pt-3 first:pt-0 group">
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-bold text-slate-800 group-hover:text-orange-600 transition-colors">
                  {n.title}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">{n.time}</span>
              </div>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                {n.message}
              </p>
            </div>
          ))}
          <div className="text-center py-4 text-xs text-slate-400 italic">
            + 246 older archived batch announcements
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
          <button className="text-slate-600 hover:text-slate-900 font-medium">Mark all as read</button>
          <button onClick={onClose} className="text-orange-600 font-bold hover:underline">
            Close &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
