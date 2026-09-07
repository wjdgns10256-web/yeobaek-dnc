// 시공사례 갤러리 더미 데이터.
// 각 항목의 image 경로에 있는 파일(예: public/images/projects/housing/01.svg)을
// 실제 시공사진으로 교체하세요. 파일명을 유지하면 코드 수정 없이 반영됩니다.
export const projectCategories = [
  { key: "all", label: "전체" },
  { key: "housing", label: "주택" },
  { key: "commercial", label: "상가" },
  { key: "factory", label: "공장" },
  { key: "special", label: "특수해체" },
];

function buildProjects(categoryKey, categoryLabel, count) {
  return Array.from({ length: count }, (_, i) => {
    const index = String(i + 1).padStart(2, "0");
    return {
      id: `${categoryKey}-${index}`,
      category: categoryKey,
      categoryLabel,
      title: `${categoryLabel} 시공사례 ${i + 1}`,
      image: `/images/projects/${categoryKey}/${index}.svg`,
    };
  });
}

export const projects = [
  ...buildProjects("housing", "주택", 4),
  ...buildProjects("commercial", "상가", 4),
  ...buildProjects("factory", "공장", 4),
  ...buildProjects("special", "특수해체", 4),
];
