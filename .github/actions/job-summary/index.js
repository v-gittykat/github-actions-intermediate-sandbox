const fs = require("node:fs");

// The runner passes inputs as INPUT_<NAME> environment variables (name uppercased).
const input = (name) => (process.env[`INPUT_${name.toUpperCase()}`] || "").trim();

try {
  const items = JSON.parse(fs.readFileSync(input("inventory-file"), "utf8"));
  const isLow = (i) => i.quantity <= i.reorder_level;
  const low = items.filter(isLow);

  const rows = items
    .map((i) => `| ${i.sku} | ${i.quantity} | ${i.reorder_level} | ${isLow(i) ? "⚠️ low" : "✅ ok"} |`)
    .join("\n");
  fs.appendFileSync(
    process.env.GITHUB_STEP_SUMMARY,
    `### Inventory check\n\n| SKU | Qty | Reorder level | Status |\n|---|---|---|---|\n${rows}\n`
  );
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `low-stock-count=${low.length}\n`);

  if (low.length && input("fail-on-low-stock") === "true") {
    console.log(`::error title=Low stock::${low.map((i) => i.sku).join(", ")} at or below reorder level`);
    process.exitCode = 1;
  } else if (low.length) {
    console.log(`::warning title=Low stock::${low.length} SKU(s) need restocking`);
  }
} catch (err) {
  console.log(`::error::${err.message}`);
  process.exitCode = 1;
}
