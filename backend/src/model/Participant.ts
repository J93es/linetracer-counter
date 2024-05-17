import { RobotType } from "@model/Robot";
import { UserRobotType } from "@model/service/user/Robot";
import { SectorRecordType } from "@model/SectorRecord";
import { UserSectorRecordType } from "@model/service/user/SectorRecord";

export interface ParticipantType {
  _id: string;
  id: string;
  hostId: string;

  name: string;
  association?: string;
  speech?: string;

  robot?: RobotType | UserRobotType;

  sectorRecordList: SectorRecordType[] | UserSectorRecordType[] | string[];
}

export default class Participant implements ParticipantType {
  _id: string;
  id: string;
  hostId: string;

  name: string;
  association?: string;
  speech?: string;

  robot?: RobotType | UserRobotType;

  sectorRecordList: SectorRecordType[] | UserSectorRecordType[] | string[];

  constructor(data: ParticipantType) {
    this._id = data._id;
    this.id = data.id;
    this.hostId = data.hostId;

    this.name = data.name;
    this.association = data.association;
    this.speech = data.speech;

    this.robot = data.robot;

    this.sectorRecordList = data.sectorRecordList;
  }
}
