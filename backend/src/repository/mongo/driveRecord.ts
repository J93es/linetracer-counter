import { DriveRecordType } from "@model/DriveRecord";
import { DriveRecordRepository } from "@core/repository/driveRecord";
import { DriveRecordSchema } from "@model/repository/mongo/index";

import { sectorRecordRepository } from "@repository/index";

import { idController } from "@core/main";

let instance: DriveRecordMongoRepo | null = null;
export class DriveRecordMongoRepo implements DriveRecordRepository {
  constructor() {
    if (instance) return instance;
    instance = this;
  }

  async isExist(id: string): Promise<Boolean> {
    if (await DriveRecordSchema.exists({ id: id })) {
      return true;
    } else {
      return false;
    }
  }

  async create(data: Partial<DriveRecordType>): Promise<DriveRecordType> {
    if (!(await sectorRecordRepository.isExist(data.hostId ?? ""))) {
      throw new Error("host(SectorRecord) not found by hostId");
    }

    const newId = idController.generateId();
    const driveRecord: DriveRecordType | null = await DriveRecordSchema.create({
      ...data,
      id: newId,
      _id: newId,
    });
    if (!driveRecord) {
      throw new Error("Failed to create driveRecord");
    }

    try {
      await sectorRecordRepository.appendDriveRecordList(
        driveRecord.hostId,
        driveRecord
      );
    } catch (e) {
      throw new Error("Failed to append drive record list");
    }

    return driveRecord;
  }

  async read(id: string): Promise<DriveRecordType> {
    const driveRecord: DriveRecordType | null = await DriveRecordSchema.findOne(
      {
        id: id,
      }
    ).lean();
    if (!driveRecord) {
      throw new Error("Failed to get driveRecord");
    }

    return driveRecord;
  }

  async update(data: Partial<DriveRecordType>): Promise<DriveRecordType> {
    const driveRecord: DriveRecordType | null =
      await DriveRecordSchema.findOneAndUpdate({ id: data.id }, data, {
        returnDocument: "after",
      }).lean();
    if (!driveRecord) {
      throw new Error("Failed to update driveRecord");
    }

    try {
      await sectorRecordRepository.popDriveRecordList(
        driveRecord.hostId,
        driveRecord.id
      );
    } catch (err) {
      throw new Error("Failed to remove drive record list");
    }

    try {
      await sectorRecordRepository.appendDriveRecordList(
        driveRecord.hostId,
        driveRecord
      );
    } catch (err) {
      throw new Error("Failed to append drive record list");
    }

    return driveRecord;
  }

  async delete(driveRecordId: string): Promise<DriveRecordType> {
    const driveRecord = await DriveRecordSchema.findOneAndDelete({
      id: driveRecordId,
    }).lean();
    if (!driveRecord) {
      throw new Error("Failed to delete driveRecord");
    }

    try {
      await sectorRecordRepository.popDriveRecordList(
        driveRecord.hostId,
        driveRecordId
      );
    } catch (err) {
      throw new Error("Failed to remove drive record list");
    }

    return driveRecord;
  }
}
