#!/usr/bin/env node
// Read ../translations.csv → write src/lib/translations.ml.json
// CSV columns: section,key,english,malayalam,notes
// Skips rows whose first cell starts with '#' (section dividers).

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CSV_PATH = resolve(__dirname, "../../translations.csv");
const OUT_PATH = resolve(__dirname, "../src/lib/translations.ml.json");

function parseCSV(text) {
  const rows = [];
  let field = "";
  let row = [];
  let i = 0;
  let inQuotes = false;
  while (i < text.length) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i++;
        continue;
      }
      field += c;
      i++;
      continue;
    }
    if (c === '"') {
      inQuotes = true;
      i++;
      continue;
    }
    if (c === ",") {
      row.push(field);
      field = "";
      i++;
      continue;
    }
    if (c === "\n" || c === "\r") {
      row.push(field);
      field = "";
      if (row.length > 1 || row[0] !== "") rows.push(row);
      row = [];
      if (c === "\r" && text[i + 1] === "\n") i += 2;
      else i++;
      continue;
    }
    field += c;
    i++;
  }
  if (field !== "" || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

const csv = readFileSync(CSV_PATH, "utf8");
const rows = parseCSV(csv);
const header = rows.shift().map((h) => h.trim().toLowerCase());
const idxKey = header.indexOf("key");
const idxMl = header.indexOf("malayalam");
if (idxKey === -1 || idxMl === -1) {
  throw new Error("CSV must have 'key' and 'malayalam' columns");
}

const dict = {};
let count = 0;
for (const r of rows) {
  if (!r.length) continue;
  if ((r[0] || "").trim().startsWith("#")) continue;
  const key = (r[idxKey] || "").trim();
  const ml = (r[idxMl] || "").trim();
  if (!key || !ml) continue;
  dict[key] = ml;
  count++;
}

writeFileSync(OUT_PATH, JSON.stringify(dict, null, 2) + "\n", "utf8");
console.log(`[i18n] wrote ${count} keys → src/lib/translations.ml.json`);
