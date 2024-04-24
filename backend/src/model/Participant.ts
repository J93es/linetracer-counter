export type DriveRecordType = {
  _id: any;
  type: string;
  isPreliminary: boolean;
  recordTime: number;
};

export type RobotType = {
  _id: any;
  name: string;
  cpu: string;
  rom: string;
  ram: string;
  motorDriver: string;
  motor: string;
  adc: string;
  sensor: string;
};

export type ParticipantType = {
  _id: any;
  idYear: string;

  name: string;
  association: string;
  speech: string;

  contestSector: string;
  remainingContestTime: number;

  preliminaryOrder: number;
  mainOrder: number;

  robot: RobotType;

  driveRecord: object[];
};

export default class Participant {
  _id: any;
  idYear: string;

  name: string;
  association: string;
  speech: string;

  contestSector: string;
  remainingContestTime: number;

  preliminaryOrder: number;
  mainOrder: number;

  robot: RobotType;

  driveRecord: object[];

  constructor(data: ParticipantType) {
    this._id = data._id;
    this.idYear = data.idYear;

    this.name = data.name;
    this.association = data.association;
    this.speech = data.speech;

    this.contestSector = data.contestSector;
    this.remainingContestTime = data.remainingContestTime;

    this.preliminaryOrder = data.preliminaryOrder;
    this.mainOrder = data.mainOrder;

    this.robot = data.robot;

    this.driveRecord = data.driveRecord;
  }
}
