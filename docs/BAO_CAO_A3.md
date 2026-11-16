# Báo cáo bài tập lớn A3 — Website khách sạn Gein Hotel

**Trường Đại học Đại Nam** · Học phần FIT4014 — Thiết kế web và triển khai hệ thống phần mềm. GVGD: ThS. Lê Thái Bảo.

| Thông tin                | Giá trị                                          |
| ------------------------ | ------------------------------------------------ |
| Chủ đề                   | Website khách sạn Gein Hotel                     |
| Tài khoản bàn giao       | Geinjr                                           |
| Họ tên, mã SV, lớp/ngành | Đỗ Trung Kiên · Mã SV: chưa cung cấp · CNTT17-13 |
| Học kỳ/năm học           | Học kỳ 1 · Năm học 2026–2027 |
| Repository               | https://github.com/Geinjr/BTL_Web                |
| Website                  | https://geinjr.github.io/BTL_Web/                |
| Phiên bản                | Tag bàn giao `v1.0.0`; kiểm tra SHA trong GitHub |

## Lời khai báo

Sản phẩm được xây dựng với hỗ trợ của OpenAI Codex. Người dùng chọn đề tài, tên Gein Hotel, yêu cầu dọn mã nguồn và chỉ định kho GitHub. AI hỗ trợ phân tích, viết mã và tài liệu, kiểm thử và triển khai. Chưa có xác nhận phần mã sinh viên tự viết; người nộp cần khai báo phần việc cá nhân theo thực tế. Xem [AI_LOG](../AI_LOG.md) và [nguồn tài nguyên](NGUON_TAI_NGUYEN.md). Không khai kiểm thử trình duyệt, video hoặc demo trước giảng viên khi chưa thực hiện.

## Tóm tắt

Gein Hotel là concept website khách sạn phục vụ người xem muốn tìm hiểu không gian, so sánh hạng phòng, ước tính chi phí và đọc chính sách. Sản phẩm gồm 5 trang HTML5/CSS3 với JavaScript thuần cho bộ lọc, hộp thoại và kiểm tra biểu mẫu. Bản tĩnh được chuẩn bị cho GitHub Pages. Bộ thử DOM xác minh chức năng và ràng buộc dữ liệu; script mã băm dùng để đối chiếu URL với mã nguồn. Đặt phòng, liên hệ, giá và tiện nghi là mô phỏng; chưa có backend, tồn phòng hoặc thanh toán. Phần kiểm tra trực quan responsive vẫn cần thực hiện trên browser thật.

## Mục lục

1. Chủ đề, yêu cầu và tiêu chí thiết kế
2. Thiết kế giao diện và cấu trúc mã nguồn
3. Phát triển và triển khai
4. Đánh giá, kiểm thử và hiệu chỉnh
5. Tài liệu bàn giao
6. Demo và phản biện
7. Quy cách, nguồn và trách nhiệm
8. Phụ lục minh chứng

## 1. Chủ đề, yêu cầu và tiêu chí thiết kế

Chọn chủ đề khách sạn vì có các tác vụ quan sát được: xem phòng, so sánh giá, chọn ngày/sức chứa và đọc quy định lưu trú. Người xem chính là khách đi đôi và gia đình; giảng viên có thể kiểm chứng theo các tác vụ này. Ràng buộc là website tĩnh HTML5/CSS3, triển khai công khai và có hồ sơ bằng chứng.

[Yêu cầu R1–R8 và tiêu chí chấp nhận](YEU_CAU_VA_RUBRIC.md) ghi rõ hành vi, phép thử và giới hạn. Mục tiêu R4 có ví dụ định lượng: Deluxe 2 đêm = 2.500.000 ₫. R7 yêu cầu tải đủ 5 trang/tài nguyên và khớp mã băm. R6 yêu cầu kiểm tra responsive trực quan nhưng hiện chưa đủ bằng chứng để ghi đạt.

Đã so sánh phương án một trang dài với nhiều trang theo tiêu chí tìm bảng giá, độ dài nội dung, bảo trì và triển khai. Chọn nhiều trang để chia tác vụ, chấp nhận lặp khung menu. Chi tiết tại [Thiết kế](THIET_KE.md).

