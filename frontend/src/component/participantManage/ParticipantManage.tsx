import { useState } from "react";
import SelectTarget from "component/utils/selectTarget/SelectTarget";
import ParticipantDistintion from "model/distinction/ParticipantDistinction";
import PostParticipant from "component/participantManage/PostParticipant";
import PutParticipant from "component/participantManage/PutParticipant";
import PutRobot from "component/participantManage/PutRobot";
import DeleteParticipantBtn from "component/participantManage/DeleteParticipantBtn";
import DropDown from "component/utils/DropDown";

import { ParticipantType } from "model/Participant";
import { participantEditTypeEnum } from "model/enums/index";
import { isNotEmptyObject } from "tools/utils";

export default function ParticipantManage({
  setParticipantUpdateSignal,
  participantList,
  targetParticipant,
  setTargetParticipant,
  curContestId,
}: {
  setParticipantUpdateSignal: Function;
  participantList: object[];
  targetParticipant: Partial<ParticipantType>;
  setTargetParticipant: Function;
  curContestId: string;
}) {
  const [editType, setEditType] = useState<string>(participantEditTypeEnum[0]);

  const editHtmlList = [];

  if (editType === "참가자 추가") {
    editHtmlList.push(
      <PostParticipant
        targetParticipant={targetParticipant}
        setParticipantUpdateSignal={setParticipantUpdateSignal}
        curContestId={curContestId}
      />
    );
  }

  if (editType === "참가자 수정") {
    if (isNotEmptyObject(targetParticipant)) {
      editHtmlList.push(
        <PutParticipant
          setParticipantUpdateSignal={setParticipantUpdateSignal}
          targetParticipant={targetParticipant}
        />
      );
    } else {
      editHtmlList.push(<a>참가자를 선택하세요.</a>);
    }
  }

  if (editType === "로봇 등록/수정") {
    if (isNotEmptyObject(targetParticipant)) {
      editHtmlList.push(
        <PutRobot
          setParticipantUpdateSignal={setParticipantUpdateSignal}
          targetParticipant={targetParticipant}
        />
      );
    } else {
      editHtmlList.push(<a>참가자를 선택하세요.</a>);
    }
  }

  if (editType === "참가자 삭제") {
    if (isNotEmptyObject(targetParticipant)) {
      editHtmlList.push(
        <DeleteParticipantBtn
          setParticipantUpdateSignal={setParticipantUpdateSignal}
          targetParticipant={targetParticipant}
        />
      );
    } else {
      editHtmlList.push(<a>참가자를 선택하세요.</a>);
    }
  }

  return (
    <div>
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
        target={editType}
        onClick={setEditType}
        menuList={participantEditTypeEnum}
      />

      {editHtmlList}
    </div>
  );
}
