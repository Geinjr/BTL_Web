# Triển khai và xác minh phiên bản

Repository đích do người dùng chỉ định: https://github.com/Geinjr/BTL_Web. Website mong đợi: https://geinjr.github.io/BTL_Web/.

## Cấu hình

Website dùng GitHub Pages, nhánh `main`, thư mục gốc `/`. `.nojekyll` giữ dạng website tĩnh, không cần Jekyll hoặc chạy npm trên máy chủ. Tất cả đường dẫn trang, CSS, JS và ảnh đều tương đối để chạy được dưới `/BTL_Web/`.

Theo [GitHub Docs](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site), nguồn Pages có thể là một nhánh và thư mục gốc. Cần có quyền quản trị repository để đặt cấu hình. Trong Settings → Pages chọn “Deploy from a branch”, `main`, `/ (root)`.

## Quy trình cập nhật

1. Chỉnh sửa mã, chạy `npm ci` khi chưa có thư viện và `npm run check`.
2. Xem các thay đổi bằng `git diff`; không thêm token, tệp tạm hoặc dữ liệu khách.
3. Tạo lại manifest tài nguyên bằng `node scripts/verify-site.cjs --manifest` khi thay đổi website.
4. Commit và push lên `main`; không dùng force push.
5. Chờ build Pages thành công và lấy commit được build bằng `gh api repos/Geinjr/BTL_Web/pages/builds/latest`.
6. Chạy `node scripts/verify-site.cjs https://geinjr.github.io/BTL_Web/` để so sánh byte website với bản nguồn.
7. Khi chốt phiên bản, dùng tag `v1.0.0` để liên kết hồ sơ với commit. Nếu thay đổi sau bàn giao, tạo phiên bản mới và kiểm tra lại.

## Minh chứng phiên bản

- `minh-chung/manifest.json`: SHA-256 của 5 trang và toàn bộ tài nguyên website tại thời điểm chốt mã.
- `minh-chung/trien-khai.json`: kết quả tải công khai/so sánh hash thực tế, có thời gian chạy.
- Tab Actions hoặc API Pages builds trên GitHub: trạng thái triển khai và SHA commit.
- Tag `v1.0.0`: commit bàn giao cuối cùng. Có thể có một commit bổ sung hồ sơ minh chứng sau lần đo đầu; nếu mã website không đổi, các hash website vẫn phải giữ nguyên. Không dùng SHA của bản trước để tuyên bố đã xác minh commit sau.

Manifest nhận diện nội dung website. Để kiểm tra commit cuối, đối chiếu SHA bản build Pages với `git rev-parse HEAD` và `git rev-list -n 1 v1.0.0`; sau đó chạy xác minh hash tại cùng checkout. Log triển khai không bao gồm chính nó trong hash để tránh tham chiếu vòng.

## Xử lý sự cố demo

| Hiện tượng         | Kiểm tra                                           | Cách xử lý                                                        |
| ------------------ | -------------------------------------------------- | ----------------------------------------------------------------- |
| 404 toàn website   | Settings Pages, nhánh và trạng thái build          | Chọn `main` + root; chờ build thành công                          |
| 404 ảnh/CSS        | Phân biệt hoa thường và đường dẫn dưới `/BTL_Web/` | Giữ đúng tên tệp, dùng đường dẫn tương đối                        |
| URL có nội dung cũ | So sánh SHA build, refresh, chạy script hash       | Chờ build mới, tải lại bỏ cache; không ghi đạt khi hash lệch      |
| GitHub API trả 401 | `gh auth status`                                   | Chủ tài khoản đăng nhập lại; không gửi token qua chat hoặc commit |
| Hash không khớp    | So sánh checkout hiện tại với commit Pages         | Dùng đúng checkout/tag hoặc triển khai lại rồi xác minh           |

Chạy local bằng `npm start` để demo dự phòng khi mất mạng; ghi rõ đang dùng local và chưa xác minh URL ở thời điểm đó. Không dùng bản local để tuyên bố GitHub Pages đã hoạt động.
