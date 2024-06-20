import { isEmptyObject } from "component/admin/tools/utils";

export default function ListGroup({
  listOfObject,
  target,
  setTarget,
  viewLengthPerPage,
  currentPageNumber,
  DistintionClass,
  disabled = false,
}: {
  listOfObject: object[] | undefined;
  target: object | undefined;
  setTarget: Function;
  viewLengthPerPage: number;
  currentPageNumber: number;
  DistintionClass: object;
  disabled?: boolean;
}) {
  const viewIndexMin = 0;
  const viewIndexMax = listOfObject?.length ?? 1 - 1;

  const viewIndexHead =
    currentPageNumber * viewLengthPerPage - viewLengthPerPage < viewIndexMin
      ? viewIndexMin
      : currentPageNumber * viewLengthPerPage - viewLengthPerPage;

  const viewIndexTail =
    currentPageNumber * viewLengthPerPage - 1 > viewIndexMax
      ? viewIndexMax
      : currentPageNumber * viewLengthPerPage - 1;

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
  listOfObject: any[] | undefined,
  target: any,
  setTargetId: Function,
  viewIndexHead: number,
  viewIndexTail: number,
  DistintionClass: any,
  disabled: boolean
) {
  let htmlListGroup = [];

  for (let i = viewIndexHead; i <= viewIndexTail; i++) {
    let htmlElement = null;
    try {
      const obj: any = listOfObject && listOfObject[i];
      if (!obj || isEmptyObject(obj)) {
        continue;
      }

      let distintionInfo = "";
      try {
        distintionInfo = Object.values(new DistintionClass(obj)).join(", ");
      } catch (e) {
        distintionInfo = Object.values(obj).join(", ");
      }

      let className = "list-group-item list-group-item-action small";
      let active = false;
      if (obj.id && target?.id && obj.id === target?.id) {
        className += " active";
        active = true;
      } else if (JSON.stringify(obj) === JSON.stringify(target)) {
        className += " active";
        active = true;
      }

      if (disabled) {
        className += " disabled";
      }

      const onClick = () => setTargetId(obj);

      htmlElement = (
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
    } catch (e) {
      htmlElement = (
        <button
          key={i}
          type="button"
          className="list-group-item list-group-item-action small"
          onClick={() => {}}
          aria-current="false"
        >
          error
        </button>
      );
    }

    htmlListGroup.push(htmlElement);
  }
  return htmlListGroup;
}
