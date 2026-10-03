import React, { useState } from 'react';
import { 
  FileEdit, 
  GraduationCap, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  DownloadCloud, 
  Sparkles, 
  Database, 
  BarChart, 
  Cpu, 
  Cloud, 
  Award,
  Users,
  Briefcase
} from 'lucide-react';

export default function WelcomePage({ onNavigateToCourse, onNavigateToDashboard }) {
  const [programType, setProgramType] = useState('Live Program');

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Breadcrumb & Program Type Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
          <FileEdit className="w-4 h-4 text-orange-500" />
          <span>/</span>
          <span className="text-slate-900 font-semibold">Welcome</span>
        </div>

        {/* Dropdown Selector */}
        <div className="flex items-center gap-3">
          <label className="text-xs font-medium text-slate-500 hidden sm:inline">Cohort Type:</label>
          <select
            value={programType}
            onChange={(e) => setProgramType(e.target.value)}
            className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all cursor-pointer shadow-xs"
          >
            <option value="Live Program">Live Program (Batch 202606)</option>
            <option value="Self-Paced Track">Self-Paced Master Track</option>
            <option value="Weekend Executive">Weekend Executive Bootcamp</option>
          </select>
        </div>
      </div>

      {/* Hero Welcome Banner with macOS Window Styling & DV Logo Palette */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#081220] via-[#0d1d36] to-[#102a5c] text-white p-6 sm:p-10 shadow-xl border border-blue-900/40">
        {/* macOS Traffic Lights on Hero */}
        <div className="absolute top-5 right-6 hidden sm:flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/80"></span>
        </div>

        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            DV ANALYTICS FLAGSHIP COHORT
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Program Overview
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            <strong className="text-orange-400 font-semibold">APIDS</strong> (Advanced Program in Data Science and AI Skills) offers a comprehensive learning experience encompassing a 360-degree approach to industry applications in data science and artificial intelligence.
          </p>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            APIDS equips participants with the necessary skills and knowledge to excel in various high-demand roles within the data science and AI domain across banking, telecom, retail, e-commerce, insurance, life sciences, pharma, and global tech enterprises.
          </p>

          {/* Action CTAs - MacBook Push Buttons */}
          <div className="pt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={onNavigateToCourse}
              className="mac-btn mac-btn-orange px-5 py-2.5 rounded-xl text-white font-bold text-xs gap-2 shadow-lg cursor-pointer active:scale-95"
            >
              <span>Start Learning Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onNavigateToDashboard}
              className="mac-btn mac-btn-navy px-5 py-2.5 rounded-xl text-white font-semibold text-xs gap-2 border border-blue-400/40 cursor-pointer active:scale-95"
            >
              <span>View My Dashboard</span>
            </button>
            <button
              className="mac-btn mac-btn-dark px-4 py-2.5 rounded-xl text-slate-300 hover:text-white font-medium text-xs gap-2 cursor-pointer active:scale-95"
            >
              <DownloadCloud className="w-4 h-4 text-orange-400" />
              <span>Download Syllabus PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Program Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 flex-shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Duration</span>
            <h4 className="text-base font-bold text-slate-900 mt-0.5">6-8 Months</h4>
            <p className="text-xs text-slate-500 mt-0.5">250+ Hours Live Training</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Eligibility</span>
            <h4 className="text-base font-bold text-slate-900 mt-0.5">Any Graduate / Pro</h4>
            <p className="text-xs text-slate-500 mt-0.5">Graduates, Masters, PhDs</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Certification</span>
            <h4 className="text-base font-bold text-slate-900 mt-0.5">Industry Certified</h4>
            <p className="text-xs text-slate-500 mt-0.5">DV Analytics Verified ID</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 flex-shrink-0">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Placement Support</span>
            <h4 className="text-base font-bold text-slate-900 mt-0.5">100% Assistance</h4>
            <p className="text-xs text-slate-500 mt-0.5">Mock interviews & ATS CV</p>
          </div>
        </div>
      </div>

      {/* Curriculum & Skills Covers (Matching original description) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Curriculum & Skills Covered
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Carefully curated by industry leaders to take you from foundational logic to production-grade AI systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Card 1: DBMS Programming */}
          <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-teal-300 transition-all group">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-600 flex items-center justify-center">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                  DBMS Programming Skills
                </h3>
                <span className="text-[11px] text-slate-400 font-medium">Core Data Engineering & Querying</span>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              Hands-on mastery of relational databases, analytical querying, ETL processing, and distributed computing frameworks.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {['SQL Server', 'Python Programming', 'SAS Base & Advanced', 'PySpark', 'Scala', 'MS Access', 'DSA'].map((skill) => (
                <span key={skill} className="text-[11px] font-medium bg-white text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Card 2: Data Analysis & Visualization */}
          <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-amber-300 transition-all group">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                <BarChart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                  Data Analysis & Visualization
                </h3>
                <span className="text-[11px] text-slate-400 font-medium">Business Intelligence & Storytelling</span>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              Transform raw business data into actionable executive insights with advanced calculation engines and automated workflows.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {['Excel (Base & Advanced)', 'Excel VBA Macros', 'Tableau Desktop', 'Power BI Mastery', 'Alteryx ETL', 'EDA'].map((skill) => (
                <span key={skill} className="text-[11px] font-medium bg-white text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Card 3: Machine Learning & Gen AI */}
          <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-rose-300 transition-all group">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-rose-700 transition-colors">
                  Machine Learning & Gen AI
                </h3>
                <span className="text-[11px] text-slate-400 font-medium">Predictive Modeling & Modern AI</span>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              Build robust regression, classification, neural network architectures, and deploy Retrieval Augmented Generation (RAG) agent systems.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {['Supervised Learning', 'NLP & Sentiment Analysis', 'Deep Learning PyTorch', 'Generative AI', 'RAG Pipelines', 'LLMs'].map((skill) => (
                <span key={skill} className="text-[11px] font-medium bg-white text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Card 4: Cloud & Deployment */}
          <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-blue-300 transition-all group">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                <Cloud className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                  Cloud Computing & AI Deployment
                </h3>
                <span className="text-[11px] text-slate-400 font-medium">Production MLOps & Scalability</span>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              Containerize machine learning models, expose high-performance REST APIs with FastAPI, and deploy on enterprise cloud infrastructure.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {['AWS Cloud', 'Docker Containers', 'FastAPI', 'MLOps CI/CD', 'Git Version Control', 'API Security'].map((skill) => (
                <span key={skill} className="text-[11px] font-medium bg-white text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
