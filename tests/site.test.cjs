const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { JSDOM } = require("jsdom");
const root = path.resolve(__dirname, "..");
const pages = [
  "index.html",
  "phong.html",
  "dich-vu.html",
  "lien-he.html",
  "chinh-sach.html",
];
function use(file, query, fn) {
  const dom = new JSDOM(fs.readFileSync(path.join(root, file), "utf8"), {
    url: "https://geinjr.github.io/BTL_Web/" + file + query,
    runScripts: "outside-only",
  });
  const w = dom.window;
  // jsdom không vẽ layout. Giả lập dialog chỉ để thử logic sự kiện,
  // không phải kiểm thử hiển thị, focus hoặc bàn phím của dialog native.
  w.HTMLDialogElement.prototype.showModal = function () {
    this.open = true;
  };
  w.HTMLDialogElement.prototype.close = function () {
    this.open = false;
  };
  for (const file of ["data.js", "app.js"])
    w.eval(fs.readFileSync(path.join(root, "assets/js", file), "utf8"));
  try {
    fn(w, w.document);
  } finally {
    w.close();
  }
}
const submit = (w, f) =>
  f.dispatchEvent(new w.Event("submit", { bubbles: true, cancelable: true }));
const field = (f, name) => f.elements.namedItem(name);
function fill(f) {
  field(f, "name").value = "Khách kiểm thử";
  field(f, "email").value = "demo@example.com";
  field(f, "phone").value = "0901234567";
  f.querySelector("[type=checkbox]").checked = true;
}
test("T01: 5 trang nạp mã, heading, nhãn form và liên kết nội bộ hợp lệ", () => {
  for (const file of pages)
    use(file, "", (w, d) => {
      assert.equal(d.documentElement.lang, "vi");
      assert.equal(d.querySelectorAll("main").length, 1);
      assert.equal(d.querySelectorAll("h1").length, 1);
      const ids = [...d.querySelectorAll("[id]")].map((e) => e.id);
      assert.equal(ids.length, new Set(ids).size);
      for (const el of d.querySelectorAll(
        "a[href],script[src],link[href],img[src]",
      )) {
        const value = el.getAttribute("href") || el.getAttribute("src");
        if (/^(https?:|mailto:|tel:|data:)/.test(value)) continue;
        const [pathname, hash] = value.split("#");
        assert.ok(
          fs.existsSync(path.resolve(root, pathname || file)),
          `${file}: ${value}`,
        );
        if (hash && (!pathname || pathname === file))
          assert.ok(d.getElementById(hash));
      }
      for (const img of d.querySelectorAll("img")) assert.ok(img.alt.trim());
      for (const control of d.querySelectorAll("input,select,textarea"))
        assert.ok(control.labels.length > 0, control.id);
      for (const input of d.querySelectorAll("[pattern]"))
        assert.doesNotThrow(() => new RegExp(input.pattern, "v"));
      assert.ok(w.Gein);
    });
});
test("T02: Giá 2 đêm Deluxe và phép tính qua tháng, năm nhuận", () =>
  use("index.html", "", (w) => {
    const q = w.Gein.quote(
      "deluxe",
      "2028-02-28",
      "2028-03-01",
      2,
      "2028-01-01",
    );
    assert.equal(q.nights, 2);
    assert.equal(q.total, 2500000);
    assert.equal(
      w.Gein.quote("family", "2028-12-31", "2029-01-02", 4, "2028-01-01").total,
      5300000,
    );
  }));
test("T03: Từ chối ngày quá khứ, ngày sai và trả trước hoặc cùng ngày", () =>
  use("index.html", "", (w) => {
    for (const [a, b] of [
      ["2026-01-01", "2026-01-02"],
      ["2028-02-30", "2028-03-02"],
      ["2028-03-02", "2028-03-02"],
      ["2028-03-02", "2028-03-01"],
      ["", "2028-03-02"],
    ])
      assert.ok(w.Gein.quote("deluxe", a, b, 2, "2026-11-16").error);
  }));
