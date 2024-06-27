import { ContestType } from "@model/Contest";
import { ParticipantType } from "@model/Participant";
import ParticipantInfo, {
  ParticipantInfoType,
} from "@model/adaptor/ParticipantInfo";
import SectorRecordInfo, {
  SectorRecordInfoType,
} from "@model/adaptor/SectorRecordInfo";

import { filterParticipantList } from "@tools/filterTargetList";
import { findTargetById } from "@tools/utils";

export interface DisplayBoardContestInfoType {
  title: string;

  curContestingSection?: string;
  curParticipant?: ParticipantInfoType;
  nextParticipant?: ParticipantInfoType;
  curSectorRecord?: SectorRecordInfoType;

  contestTimerStartTime?: number;
  isContestTimerRunning?: boolean;

  driveStartTime?: number;
  isDriveStopWatchRunning?: boolean;
  latestDriveRecordTime?: number;

  participantList: ParticipantInfoType[];
}

export default class DisplayBoardContestInfo
  implements DisplayBoardContestInfoType
{
  title: string;

  curContestingSection?: string;
  curParticipant?: ParticipantInfoType;
  nextParticipant?: ParticipantInfoType;
  curSectorRecord?: SectorRecordInfoType;

  contestTimerStartTime?: number;
  isContestTimerRunning?: boolean;

  driveStartTime?: number;
  isDriveStopWatchRunning?: boolean;
  latestDriveRecordTime?: number;

  participantList: ParticipantInfoType[];

  constructor(data: ContestType) {
    this.title = data.title;

    this.curContestingSection = data.curContestingSection;

    const originCurParticipant = findTargetById(
      data.curParticipantId,
      data.participantList
    );
    const originNextParticipant = findTargetById(
      data.nextParticipantId,
      data.participantList
    );
    const originCurSectorRecord = findTargetById(
      data.curSectorRecordId,
      originCurParticipant?.sectorRecordList
    );

    this.curParticipant = new ParticipantInfo(
      originCurParticipant,
      this.curContestingSection ?? ""
    );
    this.nextParticipant = new ParticipantInfo(
      originNextParticipant,
      this.curContestingSection ?? ""
    );
    this.curSectorRecord = new SectorRecordInfo(originCurSectorRecord);

    this.contestTimerStartTime = data.contestTimerStartTime;
    this.isContestTimerRunning = data.isContestTimerRunning;

    this.driveStartTime = data.driveStartTime;
    this.isDriveStopWatchRunning = data.isDriveStopWatchRunning;
    this.latestDriveRecordTime = data.latestDriveRecordTime;

    const filteredParticipantList = filterParticipantList(
      data.participantList,
      {
        sectorRecordBy: "contestSector",
        sectorRecordValue: this.curContestingSection ?? "",
      }
    );

    this.participantList = filteredParticipantList.map(
      (participant: ParticipantType) => {
        return new ParticipantInfo(
          participant,
          this.curContestingSection ?? ""
        );
      }
    );
  }
}
