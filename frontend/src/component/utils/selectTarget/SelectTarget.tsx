import { useState } from "react";
import SetViewLength from "component/utils/selectTarget/SetViewLength";
import ListGroup from "component/utils/selectTarget/ListGroup";
import PaginationBar from "component/utils/selectTarget/PaginationBar";

import "component/utils/selectTarget/SelectTarget.css";

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
    <div className="select-target">
      <div className="select-target-header">
        <div className="select-target-header-left">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              setUpdateSignal();
            }}
          >
            새로고침
          </button>
        </div>

        <div className="select-target-header-right">
          <SetViewLength
            viewLengthPerPage={viewLengthPerPage}
            setViewLengthPerPage={setViewLengthPerPage}
          />
        </div>
      </div>

      <div className="select-target-body">
        <ListGroup
          listOfObject={listOfObject}
          target={target}
          setTarget={setTarget}
          viewLengthPerPage={viewLengthPerPage}
          currentPageIndex={currentPageIndex}
          DistintionClass={DistintionClass}
        />
      </div>

      <div className="select-target-footer">
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
