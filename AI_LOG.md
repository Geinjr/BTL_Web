# Nhật ký sử dụng AI

## Khai báo

Dự án có sử dụng **OpenAI Codex** qua hội thoại làm việc ngày 16/11/2026. AI hỗ trợ đọc tài liệu, phân tích yêu cầu, viết mã, soạn hồ sơ, chạy kiểm thử và thao tác triển khai GitHub theo yêu cầu của người dùng. Không khai báo đây là mã do sinh viên tự viết toàn bộ.

Người dùng chọn chủ đề khách sạn, xác nhận tên **Gein Hotel**, yêu cầu dọn tệp phụ và chỉ định repository `Geinjr/BTL_Web`. Thông tin người nộp: Đỗ Trung Kiên, mã sinh viên 1771020780, lớp CNTT17-13, học kỳ 1 năm học 2026–2027. Chưa có thông tin để xác nhận phần mã sinh viên tự viết; người nộp cần bổ sung trung thực trước khi nộp.

## Các yêu cầu và công việc thực hiện

| Lượt yêu cầu | Nội dung người dùng                                        | AI hỗ trợ                                                                                                        | Cách đối chiếu                                                          |
| ------------ | ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| 1            | Đọc PDF và làm web khách sạn đúng hướng dẫn                | Đọc 10 trang; xây 5 trang HTML/CSS/JS và dữ liệu mẫu                                                             | Mã nguồn và bảng rubric                                                 |
| 2            | Dùng tên Gein Hotel                                        | Thay tên thương hiệu và nội dung giả định                                                                        | Tiêu đề, menu và chân trang                                             |
| 3            | Xóa công cụ, tệp tạm không cần                             | Xóa `.tools`, `tmp`, bộ sinh HTML; giữ JavaScript đang dùng                                                      | Cây tệp repository                                                      |
| 4            | Kiểm tra, hoàn tất yêu cầu và đẩy kho GitHub được chỉ định | Bổ sung hồ sơ, kiểm thử DOM, sửa truy cập trường form và pattern điện thoại; triển khai và xác minh khi có quyền | Log kiểm thử; lịch sử Git; dữ liệu Pages và script đối chiếu tài nguyên |

Mẫu `FIT4014_A3_MauBaoCao.docx` được phát hiện cùng thư mục bài tập và đọc để lấy cấu trúc báo cáo, tiêu chí con. Không thay đổi bản mẫu gốc hoặc đưa tài liệu học phần lên kho công khai.

## Giới hạn và kiểm tra của con người

- Công cụ truy cập trình duyệt báo không khả dụng; chưa có kiểm tra trực quan desktop/mobile hoặc video demo do AI thực hiện trong lần bàn giao này.
- Kết quả DOM chỉ phản ánh điều đã chạy bằng jsdom. Hộp thoại được giả lập open/close trong thử nghiệm, không xác minh hành vi native.
- Nội dung, giá, chính sách và tiện nghi là giả định của đồ án; ảnh được lấy từ nguồn ghi trong danh mục tài nguyên, không phải ảnh khách sạn Gein có thật.
- Người nộp chịu trách nhiệm kiểm tra nguồn, khai báo AI theo quy định lớp, bổ sung thông tin cá nhân và trực tiếp demo.
- Không có mật khẩu, token GitHub hoặc dữ liệu khách thật trong mã nguồn hay minh chứng. Tài khoản mẫu kiểm thử là `demo@example.com`.
