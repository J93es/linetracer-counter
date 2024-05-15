import { ParticipantType } from "model/Participant";

import "component/display/ContestTimer.css";

export default function CurParticipant({
  curParticipant,
}: {
  curParticipant: Partial<ParticipantType>;
}) {
  return (
    <div className="cur-participant-card shadow">
      <h4 className="cur-participant-message">현재 참가자</h4>
    </div>
  );
}
