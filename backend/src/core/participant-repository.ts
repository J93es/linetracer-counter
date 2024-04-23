import { ParticipantType } from "../model/index/Participant";

export interface ParticipantRepository {
  createParticipant(srcData: ParticipantType): Promise<ParticipantType>;
  readParticipant(id: string): Promise<ParticipantType>;
  updateParticipant(
    srcData: Partial<ParticipantType>
  ): Promise<ParticipantType>;
  replaceParticipant(srcData: ParticipantType): Promise<ParticipantType>;
  deleteParticipant(id: string): Promise<ParticipantType>;
}
