import SectorRecord, { SectorRecordType } from "pages/admin/model/SectorRecord";
import { uri } from "config";

import { isEmptyObject } from "pages/tools/utils";

let instance: SectorRecordController | null = null;
export class SectorRecordController {
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  async get(id: string | undefined): Promise<SectorRecordType | undefined> {
    try {
      if (!id) {
        return undefined;
      }
      const response = await fetch(`${uri}/sector-record/${id}`, {
        method: "GET",
        credentials: "include",
      });
      const resData = await response.json();
      const resSectorRecord = new SectorRecord(resData);

      if (isEmptyObject(resSectorRecord)) {
        return undefined;
      }

      return resSectorRecord;
    } catch (error) {
      console.error("Failed to get SectorRecord data", error);
      return undefined;
    }
  }

  async post(
    srcData: Partial<SectorRecordType>
  ): Promise<SectorRecordType | undefined> {
    try {
      if (!srcData) {
        return undefined;
      }
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

      if (isEmptyObject(resSectorRecord)) {
        return undefined;
      }

      return resSectorRecord;
    } catch (error) {
      console.error("Failed to post SectorRecord data", error);
      return undefined;
    }
  }

  async patch(
    srcData: Partial<SectorRecordType>
  ): Promise<SectorRecordType | undefined> {
    try {
      if (!srcData) {
        return undefined;
      }
      const sectorRecord = new SectorRecord(srcData as SectorRecordType);
      const response = await fetch(`${uri}/Sector-record/${srcData.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sectorRecord),
        credentials: "include",
      });
      const resData = await response.json();
      const resSectorRecord = new SectorRecord(resData);

      if (isEmptyObject(resSectorRecord)) {
        return undefined;
      }

      return resSectorRecord;
    } catch (error) {
      console.error("Failed to patch SectorRecord data", error);
      return undefined;
    }
  }

  async put(
    srcData: Partial<SectorRecordType>
  ): Promise<SectorRecordType | undefined> {
    try {
      if (!srcData) {
        return undefined;
      }
      const sectorRecord = new SectorRecord(srcData as SectorRecordType);
      const response = await fetch(`${uri}/Sector-record/${srcData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sectorRecord),
        credentials: "include",
      });
      const resData = await response.json();
      const resSectorRecord = new SectorRecord(resData);

      if (isEmptyObject(resSectorRecord)) {
        return undefined;
      }

      return resSectorRecord;
    } catch (error) {
      console.error("Failed to put SectorRecord data", error);
      return undefined;
    }
  }

  async delete(id: string | undefined): Promise<SectorRecordType | undefined> {
    try {
      if (!id) {
        return undefined;
      }
      const response = await fetch(`${uri}/sector-record/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const resData = await response.json();
      const resSectorRecord = new SectorRecord(resData);

      if (isEmptyObject(resSectorRecord)) {
        return undefined;
      }

      return resSectorRecord;
    } catch (error) {
      console.error("Failed to delete SectorRecord data", error);
      return undefined;
    }
  }
}
