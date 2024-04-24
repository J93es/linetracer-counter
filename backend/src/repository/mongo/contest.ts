import { ContestType } from "../../model/Contest";

import { ContestRepository } from "../../core/repository/contest";
import { ContestSchema } from "./model/ContestSchema";

export class ContestMongoRepo implements ContestRepository {
  async createContest(data: Partial<ContestType>): Promise<any> {
    const contest = await ContestSchema.create(data);
    if (!contest) {
      throw new Error("Failed to create contest");
    }

    return contest;
  }

  async readContest(filter: object): Promise<any> {
    const contest = await ContestSchema.findOne(filter);
    if (!contest) {
      throw new Error("Contest not found");
    }

    return contest;
  }

  async readContestWithParticipant(filter: object): Promise<any> {
    const contest = await ContestSchema.findOne(filter).populate(
      "participantList"
    );
    if (!contest) {
      throw new Error("Contest not found");
    }

    return contest;
  }

  async updateContest(
    filter: object,
    data: Partial<ContestType>
  ): Promise<any> {
    const contest = await ContestSchema.findOneAndUpdate(filter, data, {
      returnDocument: "after",
    });
    if (!contest) {
      throw new Error("Failed to update contest");
    }

    return contest;
  }

  async deleteContest(filter: object): Promise<any> {
    const contest = await ContestSchema.findOneAndDelete(filter);
    if (!contest) {
      throw new Error("Failed to delete contest");
    }

    return contest;
  }

  async appendParticipantList(
    filter: object,
    participantId: any
  ): Promise<any> {
    const contest = await ContestSchema.findOneAndUpdate(filter, {
      $push: { participantList: participantId },
    });
    if (!contest) {
      throw new Error("Failed to append participant list");
    }

    return contest;
  }

  async removeParticipantList(
    filter: object,
    participantId: any
  ): Promise<any> {
    const contest = await ContestSchema.findOneAndUpdate(filter, {
      $pull: { participantList: participantId },
    });
    if (!contest) {
      throw new Error("Failed to remove participant list");
    }

    return contest;
  }
}
