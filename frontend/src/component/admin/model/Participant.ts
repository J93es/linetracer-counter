import { RobotType } from "component/admin/model/Robot";
import {
  SectorRecordType,
  sectorRecordTamplate,
} from "component/admin/model/SectorRecord";
import { robotTamplate } from "component/admin/model/Robot";

export interface ParticipantType {
  id: string;
  hostId: string;

  name: string;
  association?: string;
  speech?: string;

  robot?: RobotType;

  sectorRecordList: SectorRecordType[];
}

export default class Participant implements ParticipantType {
  id: string;
  hostId: string;

  name: string;
  association?: string;
  speech?: string;

  robot?: RobotType;

  sectorRecordList: SectorRecordType[];

  constructor(data: ParticipantType) {
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
  id: "",
  hostId: "",
  name: "",
  association: "",
  speech: "",
  robot: robotTamplate,
  sectorRecordList: [sectorRecordTamplate],
});
