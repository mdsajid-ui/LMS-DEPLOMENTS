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
(1, 'BATCH 202606', 1, 'Live Program (Weekend)', '2026-06-01', 'https://zoom.us/j/7540619228?pwd=cENiVlhqNVY5SERhUHRwckdJREZMQT09', '754 061 9228', '281340'),
(2, 'BATCH 202510', 1, 'Live Program (Weekday)', '2025-10-15', 'https://zoom.us/j/9988223345?pwd=dva', '998 822 3345', 'DVA2025'),
(3, 'BATCH 202609', 2, 'Live Program (Weekend)', '2026-09-01', 'https://zoom.us/j/8234567890?pwd=DVMENTOR2PASS', '823 456 7890', '200300')
ON DUPLICATE KEY UPDATE `batch_code`=VALUES(`batch_code`);

-- 3. Insert Users (Admin, Mentor, 10 Production Students)
-- Passwords below use BCrypt hashes (default initial: 'Password@123')
INSERT INTO `users` (`id`, `role_id`, `student_id`, `roll_no`, `email`, `phone`, `password_hash`, `full_name`, `avatar_url`, `qualification`, `status`) VALUES
(1, 1, 'ADM-001', 'DVA-ADMIN-01', 'admin@dvanalyticsmds.com', '+91 9955774100', '$2b$10$wEepK6j8vPfgP3L0/06xweFzP86.xT43fBmz9Gg7vYfJkZ3N5O7w.', 'System Administrator', 'https://b1storage.t8fcc.upcloudobjects.com/avatars/admin.png', 'M.Tech Computer Science', 'Active'),
(2, 3, 'FAC-001', 'DVA-MENTOR-01', 'sandip.mukherjee@dvanalyticsmds.com', '+91 9955774101', '$2b$10$wEepK6j8vPfgP3L0/06xweFzP86.xT43fBmz9Gg7vYfJkZ3N5O7w.', 'Dr. Sandip Mukherjee', 'https://b1storage.t8fcc.upcloudobjects.com/avatars/mentor.png', 'Ph.D. Data Science', 'Active'),
(3, 4, '9955774102', 'DVA-202606-448', 'sajid@dvanalyticsmds.com', '+91 9955774102', '$2b$10$wEepK6j8vPfgP3L0/06xweFzP86.xT43fBmz9Gg7vYfJkZ3N5O7w.', 'SK ABDUL SAJID', 'https://b1storage.t8fcc.upcloudobjects.com/avatars/sajid.png', 'B.Tech Computer Science & Engineering', 'Active'),
(4, 4, '7205702003', 'BBS202606010', 'indrajeetjena32@gmail.com', '7205702003', '$2b$10$wEepK6j8vPfgP3L0/06xweFzP86.xT43fBmz9Gg7vYfJkZ3N5O7w.', 'INDRAJEET JENA', 'https://b1storage.t8fcc.upcloudobjects.com/avatars/student_1.png', 'B.Tech Data Science', 'Active'),
(5, 4, '9040152767', 'BBS202607017', 'helloratnakar123@gmail.com', '9040152767', '$2b$10$wEepK6j8vPfgP3L0/06xweFzP86.xT43fBmz9Gg7vYfJkZ3N5O7w.', 'RATNAKAR NAYAK', 'https://b1storage.t8fcc.upcloudobjects.com/avatars/student_2.png', 'B.Tech Data Science', 'Active'),
(6, 4, '7978289752', 'BBS202606014', 'abhilashsahoo10@gmail.com', '7978289752', '$2b$10$wEepK6j8vPfgP3L0/06xweFzP86.xT43fBmz9Gg7vYfJkZ3N5O7w.', 'ABHILASH SAHOO', 'https://b1storage.t8fcc.upcloudobjects.com/avatars/student_3.png', 'B.Sc Statistics / MCA', 'Active'),
(7, 4, '9583901863', 'BBS202606009', 'kumanil285@gmail.com', '9583901863', '$2b$10$wEepK6j8vPfgP3L0/06xweFzP86.xT43fBmz9Gg7vYfJkZ3N5O7w.', 'ANIL KUMAR MISHRA', 'https://b1storage.t8fcc.upcloudobjects.com/avatars/student_4.png', 'B.Tech Data Science', 'Completed'),
(8, 4, '8249826052', 'BLR202606015', 'chandraictk@gmail.com', '8249826052', '$2b$10$wEepK6j8vPfgP3L0/06xweFzP86.xT43fBmz9Gg7vYfJkZ3N5O7w.', 'CHANDRAI', 'https://b1storage.t8fcc.upcloudobjects.com/avatars/student_5.png', 'B.Tech Data Science', 'Active'),
(9, 4, '8249685221', 'BBS202606017', 'karabikadambini001@gmail.com', '8249685221', '$2b$10$wEepK6j8vPfgP3L0/06xweFzP86.xT43fBmz9Gg7vYfJkZ3N5O7w.', 'KARABI KADAMBINI', 'https://b1storage.t8fcc.upcloudobjects.com/avatars/student_6.png', 'B.Tech Data Science', 'Active'),
(10, 4, '9692717403', 'BBS202606015', 'janmejaymallick01@gmail.com', '9692717403', '$2b$10$wEepK6j8vPfgP3L0/06xweFzP86.xT43fBmz9Gg7vYfJkZ3N5O7w.', 'JANMAJEYA MALLICK', 'https://b1storage.t8fcc.upcloudobjects.com/avatars/student_7.png', 'B.Tech Data Science', 'Active'),
(11, 4, '8871250061', 'BLR202606001', 'rohanrawal54@gmail.com', '8871250061', '$2b$10$wEepK6j8vPfgP3L0/06xweFzP86.xT43fBmz9Gg7vYfJkZ3N5O7w.', 'ROHAN RAWAL', 'https://b1storage.t8fcc.upcloudobjects.com/avatars/student_8.png', 'B.Sc Statistics / MCA', 'Active'),
(12, 4, '8686266226', 'BLR202606006', 'jeelanpatel999@gmail.com', '8686266226', '$2b$10$wEepK6j8vPfgP3L0/06xweFzP86.xT43fBmz9Gg7vYfJkZ3N5O7w.', 'JEELAN KUMAR PATEL', 'https://b1storage.t8fcc.upcloudobjects.com/avatars/student_9.png', 'B.Sc Statistics / MCA', 'Active'),
(13, 4, '8917374533', 'BBS202606006', 'akankshapattnaik10@gmail.com', '8917374533', '$2b$10$wEepK6j8vPfgP3L0/06xweFzP86.xT43fBmz9Gg7vYfJkZ3N5O7w.', 'AKANKSHA PATTNAIK', 'https://b1storage.t8fcc.upcloudobjects.com/avatars/student_10.png', 'B.Tech Data Science', 'Completed')
ON DUPLICATE KEY UPDATE `email`=VALUES(`email`);

