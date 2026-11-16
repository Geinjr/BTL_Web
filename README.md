# Gein Hotel

Website khách sạn giả định cho bài tập lớn **FIT4014 A3 – Thiết kế web và triển khai hệ thống phần mềm**, Trường Đại học Đại Nam.

- Website: https://geinjr.github.io/BTL_Web/
- Repository: https://github.com/Geinjr/BTL_Web
- Phiên bản bàn giao: `v1.0.0`. Kiểm tra tag trên GitHub để xác định commit chính xác.
- Sinh viên: **Đỗ Trung Kiên**, lớp **CNTT17-13**, học kỳ **1**, năm học **2026–2027**. Tài khoản GitHub: `Geinjr`. Mã sinh viên chưa cung cấp; cần bổ sung trước khi nộp LMS.

## Sản phẩm

Website dùng HTML5, CSS3 và JavaScript thuần, không có framework hoặc backend. Các trang chạy trực tiếp trên GitHub Pages:

| Trang             | Nội dung                                          |
| ----------------- | ------------------------------------------------- |
| `index.html`      | Giới thiệu, tìm hạng phòng theo ngày và số khách  |
| `phong.html`      | Ba hạng phòng, lọc sức chứa, chi tiết và tính giá |
| `dich-vu.html`    | Bữa sáng, không gian chung, cảnh quan minh họa    |
| `lien-he.html`    | Biểu mẫu liên hệ mẫu và FAQ                       |
| `chinh-sach.html` | Chính sách và giới hạn bản mô phỏng               |

Đặt phòng và liên hệ chỉ là mô phỏng trong trình duyệt. Website không xác nhận tồn phòng, không gửi email, không thanh toán và không lưu dữ liệu cá nhân. Ngày lưu trú chỉ dùng cho phép tính; tìm kiếm lọc theo sức chứa. Mỗi lượt tính cho một phòng.

## Mở và chạy

Cách nhanh: mở `index.html` bằng trình duyệt hoặc dùng Live Server trong VS Code. Không cần cài thư viện để xem website; phông chữ trực tuyến có phông hệ thống dự phòng.

Để dùng máy chủ và bộ kiểm thử, dùng Node.js **24.15.0 trở lên trong nhánh 24** (môi trường đã kiểm thử), hoặc phiên bản đáp ứng `engines` trong `package.json`, rồi chạy:

```sh
npm start
```

Mở http://127.0.0.1:4173. Dừng bằng `Ctrl+C` trong terminal chạy máy chủ.

## Chạy kiểm thử

```sh
npm ci
npm run check
```

`jsdom` chỉ là thư viện phát triển để kiểm thử DOM, không được tải trên website. `npm run check` kiểm tra cú pháp JavaScript và chạy bộ thử trong `tests/site.test.cjs`.

Xem [bảng kiểm thử](docs/KIEM_THU.md) và [log chạy thực tế](docs/minh-chung/kiem-thu.txt). Bộ thử DOM không thay thế việc kiểm tra giao diện trên trình duyệt thật, màn hình nhỏ, focus của hộp thoại hoặc Lighthouse.

## Hồ sơ bàn giao

- [Báo cáo A3](docs/BAO_CAO_A3.md), theo các mục trong mẫu báo cáo học phần.
- [Yêu cầu và đối chiếu rubric](docs/YEU_CAU_VA_RUBRIC.md).
- [Thiết kế và wireframe](docs/THIET_KE.md).
- [Kiểm thử và hiệu chỉnh](docs/KIEM_THU.md).
- [Hướng dẫn triển khai và xác minh phiên bản](docs/TRIEN_KHAI.md).
- [Kịch bản demo và phản biện](docs/DEMO.md).
- [Khai báo AI](AI_LOG.md), [nguồn tài nguyên](docs/NGUON_TAI_NGUYEN.md), [ghi chú phiên bản](CHANGELOG.md).

## Cấu trúc

```text
├── *.html                 Các trang website tĩnh
├── assets/css/style.css   Bố cục, responsive, giao diện in
├── assets/js/data.js      Dữ liệu 3 hạng phòng
├── assets/js/app.js       Các tương tác và phép tính
├── assets/images/         Ảnh tải về, favicon tự tạo
├── scripts/               Chạy máy chủ, kiểm tra, xác minh bản xuất bản
├── tests/                 Kiểm thử chức năng DOM
└── docs/                  Báo cáo, thiết kế và minh chứng
```

Không đưa `node_modules`, cấu hình VS Code, công cụ đọc PDF hay ảnh tạm của PDF vào Git. Tệp mẫu báo cáo và PDF của học phần không được sao chép lên repository công khai.

## Trạng thái trước khi nộp

Đọc mục “Việc còn cần người nộp xác nhận” trong báo cáo. Chưa có BM13 riêng và quy định nộp trên LMS. Không cam kết điểm số hoặc tự khai đã demo, đã kiểm tra trực quan khi chưa thực hiện. Chủ tài khoản cần đọc hiểu mã, bổ sung thông tin sinh viên và tự xác nhận phần việc cá nhân trong khai báo.
