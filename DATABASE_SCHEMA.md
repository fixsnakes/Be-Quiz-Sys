# Tài Liệu Cơ Sở Dữ Liệu - Hệ Thống Quiz/Exam

Tài liệu này mô tả chi tiết tất cả các bảng trong cơ sở dữ liệu của hệ thống.

---

## 1. tblUser

Bảng lưu trữ thông tin người dùng trong hệ thống.

| Tên thuộc tính | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---------------|--------------|-----------|-------|
| id | integer | PK | ID người dùng |
| fullName | varchar | | Tên đầy đủ |
| email | varchar | UNIQUE | Email (duy nhất) |
| password | varchar | | Mật khẩu |
| balance | decimal | | Số dư tài khoản |
| role | varchar | | Vai trò (admin, teacher, student) |
| last_login | integer | | Thời gian đăng nhập cuối |
| avatar_url | integer | NULL | URL ảnh đại diện |

---

## 2. tblRecent_logins

Bảng lưu trữ lịch sử đăng nhập của người dùng.

| Tên thuộc tính | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---------------|--------------|-----------|-------|
| id | integer | PK | ID bản ghi |
| tblUserid | integer | FK → tblUser | ID người dùng |
| device | varchar | | Thiết bị đăng nhập |
| ip_address | varchar | | Địa chỉ IP |
| location | varchar | | Vị trí đăng nhập |
| login_time | date | | Thời gian đăng nhập |

**Quan hệ:** tblUser (1) -- (M) tblRecent_logins

---

## 3. tblNotifications

Bảng lưu trữ thông báo cho người dùng.

| Tên thuộc tính | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---------------|--------------|-----------|-------|
| id | integer | PK | ID thông báo |
| tblUserid | integer | FK → tblUser | ID người dùng |
| type | varchar | | Loại thông báo |
| title | varchar | | Tiêu đề |
| message | varchar | | Nội dung |
| data | varchar | | Dữ liệu bổ sung |
| is_read | tinyint | | Đã đọc (0/1) |
| read_at | date | | Thời gian đọc |
| created_at | date | | Thời gian tạo |

**Quan hệ:** tblUser (1) -- (M) tblNotifications

---

## 4. tbltransaction_history

Bảng lưu trữ lịch sử giao dịch trong hệ thống.

| Tên thuộc tính | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---------------|--------------|-----------|-------|
| id | integer | PK | ID giao dịch |
| tblUserid | integer | FK → tblUser | ID người dùng |
| transactionType | varchar | | Loại giao dịch |
| referenceid | integer | | ID tham chiếu |
| amount | decimal | | Số tiền |
| beforeBalance | decimal | | Số dư trước |
| afterBalance | decimal | | Số dư sau |
| transactionStatus | varchar | | Trạng thái |
| transferType | varchar | | Loại chuyển khoản |
| description | varchar | | Mô tả |
| created_at | date | | Thời gian tạo |

**Quan hệ:** tblUser (1) -- (M) tbltransaction_history

---

## 5. tblDeposit_history

Bảng lưu trữ lịch sử nạp tiền của người dùng.

| Tên thuộc tính | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---------------|--------------|-----------|-------|
| id | integer | PK | ID nạp tiền |
| tblUserid | integer | FK → tblUser | ID người dùng |
| bankName | varchar | | Tên ngân hàng |
| bankAccountName | varchar | | Tên chủ tài khoản |
| bankAccountNumber | varchar | | Số tài khoản |
| deposit_status | varchar | | Trạng thái (pending/success/failed) |
| deposit_code | varchar | | Mã nạp tiền |
| deposit_type | varchar | | Loại nạp tiền |
| deposit_amount | decimal | | Số tiền nạp |
| created_at | date | | Thời gian tạo |

**Quan hệ:** tblUser (1) -- (M) tblDeposit_history

---

## 6. tblWithdrawn_history

Bảng lưu trữ lịch sử rút tiền của người dùng.

| Tên thuộc tính | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---------------|--------------|-----------|-------|
| id | integer | PK | ID rút tiền |
| tblUserid | integer | FK → tblUser | ID người dùng |
| bankName | varchar | | Tên ngân hàng |
| bankAccountName | varchar | | Tên chủ tài khoản |
| bankAccountNumber | varchar | | Số tài khoản |
| amount | decimal | | Số tiền rút |
| withdrawn_code | varchar | | Mã rút tiền |
| status | varchar | | Trạng thái (pending/success/failed) |
| admin_role | varchar | | Vai trò admin xử lý |
| reject_reason | varchar | | Lý do từ chối |
| processed_at | date | | Thời gian xử lý |
| created_at | date | | Thời gian tạo |

