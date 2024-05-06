import { ParticipantRecordType } from "../../model/ParticipantRecord";

export interface ParticipantRecordServiceInterface {
  postParticipantRecord(
    data: Partial<ParticipantRecordType>
  ): Promise<ParticipantRecordType>;
  patchParticipantRecord(
    _id: string,
    data: Partial<ParticipantRecordType>
  ): Promise<ParticipantRecordType>;
  putParticipantRecord(
    _id: string,
    data: Partial<ParticipantRecordType>
  ): Promise<ParticipantRecordType>;
  getEveryParticipantRecord(
    participant_Id: string
  ): Promise<ParticipantRecordType[]>;
  getParticipantRecord(_id: string): Promise<ParticipantRecordType>;
  removeParticipantRecord(_id: string): Promise<ParticipantRecordType>;
}
