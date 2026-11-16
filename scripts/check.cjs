const { spawnSync } = require("node:child_process");
const path = require("node:path");
process.chdir(path.resolve(__dirname, ".."));
for (const args of [
  ["--check", "assets/js/data.js"],
  ["--check", "assets/js/app.js"],
  ["--check", "scripts/serve.cjs"],
  ["--test", "tests/site.test.cjs"],
]) {
  const result = spawnSync(process.execPath, args, { stdio: "inherit" });
  if (result.status !== 0) process.exit(result.status || 1);
}
