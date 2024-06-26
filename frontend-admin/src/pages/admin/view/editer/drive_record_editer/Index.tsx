import { useState } from "react";
import PostDriveRecord from "pages/admin/view/editer/drive_record_editer/PostDriveRecord";
import PutDriveRecord from "pages/admin/view/editer/drive_record_editer/PutDriveRecord";
import DeleteDriveRecordBtn from "pages/admin/view/editer/drive_record_editer/DeleteDriveRecordBtn";
import SelectTarget from "pages/admin/component/select_target/Index";
import DropDown from "pages/admin/component/DropDown";
import Accordion from "pages/admin/component/Accordion";

import DriveRecordDistinction from "pages/admin/model/distinction/DriveRecordDistinction";
import { DriveRecordType } from "pages/admin/model/DriveRecord";
import { SectorRecordType } from "pages/admin/model/SectorRecord";

import { driveRecordEditMenuEnum } from "pages/admin/model/enums/index";

export default function DriveRecordEditer({
  setDriveRecordUpdateSignal,
  targetDriveRecord,
  setTargetDriveRecord,
  driveRecordList,
  targetSectorRecord,
}: {
  setDriveRecordUpdateSignal: React.Dispatch<React.SetStateAction<number>>;
  targetDriveRecord: DriveRecordType | undefined;
  setTargetDriveRecord: Function;
  driveRecordList: DriveRecordType[] | undefined;
  targetSectorRecord: SectorRecordType | undefined;
}) {
  const [editMenu, setEditMenu] = useState<string>(driveRecordEditMenuEnum[0]);

  let editMenuHtml = null;
  if (!targetSectorRecord) {
    editMenuHtml = <p>부문 기록을 선택하세요.</p>;
  } else if (editMenu === "주행 기록 추가") {
    editMenuHtml = (
      <PostDriveRecord
        targetDriveRecord={targetDriveRecord}
        setDriveRecordUpdateSignal={setDriveRecordUpdateSignal}
        targetSectorRecordId={targetSectorRecord?.id}
      />
    );
  } else if (!driveRecordList) {
    editMenuHtml = <p>주행 기록이 없습니다.</p>;
  } else if (!targetDriveRecord) {
    editMenuHtml = <p>주행 기록을 선택하세요.</p>;
  } else if (editMenu === "주행 기록 수정") {
    editMenuHtml = (
      <PutDriveRecord
        setDriveRecordUpdateSignal={setDriveRecordUpdateSignal}
        targetDriveRecord={targetDriveRecord}
      />
    );
  } else if (editMenu === "주행 기록 삭제") {
    editMenuHtml = (
      <DeleteDriveRecordBtn
        setDriveRecordUpdateSignal={setDriveRecordUpdateSignal}
        targetDriveRecord={targetDriveRecord}
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