-- 4. Batch Enrollment (All 10 Students in BATCH 202606)
INSERT INTO `batch_enrollments` (`user_id`, `batch_id`, `enrolled_date`, `overall_progress_pct`, `attendance_pct`, `status`) VALUES
(3, 1, '2026-06-01', 71.30, 85.00, 'Active'),
(4, 1, '2026-06-04', 60.00, 80.00, 'Active'),
(5, 1, '2026-06-04', 63.50, 80.00, 'Active'),
(6, 1, '2026-06-05', 67.00, 80.00, 'Active'),
(7, 1, '2026-06-05', 100.00, 80.00, 'Active'),
(8, 1, '2026-06-05', 74.00, 80.00, 'Active'),
(9, 1, '2026-06-06', 77.50, 80.00, 'Active'),
(10, 1, '2026-05-26', 81.00, 80.00, 'Active'),
(11, 1, '2026-05-28', 84.50, 80.00, 'Active'),
(12, 1, '2026-05-29', 88.00, 80.00, 'Active'),
(13, 1, '2026-06-01', 100.00, 80.00, 'Active')
ON DUPLICATE KEY UPDATE `overall_progress_pct`=VALUES(`overall_progress_pct`);

-- 5. Course Modules
INSERT INTO `course_modules` (`id`, `program_id`, `title`, `code`, `sort_order`) VALUES
(1, 1, 'Microsoft Excel: Base & Advanced Analytics', 'excel', 1),
(2, 1, 'SQL Server & Relational Database Engineering', 'sql', 2),
(3, 1, 'Python Programming, Pandas & Statistical Analysis', 'python', 3),
(4, 1, 'Power BI & Executive Dashboard Reporting', 'powerbi', 4),
(5, 1, 'Machine Learning & Generative AI Systems', 'ml_ai', 5)
ON DUPLICATE KEY UPDATE `title`=VALUES(`title`);