test("T04: Từ chối quá sức chứa, khách không hợp lệ và hạng phòng lạ", () =>
  use("index.html", "", (w) => {
    for (const n of [0, 3, 4, 1.5, "x"])
      assert.ok(
        w.Gein.quote("deluxe", "2028-03-01", "2028-03-02", n, "2026-11-16")
          .error,
      );
    assert.ok(
      w.Gein.quote("unknown", "2028-03-01", "2028-03-02", 1, "2026-11-16")
        .error,
    );
  }));
test("T05: Bộ lọc hai người, gia đình và tất cả", () =>
  use("phong.html", "", (w, d) => {
    const visible = () =>
      [...d.querySelectorAll("#room-list .room-card")].filter((x) => !x.hidden)
        .length;
    assert.equal(visible(), 3);
    d.querySelector("[data-filter=couple]").click();
    assert.equal(visible(), 2);
    d.querySelector("[data-filter=family]").click();
    assert.equal(visible(), 1);
    d.querySelector("[data-filter=all]").click();
    assert.equal(visible(), 3);
  }));
test("T06: Tìm cho 4 khách chỉ hiện Family, chuyển đúng ngày và số khách", () =>
  use(
    "phong.html",
    "?guests=4&checkin=2028-03-01&checkout=2028-03-03",
    (w, d) => {
      const visible = [...d.querySelectorAll("#room-list .room-card")].filter(
        (x) => !x.hidden,
      );
      assert.equal(visible.length, 1);
      assert.equal(visible[0].dataset.category, "family");
      d.querySelector("[data-book]").click();
      assert.equal(d.querySelector("#book-room").value, "family");
      assert.equal(d.querySelector("#book-guests").value, "4");
      assert.equal(d.querySelector("#book-in").value, "2028-03-01");
    },
  ));
test("T07: URL sai được bỏ qua; không chèn script từ query", () =>
  use("phong.html", "?guests=%3Cscript%3E&checkin=oops", (w, d) => {
    d.querySelector("[data-book]").click();
    assert.equal(d.querySelector("#book-guests").value, "2");
    assert.ok(!d.querySelector("#result-count script"));
  }));
test("T08: Chi tiết và nút chọn đúng hạng phòng", () =>
  use("phong.html", "", (w, d) => {
    d.querySelector("[data-detail=premier]").click();
    assert.ok(d.querySelector("#detail-dialog").open);
    assert.equal(
      d.querySelector("#detail-title").textContent,
      "Premier Balcony",
    );
    d.querySelector("#detail-book").click();
    assert.ok(!d.querySelector("#detail-dialog").open);
    assert.ok(d.querySelector("#booking-dialog").open);
    assert.equal(d.querySelector("#book-room").value, "premier");
  }));
test("T09: Xác nhận mẫu đúng giá, họ tên không thành HTML, không dùng localStorage", () =>
  use("phong.html", "", (w, d) => {
    d.querySelector("[data-book]").click();
    const f = d.querySelector("#booking-form");
    fill(f);
    field(f, "name").value = "<img src=x onerror=alert(1)>";
    field(f, "checkin").value = "2028-03-01";
    field(f, "checkout").value = "2028-03-03";
    assert.ok(f.checkValidity());
    submit(w, f);
    const status = d.querySelector("#booking-status");
    assert.ok(status.classList.contains("success"));
    assert.match(status.textContent, /2\.500\.000/);
    assert.equal(status.querySelectorAll("img").length, 0);
    assert.equal(w.localStorage.length, 0);
  }));
test("T10: Chặn họ tên khoảng trắng và số điện thoại thiếu chữ số", () =>
  use("index.html", "", (w, d) => {
    d.querySelector("[data-book]").click();
    const f = d.querySelector("#booking-form");
    fill(f);
    field(f, "name").value = "   ";
    submit(w, f);
    assert.ok(d.querySelector("#booking-status").classList.contains("error"));
    field(f, "name").value = "Khách mẫu";
    field(f, "phone").value = "123      ";
    submit(w, f);
    assert.ok(d.querySelector("#booking-status").classList.contains("error"));
  }));
