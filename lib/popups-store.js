import { kvGet, kvSet } from "./kv";

const POPUPS_KEY = "yeobaek:popups";

export async function getPopups() {
  const data = await kvGet(POPUPS_KEY);
  return Array.isArray(data) ? data : [];
}

export async function savePopups(popups) {
  await kvSet(POPUPS_KEY, popups);
}

export function isPopupActiveNow(popup, now = new Date()) {
  if (!popup.active) return false;
  if (popup.startDate) {
    const start = new Date(popup.startDate);
    start.setHours(0, 0, 0, 0);
    if (now < start) return false;
  }
  if (popup.endDate) {
    const end = new Date(popup.endDate);
    end.setHours(23, 59, 59, 999);
    if (now > end) return false;
  }
  return true;
}
