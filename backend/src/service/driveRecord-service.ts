import { DriveRecordServiceInterface } from "@src/core/service/driveRecord";

import DriveRecord, { DriveRecordType } from "@src/model/DriveRecord";

import { DriveRecordRepository } from "@src/core/repository/driveRecord";
import { DriveRecordMongoRepo } from "@src/repository/mongo/driveRecord";

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

  async post(
    hostId: string,
    data: Partial<DriveRecordType>
  ): Promise<DriveRecordType> {
    const srcDriveRecord: Partial<DriveRecordType> = new DriveRecord(
      data as DriveRecordType
    );
    const driveRecord: Partial<DriveRecordType> =
      await driveRecordRepository.create(
        hostId,
        srcDriveRecord as DriveRecordType
      );

    return new DriveRecord(driveRecord as DriveRecordType);
  }

  async patch(
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
      await driveRecordRepository.update(hostId, srcDriveRecord);

    return new DriveRecord(driveRecord as DriveRecordType);
  }

  async put(
    hostId: string,
    _id: string,
    data: Partial<DriveRecordType>
  ): Promise<DriveRecordType> {
    const srcDriveRecord: Partial<DriveRecordType> = new DriveRecord(
      data as DriveRecordType
    );

    this._idFilter(_id, srcDriveRecord);

    const driveRecord: Partial<DriveRecordType> =
      await driveRecordRepository.update(hostId, srcDriveRecord);

    return new DriveRecord(driveRecord as DriveRecordType);
  }

  async get(_id: string): Promise<DriveRecordType> {
    const driveRecord: Partial<DriveRecordType> =
      await driveRecordRepository.read(_id);

    return new DriveRecord(driveRecord as DriveRecordType);
  }

  async remove(hostId: string, _id: string): Promise<DriveRecordType> {
    const driveRecord: Partial<DriveRecordType> =
      await driveRecordRepository.delete(hostId, _id);

    return new DriveRecord(driveRecord as DriveRecordType);
  }
}
