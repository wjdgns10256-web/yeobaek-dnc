import { kvGet, kvSet } from "./kv";

const INQUIRIES_KEY = "yeobaek:inquiries";

export async function getInquiries() {
  const data = await kvGet(INQUIRIES_KEY);
  return Array.isArray(data) ? data : [];
}

export async function saveInquiries(inquiries) {
  await kvSet(INQUIRIES_KEY, inquiries);
}

export async function addInquiry(inquiry) {
  const inquiries = await getInquiries();
  inquiries.unshift(inquiry);
  await saveInquiries(inquiries);
  return inquiry;
}

export async function updateInquiry(id, patch) {
  const inquiries = await getInquiries();
  const idx = inquiries.findIndex((i) => i.id === id);
  if (idx === -1) return null;
  inquiries[idx] = { ...inquiries[idx], ...patch, id };
  await saveInquiries(inquiries);
  return inquiries[idx];
}

export async function deleteInquiry(id) {
  const inquiries = await getInquiries();
  await saveInquiries(inquiries.filter((i) => i.id !== id));
}
