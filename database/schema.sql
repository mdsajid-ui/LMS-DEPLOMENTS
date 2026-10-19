-- ====================================================================
-- DV Analytics LMS - Production Database Schema (MySQL 8.0+ / MariaDB)
-- Database Name: dv_analytics_lms
-- Compatible with UpCloud Managed Database, AWS RDS, GCP Cloud SQL,
-- Local MySQL / MariaDB, phpMyAdmin, and Docker.
-- ====================================================================

CREATE DATABASE IF NOT EXISTS `dv_analytics_lms` 
  CHARACTER SET utf8mb4 
  COLLATE utf8mb4_unicode_ci;

USE `dv_analytics_lms`;

-- Disable foreign key checks for clean creation
SET FOREIGN_KEY_CHECKS = 0;

-- --------------------------------------------------------------------
-- 1. ROLES & USERS TABLE
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `user_roles`;
CREATE TABLE `user_roles` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `role_name` VARCHAR(50) NOT NULL UNIQUE,
  `description` VARCHAR(255) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `user_roles` (`id`, `role_name`, `description`) VALUES
(1, 'superadmin', 'Full administrative control over all LMS features'),
(2, 'admin', 'Batch, curriculum, fee and approval operations'),
(3, 'mentor', 'Faculty instructor managing live classes and assignments'),
(4, 'student', 'Enrolled candidate accessing courses and tests');

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `role_id` INT NOT NULL DEFAULT 4,
  `student_id` VARCHAR(50) UNIQUE NULL,
  `roll_no` VARCHAR(50) UNIQUE NULL,
  `email` VARCHAR(191) NOT NULL UNIQUE,
  `phone` VARCHAR(20) NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `full_name` VARCHAR(150) NOT NULL,
  `avatar_url` VARCHAR(500) NULL,
  `date_of_birth` DATE NULL,
  `gender` ENUM('Male', 'Female', 'Other') DEFAULT 'Male',
  `qualification` VARCHAR(150) NULL,
  `status` ENUM('Active', 'Suspended', 'Alumni', 'Pending') DEFAULT 'Active',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`role_id`) REFERENCES `user_roles`(`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------------------
-- 2. PROGRAMS, COURSES & BATCHES
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `programs`;
CREATE TABLE `programs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `code` VARCHAR(50) NOT NULL UNIQUE,          -- e.g. 'APIDS', 'APIDA', 'FDE'
  `title` VARCHAR(255) NOT NULL,              -- 'Advanced Program in Data Science & AI'
  `category` VARCHAR(100) NOT NULL,
  `duration_months` INT DEFAULT 6,
  `total_fee` DECIMAL(10,2) DEFAULT 350000.00,
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `batches`;
CREATE TABLE `batches` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `batch_code` VARCHAR(50) NOT NULL UNIQUE,   -- 'BATCH 202606', 'BATCH 202510'
  `program_id` INT NOT NULL,
  `cohort_name` VARCHAR(100) NOT NULL,        -- 'Live Program Weekend'
  `start_date` DATE NOT NULL,
  `end_date` DATE NULL,
  `is_active` TINYINT(1) DEFAULT 1,
  `zoom_meeting_url` VARCHAR(500) NULL,
  `zoom_meeting_id` VARCHAR(100) NULL,
  `zoom_passcode` VARCHAR(50) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`program_id`) REFERENCES `programs`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `batch_enrollments`;
