import { useEffect } from "react";

export default function PaginationBar({
  currentPageNumber,
  setPageNumber,
  viewLengthPerPage,
  listLength,
  targetIndex,
}: {
  currentPageNumber: number;
  setPageNumber: Function;
  viewLengthPerPage: number;
  listLength: number;
  targetIndex: number;
}) {
  const viewLength = 3;
  const pageNumberMin = 1;
  const pageNumberMax = Math.trunc((listLength - 1) / viewLengthPerPage + 1);
  const pageNumberList = getPageNumberList(
    viewLength,
    currentPageNumber,
    pageNumberMin,
    pageNumberMax
  );

  const htmlPageNumberList = getHtmlPageNumberList(
    pageNumberList,
    currentPageNumber,
    setPageNumber
  );

  const goFirstPage = () => {
    setPageNumber(pageNumberMin);
  };

  const goLastPage = () => {
    setPageNumber(pageNumberMax);
  };

  const goPrevPage = () => {
    const targetPageNumber =
      currentPageNumber - 1 > pageNumberMin
        ? currentPageNumber - 1
        : pageNumberMin;
    setPageNumber(targetPageNumber);
  };

  const goNextPage = () => {
    const targetPageNumber =
      currentPageNumber + 1 < pageNumberMax
        ? currentPageNumber + 1
        : pageNumberMax;
    setPageNumber(targetPageNumber);
  };

  useEffect(() => {
    const targetPageViewIndex = Math.trunc(targetIndex / viewLengthPerPage + 1);
    setPageNumber(targetPageViewIndex);
  }, [targetIndex, viewLengthPerPage, setPageNumber, listLength]);

  return (
    <nav aria-label="...">
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <button className="page-link" onClick={goFirstPage}>
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>
        <li className="page-item">
          <button className="page-link" onClick={goPrevPage}>
            <span aria-hidden="true">&lsaquo;</span>
          </button>
        </li>

        {htmlPageNumberList}

        <li className="page-item">
          <button className="page-link" onClick={goNextPage}>
            <span aria-hidden="true">&rsaquo;</span>
          </button>
        </li>
        <li className="page-item">
          <button className="page-link" onClick={goLastPage}>
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}

function getPageNumberList(
  viewLength: number,
  currentPageNumber: number,
  pageNumberMin: number,
  pageNumberMax: number
) {
  let headPageNumber: number = currentPageNumber - viewLength + 1;
  let tailPageNumber: number = currentPageNumber + viewLength - 1;
  let pageNumberList: number[] = [];

  if (headPageNumber < pageNumberMin) {
    headPageNumber = pageNumberMin;

    tailPageNumber = pageNumberMin + viewLength - 1;
    if (tailPageNumber > pageNumberMax) {
      tailPageNumber = pageNumberMax;
    }
  } else if (tailPageNumber > pageNumberMax) {
    tailPageNumber = pageNumberMax;

    headPageNumber = pageNumberMax - viewLength + 1;
    if (headPageNumber < pageNumberMin) {
      headPageNumber = pageNumberMin;
    }
  }

  if (headPageNumber === tailPageNumber) {
    pageNumberList.push(headPageNumber);
    return pageNumberList;
  }

  for (let i = headPageNumber; i <= tailPageNumber; i++) {
    pageNumberList.push(i);
  }

  return pageNumberList;
}

function getHtmlPageNumberList(
  pageNumberList: number[],
  currentPageNumber: number,
  setPageNumber: Function
) {
  return pageNumberList.map((pageNumber) => {
    if (currentPageNumber === pageNumber) {
      return (
        <li key={pageNumber} className="page-item active" aria-current="page">
          <button className="page-link">{pageNumber}</button>
        </li>
      );
    }

    return (
      <li key={pageNumber} className="page-item">
        <button
          className="page-link"
          onClick={() => {
            setPageNumber(pageNumber);
          }}
        >
          {pageNumber}
        </button>
      </li>
    );
  });
}
