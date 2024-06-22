import { ContestType } from "pages/display_board/model/Contest";
import { ParticipantInfoType } from "pages/display_board/model/ParticipantInfo";
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
  curParticipantInfo,
  nextParticipantInfo,
  participantInfoList,
}: {
  targetContest: ContestType | undefined;
  isContestTimerRunning: boolean;
  curSectorRecord: SectorRecordType | undefined;
  curParticipantInfo: ParticipantInfoType | undefined;
  nextParticipantInfo: ParticipantInfoType | undefined;
  participantInfoList: ParticipantInfoType[] | undefined;
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

        <CurRanking participantInfoList={participantInfoList} />
      </div>
      <div className="display-board-body-col-2">
        <CurParticipant curParticipantInfo={curParticipantInfo} />
      </div>
      <div className="display-board-body-col-3">
        <CurRobot curParticipantInfo={curParticipantInfo} />
        <NextParticipant nextParticipantInfo={nextParticipantInfo} />
      </div>
    </div>
  );
}
