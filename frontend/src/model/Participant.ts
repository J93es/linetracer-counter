import { RobotType } from "model/Robot";
import { SectorRecordType } from "model/SectorRecord";
import { robotTamplate } from "model/Robot";

export interface ParticipantType {
  _id: any;
  hostId: any;

  name: string;
  association: string;
  speech: string;

  robot: RobotType;

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

export const participantTamplate: ParticipantType = new Participant({
  _id: "",
  hostId: "",
  name: "",
  association: "",
  speech: "",
  robot: robotTamplate,
  sectorRecordList: [],
});
