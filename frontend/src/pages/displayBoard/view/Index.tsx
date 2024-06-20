import Body from "pages/displayBoard/view/body/Index";

import { ContestType } from "pages/displayBoard/model/Contest";
import { ParticipantInfoType } from "pages/displayBoard/model/ParticipantInfo";

import { SectorRecordType } from "pages/displayBoard/model/SectorRecord";

import "pages/displayBoard/view/Index.css";

export default function View({
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
    <div className="display-board-view">
      <Body
        targetContest={targetContest}
        isContestTimerRunning={isContestTimerRunning}
        curSectorRecord={curSectorRecord}
        curParticipantInfo={curParticipantInfo}
        nextParticipantInfo={nextParticipantInfo}
        participantInfoList={participantInfoList}
      />
    </div>
  );
}
