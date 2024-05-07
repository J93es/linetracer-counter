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

  async getDriveRecord(_id: string): Promise<DriveRecordType> {
    try {
      const response = await fetch(`${uri}/drive-record/${_id}`, {
        method: "GET",
        credentials: "include",
      });
      const resData = await response.json();
      const resDriveRecord = new DriveRecord(resData);

      return resDriveRecord;
    } catch (error) {
      console.error("Failed to fetch data", error);
      throw new Error("Failed to fetch data");
    }
  }

  async postDriveRecord(
    hostId: string,
    srcData: Partial<DriveRecordType>
  ): Promise<Partial<DriveRecordType>> {
    try {
      const driveRecord = new DriveRecord(srcData as DriveRecordType);
      const response = await fetch(
        `${uri}/drive-record/?participant_record_id=${hostId}`,
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
      throw new Error("Failed to post DriveRecord data");
    }
  }

  async patchDriveRecord(
    hostId: string,
    _id: string,
    srcData: Partial<DriveRecordType>
  ): Promise<Partial<DriveRecordType>> {
    try {
      const driveRecord = new DriveRecord(srcData as DriveRecordType);
      const response = await fetch(
        `${uri}/drive-record/${_id}?participant_record_id=${hostId}`,
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
      throw new Error("Failed to post DriveRecord data");
    }
  }

  async putDriveRecord(
    hostId: string,
    _id: string,
    srcData: Partial<DriveRecordType>
  ): Promise<Partial<DriveRecordType>> {
    try {
      const driveRecord = new DriveRecord(srcData as DriveRecordType);
      const response = await fetch(
        `${uri}/drive-record/${_id}?participant_record_id=${hostId}`,
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
      throw new Error("Failed to post DriveRecord data");
    }
  }

  async deleteDriveRecord(
    hostId: string,
    _id: string
  ): Promise<Partial<DriveRecordType>> {
    try {
      const response = await fetch(
        `${uri}/Drive-record/${_id}/participant_record_id=${hostId}`,
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
      throw new Error("Failed to post DriveRecord data");
    }
  }
}
