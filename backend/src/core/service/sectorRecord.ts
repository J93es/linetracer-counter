import { SectorRecordType } from "../../model/SectorRecord";

export interface SectorRecordServiceInterface {
  postSectorRecord(data: Partial<SectorRecordType>): Promise<SectorRecordType>;
  patchSectorRecord(
    _id: string,
    data: Partial<SectorRecordType>
  ): Promise<SectorRecordType>;
  putSectorRecord(
    _id: string,
    data: Partial<SectorRecordType>
  ): Promise<SectorRecordType>;
  getEverySectorRecord(participant_Id: string): Promise<SectorRecordType[]>;
  getSectorRecord(_id: string): Promise<SectorRecordType>;
  removeSectorRecord(_id: string): Promise<SectorRecordType>;
}
