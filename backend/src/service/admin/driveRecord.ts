import { DriveRecordService } from "@src/core/service/admin/driveRecord";

import DriveRecord, { DriveRecordType } from "@model/DriveRecord";

import { driveRecordRepository } from "@repository/index";

let instance: DriveRecordServ | null = null;
export class DriveRecordServ implements DriveRecordService {
  constructor() {
    if (instance) return instance;
    instance = this;
  }

  private idFilter(id: string, srcData: Partial<DriveRecordType>): void {
    if (!srcData.id) {
      throw new Error("id is required");
    }
    if (String(id) !== String(srcData.id)) {
      throw new Error("id is not matched : query id and body id is different");
    }
  }

  private patchReadonlyFilter(
    srcDriveRecord: Partial<DriveRecordType>
  ): Partial<DriveRecordType> {
    const { recordTime, ...filteredDriveRecord } = srcDriveRecord;

    return filteredDriveRecord;
  }

  async post(data: Partial<DriveRecordType>): Promise<DriveRecordType> {
    const srcDriveRecord: Partial<DriveRecordType> = new DriveRecord(
      data as DriveRecordType
    );
    const driveRecord: DriveRecordType = await driveRecordRepository.create(
      srcDriveRecord as DriveRecordType
    );

    return new DriveRecord(driveRecord);
  }

  async patch(
    id: string,
    data: Partial<DriveRecordType>
  ): Promise<DriveRecordType> {
    let srcDriveRecord: Partial<DriveRecordType> = new DriveRecord(
      data as DriveRecordType
    );

    this.idFilter(id, srcDriveRecord);

    srcDriveRecord = this.patchReadonlyFilter(srcDriveRecord);

    const driveRecord: Partial<DriveRecordType> =
      await driveRecordRepository.update(srcDriveRecord);

    return new DriveRecord(driveRecord as DriveRecordType);
  }

  async put(
    id: string,
    data: Partial<DriveRecordType>
  ): Promise<DriveRecordType> {
    const srcDriveRecord: Partial<DriveRecordType> = new DriveRecord(
      data as DriveRecordType
    );

    this.idFilter(id, srcDriveRecord);

    const driveRecord: Partial<DriveRecordType> =
      await driveRecordRepository.update(srcDriveRecord);

    return new DriveRecord(driveRecord as DriveRecordType);
  }

  async get(id: string): Promise<DriveRecordType> {
    const driveRecord: Partial<DriveRecordType> =
      await driveRecordRepository.read(id);

    return new DriveRecord(driveRecord as DriveRecordType);
  }

  async remove(id: string): Promise<DriveRecordType> {
    const driveRecord: Partial<DriveRecordType> =
      await driveRecordRepository.delete(id);

    return new DriveRecord(driveRecord as DriveRecordType);
  }
}
