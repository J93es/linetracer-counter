export default function ListGroup({
  listOfObject,
  target,
  setTarget,
  viewLengthPerPage,
  currentPageIndex,
  DistintionClass,
}: {
  listOfObject: object[];
  target: object;
  setTarget: Function;
  viewLengthPerPage: number;
  currentPageIndex: number;
  DistintionClass: any;
}) {
  const viewIndexMin = 0;
  const viewIndexMax = listOfObject.length - 1;

  const viewIndexHead =
    currentPageIndex * viewLengthPerPage - viewLengthPerPage < viewIndexMin
      ? viewIndexMin
      : currentPageIndex * viewLengthPerPage - viewLengthPerPage;

  const viewIndexTail =
    currentPageIndex * viewLengthPerPage - 1 > viewIndexMax
      ? viewIndexMax
      : currentPageIndex * viewLengthPerPage - 1;

  const htmlListGroup = getHtmlListGroup(
    listOfObject,
    target,
    setTarget,
    viewIndexHead,
    viewIndexTail,
    DistintionClass
  );

  return <div className="list-group">{htmlListGroup}</div>;
}

function getHtmlListGroup(
  listOfObject: object[],
  target: object,
  setTargetId: Function,
  viewIndexHead: number,
  viewIndexTail: number,
  DistintionClass: any
) {
  let htmlListGroup = [];

  for (let i = viewIndexHead; i <= viewIndexTail; i++) {
    const obj: any = listOfObject[i];
    const viewList = Object.values(new DistintionClass(obj));

    if (JSON.stringify(obj) === JSON.stringify(target)) {
      const htmlElement = (
        <button
          key={i}
          type="button"
          className="list-group-item list-group-item-action small active"
          aria-current="true"
          onClick={() => setTargetId(obj)}
        >
          {JSON.stringify(viewList)}
        </button>
      );

      htmlListGroup.push(htmlElement);
    } else {
      const htmlElement = (
        <button
          key={i}
          type="button"
          className="list-group-item list-group-item-action small"
          onClick={() => setTargetId(obj)}
        >
          {JSON.stringify(viewList)}
        </button>
      );

      htmlListGroup.push(htmlElement);
    }
  }
  return htmlListGroup;
}
