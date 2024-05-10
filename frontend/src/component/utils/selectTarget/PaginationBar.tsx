import { useEffect } from "react";

export default function PaginationBar({
  currentPageIndex,
  setPageIndex,
  viewLengthPerPage,
  listLength,
  targetIndex,
}: {
  currentPageIndex: number;
  setPageIndex: Function;
  viewLengthPerPage: number;
  listLength: number;
  targetIndex: number;
}) {
  const pageIndexMin = 1;
  const pageIndexMax = Math.trunc((listLength - 1) / viewLengthPerPage + 1);
  const pageIndexList = getPageIndexList(pageIndexMin, pageIndexMax);

  const htmlPageIndexList = getHtmlPageIndexList(
    pageIndexList,
    currentPageIndex,
    setPageIndex
  );

  const previousClick = () => {
    setPageIndex(pageIndexMin);
  };

  const nextClick = () => {
    setPageIndex(pageIndexMax);
  };

  useEffect(() => {
    const targetPageViewIndex = Math.trunc(targetIndex / viewLengthPerPage + 1);
    setPageIndex(targetPageViewIndex);
  }, [targetIndex, viewLengthPerPage, setPageIndex, listLength]);

  return (
    <nav aria-label="...">
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <button className="page-link" onClick={previousClick}>
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>

        {htmlPageIndexList}

        <li className="page-item">
          <button className="page-link" onClick={nextClick}>
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}

function getPageIndexList(viewPageMin: number, viewPageMax: number) {
  let pageIndexList = [];

  for (let i = viewPageMin; i <= viewPageMax; i++) {
    pageIndexList.push(i);
  }

  return pageIndexList;
}

function getHtmlPageIndexList(
  pageIndexList: number[],
  currentPageIndex: number,
  setPageIndex: Function
) {
  return pageIndexList.map((pageIndex) => {
    if (currentPageIndex === pageIndex) {
      return (
        <li key={pageIndex} className="page-item active" aria-current="page">
          <button className="page-link">{pageIndex}</button>
        </li>
      );
    }

    return (
      <li key={pageIndex} className="page-item">
        <button
          className="page-link"
          onClick={() => {
            setPageIndex(pageIndex);
          }}
        >
          {pageIndex}
        </button>
      </li>
    );
  });
}
