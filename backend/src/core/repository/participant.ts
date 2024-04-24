import { ParticipantType } from "../../model/Participant";

export interface ParticipantRepository {
  createParticipant(data: Partial<ParticipantType>): Promise<any>;
  readParticipant(filter: object): Promise<any>;
  updateParticipant(
    filter: object,
    data: Partial<ParticipantType>
  ): Promise<any>;
  deleteParticipant(filter: object): Promise<any>;
}
