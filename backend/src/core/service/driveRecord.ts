import { DriveRecordType } from "../../model/DriveRecord";

export interface DriveRecordServiceInterface {
  post(
    hostId: string,
    data: Partial<DriveRecordType>
  ): Promise<DriveRecordType>;
  patch(
    hostId: string,
    _id: string,
    data: Partial<DriveRecordType>
  ): Promise<DriveRecordType>;
  put(
    hostId: string,
    _id: string,
    data: Partial<DriveRecordType>
  ): Promise<DriveRecordType>;
  get(_id: string): Promise<DriveRecordType>;
  remove(hostId: string, _id: string): Promise<DriveRecordType>;
}
