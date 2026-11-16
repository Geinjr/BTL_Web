# Kiểm thử và hiệu chỉnh

## Phạm vi và môi trường

Ngày thực hiện: 16/11/2026. Thử bằng Node.js và jsdom trên Windows. Phiên bản chính xác, lệnh chạy và đầu ra thực tế được lưu trong [log](minh-chung/kiem-thu.txt). Dữ liệu dùng `demo@example.com`, không có khách hàng thật.

Chạy lại bằng `npm ci` và `npm run check`. Bộ thử nạp HTML và thực thi `data.js`, `app.js` trong DOM riêng cho mỗi trường hợp. Không tải phông, không vẽ CSS và không chạy browser engine. `dialog.showModal`/`close` được giả lập để thử luồng sự kiện, không đánh giá focus trap hoặc Escape của dialog thật.

## Kết quả chức năng

| Mã  | Yêu cầu    | Bước thử                                                   | Mong đợi                                                        | Thực tế                                 |
| --- | ---------- | ---------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------- |
| T01 | R1, R5, R6 | Nạp 5 trang; kiểm heading, ID, link, label, alt và pattern | Không lỗi, không link nội bộ bị thiếu                           | Đạt trong DOM                           |
| T02 | R4         | Deluxe 28/02–01/03/2028; Family qua năm mới                | 2 đêm, lần lượt 2.500.000 và 5.300.000 ₫                        | Đạt                                     |
| T03 | R3         | Ngày quá khứ, 30/02, thiếu ngày, ngày trả ≤ nhận           | Bị từ chối                                                      | Đạt                                     |
| T04 | R3         | Deluxe 3/4 khách, 0 khách, số thập phân, phòng lạ          | Bị từ chối                                                      | Đạt                                     |
| T05 | R2         | Bấm tất cả → hai người → gia đình → tất cả                 | 3 → 2 → 1 → 3 thẻ                                               | Đạt                                     |
| T06 | R3         | Mở URL tìm 4 khách, ngày hợp lệ; mở đặt phòng              | Chỉ Family, chuyển đúng ngày và số khách                        | Đạt                                     |
| T07 | R3, R5     | Tham số URL sai chứa thẻ script và ngày không hợp lệ       | Dùng mặc định, không chèn script                                | Đạt                                     |
| T08 | R2         | Mở Premier, bấm chọn phòng này                             | Chuyển đúng Premier vào đặt phòng                               | Đạt trong dialog giả lập                |
| T09 | R4, R5     | Đặt Deluxe 2 đêm, họ tên chứa chuỗi HTML                   | Tổng đúng, phản hồi mẫu, không tạo thẻ HTML, localStorage trống | Đạt                                     |
| T10 | R5         | Họ tên chỉ khoảng trắng; điện thoại thiếu chữ số           | Lỗi văn bản                                                     | Đạt                                     |
| T11 | R5         | Form rỗng, email sai, chưa đồng ý, sau đó hợp lệ           | Constraint validation trả đúng trạng thái                       | Đạt trong jsdom                         |
| T12 | R5         | Liên hệ với lời nhắn khoảng trắng, rồi lời nhắn hợp lệ     | Lỗi trước, xác nhận mô phỏng sau                                | Đạt                                     |
| T13 | R6         | Bấm nút menu và phím Escape                                | aria-expanded/class đóng mở đúng                                | Đạt logic, chưa kiểm tra hình thức menu |
| T14 | R3         | Đổi ngày nhận thành 30/04/2028                             | Ngày trả và min tự thành 01/05/2028                             | Đạt                                     |
| T15 | R3         | Submit tìm phòng với ngày trả trước, rồi ngày hợp lệ       | Chặn trường hợp đầu, cho phép trường hợp sau                    | Đạt                                     |
| T16 | R5         | Tái hiện pattern cũ, đối chiếu pattern hiện tại            | Cũ lỗi cú pháp `v`, mới hợp lệ                                  | Xem log chạy thực tế                    |

