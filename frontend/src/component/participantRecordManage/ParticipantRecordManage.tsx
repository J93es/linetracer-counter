import { useState } from "react";
import SelectTarget from "component/utils/selectTarget/SelectTarget";
import ParticipantRecordDistintion from "model/distinction/ParticipantRecordDistinction";
import PostParticipantRecord from "component/participantRecordManage/PostParticipantRecord";
import PutParticipantRecord from "component/participantRecordManage/PutParticipantRecord";
import DeleteParticipantRecordBtn from "component/participantRecordManage/DeleteParticipantRecordBtn";
import DropDown from "component/utils/DropDown";
import Accordion from "component/utils/Accordion";

import { ParticipantType } from "model/Participant";
import { ParticipantRecordType } from "model/ParticipantRecord";
import { participantRecordEditMenuEnum } from "model/enums/index";
import { isNotEmptyObject } from "tools/utils";

export default function ParticipantRecordManage({
  setParticipantRecordUpdateSignal,
  participantRecordList,
  targetParticipantRecord,
  setTargetParticipantRecord,
  targetParticipant,
}: {
  setParticipantRecordUpdateSignal: Function;
  participantRecordList: object[];
  targetParticipantRecord: Partial<ParticipantRecordType>;
  setTargetParticipantRecord: Function;
  targetParticipant: Partial<ParticipantType>;
}) {
  const [editMenu, setEditMenu] = useState<string>(
    participantRecordEditMenuEnum[0]
  );

  let editMenuHtml = null;

  if (editMenu === "참가자 기록 추가") {
    if (isNotEmptyObject(targetParticipant)) {
      editMenuHtml = (
        <PostParticipantRecord
          targetParticipantRecord={targetParticipantRecord}
          setParticipantRecordUpdateSignal={setParticipantRecordUpdateSignal}
          curParticipantId={targetParticipant._id}
        />
      );
    }
  }

  if (editMenu === "참가자 기록 수정") {
    if (isNotEmptyObject(targetParticipantRecord)) {
      editMenuHtml = (
        <PutParticipantRecord
          setParticipantRecordUpdateSignal={setParticipantRecordUpdateSignal}
          targetParticipantRecord={targetParticipantRecord}
        />
      );
    } else {
      editMenuHtml = <p>참가자를 기록을 선택하세요.</p>;
    }
  }

  if (editMenu === "참가자 기록 삭제") {
    if (isNotEmptyObject(targetParticipantRecord)) {
      editMenuHtml = (
        <DeleteParticipantRecordBtn
          setParticipantRecordUpdateSignal={setParticipantRecordUpdateSignal}
          targetParticipantRecord={targetParticipantRecord}
        />
      );
    } else {
      editMenuHtml = <p>참가자를 기록을 선택하세요.</p>;
    }
  }

  return (
    <Accordion
      id="participant-record-manage"
      title="참가자 기록 관리"
      body={
        <div className="participant-record-manage">
          <SelectTarget
            target={targetParticipantRecord}
            setTarget={setTargetParticipantRecord}
            listOfObject={participantRecordList}
            DistintionClass={ParticipantRecordDistintion}
            setUpdateSignal={() => {
              setParticipantRecordUpdateSignal(
                (prev: number) => (prev + 1) % 1000
              );
            }}
          />

          <DropDown
            target={editMenu}
            onClick={setEditMenu}
            menuList={participantRecordEditMenuEnum}
          />

          {editMenuHtml}
        </div>
      }
    />
  );
}
