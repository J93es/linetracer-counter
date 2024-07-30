import "pages/header/Index.css";
import { useNavigate } from "react-router-dom";

export default function Header({
  title,
  isLoading,
  onClickedSection,
}: {
  title: string | undefined;
  isLoading: boolean;
  onClickedSection: string;
}) {
  const navigate = useNavigate();
  const titleStr = isLoading ? "" : title ?? "전국라인트레이서 경연대회";
  return (
    <div className="header-container">
      <div className="header-title-container">
        <button onClick={() => navigate("/")} className="header-title">
          <span className="header-title-text">{titleStr}</span>
        </button>
      </div>
      <div className="header-live-container">
        <button onClick={() => navigate("/live")} className="header-live">
          <span
            className={
              onClickedSection === "live"
                ? "header-live-text-onclicked"
                : "header-live-text"
            }
          >
            실시간 경연 정보
          </span>
        </button>
      </div>
      <div className="header-sponser-container">
        <button onClick={() => navigate("/sponser")} className="header-sponser">
          <span
            className={
              onClickedSection === "sponser"
                ? "header-sponser-text-onclicked"
                : "header-sponser-text"
            }
          >
            후원
          </span>
        </button>
      </div>
    </div>
  );
}
