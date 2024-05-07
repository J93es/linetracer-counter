import { DriveRecordServiceInterface } from "../core/service/driveRecord";

import DriveRecord, { DriveRecordType } from "../model/DriveRecord";

import { DriveRecordRepository } from "../core/repository/driveRecord";
import { DriveRecordMongoRepo } from "../repository/mongo/driveRecord";

const driveRecordRepository: DriveRecordRepository = new DriveRecordMongoRepo();

let instance: DriveRecordService | null = null;
export class DriveRecordService implements DriveRecordServiceInterface {
  constructor() {
    if (instance) return instance;
    instance = this;
  }

  private _idFilter(_id: string, srcData: Partial<DriveRecordType>): void {
    if (!srcData._id) {
      throw new Error("_id is required");
    }
    if (String(_id) !== String(srcData._id)) {
      throw new Error(
        "_id is not matched : query _id and body _id is different"
      );
    }
  }

  private patchReadonlyFilter(
    srcDriveRecord: Partial<DriveRecordType>
  ): Partial<DriveRecordType> {
    const filteredDriveRecord = JSON.parse(JSON.stringify(srcDriveRecord));

    delete filteredDriveRecord.recordTime;

    return filteredDriveRecord;
  }

  async postDriveRecord(
    hostId: string,
    data: Partial<DriveRecordType>
  ): Promise<DriveRecordType> {
    const srcDriveRecord: Partial<DriveRecordType> = new DriveRecord(
      data as DriveRecordType
    );
    const driveRecord: Partial<DriveRecordType> =
      await driveRecordRepository.createDriveRecord(
        hostId,
        srcDriveRecord as DriveRecordType
      );

    return new DriveRecord(driveRecord as DriveRecordType);
  }

  async patchDriveRecord(
    hostId: string,
    _id: string,
    data: Partial<DriveRecordType>
  ): Promise<DriveRecordType> {
    let srcDriveRecord: Partial<DriveRecordType> = new DriveRecord(
      data as DriveRecordType
    );

    this._idFilter(_id, srcDriveRecord);

    srcDriveRecord = this.patchReadonlyFilter(srcDriveRecord);

    const driveRecord: Partial<DriveRecordType> =
      await driveRecordRepository.updateDriveRecord(hostId, srcDriveRecord);

    return new DriveRecord(driveRecord as DriveRecordType);
  }

  async putDriveRecord(
    hostId: string,
    _id: string,
    data: Partial<DriveRecordType>
  ): Promise<DriveRecordType> {
    const srcDriveRecord: Partial<DriveRecordType> = new DriveRecord(
      data as DriveRecordType
    );

    this._idFilter(_id, srcDriveRecord);

    const driveRecord: Partial<DriveRecordType> =
      await driveRecordRepository.updateDriveRecord(hostId, srcDriveRecord);

    return new DriveRecord(driveRecord as DriveRecordType);
  }

  async getDriveRecord(_id: string): Promise<DriveRecordType> {
    const driveRecord: Partial<DriveRecordType> =
      await driveRecordRepository.readDriveRecord(_id);

    return new DriveRecord(driveRecord as DriveRecordType);
  }

  async removeDriveRecord(
    hostId: string,
    _id: string
  ): Promise<DriveRecordType> {
    const driveRecord: Partial<DriveRecordType> =
      await driveRecordRepository.deleteDriveRecord(hostId, _id);

    return new DriveRecord(driveRecord as DriveRecordType);
  }
}
