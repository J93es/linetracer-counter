import { RobotType } from "pages/displayBoard/model/Robot";

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

  constructor(data: ParticipantInfoType) {
    this.name = data.name;
    this.association = data.association ?? "--";
    this.speech = data.speech ?? "--";

    this.sector = data.sector;
    this.order = data.order;

    this.robot = data.robot;

    this.driveRecordList = data.driveRecordList;

    this.fastestLapTime = data.fastestLapTime;
  }
}
