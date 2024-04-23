import { PersonalInfoType } from "./PersonalInfo";
import { RobotType } from "./Robot";
import { ContestStatusType } from "./ContestStatus";

export type ParticipantType = {
  id: string;
  title: string;
  personalInfo: PersonalInfoType;
  robot: RobotType;
  contestStatus: ContestStatusType;
};

export default class Participant {
  id: string;
  title: string;
  personalInfo: PersonalInfoType;
  robot: RobotType;
  contestStatus: ContestStatusType;

  constructor(data: ParticipantType) {
    this.id = data.id;
    this.title = data.title;
    this.personalInfo = data.personalInfo;
    this.robot = data.robot;
    this.contestStatus = data.contestStatus;
  }
}
