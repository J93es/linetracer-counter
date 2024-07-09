import { ParticipantType } from "@model/Participant";
import { DriveRecordType } from "@model/DriveRecord";
import DriveRecordInfo from "@model/adaptor/DriveRecordInfo";

import { sortDriveRecordList } from "@tools/sortTargetList";
import {
  filterSectorRecordList,
  filterDriveRecordList,
} from "@tools/filterTargetList";
import RobotInfo, { RobotInfoType } from "@model/adaptor/RobotInfo";

export interface DisplayBoardParticipantInfoType {
  name: string;
  association: string;
  speech: string;

  sector: string;
  order: number;
  sectorState: string;

  fastestLapTime?: number;

  robot?: RobotInfoType;

  driveRecordList: { type: string; recordTime: number }[];
}

export default class DisplayBoardParticipantInfo
  implements DisplayBoardParticipantInfoType
{
  name: string;
  association: string;
  speech: string;

  sector: string;
  order: number;
  sectorState: string;

  fastestLapTime?: number;

  robot?: RobotInfoType;

  driveRecordList: { type: string; recordTime: number }[];

  constructor(data: ParticipantType | undefined, sector: string) {
    const sectorRecord =
      filterSectorRecordList(data?.sectorRecordList ?? [], {
        sectorRecordBy: "contestSector",
        sectorRecordValue: sector,
      })[0] ?? {};

    this.name = data?.name ?? "--";
    this.association = data?.association ?? "--";
    this.speech = data?.speech ?? "--";

    this.sector = sectorRecord.contestSector;
    this.order = sectorRecord.order;
    this.sectorState = sectorRecord.sectorState;

    this.robot = new RobotInfo(data?.robot);

    this.driveRecordList = getDriveRecordList(sectorRecord.driveRecordList);

    this.fastestLapTime = this.driveRecordList[0]?.recordTime ?? Infinity;
  }
}

const getDriveRecordList = (driveRecordList: DriveRecordType[] | undefined) => {
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

    return sortedDriveRecordList.map((driveRecord) => {
      return new DriveRecordInfo(driveRecord);
    });
  } catch (error) {
    return [];
  }
};
