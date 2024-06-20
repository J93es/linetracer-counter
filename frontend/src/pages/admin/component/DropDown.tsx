export default function EditTypeDropDown({
  target,
  onClick,
  menuList,
}: {
  target: string;
  onClick: Function;
  menuList: string[];
}) {
  const htmlMenuList = getHtmlEditTypeList(menuList, onClick);

  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {target}
      </button>
      <ul className="dropdown-menu">{htmlMenuList}</ul>
    </div>
  );
}

function getHtmlEditTypeList(menuList: string[], onClick: Function) {
  return menuList.map((menu: string) => {
    return (
      <li key={menu}>
        <a
          href="#!"
          role="button"
          className="dropdown-item"
          onClick={() => {
            onClick(menu);
          }}
        >
          {menu}
        </a>
      </li>
    );
  });
}
