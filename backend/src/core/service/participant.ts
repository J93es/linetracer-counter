import { ParticipantType } from "../../model/Participant";

export interface ParticipantServiceInterface {
  postParticipant(data: Partial<ParticipantType>): Promise<ParticipantType>;
  patchParticipant(
    _id: string,
    data: Partial<ParticipantType>
  ): Promise<ParticipantType>;
  putParticipant(
    _id: string,
    data: Partial<ParticipantType>
  ): Promise<ParticipantType>;
  getParticipantIndex(contest_Id: string): Promise<ParticipantType[]>;
  getParticipant(_id: string): Promise<ParticipantType>;
  removeParticipant(_id: string): Promise<ParticipantType>;
}
