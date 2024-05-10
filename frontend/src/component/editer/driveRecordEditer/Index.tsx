import { useState } from "react";
import PostDriveRecord from "component/editer/driveRecordEditer/PostDriveRecord";
import PutDriveRecord from "component/editer/driveRecordEditer/PutDriveRecord";
import DeleteDriveRecordBtn from "component/editer/driveRecordEditer/DeleteDriveRecordBtn";
import SelectTarget from "component/utils/selectTarget/Index";
import DropDown from "component/utils/DropDown";
import Accordion from "component/utils/Accordion";

import DriveRecordDistinction from "model/distinction/DriveRecordDistinction";
import { DriveRecordType } from "model/DriveRecord";
import { SectorRecordType } from "model/SectorRecord";

import { isEmptyArray, isEmptyObject } from "tools/utils";

import { driveRecordEditMenuEnum } from "model/enums/index";

export default function DriveRecordEditer({
  setDriveRecordUpdateSignal,
  targetDriveRecord,
  setTargetDriveRecord,
  driveRecordList,
  targetSectorRecord,
}: {
  setDriveRecordUpdateSignal: Function;
  targetDriveRecord: Partial<DriveRecordType>;
  setTargetDriveRecord: Function;
  driveRecordList: object[];
  targetSectorRecord: Partial<SectorRecordType>;
}) {
  const [editMenu, setEditMenu] = useState<string>(driveRecordEditMenuEnum[0]);

  let editMenuHtml = null;

  const emptySectorRecordMessage = <p>부문 기록을 선택하세요.</p>;
  const emptyDriveRecordListMessage = <p>주행 기록이 없습니다.</p>;
  const emptyDriveRecordMessage = <p>주행 기록을 선택하세요.</p>;

  if (isEmptyObject(targetSectorRecord)) {
    editMenuHtml = emptySectorRecordMessage;
  } else if (editMenu === "주행 기록 추가") {
    editMenuHtml = (
      <PostDriveRecord
        targetDriveRecord={targetDriveRecord}
        setDriveRecordUpdateSignal={setDriveRecordUpdateSignal}
        targetSectorRecordId={targetSectorRecord._id}
      />
    );
  } else if (isEmptyArray(driveRecordList)) {
    editMenuHtml = emptyDriveRecordListMessage;
  } else if (isEmptyObject(targetDriveRecord)) {
    editMenuHtml = emptyDriveRecordMessage;
  } else if (editMenu === "주행 기록 수정") {
    editMenuHtml = (
      <PutDriveRecord
        setDriveRecordUpdateSignal={setDriveRecordUpdateSignal}
        targetDriveRecord={targetDriveRecord}
        targetSectorRecordId={targetSectorRecord._id}
      />
    );
  } else if (editMenu === "주행 기록 삭제") {
    editMenuHtml = (
      <DeleteDriveRecordBtn
        setDriveRecordUpdateSignal={setDriveRecordUpdateSignal}
        targetDriveRecord={targetDriveRecord}
        targetSectorRecordId={targetSectorRecord._id}
      />
    );
  }

  return (
    <Accordion
      id="drive-record-Editer"
      title="주행 기록 편집"
      body={
        <div className="drive-record-Editer">
          <SelectTarget
            target={targetDriveRecord}
            setTarget={setTargetDriveRecord}
            listOfObject={driveRecordList}
            DistintionClass={DriveRecordDistinction}
            setUpdateSignal={() => {
              setDriveRecordUpdateSignal((prev: number) => (prev + 1) % 1000);
            }}
            disabled={false}
          />

          <DropDown
            target={editMenu}
            onClick={setEditMenu}
            menuList={driveRecordEditMenuEnum}
          />

          {editMenuHtml}
        </div>
      }
    />
  );
}
