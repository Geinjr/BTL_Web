# Yêu cầu và bảng đối chiếu A3

Nguồn: hướng dẫn A3 10 trang, đặc biệt trang 3–9, và mẫu báo cáo A3 đặt cùng thư mục. Mẫu báo cáo cung cấp các mã tiêu chí con dưới đây; chưa có BM13 riêng để xác nhận mức mô tả chấm điểm. Tỷ trọng tổng 100% cho A3.

## Người xem và phạm vi

Người xem chính là khách cá nhân, cặp đôi và gia đình muốn xem một concept khách sạn, so sánh phòng và thử tính giá. Người đánh giá là giảng viên cần kiểm tra từ yêu cầu đến mã nguồn, URL và bằng chứng.

Sản phẩm là website tĩnh HTML5/CSS3; JavaScript dùng cho tương tác phía khách. Hạng phòng, giá và dịch vụ là dữ liệu giả định. Không có nghiệp vụ đặt phòng thật hoặc quản trị.

## Tiêu chí chấp nhận

| Mã  | Người xem cần làm gì                    | Điều kiện chấp nhận                                                                    | Cách kiểm tra                                              |
| --- | --------------------------------------- | -------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| R1  | Hiểu khách sạn và đi tới nội dung cần   | 5 trang có tên, điều hướng rõ; liên kết nội bộ tồn tại                                 | T01 và kiểm tra URL                                        |
| R2  | So sánh hạng phòng                      | 3 hạng có giá, diện tích, sức chứa, tiện nghi; bộ lọc cho kết quả đúng                 | T05, T08                                                   |
| R3  | Chọn thời gian và số khách              | Ngày hợp lệ, trả sau nhận, sức chứa không vượt mức; chuyển tham số đúng                | T03, T04, T06, T07, T14, T15                               |
| R4  | Ước lượng chi phí                       | 1 phòng × số đêm × đơn giá; 2 đêm Deluxe = 2.500.000 ₫                                 | T02, T09                                                   |
| R5  | Gửi thử dữ liệu hợp lệ                  | Trường bắt buộc, email, điện thoại và đồng ý được kiểm tra; trạng thái ghi rõ mô phỏng | T09–T12                                                    |
| R6  | Sử dụng ở màn hình hẹp và bằng bàn phím | Bố cục một cột, menu thu gọn, nhãn và focus rõ, không tràn ngang                       | T01/T13 kiểm tra DOM; phần bố cục/focus thật chưa kiểm tra |
| R7  | Mở URL công khai khớp mã nộp            | Pages phục vụ 5 trang và tài nguyên đúng byte của bản nguồn                            | Script xác minh, kết quả triển khai và tag Git             |
| R8  | Kiểm tra hồ sơ bàn giao                 | Có yêu cầu, thiết kế, kiểm thử, báo cáo, README, AI_LOG, nguồn, demo và phiên bản      | Danh mục tài liệu trong README                             |

## Đối chiếu rubric

| Mã   | Nội dung                        | Tỷ trọng | Sản phẩm/minh chứng                                    | Trạng thái hoặc giới hạn                         |
| ---- | ------------------------------- | -------- | ------------------------------------------------------ | ------------------------------------------------ |
| TC1a | Yêu cầu và tiêu chí thiết kế    | 10%      | R1–R8 tại tài liệu này                                 | Đã lập                                           |
| TC1b | Đánh giá phương án giao diện    | 5%       | `THIET_KE.md`, so sánh 2 phương án                     | Đã phân tích; chưa có đánh giá người dùng        |
| TC2a | Giao diện responsive            | 10%      | Wireframe rộng/hẹp, media query CSS                    | Có thiết kế và mã; chưa xác minh trực quan       |
| TC2b | Thành phần, tổ chức mã          | 10%      | Cây thư mục, bản đồ trang, HTML/CSS/JS tách biệt       | Đã có                                            |
| TC3a | Phát triển HTML5/CSS3           | 15%      | 5 trang và tài nguyên; T01–T15                         | Kiểm thử DOM; chưa chứng nhận W3C                |
| TC3b | Triển khai và phiên bản         | 10%      | `TRIEN_KHAI.md`, Pages, tag và manifest                | Xem bằng chứng triển khai và GitHub              |
| TC4a | Đánh giá giao diện, hiệu chỉnh  | 10%      | `KIEM_THU.md`, tiêu chí khả dụng và lỗi pattern        | Đã đánh giá mã/DOM; phần trực quan còn mở        |
| TC4b | Kiểm thử và sửa lỗi             | 10%      | Bộ thử tự động, log thực chạy, tái hiện lỗi và thử lại | Xem log; không suy ra đã thử trên thiết bị thật  |
| TC5  | Báo cáo và bàn giao             | 10%      | Báo cáo, README, ghi chú phiên bản, nguồn              | Đã có bản Markdown; thông tin sinh viên chưa có  |
| TC6a | Phản biện giao diện             | 2%       | `DEMO.md`, lý do và đánh đổi                           | Đã chuẩn bị; chưa trình bày trực tiếp            |
| TC6b | Demo, xử lý lỗi triển khai      | 3%       | URL và kịch bản demo/xử lý 404                         | Đã chuẩn bị; chưa thực hiện trước giảng viên     |
| TC7  | Quy cách, khai báo, trách nhiệm | 5%       | AI_LOG, nguồn, các giới hạn ghi rõ                     | Chờ xác nhận thông tin sinh viên và quy định LMS |

Không chuyển trạng thái “chưa kiểm tra” thành “đạt” chỉ vì đã có mã nguồn hoặc wireframe. Không tự đánh điểm số khi chưa có BM13 và đánh giá của giảng viên.
