import { ParticipantRecordType } from "../../model/ParticipantRecord";
import { DriveRecordType } from "../../model/DriveRecord";

export interface ParticipantRecordRepository {
  isExistParticipantRecord(_id: any): Promise<Boolean>;
  createParticipantRecord(data: ParticipantRecordType): Promise<any>;
  readEveryParticipantRecord(participant_Id: any): Promise<any>;
  readParticipantRecord(_id: any): Promise<any>;
  updateParticipantRecord(
    data: Partial<ParticipantRecordType>,
    replace: boolean
  ): Promise<any>;
  deleteParticipantRecord(_id: any): Promise<any>;
  appendDriveRecordList(_id: any, driveRecord: DriveRecordType): Promise<any>;
  popDriveRecordList(_id: any, driveRecord_Id: any): Promise<any>;
}
