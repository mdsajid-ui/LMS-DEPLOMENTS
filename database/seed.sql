-- ====================================================================
-- DV Analytics LMS - Initial Seed Data (Production Ready)
-- Database Name: dv_analytics_lms
-- ====================================================================

USE `dv_analytics_lms`;

-- 1. Insert Programs
INSERT INTO `programs` (`id`, `code`, `title`, `category`, `duration_months`, `total_fee`) VALUES
(1, 'APIDS', 'Advanced Program in Data Science & Artificial Intelligence', 'DBMS & Programming', 6, 350000.00),
(2, 'APIDA', 'Advanced Program in Data Analytics & Business Intelligence', 'Data Analysis & Visualization', 5, 295000.00),
(3, 'FDE', 'Full-Stack Data Engineering & Cloud Architecture', 'Cloud Computing & AI Deployment', 6, 300000.00)
ON DUPLICATE KEY UPDATE `title`=VALUES(`title`);

-- 2. Insert Batches
INSERT INTO `batches` (`id`, `batch_code`, `program_id`, `cohort_name`, `start_date`, `zoom_meeting_url`, `zoom_meeting_id`, `zoom_passcode`) VALUES
(1, 'BATCH 202606', 1, 'Live Program (Weekend)', '2026-06-01', 'https://zoom.us/j/9988223344?pwd=dva', '998 822 3344', 'DVA2026'),
(2, 'BATCH 202510', 1, 'Live Program (Weekday)', '2025-10-15', 'https://zoom.us/j/9988223345?pwd=dva', '998 822 3345', 'DVA2025'),
(3, 'BATCH 202609', 2, 'Live Program (Weekend)', '2026-09-01', 'https://zoom.us/j/9988223346?pwd=dva', '998 822 3346', 'DVA2026')
ON DUPLICATE KEY UPDATE `batch_code`=VALUES(`batch_code`);

-- 3. Insert Users (Admin, Mentor, Students)
-- Passwords below use BCrypt hashes (default initial: 'Password@123')
INSERT INTO `users` (`id`, `role_id`, `student_id`, `roll_no`, `email`, `phone`, `password_hash`, `full_name`, `avatar_url`, `qualification`, `status`) VALUES
(1, 1, 'ADM-001', 'DVA-ADMIN-01', 'admin@dvanalyticsmds.com', '+91 9955774100', '$2b$10$wEepK6j8vPfgP3L0/06xweFzP86.xT43fBmz9Gg7vYfJkZ3N5O7w.', 'System Administrator', 'https://b1storage.t8fcc.upcloudobjects.com/avatars/admin.png', 'M.Tech Computer Science', 'Active'),
(2, 3, 'FAC-001', 'DVA-MENTOR-01', 'sandip.mukherjee@dvanalyticsmds.com', '+91 9955774101', '$2b$10$wEepK6j8vPfgP3L0/06xweFzP86.xT43fBmz9Gg7vYfJkZ3N5O7w.', 'Dr. Sandip Mukherjee', 'https://b1storage.t8fcc.upcloudobjects.com/avatars/mentor.png', 'Ph.D. Data Science', 'Active'),
(3, 4, '9955774102', 'DVA-202606-448', 'sajid@dvanalyticsmds.com', '+91 9955774102', '$2b$10$wEepK6j8vPfgP3L0/06xweFzP86.xT43fBmz9Gg7vYfJkZ3N5O7w.', 'SK ABDUL SAJID', 'https://b1storage.t8fcc.upcloudobjects.com/avatars/sajid.png', 'B.Tech Computer Science & Engineering', 'Active'),
(4, 4, '9812345678', 'DVA-202606-449', 'priyanka.mishra@dvanalyticsmds.com', '+91 9812345678', '$2b$10$wEepK6j8vPfgP3L0/06xweFzP86.xT43fBmz9Gg7vYfJkZ3N5O7w.', 'PRIYANKA MISHRA', 'https://b1storage.t8fcc.upcloudobjects.com/avatars/priyanka.png', 'B.Sc Statistics & Data Analytics', 'Active')
ON DUPLICATE KEY UPDATE `email`=VALUES(`email`);

