export default function SetViewLength({
  viewLengthPerPage,
  setViewLengthPerPage,
}: {
  viewLengthPerPage: number;
  setViewLengthPerPage: any;
}) {
  const viewLengthList = [5, 10, 20];
  const htmlViewLengthList: any = getHtmlViewLengthList(
    viewLengthList,
    setViewLengthPerPage
  );

  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        한번에 표시할 개수: {viewLengthPerPage}
      </button>
      <ul className="dropdown-menu">{htmlViewLengthList}</ul>
    </div>
  );
}

function getHtmlViewLengthList(
  viewLengthList: number[],
  setViewLengthPerPage: any
) {
  return viewLengthList.map((viewLength: number) => {
    return (
      <li key={viewLength}>
        <a
          href="#!"
          role="button"
          className="dropdown-item"
          onClick={() => {
            setViewLengthPerPage(viewLength);
          }}
        >
          {viewLength}
        </a>
      </li>
    );
  });
}
