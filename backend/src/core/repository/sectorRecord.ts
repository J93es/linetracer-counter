import { SectorRecordType } from "../../model/SectorRecord";
import { DriveRecordType } from "../../model/DriveRecord";

export interface SectorRecordRepository {
  isExist(_id: any): Promise<Boolean>;
  create(data: SectorRecordType): Promise<any>;
  readEvery(participant_Id: any): Promise<any>;
  read(_id: any): Promise<any>;
  update(data: Partial<SectorRecordType>, replace: boolean): Promise<any>;
  delete(_id: any): Promise<any>;
  appendDriveRecordList(_id: any, driveRecord: DriveRecordType): Promise<any>;
  popDriveRecordList(_id: any, driveRecord_Id: any): Promise<any>;
}