-- 6. Sessions (With UpCloud Object Storage & DRM Encrypted Streaming)
INSERT INTO `sessions` (`id`, `module_id`, `batch_id`, `session_code`, `title`, `description`, `mentor_name`, `recording_date`, `duration_text`, `sort_order`, `video_type`, `video_url`, `video_filename`, `materials_url`, `materials_filename`, `assignment_url`, `assignment_filename`) VALUES
(1, 1, 1, 'B1.SESSION-1', 'Financial Modeling & Pivot Automation', 'Comprehensive introduction to formulas, nested lookups, and pivot cache optimization.', 'Dr. Sandip Mukherjee', '2026-06-06', '2h 15m', 1, 's3', 'https://b1storage.t8fcc.upcloudobjects.com/Application%20Master/ADVANCED%20ANALYTICS%20IN%20EXCEL/BATCH%20202501%20TO%20DV%20BATCH%20202510/01-BASIC%20DESCRIPTIVE%20STATISTICS/drive-download-20260210T063729Z-1-001.zip', 'Excel_Session1_Lecture.mp4', 'https://b1storage.t8fcc.upcloudobjects.com/Application%20Master/ADVANCED%20ANALYTICS%20IN%20EXCEL/BATCH%20202501%20TO%20DV%20BATCH%20202510/01-BASIC%20DESCRIPTIVE%20STATISTICS/drive-download-20260210T063729Z-1-001.zip', 'Excel_Session1_Materials.zip', 'https://b1storage.t8fcc.upcloudobjects.com/Application%20Master/ADVANCED%20ANALYTICS%20IN%20EXCEL/BATCH%20202501%20TO%20DV%20BATCH%20202510/01-BASIC%20DESCRIPTIVE%20STATISTICS/drive-download-20260210T063729Z-1-001.zip', 'Excel_Session1_Assignment.xlsx'),
(2, 1, 1, 'B1.SESSION-2', 'Descriptive Statistics & Dynamic Array Formulas', 'XLOOKUP, LAMBDA functions, LET formulas, and standard deviation distributions.', 'Dr. Sandip Mukherjee', '2026-06-13', '2h 00m', 2, 's3', 'https://b1storage.t8fcc.upcloudobjects.com/Application%20Master/ADVANCED%20ANALYTICS%20IN%20EXCEL/BATCH%20202501%20TO%20DV%20BATCH%20202510/02-PROBABILITY/drive-download-20260210T063642Z-1-001.zip', 'Excel_Session2_Lecture.mp4', 'https://b1storage.t8fcc.upcloudobjects.com/Application%20Master/ADVANCED%20ANALYTICS%20IN%20EXCEL/BATCH%20202501%20TO%20DV%20BATCH%20202510/02-PROBABILITY/drive-download-20260210T063642Z-1-001.zip', 'Excel_Session2_Materials.zip', 'https://b1storage.t8fcc.upcloudobjects.com/Application%20Master/ADVANCED%20ANALYTICS%20IN%20EXCEL/BATCH%20202501%20TO%20DV%20BATCH%20202510/02-PROBABILITY/drive-download-20260210T063642Z-1-001.zip', 'Excel_Session2_Assignment.xlsx'),
(3, 2, 1, 'B2.SESSION-1', 'Relational Schemas, Constraints & Complex Joins', 'Database normal forms 1NF to 3NF, multi-table inner/outer/cross joins, and query plans.', 'Dr. Sandip Mukherjee', '2026-07-04', '2h 30m', 1, 's3', 'https://b1storage.t8fcc.upcloudobjects.com/sessions/sql/sql_session_1.mp4', 'SQL_Session1_Lecture.mp4', 'https://b1storage.t8fcc.upcloudobjects.com/sessions/sql/materials_1.zip', 'SQL_Session1_Materials.zip', 'https://b1storage.t8fcc.upcloudobjects.com/sessions/sql/assignment_1.sql', 'SQL_Session1_Assignment.sql')
ON DUPLICATE KEY UPDATE `title`=VALUES(`title`);

