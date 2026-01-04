-- Migration script: Đổi tên cột từ camelCase sang snake_case cho bảng withdrawn_history
-- Database: quizzsys_db
-- Date: 2026-01-04

USE quizzsys_db;

-- Đổi tên các cột từ camelCase sang snake_case
ALTER TABLE withdrawn_history 
    CHANGE COLUMN bankName bank_name VARCHAR(255) NOT NULL,
    CHANGE COLUMN bankAccountName bank_account_name VARCHAR(255) NOT NULL,
    CHANGE COLUMN bankAccountNumber bank_account_number VARCHAR(255) NOT NULL;

-- Kiểm tra kết quả
DESCRIBE withdrawn_history;

-- Nếu có lỗi và muốn rollback, chạy câu lệnh này:
-- ALTER TABLE withdrawn_history 
--     CHANGE COLUMN bank_name bankName VARCHAR(255) NOT NULL,
--     CHANGE COLUMN bank_account_name bankAccountName VARCHAR(255) NOT NULL,
--     CHANGE COLUMN bank_account_number bankAccountNumber VARCHAR(255) NOT NULL;
