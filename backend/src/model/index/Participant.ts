import { RobotType } from "./Robot";
import { ParticipantRecordType } from "./ParticipantRecord";

export type ParticipantType = {
  _id: any;
  hostId: any;

  name: string;
  association: string;
  speech: string;

  robot: RobotType;

  participantRecordList: object[];
};

export default class Participant {
  _id: any;
  hostId: any;

  name: string;
  association: string;
  speech: string;

  robot: RobotType;

  participantRecordList: object[];

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
