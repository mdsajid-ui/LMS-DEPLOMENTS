import React, { useState } from 'react';
import { 
  BookOpen, 
  Calendar, 
  Folder, 
  FolderOpen, 
  ChevronDown, 
  ChevronUp, 
  Play, 
  Clock, 
  FileText, 
  CheckCircle2, 
  Search, 
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { courseCategories } from '../data/mockData';

export default function CoursesPage({ 
  student, 
  onSelectSubject 
}) {
  // Default first category expanded (DBMS AND PROGRAMMING as in Image 4)
  const [expandedCategories, setExpandedCategories] = useState({
    'dbms-programming': true,
    'data-analysis-visualization': false,
    'machine-learning-gen-ai': false,
    'cloud-computing-deployment': false
  });
  const [searchQuery, setSearchQuery] = useState('');

  const toggleCategory = (id) => {
    setExpandedCategories(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const expandAll = () => {
    const allExpanded = {};
    courseCategories.forEach(cat => allExpanded[cat.id] = true);
    setExpandedCategories(allExpanded);
  };

  const collapseAll = () => {
    const allCollapsed = {};
    courseCategories.forEach(cat => allCollapsed[cat.id] = false);
    setExpandedCategories(allCollapsed);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Breadcrumb (Matching Image 3) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
          <BookOpen className="w-4 h-4 text-orange-500" />
          <span>/</span>
          <span className="text-slate-900 font-semibold">Courses</span>
        </div>

        {/* Search & Accordion Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter subjects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-xs pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />
          </div>

          <button
            onClick={expandAll}
            className="text-xs px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 font-medium transition-colors"
          >
            Expand All
          </button>
          <button
            onClick={collapseAll}
            className="text-xs px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 font-medium transition-colors"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Course Header Banner: APIDS & 05.06.2026 (Matching black pill header in Images 3 & 4) */}
      <div className="bg-slate-950 text-white rounded-2xl px-6 py-4 flex items-center justify-between shadow-lg border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
              {student.courseCode}
            </h2>
            <span className="text-[11px] text-slate-400">
              Advanced Program in Data Science & AI Skills
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-xs font-mono text-slate-200">
          <Calendar className="w-4 h-4 text-orange-400" />
          <span className="font-semibold">{student.startDate}</span>
        </div>
      </div>

      {/* Course Categories (Accordions) */}
      <div className="space-y-5">
        {courseCategories.map((category) => {
          const isExpanded = expandedCategories[category.id];

          // Color schemes matching the 4 blocks in Image 3
          let headerColorClass = "bg-teal-600 hover:bg-teal-700 text-white";
          let badgeBorderClass = "border-teal-300";
          if (category.id === "data-analysis-visualization") {
            headerColorClass = "bg-amber-500 hover:bg-amber-600 text-white";
            badgeBorderClass = "border-amber-300";
          } else if (category.id === "machine-learning-gen-ai") {
            headerColorClass = "bg-rose-500 hover:bg-rose-600 text-white";
            badgeBorderClass = "border-rose-300";
          } else if (category.id === "cloud-computing-deployment") {
            headerColorClass = "bg-blue-600 hover:bg-blue-700 text-white";
            badgeBorderClass = "border-blue-300";
          }

          // Filter subjects if user searches
          const filteredSubjects = category.subjects.filter(s => 
            s.name.toLowerCase().includes(searchQuery.toLowerCase())
          );

          if (searchQuery && filteredSubjects.length === 0) return null;

          return (
            <div 
              key={category.id} 
              className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden transition-all duration-200"
            >
              {/* Accordion Header (Matches colored folders in Image 3) */}
              <button
                onClick={() => toggleCategory(category.id)}
                className={`w-full px-6 py-4 flex items-center justify-between text-left transition-all ${headerColorClass} shadow-xs`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                    {isExpanded ? (
                      <FolderOpen className="w-5 h-5 text-white" />
                    ) : (
                      <Folder className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base tracking-wide uppercase">
                      {category.title}
                    </h3>
                    <p className="text-xs text-white/80 font-normal mt-0.5">
                      {category.subjects.length} Core Modules • Industry Certified Curriculum
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="hidden sm:inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white">
                    {category.subjects.length} Subjects
                  </span>
                  <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center transition-transform">
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-white" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-white" />
                    )}
                  </div>
                </div>
              </button>

              {/* Accordion Content: Clean Subject Table matching edu.dvanalyticsmds.com/Course.aspx */}
              {isExpanded && (
                <div className="bg-white">
                  <table className="w-full text-left border-collapse">
                    <tbody>
                      {filteredSubjects.map((subject, index) => (
                        <tr 
                          key={subject.id}
                          className="border-b border-slate-100 hover:bg-slate-50/70 transition-colors"
                        >
                          {/* Col 1: S.No */}
                          <td className="py-4 px-6 text-xs sm:text-sm font-bold text-slate-700 w-16 text-center">
                            {index + 1}
                          </td>

                          {/* Col 2: Subject Name */}
                          <td className="py-4 px-6">
                            <span className="font-bold text-xs sm:text-sm text-slate-800 tracking-wide">
                              {subject.name}
                            </span>
                          </td>

                          {/* Col 3: Continue Button (Terracotta/Red Pill matching Screenshot) */}
                          <td className="py-4 px-6 text-right w-36">
                            <button
                              onClick={() => onSelectSubject(subject)}
                              className="inline-block px-5 py-1.5 rounded-full bg-[#c0392b] hover:bg-[#a93226] text-white text-xs font-bold shadow-xs hover:shadow transition-all cursor-pointer transform active:scale-95"
                            >
                              Continue
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
