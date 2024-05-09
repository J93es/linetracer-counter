import SelectTarget from "component/utils/selectTarget/Index";
import ParticipantDistintion from "model/distinction/ParticipantDistinction";
import Accordion from "component/utils/Accordion";

import { ParticipantType } from "model/Participant";

import { isNotEmptyArray, isNotEmptyObject } from "tools/utils";

export default function ParticipantManager({
  setParticipantUpdateSignal,
  participantList,
  targetParticipant,
  setTargetParticipant,
  isContestTimerRunning,
}: {
  setParticipantUpdateSignal: Function;
  participantList: object[];
  targetParticipant: Partial<ParticipantType>;
  setTargetParticipant: Function;
  isContestTimerRunning: boolean;
}) {
  let messageHtml = null;
  const emptyParticipantListListMessage = (
    <p>
      현재 진행 부문에 속한 <br />
      참가자가 없습니다
    </p>
  );
  const emptyParticipantMessage = <p>참가자를 선택하세요.</p>;

  if (!isNotEmptyArray(participantList)) {
    messageHtml = emptyParticipantListListMessage;
  } else if (!isNotEmptyObject(targetParticipant)) {
    messageHtml = emptyParticipantMessage;
  }
  return (
    <Accordion
      id="participant-Manager"
      title="현재 참가자 관리"
      body={
        <div className="participant-Manager">
          <SelectTarget
            target={targetParticipant}
            setTarget={setTargetParticipant}
            listOfObject={participantList}
            DistintionClass={ParticipantDistintion}
            setUpdateSignal={() => {
              setParticipantUpdateSignal((prev: number) => (prev + 1) % 1000);
            }}
            disabled={isContestTimerRunning}
          />

          {messageHtml}
        </div>
      }
    />
  );
}
