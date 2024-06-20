import { ParticipantInfoType } from "component/displayBoard/model/ParticipantInfo";
import DisplayCard from "component/displayBoard/view/body/DisplayCard";

import "component/displayBoard/view/body/NextParticipant.css";

export default function NextParticipant({
  nextParticipantInfo,
}: {
  nextParticipantInfo: ParticipantInfoType | undefined;
}) {
  return (
    <div className="next-participant shadow">
      <DisplayCard
        htmlElement={
          <div className="next-participant-cont">
            <h4 className="next-participant-title">다음 참가자</h4>

            <div className="next-particiapnt-name">
              이름 : {nextParticipantInfo?.name ?? "--"}
            </div>

            <div className="next-particiapnt-association">
              소속 : {nextParticipantInfo?.association ?? "--"}
            </div>
          </div>
        }
      />
    </div>
  );
}
