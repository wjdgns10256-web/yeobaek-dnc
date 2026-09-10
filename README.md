# 여백디앤씨 홈페이지

Next.js(App Router) + Tailwind CSS로 제작한 기업 홈페이지입니다. 홈 화면은 히어로와
스크롤에 따라 한 줄씩 나타나는 회사 소개 문구, 발주처 마퀴, 문의만으로 구성해 밀도를
낮췄고, 회사소개·사업분야·시공사례·FAQ는 각각 개별 페이지로 분리했습니다.

## 페이지 구성

| 경로 | 내용 |
| --- | --- |
| `/` | 히어로(헤드라인) → 스크롤 인트로(회사 소개 문구 한 줄씩) → 발주처 마퀴 → 문의 |
| `/about` | 회사소개 허브 — 통계, 핵심 가치 카드, 하위 페이지 링크 |
| `/about/[slug]` | 회사소개 하위 페이지 (대표자 말씀 · 인재상 · 비전 · 해체공법 · 조직도) |
| `/services` | 사업분야 허브 — 카드 3개 |
| `/services/[slug]` | 사업분야 상세 (건축물 해체공사 · 부분철거 · 개구부 확장) |
| `/projects` | 시공사례 허브 — 카테고리 타일 6개 |
| `/projects/[category]` | 시공사례 카테고리별 전체 목록 (주택 · 상가 · 공장 · 리모델링 · 재개발·재건축 · 대수선) |
| `/faq` | 자주 묻는 질문 |

헤더 내비게이션(회사소개/사업분야/시공사례)은 각각 `/about`, `/services`, `/projects`
허브 페이지로 바로 이동합니다. 히어로 다음의 스크롤 인트로 문구는
`components/IntroReveal.jsx`에서 수정할 수 있습니다.

새 사업분야를 추가하려면 `lib/services-data.js`에 항목을 추가하면 `/services/[slug]` 페이지가
자동 생성됩니다. 시공사례도 `lib/projects-data.js`의 `rawHistory` 배열에 행을 추가하면 됩니다.
회사소개 하위 페이지는 `lib/about-data.js`에서 문구를 수정하면 되고, 대표자 말씀은 초안이니
실제 대표님 말씀으로 교체하는 것을 권장합니다.

## 시작하기

```bash
npm install
npm run dev
```

`http://localhost:3000` 에서 확인할 수 있습니다.

배포용 빌드는 `npm run build && npm run start` 입니다.

## 실제 시공사진으로 교체하기

모든 이미지는 `public/images` 아래 더미(placeholder) SVG로 채워져 있습니다.
**같은 파일명으로 이미지 파일만 교체하면 코드 수정 없이 반영됩니다.**

| 위치 | 용도 |
| --- | --- |
| `public/images/hero/hero-main.jpg` | 히어로 섹션 풀스크린 배경 (1920×1080 권장) |
| `public/images/services/*.svg` | 사업분야 카드 3장 |
| `public/images/projects/housing/01~04.svg` | 시공사례 – 주택 |
| `public/images/projects/commercial/01~04.svg` | 시공사례 – 상가 |
| `public/images/projects/factory/01~04.svg` | 시공사례 – 공장 |
| `public/images/projects/remodeling/01~04.svg` | 시공사례 – 리모델링 |
| `public/images/projects/redevelopment/01~04.svg` | 시공사례 – 재개발·재건축 |
| `public/images/projects/renovation/01~04.svg` | 시공사례 – 대수선 |
| `public/images/about/hero-about.svg` | 회사소개 허브(`/about`) 상단 배너 |
| `public/images/about/message.svg` | 대표자 말씀 페이지 배너 |
| `public/images/about/talent.svg` | 인재상 페이지 배너 |
| `public/images/about/vision.svg` | 비전 페이지 배너 |
| `public/images/about/method.svg` | 해체공법 페이지 배너 |
| `public/images/about/organization.svg` | 조직도 페이지 배너 |

- jpg/png 등 다른 확장자로 교체하고 싶다면 `lib/services-data.js`, `lib/projects-data.js`,
  `lib/about-data.js` 안의 `image` 경로만 새 파일명으로 바꿔주면 됩니다.
- 시공사례 개수를 늘리거나 줄이려면 `lib/projects-data.js`의 `buildProjects(...)` 호출 인자(개수)를
  조정하고 해당 폴더에 이미지를 추가/삭제하세요.
- 사업분야 상세 페이지의 체크리스트(`highlights`)는 `lib/services-data.js`에서, 시공사례
  카테고리 소개 문구(`description`)는 `lib/projects-data.js`의 `projectCategories`에서
  수정할 수 있습니다.

## 모션

- `app/template.js` — 라우트가 바뀔 때마다 페이지 전체가 살짝 떠오르며 나타나는 전환 모션.
- `components/ParallaxBanner.jsx` — 사업분야/시공사례/회사소개 상세 페이지 상단 배너에
  적용된 스크롤 연동 패럴랙스.
- `components/CountUp.jsx` — 회사소개 허브의 참여 현장 수(예: "38건+")가 화면에 들어올 때
  0부터 세어 올라가는 숫자 애니메이션.
- `components/FaqItem.jsx` — 클릭 시 실제 내용 높이만큼 부드럽게 펼쳐지는 FAQ 아코디언.
- 모든 모션은 `prefers-reduced-motion`(모션 최소화) 설정을 존중해 자동으로 꺼집니다.

## 로고

실제 여백디앤씨 심볼을 배경 투명 PNG로 가공해 아래 위치에 적용했습니다.

- `public/logo/mark-white.png` — 헤더/푸터 등 어두운 배경용 (흰색)
- `public/logo/mark-black.png` — 밝은 배경에 쓸 경우 대비용 (검정)
- `app/icon.png` — 브라우저 파비콘 (다크 배경 + 흰색 심볼)

로고를 교체하려면 위 파일을 새 이미지로 덮어쓰면 됩니다.

## 회사 정보 수정하기

전화번호, 이메일, 주소, 사업자등록번호, 슬로건 등 텍스트 정보는 전부
`lib/site-config.js` 한 파일에 모여 있습니다. 이 파일만 수정하면 헤더, 히어로, 문의,
푸터 등 사이트 전체에 반영됩니다.

## 문의 폼 연동

현재 `components/Contact.jsx`의 문의 폼은 UI 동작(제출 후 완료 메시지)만 구현되어 있고,
실제 이메일 발송이나 DB 저장은 연결되어 있지 않습니다. 운영 전 아래 중 한 가지 방식으로
백엔드 연동이 필요합니다.

- `app/api/contact/route.js` API 라우트를 추가해 이메일 발송(Resend, Nodemailer 등) 연결
- Formspree, Getform 같은 폼 백엔드 서비스에 연결

## 폴더 구조

```
app/            App Router 페이지, 레이아웃, 전역 스타일
components/     섹션별 컴포넌트 (Header, Hero, About, Services, Projects, Contact, Footer)
lib/            회사 정보 / 사업분야 / 시공사례 데이터
public/images/  이미지 (교체 대상)
legacy/         이전 정적 HTML 버전 (참고용 보관)
```
