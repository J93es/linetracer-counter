import "pages/header/Index.css";
import { Link } from "react-router-dom";

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
        <Link to="/" className="header-title">
          <span className="header-title-text">{titleStr}</span>
        </Link>
      </div>
      <div className="header-live-container">
        <Link to="/live" className="header-live">
          <span className="header-live-text">실시간 경연 정보</span>
        </Link>
      </div>
      <div className="header-sponser-container">
        <Link to="/sponser" className="header-sponser">
          <span className="header-sponser-text">후원</span>
        </Link>
      </div>
    </div>
  );
}
