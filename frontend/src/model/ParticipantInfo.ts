import { ParticipantType } from "model/Participant";
import { DriveRecordType } from "model/DriveRecord";

import { sortDriveRecordList } from "tools/sortTargetList";
import {
  filterSectorRecordList,
  filterDriveRecordList,
} from "tools/filterTargetList";
import { RobotType } from "./Robot";

export interface ParticipantInfoType {
  name: string;
  association: string;
  speech: string;

  sector: string;
  order: number;

  fastestLapTime?: number;

  robot?: RobotType;

  driveRecordList: { type: string; recordTime: number }[];
}

export default class ParticipantInfo implements ParticipantInfoType {
  name: string;
  association: string;
  speech: string;

  sector: string;
  order: number;

  fastestLapTime?: number;

  robot?: RobotType;

  driveRecordList: { type: string; recordTime: number }[];

  constructor(data: ParticipantType, sector: string) {
    const sectorRecord =
      filterSectorRecordList(data?.sectorRecordList ?? [], {
        sectorRecordBy: "contestSector",
        sectorRecordValue: sector,
      })[0] ?? {};

    this.name = data.name;
    this.association = data.association ?? "--";
    this.speech = data.speech ?? "--";

    this.sector = sectorRecord.contestSector;
    this.order = sectorRecord.order;

    this.robot = data.robot;

    this.driveRecordList = getDriveRecordList(sectorRecord.driveRecordList);

    this.fastestLapTime = getFastestLapTime(sectorRecord.driveRecordList);
  }
}

const getDriveRecordList = (driveRecordList: DriveRecordType[] | undefined) => {
  try {
    const sortedDriveRecordList = sortDriveRecordList(driveRecordList ?? [], {
      driveRecordBy: "writeTime",
    });

    return sortedDriveRecordList.map((driveRecord) => {
      return {
        type: driveRecord.type,
        recordTime: driveRecord.recordTime,
      };
    });
  } catch (error) {
    return [];
  }
};

const getFastestLapTime = (driveRecordList: DriveRecordType[] | undefined) => {
  const filteredDriveRecordList = filterDriveRecordList(driveRecordList ?? [], {
    driveRecordBy: "type",
    driveRecordValue: "SUCCESS",
  });
  const sortedDriveRecordList = sortDriveRecordList(
    filteredDriveRecordList ?? [],
    {
      driveRecordBy: "recordTime",
    }
  );
  const fastestLapTime = sortedDriveRecordList[0]?.recordTime ?? 0;
  return fastestLapTime;
};
