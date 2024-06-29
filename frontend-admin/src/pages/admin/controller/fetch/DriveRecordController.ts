import DriveRecord, { DriveRecordType } from "pages/admin/model/DriveRecord";
import { uri } from "config";

import { isEmptyObject } from "pages/tools/utils";

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
      if (!id) {
        return undefined;
      }
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
      return undefined;
    }
  }

  async post(
    srcData: Partial<DriveRecordType>
  ): Promise<DriveRecordType | undefined> {
    try {
      if (!srcData) {
        return undefined;
      }
      const driveRecord = new DriveRecord(srcData as DriveRecordType);
      const response = await fetch(`${uri}/drive-record`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(driveRecord),
      });
      const resData = await response.json();
      const resDriveRecord = new DriveRecord(resData);

      if (isEmptyObject(resDriveRecord)) {
        return undefined;
      }

      return resDriveRecord;
    } catch (error) {
      console.error("Failed to post DriveRecord data", error);
      return undefined;
    }
  }

  async patch(
    srcData: Partial<DriveRecordType>
  ): Promise<DriveRecordType | undefined> {
    try {
      if (!srcData) {
        return undefined;
      }
      const driveRecord = new DriveRecord(srcData as DriveRecordType);
      const response = await fetch(`${uri}/drive-record/${srcData.id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(driveRecord),
      });
      const resData = await response.json();
      const resDriveRecord = new DriveRecord(resData);

      if (isEmptyObject(resDriveRecord)) {
        return undefined;
      }

      return resDriveRecord;
    } catch (error) {
      console.error("Failed to patch DriveRecord data", error);
      return undefined;
    }
  }

  async put(
    srcData: Partial<DriveRecordType>
  ): Promise<DriveRecordType | undefined> {
    try {
      if (!srcData) {
        return undefined;
      }
      const driveRecord = new DriveRecord(srcData as DriveRecordType);
      const response = await fetch(`${uri}/drive-record/${srcData.id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(driveRecord),
      });
      const resData = await response.json();
      const resDriveRecord = new DriveRecord(resData);

      if (isEmptyObject(resDriveRecord)) {
        return undefined;
      }

      return resDriveRecord;
    } catch (error) {
      console.error("Failed to put DriveRecord data", error);
      return undefined;
    }
  }

  async delete(id: string | undefined): Promise<DriveRecordType | undefined> {
    try {
      if (!id) {
        return undefined;
      }
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
      return undefined;
    }
  }
}
