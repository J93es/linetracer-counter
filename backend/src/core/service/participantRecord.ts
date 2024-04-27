import { ParticipantRecordType } from "../model/participantRecord";

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
  getParticipantRecord(_id: string): Promise<ParticipantRecordType>;
  removeParticipantRecord(_id: string): Promise<ParticipantRecordType>;
}
