import { DriveRecordType } from "../../model/DriveRecord";

export interface DriveRecordServiceInterface {
  postDriveRecord(
    hostId: string,
    data: Partial<DriveRecordType>
  ): Promise<DriveRecordType>;
  patchDriveRecord(
    hostId: string,
    _id: string,
    data: Partial<DriveRecordType>
  ): Promise<DriveRecordType>;
  putDriveRecord(
    hostId: string,
    _id: string,
    data: Partial<DriveRecordType>
  ): Promise<DriveRecordType>;
  getDriveRecord(_id: string): Promise<DriveRecordType>;
  removeDriveRecord(hostId: string, _id: string): Promise<DriveRecordType>;
}
