import { ParticipantRecordType } from "../../model/index/ParticipantRecord";

export interface ParticipantRecordRepository {
  isExistParticipantRecord(_id: any): Promise<Boolean>;
  createParticipantRecord(data: ParticipantRecordType): Promise<any>;
  readParticipantRecord(_id: any): Promise<any>;
  updateParticipantRecord(
    _id: any,
    data: Partial<ParticipantRecordType>,
    replace: boolean
  ): Promise<any>;
  deleteParticipantRecord(_id: any): Promise<any>;
}
