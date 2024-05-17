import { ContestService } from "@core/service/contest";
import { ParticipantService } from "@core/service/participant";
import { SectorRecordService } from "@core/service/sectorRecord";
import { DriveRecordService } from "@core/service/driveRecord";
import { UserService } from "@src/core/service/user";

import { ContestServ } from "@service/contest";
import { ParticipantServ } from "@service/participant";
import { SectorRecordServ } from "@service/sectorRecord";
import { DriveRecordServ } from "@service/driveRecord";
import { UserServ } from "@service/user";

export const contestService: ContestService = new ContestServ();
export const participantService: ParticipantService = new ParticipantServ();
export const sectorRecordService: SectorRecordService = new SectorRecordServ();
export const driveRecordService: DriveRecordService = new DriveRecordServ();
export const userService: UserService = new UserServ();
