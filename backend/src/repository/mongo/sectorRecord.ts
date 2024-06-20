import { SectorRecordType } from "@model/SectorRecord";
import { DriveRecordType } from "@model/DriveRecord";

import { SectorRecordSchema } from "@src/repository/mongo/schema/index";
import { SectorRecordRepository } from "@core/repository/sectorRecord";

import { participantRepository } from "@repository/index";

import { idController } from "@core/main";

let instance: SectorRecordMongoRepo | null = null;
export class SectorRecordMongoRepo implements SectorRecordRepository {
  constructor() {
    if (instance) return instance;
    instance = this;
  }

  private readonlyFilter(data: Partial<SectorRecordType>) {
    const { _id, id, hostId, driveRecordList, ...filteredData } = data;

    return filteredData;
  }

  async isExist(id: string): Promise<Boolean> {
    if (await SectorRecordSchema.exists({ id: id })) {
      return true;
    } else {
      return false;
    }
  }

  async create(data: Partial<SectorRecordType>): Promise<SectorRecordType> {
    if (!data.hostId) {
      throw new Error("hostId is required");
    }

    if (!(await participantRepository.isExist(data.hostId))) {
      throw new Error(
        "Participant data is not founded by hostId, check hostId field in SectorRecord data"
      );
    }

    const newId = idController.generateId();
    const sectorRecord: SectorRecordType = await SectorRecordSchema.create({
      ...data,
      id: newId,
      _id: newId,
    });
    if (!sectorRecord) {
      throw new Error("Failed to create SectorRecord");
    }

    try {
      await participantRepository.appendSectorRecordList(
        sectorRecord.hostId,
        sectorRecord.id
      );
    } catch (err) {
      throw new Error(
        "Failed to append SectorRecord to participant, check hostId"
      );
    }

    return sectorRecord;
  }

  async read(id: string): Promise<SectorRecordType> {
    const sectorRecord = await SectorRecordSchema.findOne({
      id: id,
    }).lean();
    if (!sectorRecord) {
      throw new Error("SectorRecord not found");
    }

    return sectorRecord;
  }

  async update(data: Partial<SectorRecordType>): Promise<SectorRecordType> {
    if (!data.id) {
      throw new Error("SectorRecord id is required");
    }

    const id = data.id;
    const filteredData = this.readonlyFilter(data);

    const sectorRecord = await SectorRecordSchema.findOneAndUpdate(
      { id: id },
      filteredData,
      {
        returnDocument: "after",
      }
    ).lean();
    if (!sectorRecord) {
      throw new Error("Failed to update SectorRecord");
    }

    return sectorRecord;
  }

  async delete(id: string): Promise<any> {
    const sectorRecord = await SectorRecordSchema.findOneAndDelete({
      id: id,
    }).lean();
    if (!sectorRecord) {
      throw new Error("Failed to delete SectorRecord, check SectorRecord id");
    }

    try {
      await participantRepository.popSectorRecordList(
        sectorRecord.hostId,
        sectorRecord.id
      );
    } catch (err) {
      throw new Error(
        "Failed to pop SectorRecord from participant, check hostId"
      );
    }

    return sectorRecord;
  }

  async appendDriveRecordList(
    id: string,
    driveRecord: DriveRecordType
  ): Promise<SectorRecordType> {
    const sectorRecord = await SectorRecordSchema.findOneAndUpdate(
      { id: id },
      {
        $addToSet: { driveRecordList: driveRecord },
      },
      {
        returnDocument: "after",
      }
    ).lean();
    if (!sectorRecord) {
      throw new Error("Failed to append participant list");
    }

    return sectorRecord;
  }

  async popDriveRecordList(
    id: string,
    driveRecordId: string
  ): Promise<SectorRecordType> {
    const sectorRecord = await SectorRecordSchema.findOneAndUpdate(
      { id: id },
      {
        $pull: { driveRecordList: { id: driveRecordId } },
      },
      {
        returnDocument: "after",
      }
    ).lean();
    if (!sectorRecord) {
      throw new Error("Failed to remove participant list");
    }

    return sectorRecord;
  }
}
