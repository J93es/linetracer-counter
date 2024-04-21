import { ParticipantType } from "../model/Participant/Participant";
import { ParticipantIdTitleType } from "../model/Participant/ParticipantIdTitle";

export interface ParticipantRepository {
  isParticipantExist(id: string): boolean;
  readParticipantIndex(): Array<ParticipantIdTitleType>;
  readParticipant(id: string): Partial<ParticipantType>;
  writeParticipant(srcData: ParticipantType): ParticipantType;
}
