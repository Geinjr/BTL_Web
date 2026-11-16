// Đối chiếu byte tài nguyên website; không kiểm tra layout hoặc tự động hóa browser.
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const root = path.resolve(__dirname, "..");
const dir = path.join(root, "docs/minh-chung");
fs.mkdirSync(dir, { recursive: true });
const digest = (data) => crypto.createHash("sha256").update(data).digest("hex");
function walk(dir) {
  return fs
    .readdirSync(path.join(root, dir), { withFileTypes: true })
    .flatMap((e) =>
      e.isDirectory() ? walk(dir + "/" + e.name) : [dir + "/" + e.name],
    );
}
const files = [
  "index.html",
  "phong.html",
  "dich-vu.html",
  "lien-he.html",
  "chinh-sach.html",
  ...walk("assets"),
].sort();
async function main() {
  const arg = process.argv[2];
  const manifestFile = path.join(dir, "manifest.json");
  if (arg === "--manifest") {
    const manifest = {
      version: "1.0.0",
      description:
        "SHA-256 của trang và tài nguyên website; không bao gồm hồ sơ để tránh tham chiếu vòng",
      files: files.map((file) => ({
        path: file,
        sha256: digest(fs.readFileSync(path.join(root, file))),
      })),
    };
    fs.writeFileSync(manifestFile, JSON.stringify(manifest, null, 2) + "\n");
    console.log(`Manifest: ${manifest.files.length} tệp.`);
    return;
  }
  if (!arg) throw new Error("Dùng --manifest hoặc URL gốc của website.");
  const base = new URL(arg);
  if (base.protocol !== "https:" && base.hostname !== "127.0.0.1")
    throw new Error("Yêu cầu HTTPS cho website công khai.");
  if (!base.pathname.endsWith("/")) base.pathname += "/";
  const manifest = JSON.parse(fs.readFileSync(manifestFile, "utf8"));
  const expectedPaths = manifest.files.map((x) => x.path).sort();
  if (JSON.stringify(expectedPaths) !== JSON.stringify(files))
    throw new Error("Danh sách tệp thay đổi. Cần tạo lại manifest.");
  const result = {
    checkedAt: new Date().toISOString(),
    baseUrl: base.href,
    version: manifest.version,
    scope: "HTTP và SHA-256; không kiểm tra browser/layout",
    results: [],
  };
  for (const item of manifest.files) {
    const local = digest(fs.readFileSync(path.join(root, item.path)));
    if (local !== item.sha256)
      throw new Error(`Mã local khác manifest: ${item.path}`);
    const response = await fetch(new URL(item.path, base), {
      signal: AbortSignal.timeout(30000),
      headers: { "Cache-Control": "no-cache" },
    });
    const remote = digest(Buffer.from(await response.arrayBuffer()));
    const passed = response.ok && remote === item.sha256;
    result.results.push({
      path: item.path,
      status: response.status,
      expectedSha256: item.sha256,
      actualSha256: remote,
      passed,
    });
    console.log(`${passed ? "PASS" : "FAIL"} ${response.status} ${item.path}`);
  }
  result.passed = result.results.every((x) => x.passed);
  fs.writeFileSync(
    path.join(dir, "trien-khai.json"),
    JSON.stringify(result, null, 2) + "\n",
  );
  if (!result.passed) process.exitCode = 1;
}
main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
