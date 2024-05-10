import SectorRecord, { SectorRecordType } from "model/SectorRecord";
import { uri } from "../config";

let instance: SectorRecordController | null = null;
export class SectorRecordController {
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  async getEvery(sectorId: string): Promise<SectorRecordType[]> {
    try {
      const response = await fetch(
        `${uri}/sector-record/?sector_Id=${sectorId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const resDataList = await response.json();
      const resSectorRecordList = resDataList.map(
        (data: any) => new SectorRecord(data)
      );

      return resSectorRecordList;
    } catch (error) {
      console.error("Failed to get EverySectorRecord data", error);
      throw error;
    }
  }

  async get(_id: string): Promise<SectorRecordType> {
    try {
      const response = await fetch(`${uri}/sector-record/${_id}`, {
        method: "GET",
        credentials: "include",
      });
      const resData = await response.json();
      const resSectorRecord = new SectorRecord(resData);

      return resSectorRecord;
    } catch (error) {
      console.error("Failed to get SectorRecord data", error);
      throw error;
    }
  }

  async post(
    srcData: Partial<SectorRecordType>
  ): Promise<Partial<SectorRecordType>> {
    try {
      const sectorRecord = new SectorRecord(srcData as SectorRecordType);
      const response = await fetch(`${uri}/Sector-record`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sectorRecord),
        credentials: "include",
      });
      const resData = await response.json();
      const resSectorRecord = new SectorRecord(resData);

      return resSectorRecord;
    } catch (error) {
      console.error("Failed to post SectorRecord data", error);
      throw error;
    }
  }

  async patch(
    _id: string,
    srcData: Partial<SectorRecordType>
  ): Promise<Partial<SectorRecordType>> {
    try {
      const sectorRecord = new SectorRecord(srcData as SectorRecordType);
      const response = await fetch(`${uri}/Sector-record/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sectorRecord),
        credentials: "include",
      });
      const resData = await response.json();
      const resSectorRecord = new SectorRecord(resData);

      return resSectorRecord;
    } catch (error) {
      console.error("Failed to patch SectorRecord data", error);
      throw error;
    }
  }

  async put(
    _id: string,
    srcData: Partial<SectorRecordType>
  ): Promise<Partial<SectorRecordType>> {
    try {
      const sectorRecord = new SectorRecord(srcData as SectorRecordType);
      const response = await fetch(`${uri}/Sector-record/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sectorRecord),
        credentials: "include",
      });
      const resData = await response.json();
      const resSectorRecord = new SectorRecord(resData);

      return resSectorRecord;
    } catch (error) {
      console.error("Failed to put SectorRecord data", error);
      throw error;
    }
  }

  async delete(_id: string): Promise<Partial<SectorRecordType>> {
    try {
      const response = await fetch(`${uri}/sector-record/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const resData = await response.json();
      const resSectorRecord = new SectorRecord(resData);

      return resSectorRecord;
    } catch (error) {
      console.error("Failed to delete SectorRecord data", error);
      throw error;
    }
  }
}