-- 4. Batch Enrollment
INSERT INTO `batch_enrollments` (`user_id`, `batch_id`, `enrolled_date`, `overall_progress_pct`, `attendance_pct`, `status`) VALUES
(3, 1, '2026-06-01', 60.00, 60.00, 'Active'),
(4, 1, '2026-06-01', 75.00, 85.00, 'Active')
ON DUPLICATE KEY UPDATE `overall_progress_pct`=VALUES(`overall_progress_pct`);

-- 5. Course Modules
INSERT INTO `course_modules` (`id`, `program_id`, `title`, `code`, `sort_order`) VALUES
(1, 1, 'Microsoft Excel: Base & Advanced Analytics', 'excel', 1),
(2, 1, 'SQL Server & Relational Database Engineering', 'sql', 2),
(3, 1, 'Python Programming, Pandas & Statistical Analysis', 'python', 3),
(4, 1, 'Power BI & Executive Dashboard Reporting', 'powerbi', 4),
(5, 1, 'Machine Learning & Generative AI Systems', 'ml_ai', 5)
ON DUPLICATE KEY UPDATE `title`=VALUES(`title`);

-- 6. Sessions (Configured with real UpCloud Object Storage b1storage paths)
INSERT INTO `sessions` (`id`, `module_id`, `batch_id`, `session_code`, `title`, `description`, `mentor_name`, `recording_date`, `duration_text`, `sort_order`, `video_type`, `video_url`, `video_filename`, `materials_url`, `materials_filename`, `assignment_url`, `assignment_filename`) VALUES
(1, 1, 1, 'B1.SESSION-1', 'Financial Modeling & Pivot Automation', 'Comprehensive introduction to formulas, nested lookups, and pivot cache optimization.', 'Dr. Sandip Mukherjee', '2026-06-06', '2h 15m', 1, 's3', 'https://b1storage.t8fcc.upcloudobjects.com/Application%20Master/ADVANCED%20ANALYTICS%20IN%20EXCEL/BATCH%20202501%20TO%20DV%20BATCH%20202510/01-BASIC%20DESCRIPTIVE%20STATISTICS/drive-download-20260210T063729Z-1-001.zip', 'Excel_Session1_Lecture.mp4', 'https://b1storage.t8fcc.upcloudobjects.com/Application%20Master/ADVANCED%20ANALYTICS%20IN%20EXCEL/BATCH%20202501%20TO%20DV%20BATCH%20202510/01-BASIC%20DESCRIPTIVE%20STATISTICS/drive-download-20260210T063729Z-1-001.zip', 'Excel_Session1_Materials.zip', 'https://b1storage.t8fcc.upcloudobjects.com/Application%20Master/ADVANCED%20ANALYTICS%20IN%20EXCEL/BATCH%20202501%20TO%20DV%20BATCH%20202510/01-BASIC%20DESCRIPTIVE%20STATISTICS/drive-download-20260210T063729Z-1-001.zip', 'Excel_Session1_Assignment.xlsx'),

(2, 1, 1, 'B1.SESSION-2', 'Descriptive Statistics & Dynamic Array Formulas', 'XLOOKUP, LAMBDA functions, LET formulas, and standard deviation distributions.', 'Dr. Sandip Mukherjee', '2026-06-13', '2h 00m', 2, 's3', 'https://b1storage.t8fcc.upcloudobjects.com/Application%20Master/ADVANCED%20ANALYTICS%20IN%20EXCEL/BATCH%20202501%20TO%20DV%20BATCH%20202510/02-PROBABILITY/drive-download-20260210T063642Z-1-001.zip', 'Excel_Session2_Lecture.mp4', 'https://b1storage.t8fcc.upcloudobjects.com/Application%20Master/ADVANCED%20ANALYTICS%20IN%20EXCEL/BATCH%20202501%20TO%20DV%20BATCH%20202510/02-PROBABILITY/drive-download-20260210T063642Z-1-001.zip', 'Excel_Session2_Materials.zip', 'https://b1storage.t8fcc.upcloudobjects.com/Application%20Master/ADVANCED%20ANALYTICS%20IN%20EXCEL/BATCH%20202501%20TO%20DV%20BATCH%20202510/02-PROBABILITY/drive-download-20260210T063642Z-1-001.zip', 'Excel_Session2_Assignment.xlsx'),

