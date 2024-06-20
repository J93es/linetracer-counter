import { ContestType } from "pages/displayBoard/model/Contest";
import { ParticipantInfoType } from "pages/displayBoard/model/ParticipantInfo";
import { SectorRecordType } from "pages/displayBoard/model/SectorRecord";

import ContestTimer from "pages/displayBoard/view/body/ContestTimer";
import DriveStopWatch from "pages/displayBoard/view/body/DriveStopWatch";
import CurRanking from "pages/displayBoard/view/body/CurRanking";
import CurParticipant from "pages/displayBoard/view/body/CurParticipant";
import CurRobot from "pages/displayBoard/view/body/CurRobot";
import NextParticipant from "pages/displayBoard/view/body/NextParticipant";

import "pages/displayBoard/view/body/Index.css";

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
