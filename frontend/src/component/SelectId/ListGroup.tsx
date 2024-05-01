export default function ListGroup({
  listOfObject,
  targetId,
  setTargetId,
  viewLengthPerPage,
  currentPageIndex,
  DistintionClass,
}: {
  listOfObject: object[];
  targetId: string;
  setTargetId: Function;
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
    targetId,
    setTargetId,
    viewIndexHead,
    viewIndexTail,
    DistintionClass
  );

  return <div className="list-group">{htmlListGroup}</div>;
}

function getHtmlListGroup(
  listOfObject: object[],
  targetId: string,
  setTargetId: Function,
  viewIndexHead: number,
  viewIndexTail: number,
  DistintionClass: any
) {
  let htmlListGroup = [];

  for (let i = viewIndexHead; i <= viewIndexTail; i++) {
    const obj: any = listOfObject[i];

    if (obj._id === targetId) {
      const htmlElement = (
        <button
          key={i}
          type="button"
          className="list-group-item list-group-item-action active"
          aria-current="true"
          onClick={() => setTargetId(obj._id)}
        >
          {JSON.stringify(new DistintionClass(obj))}
        </button>
      );

      htmlListGroup.push(htmlElement);
    } else {
      const htmlElement = (
        <button
          key={i}
          type="button"
          className="list-group-item list-group-item-action"
          onClick={() => setTargetId(obj._id)}
        >
          {JSON.stringify(new DistintionClass(obj))}
        </button>
      );

      htmlListGroup.push(htmlElement);
    }
  }
  return htmlListGroup;
}