CREATE TABLE `batch_enrollments` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `user_id` BIGINT NOT NULL,
  `batch_id` INT NOT NULL,
  `enrolled_date` DATE NOT NULL,
  `overall_progress_pct` DECIMAL(5,2) DEFAULT 0.00,
  `attendance_pct` DECIMAL(5,2) DEFAULT 0.00,
  `status` ENUM('Active', 'Completed', 'Dropped', 'Transferred') DEFAULT 'Active',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `uniq_user_batch` (`user_id`, `batch_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`batch_id`) REFERENCES `batches`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------------------
-- 3. MODULES & SESSIONS (STORAGE & VIDEOS)
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `course_modules`;
CREATE TABLE `course_modules` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `program_id` INT NOT NULL,
  `title` VARCHAR(150) NOT NULL,              -- e.g. 'DBMS & Programming'
  `code` VARCHAR(50) NOT NULL,                -- 'excel', 'sql', 'python', 'bi', 'ml'
  `sort_order` INT DEFAULT 1,
  FOREIGN KEY (`program_id`) REFERENCES `programs`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `module_id` INT NOT NULL,
  `batch_id` INT NULL,
  `session_code` VARCHAR(50) NOT NULL,        -- 'B1.SESSION-1'
  `title` VARCHAR(255) NOT NULL,              -- 'Financial Modeling & Pivot Automation'
  `description` TEXT NULL,
  `mentor_name` VARCHAR(150) DEFAULT 'Dr. Sandip Mukherjee',
  `recording_date` DATE NULL,
  `duration_text` VARCHAR(50) DEFAULT '2h 00m',
  `sort_order` INT DEFAULT 1,
  
  -- Video streaming / S3 Object storage references
  `video_type` ENUM('s3', 'vdocipher', 'youtube', 'drive', 'direct') DEFAULT 's3',
  `video_s3_key` VARCHAR(500) NULL,
  `video_url` VARCHAR(1000) NULL,
  `video_filename` VARCHAR(255) NULL,
  
  -- Course Materials (Zip / PDF in S3 storage)
  `materials_s3_key` VARCHAR(500) NULL,
  `materials_url` VARCHAR(1000) NULL,
  `materials_filename` VARCHAR(255) NULL,
  
  -- Assignment files in S3
  `assignment_s3_key` VARCHAR(500) NULL,
  `assignment_url` VARCHAR(1000) NULL,
  `assignment_filename` VARCHAR(255) NULL,
  
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`module_id`) REFERENCES `course_modules`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`batch_id`) REFERENCES `batches`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------------------
-- 4. ASSIGNMENTS & SUBMISSIONS
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `assignments`;
CREATE TABLE `assignments` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `session_id` BIGINT NULL,
  `batch_id` INT NOT NULL,
  `subject` VARCHAR(100) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `instructions_file_url` VARCHAR(1000) NULL,
  `deadline_date` DATE NOT NULL,
  `max_marks` INT DEFAULT 100,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`session_id`) REFERENCES `sessions`(`id`) ON DELETE SET NULL,
  FOREIGN KEY (`batch_id`) REFERENCES `batches`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `assignment_submissions`;
CREATE TABLE `assignment_submissions` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `assignment_id` BIGINT NOT NULL,
  `user_id` BIGINT NOT NULL,
  `submitted_file_name` VARCHAR(255) NOT NULL,
  `s3_file_key` VARCHAR(500) NOT NULL,
  `s3_file_url` VARCHAR(1000) NOT NULL,
  `file_size_bytes` BIGINT NULL,
  `mime_type` VARCHAR(100) NULL,
  `submitted_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `status` ENUM('Pending', 'Approved', 'Rejected', 'Resubmission Requested') DEFAULT 'Pending',
  `grade` VARCHAR(10) NULL,                    -- 'A+', 'A', 'B'
  `score` DECIMAL(5,2) NULL,
  `mentor_remarks` TEXT NULL,
  `graded_by` BIGINT NULL,
  `graded_at` TIMESTAMP NULL,
  FOREIGN KEY (`assignment_id`) REFERENCES `assignments`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`graded_by`) REFERENCES `users`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------------------
