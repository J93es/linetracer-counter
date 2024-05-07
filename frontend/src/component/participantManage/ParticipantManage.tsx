import { useState } from "react";
import SelectTarget from "component/utils/selectTarget/SelectTarget";
import ParticipantDistintion from "model/distinction/ParticipantDistinction";
import PostParticipant from "component/participantManage/PostParticipant";
import PutParticipant from "component/participantManage/PutParticipant";
import PutRobot from "component/participantManage/PutRobot";
import DeleteParticipantBtn from "component/participantManage/DeleteParticipantBtn";
import DropDown from "component/utils/DropDown";
import Accordion from "component/utils/Accordion";

import { ContestType } from "model/Contest";
import { ParticipantType } from "model/Participant";
import { participantEditMenuEnum } from "model/enums/index";
import { isNotEmptyObject } from "tools/utils";

export default function ParticipantManage({
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

  if (editMenu === "참가자 추가") {
    if (isNotEmptyObject(targetContest)) {
      editMenuHtml = (
        <PostParticipant
          targetParticipant={targetParticipant}
          setParticipantUpdateSignal={setParticipantUpdateSignal}
          curContestId={targetContest._id}
        />
      );
    }
  }

  if (editMenu === "참가자 수정") {
    if (isNotEmptyObject(targetParticipant)) {
      editMenuHtml = (
        <PutParticipant
          setParticipantUpdateSignal={setParticipantUpdateSignal}
          targetParticipant={targetParticipant}
        />
      );
    } else {
      editMenuHtml = <p>참가자를 선택하세요.</p>;
    }
  }

  if (editMenu === "로봇 등록/수정") {
    if (isNotEmptyObject(targetParticipant)) {
      editMenuHtml = (
        <PutRobot
          setParticipantUpdateSignal={setParticipantUpdateSignal}
          targetParticipant={targetParticipant}
        />
      );
    } else {
      editMenuHtml = <p>참가자를 선택하세요.</p>;
    }
  }

  if (editMenu === "참가자 삭제") {
    if (isNotEmptyObject(targetParticipant)) {
      editMenuHtml = (
        <DeleteParticipantBtn
          setParticipantUpdateSignal={setParticipantUpdateSignal}
          targetParticipant={targetParticipant}
        />
      );
    } else {
      editMenuHtml = <p>참가자를 선택하세요.</p>;
    }
  }

  return (
    <Accordion
      id="participant-manage"
      title="참가자 관리"
      body={
        <div className="participant-manage">
          <SelectTarget
            target={targetParticipant}
            setTarget={setTargetParticipant}
            listOfObject={participantList}
            DistintionClass={ParticipantDistintion}
            setUpdateSignal={() => {
              setParticipantUpdateSignal((prev: number) => (prev + 1) % 1000);
            }}
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
