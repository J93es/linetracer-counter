export default function ListGroup({
  listOfObject,
  target,
  setTarget,
  viewLengthPerPage,
  currentPageIndex,
  DistintionClass,
  disabled,
}: {
  listOfObject: object[];
  target: object;
  setTarget: Function;
  viewLengthPerPage: number;
  currentPageIndex: number;
  DistintionClass: any;
  disabled: boolean;
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
    DistintionClass,
    disabled
  );

  return <div className="list-group">{htmlListGroup}</div>;
}

function getHtmlListGroup(
  listOfObject: object[],
  target: object,
  setTargetId: Function,
  viewIndexHead: number,
  viewIndexTail: number,
  DistintionClass: any,
  disabled: boolean
) {
  let htmlListGroup = [];

  for (let i = viewIndexHead; i <= viewIndexTail; i++) {
    const obj: object = listOfObject[i];

    let distintionInfo = "";
    try {
      distintionInfo = Object.values(new DistintionClass(obj)).join(", ");
    } catch (e) {
      distintionInfo = Object.values(obj).join(", ");
    }

    let className = "list-group-item list-group-item-action small";
    let active = false;
    if (JSON.stringify(obj) === JSON.stringify(target)) {
      className += " active";
      active = true;
    }

    if (disabled) {
      className += " disabled";
    }

    const onClick = () => setTargetId(obj);

    const htmlElement = (
      <button
        key={i}
        type="button"
        className={className}
        onClick={onClick}
        aria-current={active ? "true" : "false"}
      >
        {distintionInfo}
      </button>
    );

    htmlListGroup.push(htmlElement);
  }
  return htmlListGroup;
}