## 2. Thiết kế giao diện và cấu trúc mã nguồn

Wireframe rộng/hẹp được cung cấp tại [sơ đồ SVG](wireframe.svg). Bản rộng có menu ngang, hero, tìm phòng, giới thiệu hai cột và thẻ phòng ba cột. Bản hẹp có menu thu gọn, form và phòng một cột. Màu xanh đậm/kem và nhịp chữ serif/sans-serif tạo hình ảnh nghỉ dưỡng; phông có dự phòng hệ thống.

HTML dùng cấu trúc ngữ nghĩa; CSS Grid/Flexbox có breakpoint 1000px và 760px; mỗi biểu mẫu có nhãn; menu có ARIA; có focus-visible, skip link và reduced motion. Thư mục `assets` tách CSS, JavaScript và ảnh. `docs` chứa hồ sơ, `tests` và `scripts` chứa mã kiểm thử/phát triển. Xem cây tệp tại [README](../README.md).

## 3. Phát triển và triển khai

Năm trang: trang chủ, phòng nghỉ, trải nghiệm, liên hệ/FAQ và chính sách. JavaScript xử lý dữ liệu 3 hạng, lọc sức chứa, xem chi tiết, tính số đêm bằng ngày UTC, ràng buộc dữ liệu và phản hồi mô phỏng. Không dùng localStorage hoặc yêu cầu mạng để gửi biểu mẫu. Nội dung từ người dùng được chèn bằng `textContent`.

Giá minh họa: Deluxe 1.250.000 ₫/đêm cho tối đa 2 khách; Premier 1.850.000 ₫/đêm cho 2 khách; Family 2.650.000 ₫/đêm cho 4 khách. Trẻ em tính vào tổng khách, mỗi phép tính cho một phòng; thuế và bữa sáng đã gồm trong giá, không có phụ thu.

Đã triển khai tại URL nêu ở đầu báo cáo bằng nhánh `main`, root, `.nojekyll`. Lần kiểm tra công khai đầu tiên xác nhận 15/15 tệp (5 trang và 10 tài nguyên) trả HTTP 200 và khớp SHA-256; xem [minh chứng](minh-chung/trien-khai.json) và [build GitHub](minh-chung/pages-build.json). Minh chứng lưu lần đo trước commit bổ sung hồ sơ, có ghi SHA checkout tại thời điểm đo; mã website giữ nguyên và bản chốt cần kiểm tra lại theo hướng dẫn. Quy trình xác minh commit/tag và hash tại [Triển khai](TRIEN_KHAI.md).

## 4. Đánh giá, kiểm thử và hiệu chỉnh

Tiêu chí đánh giá gồm nhất quán điều hướng, đọc bảng giá, phản hồi form, nhãn nhập liệu, responsive và điều hướng bàn phím. Rà soát mã/DOM đã phát hiện và xử lý pattern điện thoại không hợp cú pháp `v`; truy cập trường form được chuẩn hóa qua `elements.namedItem` để tránh trùng thuộc tính của HTMLFormElement.

[Bảng kiểm thử](KIEM_THU.md) mô tả bước thử, mong đợi, kết quả, lỗi và phép thử lại; [log](minh-chung/kiem-thu.txt) là kết quả thực chạy. Bộ thử DOM không vẽ CSS, dialog được giả lập. Chưa có số liệu Lighthouse, chứng nhận validator, kiểm tra screen reader hoặc ảnh responsive thật. Các mục chưa thực hiện được ghi “chưa kiểm tra”.

## 5. Tài liệu bàn giao

[README](../README.md) hướng dẫn mở file trực tiếp, chạy server local và kiểm thử; [CHANGELOG](../CHANGELOG.md) nêu thay đổi và giới hạn; [AI_LOG](../AI_LOG.md) ghi vai trò AI; thư mục `docs` chứa yêu cầu, thiết kế, kiểm thử, nguồn và demo. Ảnh nằm trong mã nguồn để tránh phụ thuộc hotlink. Phông ngoài có font hệ thống dự phòng.

