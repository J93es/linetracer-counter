import { DriveRecordType } from "../../model/DriveRecord";

export interface DriveRecordRepository {
  isExistDriveRecord(_id: string): Promise<Boolean>;
  createDriveRecord(hostId: string, data: DriveRecordType): Promise<any>;
  readDriveRecord(_id: string): Promise<any>;
  updateDriveRecord(
    hostId: string,
    data: Partial<DriveRecordType>
  ): Promise<any>;
  deleteDriveRecord(hostId: string, _id: string): Promise<DriveRecordType>;
}
