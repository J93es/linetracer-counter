import { ContestType } from "../../model/Contest";

import { ContestRepository } from "../../core/repository/contest";
import { ContestSchema } from "../../model/repository/ContestSchema";

export class ContestMongoRepo implements ContestRepository {
  readonlyFilter(data: any) {
    const filteredData = JSON.parse(JSON.stringify(data));
    delete filteredData._id;
    delete filteredData.id;
    delete filteredData.participantList;

    return filteredData;
  }

  async isExistContest(id: string): Promise<Boolean> {
    if (await ContestSchema.exists({ id: id })) {
      return true;
    } else {
      return false;
    }
  }

  async createContest(data: ContestType): Promise<any> {
    delete data._id;

    const contest = await ContestSchema.create(data);
    if (!contest) {
      throw new Error("Failed to create contest");
    }

    return contest;
  }

  async readContest(id: string): Promise<any> {
    const contest = await ContestSchema.findOne({ id: id }).lean();
    if (!contest) {
      throw new Error("Contest not found");
    }

    return contest;
  }

  async readContestWithParticipant(id: string): Promise<any> {
    const contest = await ContestSchema.findOne({ id: id })
      .populate(["curParticipant", "nextParticipant", "participantList"])
      .lean();
    if (!contest) {
      throw new Error("Contest not found");
    }

    return contest;
  }

  async updateContest(id: string, data: Partial<ContestType>): Promise<any> {
    const filteredData = this.readonlyFilter(data);
    const contest = await ContestSchema.findOneAndUpdate(
      { id: id },
      filteredData,
      {
        returnDocument: "after",
      }
    ).lean();
    if (!contest) {
      throw new Error("Failed to update contest");
    }

    return contest;
  }

  async deleteContest(id: string): Promise<any> {
    const contest = await ContestSchema.findOneAndDelete({ id: id }).lean();
    if (!contest) {
      throw new Error("Failed to delete contest");
    }

    return contest;
  }

  async appendParticipantList(id: string, participantId: any): Promise<any> {
    const contest = await ContestSchema.findOneAndUpdate(
      { id: id },
      {
        $addToSet: { participantList: participantId },
      },
      {
        returnDocument: "after",
      }
    ).lean();
    if (!contest) {
      throw new Error("Failed to append participant list");
    }

    return participantId;
  }

  async popParticipantList(id: string, participantId: any): Promise<any> {
    const contest = await ContestSchema.findOneAndUpdate(
      { id: id },
      {
        $pull: { participantList: participantId },
      },
      {
        returnDocument: "after",
      }
    ).lean();
    if (!contest) {
      throw new Error("Failed to remove participant list");
    }

    return participantId;
  }
}
