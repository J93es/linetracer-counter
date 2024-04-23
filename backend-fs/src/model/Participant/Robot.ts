export type RobotType = {
  name: string;
  cpu: string;
  rom: string;
  ram: string;
  motorDriver: string;
  motor: string;
  adc: string;
  sensor: string;
};

export default class Robot {
  name: string;
  cpu: string;
  rom: string;
  ram: string;
  motorDriver: string;
  motor: string;
  adc: string;
  sensor: string;

  constructor(data: RobotType) {
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