**Quan hệ:** tblUser (1) -- (M) tblWithdrawn_history

---

## 7. tblClasses

Bảng lưu trữ thông tin các lớp học.

| Tên thuộc tính | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---------------|--------------|-----------|-------|
| id | integer | PK | ID lớp học |
| className | varchar | | Tên lớp |
| classCode | varchar | | Mã lớp |
| created_at | date | | Thời gian tạo |

---

## 8. tblClass_Student

Bảng liên kết học sinh với lớp học.

| Tên thuộc tính | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---------------|--------------|-----------|-------|
| id | integer | PK | ID bản ghi |
| tblUserid | integer | FK → tblUser | ID học sinh |
| tblClassesid | integer | FK → tblClasses | ID lớp học |
| joined_at | date | | Thời gian tham gia |
| is_ban | integer | | Bị cấm (0/1) |

**Quan hệ:** 
- tblUser (1) -- (M) tblClass_Student
- tblClasses (1) -- (M) tblClass_Student

---

## 9. tblPost_Classes

Bảng lưu trữ các bài đăng trong lớp học.

| Tên thuộc tính | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---------------|--------------|-----------|-------|
| id | integer | PK | ID bài đăng |
| tblClassesid | integer | FK → tblClasses | ID lớp học |
| tblUserid | integer | FK → tblUser | ID người đăng |
| title | varchar | | Tiêu đề |
| text | varchar | | Nội dung |
| created_at | date | | Thời gian tạo |
| updateAt | date | | Thời gian cập nhật |

**Quan hệ:** 
- tblClasses (1) -- (M) tblPost_Classes
- tblUser (1) -- (M) tblPost_Classes

---

## 10. tblPost_Comments

Bảng lưu trữ bình luận trên các bài đăng trong lớp học.

| Tên thuộc tính | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---------------|--------------|-----------|-------|
| id | integer | PK | ID bình luận |
| tblUserid | integer | FK → tblUser | ID người bình luận |
| tblPost_Classesid | integer | FK → tblPost_Classes | ID bài đăng |
| text | varchar | | Nội dung bình luận |
| created_at | date | | Thời gian tạo |
| updated_at | date | | Thời gian cập nhật |

**Quan hệ:** 
- tblPost_Classes (1) -- (M) tblPost_Comments
- tblUser (1) -- (M) tblPost_Comments

---

## 11. tblExams

Bảng lưu trữ thông tin các đề thi.

| Tên thuộc tính | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---------------|--------------|-----------|-------|
| id | integer | PK | ID đề thi |
| title | varchar | | Tiêu đề |
| des | varchar | | Mô tả |
| total_score | integer | | Tổng điểm |
| minutes | integer | | Thời gian (phút) |
| start_time | date | | Thời gian bắt đầu |
| end_time | date | | Thời gian kết thúc |
| is_pad | tinyint | | Có yêu cầu thanh toán (0/1) |
| fee | decimal | | Phí thi |
| tblUserid | integer | FK → tblUser | ID người tạo |
| is_public | tinyint | | Công khai (0/1) |
| count | integer | | Số lượt làm |
| question_creation_method | varchar | | Phương thức tạo câu hỏi |
| image_url | varchar | | URL ảnh |
| created_at | date | | Thời gian tạo |

**Quan hệ:** tblUser (1) -- (M) tblExams

---

## 12. tblExam_classes

Bảng liên kết đề thi với lớp học.

| Tên thuộc tính | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---------------|--------------|-----------|-------|
| id | integer | PK | ID bản ghi |
| tblExamsid | integer | FK → tblExams | ID đề thi |
| tblClassesid | integer | FK → tblClasses | ID lớp học |

**Quan hệ:** 
- tblExams (1) -- (M) tblExam_classes
- tblClasses (1) -- (M) tblExam_classes

---

## 13. tblExam_favorites

Bảng lưu trữ các đề thi được đánh dấu yêu thích.

| Tên thuộc tính | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---------------|--------------|-----------|-------|
| id | integer | PK | ID bản ghi |
| tblUserid | integer | FK → tblUser | ID người dùng |
| tblExamsid | integer | FK → tblExams | ID đề thi |
| created_at | date | | Thời gian tạo |

**Quan hệ:** 
- tblUser (1) -- (M) tblExam_favorites
- tblExams (1) -- (M) tblExam_favorites

---

## 14. tblExampurchase

Bảng lưu trữ lịch sử mua đề thi.

