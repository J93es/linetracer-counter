import { ParticipantType } from "@src/model/Participant";

import { ParticipantRepository } from "@src/core/repository/participant";
import { ParticipantSchema } from "@src/model/repository/ParticipantSchema";

import { ContestRepository } from "@src/core/repository/contest";
import { ContestMongoRepo } from "@src/repository/mongo/contest";

const contestRepository: ContestRepository = new ContestMongoRepo();

let instance: ParticipantMongoRepo | null = null;
export class ParticipantMongoRepo implements ParticipantRepository {
  constructor() {
    if (instance) return instance;
    instance = this;
  }

  private readonlyFilter(data: any) {
    const filteredData = JSON.parse(JSON.stringify(data));

    delete filteredData._id;
    delete filteredData.hostId;
    delete filteredData.sectorRecordList;

    return filteredData;
  }

  async isExist(_id: any): Promise<Boolean> {
    if (await ParticipantSchema.exists({ _id: _id })) {
      return true;
    } else {
      return false;
    }
  }

  async create(data: Partial<ParticipantType>): Promise<any> {
    delete data._id;

    if (!(await contestRepository.isExist(data.hostId))) {
      throw new Error(
        "Contest data is not founded by hostId, check hostId field in Participant data"
      );
    }

    const participant = await ParticipantSchema.create(data);
    if (!participant) {
      throw new Error("Failed to create participant");
    }

    try {
      await contestRepository.appendParticipantList(
        data.hostId,
        participant._id
      );
    } catch (err) {
      throw new Error("Failed to append participant to contest, check hostId");
    }

    return participant;
  }

  async readEvery(contest_Id: any): Promise<any> {
    const participantIndex = await ParticipantSchema.find({
      hostId: contest_Id,
    })
      .populate({
        path: "sectorRecordList",
      })
      .lean();
    if (!participantIndex) {
      throw new Error("Participant list not found");
    }

    return participantIndex;
  }

  async read(_id: any): Promise<any> {
    const participant = await ParticipantSchema.findOne({ _id: _id }).lean();
    if (!participant) {
      throw new Error("Participant not found");
    }

    return participant;
  }

  async readWithJoin(_id: any, selectField: object): Promise<any> {
    const contest = await ParticipantSchema.findOne({ _id: _id })
      .populate("sectorRecordList", selectField)
      .lean();
    if (!contest) {
      throw new Error("Participant not found");
    }

    return contest;
  }

  async update(data: Partial<ParticipantType>): Promise<any> {
    const filteredData = this.readonlyFilter(data);

    const participant = await ParticipantSchema.findOneAndUpdate(
      { _id: data._id },
      filteredData,
      {
        returnDocument: "after",
      }
    ).lean();
    if (!participant) {
      throw new Error("Failed to update participant");
    }

    return participant;
  }

  async delete(_id: any): Promise<any> {
    const participant = await ParticipantSchema.findOneAndDelete({
      _id: _id,
    }).lean();
    if (!participant) {
      throw new Error("Failed to delete participant, check participant _id");
    }

    if (JSON.stringify(participant.sectorRecordList) !== "[]") {
      throw new Error(
        "Failed to delete participant, sectorRecordList is not empty"
      );
    }
    try {
      await contestRepository.popParticipantList(
        participant.hostId,
        participant._id
      );
    } catch (err) {
      throw new Error("Failed to pop participant from contest, check hostId");
    }

    return participant;
  }

  async appendSectorRecordList(_id: any, sectorRecord_Id: any): Promise<any> {
    const contest = await ParticipantSchema.findOneAndUpdate(
      { _id: _id },
      {
        $addToSet: { sectorRecordList: sectorRecord_Id },
      },
      {
        returnDocument: "after",
      }
    ).lean();
    if (!contest) {
      throw new Error("Failed to append participant list");
    }

    return sectorRecord_Id;
  }

  async popSectorRecordList(_id: any, sectorRecord_Id: any): Promise<any> {
    const contest = await ParticipantSchema.findOneAndUpdate(
      { _id: _id },
      {
        $pull: { sectorRecordList: sectorRecord_Id },
      },
      {
        returnDocument: "after",
      }
    ).lean();
    if (!contest) {
      throw new Error("Failed to remove participant list");
    }

    return sectorRecord_Id;
  }
}
