import Body from "pages/display_board/view/body/Index";

import { ContestType } from "pages/display_board/model/Contest";
import { ParticipantInfoType } from "pages/display_board/model/ParticipantInfo";

import { SectorRecordType } from "pages/display_board/model/SectorRecord";

import "pages/display_board/view/Index.css";

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