| Tên thuộc tính | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---------------|--------------|-----------|-------|
| id | integer | PK | ID mua hàng |
| tblExamsid | integer | FK → tblExams | ID đề thi |
| tblUserid | integer | FK → tblUser | ID người mua |
| purchase_price | decimal | | Giá mua |
| purchase_date | date | | Ngày mua |

**Quan hệ:** 
- tblExams (1) -- (M) tblExampurchase
- tblUser (1) -- (M) tblExampurchase

---

## 15. tblExam_comments

Bảng lưu trữ bình luận trên đề thi.

| Tên thuộc tính | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---------------|--------------|-----------|-------|
| id | integer | PK | ID bình luận |
| tblUserid | integer | FK → tblUser | ID người bình luận |
| tblExamsid | integer | FK → tblExams | ID đề thi |
| text | varchar | | Nội dung bình luận |
| parent_id | integer | | ID bình luận cha (nested) |
| created_at | date | | Thời gian tạo |
| updated_at | date | | Thời gian cập nhật |

**Quan hệ:** 
- tblExams (1) -- (M) tblExam_comments
- tblUser (1) -- (M) tblExam_comments

---

## 16. tblEam_sessions

Bảng lưu trữ các phiên làm bài thi.

| Tên thuộc tính | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---------------|--------------|-----------|-------|
| id | integer | PK | ID phiên thi |
| tblUserid | integer | FK → tblUser | ID người làm bài |
| tblExamsid | integer | FK → tblExams | ID đề thi |
| code | varchar | | Mã phiên thi |
| start_time | date | | Thời gian bắt đầu |
| end_time | date | | Thời gian kết thúc |
| total_score | decimal | | Tổng điểm |
| status | varchar | | Trạng thái |
| submitted_at | date | | Thời gian nộp bài |

**Quan hệ:** 
- tblUser (1) -- (M) tblEam_sessions
- tblExams (1) -- (M) tblEam_sessions

---

## 17. tblQuestions

Bảng lưu trữ các câu hỏi trong đề thi.

| Tên thuộc tính | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---------------|--------------|-----------|-------|
| id | integer | PK | ID câu hỏi |
| tblExamsid | integer | FK → tblExams | ID đề thi |
| tblUserid | integer | FK → tblUser | ID người tạo |
| question_text | varchar | | Nội dung câu hỏi |
| image_url | varchar | | URL ảnh |
| type | varchar | | Loại câu hỏi |
| dificutly | varchar | | Độ khó |
| order | integer | | Thứ tự |
| created_at | date | | Thời gian tạo |

**Quan hệ:** 
- tblExams (1) -- (M) tblQuestions
- tblUser (1) -- (M) tblQuestions

---

## 18. tblQuesion_answers

Bảng lưu trữ các đáp án của câu hỏi.

| Tên thuộc tính | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---------------|--------------|-----------|-------|
| id | integer | PK | ID đáp án |
| tblQuestionsid | integer | FK → tblQuestions | ID câu hỏi |
| text | varchar | | Nội dung đáp án |
| is_correct | tinyint | | Đáp án đúng (0/1) |
| created_at | date | | Thời gian tạo |
| updated_at | date | | Thời gian cập nhật |

**Quan hệ:** tblQuestions (1) -- (M) tblQuesion_answers

---

## 19. tblStudent_answers

Bảng lưu trữ câu trả lời của học sinh trong phiên thi.

| Tên thuộc tính | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---------------|--------------|-----------|-------|
| id | integer | PK | ID câu trả lời |
| tblEam_sessionsid | integer | FK → tblEam_sessions | ID phiên thi |
| tblQuestionsid | integer | FK → tblQuestions | ID câu hỏi |
| tblQuesion_answersid | integer | FK → tblQuesion_answers | ID đáp án đã chọn |
| answer_text | varchar | | Văn bản trả lời |
| score | decimal | | Điểm |
| answered_at | date | | Thời gian trả lời |
| is_correct | tinyint | | Đúng/Sai (0/1) |

**Quan hệ:** 
- tblEam_sessions (1) -- (M) tblStudent_answers
- tblQuestions (1) -- (M) tblStudent_answers
- tblQuesion_answers (1) -- (M) tblStudent_answers

---

## 20. tblStudent_exam_status

Bảng theo dõi trạng thái và kết quả làm bài của học sinh.

