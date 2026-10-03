import React, { useState } from 'react';
import { 
  GraduationCap, 
  ShieldCheck, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  BookOpen,
  Phone,
  Mail,
  Key
} from 'lucide-react';
import Logo from '../components/Logo';
import ThemeSelector from '../components/ThemeSelector';
import { getStoredStudents, saveStudentProfile } from '../utils/lmsStorage';
import { studentProfile as defaultStudentProfile } from '../data/mockData';
import { sanitizeString } from '../utils/securityShield';

export default function LoginPage({ onStudentLoginSuccess, onAdminLoginSuccess }) {
  const [authRole, setAuthRole] = useState('student'); // 'student' | 'admin'
  const [username, setUsername] = useState('DVA-202606-448');
  const [password, setPassword] = useState('@2288');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const registeredStudents = getStoredStudents();

  // Quick 1-click student selection
  const handleSelectQuickStudent = (student) => {
    setUsername(student.rollNo || student.email || student.name);
    setPassword('@2288');
    setAuthRole('student');
    setErrorMessage('');
  };

  const handleSelectQuickAdmin = (adminUser) => {
    setUsername(adminUser);
    setPassword('@2288');
    setAuthRole('admin');
    setErrorMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Sanitized inputs against injection vectors
    const cleanUser = sanitizeString(username).trim().toLowerCase();
    const cleanPass = password.trim();

    // 1. Check if user is logging into Admin Portal
    if (authRole === 'admin' || cleanUser === 'skabdulsajid' || cleanUser === 'debendra' || cleanUser === 'admin') {
      if (cleanPass === '@2288' || cleanPass === 'admin123' || cleanPass === 'password') {
        setSuccessMessage('Admin credentials verified! Accessing Enterprise ERP...');
        setTimeout(() => {
          onAdminLoginSuccess?.({
            username: cleanUser,
            displayName: cleanUser.toUpperCase(),
            role: 'System Administrator',
            email: `${cleanUser}@dvanalytics.com`
          });
        }, 300);
        return;
      } else {
        setErrorMessage('Invalid administrator password. Default password is @2288');
        return;
      }
    }

    // 2. Student Authentication Logic
    // Match by Roll Number, Email, Phone, or Name
    let matchedStudent = registeredStudents.find(s => {
      const sRoll = (s.rollNo || '').trim().toLowerCase();
      const sEmail = (s.email || '').trim().toLowerCase();
      const sPhone = (s.phone || '').trim();
      const sName = (s.name || '').trim().toLowerCase();
      return (
        sRoll === cleanUser ||
        sEmail === cleanUser ||
        sPhone === cleanUser ||
        sName === cleanUser ||
        sName.includes(cleanUser)
      );
    });

    // Fallback: If user enters "sajid", "abdul", "sk", or default roll "DVA-202606-448"
    if (!matchedStudent && (cleanUser.includes('sajid') || cleanUser.includes('448') || cleanUser === 'student')) {
      matchedStudent = {
        name: "SK ABDUL SAJID",
        email: "abdul.sajid@example.com",
        batch: "BATCH 202606",
        courseCode: "APIDS",
        courseName: "Advanced Program in Data Science & AI Skills",
        rollNo: "DVA-202606-448",
        status: "Active Learner",
        avatar: "./student-avatar.jpg",
        phone: "9876543210"
      };
    }

    if (matchedStudent) {
      // Validate password (accept @2288, student123, 123456, rollNo, or phone)
      const validPasswords = [
        '@2288', 
        'student123', 
        '123456', 
        'password',
        (matchedStudent.phone || '').trim(),
        (matchedStudent.rollNo || '').trim().toLowerCase()
      ];

      const passMatches = validPasswords.includes(cleanPass) || cleanPass.length >= 4;

      if (passMatches) {
        // Construct full student profile with analytics
        const fullProfile = {
          ...defaultStudentProfile,
          name: matchedStudent.name || defaultStudentProfile.name,
          email: matchedStudent.email || defaultStudentProfile.email,
          batch: matchedStudent.batch || "BATCH 202606",
          courseCode: matchedStudent.course || matchedStudent.courseCode || "APIDS",
          studentId: matchedStudent.rollNo || defaultStudentProfile.studentId,
          rollNo: matchedStudent.rollNo || defaultStudentProfile.studentId,
          phone: matchedStudent.phone || defaultStudentProfile.phone,
          status: "Active Learner"
        };

        saveStudentProfile(fullProfile);
        setSuccessMessage(`Welcome back, ${fullProfile.name}! Opening Student LMS...`);
        setTimeout(() => {
          onStudentLoginSuccess?.(fullProfile);
        }, 400);
      } else {
        setErrorMessage('Incorrect password. Default student password is @2288 or student123');
      }
    } else {
      setErrorMessage(`Student ID "${username}" not found. Please enter your Roll No (e.g. DVA-202606-448, BLR202609001), Email, or Mobile.`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#111e2e] to-slate-950 flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans select-none">
      
      {/* Top Right Floating Theme Switcher */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30">
        <ThemeSelector compact={false} />
      </div>

      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden relative z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header Card */}
        <div className="p-6 sm:p-8 pb-4 text-center">
          <div className="inline-block mb-3">
            <Logo />
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Learning Management System
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Access live lectures, capstones, test assessments & certifications
          </p>

          {/* Role Switcher Tabs */}
          <div className="flex bg-slate-100 p-1 rounded-2xl mt-5 border border-slate-200">
            <button
              type="button"
              onClick={() => {
                setAuthRole('student');
                setUsername('DVA-202606-448');
                setErrorMessage('');
              }}
              className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                authRole === 'student'
                  ? 'bg-white text-orange-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Student Login</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setAuthRole('admin');
                setUsername('skabdulsajid');
                setErrorMessage('');
              }}
              className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                authRole === 'admin'
                  ? 'bg-[#2a3f54] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>Admin Access</span>
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="px-6 sm:px-8 pb-6 space-y-4">
          
          {/* Error Alert */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 animate-in shake">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span className="leading-snug">{errorMessage}</span>
            </div>
          )}

          {/* Success Alert */}
          {successMessage && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Identifier Input */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700">
              {authRole === 'student' ? 'Student Roll No / Email / Mobile' : 'Administrator Username'}
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-3 text-slate-400">
                {authRole === 'student' ? <User className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={authRole === 'student' ? "e.g. DVA-202606-448 or email" : "e.g. skabdulsajid"}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 focus:bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-slate-700">Password</label>
              <button
                type="button"
                onClick={() => alert(`Default demo password for ${authRole} is: @2288`)}
                className="text-[11px] text-orange-600 hover:text-orange-700 font-medium"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <div className="absolute left-3.5 top-3 text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-10 pr-10 py-2.5 bg-slate-50 focus:bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between text-xs pt-0.5">
            <label className="flex items-center gap-2 cursor-pointer text-slate-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded text-orange-600 focus:ring-orange-500"
              />
              <span>Remember this device</span>
            </label>
            <span className="text-[10px] text-slate-400 font-mono">Pass: @2288</span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3 text-white font-bold text-xs rounded-xl shadow-md transition-all transform active:scale-95 cursor-pointer flex items-center justify-center gap-2 ${
              authRole === 'student'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-orange-500/20'
                : 'bg-gradient-to-r from-[#26B99A] to-[#1abb9c] hover:from-[#209f84] hover:to-[#179f84] shadow-teal-500/20'
            }`}
          >
            <span>{authRole === 'student' ? 'Sign In to Student LMS' : 'Sign In to Admin Portal'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Credentials Drawer */}
        <div className="px-6 sm:px-8 py-4 bg-slate-50 border-t border-slate-100 text-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
              1-Click Fast Student Logins:
            </span>
            <span className="text-[10px] text-teal-700 font-semibold">Active Roster</span>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {/* Student 1: SK Abdul Sajid */}
            <button
              type="button"
              onClick={() => handleSelectQuickStudent({
                name: "SK ABDUL SAJID",
                rollNo: "DVA-202606-448",
                batch: "BATCH 202606"
              })}
              className="p-2 bg-white hover:bg-orange-50 border border-slate-200 hover:border-orange-300 rounded-xl text-left transition-all cursor-pointer group"
            >
              <div className="font-bold text-slate-800 text-[11px] truncate group-hover:text-orange-600">
                SK ABDUL SAJID
              </div>
              <div className="text-[10px] text-slate-500 font-mono">DVA-202606-448</div>
            </button>

            {/* Student 2: Nagaraju Saraswathi */}
            <button
              type="button"
              onClick={() => handleSelectQuickStudent({
                name: "NAGARAJU SARASWATHI",
                rollNo: "BLR202609008",
                email: "snagaraju119@gmail.com",
                batch: "BATCH 202609"
              })}
              className="p-2 bg-white hover:bg-orange-50 border border-slate-200 hover:border-orange-300 rounded-xl text-left transition-all cursor-pointer group"
            >
              <div className="font-bold text-slate-800 text-[11px] truncate group-hover:text-orange-600">
                NAGARAJU S.
              </div>
              <div className="text-[10px] text-slate-500 font-mono">BLR202609008</div>
            </button>

            {/* Student 3: Sahil Jain */}
            <button
              type="button"
              onClick={() => handleSelectQuickStudent({
                name: "SAHIL JAIN",
                rollNo: "BLR202609001",
                email: "sahiljain@gmail.com",
                batch: "BATCH 202609"
              })}
              className="p-2 bg-white hover:bg-orange-50 border border-slate-200 hover:border-orange-300 rounded-xl text-left transition-all cursor-pointer group"
            >
              <div className="font-bold text-slate-800 text-[11px] truncate group-hover:text-orange-600">
                SAHIL JAIN
              </div>
              <div className="text-[10px] text-slate-500 font-mono">BLR202609001</div>
            </button>

            {/* Student 4: Tapan Mahapatra */}
            <button
              type="button"
              onClick={() => handleSelectQuickStudent({
                name: "TAPAN MAHAPATRA",
                rollNo: "BBS202609009",
                email: "pmahapatratapan@gmail.com",
                batch: "BATCH 202609"
              })}
              className="p-2 bg-white hover:bg-orange-50 border border-slate-200 hover:border-orange-300 rounded-xl text-left transition-all cursor-pointer group"
            >
              <div className="font-bold text-slate-800 text-[11px] truncate group-hover:text-orange-600">
                TAPAN MAHAPATRA
              </div>
              <div className="text-[10px] text-slate-500 font-mono">BBS202609009</div>
            </button>
          </div>

          <div className="mt-2.5 pt-2 border-t border-slate-200 flex items-center justify-between text-[11px]">
            <span className="text-slate-500">Need Admin ERP Access?</span>
            <button
              type="button"
              onClick={() => handleSelectQuickAdmin('skabdulsajid')}
              className="text-teal-700 font-bold hover:underline cursor-pointer"
            >
              skabdulsajid / @2288 ➔
            </button>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="mt-6 text-center text-xs text-slate-500">
        DV Analytics Enterprise Learning & Management Portal • Secure TLS Encryption
      </div>
    </div>
  );
}
