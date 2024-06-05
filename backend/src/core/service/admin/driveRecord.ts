import { DriveRecordType } from "@model/DriveRecord";

export interface DriveRecordService {
  post(data: DriveRecordType): Promise<DriveRecordType>;
  patch(id: string, data: Partial<DriveRecordType>): Promise<DriveRecordType>;
  put(id: string, data: Partial<DriveRecordType>): Promise<DriveRecordType>;
  get(id: string): Promise<DriveRecordType>;
  remove(id: string): Promise<DriveRecordType>;
}