-- 5. RESUMES & PLACEMENT MANAGEMENT
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `resumes`;
CREATE TABLE `resumes` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `user_id` BIGINT NOT NULL,
  `batch_id` INT NULL,
  `original_file_name` VARCHAR(255) NOT NULL,
  `pdf_s3_key` VARCHAR(500) NULL,
  `pdf_url` VARCHAR(1000) NULL,
  `word_s3_key` VARCHAR(500) NULL,
  `word_url` VARCHAR(1000) NULL,
  `ats_score` INT DEFAULT NULL,
  `status` ENUM('Draft', 'Pending', 'Approved', 'Needs Revision') DEFAULT 'Pending',
  `feedback` TEXT NULL,
  `uploaded_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `reviewed_by` BIGINT NULL,
  `reviewed_at` TIMESTAMP NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`batch_id`) REFERENCES `batches`(`id`) ON DELETE SET NULL,
  FOREIGN KEY (`reviewed_by`) REFERENCES `users`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------------------
-- 6. FEE MANAGEMENT & FINANCIAL LEDGER
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `fee_ledgers`;
CREATE TABLE `fee_ledgers` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `user_id` BIGINT NOT NULL,
  `batch_id` INT NOT NULL,
  `payment_date` DATE NOT NULL,
  `committed_fee` DECIMAL(10,2) NOT NULL,
  `amount_paid` DECIMAL(10,2) NOT NULL,
  `installment_no` INT DEFAULT 1,
  `balance_due` DECIMAL(10,2) NOT NULL,
  `mode_of_pay` VARCHAR(100) DEFAULT 'UPI / Bank Transfer',
  `receipt_invoice_no` VARCHAR(100) NULL,
  `receipt_s3_key` VARCHAR(500) NULL,
  `receipt_url` VARCHAR(1000) NULL,
  `remarks` TEXT NULL,
  `recorded_by` BIGINT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`batch_id`) REFERENCES `batches`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`recorded_by`) REFERENCES `users`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------------------
-- 7. ATTENDANCE & BIOMETRIC LOGS
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `attendance_logs`;
CREATE TABLE `attendance_logs` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `user_id` BIGINT NOT NULL,
  `session_id` BIGINT NULL,
  `batch_id` INT NOT NULL,
  `attendance_date` DATE NOT NULL,
  `status` ENUM('Present', 'Absent', 'Late', 'Excused') DEFAULT 'Present',
  `minutes_attended` INT DEFAULT 120,
  `recorded_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `uniq_user_session_date` (`user_id`, `session_id`, `attendance_date`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`session_id`) REFERENCES `sessions`(`id`) ON DELETE SET NULL,
  FOREIGN KEY (`batch_id`) REFERENCES `batches`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------------------
-- 8. CAT ASSESSMENTS (MCQ, PRACTICAL, MOCK INTERVIEW)
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `cat_questions`;
CREATE TABLE `cat_questions` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `domain` VARCHAR(100) NOT NULL,             -- 'SQL', 'Python', 'Machine Learning', 'Excel'
  `difficulty` ENUM('Easy', 'Medium', 'Hard') DEFAULT 'Medium',
  `question_text` TEXT NOT NULL,
  `option_a` TEXT NOT NULL,
  `option_b` TEXT NOT NULL,
  `option_c` TEXT NOT NULL,
  `option_d` TEXT NOT NULL,
  `correct_option` ENUM('A', 'B', 'C', 'D') NOT NULL,
  `explanation` TEXT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `cat_attempts`;
CREATE TABLE `cat_attempts` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `user_id` BIGINT NOT NULL,
  `domain` VARCHAR(100) NOT NULL,
  `score` DECIMAL(5,2) NOT NULL,
  `total_questions` INT NOT NULL,
  `correct_answers` INT NOT NULL,
  `time_taken_seconds` INT NOT NULL,
  `practical_submission_url` VARCHAR(1000) NULL,
  `interview_slot_timestamp` DATETIME NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------------------
-- 9. NOTIFICATIONS & BROADCASTS
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `notifications`;
CREATE TABLE `notifications` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `user_id` BIGINT NULL,                       -- NULL means broadcast to all
  `batch_id` INT NULL,                         -- NULL means across all batches
  `title` VARCHAR(255) NOT NULL,
  `message` TEXT NOT NULL,
  `type` ENUM('Announcement', 'Assignment', 'LiveClass', 'Fee', 'Placement') DEFAULT 'Announcement',
  `action_url` VARCHAR(500) NULL,
  `is_read` TINYINT(1) DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`batch_id`) REFERENCES `batches`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;

-- ====================================================================
-- SCHEMA CREATION COMPLETE!
-- ====================================================================
