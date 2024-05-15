import { useState } from "react";
import SelectTarget from "component/utils/selectTarget/Index";
import ParticipantDistintion from "model/distinction/ParticipantDistinction";
import PostParticipant from "component/editer/participantEditer/PostParticipant";
import PutParticipant from "component/editer/participantEditer/PutParticipant";
import PutRobot from "component/editer/participantEditer/PutRobot";
import DeleteParticipantBtn from "component/editer/participantEditer/DeleteParticipantBtn";
import DropDown from "component/utils/DropDown";
import Accordion from "component/utils/Accordion";

import { ContestType } from "model/Contest";
import { ParticipantType } from "model/Participant";
import { participantEditMenuEnum } from "model/enums/index";
import { isEmptyArray, isEmptyObject } from "tools/utils";

export default function ParticipantEditer({
  setParticipantUpdateSignal,
  participantList,
  targetParticipant,
  setTargetParticipant,
  targetContest,
}: {
  setParticipantUpdateSignal: Function;
  participantList: object[];
  targetParticipant: Partial<ParticipantType>;
  setTargetParticipant: Function;
  targetContest: Partial<ContestType>;
}) {
  const [editMenu, setEditMenu] = useState<string>(participantEditMenuEnum[0]);

  let editMenuHtml = null;

  if (isEmptyObject(targetContest)) {
    editMenuHtml = <p>경연을 선택하세요.</p>;
  } else if (editMenu === "참가자 추가") {
    editMenuHtml = (
      <PostParticipant
        targetParticipant={targetParticipant}
        setParticipantUpdateSignal={setParticipantUpdateSignal}
        targetContestId={targetContest._id}
      />
    );
  } else if (isEmptyArray(participantList)) {
    editMenuHtml = <p>참가자가 없습니다.</p>;
  } else if (isEmptyObject(targetParticipant)) {
    editMenuHtml = <p>참가자를 선택하세요.</p>;
  } else if (editMenu === "참가자 수정") {
    editMenuHtml = (
      <PutParticipant
        setParticipantUpdateSignal={setParticipantUpdateSignal}
        targetParticipant={targetParticipant}
      />
    );
  } else if (editMenu === "로봇 등록/수정") {
    editMenuHtml = (
      <PutRobot
        setParticipantUpdateSignal={setParticipantUpdateSignal}
        targetParticipant={targetParticipant}
      />
    );
  } else if (editMenu === "참가자 삭제") {
    editMenuHtml = (
      <DeleteParticipantBtn
        setParticipantUpdateSignal={setParticipantUpdateSignal}
        targetParticipant={targetParticipant}
      />
    );
  }

  return (
    <Accordion
      id="participant-Editer"
      title="참가자 편집"
      body={
        <div className="participant-Editer">
          <SelectTarget
            target={targetParticipant}
            setTarget={setTargetParticipant}
            listOfObject={participantList}
            DistintionClass={ParticipantDistintion}
            setUpdateSignal={() => {
              setParticipantUpdateSignal((prev: number) => (prev + 1) % 1000);
            }}
            disabled={false}
          />

          <DropDown
            target={editMenu}
            onClick={setEditMenu}
            menuList={participantEditMenuEnum}
          />

          {editMenuHtml}
        </div>
      }
    />
  );
}
