import { RobotType, robotTamplate } from "@model/Robot";
import { SectorRecordType, sectorRecordTamplate } from "@model/SectorRecord";

export interface ParticipantType {
  _id: string;
  id: string;
  hostId: string;

  name: string;
  association?: string;
  speech?: string;

  robot?: RobotType;

  sectorRecordList: SectorRecordType[];
}

export default class Participant implements ParticipantType {
  _id: string;
  id: string;
  hostId: string;

  name: string;
  association?: string;
  speech?: string;

  robot?: RobotType;

  sectorRecordList: SectorRecordType[];

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

export const participantTamplate: ParticipantType = new Participant({
  _id: "",
  id: "",
  hostId: "",
  name: "",
  association: "",
  speech: "",
  robot: robotTamplate,
  sectorRecordList: [sectorRecordTamplate],
});
