// Date helpers for the YYYY-MM / YYYY strings used in the content model.

const LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const DATE_PATTERN = /^\d{4}(-(0[1-9]|1[0-2]))?$/;

/** "2025-11" → "November 2025" (long) or "Nov 2025" (short); "2020" → "2020". */
export function formatMonthYear(value: string, style: 'long' | 'short' = 'long'): string {
  if (!DATE_PATTERN.test(value)) return value;
  const [year, month] = value.split('-');
  if (!month) return year;
  const name = LONG[Number(month) - 1];
  return `${style === 'short' ? name.slice(0, 3) : name} ${year}`;
}

/** "Jan 2025 - Present", "September 2023 - July 2025", or a single date when only one is set. */
export function formatRange(start: string, end: string, isCurrent: boolean, style: 'long' | 'short' = 'long'): string {
  const from = start ? formatMonthYear(start, style) : '';
  const to = isCurrent ? 'Present' : end ? formatMonthYear(end, style) : '';
  return from && to ? `${from} - ${to}` : from || to;
}

/** Comparable number for a YYYY or YYYY-MM string (YYYY counts as its first month). */
export function dateKey(value: string): number {
  const [year, month = '01'] = value.split('-');
  return Number(year) * 12 + Number(month) - 1;
}

/** Year part of a YYYY / YYYY-MM string. */
export const yearOf = (value: string) => value.slice(0, 4);
