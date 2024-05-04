import { useState } from "react";
import SetViewLength from "component/selectId/SetViewLength";
import ListGroup from "component/selectId/ListGroup";
import PaginationBar from "component/selectId/PaginationBar";

export default function SelectId({
  targetId,
  setTargetId,
  listOfObject = [],
  DistintionClass,
  setUpdateSignal,
}: {
  targetId: string;
  setTargetId: Function;
  listOfObject: object[];
  DistintionClass: any;
  setUpdateSignal: Function;
}) {
  const [viewLengthPerPage, setViewLengthPerPage] = useState(5);

  const targetIndex = getTargetIndex(listOfObject, targetId);

  const [currentPageIndex, setPageIndex] = useState(
    Math.trunc(targetIndex / viewLengthPerPage + 1)
  );

  if (listOfObject.length === 0) {
    return <div />;
  }

  return (
    <div>
      {listOfObject.length === 0 ? null : (
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
            targetId={targetId}
            setTargetId={setTargetId}
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
      )}
    </div>
  );
}

function getTargetIndex(listOfObject: any[], targetId: string) {
  for (let i = 0; i < listOfObject.length; i++) {
    if (listOfObject[i]._id === targetId) {
      return i;
    }
  }

  return 0;
}
