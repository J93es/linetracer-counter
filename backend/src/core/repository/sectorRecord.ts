import { SectorRecordType } from "../../model/SectorRecord";
import { DriveRecordType } from "../../model/DriveRecord";

export interface SectorRecordRepository {
  isExistSectorRecord(_id: any): Promise<Boolean>;
  createSectorRecord(data: SectorRecordType): Promise<any>;
  readEverySectorRecord(participant_Id: any): Promise<any>;
  readSectorRecord(_id: any): Promise<any>;
  updateSectorRecord(
    data: Partial<SectorRecordType>,
    replace: boolean
  ): Promise<any>;
  deleteSectorRecord(_id: any): Promise<any>;
  appendDriveRecordList(_id: any, driveRecord: DriveRecordType): Promise<any>;
  popDriveRecordList(_id: any, driveRecord_Id: any): Promise<any>;
}
