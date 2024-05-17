import { DriveRecordType } from "@model/DriveRecord";

export interface DriveRecordRepository {
  isExist(id: string): Promise<Boolean>;
  create(data: Partial<DriveRecordType>): Promise<DriveRecordType>;
  read(id: string): Promise<DriveRecordType>;
  update(data: Partial<DriveRecordType>): Promise<DriveRecordType>;
  delete(id: string): Promise<DriveRecordType>;
}
