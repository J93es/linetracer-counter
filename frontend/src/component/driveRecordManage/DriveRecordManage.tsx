import { useState } from "react";
import PostDriveRecord from "component/driveRecordManage/PostDriveRecord";
import PutDriveRecord from "component/driveRecordManage/PutDriveRecord";
import DeleteDriveRecordBtn from "component/driveRecordManage/DeleteDriveRecordBtn";
import SelectTarget from "component/utils/selectTarget/SelectTarget";
import DropDown from "component/utils/DropDown";
import Accordion from "component/utils/Accordion";

import DriveRecordDistinction from "model/distinction/DriveRecordDistinction";
import { DriveRecordType } from "model/DriveRecord";

import { isNotEmptyObject } from "tools/utils";

import { driveRecordEditMenuEnum } from "model/enums/index";

export default function DriveRecordManage({
  setDriveRecordUpdateSignal,
  targetDriveRecord,
  setTargetDriveRecord,
  driveRecordList,
  targetParticipantRecord,
}: {
  setDriveRecordUpdateSignal: Function;
  targetDriveRecord: Partial<DriveRecordType>;
  setTargetDriveRecord: Function;
  driveRecordList: object[];
  targetParticipantRecord: Partial<DriveRecordType>;
}) {
  const [editMenu, setEditMenu] = useState<string>(driveRecordEditMenuEnum[0]);

  let editMenuHtml = null;

  if (editMenu === "주행 기록 추가") {
    editMenuHtml = (
      <PostDriveRecord
        targetDriveRecord={targetDriveRecord}
        setDriveRecordUpdateSignal={setDriveRecordUpdateSignal}
        curParticipantRecordId={targetParticipantRecord._id}
      />
    );
  }

  if (editMenu === "주행 기록 수정") {
    if (isNotEmptyObject(targetDriveRecord)) {
      editMenuHtml = (
        <PutDriveRecord
          setDriveRecordUpdateSignal={setDriveRecordUpdateSignal}
          targetDriveRecord={targetDriveRecord}
          curParticipantRecordId={targetParticipantRecord._id}
        />
      );
    } else {
      editMenuHtml = <p>참가자 기록을 선택하세요.</p>;
    }
  }

  if (editMenu === "주행 기록 삭제") {
    if (isNotEmptyObject(targetDriveRecord)) {
      editMenuHtml = (
        <DeleteDriveRecordBtn
          setDriveRecordUpdateSignal={setDriveRecordUpdateSignal}
          targetDriveRecord={targetDriveRecord}
          curParticipantRecordId={targetParticipantRecord._id}
        />
      );
    } else {
      editMenuHtml = <p>참가자 기록을 선택하세요.</p>;
    }
  }

  return (
    <Accordion
      id="drive-record-manage"
      title="주행 기록 관리"
      body={
        <div className="drive-record-manage">
          <SelectTarget
            target={targetDriveRecord}
            setTarget={setTargetDriveRecord}
            listOfObject={driveRecordList}
            DistintionClass={DriveRecordDistinction}
            setUpdateSignal={() => {
              setDriveRecordUpdateSignal((prev: number) => (prev + 1) % 1000);
            }}
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
