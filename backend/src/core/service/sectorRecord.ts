import { SectorRecordType } from "@model/SectorRecord";

export interface SectorRecordService {
  post(data: SectorRecordType): Promise<SectorRecordType>;
  patch(id: string, data: Partial<SectorRecordType>): Promise<SectorRecordType>;
  put(id: string, data: Partial<SectorRecordType>): Promise<SectorRecordType>;
  get(id: string): Promise<SectorRecordType>;
  remove(id: string): Promise<SectorRecordType>;
}
