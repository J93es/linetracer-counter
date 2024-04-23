import { DriveRecordType } from "./DriveRecord";

export type ParticipantType = {
  id: string;

  participantName: string;
  association: string;
  speech: string;

  robotName: string;
  cpu: string;
  rom: string;
  ram: string;
  motorDriver: string;
  motor: string;
  adc: string;
  sensor: string;

  sector: string;
  entryOrder: number;
  realOrder: number;
  remainingContestTime: number;

  driveRecord: DriveRecordType[];
};

export default class Participant {
  id: string;

  participantName: string;
  association: string;
  speech: string;

  robotName: string;
  cpu: string;
  rom: string;
  ram: string;
  motorDriver: string;
  motor: string;
  adc: string;
  sensor: string;

  sector: string;
  entryOrder: number;
  realOrder: number;
  remainingContestTime: number;

  driveRecord: DriveRecordType[];

  constructor(data: ParticipantType) {
    this.id = data.id;

    this.participantName = data.participantName;
    this.association = data.association;
    this.speech = data.speech;

    this.robotName = data.robotName;
    this.cpu = data.cpu;
    this.rom = data.rom;
    this.ram = data.ram;
    this.motorDriver = data.motorDriver;
    this.motor = data.motor;
    this.adc = data.adc;
    this.sensor = data.sensor;

    this.sector = data.sector;
    this.entryOrder = data.entryOrder;
    this.realOrder = data.realOrder;
    this.remainingContestTime = data.remainingContestTime; //ms

    this.driveRecord = data.driveRecord;
  }
}
