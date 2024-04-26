import { RobotType } from "./Robot";
import { DriveRecordType } from "./DriveRecord";

export type ParticipantType = {
  _id: any;
  hostId: any;

  name: string;
  association: string;
  speech: string;

  contestSector: string;
  remainingContestTime: number;

  preliminaryOrder: number;
  mainOrder: number;

  robot: RobotType;

  driveRecord: DriveRecordType[];
};

export default class Participant {
  _id: any;
  hostId: any;

  name: string;
  association: string;
  speech: string;

  contestSector: string;
  remainingContestTime: number;

  preliminaryOrder: number;
  mainOrder: number;

  robot: RobotType;

  driveRecord: DriveRecordType[];

  constructor(data: ParticipantType) {
    this._id = data._id;
    this.hostId = data.hostId;

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
