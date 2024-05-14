import { RobotType } from "@model/Robot";

export interface UserRobotType extends Omit<RobotType, "_id"> {
  name: string;
  cpu: string;
  rom: string;
  ram: string;
  motorDriver: string;
  motor: string;
  adc: string;
  sensor: string;
}

export default class UserRobot {
  name: string;
  cpu: string;
  rom: string;
  ram: string;
  motorDriver: string;
  motor: string;
  adc: string;
  sensor: string;

  constructor(data: UserRobotType) {
    this.name = data.name;
    this.cpu = data.cpu;
    this.rom = data.rom;
    this.ram = data.ram;
    this.motorDriver = data.motorDriver;
    this.motor = data.motor;
    this.adc = data.adc;
    this.sensor = data.sensor;
  }
}

export const userRobotTamplate: UserRobotType = new UserRobot({
  name: "",
  cpu: "",
  rom: "",
  ram: "",
  motorDriver: "",
  motor: "",
  adc: "",
  sensor: "",
});
