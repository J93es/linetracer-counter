import { ParticipantRecordType } from "../../model/ParticipantRecord";

export interface ParticipantRecordRepository {
  isExistParticipantRecord(_id: any): Promise<Boolean>;
  createParticipantRecord(data: ParticipantRecordType): Promise<any>;
  readParticipantRecordIndex(participant_Id: any): Promise<any>;
  readParticipantRecord(_id: any): Promise<any>;
  updateParticipantRecord(
    _id: any,
    data: Partial<ParticipantRecordType>,
    replace: boolean
  ): Promise<any>;
  deleteParticipantRecord(_id: any): Promise<any>;
}
