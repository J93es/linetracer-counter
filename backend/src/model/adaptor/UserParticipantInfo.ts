import { ParticipantType } from "@model/Participant";
import { DriveRecordType } from "@model/DriveRecord";
import DriveRecordInfo from "@model/adaptor/DriveRecordInfo";

import { sortDriveRecordList } from "@tools/sortTargetList";
import {
  filterSectorRecordList,
  filterDriveRecordList,
} from "@tools/filterTargetList";

export interface UserParticipantInfoType {
  name: string;
  order: number;
  rank: number;
  fastestLapTime?: number;
  robotName: string;
}

export default class UserParticipantInfo implements UserParticipantInfoType {
  name: string;
  order: number;
  rank: number;
  fastestLapTime?: number;
  robotName: string;

  constructor(data: ParticipantType | undefined, sector: string) {
    const sectorRecord =
      filterSectorRecordList(data?.sectorRecordList ?? [], {
        sectorRecordBy: "contestSector",
        sectorRecordValue: sector,
      })[0] ?? {};

    this.name = data?.name ?? "--";

    this.order = sectorRecord.order;
    this.rank = Infinity;

    this.robotName = data?.robot?.name ?? "--";

    this.fastestLapTime =
      getFastestLapTime(sectorRecord.driveRecordList) ?? Infinity;
  }
}

const getFastestLapTime = (driveRecordList: DriveRecordType[] | undefined) => {
  try {
    const filteredDriveRecordList = filterDriveRecordList(
      driveRecordList ?? [],
      {
        driveRecordBy: "type",
        driveRecordValue: "SUCCESS",
      }
    );
    const sortedDriveRecordList = sortDriveRecordList(
      filteredDriveRecordList ?? [],
      {
        driveRecordBy: "recordTime",
      }
    );

    return sortedDriveRecordList[0].recordTime ?? Infinity;
  } catch (error) {
    return Infinity;
  }
};
