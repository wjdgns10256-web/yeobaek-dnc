// 사업분야 카드 데이터.
// image 경로의 파일을 실제 시공사진으로 교체하면 그대로 반영됩니다.
export const services = [
  {
    id: "structure-demolition",
    title: "구조물 해체공사",
    description:
      "건축물의 구조체(기둥·보·슬래브·벽체) 전체를 계획적으로 철거하는 공사입니다. 해체계획서 작성, 구조 검토, 장비 투입까지 전 과정을 관리합니다.",
    image: "/images/services/structure-demolition.svg",
    highlights: [
      "해체계획서 작성 및 구조 안전성 사전 검토",
      "압쇄·절단 등 현장에 맞는 공법 선정",
      "분진·소음 저감 조치와 폐기물 처리내역 관리",
    ],
  },
  {
    id: "finish-demolition",
    title: "마감재 해체공사",
    description:
      "리모델링·용도변경을 위해 바닥재, 벽지, 천장재, 조명·설비 등 내부 마감재를 철거하는 공사입니다. 구조체 손상 없이 마감재만 선별 철거합니다.",
    image: "/images/services/finish-demolition.svg",
    highlights: [
      "바닥·벽·천장 마감재 선별 철거",
      "구조체·설비 배관 손상 방지",
      "철거 폐기물 분리배출 및 처리내역 관리",
    ],
  },
  {
    id: "structure-cutting",
    title: "구조체 절단공사",
    description:
      "출입구·창호 신설, 배관 매립 등을 위해 벽체·슬래브 등 구조체를 정밀하게 절단하는 공사입니다. 구조 안전성을 사전에 검토한 뒤 다이아몬드 커터로 시공합니다.",
    image: "/images/services/structure-cutting.svg",
    highlights: [
      "내력벽 여부 등 구조 안전성 사전 검토",
      "다이아몬드 커터를 이용한 정밀 절단",
      "절단면 보강 및 마감 연계 시공",
    ],
  },
];
