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

import { filterStringBySectorEnum } from "model/enums";

export default function ParticipantEditer({
  setParticipantUpdateSignal,
  participantList,
  targetParticipant,
  setTargetParticipant,
  targetContest,
  filterStringBySector,
  setFilterStringBySector,
}: {
  setParticipantUpdateSignal: Function;
  participantList: object[];
  targetParticipant: Partial<ParticipantType>;
  setTargetParticipant: Function;
  targetContest: Partial<ContestType>;
  filterStringBySector: string;
  setFilterStringBySector: Function;
}) {
  const [editMenu, setEditMenu] = useState<string>(participantEditMenuEnum[0]);

  let editMenuHtml = null;
  const emptyContestMessage = <p>경연을 선택하세요.</p>;
  const emptyParticipantListMessage = <p>참가자가 없습니다.</p>;
  const emptyParticipantMessage = <p>참가자를 선택하세요.</p>;

  if (isEmptyObject(targetContest)) {
    editMenuHtml = emptyContestMessage;
  } else if (editMenu === "참가자 추가") {
    editMenuHtml = (
      <PostParticipant
        targetParticipant={targetParticipant}
        setParticipantUpdateSignal={setParticipantUpdateSignal}
        targetContestId={targetContest._id}
      />
    );
  } else if (isEmptyArray(participantList)) {
    editMenuHtml = emptyParticipantListMessage;
  } else if (isEmptyObject(targetParticipant)) {
    editMenuHtml = emptyParticipantMessage;
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
          <DropDown
            target={filterStringBySector}
            onClick={setFilterStringBySector}
            menuList={filterStringBySectorEnum}
          />
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
