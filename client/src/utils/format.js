export function formatDate(dateString, options = {}) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    ...options,
  }).format(date);
}

export function formatYear(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "";
  return date.getFullYear().toString();
}

export function formatDuration(startDate, endDate, current = false) {
  if (!startDate) return "";
  const start = formatDate(startDate);
  const end = current ? "Present" : formatDate(endDate);
  return `${start} - ${end}`;
}

export function formatDateRange(startDate, endDate, current = false) {
  if (!startDate) return "";
  const start = formatDate(startDate, { year: "numeric", month: "short" });
  const end = current ? "Present" : formatDate(endDate, { year: "numeric", month: "short" });
  return `${start} - ${end}`;
}
