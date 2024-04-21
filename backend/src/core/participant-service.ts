import { ParticipantType } from "../model/Participant/Participant";
export interface ParticipantService {
  getParticipantIndex(): Array<{ id: string; title: string }>;
  getParticipant(id: string): ParticipantType;
  setParticipant(srcData: Partial<ParticipantType>): ParticipantType;
  resetParticipant(id: string): ParticipantType;
}

import { PersonalInfoType } from "../model/Participant/PersonalInfo";
export interface PersonalInfoService {
  getPersonalInfoTemplate(): PersonalInfoType;
  filterPersonalInfo(data: any): void;
  publishPersonalInfo(data: Partial<PersonalInfoType>): PersonalInfoType;
  margePersonalInfo(
    src: Partial<PersonalInfoType>,
    origin: PersonalInfoType
  ): PersonalInfoType;
}

import { RobotType } from "../model/Participant/Robot";
export interface RobotService {
  getRobotTemplate(): RobotType;
  filterRobot(data: any): void;
  publishRobot(data: Partial<RobotType>): RobotType;
  margeRobot(src: Partial<RobotType>, origin: RobotType): RobotType;
}

import { ContestStatusType } from "../model/Participant/ContestStatus";
export interface ContestStatusService {
  getContestStatusTemplate(): ContestStatusType;
  filterContestStatus(data: any): void;
  publishContestStatus(data: Partial<ContestStatusType>): ContestStatusType;
  margeContestStatus(
    src: Partial<ContestStatusType>,
    origin: ContestStatusType
  ): ContestStatusType;
}
