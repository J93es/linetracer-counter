import { ParticipantType } from "@model/Participant";
import { UserRobotType, userRobotTamplate } from "@model/service/user/Robot";
import {
  UserSectorRecordType,
  userSectorRecordTamplate,
} from "@model/service/user/SectorRecord";

export interface UserParticipantType
  extends Omit<ParticipantType, "_id" | "id" | "hostId" | "robot"> {
  name: string;
  association?: string;
  speech?: string;

  robot?: UserRobotType;

  sectorRecordList: UserSectorRecordType[];
}

export default class UserParticipant {
  name: string;
  association?: string;
  speech?: string;

  robot?: UserRobotType;

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
