import { ParticipantType } from "@model/Participant";

export interface ParticipantServiceInterface {
  post(data: Partial<ParticipantType>): Promise<ParticipantType>;
  patch(_id: string, data: Partial<ParticipantType>): Promise<ParticipantType>;
  put(_id: string, data: Partial<ParticipantType>): Promise<ParticipantType>;
  getEvery(contest_Id: string): Promise<ParticipantType[]>;
  get(_id: string): Promise<ParticipantType>;
  remove(_id: string): Promise<ParticipantType>;
}