-- 7. Fee Ledgers (Synced with BATCH 2000000.xlsx & Fee.aspx)
INSERT INTO `fee_ledgers` (`user_id`, `batch_id`, `payment_date`, `committed_fee`, `amount_paid`, `installment_no`, `balance_due`, `mode_of_pay`, `receipt_invoice_no`, `receipt_url`, `remarks`) VALUES
(4, 1, '2026-06-04', 290000.00, 235000.00, 1, 55000.00, 'DV DATA & ANALYTICS ICICI BANK', 'INV-2026-BBS202606010', 'https://b1storage.t8fcc.upcloudobjects.com/receipts/Receipt_BBS202606010.pdf', 'Risk: LOW | Balance ₹55000 due.'),
(5, 1, '2026-06-04', 290000.00, 55000.00, 1, 235000.00, 'Bank Transfer', 'INV-2026-BBS202607017', 'https://b1storage.t8fcc.upcloudobjects.com/receipts/Receipt_BBS202607017.pdf', 'Risk: CRITICAL | Balance ₹235000 due.'),
(6, 1, '2026-06-05', 160000.00, 56666.00, 1, 103334.00, 'Bank Transfer', 'INV-2026-BBS202606014', 'https://b1storage.t8fcc.upcloudobjects.com/receipts/Receipt_BBS202606014.pdf', 'Risk: HIGH | Balance ₹103334 due.'),
(7, 1, '2026-06-05', 290000.00, 290000.00, 1, 0.00, 'Bank Transfer', 'INV-2026-BBS202606009', 'https://b1storage.t8fcc.upcloudobjects.com/receipts/Receipt_BBS202606009.pdf', 'Full course fee cleared. Account closed.'),
(8, 1, '2026-06-05', 290000.00, 55000.00, 1, 235000.00, 'Bank Transfer', 'INV-2026-BLR202606015', 'https://b1storage.t8fcc.upcloudobjects.com/receipts/Receipt_BLR202606015.pdf', 'Risk: CRITICAL | Balance ₹235000 due.'),
(9, 1, '2026-06-06', 290000.00, 103000.00, 1, 187000.00, 'Bank Transfer', 'INV-2026-BBS202606017', 'https://b1storage.t8fcc.upcloudobjects.com/receipts/Receipt_BBS202606017.pdf', 'Risk: HIGH | Balance ₹187000 due.'),
(10, 1, '2026-05-26', 290000.00, 205000.00, 1, 85000.00, 'Bank Transfer', 'INV-2026-BBS202606015', 'https://b1storage.t8fcc.upcloudobjects.com/receipts/Receipt_BBS202606015.pdf', 'Risk: LOW | Balance ₹85000 due.'),
(11, 1, '2026-05-28', 295000.00, 266000.00, 1, 29000.00, 'DV DATA & ANALYTICS ICICI BANK', 'INV-2026-BLR202606001', 'https://b1storage.t8fcc.upcloudobjects.com/receipts/Receipt_BLR202606001.pdf', 'Risk: LOW | Balance ₹29000 due.'),
(12, 1, '2026-05-29', 177000.00, 170000.00, 1, 7000.00, 'Bank Transfer', 'INV-2026-BLR202606006', 'https://b1storage.t8fcc.upcloudobjects.com/receipts/Receipt_BLR202606006.pdf', 'Risk: LOW | Balance ₹7000 due.'),
(13, 1, '2026-06-01', 280000.00, 280000.00, 1, 0.00, 'Bank Transfer', 'INV-2026-BBS202606006', 'https://b1storage.t8fcc.upcloudobjects.com/receipts/Receipt_BBS202606006.pdf', 'Full course fee cleared. Account closed.');

-- 8. Video Watch Forensics Logs (DRM Tracked & Watermarked)
INSERT INTO `video_watch_logs` (`user_id`, `session_id`, `batch_id`, `total_duration_seconds`, `watched_seconds`, `watch_percent`, `completed`, `drm_watermark_verified`, `client_ip`, `user_agent`) VALUES
(4, 1, 1, 216000, 153000, 70.83, 0, 1, '103.212.148.42', 'DV-DRM-SecurePlayer-v2026'),
(5, 1, 1, 216000, 171000, 79.17, 0, 1, '103.212.148.42', 'DV-DRM-SecurePlayer-v2026'),
(6, 1, 1, 216000, 189000, 87.50, 1, 1, '103.212.148.42', 'DV-DRM-SecurePlayer-v2026'),
(7, 1, 1, 216000, 207000, 95.83, 1, 1, '103.212.148.42', 'DV-DRM-SecurePlayer-v2026'),
(8, 1, 1, 216000, 153000, 70.83, 0, 1, '103.212.148.42', 'DV-DRM-SecurePlayer-v2026'),
(9, 1, 1, 216000, 171000, 79.17, 0, 1, '103.212.148.42', 'DV-DRM-SecurePlayer-v2026'),
(10, 1, 1, 216000, 189000, 87.50, 1, 1, '103.212.148.42', 'DV-DRM-SecurePlayer-v2026'),
(11, 1, 1, 216000, 207000, 95.83, 1, 1, '103.212.148.42', 'DV-DRM-SecurePlayer-v2026'),
(12, 1, 1, 216000, 153000, 70.83, 0, 1, '103.212.148.42', 'DV-DRM-SecurePlayer-v2026'),
(13, 1, 1, 216000, 171000, 79.17, 0, 1, '103.212.148.42', 'DV-DRM-SecurePlayer-v2026');
