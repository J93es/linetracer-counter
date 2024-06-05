import { useState } from "react";
import SelectTarget from "component/utils/selectTarget/Index";
import ParticipantDistintion from "model/distinction/ParticipantDistinction";
import PostParticipant from "component/admin/editer/participantEditer/PostParticipant";
import PutParticipant from "component/admin/editer/participantEditer/PutParticipant";
import PutRobot from "component/admin/editer/participantEditer/PutRobot";
import DeleteParticipantBtn from "component/admin/editer/participantEditer/DeleteParticipantBtn";
import DropDown from "component/utils/DropDown";
import Accordion from "component/utils/Accordion";

import { ContestType } from "model/Contest";
import { ParticipantType } from "model/Participant";
import { participantEditMenuEnum } from "model/enums/index";

export default function ParticipantEditer({
  setParticipantUpdateSignal,
  participantList,
  targetParticipant,
  setTargetParticipant,
  targetContest,
}: {
  setParticipantUpdateSignal: React.Dispatch<React.SetStateAction<number>>;
  participantList: ParticipantType[] | undefined;
  targetParticipant: ParticipantType | undefined;
  setTargetParticipant: Function;
  targetContest: ContestType | undefined;
}) {
  const [editMenu, setEditMenu] = useState<string>(participantEditMenuEnum[0]);

  let editMenuHtml = null;

  if (!targetContest) {
    editMenuHtml = <p>경연을 선택하세요.</p>;
  } else if (editMenu === "참가자 추가") {
    editMenuHtml = (
      <PostParticipant
        targetParticipant={targetParticipant}
        setParticipantUpdateSignal={setParticipantUpdateSignal}
        targetContestId={targetContest?.id}
      />
    );
  } else if (!participantList) {
    editMenuHtml = <p>참가자가 없습니다.</p>;
  } else if (!targetParticipant) {
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
