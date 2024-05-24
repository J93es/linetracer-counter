import { ContestType } from "@model/Contest";
import { ContestRepository } from "@core/repository/contest";
import { ContestSchema } from "@model/repository/mongo/index";

import { idController } from "@core/main";

let instance: ContestMongoRepo | null = null;
export class ContestMongoRepo implements ContestRepository {
  constructor() {
    if (instance) return instance;
    instance = this;
  }

  readonlyFilter(data: Partial<ContestType>) {
    const filteredData = JSON.parse(JSON.stringify(data));
    delete filteredData._id;
    delete filteredData.id;
    delete filteredData.participantList;

    return filteredData;
  }

  async isExist(id: string): Promise<Boolean> {
    if (await ContestSchema.exists({ id: id })) {
      return true;
    } else {
      return false;
    }
  }

  async create(data: Partial<ContestType>): Promise<ContestType> {
    const newid = idController.generateId();
    const contest: ContestType | null = await ContestSchema.create({
      ...data,
      id: newid,
      _id: newid,
    });
    if (!contest) {
      throw new Error("Failed to create contest");
    }

    return contest;
  }

  async readEvery(): Promise<ContestType[]> {
    const contestList: ContestType[] | null = await ContestSchema.find()
      .populate({
        path: "participantList",
        populate: {
          path: "sectorRecordList",
        },
      })
      .lean();
    if (!contestList) {
      throw new Error("Contest not found");
    }

    return contestList;
  }

  async read(id: string): Promise<ContestType> {
    const contest: ContestType | null = await ContestSchema.findOne({
      id: id,
    }).lean();
    if (!contest) {
      throw new Error("Contest not found");
    }

    return contest;
  }

  async readWithJoin(
    id: string,
    participantJoinTarget: string,
    selectParticipantField: object,
    selectSectorRecordField: object
  ): Promise<ContestType> {
    const contest: ContestType | null = await ContestSchema.findOne({ id: id })
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

  async update(data: Partial<ContestType>): Promise<ContestType> {
    const id = data.id;
    const filteredData = this.readonlyFilter(data);
    const contest: ContestType | null = await ContestSchema.findOneAndUpdate(
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

  async delete(id: string): Promise<ContestType> {
    const contest: ContestType | null = await ContestSchema.findOneAndDelete({
      id: id,
    }).lean();
    if (!contest) {
      throw new Error("Failed to delete contest");
    }

    return contest;
  }

  async appendParticipantList(
    id: string,
    participant_Id: string
  ): Promise<ContestType> {
    const contest: ContestType | null = await ContestSchema.findOneAndUpdate(
      { id: id },
      {
        $addToSet: { participantList: participant_Id },
      },
      {
        returnDocument: "after",
      }
    ).lean();
    if (!contest) {
      throw new Error("Failed to append participant list");
    }

    return contest;
  }

  async popParticipantList(
    id: string,
    participant_Id: string
  ): Promise<ContestType> {
    const contest: ContestType | null = await ContestSchema.findOneAndUpdate(
      { id: id },
      {
        $pull: { participantList: participant_Id },
      },
      {
        returnDocument: "after",
      }
    ).lean();
    if (!contest) {
      throw new Error("Failed to remove participant list");
    }

    return contest;
  }
}
