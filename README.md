# DV Analytics LMS — Modern Frontend Redesign (2026 Edition)

Executive, ultra-responsive Learning Management System (LMS) frontend redesign for **DV Analytics** (`edu.dvanalyticsmds.com`).

Built with **React 19**, **Vite 8**, **Tailwind CSS v4**, and **Lucide Icons**.

---

## 🚀 Local Development & Architecture

### Full-Stack Architecture
- **Frontend**: React 19, Vite 8, Tailwind CSS v4, Lucide Icons
- **Storage**: UpCloud Object Storage (S3-compatible) &bull; Bucket: `b1storage` &bull; Endpoint: `https://t8fcc.upcloudobjects.com`
- **Database**: MySQL 8.0+ / MariaDB &bull; Schema in `database/schema.sql` &bull; Seed data in `database/seed.sql`
- **Backend API**: Node.js 20+ & Express with AWS SigV4 S3 Client & Connection Pool

---

### 1. Run the Backend Server (Storage & Database API)
```bash
cd server
npm install
npm start
```
The backend server runs on `http://localhost:5000` with live S3 storage uploads and SQL connectivity.

### 2. Run the Frontend LMS
```bash
# In the root directory:
npm install
npm run dev
```
Open **[http://localhost:5173/](http://localhost:5173/)** in your browser.

---

## 🗄️ Database Setup (SQL Part)

Detailed guide available at [`database/README.md`](database/README.md).

### 1. Create and Seed Database
Run this in your terminal or database client (phpMyAdmin / HeidiSQL / DBeaver / MySQL Workbench):

```bash
# Import Database Schema (creates dv_analytics_lms and all 10+ tables)
mysql -h <YOUR_DB_HOST> -u <DB_USER> -p < database/schema.sql

# Import Initial Seed Data (Students, Batches, Sessions, Modules, Ledgers)
mysql -h <YOUR_DB_HOST> -u <DB_USER> -p dv_analytics_lms < database/seed.sql
```

### 2. Configure Backend Credentials
In `server/.env`:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=dv_analytics_lms
```

Verify your connection anytime:
```bash
npm run test-db  # inside /server directory
```

---

## ☁️ UpCloud Object Storage (S3) Configuration

The application is configured to connect to UpCloud Object Storage:
- **Endpoint**: `https://t8fcc.upcloudobjects.com`
- **Bucket**: `b1storage`
- **Public URL**: `https://b1storage.t8fcc.upcloudobjects.com`

All uploaded class videos, session materials, student resumes, and assignment submissions are stored directly in `b1storage`. Both direct upload and presigned URL capabilities are supported.

---

## 🌐 Hosting & Deployment Guide

### Frontend Hosting (Vercel, Netlify, or GitHub Pages)
- **GitHub Pages**: Included GitHub Actions workflow automatically deploys to GitHub Pages on push to `main`.
- **Vercel / Netlify**: Build command `npm run build`, output directory `dist`. Set environment variable `VITE_API_URL` to your production backend URL.

### Backend & Database Hosting (UpCloud / Render / Railway / VPS)
- Deploy `server/` to any Node.js host or an UpCloud Cloud Server (Ubuntu 22.04 / 24.04).
- Use **PM2** or **Docker** to run `node server.js` persistently.
- Attach an UpCloud Managed MySQL Database or host MySQL on the same cloud server.

---

## 📱 Implemented LMS Pages & Screens

1. **Welcome & Program Overview (`Welcome.aspx`)**
   - Cohort selector (`Live Program`), APIDS program overview, eligibility, duration, skills domain breakdown.
2. **Dashboard (`dashboard.aspx`)**
   - Active batch pill (`BATCH 202606`), "My Overall Progress" header, and **3 Radial Progress Donut Gauges** (Course, Attendance 60%, Assignments).
3. **Courses (`Course.aspx`)**
   - APIDS banner, 4 category cards (DBMS & Programming, Data Analysis & Visualization, Machine Learning & Gen AI, Cloud Computing & AI Deployment).
   - Expanded subject table with session count, hours, and **[Continue]** action button.
4. **Session View (`Session.aspx?accessID=1`)**
   - High-definition video player simulator, speed controls, downloadable Excel datasets & PDF slides, live note-taking tab, and accordion list for **Practical Questions**, **Session 1**, **Session 2**, **Session 3**, and **Session 4**.
5. **Candidates Application Test (CAT) (`ApplicationTest.aspx`)**
   - Matching the 3 colored blocks:
     - 🟦 **Multiple Choice Question (MCQ)** with interactive quiz simulator
     - 🟨 **Practical Question** with dataset download & upload
     - 🟥 **Personal Interview** with slot scheduling
6. **Resume (`MyResume.aspx`)**
   - Matching state: *"Oops!!! Your resume is not yet prepared."*
   - Official **Download Word File** template button and revision upload portal.
7. **Assignments (`Assignments.aspx`)**
   - Filter by All, Pending, Submitted; rubric details, deadline countdown, and upload simulator.
8. **Interview Prep Kit (`InterviewPrepKit.aspx`)**
   - Company-tagged interview question bank (Amazon, TCS, Deloitte, Fractal) with solutions.
9. **Mock Interviews (`MockInterviews.aspx`)**
   - 1-on-1 industry mentor mock interview slot booking.
10. **Discussion Forum (`DiscussionForum.aspx`)**
    - Technical question board, upvoting, search, and "Ask Doubt" modal.
11. **Attendance Log (`Attendance.aspx`)**
    - 60% biometric compliance gauge, session-by-session present/absent log.
12. **Feedback (`Feedback.aspx`)**
    - 5-star faculty rating matrix and qualitative review form.
13. **Live Class (`Class.aspx`)**
    - Next live Zoom class countdown, join button, and weekly schedule.
14. **Account Profile (`AccountProfile.aspx`)**
    - Student details (SK Abdul Sajid), batch ID, email, and preferences.
15. **Notifications (`Notification.aspx`)**
    - Complete announcement feed with 250 unread messages counter.
16. **Progress Report (`ProgressReport.aspx`)**
    - Comprehensive grade card and downloadable PDF transcript.
17. **Change Program (`ChangeProgram.aspx`)**
    - Cohort transfer requests and specialization electives.

---

## 🛠️ Tech Stack & Architecture

- **React 19**
- **Vite 8** with relative asset resolution (`base: './'`)
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **Lucide Icons**
- **GitHub Actions** CI/CD deploy pipeline included
