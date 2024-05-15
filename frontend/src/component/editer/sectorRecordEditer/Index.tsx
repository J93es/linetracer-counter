import { useState } from "react";
import SelectTarget from "component/utils/selectTarget/Index";
import SectorRecordDistintion from "model/distinction/SectorRecordDistinction";
import PostSectorRecord from "component/editer/sectorRecordEditer/PostSectorRecord";
import PutSectorRecord from "component/editer/sectorRecordEditer/PutSectorRecord";
import DeleteSectorRecordBtn from "component/editer/sectorRecordEditer/DeleteSectorRecordBtn";
import DropDown from "component/utils/DropDown";
import Accordion from "component/utils/Accordion";

import { ParticipantType } from "model/Participant";
import { SectorRecordType } from "model/SectorRecord";
import { sectorRecordEditMenuEnum } from "model/enums/index";
import { isEmptyArray, isEmptyObject } from "tools/utils";

import { filterStringBySectorEnum } from "model/enums";

export default function SectorRecordEditer({
  setSectorRecordUpdateSignal,
  sectorRecordList,
  targetSectorRecord,
  setTargetSectorRecord,
  targetParticipant,
  filterStringBySector,
  setFilterStringBySector,
}: {
  setSectorRecordUpdateSignal: Function;
  sectorRecordList: object[];
  targetSectorRecord: Partial<SectorRecordType>;
  setTargetSectorRecord: Function;
  targetParticipant: Partial<ParticipantType>;
  filterStringBySector: string;
  setFilterStringBySector: Function;
}) {
  const [editMenu, setEditMenu] = useState<string>(sectorRecordEditMenuEnum[0]);

  let editMenuHtml = null;
  if (isEmptyObject(targetParticipant)) {
    editMenuHtml = <p>참가자를 선택하세요.</p>;
  } else if (editMenu === "부문 기록 추가") {
    editMenuHtml = (
      <PostSectorRecord
        targetSectorRecord={targetSectorRecord}
        setSectorRecordUpdateSignal={setSectorRecordUpdateSignal}
        targetParticipantId={targetParticipant._id}
      />
    );
  } else if (isEmptyArray(sectorRecordList)) {
    editMenuHtml = <p>부문 기록이 없습니다.</p>;
  } else if (isEmptyObject(targetSectorRecord)) {
    editMenuHtml = <p>부문 기록을 선택하세요.</p>;
  } else if (editMenu === "부문 기록 수정") {
    editMenuHtml = (
      <PutSectorRecord
        setSectorRecordUpdateSignal={setSectorRecordUpdateSignal}
        targetSectorRecord={targetSectorRecord}
      />
    );
  } else if (editMenu === "부문 기록 삭제") {
    editMenuHtml = (
      <DeleteSectorRecordBtn
        setSectorRecordUpdateSignal={setSectorRecordUpdateSignal}
        targetSectorRecord={targetSectorRecord}
      />
    );
  }

  return (
    <Accordion
      id="sector-record-Editer"
      title="부문 기록 편집"
      body={
        <div className="sector-record-Editer">
          <DropDown
            target={filterStringBySector}
            onClick={setFilterStringBySector}
            menuList={filterStringBySectorEnum}
          />

          <SelectTarget
            target={targetSectorRecord}
            setTarget={setTargetSectorRecord}
            listOfObject={sectorRecordList}
            DistintionClass={SectorRecordDistintion}
            setUpdateSignal={() => {
              setSectorRecordUpdateSignal((prev: number) => (prev + 1) % 1000);
            }}
            disabled={false}
          />

          <DropDown
            target={editMenu}
            onClick={setEditMenu}
            menuList={sectorRecordEditMenuEnum}
          />

          {editMenuHtml}
        </div>
      }
    />
  );
}
