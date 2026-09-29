import React, { useState } from 'react';
import { MessageSquarePlus, Star, Send, CheckCircle2 } from 'lucide-react';

export default function FeedbackPage({ student }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500 font-medium bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <MessageSquarePlus className="w-4 h-4 text-orange-500" />
        <span>/</span>
        <span className="text-slate-900 font-semibold">Course & Faculty Feedback</span>
      </div>

      {submitted ? (
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Thank you for your valuable feedback!</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Your evaluation helps DV Analytics continuously refine curriculum delivery, live mentorship, and practical workshop quality.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold"
          >
            Submit Another Feedback
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Student Feedback Form</h3>
            <p className="text-xs text-slate-500 mt-0.5">Please rate the ongoing APIDS modules and session faculty.</p>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Select Module</label>
            <select className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-500/20">
              <option>Excel Base & Advanced - Dr. Sandip Mukherjee</option>
              <option>Excel VBA Macro Automation</option>
              <option>SQL Server Relational Database Architecture</option>
              <option>Power BI Complete Mastery</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-2">Overall Teaching & Content Rating</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <Star className={`w-7 h-7 ${star <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />
                </button>
              ))}
              <span className="text-xs font-bold text-slate-700 ml-2">{rating} out of 5 Stars</span>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Detailed Suggestions & Comments</label>
            <textarea
              rows={4}
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What did you like about this module? Any areas where the pace or practical case studies could be improved?"
              className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2"
            >
              <Send className="w-4 h-4" /> Submit Feedback
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
