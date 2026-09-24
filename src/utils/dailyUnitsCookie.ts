// Stores which units (topic prefixes) the Daily Plan may draw from.
// Saved as a cookie per subject. null = "all units" (no filter).
const name = (subject: string) => `daily-units-${subject}`;
const ONE_YEAR = 60 * 60 * 24 * 365;

export const loadDailyUnits = (subject: string): string[] | null => {
  const match = document.cookie
    .split('; ')
    .find(c => c.startsWith(`${encodeURIComponent(name(subject))}=`));
  if (!match) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(match.split('=').slice(1).join('=')));
    return Array.isArray(parsed) ? parsed : null;
  } catch { return null; }
};

export const saveDailyUnits = (subject: string, units: string[] | null) => {
  const n = encodeURIComponent(name(subject));
  if (units === null) {
    document.cookie = `${n}=; max-age=0; path=/; SameSite=Lax`;
    return;
  }
  const v = encodeURIComponent(JSON.stringify(units));
  document.cookie = `${n}=${v}; max-age=${ONE_YEAR}; path=/; SameSite=Lax`;
};
