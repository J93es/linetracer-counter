import { useState } from "react";
import SetViewLength from "component/utils/selectTarget/SetViewLength";
import ListGroup from "component/utils/selectTarget/ListGroup";
import PaginationBar from "component/utils/selectTarget/PaginationBar";

import "component/utils/selectTarget/Index.css";

import { isEmptyArray } from "tools/utils";

export default function SelectTarget({
  target,
  setTarget,
  listOfObject,
  DistintionClass,
  setUpdateSignal,
  disabled = false,
}: {
  target: object;
  setTarget: Function;
  listOfObject: object[];
  DistintionClass: any;
  setUpdateSignal: Function;
  disabled: boolean;
}) {
  const [viewLengthPerPage, setViewLengthPerPage] = useState(5);

  const targetIndex = getTargetIndex(listOfObject, target);

  const [currentPageNumber, setPageNumber] = useState(
    Math.trunc(targetIndex / viewLengthPerPage + 1)
  );

  if (isEmptyArray(listOfObject)) {
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
          currentPageNumber={currentPageNumber}
          DistintionClass={DistintionClass}
          disabled={disabled}
        />
      </div>

      <div className="select-target-footer">
        <PaginationBar
          currentPageNumber={currentPageNumber}
          setPageNumber={setPageNumber}
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
