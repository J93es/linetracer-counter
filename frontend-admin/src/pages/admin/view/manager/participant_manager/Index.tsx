import SelectTarget from "pages/admin/component/select_target/Index";
import ParticipantDistintion from "pages/admin/model/distinction/ParticipantDistinction";
import Accordion from "pages/admin/component/Accordion";

import { ParticipantType } from "pages/admin/model/Participant";

export default function ParticipantManager({
  setParticipantUpdateSignal,
  participantList,
  targetParticipant,
  setTargetParticipant,
  isBlocked,
}: {
  setParticipantUpdateSignal: React.Dispatch<React.SetStateAction<number>>;
  participantList: object[] | undefined;
  targetParticipant: ParticipantType | undefined;
  setTargetParticipant: Function;
  isBlocked: boolean;
}) {
  let messageHtml = null;
  if (isBlocked) {
    messageHtml = <p>선택이 불가능 합니다.</p>;
  } else if (!participantList) {
    messageHtml = (
      <p>
        현재 진행 부문에 속한 <br />
        참가자가 없습니다.
      </p>
    );
  } else if (!targetParticipant) {
    messageHtml = <p>참가자를 선택하세요.</p>;
  }

  return (
    <Accordion
      id="participant-Manager"
      title="참가자 선택"
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
            disabled={isBlocked}
          />

          {messageHtml}
        </div>
      }
    />
  );
}