(3, 2, 1, 'B2.SESSION-1', 'Relational Schemas, Constraints & Complex Joins', 'Database normal forms 1NF to 3NF, multi-table inner/outer/cross joins, and query plans.', 'Dr. Sandip Mukherjee', '2026-07-04', '2h 30m', 1, 's3', 'https://b1storage.t8fcc.upcloudobjects.com/sessions/sql/sql_session_1.mp4', 'SQL_Session1_Lecture.mp4', 'https://b1storage.t8fcc.upcloudobjects.com/sessions/sql/materials_1.zip', 'SQL_Session1_Materials.zip', 'https://b1storage.t8fcc.upcloudobjects.com/sessions/sql/assignment_1.sql', 'SQL_Session1_Assignment.sql')
ON DUPLICATE KEY UPDATE `title`=VALUES(`title`);

-- 7. Fee Ledgers
INSERT INTO `fee_ledgers` (`user_id`, `batch_id`, `payment_date`, `committed_fee`, `amount_paid`, `installment_no`, `balance_due`, `mode_of_pay`, `receipt_invoice_no`, `receipt_url`, `remarks`) VALUES
(3, 1, '2026-06-01', 65000.00, 35000.00, 1, 30000.00, 'UPI / Bank Transfer', 'INV-2026-448-01', 'https://b1storage.t8fcc.upcloudobjects.com/receipts/Receipt_INV_88392.pdf', '1st installment received via UPI.'),
(3, 1, '2026-07-01', 65000.00, 30000.00, 2, 0.00, 'UPI / Bank Transfer', 'INV-2026-448-02', 'https://b1storage.t8fcc.upcloudobjects.com/receipts/Receipt_INV_88410.pdf', '2nd & final installment received. Account cleared.');

-- 8. Resumes
INSERT INTO `resumes` (`user_id`, `batch_id`, `original_file_name`, `pdf_url`, `word_url`, `ats_score`, `status`, `feedback`) VALUES
(3, 1, 'SK_Abdul_Sajid_APIDS.pdf', 'https://b1storage.t8fcc.upcloudobjects.com/resumes/SK_Abdul_Sajid_APIDS.pdf', 'https://b1storage.t8fcc.upcloudobjects.com/resumes/SK_Abdul_Sajid_APIDS.docx', 92, 'Approved', 'ATS Score: 92/100. Excellent project descriptions. Approved for Tier-1 placements.'),
(4, 1, 'Priyanka_Mishra_APIDS.pdf', 'https://b1storage.t8fcc.upcloudobjects.com/resumes/Priyanka_Mishra_APIDS.pdf', 'https://b1storage.t8fcc.upcloudobjects.com/resumes/Priyanka_Mishra_APIDS.docx', 88, 'Approved', 'Ready for client submission.');

-- 9. Attendance Logs
INSERT INTO `attendance_logs` (`user_id`, `session_id`, `batch_id`, `attendance_date`, `status`, `minutes_attended`) VALUES
(3, 1, 1, '2026-06-06', 'Present', 135),
(3, 2, 1, '2026-06-13', 'Present', 120),
(4, 1, 1, '2026-06-06', 'Present', 135),
(4, 2, 1, '2026-06-13', 'Present', 120);

-- 10. Sample CAT Assessment Questions
INSERT INTO `cat_questions` (`domain`, `difficulty`, `question_text`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_option`, `explanation`) VALUES
('SQL', 'Medium', 'Which SQL window function computes the rank of each row within a partition without leaving any gaps in the ranking values?', 'RANK()', 'DENSE_RANK()', 'ROW_NUMBER()', 'NTILE()', 'B', 'DENSE_RANK() assigns consecutive ranks without gaps when duplicate values occur.'),
('SQL', 'Medium', 'What is the primary difference between WHERE and HAVING clauses in SQL?', 'WHERE filters grouped rows; HAVING filters individual rows', 'HAVING applies before GROUP BY; WHERE applies after', 'WHERE filters rows before aggregation; HAVING filters aggregated groups', 'There is no difference', 'C', 'WHERE filters records prior to GROUP BY aggregation, whereas HAVING evaluates aggregate conditions after GROUP BY.'),
('Python', 'Easy', 'Which pandas method is used to replace null or missing values with a specified value?', 'dropna()', 'fillna()', 'replace_null()', 'impute()', 'B', 'DataFrame.fillna() fills NA/NaN values using the specified method or value.');
