# Kịch bản demo và phản biện

Thời lượng gợi ý 5–7 phút. Đây là kịch bản đã chuẩn bị, không phải khai đã trình bày trước giảng viên hoặc đã quay video.

## Luồng trình bày

1. Mở URL Pages, nêu đề tài khách sạn Gein Hotel và phạm vi website tĩnh. Chỉ rõ thương hiệu/dịch vụ giả định, đặt phòng không tạo giao dịch thật.
2. Tại trang chủ, chọn ngày nhận trong tương lai, ngày trả sau 2 đêm và 4 khách. Tìm phòng; kỳ vọng chỉ Family Suite phù hợp sức chứa.
3. Mở trang phòng không có tham số để giới thiệu đủ 3 hạng; lọc hai người rồi gia đình. Mở chi tiết Premier và bấm chọn phòng này.
4. Chọn Deluxe, 2 khách, 2 đêm. Kỳ vọng tổng 2.500.000 ₫. Thử vượt sức chứa để thấy lỗi; chọn lại hợp lệ. Dùng họ tên mẫu, `demo@example.com`, `0901234567` và đồng ý. Giải thích phản hồi xác nhận mô phỏng.
5. Tại liên hệ, thử email sai và form chưa đồng ý; sau đó nhập đúng và lời nhắn tối thiểu 10 ký tự. Xem phản hồi mẫu và FAQ.
6. Mở DevTools, kiểm tra 1440px, 390px và 360px; thử menu, cuộn ngang, Tab/Shift+Tab, hộp thoại và Escape. Phần này phải thực hiện thật; nếu chưa thử thì nói “chưa kiểm tra”, không tự dùng bảng kiểm DOM làm minh chứng responsive.
7. Mở repository, tag bàn giao, log kiểm thử và trạng thái Pages. Đối chiếu commit Pages, chạy xác minh hash. Giới thiệu README, báo cáo và khai báo AI.

## Câu hỏi phản biện dự kiến

**Vì sao nhiều trang?** Người xem có tác vụ xem phòng, xem dịch vụ và đọc chính sách riêng. URL mỗi trang giúp demo trực tiếp và giảm cuộn. Đánh đổi là khung menu lặp, cần đồng bộ khi sửa.

**Vì sao dùng HTML/CSS/JS thuần?** Hướng dẫn chọn website tĩnh HTML5/CSS3. JavaScript chỉ bổ sung tương tác, không tạo yêu cầu backend. Sản phẩm có thể xuất bản trực tiếp trên Pages.

**Vì sao không có thanh toán hoặc đăng nhập?** Không nằm trong phạm vi website tĩnh của đồ án này. Không giả vờ nhận tiền, giữ phòng hoặc lưu dữ liệu khách khi chưa có hệ thống xử lý thật.

**Tìm phòng có phải tìm tồn phòng không?** Không. Tìm kiếm giữ ngày để tính số đêm và lọc hạng theo sức chứa. Website đã ghi rõ không xác minh tồn phòng.

**Làm sao biết URL đúng phiên bản?** Xem SHA build Pages và tag nguồn, sau đó so sánh SHA-256 của từng trang/tài nguyên công khai với manifest tại checkout được nộp.

**Bằng chứng nào đã chạy thật?** Bộ thử DOM và script hash có log thực tế. Wireframe chỉ là thiết kế. Browser responsive, đánh giá người dùng và video chưa thực hiện thì không được ghi đạt.

**Vai trò AI?** Codex hỗ trợ phần lớn mã và hồ sơ. Người dùng chọn chủ đề/tên, yêu cầu triển khai. Sinh viên cần đọc hiểu, khai báo đúng và tự trả lời về logic, giới hạn của sản phẩm.
