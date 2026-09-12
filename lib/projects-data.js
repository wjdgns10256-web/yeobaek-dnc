// 시공사례 데이터 — 핵심 인력(대표 포함)이 참여한 실제 현장 이력입니다.
// (건설기술인협회 경력증명서·사업자등록증 등 확인 서류 기준. 회사가 아닌
// 참여 기술인 개인 명의의 경력이며, 여백디앤씨 법인 설립 이전 이력을 포함합니다.)
//
// 카테고리별 01번(주택은 01·02번) 사진은 실제 시공사진(.jpg)으로 교체했고,
// 나머지 인덱스는 아직 placeholder 이미지(.svg)를 돌려쓰고 있습니다. 아래
// realPhotoIndexes에 등록된 인덱스만 .jpg를 쓰고, 그 외는 자동으로 .svg를 씁니다.
// 추가로 실제 사진을 넣으려면 해당 파일을 public/images/projects/{category}/ 아래
// 같은 번호로 넣고 realPhotoIndexes에 번호를 추가하면 됩니다.
//
// 기존 "특수해체" 항목은 리모델링/재개발·재건축/대수선 세 카테고리로 세분화했고,
// 이후 실제 공사 성격에 맞게 대표님이 직접 분류를 다시 확인해 반영했습니다.
// 추후에도 다른 항목이 있으면 아래 rawHistory의 카테고리 값
// (housing / commercial / factory / remodeling / redevelopment / renovation)만
// 바꿔주면 바로 반영됩니다.

export const projectCategories = [
  { key: "all", label: "전체" },
  {
    key: "housing",
    label: "주택",
    description: "살던 집을 기초까지 걷어내고 빈 땅으로 만드는 공사입니다.",
  },
  {
    key: "commercial",
    label: "상가",
    description: "임차했던 가게를 인테리어 전 상태로 되돌리는 공사입니다.",
  },
  {
    key: "factory",
    label: "공장",
    description: "설비를 분리하고 철골과 판넬을 해체하는 공사입니다.",
  },
  {
    key: "remodeling",
    label: "리모델링",
    description: "건물 뼈대는 두고 내부 마감과 설비만 걷어내는 공사입니다.",
  },
  {
    key: "redevelopment",
    label: "재개발·재건축",
    description: "정비구역 건물과 지중 구조물까지 정리해 부지를 비우는 공사입니다.",
  },
  {
    key: "renovation",
    label: "대수선",
    description: "건물을 헐지 않고 기둥·벽·계단 등 구조 일부만 해체하는 공사입니다.",
  },
];

const categoryLabels = {
  housing: "주택",
  commercial: "상가",
  factory: "공장",
  remodeling: "리모델링",
  redevelopment: "재개발·재건축",
  renovation: "대수선",
};

