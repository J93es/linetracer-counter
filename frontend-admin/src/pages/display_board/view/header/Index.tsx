import headerImg from "pages/display_board/assets/images/header_img.jpg";

import "pages/display_board/view/header/Index.css";

export default function Header() {
  return (
    <div className="display-board-header">
      <img className="header-img" src={headerImg} alt="header-img" />
    </div>
  );
}
