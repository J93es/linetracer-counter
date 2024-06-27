import { ContestType } from "pages/display_board/model/Contest";
import { ParticipantType } from "pages/display_board/model/Participant";
import { SectorRecordType } from "pages/display_board/model/SectorRecord";

import ContestTimer from "pages/display_board/view/body/ContestTimer";
import DriveStopWatch from "pages/display_board/view/body/DriveStopWatch";
import CurRanking from "pages/display_board/view/body/CurRanking";
import CurParticipant from "pages/display_board/view/body/CurParticipant";
import CurRobot from "pages/display_board/view/body/CurRobot";
import NextParticipant from "pages/display_board/view/body/NextParticipant";

import "pages/display_board/view/body/Index.css";

export default function Body({
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
    <div className="display-board-body">
      <div className="display-board-body-col-1">
        <ContestTimer
          targetContest={targetContest}
          curSectorRecord={curSectorRecord}
          isContestTimerRunning={isContestTimerRunning}
        />

        <DriveStopWatch targetContest={targetContest} />

        <CurRanking participantList={participantList} />
      </div>
      <div className="display-board-body-col-2">
        <CurParticipant curParticipant={curParticipant} />
      </div>
      <div className="display-board-body-col-3">
        <CurRobot curParticipant={curParticipant} />
        <NextParticipant nextParticipant={nextParticipant} />
      </div>
    </div>
  );
}