test("T11: HTML5 ràng buộc trường bắt buộc, email và đồng ý", () =>
  use("lien-he.html", "", (w, d) => {
    const f = d.querySelector("#contact-form");
    assert.ok(!f.checkValidity());
    field(f, "name").value = "Khách mẫu";
    field(f, "email").value = "not-an-email";
    field(f, "message").value = "Tôi muốn hỏi thông tin phòng.";
    f.querySelector("[type=checkbox]").checked = true;
    assert.ok(!f.checkValidity());
    field(f, "email").value = "demo@example.com";
    assert.ok(f.checkValidity());
    f.querySelector("[type=checkbox]").checked = false;
    assert.ok(!f.checkValidity());
  }));
test("T12: Liên hệ hợp lệ thành công; lời nhắn khoảng trắng bị chặn", () =>
  use("lien-he.html", "", (w, d) => {
    const f = d.querySelector("#contact-form");
    field(f, "name").value = "Khách mẫu";
    field(f, "email").value = "demo@example.com";
    field(f, "message").value = "             ";
    submit(w, f);
    assert.ok(d.querySelector("#contact-status").classList.contains("error"));
    field(f, "message").value = "Cho tôi hỏi về hạng phòng gia đình.";
    f.querySelector("[type=checkbox]").checked = true;
    submit(w, f);
    assert.ok(d.querySelector("#contact-status").classList.contains("success"));
    assert.equal(w.localStorage.length, 0);
  }));
test("T13: Menu mở đóng và Escape cập nhật trạng thái ARIA", () =>
  use("index.html", "", (w, d) => {
    const menu = d.querySelector(".menu-toggle");
    menu.click();
    assert.equal(menu.getAttribute("aria-expanded"), "true");
    assert.ok(d.querySelector("#site-nav").classList.contains("open"));
    d.dispatchEvent(new w.KeyboardEvent("keydown", { key: "Escape" }));
    assert.equal(menu.getAttribute("aria-expanded"), "false");
    assert.ok(!d.querySelector("#site-nav").classList.contains("open"));
  }));
test("T14: Đổi ngày nhận tự điều chỉnh ngày trả tối thiểu", () =>
  use("index.html", "", (w, d) => {
    const input = d.querySelector("#checkin"),
      out = d.querySelector("#checkout");
    input.value = "2028-04-30";
    input.dispatchEvent(new w.Event("change"));
    assert.equal(out.value, "2028-05-01");
    assert.equal(out.min, "2028-05-01");
  }));
test("T15: Tìm phòng chặn ngày sai và cho phép khoảng ngày hợp lệ", () =>
  use("index.html", "", (w, d) => {
    const f = d.querySelector("#search-form");
    d.querySelector("#checkin").value = "2028-03-03";
    d.querySelector("#checkout").value = "2028-03-02";
    let e = new w.Event("submit", { cancelable: true });
    f.dispatchEvent(e);
    assert.ok(e.defaultPrevented);
    d.querySelector("#checkout").value = "2028-03-05";
    d.querySelector("#checkout").dispatchEvent(new w.Event("change"));
    e = new w.Event("submit", { cancelable: true });
    f.dispatchEvent(e);
    assert.ok(!e.defaultPrevented);
  }));
test("T16: Tái hiện lỗi pattern điện thoại cũ, pattern mới biên dịch thành công", () =>
  use("index.html", "", (w, d) => {
    assert.throws(() => new RegExp("[+0-9 ()-]{9,18}", "v"), SyntaxError);
    const pattern = d.querySelector("#book-phone").pattern;
    assert.doesNotThrow(() => new RegExp(pattern, "v"));
    const regex = new RegExp("^(?:" + pattern + ")$", "v");
    assert.ok(regex.test("090 123 4567"));
    assert.ok(!regex.test("abc123xyz"));
  }));
