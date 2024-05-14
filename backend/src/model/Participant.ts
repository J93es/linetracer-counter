import { RobotType } from "@model/Robot";
import { SectorRecordType } from "@model/SectorRecord";

export interface ParticipantType {
  _id: any;
  hostId: any;

  name: string;
  association: string;
  speech: string;

  robot: any;

  sectorRecordList: any;
}

export default class Participant implements ParticipantType {
  _id: any;
  hostId: any;

  name: string;
  association: string;
  speech: string;

  robot: RobotType;

  sectorRecordList: SectorRecordType[];

  constructor(data: ParticipantType) {
    this._id = data._id;
    this.hostId = data.hostId;

    this.name = data.name;
    this.association = data.association;
    this.speech = data.speech;

    this.robot = data.robot;

    this.sectorRecordList = data.sectorRecordList;
  }
}