| Tên thuộc tính | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---------------|--------------|-----------|-------|
| id | integer | PK | ID bản ghi |
| tblEam_sessionsid | integer | FK → tblEam_sessions | ID phiên thi |
| tblExamsid | integer | FK → tblExams | ID đề thi |
| tblUserid | integer | FK → tblUser | ID học sinh |
| attempt_count | integer | | Số lần làm bài |
| status | varchar | | Trạng thái |
| fitst_attemp_at | date | | Thời gian làm lần đầu |
| last_attemp_at | date | | Thời gian làm lần cuối |
| best_score | decimal | | Điểm cao nhất |
| last_score | decimal | | Điểm lần cuối |
| best_percentage | decimal | | Tỷ lệ % tốt nhất |
| completed_at | date | | Thời gian hoàn thành |
| created_at | date | | Thời gian tạo |
| updated_at | date | | Thời gian cập nhật |

**Quan hệ:** 
- tblEam_sessions (1) -- (M) tblStudent_exam_status
- tblExams (1) -- (M) tblStudent_exam_status
- tblUser (1) -- (M) tblStudent_exam_status

---

## 21. tblExam_results

Bảng lưu trữ kết quả thi của học sinh.

| Tên thuộc tính | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---------------|--------------|-----------|-------|
| id | integer | PK | ID kết quả |
| tblExamsid | integer | FK → tblExams | ID đề thi |
| tblUserid | integer | FK → tblUser | ID người làm bài |
| tblEam_sessionsid | integer | FK → tblEam_sessions | ID phiên thi |
| total_score | decimal | | Tổng điểm |
| correct_count | integer | | Số câu đúng |
| wrong_count | integer | | Số câu sai |
| submitted_at | date | | Thời gian nộp bài |
| status | varchar | | Trạng thái |
| feedback | varchar | | Nhận xét |
| percentage | decimal | | Tỷ lệ phần trăm |

**Quan hệ:** 
- tblExams (1) -- (M) tblExam_results
- tblUser (1) -- (M) tblExam_results
- tblEam_sessions (1) -- (M) tblExam_results

---

## 22. tblExam_ratings

Bảng lưu trữ đánh giá của người dùng về kết quả thi.

| Tên thuộc tính | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---------------|--------------|-----------|-------|
| id | integer | PK | ID đánh giá |
| rating | integer | | Điểm đánh giá |
| tblExam_resultsid | integer | FK → tblExam_results | ID kết quả thi |
| tblUserid | integer | FK → tblUser | ID người đánh giá |
| comment | varchar | | Bình luận |
| created_at | date | | Thời gian tạo |
| updated_at | date | | Thời gian cập nhật |

**Quan hệ:** 
- tblExam_results (1) -- (M) tblExam_ratings
- tblUser (1) -- (M) tblExam_ratings

---

## 23. tblExam_cheating_logs

Bảng lưu trữ log các hành vi gian lận trong quá trình thi.

| Tên thuộc tính | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---------------|--------------|-----------|-------|
| id | integer | PK | ID bản ghi |
| tblEam_sessionsid | integer | FK → tblEam_sessions | ID phiên thi |
| tblUserid | integer | FK → tblUser | ID người dùng |
| tblExamsid | integer | FK → tblExams | ID đề thi |
| cheating_type | varchar | | Loại gian lận |
| description | varchar | | Mô tả |
| metadata | varchar | | Dữ liệu bổ sung |
| serverity | varchar | | Mức độ nghiêm trọng |
| detected_at | date | | Thời gian phát hiện |

**Quan hệ:** 
- tblEam_sessions (1) -- (M) tblExam_cheating_logs
- tblUser (1) -- (M) tblExam_cheating_logs
- tblExams (1) -- (M) tblExam_cheating_logs

---

## Tổng Kết

Hệ thống bao gồm **23 bảng** được tổ chức thành các nhóm chức năng:

### Nhóm Quản Lý Người Dùng
- tblUser
- tblRecent_logins
- tblNotifications

### Nhóm Giao Dịch Tài Chính
- tbltransaction_history
- tblDeposit_history
- tblWithdrawn_history

### Nhóm Quản Lý Lớp Học
- tblClasses
- tblClass_Student
- tblPost_Classes
- tblPost_Comments

### Nhóm Quản Lý Đề Thi
- tblExams
- tblExam_classes
- tblExam_favorites
- tblExampurchase
- tblExam_comments

### Nhóm Phiên Thi và Kết Quả
- tblEam_sessions
- tblQuestions
- tblQuesion_answers
- tblStudent_answers
- tblStudent_exam_status
- tblExam_results
- tblExam_ratings
- tblExam_cheating_logs

---

**Ghi chú:**
- PK: Primary Key (Khóa chính)
- FK: Foreign Key (Khóa ngoại)
- (1) -- (M): Quan hệ một-nhiều


