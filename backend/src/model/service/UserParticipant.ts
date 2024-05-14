import { ParticipantType } from "../Participant";
import { UserRobotType, userRobotTamplate } from "./UserRobot";
import {
  UserSectorRecordType,
  userSectorRecordTamplate,
} from "./UserSectorRecord";

export interface UserParticipantType
  extends Omit<ParticipantType, "_id" | "hostId"> {
  name: string;
  association: string;
  speech: string;

  robot: UserRobotType;

  sectorRecordList: UserSectorRecordType[];
}

export default class UserParticipant {
  name: string;
  association: string;
  speech: string;

  robot: UserRobotType;

  sectorRecordList: UserSectorRecordType[];

  constructor(data: UserParticipantType) {
    this.name = data.name;
    this.association = data.association;
    this.speech = data.speech;

    this.robot = data.robot;

    this.sectorRecordList = data.sectorRecordList;
  }
}

export const userParticipantTamplate: UserParticipantType = new UserParticipant(
  {
    name: "",
    association: "",
    speech: "",

    robot: userRobotTamplate,

    sectorRecordList: [userSectorRecordTamplate],
  }
);
