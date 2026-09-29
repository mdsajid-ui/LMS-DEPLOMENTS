# DV Analytics LMS — Modern Frontend Redesign (2026 Edition)

Executive, ultra-responsive Learning Management System (LMS) frontend redesign for **DV Analytics** (`edu.dvanalyticsmds.com`).

Built with **React 19**, **Vite 8**, **Tailwind CSS v4**, and **Lucide Icons**.

---

## 🚀 Live Demo & Local Development

### 1. Run Locally
```bash
# Clone or navigate to the directory
cd dv-analytics-lms

# Install dependencies (if not already installed)
npm install

# Start local dev server
npm run dev
```
Open **[http://localhost:5173/](http://localhost:5173/)** in your browser.

---

## 🌐 How to Host on GitHub (GitHub Pages)

### Option A: Automatic Deployment via GitHub Actions (Recommended)

1. **Create a new repository** on GitHub (e.g., `dv-analytics-lms` or your desired name).
2. **Push your local code to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit: DV Analytics modern LMS frontend"
   git branch -M main
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<REPO_NAME>.git
   git push -u origin main
   ```
3. **Enable GitHub Pages in your repo settings**:
   - Go to your repository on GitHub.
   - Click on **Settings** &rarr; **Pages** (under Code and automation).
   - Under **Build and deployment** &rarr; **Source**, select **GitHub Actions**.
   - Your site will automatically build and publish at `https://<YOUR_GITHUB_USERNAME>.github.io/<REPO_NAME>/`!

### Option B: Deploy via `npm run deploy` CLI

1. Run:
   ```bash
   npm run deploy
   ```
2. In your GitHub repository settings &rarr; **Pages**, select **Deploy from a branch**, choose `gh-pages` branch, and click **Save**.

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
