import { useState } from "react";
import SetViewLength from "component/SelectId/SetViewLength";
import ListGroup from "component/SelectId/ListGroup";
import PaginationBar from "component/SelectId/PaginationBar";

export default function SelectId({
  targetId,
  setTargetId,
  listOfObject = [],
  DistintionClass,
}: {
  targetId: string;
  setTargetId: Function;
  listOfObject: object[];
  DistintionClass: any;
}) {
  const [viewLengthPerPage, setViewLengthPerPage] = useState(5);

  const targetIndex = getTargetIndex(listOfObject, targetId);

  const [currentPageIndex, setPageIndex] = useState(
    Math.trunc(targetIndex / viewLengthPerPage + 1)
  );

  return (
    <div>
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
