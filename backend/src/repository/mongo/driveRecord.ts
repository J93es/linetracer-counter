import DriveRecord, { DriveRecordType } from "../../model/DriveRecord";
import { DriveRecordRepository } from "../../core/repository/driveRecord";
import { ParticipantRecordSchema } from "../../model/repository/ParticipantRecordSchema";
import { DriveRecordSchema } from "../../model/repository/DriveRecordSchema";

import { ParticipantRecordRepository } from "../../core/repository/participantRecord";
import { ParticipantRecordMongoRepo } from "../../repository/mongo/participantRecord";

const participantRecordRepository: ParticipantRecordRepository =
  new ParticipantRecordMongoRepo();

export class DriveRecordMongoRepo implements DriveRecordRepository {
  async isExistDriveRecord(_id: any): Promise<Boolean> {
    if (await DriveRecordSchema.exists({ _id: _id })) {
      return true;
    } else {
      return false;
    }
  }

  async createDriveRecord(
    hostId: string,
    data: Partial<DriveRecordType>
  ): Promise<any> {
    const driveRecord = await DriveRecordSchema.create(data);
    if (!driveRecord) {
      throw new Error("Failed to create driveRecord");
    }

    const participantRecord =
      await participantRecordRepository.appendDriveRecordList(
        hostId,
        driveRecord
      );
    if (!participantRecord) {
      throw new Error("Failed to append participant list");
    }

    return driveRecord;
  }

  async readDriveRecord(_id: string): Promise<any> {
    const driveRecord = await DriveRecordSchema.findOne({
      _id: _id,
    }).lean();
    if (!driveRecord) {
      throw new Error("Failed to get driveRecord");
    }

    return driveRecord;
  }

  async updateDriveRecord(
    hostId: string,
    data: Partial<DriveRecordType>
  ): Promise<any> {
    const driveRecord = await DriveRecordSchema.findOneAndUpdate(
      { _id: data._id },
      data,
      {
        returnDocument: "after",
      }
    ).lean();
    if (!driveRecord) {
      throw new Error("Failed to update driveRecord");
    }

    if (
      !(await participantRecordRepository.popDriveRecordList(
        hostId,
        driveRecord._id
      ))
    ) {
      throw new Error("Failed to remove participant list");
    }

    if (
      !(await participantRecordRepository.appendDriveRecordList(
        hostId,
        driveRecord
      ))
    ) {
      throw new Error("Failed to append participant list");
    }

    return driveRecord;
  }

  async deleteDriveRecord(hostId: string, driveRecordId: string): Promise<any> {
    const participantRecord =
      await participantRecordRepository.popDriveRecordList(
        hostId,
        driveRecordId
      );
    if (!participantRecord) {
      throw new Error("Failed to remove participant list");
    }

    const driveRecord = await DriveRecordSchema.findOneAndDelete({
      _id: driveRecordId,
    }).lean();

    return driveRecord;
  }
}
