import React, { useState } from 'react';
import { MessagesSquare, ThumbsUp, MessageCircle, Search, PlusCircle, CheckCircle2 } from 'lucide-react';
import { forumTopics } from '../data/mockData';

export default function DiscussionForumPage() {
  const [topics, setTopics] = useState(forumTopics);
  const [newTitle, setNewTitle] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleCreateTopic = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const newTopic = {
      id: `F-${topics.length + 1}`,
      title: newTitle,
      author: "SK Abdul Sajid",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      tag: "General",
      replies: 0,
      upvotes: 1,
      time: "Just now",
      answered: false
    };
    setTopics([newTopic, ...topics]);
    setNewTitle('');
    setShowModal(false);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Breadcrumb & Ask Question */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
          <MessagesSquare className="w-4 h-4 text-orange-500" />
          <span>/</span>
          <span className="text-slate-900 font-semibold">Discussion Forum</span>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-xs transition-all self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" /> Ask Community & Mentors
        </button>
      </div>

      {showModal && (
        <div className="p-5 bg-white rounded-2xl border-2 border-orange-400 shadow-md space-y-3 animate-in fade-in">
          <h4 className="text-sm font-bold text-slate-900">Post a New Technical Doubt</h4>
          <input
            type="text"
            placeholder="What is your question or issue in Excel, SQL or Python?"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
          />
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => setShowModal(false)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateTopic}
              className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-orange-500 text-white hover:bg-orange-600"
            >
              Post Question
            </button>
          </div>
        </div>
      )}

      {/* Forum Topics Feed */}
      <div className="space-y-3">
        {topics.map((t) => (
          <div key={t.id} className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:border-orange-200 transition-all flex items-start gap-4">
            <img src={t.avatar} alt={t.author} className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900">{t.author}</span>
                <span className="text-[10px] text-slate-400">• {t.time}</span>
                <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                  {t.tag}
                </span>
                {t.answered && (
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Answered
                  </span>
                )}
              </div>
              <h4 className="font-bold text-slate-800 text-sm mt-1 hover:text-orange-600 cursor-pointer transition-colors">
                {t.title}
              </h4>
              <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                <span className="flex items-center gap-1 text-slate-600 hover:text-orange-600 cursor-pointer">
                  <ThumbsUp className="w-3.5 h-3.5" /> {t.upvotes} Upvotes
                </span>
                <span className="flex items-center gap-1 text-slate-600 hover:text-blue-600 cursor-pointer">
                  <MessageCircle className="w-3.5 h-3.5" /> {t.replies} Replies
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
