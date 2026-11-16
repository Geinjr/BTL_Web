/* Website tĩnh: không gửi form và không lưu dữ liệu cá nhân. */
(() => {
  "use strict";
  const rooms = globalThis.GEIN_ROOMS;
  const money = (n) => new Intl.NumberFormat("vi-VN").format(n) + " ₫";
  const today = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };
  const parseDay = (value) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value || "")) return NaN;
    const result = Date.parse(value + "T00:00:00Z");
    return Number.isFinite(result) &&
      new Date(result).toISOString().slice(0, 10) === value
      ? result
      : NaN;
  };
  const nextDay = (value) =>
    new Date(parseDay(value) + 86400000).toISOString().slice(0, 10);
  function quote(id, checkin, checkout, guests, minDate = today()) {
    const room = rooms.find((r) => r.id === id),
      start = parseDay(checkin),
      end = parseDay(checkout);
    if (!room) return { error: "Vui lòng chọn hạng phòng hợp lệ." };
    if (!Number.isFinite(start) || !Number.isFinite(end))
      return {
        error: "Vui lòng chọn đầy đủ ngày nhận và ngày trả phòng hợp lệ.",
      };
    if (checkin < minDate)
      return { error: "Ngày nhận phòng không được trước ngày hiện tại." };
    if (end <= start)
      return { error: "Ngày trả phòng phải sau ngày nhận phòng." };
    if (
      !Number.isInteger(Number(guests)) ||
      Number(guests) < 1 ||
      Number(guests) > room.guests
    )
      return {
        error: `${room.name} chỉ phù hợp tối đa ${room.guests} khách. Vui lòng chọn hạng phòng khác.`,
      };
    const nights = (end - start) / 86400000;
    return { nights, total: nights * room.price, room };
  }
  globalThis.Gein = { quote, parseDay, today, nextDay };
  if (typeof document === "undefined") return;
  const $ = (s) => document.querySelector(s);
  const all = (s) => document.querySelectorAll(s);
  const setStatus = (el, message, kind = "") => {
    el.textContent = message;
    el.className = "status full " + kind;
  };
  const menu = $(".menu-toggle");
  menu?.addEventListener("click", () => {
    const open = menu.getAttribute("aria-expanded") !== "true";
    menu.setAttribute("aria-expanded", String(open));
    menu.setAttribute(
      "aria-label",
      open ? "Đóng menu điều hướng" : "Mở menu điều hướng",
    );
    $("#site-nav").classList.toggle("open", open);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu?.getAttribute("aria-expanded") === "true")
      menu.click();
  });
  all("[data-close]").forEach((b) =>
    b.addEventListener("click", () => b.closest("dialog").close()),
  );
  const booking = $("#booking-dialog"),
    form = $("#booking-form");
  function initDates(inEl, outEl) {
    inEl.min = today();
    inEl.value = today();
    outEl.min = nextDay(inEl.value);
    outEl.value = outEl.min;
    inEl.addEventListener("change", () => {
      inEl.setCustomValidity("");
      if (!Number.isFinite(parseDay(inEl.value))) return;
      outEl.min = nextDay(inEl.value);
      if (!outEl.value || outEl.value <= inEl.value) outEl.value = outEl.min;
      outEl.setCustomValidity("");
    });
    outEl.addEventListener("change", () => outEl.setCustomValidity(""));
  }
  initDates($("#book-in"), $("#book-out"));
  const params = new URLSearchParams(location.search);
  const searchGuests = ["1", "2", "3", "4"].includes(params.get("guests"))
    ? params.get("guests")
    : "2";
  let selectedDates = null;
  if (
    Number.isFinite(parseDay(params.get("checkin"))) &&
    Number.isFinite(parseDay(params.get("checkout"))) &&
    params.get("checkin") >= today() &&
    params.get("checkout") > params.get("checkin")
  )
    selectedDates = {
      checkin: params.get("checkin"),
      checkout: params.get("checkout"),
    };
  const total = $("#booking-total"),
    status = $("#booking-status");
  function refreshQuote() {
    const result = quote(
      form.elements.namedItem("room").value,
      form.elements.namedItem("checkin").value,
      form.elements.namedItem("checkout").value,
      form.elements.namedItem("guests").value,
    );
    total.replaceChildren();
    if (result.error) {
      total.textContent = result.error;
      return result;
    }
    total.append(
      document.createTextNode(
        `${result.room.name} · ${result.nights} đêm · ${form.elements.namedItem("guests").value} khách`,
      ),
    );
    const strong = document.createElement("strong");
    strong.textContent = money(result.total);
    total.append(
      strong,
      document.createTextNode(
        "Cho 1 phòng · Đã gồm thuế và bữa sáng · Không thu tiền",
      ),
    );
    return result;
  }
  form.addEventListener("change", () => {
    setStatus(status, "");
    refreshQuote();
  });
  function openBooking(id) {
    const guests = $("#guests")?.value || searchGuests;
    form.elements.namedItem("room").value =
      id || rooms.find((r) => r.guests >= Number(guests)).id;
    form.elements.namedItem("guests").value = guests;
    const inValue = $("#checkin")?.value || selectedDates?.checkin;
    const outValue = $("#checkout")?.value || selectedDates?.checkout;
    if (
      Number.isFinite(parseDay(inValue)) &&
      Number.isFinite(parseDay(outValue)) &&
      inValue >= today() &&
      outValue > inValue
    ) {
      form.elements.namedItem("checkin").value = inValue;
      form.elements.namedItem("checkout").value = outValue;
      form.elements.namedItem("checkout").min = nextDay(inValue);
    }
    setStatus(status, "");
    refreshQuote();
    booking.showModal();
  }
  all("[data-book]").forEach((b) =>
    b.addEventListener("click", () => openBooking(b.dataset.book || undefined)),
  );
  const detail = $("#detail-dialog");
  all("[data-detail]").forEach((button) =>
    button.addEventListener("click", () => {
      const room = rooms.find((r) => r.id === button.dataset.detail);
      $("#detail-title").textContent = room.name;
      // Chỉ dựng HTML từ dữ liệu cố định nội bộ; dữ liệu người dùng dùng textContent.
      $("#detail-body").innerHTML =
        `<img class="detail-photo" src="assets/images/${room.image}" alt="${room.alt}"><p>${room.description}</p><p class="meta">${room.area} m² · ${room.bed} · Tối đa ${room.guests} khách</p><ul>${room.amenities.map((x) => `<li>${x}</li>`).join("")}</ul><div class="detail-actions"><span class="price">${money(room.price)}<small>/ phòng / đêm, đã gồm thuế</small></span><button class="btn" id="detail-book">Chọn phòng này →</button></div>`;
      $("#detail-book").addEventListener("click", () => {
        detail.close();
        openBooking(room.id);
      });
      detail.showModal();
    }),
  );
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const result = refreshQuote();
    if (result.error) {
      setStatus(status, result.error, "error");
      return;
    }
    if (form.elements.namedItem("name").value.trim().length < 2) {
      setStatus(status, "Vui lòng nhập họ tên có ít nhất 2 ký tự.", "error");
      form.elements.namedItem("name").focus();
      return;
    }
    if (form.elements.namedItem("phone").value.replace(/\D/g, "").length < 9) {
      setStatus(status, "Số điện thoại cần có ít nhất 9 chữ số.", "error");
      form.elements.namedItem("phone").focus();
      return;
    }
    setStatus(
      status,
      `Đã hoàn thành đặt phòng MẪU cho ${form.elements.namedItem("name").value.trim()}.\n${result.room.name} · ${form.elements.namedItem("checkin").value} → ${form.elements.namedItem("checkout").value} · ${result.nights} đêm · ${form.elements.namedItem("guests").value} khách.\nTổng dự kiến: ${money(result.total)}. Không có đặt phòng thực tế hoặc thanh toán được tạo.`,
      "success",
    );
  });
  const search = $("#search-form");
  if (search) {
    initDates($("#checkin"), $("#checkout"));
    search.addEventListener("submit", (event) => {
      const result = quote(
        "family",
        search.elements.namedItem("checkin").value,
        search.elements.namedItem("checkout").value,
        search.elements.namedItem("guests").value,
      );
      if (result.error) {
        event.preventDefault();
        search.elements.namedItem("checkout").setCustomValidity(result.error);
        search.elements.namedItem("checkout").reportValidity();
      }
    });
  }
  const cards = [...all("#room-list .room-card")];
  if (cards.length) {
    let active = "all";
    const minGuests = params.has("guests") ? Number(searchGuests) : 1;
    function filter() {
      let count = 0;
      cards.forEach((card) => {
        const show =
          (active === "all" || card.dataset.category === active) &&
          Number(card.dataset.capacity) >= minGuests;
        card.hidden = !show;
        if (show) count++;
      });
      $("#result-count").textContent =
        `${count} hạng phòng phù hợp${params.has("guests") ? " cho " + minGuests + " khách" : ""}${selectedDates ? " · " + selectedDates.checkin + " → " + selectedDates.checkout : ""}. Chưa kiểm tra phòng trống thực tế.`;
    }
    all("[data-filter]").forEach((b) =>
      b.addEventListener("click", () => {
        active = b.dataset.filter;
        all("[data-filter]").forEach((x) =>
          x.setAttribute("aria-pressed", String(x === b)),
        );
        filter();
      }),
    );
    filter();
  }
  $("#contact-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const f = event.currentTarget,
      el = $("#contact-status");
    if (
      f.elements.namedItem("name").value.trim().length < 2 ||
      f.elements.namedItem("message").value.trim().length < 10
    ) {
      setStatus(
        el,
        "Vui lòng nhập họ tên ít nhất 2 ký tự và lời nhắn ít nhất 10 ký tự, không chỉ gồm khoảng trắng.",
        "error",
      );
      return;
    }
    setStatus(
      el,
      `Lời nhắn mẫu của ${f.elements.namedItem("name").value.trim()} đã vượt qua kiểm tra dữ liệu. Đây là bản mô phỏng: nội dung chưa được gửi đến khách sạn và không được lưu lại.`,
      "success",
    );
  });
})();
