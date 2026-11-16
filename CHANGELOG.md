# Ghi chú phiên bản

## Cập nhật hồ sơ — 16/11/2026

- Bổ sung mã sinh viên 1771020780 của Đỗ Trung Kiên vào README, báo cáo và khai báo AI.
- Dọn thư viện kiểm thử đã cài tại máy và cấu hình editor cục bộ; giữ mã nguồn, bộ thử và minh chứng A3. Có thể cài lại thư viện bằng `npm ci`.
- Mã website giữ nguyên so với `v1.0.0`; commit cập nhật hồ sơ nằm sau tag này trên nhánh `main`.

## v1.0.0 — 16/11/2026

- Hoàn thành 5 trang HTML5, CSS3 responsive và JavaScript thuần cho Gein Hotel.
- Bổ sung lọc phòng, chi tiết, đặt phòng mẫu, tính số đêm và tổng tiền, kiểm tra dữ liệu liên hệ.
- Dùng đường dẫn tương đối để chạy trong thư mục dự án trên GitHub Pages.
- Bổ sung kiểm thử DOM, README, báo cáo A3, AI_LOG, wireframe, nguồn tài nguyên và kịch bản demo.
- Dùng `form.elements.namedItem` để tránh trùng với thuộc tính `name` của form.
- Sửa pattern điện thoại để hợp lệ với biểu thức chính quy chế độ `v` của HTML hiện đại.
- Đã bật GitHub Pages từ nhánh `main`, thư mục gốc; `.nojekyll` dùng website tĩnh. Lần kiểm tra công khai đầu tiên có 15/15 tệp HTTP 200 và khớp SHA-256.

### Giới hạn

Chưa có backend, kiểm tra tồn phòng, email, thanh toán hoặc lưu trữ cá nhân. Chưa kiểm tra trực quan bằng trình duyệt thật; chưa có điểm Lighthouse, ảnh chụp responsive hay video demo. Chưa đối chiếu BM13 riêng và hướng dẫn nộp LMS.
