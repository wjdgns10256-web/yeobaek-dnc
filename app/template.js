// layout.js와 달리 template.js는 라우트가 바뀔 때마다 새로 마운트되므로,
// 페이지 전환마다 살짝 떠오르며 나타나는 모션을 자동으로 재생합니다.
export default function Template({ children }) {
  return <div className="page-transition">{children}</div>;
}
