import { ContestType } from "@model/Contest";
import { ParticipantType } from "@model/Participant";
import DisplayBoardParticipantInfo, {
  DisplayBoardParticipantInfoType,
} from "@model/adaptor/DisplayBoardParticipantInfo";
import SectorRecordInfo, {
  SectorRecordInfoType,
} from "@model/adaptor/SectorRecordInfo";

import { filterParticipantList } from "@tools/filterTargetList";
import { findTargetById } from "@tools/utils";

export interface DisplayBoardContestInfoType {
  title: string;

  curContestingSection?: string;
  curParticipant?: DisplayBoardParticipantInfoType;
  nextParticipant?: DisplayBoardParticipantInfoType;
  curSectorRecord?: SectorRecordInfoType;

  contestTimerStartTime?: number;
  isContestTimerRunning?: boolean;

  driveStartTime?: number;
  isDriveStopWatchRunning?: boolean;
  latestDriveRecordTime?: number;

  participantList: DisplayBoardParticipantInfoType[];
}

export default class DisplayBoardContestInfo
  implements DisplayBoardContestInfoType
{
  title: string;

  curContestingSection?: string;
  curParticipant?: DisplayBoardParticipantInfoType;
  nextParticipant?: DisplayBoardParticipantInfoType;
  curSectorRecord?: SectorRecordInfoType;

  contestTimerStartTime?: number;
  isContestTimerRunning?: boolean;

  driveStartTime?: number;
  isDriveStopWatchRunning?: boolean;
  latestDriveRecordTime?: number;

  participantList: DisplayBoardParticipantInfoType[];

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

    this.curParticipant = new DisplayBoardParticipantInfo(
      originCurParticipant,
      this.curContestingSection ?? ""
    );
    this.nextParticipant = new DisplayBoardParticipantInfo(
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
        return new DisplayBoardParticipantInfo(
          participant,
          this.curContestingSection ?? ""
        );
      }
    );
  }
}
