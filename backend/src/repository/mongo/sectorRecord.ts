import { SectorRecordType } from "@model/SectorRecord";
import { DriveRecordType } from "@model/DriveRecord";

import { SectorRecordSchema } from "@model/repository/SectorRecordSchema";

import { ParticipantRepository } from "@core/repository/participant";
import { ParticipantMongoRepo } from "@repository/mongo/participant";

import { SectorRecordRepository } from "@core/repository/sectorRecord";

const participantRepository: ParticipantRepository = new ParticipantMongoRepo();

let instance: SectorRecordMongoRepo | null = null;
export class SectorRecordMongoRepo implements SectorRecordRepository {
  constructor() {
    if (instance) return instance;
    instance = this;
  }

  private readonlyFilter(data: any) {
    const filteredData = JSON.parse(JSON.stringify(data));

    delete filteredData._id;
    delete filteredData.hostId;

    return filteredData;
  }

  async isExist(_id: any): Promise<Boolean> {
    if (await SectorRecordSchema.exists({ _id: _id })) {
      return true;
    } else {
      return false;
    }
  }

  async create(data: Partial<SectorRecordType>): Promise<any> {
    delete data._id;

    if (!(await participantRepository.isExist(data.hostId))) {
      throw new Error(
        "Participant data is not founded by hostId, check hostId field in SectorRecord data"
      );
    }

    const sectorRecord = await SectorRecordSchema.create(data);
    if (!sectorRecord) {
      throw new Error("Failed to create SectorRecord");
    }

    try {
      await participantRepository.appendSectorRecordList(
        data.hostId,
        sectorRecord._id
      );
    } catch (err) {
      throw new Error(
        "Failed to append SectorRecord to participant, check hostId"
      );
    }

    return sectorRecord;
  }

  async readEvery(participant_Id: any): Promise<any> {
    const sectorRecordIndex = await SectorRecordSchema.find({
      hostId: participant_Id,
    }).lean();
    if (!sectorRecordIndex) {
      throw new Error("SectorRecord list not found");
    }

    return sectorRecordIndex;
  }

  async read(_id: any): Promise<any> {
    const sectorRecord = await SectorRecordSchema.findOne({
      _id: _id,
    }).lean();
    if (!sectorRecord) {
      throw new Error("SectorRecord not found");
    }

    return sectorRecord;
  }

  async update(
    data: Partial<SectorRecordType>,
    replace: boolean = false
  ): Promise<any> {
    const target = this.readonlyFilter(data);
    const originSectorRecord = this.readonlyFilter(await this.read(data._id));

    const srcDriveRecordList = target.driveRecordList;
    const originDriveRecordList = originSectorRecord.driveRecordList;

    if (!replace && srcDriveRecordList !== undefined) {
      target.driveRecordList = await this.updateDriveRecord(
        srcDriveRecordList,
        originDriveRecordList
      );
    }

    const sectorRecord = await SectorRecordSchema.findOneAndUpdate(
      { _id: data._id },
      target,
      {
        returnDocument: "after",
      }
    ).lean();
    if (!sectorRecord) {
      throw new Error("Failed to update SectorRecord");
    }

    return sectorRecord;
  }

  async delete(_id: any): Promise<any> {
    const sectorRecord = await SectorRecordSchema.findOneAndDelete({
      _id: _id,
    }).lean();
    if (!sectorRecord) {
      throw new Error("Failed to delete SectorRecord, check SectorRecord _id");
    }

    try {
      await participantRepository.popSectorRecordList(
        sectorRecord.hostId,
        sectorRecord._id
      );
    } catch (err) {
      throw new Error(
        "Failed to pop SectorRecord from participant, check hostId"
      );
    }

    return sectorRecord;
  }

  private async updateDriveRecord(
    srcDriveRecord: Partial<DriveRecordType>[],
    originDriveRecord: Partial<DriveRecordType>[]
  ): Promise<any> {
    const targetDriveRecord = JSON.parse(JSON.stringify(originDriveRecord));

    for (let i = 0; i < srcDriveRecord.length; i++) {
      let isExist = false;
      for (let j = 0; j < originDriveRecord.length; j++) {
        if (
          String(srcDriveRecord[i]._id) === String(originDriveRecord[j]._id)
        ) {
          targetDriveRecord[j] = {
            ...originDriveRecord[j],
            ...srcDriveRecord[i],
          };
          isExist = true;
          break;
        }
      }
      if (!isExist) {
        targetDriveRecord.push(srcDriveRecord[i]);
      }
    }

    return targetDriveRecord;
  }

  async appendDriveRecordList(
    _id: any,
    driveRecord: DriveRecordType
  ): Promise<any> {
    const sectorRecord = await SectorRecordSchema.findOneAndUpdate(
      { _id: _id },
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

  async popDriveRecordList(_id: any, driveRecord_Id: any): Promise<any> {
    const sectorRecord = await SectorRecordSchema.findOneAndUpdate(
      { _id: _id },
      {
        $pull: { driveRecordList: { _id: driveRecord_Id } },
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
