import { ContestType } from "@model/Contest";

import { ContestRepository } from "@core/repository/contest";
import { ContestSchema } from "@model/repository/ContestSchema";

let instance: ContestMongoRepo | null = null;
export class ContestMongoRepo implements ContestRepository {
  constructor() {
    if (instance) return instance;
    instance = this;
  }

  readonlyFilter(data: any) {
    const filteredData = JSON.parse(JSON.stringify(data));
    delete filteredData._id;
    delete filteredData.participantList;

    return filteredData;
  }

  async isExist(_id: string): Promise<Boolean> {
    if (await ContestSchema.exists({ _id: _id })) {
      return true;
    } else {
      return false;
    }
  }

  async create(data: ContestType): Promise<any> {
    delete data._id;

    const contest = await ContestSchema.create(data);
    if (!contest) {
      throw new Error("Failed to create contest");
    }

    return contest;
  }

  async readEvery(): Promise<any> {
    const contestIndex = await ContestSchema.find()
      .populate({
        path: "participantList",
        populate: {
          path: "sectorRecordList",
        },
      })
      .lean();
    if (!contestIndex) {
      throw new Error("Contest not found");
    }

    return contestIndex;
  }

  async read(_id: string): Promise<any> {
    const contest = await ContestSchema.findOne({ _id: _id }).lean();
    if (!contest) {
      throw new Error("Contest not found");
    }

    return contest;
  }

  async readWithJoin(
    _id: string,
    participantJoinTarget: string,
    selectParticipantField: object,
    selectSectorRecordField: object
  ): Promise<any> {
    const contest = await ContestSchema.findOne({ _id: _id })
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

  async readWithJoinById(
    id: string,
    participantJoinTarget: string,
    selectParticipantField: object,
    selectSectorRecordField: object
  ): Promise<any> {
    const contest = await ContestSchema.findOne({ id: id })
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

  async update(data: Partial<ContestType>): Promise<any> {
    const filteredData = this.readonlyFilter(data);
    const contest = await ContestSchema.findOneAndUpdate(
      { _id: data._id },
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

  async delete(_id: string): Promise<any> {
    const contest = await ContestSchema.findOneAndDelete({ _id: _id }).lean();
    if (!contest) {
      throw new Error("Failed to delete contest");
    }

    return contest;
  }

  async appendParticipantList(_id: string, participantId: any): Promise<any> {
    const contest = await ContestSchema.findOneAndUpdate(
      { _id: _id },
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

  async popParticipantList(_id: string, participantId: any): Promise<any> {
    const contest = await ContestSchema.findOneAndUpdate(
      { _id: _id },
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

// 싱글톤 패턴
// class Singletone {
//   private static instance: Singletone | null = null;

//   private constructor() { }

//   public static getInstance(): Singletone {
//     if (!Singletone.instance) {
//       Singletone.instance = new Singletone();
//     }

//     return Singletone.instance;
//   }

//   public getParticipant(id: string): ParticipantType {
//     return {
//       id: "",
//       title: "",
//       contestLog: "",
//       driveLog: "",
//       remainingContestTime: 0
//     };
//   }

//   public postParticipant(id: string, srcData: any): string {
//     return "OK";
//   }

//   public margeParticipant(id: string, src: any, origin: ParticipantType): ParticipantType {
//     return {
//       id: "",
//       title: "",
//       contestLog: "",
//       driveLog: "",
//       remainingContestTime: 0
//     };
//   }
// }

// const myInstance = new Singletone();
// myInstance.getParticipant("test");
