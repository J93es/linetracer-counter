import Body from "component/displayBoard/view/body/Index";

import { ContestType } from "model/Contest";
import { ParticipantInfoType } from "model/ParticipantInfo";

import { SectorRecordType } from "model/SectorRecord";

import "component/displayBoard/view/Index.css";

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
