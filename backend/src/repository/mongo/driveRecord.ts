import { DriveRecordType } from "@model/DriveRecord";
import { DriveRecordRepository } from "@core/repository/driveRecord";
import { DriveRecordSchema } from "@model/repository/DriveRecordSchema";

import { SectorRecordRepository } from "@core/repository/sectorRecord";
import { SectorRecordMongoRepo } from "@repository/mongo/sectorRecord";

const sectorRecordRepository: SectorRecordRepository =
  new SectorRecordMongoRepo();

export class DriveRecordMongoRepo implements DriveRecordRepository {
  async isExist(_id: any): Promise<Boolean> {
    if (await DriveRecordSchema.exists({ _id: _id })) {
      return true;
    } else {
      return false;
    }
  }

  async create(hostId: string, data: Partial<DriveRecordType>): Promise<any> {
    const driveRecord = await DriveRecordSchema.create(data);
    if (!driveRecord) {
      throw new Error("Failed to create driveRecord");
    }

    const sectorRecord = await sectorRecordRepository.appendDriveRecordList(
      hostId,
      driveRecord
    );
    if (!sectorRecord) {
      throw new Error("Failed to append participant list");
    }

    return driveRecord;
  }

  async read(_id: string): Promise<any> {
    const driveRecord = await DriveRecordSchema.findOne({
      _id: _id,
    }).lean();
    if (!driveRecord) {
      throw new Error("Failed to get driveRecord");
    }

    return driveRecord;
  }

  async update(hostId: string, data: Partial<DriveRecordType>): Promise<any> {
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
      !(await sectorRecordRepository.popDriveRecordList(
        hostId,
        driveRecord._id
      ))
    ) {
      throw new Error("Failed to remove participant list");
    }

    if (
      !(await sectorRecordRepository.appendDriveRecordList(hostId, driveRecord))
    ) {
      throw new Error("Failed to append participant list");
    }

    return driveRecord;
  }

  async delete(hostId: string, driveRecordId: string): Promise<any> {
    const sectorRecord = await sectorRecordRepository.popDriveRecordList(
      hostId,
      driveRecordId
    );
    if (!sectorRecord) {
      console.log("Failed to remove participant list");
      throw new Error("Failed to remove participant list");
    }

    const driveRecord = await DriveRecordSchema.findOneAndDelete({
      _id: driveRecordId,
    }).lean();

    return driveRecord;
  }
}
