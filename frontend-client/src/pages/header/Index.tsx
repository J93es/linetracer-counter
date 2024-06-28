import "pages/header/Index.css";

export default function Header({
  title,
  isLoading,
}: {
  title: string | undefined;
  isLoading: boolean;
}) {
  const titleStr = isLoading ? "" : title ?? "전국라인트레이서 경연대회";
  return (
    <div className="header-container">
      <div className="header-title-container">
        <a href="/" className="header-title">
          <span className="header-title-text">{titleStr}</span>
        </a>
      </div>
      <div className="header-live-container">
        <a href="/live" className="header-live">
          <span className="header-live-text">실시간 경연 정보</span>
        </a>
      </div>
      <div className="header-sponser-container">
        <a href="/sponser" className="header-sponser">
          <span className="header-sponser-text">후원</span>
        </a>
      </div>
    </div>
  );
}
