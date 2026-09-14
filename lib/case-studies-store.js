import { kvGet, kvSet } from "./kv";

const CASE_STUDIES_KEY = "yeobaek:case-studies";

export async function getCaseStudies() {
  const data = await kvGet(CASE_STUDIES_KEY);
  return Array.isArray(data) ? data : [];
}

export async function saveCaseStudies(caseStudies) {
  await kvSet(CASE_STUDIES_KEY, caseStudies);
}

export async function addCaseStudy(caseStudy) {
  const caseStudies = await getCaseStudies();
  caseStudies.unshift(caseStudy);
  await saveCaseStudies(caseStudies);
  return caseStudy;
}

export async function deleteCaseStudy(id) {
  const caseStudies = await getCaseStudies();
  await saveCaseStudies(caseStudies.filter((c) => c.id !== id));
}
