import { RobotType } from "pages/body/live/model/Robot";

export interface ParticipantType {
  name: string;
  order: number;
  rank: number;
  fastestLapTime?: number;
  robotName: string;
}

export default class Participant implements ParticipantType {
  name: string;
  order: number;
  rank: number;
  fastestLapTime?: number;
  robotName: string;

  constructor(data: ParticipantType) {
    this.name = data.name;
    this.order = data.order;
    this.rank = data.rank;
    this.fastestLapTime = data.fastestLapTime;
    this.robotName = data.robotName;
  }
}
