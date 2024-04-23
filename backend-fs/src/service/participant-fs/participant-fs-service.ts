import Participant from "../../model/Participant/Participant";
import { ParticipantType } from "../../model/Participant/Participant";
import { ParticipantIdTitleType } from "../../model/Participant/ParticipantIdTitle";

import { ParticipantRepository } from "../../core/participant-repository";
import { ParticipantFsRepo } from "../../repository/participant-fs-repo";

import { ParticipantService } from "../../core/participant-service";
import { RobotFsService } from "./robot-fs-service";
import { ContestStatusFsService } from "./contestStatus-fs-service";
import { PersonalInfoFsService } from "./personalInfo-fs-service";

import { anyToString } from "../../util/index";

const participantRepo: ParticipantRepository = new ParticipantFsRepo();
const PersonalInfoService: PersonalInfoFsService = new PersonalInfoFsService();
const contestStatusService: ContestStatusFsService =
  new ContestStatusFsService();
const robotService: RobotFsService = new RobotFsService();

export class ParticipantFsService implements ParticipantService {
  private getParticipantTemplate(id?: string): ParticipantType {
    return new Participant({
      id: id ?? "",
      title: "",
      personalInfo: PersonalInfoService.getPersonalInfoTemplate(),
      robot: robotService.getRobotTemplate(),
      contestStatus: contestStatusService.getContestStatusTemplate(),
    } as ParticipantType);
  }

  filterParticipant(data: any): Partial<ParticipantType> {
    if (!data.id) {
      throw new Error("participant: id is required");
    }
    if (typeof data.id !== "string") {
      throw new Error(`participant: id must be string`);
    }
    if (data.title !== undefined && typeof data.title !== "string") {
      throw new Error(`participant: title must be string`);
    }
    if (data.contestLog !== undefined && !Array.isArray(data.contestLog)) {
      throw new Error("contestLog: contestLog must be array");
    }
    if (data.driveLog !== undefined && !Array.isArray(data.driveLog)) {
      throw new Error("participant: driveLog must be array");
    }

    PersonalInfoService.filterPersonalInfo(data.personalInfo);
    robotService.filterRobot(data.robot);
    contestStatusService.filterContestStatus(data.contestStatus);

    return data as Partial<ParticipantType>;
  }

  private publishParticipant(
    id: string,
    data: Partial<ParticipantType>
  ): ParticipantType {
    const participantTemplate = this.getParticipantTemplate(id);

    let title = data.title ?? participantTemplate.title;
    if (typeof title !== "string") {
      title = anyToString(title);
    }

    const personalInfo = PersonalInfoService.publishPersonalInfo(
      data.personalInfo ?? participantTemplate.personalInfo
    );
    const robot = robotService.publishRobot(
      data.robot ?? participantTemplate.robot
    );
    const contestStatus = contestStatusService.publishContestStatus(
      data.contestStatus ?? participantTemplate.contestStatus
    );

    return new Participant({
      id: id,
      title: title,
      personalInfo: personalInfo,
      robot: robot,
      contestStatus: contestStatus,
    });
  }

  private margeParticipant(
    src: Partial<ParticipantType>,
    origin: Participant
  ): Participant {
    const participantTemplate = this.getParticipantTemplate();

    const personalInfo = PersonalInfoService.margePersonalInfo(
      src.personalInfo ?? {},
      origin.personalInfo
    );
    const robot = robotService.margeRobot(src.robot ?? {}, origin.robot);
    const contestStatus = contestStatusService.margeContestStatus(
      src.contestStatus ?? {},
      origin.contestStatus
    );

    return new Participant({
      // id는 origin의 데이터를 우선적용한다.
      id: origin.id ?? src.id,
      title: src.title ?? origin.title ?? participantTemplate.title,
      personalInfo: personalInfo,
      robot: robot,
      contestStatus: contestStatus,
    });
  }

  getParticipantIndex(): Array<ParticipantIdTitleType> {
    try {
      return participantRepo.readParticipantIndex();
    } catch (error: any) {
      throw error;
    }
  }

  getParticipant(id: string): ParticipantType {
    try {
      if (!participantRepo.isParticipantExist(id)) {
        throw new Error(`${id} : participant is not exist`);
      }

      const data = participantRepo.readParticipant(id);

      const participant = this.publishParticipant(id, data);

      return participant;
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  }

  setParticipant(data: any): ParticipantType {
    try {
      const src: Partial<ParticipantType> = this.filterParticipant(data);
      const origin: Participant = this.getParticipant(src.id ?? "");

      if (src.id !== origin.id) {
        throw new Error(
          `request id {${src.id}}, server id {${origin.id}} : id is not matched`
        );
      }
      const margeParticipant: ParticipantType = this.margeParticipant(
        src,
        origin
      );

      return participantRepo.writeParticipant(margeParticipant);
    } catch (error: any) {
      throw error;
    }
  }

  resetParticipant(id: string): ParticipantType {
    try {
      const participant = this.getParticipantTemplate(id);

      return participantRepo.writeParticipant(participant);
    } catch (error: any) {
      throw error;
    }
  }
}