Các kết quả “đạt” trong bảng chỉ áp dụng phạm vi DOM/logic đã mô tả. Nguồn kiểm chứng: `tests/site.test.cjs` và log thực chạy, không phải ảnh minh họa.

## Lỗi thực tế và thử lại

**Pattern số điện thoại.** Bản đầu dùng `[+0-9 ()-]{9,18}`. Dấu ngoặc và gạch nối trong character class không được escape theo chế độ `v`, gây lỗi cú pháp khi biên dịch bằng `new RegExp(pattern, 'v')`. Trình duyệt hiện đại có thể bỏ qua ràng buộc pattern không hợp lệ. Sửa trong cả 5 trang thành `[+0-9 ]{9,18}`; ô hướng dẫn nhập chỉ dùng dấu cộng, chữ số và khoảng trắng. T16 tái hiện lỗi cũ rồi biên dịch pattern mới, T01 kiểm tra tất cả pattern, T09/T10 kiểm tra trường hợp hợp lệ và thiếu chữ số. Đây là kiểm tra cú pháp tương thích, chưa phải bằng chứng chạy trên Chrome thật.

**Trường họ tên của form.** Trước đó mã từng dùng `form.name` trong quá trình phát triển; thuộc tính này trùng với thuộc tính đặt tên của HTMLFormElement. Hiện tất cả các trường form đều được truy cập qua `form.elements.namedItem(...)`. T09, T10 và T12 chạy lại thao tác xác nhận và kiểm tra họ tên. Không có log baseline trước khi sửa lỗi này, nên không khai đã chạy một phép thử đỏ ở phiên bản cũ.

**Liên kết kiểm tra.** `package.json` từng trỏ tới `scripts/check.cjs` khi tệp chưa tồn tại; sau lần dọn đã sửa thành kiểm cú pháp. Bản bàn giao hiện có script kiểm tra thật và chạy cả bộ thử. README và lệnh triển khai thống nhất với script hiện tại.

## Kiểm tra còn mở

| Mã  | Cách thử thực tế cần làm                          | Mong đợi                                             | Trạng thái                        |
| --- | ------------------------------------------------- | ---------------------------------------------------- | --------------------------------- |
| M01 | Chrome/Edge, 1440×900, mở toàn bộ 5 trang         | Không tràn/che chữ, ảnh đủ, menu rõ                  | Chưa kiểm tra trực quan           |
| M02 | DevTools responsive 390×844 và 360×800            | Một cột, không cuộn ngang, nút dễ bấm                | Chưa kiểm tra trực quan           |
| M03 | Dùng Tab, Shift+Tab, Escape mở/đóng dialog        | Focus rõ, ở đúng hộp thoại và trả về nút mở          | Chưa kiểm tra browser native      |
| M04 | Nhấn vào form thiếu dữ liệu trong browser         | Thông báo lỗi hữu ích, không điều hướng ngoài ý muốn | Chưa kiểm tra browser native      |
| M05 | Tắt mạng sau khi tải hoặc mở bản local            | Ảnh local có sẵn, font hệ thống dự phòng             | Chưa thử chế độ offline thực tế   |
| M06 | Công cụ HTML validator, Lighthouse, screen reader | Ghi phát hiện và điều chỉnh nếu có                   | Chưa kiểm tra, không công bố điểm |

Lý do chưa thực hiện: công cụ truy cập browser trả về `The browser access host is unavailable`. Không thay các ảnh wireframe thành ảnh chụp kiểm thử.

## URL và phiên bản

Sau xuất bản, dùng `node scripts/verify-site.cjs https://geinjr.github.io/BTL_Web/` để tải 5 trang và tài nguyên trong manifest, so sánh byte SHA-256 với mã nguồn. Kết quả ở `minh-chung/trien-khai.json` nếu đã chạy thành công. Kiểm tra HTTP và mã băm xác nhận bản được phục vụ; không xác nhận bố cục hoặc khả dụng.
