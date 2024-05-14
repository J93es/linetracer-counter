import { DriveRecordType } from "@src/model/DriveRecord";

export interface DriveRecordRepository {
  isExist(_id: string): Promise<Boolean>;
  create(hostId: string, data: DriveRecordType): Promise<any>;
  read(_id: string): Promise<any>;
  update(hostId: string, data: Partial<DriveRecordType>): Promise<any>;
  delete(hostId: string, _id: string): Promise<DriveRecordType>;
}
