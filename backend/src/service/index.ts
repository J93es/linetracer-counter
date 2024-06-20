// admin
import { ContestService } from "@core/service/admin/contest";
import { ParticipantService } from "@src/core/service/admin/participant";
import { SectorRecordService } from "@src/core/service/admin/sectorRecord";
import { DriveRecordService } from "@src/core/service/admin/driveRecord";
import { CounterDeviceLogService } from "@src/core/service/admin/counterDeviceLog";

import { ContestServ } from "@service/admin/contest";
import { ParticipantServ } from "@src/service/admin/participant";
import { SectorRecordServ } from "@src/service/admin/sectorRecord";
import { DriveRecordServ } from "@src/service/admin/driveRecord";
import { CounterDeviceLogServ } from "@src/service/admin/counterDeviceLog";

export const contestService: ContestService = new ContestServ();
export const participantService: ParticipantService = new ParticipantServ();
export const sectorRecordService: SectorRecordService = new SectorRecordServ();
export const driveRecordService: DriveRecordService = new DriveRecordServ();
export const counterDeviceLogService: CounterDeviceLogService =
  new CounterDeviceLogServ();

// user
import { UserService } from "@src/core/service/user";
import { UserServ } from "@src/service/user";
export const userService: UserService = new UserServ();

//display-board
import { DisplayBoardService } from "@src/core/service/displayBoard";
import { DisplayBoardServ } from "@src/service/displayBoard";
export const displayBoardService: DisplayBoardService = new DisplayBoardServ();
