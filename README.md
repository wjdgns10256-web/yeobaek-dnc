# 여백디앤씨 홈페이지

Next.js(App Router) + Tailwind CSS로 제작한 원페이지 스크롤형 기업 홈페이지입니다.

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
| `public/images/projects/special/01~04.svg` | 시공사례 – 특수해체 |

- jpg/png 등 다른 확장자로 교체하고 싶다면 `lib/services-data.js`, `lib/projects-data.js` 안의
  `image` 경로만 새 파일명으로 바꿔주면 됩니다.
- 시공사례 개수를 늘리거나 줄이려면 `lib/projects-data.js`의 `buildProjects(...)` 호출 인자(개수)를
  조정하고 해당 폴더에 이미지를 추가/삭제하세요.

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
