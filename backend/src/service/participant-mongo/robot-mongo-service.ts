import Robot from "../../model/Participant/Robot";
import { RobotType } from "../../model/Participant/Robot";
import { RobotService } from "../../core/participant-service";

export class RobotMongoService implements RobotService {
  getRobotTemplate(): RobotType {
    return new Robot({
      name: "",
      cpu: "",
      rom: "",
      ram: "",
      motorDriver: "",
      motor: "",
      adc: "",
      sensor: "",
    } as RobotType);
  }

  filterRobot(robotData: any): void {
    if (!robotData) {
      return;
    }
    if (typeof robotData !== "object") {
      throw new Error("robot: robot must be object");
    }
    if (robotData.name !== undefined && typeof robotData.name !== "string") {
      throw new Error("robot: name must be string");
    }
    if (robotData.cpu !== undefined && typeof robotData.cpu !== "string") {
      throw new Error("robot: cpu must be string");
    }
    if (robotData.rom !== undefined && typeof robotData.rom !== "string") {
      throw new Error("robot: rom must be string");
    }
    if (robotData.ram !== undefined && typeof robotData.ram !== "string") {
      throw new Error("robot: ram must be string");
    }
    if (
      robotData.motorDriver !== undefined &&
      typeof robotData.motorDriver !== "string"
    ) {
      throw new Error("robot: motorDriver must be string");
    }
    if (robotData.motor !== undefined && typeof robotData.motor !== "string") {
      throw new Error("robot: motor must be string");
    }
    if (robotData.adc !== undefined && typeof robotData.adc !== "string") {
      throw new Error("robot: adc must be string");
    }
    if (
      robotData.sensor !== undefined &&
      typeof robotData.sensor !== "string"
    ) {
      throw new Error("robot: sensor must be string");
    }
  }

  publishRobot(contestData: Partial<RobotType>): RobotType {
    const robotTemplate = this.getRobotTemplate();

    if (typeof contestData !== "object") {
      return robotTemplate;
    }

    return new Robot({
      name: contestData.name || robotTemplate.name,
      cpu: contestData.cpu || robotTemplate.cpu,
      rom: contestData.rom || robotTemplate.rom,
      ram: contestData.ram || robotTemplate.ram,
      motorDriver: contestData.motorDriver || robotTemplate.motorDriver,
      motor: contestData.motor || robotTemplate.motor,
      adc: contestData.adc || robotTemplate.adc,
      sensor: contestData.sensor || robotTemplate.sensor,
    });
  }

  margeRobot(src: Partial<RobotType>, origin: RobotType): RobotType {
    const robotTemplate = this.getRobotTemplate();

    return new Robot({
      name: src.name ?? origin.name ?? robotTemplate.name,
      cpu: src.cpu ?? origin.cpu ?? robotTemplate.cpu,
      rom: src.rom ?? origin.rom ?? robotTemplate.rom,
      ram: src.ram ?? origin.ram ?? robotTemplate.ram,
      motorDriver:
        src.motorDriver ?? origin.motorDriver ?? robotTemplate.motorDriver,
      motor: src.motor ?? origin.motor ?? robotTemplate.motor,
      adc: src.adc ?? origin.adc ?? robotTemplate.adc,
      sensor: src.sensor ?? origin.sensor ?? robotTemplate.sensor,
    });
  }
}