Phiên bản bàn giao dùng tag `v1.0.0`. Manifest và kiểm tra SHA-256 nối mã nguồn với tài nguyên URL. Khi chỉnh sửa nội dung sau này, phải chạy lại kiểm thử/manifest và cập nhật bản triển khai; không dùng log cũ làm bằng chứng cho mã mới.

## 6. Demo và phản biện

[Kịch bản demo](DEMO.md) đi qua URL, lọc 4 khách, so sánh phòng, tính 2 đêm, dữ liệu sai/hợp lệ, responsive và kiểm tra phiên bản. Có câu trả lời về lựa chọn bố cục, HTML/CSS thuần, giới hạn tìm tồn phòng và xử lý sự cố Pages. Chưa thực hiện demo trực tiếp trước giảng viên hoặc quay video.

## 7. Quy cách, nguồn và trách nhiệm

Ảnh tải từ Unsplash; font Google Fonts; nguồn cụ thể và giấy phép được liệt kê tại [Danh mục nguồn](NGUON_TAI_NGUYEN.md). Tên/giá/nội dung là giả định. Không đăng PDF hoặc mẫu báo cáo của giảng viên lên repository công khai. Không công bố token, thông tin khách thật hoặc khai báo sai vai trò AI.

Người nộp cần bổ sung mã sinh viên, xác nhận phần việc cá nhân, kiểm tra quy định đặt tên và hạn nộp LMS, đối chiếu BM13 chính thức. Mẫu báo cáo đã cung cấp tên tiêu chí con nhưng không thay cho mô tả mức đạt trong BM13.

## 8. Phụ lục minh chứng

| Tiêu chí | Minh chứng                                 | Vị trí                                                           |
| -------- | ------------------------------------------ | ---------------------------------------------------------------- |
| TC1a     | R1–R8 và chấp nhận                         | `YEU_CAU_VA_RUBRIC.md`                                           |
| TC1b     | So sánh phương án A/B                      | `THIET_KE.md`                                                    |
| TC2a     | Wireframe rộng/hẹp, CSS responsive         | `wireframe.svg`, `assets/css/style.css`; kiểm trực quan còn mở   |
| TC2b     | Cấu trúc trang, thư mục và thành phần      | `THIET_KE.md`, README                                            |
| TC3a     | 5 trang, logic và bộ thử                   | Các tệp HTML, `assets`, `tests`                                  |
| TC3b     | Pages, tag, manifest và xác minh           | GitHub, `minh-chung/manifest.json`, `minh-chung/trien-khai.json` |
| TC4a     | Đánh giá mã/DOM và các mục chưa kiểm tra   | `KIEM_THU.md`                                                    |
| TC4b     | Tái hiện/sửa pattern, thử lại và log       | `tests/site.test.cjs`, `minh-chung/kiem-thu.txt`                 |
| TC5      | Hồ sơ, cách chạy và release note           | README, báo cáo, CHANGELOG                                       |
| TC6a/b   | Kịch bản, phản biện, tình huống triển khai | `DEMO.md`; phần trình bày thực tế chưa diễn ra                   |
| TC7      | Nguồn, AI và trách nhiệm                   | `NGUON_TAI_NGUYEN.md`, AI_LOG                                    |

### Việc còn cần người nộp xác nhận

- Mã sinh viên (họ tên, lớp và học kỳ/năm học đã được cung cấp).
- Bản BM13 và hướng dẫn LMS; điều chỉnh hồ sơ nếu quy định có yêu cầu cụ thể khác.
- Kiểm tra trực quan desktop/mobile, bàn phím và dialog native; ghi minh chứng thật.
- Đọc hiểu mã, xác nhận phần việc cá nhân và thực hiện demo theo lịch lớp.

Đây là báo cáo kỹ thuật trong repository ở định dạng Markdown theo cấu trúc mẫu. Không giả định nó thay thế biểu mẫu Word nếu LMS yêu cầu nộp đúng DOCX.
