# 🗄️ DV Analytics LMS - Database Setup & SQL Architecture Guide

This guide walks you through setting up, deploying, and maintaining the relational SQL database for **DV Analytics LMS**.

---

## 📌 Architecture Overview

The database connects the **Vite React Frontend** and the **Node.js Express Backend** to manage students, batches, course modules, video sessions, assignments, fee ledgers, resumes, and CAT assessments.

All binary assets (MP4 video lectures, zipped study materials, assignment PDFs/Excel files, student resumes, and fee receipts) are stored on **UpCloud Object Storage** (`https://b1storage.t8fcc.upcloudobjects.com`), with the SQL database keeping track of the metadata, access keys, dates, and student records.

```
+---------------------+       +----------------------+       +-------------------------+
|  Vite LMS Frontend  | <---> | Express Backend API  | <---> | MySQL / PostgreSQL DB   |
| (React 19, Tailwind)|       | (Node 20, SigV4 S3)  |       | (Users, Batches, Fees)  |
+---------------------+       +----------------------+       +-------------------------+
          ^                              |
          |                              v
          +------------------ [ UpCloud Object Storage (S3) ]
                              (Bucket: b1storage)
```

---

## 🚀 Step 1: Choose Your Database Provider

You can deploy the SQL schema to any standard SQL database. Here are the top recommended options:

### Option A: UpCloud Managed Database (Recommended for Production)
1. Log into your [UpCloud Hub](https://hub.upcloud.com/).
2. Navigate to **Databases** &rarr; **Create Database**.
3. Select **MySQL 8.0** or **PostgreSQL 16**.
4. Choose your datacenter region (e.g. Frankfurt, Helsinki, or Singapore closest to your users).
5. Note down your credentials:
   - `Host` (e.g. `db-mysql-fra1-12345.upcloudapp.com`)
   - `Port` (e.g. `13306` or `3306`)
   - `Username` (e.g. `upadmin` or `root`)
   - `Password`

### Option B: Local Development / Free Cloud (Supabase, Neon, or MySQL Workbench / XAMPP)
- **Local MySQL / XAMPP / MariaDB**:
  - Start MySQL service.
  - Connect via command line, HeidiSQL, DBeaver, or phpMyAdmin (`http://localhost/phpmyadmin`).
- **Free Cloud PostgreSQL (Supabase / Neon)**:
  - Create a free project at [supabase.com](https://supabase.com) or [neon.tech](https://neon.tech).

---

## 🛠️ Step 2: Run the Schema & Seed Scripts

### Method 1: Using MySQL Command Line
Run this command in your terminal / PowerShell:

```bash
# 1. Import Schema (creates dv_analytics_lms and all tables)
mysql -h <YOUR_DB_HOST> -P <PORT> -u <USERNAME> -p < database/schema.sql

# 2. Import Initial Data (batches, modules, sessions, student accounts)
mysql -h <YOUR_DB_HOST> -P <PORT> -u <USERNAME> -p dv_analytics_lms < database/seed.sql
```

### Method 2: Using phpMyAdmin or MySQL Workbench
1. Open **phpMyAdmin** or **MySQL Workbench**.
2. Click **Import** or open `database/schema.sql`.
3. Click **Execute** / **Go**.
4. Repeat for `database/seed.sql`.

---

## 📊 Step 3: Database Tables Reference

| Table Name | Description | Key Columns |
| :--- | :--- | :--- |
| `users` | System admins, mentors, and enrolled students | `id`, `student_id`, `roll_no`, `email`, `full_name`, `password_hash`, `role_id` |
| `programs` | Academic programs (APIDS, APIDA, FDE) | `id`, `code`, `title`, `duration_months`, `total_fee` |
| `batches` | Cohort batches (e.g., BATCH 202606) | `id`, `batch_code`, `cohort_name`, `start_date`, `zoom_meeting_url` |
| `batch_enrollments` | Student-to-batch mapping | `user_id`, `batch_id`, `overall_progress_pct`, `attendance_pct` |
| `course_modules` | Subjects (Excel, SQL, Python, Power BI, ML) | `id`, `program_id`, `code`, `title` |
| `sessions` | Video lectures & session materials | `session_code`, `title`, `video_url`, `materials_url`, `assignment_url` |
| `assignments` | Homework & practical assessments | `id`, `batch_id`, `subject`, `title`, `deadline_date`, `max_marks` |
| `assignment_submissions`| Student uploads stored in UpCloud S3 | `assignment_id`, `user_id`, `s3_file_url`, `status`, `grade` |
| `resumes` | Candidate resumes with ATS scores | `user_id`, `pdf_url`, `word_url`, `ats_score`, `status` |
| `fee_ledgers` | Complete fee payments & installments | `user_id`, `batch_id`, `committed_fee`, `amount_paid`, `balance_due`, `receipt_url` |
| `attendance_logs` | Biometric & class attendance | `user_id`, `session_id`, `attendance_date`, `status` |
| `cat_questions` & `cat_attempts` | Candidate Application Tests (MCQs) | `domain`, `question_text`, `correct_option`, `score` |

---

## 🔐 Step 4: Connecting the Backend to Your SQL Database

Open `server/.env` and update your database credentials:

```env
DB_HOST=your-database-host.com
DB_PORT=3306
DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=dv_analytics_lms
```

To test your connection:
```bash
node server/scripts/test-db.js
```
