import Participant, { ParticipantType } from "../model/index/Participant";

import { ParticipantRepository } from "../core/participant-repository";
import { ParticipantSchema } from "../model/server/ParticipantSchema";

export class ParticipantMongoRepo implements ParticipantRepository {
  async createParticipant(
    participant: ParticipantType
  ): Promise<ParticipantType> {
    const creadtedParticipant = await ParticipantSchema.create(participant);

    return new Participant(creadtedParticipant as ParticipantType);
  }

  async readParticipant(id: string): Promise<ParticipantType> {
    const participant = await ParticipantSchema.findOne({ id: id });

    return new Participant(participant as ParticipantType);
  }

  async updateParticipant(
    participant: Partial<ParticipantType>
  ): Promise<ParticipantType> {
    if (!participant.id) {
      throw new Error("Participant id is required");
    }

    const updatedParticipant = await ParticipantSchema.findOneAndUpdate(
      { id: participant.id },
      participant,
      { returnDocument: "after" }
    );

    return new Participant(updatedParticipant as ParticipantType);
  }

  async replaceParticipant(srcData: ParticipantType): Promise<ParticipantType> {
    if (!srcData.id) {
      throw new Error("Participant id is required");
    }

    const replacedParticipant = await ParticipantSchema.findOneAndReplace(
      { id: srcData.id },
      srcData,
      { returnDocument: "after" }
    );

    return new Participant(replacedParticipant as ParticipantType);
  }

  async deleteParticipant(id: string): Promise<Participant> {
    const deletedParticipant = await ParticipantSchema.findOneAndDelete({
      id: id,
    });

    return new Participant(deletedParticipant as ParticipantType);
  }
}
