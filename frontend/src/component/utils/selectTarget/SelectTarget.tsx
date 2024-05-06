import { useState } from "react";
import SetViewLength from "component/utils/selectTarget/SetViewLength";
import ListGroup from "component/utils/selectTarget/ListGroup";
import PaginationBar from "component/utils/selectTarget/PaginationBar";

export default function SelectTarget({
  target,
  setTarget,
  listOfObject = [],
  DistintionClass,
  setUpdateSignal,
}: {
  target: object;
  setTarget: Function;
  listOfObject: object[];
  DistintionClass: any;
  setUpdateSignal: Function;
}) {
  const [viewLengthPerPage, setViewLengthPerPage] = useState(5);

  const targetIndex = getTargetIndex(listOfObject, target);

  const [currentPageIndex, setPageIndex] = useState(
    Math.trunc(targetIndex / viewLengthPerPage + 1)
  );

  if (!Array.isArray(listOfObject) || listOfObject.length === 0) {
    return null;
  }

  return (
    <div>
      <div>
        <button
          type="button"
          className="btn btn-info"
          onClick={() => {
            setUpdateSignal();
          }}
        >
          새로고침
        </button>

        <SetViewLength
          viewLengthPerPage={viewLengthPerPage}
          setViewLengthPerPage={setViewLengthPerPage}
        />
        <ListGroup
          listOfObject={listOfObject}
          target={target}
          setTarget={setTarget}
          viewLengthPerPage={viewLengthPerPage}
          currentPageIndex={currentPageIndex}
          DistintionClass={DistintionClass}
        />
        <PaginationBar
          currentPageIndex={currentPageIndex}
          setPageIndex={setPageIndex}
          viewLengthPerPage={viewLengthPerPage}
          listLength={listOfObject.length}
          targetIndex={targetIndex}
        />
      </div>
    </div>
  );
}

function getTargetIndex(listOfObject: object[], target: object) {
  for (let i = 0; i < listOfObject.length; i++) {
    if (JSON.stringify(listOfObject[i]) === JSON.stringify(target)) {
      return i;
    }
  }

  return 0;
}
