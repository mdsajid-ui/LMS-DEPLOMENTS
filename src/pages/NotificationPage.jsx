import React, { useState } from 'react';
import { Bell, Mail, CheckCircle, Clock } from 'lucide-react';
import { notificationsList } from '../data/mockData';

export default function NotificationPage() {
  const [filter, setFilter] = useState('all');

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500 font-medium bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <Bell className="w-4 h-4 text-orange-500" />
        <span>/</span>
        <span className="text-slate-900 font-semibold">Notifications & Announcements</span>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-sm">All System Announcements</h3>
          <span className="text-xs text-orange-600 font-bold">250 Messages</span>
        </div>

        <div className="divide-y divide-slate-100">
          {notificationsList.map(n => (
            <div key={n.id} className="py-4 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">{n.title}</span>
                <span className="text-[10px] text-slate-400 font-mono">{n.time}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{n.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
