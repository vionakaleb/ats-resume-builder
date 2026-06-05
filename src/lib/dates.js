const MONTHS = {
  january: "Jan",
  february: "Feb",
  march: "Mar",
  april: "Apr",
  may: "May",
  june: "Jun",
  july: "Jul",
  august: "Aug",
  september: "Sep",
  october: "Oct",
  november: "Nov",
  december: "Dec",
};

const DATE_RANGE =
  /^[A-Z][a-z]+ \d{4}\s*[-\u2013]\s*(Present|[A-Z][a-z]+ \d{4})/;

export function isDateRange(line) {
  return DATE_RANGE.test(line.trim());
}

export function normalizeDates(line) {
  let text = line.replace(/\s*\([^)]*\)\s*$/, "").trim();
  text = text.replace(/\s*[-\u2013]\s*/, " \u2013 ");
  return text.replace(
    /\b([A-Za-z]+)\b/g,
    (word) => MONTHS[word.toLowerCase()] || word,
  );
}

export function yearsFromText(text) {
  const years = text.match(/\d{4}/g);
  if (!years) return "";
  if (years.length >= 2) return `${years[0]} \u2013 ${years[1]}`;
  return years[0];
}
