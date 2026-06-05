import { extractPdfItems } from "./pdfText.js";
import { isDateRange, normalizeDates, yearsFromText } from "./dates.js";
import { blankEntry } from "../data/initialData.js";

const COLUMN_RATIO = 0.34;
const LINE_TOLERANCE = 4;

function groupIntoLines(items) {
  const rows = [];
  for (const item of items) {
    const existing = rows.find((row) => Math.abs(row.y - item.y) <= LINE_TOLERANCE);
    if (existing) {
      existing.parts.push(item);
    } else {
      rows.push({ y: item.y, parts: [item] });
    }
  }
  return rows
    .sort((a, b) => a.y - b.y)
    .map((row) =>
      row.parts
        .sort((a, b) => a.x - b.x)
        .map((part) => part.text)
        .join(" ")
        .replace(/\s+/g, " ")
        .trim(),
    )
    .filter((text) => text.length > 0);
}
const SIDEBAR_HEADERS = ["Top Skills", "Languages", "Certifications", "Honors-Awards"];
const MAIN_HEADERS = ["Summary", "Experience", "Education"];

function isFooter(text) {
  return /^Page \d+ of \d+$/.test(text);
}

function looksLikeUrl(text) {
  return /^https?:\/\/\S+$/.test(text);
}

function looksLikeLocation(text) {
  if (!text || text.startsWith("-")) return false;
  if (text.endsWith(".")) return false;
  if (/^[a-z]/.test(text)) return false;
  return text.split(/\s+/).length <= 5;
}

function splitColumns(pages) {
  const main = [];
  const sidebar = [];
  for (const page of pages) {
    const threshold = page.width * COLUMN_RATIO;
    const mainItems = page.items.filter((item) => item.x >= threshold);
    const sidebarItems = page.items.filter((item) => item.x < threshold);
    for (const text of groupIntoLines(mainItems)) {
      if (!isFooter(text)) main.push(text);
    }
    for (const text of groupIntoLines(sidebarItems)) {
      if (!isFooter(text)) sidebar.push(text);
    }
  }
  return { main, sidebar };
}

function indexOfHeader(lines, header) {
  return lines.findIndex((line) => line.trim() === header);
}

function joinRange(lines, start, end) {
  return lines
    .slice(start, end)
    .filter((line) => !isFooter(line))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseHeader(mainLines, summaryIndex) {
  const name = mainLines[0] || "";
  const between = mainLines.slice(1, summaryIndex < 0 ? 3 : summaryIndex);
  let location = "";
  let headlineLines = between;
  if (between.length && looksLikeLocation(between[between.length - 1])) {
    location = between[between.length - 1];
    headlineLines = between.slice(0, -1);
  }
  return { name, headline: headlineLines.join(" ").trim(), location };
}

function descriptionToBullets(lines) {
  const cleaned = lines.filter((line) => !looksLikeUrl(line) && !isFooter(line));
  const bullets = [];
  for (const line of cleaned) {
    if (/^[-\u2022]\s+/.test(line)) {
      bullets.push(line.replace(/^[-\u2022]\s+/, "").trim());
    } else if (bullets.length) {
      bullets[bullets.length - 1] += ` ${line}`;
    } else {
      bullets.push(line);
    }
  }
  return bullets.map((b) => b.trim()).filter(Boolean);
}

function parseExperience(mainLines, startIndex, endIndex) {
  const block = mainLines.slice(startIndex + 1, endIndex);
  const dateIndices = [];
  block.forEach((line, i) => {
    if (isDateRange(line)) dateIndices.push(i);
  });

  return dateIndices.map((dateIdx, position) => {
    const entry = blankEntry();
    entry.title = block[dateIdx - 1] || "";
    entry.org = block[dateIdx - 2] || "";
    entry.dates = normalizeDates(block[dateIdx]);

    let descStart = dateIdx + 1;
    if (block[descStart] && looksLikeLocation(block[descStart])) {
      entry.location = block[descStart];
      descStart += 1;
    }

    const nextDateIdx = dateIndices[position + 1];
    const descEnd = nextDateIdx == null ? block.length : nextDateIdx - 2;
    entry.bullets = descriptionToBullets(block.slice(descStart, descEnd));
    if (!entry.bullets.length) entry.bullets = [""];
    return entry;
  });
}

function parseEducation(mainLines, startIndex) {
  if (startIndex < 0) return [];
  const block = mainLines.slice(startIndex + 1).filter((l) => !isFooter(l));
  const entries = [];
  block.forEach((line, i) => {
    if (!line.includes("\u00B7") && !/\(\s*\d{4}/.test(line)) return;
    const entry = blankEntry();
    entry.org = block[i - 1] || "";
    const [degreePart, datePart = ""] = line.split("\u00B7");
    entry.title = degreePart.trim();
    entry.dates = yearsFromText(datePart) || yearsFromText(line);
    entry.bullets = [];
    if (entry.title) entries.push(entry);
  });
  return entries;
}

function parseSidebarSection(sidebar, header) {
  const start = indexOfHeader(sidebar, header);
  if (start < 0) return [];
  const items = [];
  for (let i = start + 1; i < sidebar.length; i += 1) {
    const line = sidebar[i];
    if (SIDEBAR_HEADERS.includes(line) || line === "Contact") break;
    items.push(line);
  }
  return items;
}

function parseLanguagesSidebar(sidebar) {
  return parseSidebarSection(sidebar, "Languages").map((line) => {
    const match = line.match(/^(.*?)\s*\((.+)\)\s*$/);
    if (match) return { name: match[1].trim(), level: match[2].trim() };
    return { name: line.trim(), level: "" };
  });
}

export async function parseLinkedInPdf(file) {
  const pages = await extractPdfItems(file);
  if (!pages.length) throw new Error("The PDF has no readable text.");

  const { main, sidebar } = splitColumns(pages);
  if (main.length < 2) {
    throw new Error(
      "This does not look like a LinkedIn profile export. Use LinkedIn \u2192 More \u2192 Save to PDF.",
    );
  }

  const summaryIdx = indexOfHeader(main, "Summary");
  const experienceIdx = indexOfHeader(main, "Experience");
  const educationIdx = indexOfHeader(main, "Education");

  const header = parseHeader(main, summaryIdx);
  const summaryEnd = experienceIdx >= 0 ? experienceIdx : educationIdx;
  const summary =
    summaryIdx >= 0 ? joinRange(main, summaryIdx + 1, summaryEnd) : "";

  const experience =
    experienceIdx >= 0
      ? parseExperience(
          main,
          experienceIdx,
          educationIdx >= 0 ? educationIdx : main.length,
        )
      : [];

  const education = parseEducation(main, educationIdx);

  const topSkills = parseSidebarSection(sidebar, "Top Skills");
  const skills = topSkills.length
    ? [{ label: "Top Skills", value: topSkills.join(", ") }]
    : [];

  const languages = parseLanguagesSidebar(sidebar);

  return {
    parsed: {
      name: header.name.toUpperCase(),
      headline: header.headline,
      location: header.location,
      summary,
      experience,
      education,
      skills,
      languages,
    },
    stats: {
      experience: experience.length,
      education: education.length,
      skills: topSkills.length,
    },
  };
}
