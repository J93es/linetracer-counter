import DriveRecord, { DriveRecordType } from "model/DriveRecord";
import { uri } from "../config";

import { isEmptyObject } from "tools/utils";

let instance: DriveRecordController | null = null;
export class DriveRecordController {
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  async get(id: string | undefined): Promise<DriveRecordType | undefined> {
    try {
      const response = await fetch(`${uri}/drive-record/${id}`, {
        method: "GET",
        credentials: "include",
      });
      const resData = await response.json();
      const resDriveRecord = new DriveRecord(resData);

      if (isEmptyObject(resDriveRecord)) {
        return undefined;
      }

      return resDriveRecord;
    } catch (error) {
      console.error("Failed to get DriveRecord data", error);
      throw error;
    }
  }

  async post(
    srcData: Partial<DriveRecordType>
  ): Promise<DriveRecordType | undefined> {
    try {
      const driveRecord = new DriveRecord(srcData as DriveRecordType);
      const response = await fetch(`${uri}/drive-record`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(driveRecord),
        credentials: "include",
      });
      const resData = await response.json();
      const resDriveRecord = new DriveRecord(resData);

      if (isEmptyObject(resDriveRecord)) {
        return undefined;
      }

      return resDriveRecord;
    } catch (error) {
      console.error("Failed to post DriveRecord data", error);
      throw error;
    }
  }

  async patch(
    srcData: Partial<DriveRecordType>
  ): Promise<DriveRecordType | undefined> {
    try {
      const driveRecord = new DriveRecord(srcData as DriveRecordType);
      const response = await fetch(`${uri}/drive-record/${srcData.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(driveRecord),
        credentials: "include",
      });
      const resData = await response.json();
      const resDriveRecord = new DriveRecord(resData);

      if (isEmptyObject(resDriveRecord)) {
        return undefined;
      }

      return resDriveRecord;
    } catch (error) {
      console.error("Failed to patch DriveRecord data", error);
      throw error;
    }
  }

  async put(
    srcData: Partial<DriveRecordType>
  ): Promise<DriveRecordType | undefined> {
    try {
      const driveRecord = new DriveRecord(srcData as DriveRecordType);
      const response = await fetch(`${uri}/drive-record/${srcData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(driveRecord),
        credentials: "include",
      });
      const resData = await response.json();
      const resDriveRecord = new DriveRecord(resData);

      if (isEmptyObject(resDriveRecord)) {
        return undefined;
      }

      return resDriveRecord;
    } catch (error) {
      console.error("Failed to put DriveRecord data", error);
      throw error;
    }
  }

  async delete(id: string | undefined): Promise<DriveRecordType | undefined> {
    try {
      const response = await fetch(`${uri}/drive-record/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const resData = await response.json();
      const resDriveRecord = new DriveRecord(resData);

      if (isEmptyObject(resDriveRecord)) {
        return undefined;
      }

      return resDriveRecord;
    } catch (error) {
      console.error("Failed to delete DriveRecord data", error);
      throw error;
    }
  }
}
