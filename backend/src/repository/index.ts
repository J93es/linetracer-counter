import { ContestRepository } from "@core/repository/contest";
import { ParticipantRepository } from "@core/repository/participant";
import { SectorRecordRepository } from "@core/repository/sectorRecord";
import { DriveRecordRepository } from "@core/repository/driveRecord";
import { CounterDeviceLogRepository } from "@core/repository/counterDeviceLog";

import { ContestMongoRepo } from "@repository/mongo/contest";
import { ParticipantMongoRepo } from "@repository/mongo/participant";
import { SectorRecordMongoRepo } from "@repository/mongo/sectorRecord";
import { DriveRecordMongoRepo } from "@repository/mongo/driveRecord";
import { CounterDeviceLogMongoRepo } from "@repository/mongo/counterDeviceLog";

export const contestRepository: ContestRepository = new ContestMongoRepo();
export const participantRepository: ParticipantRepository =
  new ParticipantMongoRepo();
export const sectorRecordRepository: SectorRecordRepository =
  new SectorRecordMongoRepo();
export const driveRecordRepository: DriveRecordRepository =
  new DriveRecordMongoRepo();
export const counterDeviceLogRepository: CounterDeviceLogRepository =
  new CounterDeviceLogMongoRepo();
