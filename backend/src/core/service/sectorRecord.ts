import { SectorRecordType } from "../../model/SectorRecord";

export interface SectorRecordServiceInterface {
  post(data: Partial<SectorRecordType>): Promise<SectorRecordType>;
  patch(
    _id: string,
    data: Partial<SectorRecordType>
  ): Promise<SectorRecordType>;
  put(_id: string, data: Partial<SectorRecordType>): Promise<SectorRecordType>;
  getEvery(participant_Id: string): Promise<SectorRecordType[]>;
  get(_id: string): Promise<SectorRecordType>;
  remove(_id: string): Promise<SectorRecordType>;
}
