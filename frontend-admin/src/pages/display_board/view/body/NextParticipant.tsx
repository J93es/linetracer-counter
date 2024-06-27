import { ParticipantType } from "pages/display_board/model/Participant";
import DisplayCard from "pages/display_board/component/DisplayCard";

import "pages/display_board/view/body/NextParticipant.css";

export default function NextParticipant({
  nextParticipant,
}: {
  nextParticipant: ParticipantType | undefined;
}) {
  return (
    <div className="next-participant shadow">
      <DisplayCard
        htmlElement={
          <div className="next-participant-cont">
            <h4 className="next-participant-title">다음 참가자</h4>

            <div className="next-particiapnt-name">
              이름 : {nextParticipant?.name ?? "--"}
            </div>

            <div className="next-particiapnt-association">
              소속 : {nextParticipant?.association ?? "--"}
            </div>
          </div>
        }
      />
    </div>
  );
}
