// admin
import { ContestService } from "@core/service/admin/contest";
import { ParticipantService } from "@core/service/admin/participant";
import { SectorRecordService } from "@core/service/admin/sectorRecord";
import { DriveRecordService } from "@core/service/admin/driveRecord";
import { CounterDeviceLogService } from "@core/service/admin/counterDeviceLog";

import { ContestServ } from "@service/admin/contest";
import { ParticipantServ } from "@service/admin/participant";
import { SectorRecordServ } from "@service/admin/sectorRecord";
import { DriveRecordServ } from "@service/admin/driveRecord";
import { CounterDeviceLogServ } from "@service/admin/counterDeviceLog";

export const contestService: ContestService = new ContestServ();
export const participantService: ParticipantService = new ParticipantServ();
export const sectorRecordService: SectorRecordService = new SectorRecordServ();
export const driveRecordService: DriveRecordService = new DriveRecordServ();
export const counterDeviceLogService: CounterDeviceLogService =
  new CounterDeviceLogServ();

//display-board
import { DisplayBoardService } from "@core/service/displayBoard";
import { DisplayBoardServ } from "@service/displayBoard";
export const displayBoardService: DisplayBoardService = new DisplayBoardServ();
