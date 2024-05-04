import SelectId from "component/selectId/SelectId";
import ParticipantDistintion from "model/distinction/ParticipantDistinction";
import PostParticipant from "component/participantManage/PostParticipant";
import PutParticipant from "component/participantManage/PutParticipant";
import PutRobot from "component/participantManage/PutRobot";
import DeleteParticipantBtn from "component/participantManage/DeleteParticipantBtn";

import { ParticipantType } from "model/Participant";

export default function ParticipantManage({
  setParticipantUpdateSignal,
  participantList,
  targetParticipantId,
  setTargetParticipantId,
  targetParticipant,
  curContestId,
}: {
  setParticipantUpdateSignal: Function;
  participantList: object[];
  targetParticipantId: string;
  setTargetParticipantId: Function;
  targetParticipant: Partial<ParticipantType>;
  curContestId: string;
}) {
  return (
    <div>
      {/* manage targetParticipantId  */}
      <SelectId
        targetId={targetParticipantId}
        setTargetId={setTargetParticipantId}
        listOfObject={participantList}
        DistintionClass={ParticipantDistintion}
        setUpdateSignal={() => {
          setParticipantUpdateSignal((prev: number) => (prev + 1) % 1000);
        }}
      />

      {/* post targetParticipant */}
      <PostParticipant
        setParticipantUpdateSignal={setParticipantUpdateSignal}
        curContestId={curContestId}
      />

      {/* put targetParticipant */}
      <PutParticipant
        setParticipantUpdateSignal={setParticipantUpdateSignal}
        targetParticipantId={targetParticipantId}
      />

      <PutRobot
        setParticipantUpdateSignal={setParticipantUpdateSignal}
        targetParticipantId={targetParticipantId}
        targetParticipant={targetParticipant}
      />

      {/* delete targetParticipant */}
      <DeleteParticipantBtn
        setParticipantUpdateSignal={setParticipantUpdateSignal}
        targetParticipantId={targetParticipantId}
      />
    </div>
  );
}
