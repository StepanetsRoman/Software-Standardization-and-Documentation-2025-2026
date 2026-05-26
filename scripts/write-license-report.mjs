#!/usr/bin/env node
/**
 * Генерація `license-report.txt` та `license-report.md` за допомогою `license-checker-rseidelsohn`.
 * Виконується з кореня проєкту: `node scripts/write-license-report.mjs`
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

function runJson() {
  return execSync(
    "npx license-checker-rseidelsohn --start . --excludePrivatePackages --json",
    {
      cwd: root,
      encoding: "utf8",
      shell: true,
      windowsHide: true
    }
  );
}

/** @returns {Record<string, { licenses?: string, repository?: string, publisher?: string, url?: string }>} */
function normalizePayload(rawText) {
  const parsed = JSON.parse(rawText.trim() || "{}");
  if (parsed?.packages && typeof parsed.packages === "object") {
    return parsed.packages;
  }
  return /** @type {Record<string, any>} */ (
    parsed && typeof parsed === "object" ? parsed : {}
  );
}

const jsonText = runJson();
const pkgs = normalizePayload(jsonText);
const rows = Object.entries(pkgs)
  .map(([name, meta]) => ({
    package: String(name || "").trim(),
    license: String(meta?.licenses ?? meta?.license ?? "UNKNOWN").trim(),
    repository: String(meta?.repository ?? meta?.url ?? "").trim(),
    publisher: String(meta?.publisher ?? "").trim()
  }))
  .filter((row) => row.package)
  .sort((a, b) => a.package.localeCompare(b.package));

function formatTxt() {
  const lines = [
    `# License report (${new Date().toISOString()})`,
    "Format: PACKAGE | LICENSE | REPOSITORY",
    "---"
  ];
  for (const r of rows) {
    lines.push(
      `${r.package} | ${r.license} | ${r.repository}${r.publisher ? ` | ${r.publisher}` : ""}`
    );
  }
  return lines.join("\n");
}

function formatMarkdown() {
  const lines = [
    `# License Report`,
    ``,
    `Згенеровано: ${new Date().toISOString()}`,
    ``,
    `Інструмент: [license-checker-rseidelsohn](https://www.npmjs.com/package/license-checker-rseidelsohn)`,
    ``,
    `Цей звіт перелічує залежності проєкту та їх оголошені ліцензії відповідно до полів \`package.json\` транзитивного дерева.`,
    ``,
    `| Пакунок | Ліцензія | Репозиторій / Publisher |`,
    `| --- | --- | --- |`
  ];

  for (const r of rows) {
    const pub = [r.repository, r.publisher].filter(Boolean).join(" · ");
    lines.push(`| \`${r.package}\` | ${r.license || "UNKNOWN"} | ${pub || "—"} |`);
  }

  lines.push("", "", `Всього записів: **${rows.length}**`);

  const unknown = rows.filter((r) => /^unknown$/i.test(r.license)).length;
  if (unknown) {
    lines.push(
      "",
      `> ⚠ Є **${unknown}** залежностей із невідомою ліцензією (\`UNKNOWN\`) — перевірте власноруч у їхньому репозиторії.`
    );
  }

  return lines.join("\n");
}

fs.writeFileSync(path.join(root, "license-report.txt"), formatTxt(), "utf8");
fs.writeFileSync(path.join(root, "license-report.md"), formatMarkdown(), "utf8");

process.stdout.write(
  `✓ license-report.txt and license-report.md written (${rows.length} packages).\n`
);
