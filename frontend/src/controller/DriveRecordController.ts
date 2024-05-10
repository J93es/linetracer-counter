import DriveRecord, { DriveRecordType } from "model/DriveRecord";
import { uri } from "../config";

let instance: DriveRecordController | null = null;
export class DriveRecordController {
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  async get(_id: string): Promise<DriveRecordType> {
    try {
      const response = await fetch(`${uri}/drive-record/${_id}`, {
        method: "GET",
        credentials: "include",
      });
      const resData = await response.json();
      const resDriveRecord = new DriveRecord(resData);

      return resDriveRecord;
    } catch (error) {
      console.error("Failed to get DriveRecord data", error);
      throw error;
    }
  }

  async post(
    hostId: string,
    srcData: Partial<DriveRecordType>
  ): Promise<Partial<DriveRecordType>> {
    try {
      const driveRecord = new DriveRecord(srcData as DriveRecordType);
      const response = await fetch(
        `${uri}/drive-record/?sector_record_id=${hostId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(driveRecord),
          credentials: "include",
        }
      );
      const resData = await response.json();
      const resDriveRecord = new DriveRecord(resData);

      return resDriveRecord;
    } catch (error) {
      console.error("Failed to post DriveRecord data", error);
      throw error;
    }
  }

  async patch(
    hostId: string,
    _id: string,
    srcData: Partial<DriveRecordType>
  ): Promise<Partial<DriveRecordType>> {
    try {
      const driveRecord = new DriveRecord(srcData as DriveRecordType);
      const response = await fetch(
        `${uri}/drive-record/${_id}?sector_record_id=${hostId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(driveRecord),
          credentials: "include",
        }
      );
      const resData = await response.json();
      const resDriveRecord = new DriveRecord(resData);

      return resDriveRecord;
    } catch (error) {
      console.error("Failed to patch DriveRecord data", error);
      throw error;
    }
  }

  async put(
    hostId: string,
    _id: string,
    srcData: Partial<DriveRecordType>
  ): Promise<Partial<DriveRecordType>> {
    try {
      const driveRecord = new DriveRecord(srcData as DriveRecordType);
      const response = await fetch(
        `${uri}/drive-record/${_id}?sector_record_id=${hostId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(driveRecord),
          credentials: "include",
        }
      );
      const resData = await response.json();
      const resDriveRecord = new DriveRecord(resData);

      return resDriveRecord;
    } catch (error) {
      console.error("Failed to put DriveRecord data", error);
      throw error;
    }
  }

  async delete(hostId: string, _id: string): Promise<Partial<DriveRecordType>> {
    try {
      const response = await fetch(
        `${uri}/drive-record/${_id}/?sector_record_id=${hostId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const resData = await response.json();
      const resDriveRecord = new DriveRecord(resData);

      return resDriveRecord;
    } catch (error) {
      console.error("Failed to delete DriveRecord data", error);
      throw error;
    }
  }
}
