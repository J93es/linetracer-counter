import { ParticipantType } from "@model/Participant";

export interface ParticipantService {
  post(data: ParticipantType): Promise<ParticipantType>;
  patch(id: string, data: Partial<ParticipantType>): Promise<ParticipantType>;
  put(id: string, data: Partial<ParticipantType>): Promise<ParticipantType>;
  get(id: string): Promise<ParticipantType>;
  remove(id: string): Promise<ParticipantType>;
}