// [제목, 발주처/원청, 기간, 카테고리] — 최신순.
const rawHistory = [
  ["광명구름산지구 도시개발사업 부지조성", "대우소선해양건설(주)", "2024.10 ~ 2025.11", "redevelopment"],
  ["국립암센터 본관동 리모델링공사", "(주)하이테크엔파", "2024.06 ~ 2024.09", "remodeling"],
  ["LG 여의도 트윈타워 서관 공용부 리모델링공사", "(주)국보디자인", "2024.01 ~ 2024.06", "remodeling"],
  ["D&O 남산 교육연구시설 신축공사", "(주)성수프론티어", "2023.04 ~ 2023.10", "renovation"],
  ["안암병원 최첨단융복합의학센터 구조물해체·철거공사", "현대건설(주)", "2020.10 ~ 근무중", "housing"],
  ["대구이곡동 주상복합건물 신축공사 중 금속·창호공사", "다인건설", "2017.11", "remodeling"],
  ["병원 이전사업 시설공사 (구조물해체)", "국방시설본부 · 대우건설", "2010.06 ~ 2010.09", "housing"],
  ["화성동탄(2)택지개발사업 지장물철거공사(2공구)", "한국토지주택공사", "2009.10 ~ 2010.03", "redevelopment"],
  ["000지역확장공사 (비계 · 구조물해체)", "국방시설본부", "2009.04 ~ 2009.09", "redevelopment"],
  ["대한통운공장건물철거공사", "대한통운", "2009.02 ~ 2009.04", "factory"],
  ["밀양용두교철거공사", "밀양시", "2008.05 ~ 2009.01", "renovation"],
  ["영월소수력댐철거공사", "영월군청", "2008.03 ~ 2008.05", "renovation"],
  ["국토38호선 천기3교 개축공사 중 기존교량철거공사", "한신공영(주)", "2008.01 ~ 2008.03", "renovation"],
  ["태릉선수촌 선수숙소 팔승관철거공사", "대한체육회", "2007.11 ~ 2007.12", "housing"],
  ["옥천복개구조물개축공사 (마이크로파일공사)", "서울시건설안전본부", "2007.11", "renovation"],
  ["영등포정수장재건축고도처리시설공사", "서울시상수도관리사업소", "2007.09 ~ 2007.10", "renovation"],
  ["당현2교보수공사", "북부도로관리사업소", "2007.03 ~ 2007.09", "renovation"],
  ["옥천복개구조물개축공사 (마이크로파일공사)", "서울시건설안전본부", "2007.03", "renovation"],
  ["세아베스틸 구본관동철거공사", "(주)세아베스틸", "2007.01 ~ 2007.03", "housing"],
  ["호남고속도로 정읍천교 기존교량철거공사", "(주)고속도로관리공단", "2006.11 ~ 2007.01", "renovation"],
  ["애경백화점 G.S구로자이 연결통로공사", "애경E.N.C건설", "2006.09 ~ 2006.11", "renovation"],
  ["길음뉴타운 내순환도로철거공사 (2, 3차)", "성북구청", "2005.11 ~ 2006.08", "renovation"],
  ["대전 00시설공사 / 철거공사", "(주)대우건설", "2005.04 ~ 2005.10", "housing"],
  ["서울북성초등학교 기존건물철거공사", "구성건설(주)", "2005.03", "housing"],
  ["광주운암APT 재건축 주민이주용역 및 철거공사", "(주)벽산건설", "2004.12 ~ 2005.02", "redevelopment"],
  ["OSAN AB창고 GATE교체공사", "USACCK", "2002.05 ~ 2002.11", "remodeling"],
  ["서초동 충신교회 교육관증축공사", "충신교회", "2002.04 ~ 2002.05", "renovation"],
  ["가로정비 수거물품보관창고 신축공사", "서울특별시 영등포구청", "2002.03 ~ 2002.04", "redevelopment"],
  ["국제신공항 계측기보호대공사", "(주)센구조연구소", "2002.01 ~ 2002.02", "renovation"],
  ["도림동 영덕철강공장신축공사", "영덕철강", "2001.08 ~ 2001.12", "factory"],
  ["영등포전화국 통신브스보수공사", "전화국", "2001.06 ~ 2001.07", "renovation"],
  ["교내건축물 시설물보수공사", "시립대학교", "2001.05 ~ 2001.06", "renovation"],
  ["양평전화국신축공사", "(주)국토건설", "1999.02", "housing"],
  ["뉴코아KMS CLUB 아탑점바닥공사", "(주)시대종합건설", "1999.01 ~ 1999.02", "renovation"],
  ["남부지청신청사", "(주)신동아종합건설", "1998.11 ~ 1999.01", "housing"],
  ["서울대학교병원 영안실 · 암센터 신축", "(주)덕준건설", "1998.08 ~ 1998.11", "renovation"],
  ["충무초등학교철거공사", "(주)효명종합건설", "1998.07 ~ 1998.08", "housing"],
  ["춘천산지천옹벽철거", "(주)고려산업개발", "1998.04 ~ 1998.06", "renovation"],
];

const categoryCounters = {
  housing: 0,
  commercial: 0,
  factory: 0,
  remodeling: 0,
  redevelopment: 0,
  renovation: 0,
};

// 실제 시공사진으로 교체된 인덱스입니다. 나머지 인덱스는 아직 placeholder SVG를 사용합니다.
const realPhotoIndexes = {
  housing: [1, 2],
  commercial: [1],
  factory: [1],
  remodeling: [1],
  redevelopment: [1],
  renovation: [1],
};

export const projects = rawHistory.map(([title, client, period, category], i) => {
  categoryCounters[category] += 1;
  const index = ((categoryCounters[category] - 1) % 4) + 1;
  const imageIndex = String(index).padStart(2, "0");
  const ext = realPhotoIndexes[category]?.includes(index) ? "jpg" : "svg";
  return {
    id: `${category}-${i}`,
    category,
    categoryLabel: categoryLabels[category],
    title,
    client,
    period,
    image: `/images/projects/${category}/${imageIndex}.${ext}`,
  };
});
