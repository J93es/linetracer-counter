import { ParticipantType } from "../../model/Participant";

import { ParticipantRepository } from "../../core/repository/participant";
import { ParticipantSchema } from "./model/ParticipantSchema";

import { ContestRepository } from "../../core/repository/contest";
import { ContestMongoRepo } from "../../repository/mongo/contest";

const contestRepository: ContestRepository = new ContestMongoRepo();

export class ParticipantMongoRepo implements ParticipantRepository {
  async createParticipant(data: Partial<ParticipantType>): Promise<any> {
    const contestData = await contestRepository.readContest({
      idYear: data.idYear,
    });
    if (!contestData) {
      throw new Error(
        "Contest data is not founded by idYear, check idYear field in Participant data"
      );
    }

    const participant = await ParticipantSchema.create(data);
    if (!participant) {
      throw new Error("Failed to create participant");
    }

    await contestRepository.appendParticipantList(
      { idYear: participant.idYear },
      participant._id
    );

    return participant;
  }

  async readParticipant(filter: object): Promise<any> {
    const participant = await ParticipantSchema.findOne(filter);
    if (!participant) {
      throw new Error("Participant not found");
    }

    return participant;
  }

  async updateParticipant(
    filter: object,
    data: Partial<ParticipantType>
  ): Promise<any> {
    const participant = await ParticipantSchema.findOneAndUpdate(filter, data, {
      returnDocument: "after",
    });
    if (!participant) {
      throw new Error("Failed to update participant");
    }

    return participant;
  }

  async deleteParticipant(filter: object): Promise<any> {
    const participant = await ParticipantSchema.findOneAndDelete(filter);
    if (!participant) {
      throw new Error("Failed to delete participant, check participant _id");
    }

    await contestRepository.removeParticipantList(
      { idYear: participant.idYear },
      participant._id
    );

    return participant;
  }
}
