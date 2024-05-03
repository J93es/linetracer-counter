import { RobotType } from "model/Robot";
import { ParticipantRecordType } from "model/ParticipantRecord";
import { robotTamplate } from "model/Robot";

export type ParticipantType = {
  _id: any;
  hostId: any;

  name: string;
  association: string;
  speech: string;

  robot: RobotType;

  participantRecordList: ParticipantRecordType[];
};

export default class Participant {
  _id: any;
  hostId: any;

  name: string;
  association: string;
  speech: string;

  robot: RobotType;

  participantRecordList: ParticipantRecordType[];

  constructor(data: ParticipantType) {
    this._id = data._id;
    this.hostId = data.hostId;

    this.name = data.name;
    this.association = data.association;
    this.speech = data.speech;

    this.robot = data.robot;

    this.participantRecordList = data.participantRecordList;
  }
}

export const participantTamplate: ParticipantType = new Participant({
  _id: "",
  hostId: "",
  name: "",
  association: "",
  speech: "",
  robot: robotTamplate,
  participantRecordList: [],
});
