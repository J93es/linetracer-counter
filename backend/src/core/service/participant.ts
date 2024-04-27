import { ParticipantType } from "../../model/index/Participant";

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
  getParticipant(_id: string): Promise<ParticipantType>;
  removeParticipant(_id: string): Promise<ParticipantType>;
}
