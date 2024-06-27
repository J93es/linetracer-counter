import Body from "pages/display_board/view/body/Index";

import { ContestType } from "pages/display_board/model/Contest";
import { ParticipantType } from "pages/display_board/model/Participant";

import { SectorRecordType } from "pages/display_board/model/SectorRecord";

import "pages/display_board/view/Index.css";

export default function View({
  targetContest,
  isContestTimerRunning,
  curSectorRecord,
  curParticipant,
  nextParticipant,
  participantList,
}: {
  targetContest: ContestType | undefined;
  isContestTimerRunning: boolean;
  curSectorRecord: SectorRecordType | undefined;
  curParticipant: ParticipantType | undefined;
  nextParticipant: ParticipantType | undefined;
  participantList: ParticipantType[] | undefined;
}) {
  return (
    <div className="display-board-view">
      <Body
        targetContest={targetContest}
        isContestTimerRunning={isContestTimerRunning}
        curSectorRecord={curSectorRecord}
        curParticipant={curParticipant}
        nextParticipant={nextParticipant}
        participantList={participantList}
      />
    </div>
  );
}
