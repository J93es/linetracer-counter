import { ContestType } from "@model/Contest";
import { ContestRepository } from "@core/repository/contest";
import { ContestSchema } from "@repository/mongo/schema/index";

let instance: ContestMongoRepo | null = null;
export class ContestMongoRepo implements ContestRepository {
  constructor() {
    if (instance) return instance;
    instance = this;
  }

  async readWithJoinByQueryId(
    queryId: string,
    participantJoinTarget: string,
    selectParticipantField: object,
    selectSectorRecordField: object
  ): Promise<ContestType> {
    const contest: ContestType | null = await ContestSchema.findOne({
      queryId: queryId,
    })
      .populate({
        path: participantJoinTarget,
        select: selectParticipantField,
        populate: {
          path: "sectorRecordList",
          select: selectSectorRecordField,
        },
      })
      .lean();
    if (!contest) {
      throw new Error("Contest not found");
    }

    return contest;
  }
}
