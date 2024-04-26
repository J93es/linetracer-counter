import { ParticipantType } from "../../model/Participant";

export interface ParticipantRepository {
  isExistParticipant(_id: any): Promise<Boolean>;
  createParticipant(data: ParticipantType): Promise<any>;
  readParticipant(_id: any): Promise<any>;
  updateParticipant(
    _id: any,
    data: Partial<ParticipantType>,
    replace: boolean
  ): Promise<any>;
  deleteParticipant(_id: any): Promise<any>;
}
