import { ParticipantRecordType } from "../../model/index/ParticipantRecord";
import { DriveRecordType } from "../../model/index/DriveRecord";

import { ParticipantRecordSchema } from "../../model/repository/ParticipantRecordSchema";

import { ParticipantRepository } from "../../core/repository/participant";
import { ParticipantMongoRepo } from "../../repository/mongo/participant";

import { ParticipantRecordRepository } from "../../core/repository/participantRecord";

const participantRepository: ParticipantRepository = new ParticipantMongoRepo();

let instance: ParticipantRecordMongoRepo | null = null;
export class ParticipantRecordMongoRepo implements ParticipantRecordRepository {
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

  async isExistParticipantRecord(_id: any): Promise<Boolean> {
    if (await ParticipantRecordSchema.exists({ _id: _id })) {
      return true;
    } else {
      return false;
    }
  }

  async createParticipantRecord(
    data: Partial<ParticipantRecordType>
  ): Promise<any> {
    delete data._id;

    if (!(await participantRepository.isExistParticipant(data.hostId))) {
      throw new Error(
        "Participant data is not founded by hostId, check hostId field in ParticipantRecord data"
      );
    }

    const participantRecord = await ParticipantRecordSchema.create(data);
    if (!participantRecord) {
      throw new Error("Failed to create participantRecord");
    }

    try {
      await participantRepository.appendParticipantRecordList(
        data.hostId,
        participantRecord._id
      );
    } catch (err) {
      throw new Error(
        "Failed to append participantRecord to participant, check hostId"
      );
    }

    return participantRecord;
  }

  async readParticipantRecordList(participant_Id: any): Promise<any> {
    return ParticipantRecordSchema.find({ hostId: participant_Id }).lean();
  }

  async readParticipantRecord(_id: any): Promise<any> {
    const participantRecord = await ParticipantRecordSchema.findOne({
      _id: _id,
    }).lean();
    if (!participantRecord) {
      throw new Error("ParticipantRecord not found");
    }

    return participantRecord;
  }

  async updateParticipantRecord(
    _id: any,
    data: Partial<ParticipantRecordType>,
    replace: boolean = false
  ): Promise<any> {
    const target = this.readonlyFilter(data);
    const originParticipantRecord = this.readonlyFilter(
      await this.readParticipantRecord(_id)
    );

    const srcDriveRecordList = target.driveRecordList;
    const originDriveRecordList = originParticipantRecord.driveRecordList;

    if (!replace && srcDriveRecordList !== undefined) {
      target.driveRecordList = await this.updateDriveRecord(
        srcDriveRecordList,
        originDriveRecordList
      );
    }

    const participantRecord = await ParticipantRecordSchema.findOneAndUpdate(
      { _id: _id },
      target,
      {
        returnDocument: "after",
      }
    ).lean();
    if (!participantRecord) {
      throw new Error("Failed to update participantRecord");
    }

    return participantRecord;
  }

  async deleteParticipantRecord(_id: any): Promise<any> {
    const participantRecord = await ParticipantRecordSchema.findOneAndDelete({
      _id: _id,
    }).lean();
    if (!participantRecord) {
      throw new Error(
        "Failed to delete participantRecord, check participantRecord _id"
      );
    }

    try {
      await participantRepository.popParticipantRecordList(
        participantRecord.hostId,
        participantRecord._id
      );
    } catch (err) {
      throw new Error(
        "Failed to pop participantRecord from participant, check hostId"
      );
    }

    return participantRecord;
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
}
