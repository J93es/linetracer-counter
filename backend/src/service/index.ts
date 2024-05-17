// admin
import { ContestService } from "@core/service/contest";
import { ParticipantService } from "@core/service/participant";
import { SectorRecordService } from "@core/service/sectorRecord";
import { DriveRecordService } from "@core/service/driveRecord";

import { ContestServ } from "@service/admin/contest";
import { ParticipantServ } from "@src/service/admin/participant";
import { SectorRecordServ } from "@src/service/admin/sectorRecord";
import { DriveRecordServ } from "@src/service/admin/driveRecord";

export const contestService: ContestService = new ContestServ();
export const participantService: ParticipantService = new ParticipantServ();
export const sectorRecordService: SectorRecordService = new SectorRecordServ();
export const driveRecordService: DriveRecordService = new DriveRecordServ();

// user
import { UserService } from "@src/core/service/user";
import { UserServ } from "@service/user";
export const userService: UserService = new UserServ();
