import { ParticipantRepository } from "@core/repository/participant";
import { ParticipantSchema } from "@model/repository/mongo/ParticipantSchema";

import { ParticipantType } from "@model/Participant";
import { contestRepository } from "@repository/index";
import { idController } from "@core/main";

let instance: ParticipantMongoRepo | null = null;
export class ParticipantMongoRepo implements ParticipantRepository {
  constructor() {
    if (instance) return instance;
    instance = this;
  }

  private readonlyFilter(data: Partial<ParticipantType>) {
    const filteredData = JSON.parse(JSON.stringify(data));

    delete filteredData._id;
    delete filteredData.id;
    delete filteredData.hostId;
    delete filteredData.sectorRecordList;

    return filteredData;
  }

  async isExist(id: string): Promise<Boolean> {
    if (await ParticipantSchema.exists({ id: id })) {
      return true;
    } else {
      return false;
    }
  }

  async create(data: Partial<ParticipantType>): Promise<ParticipantType> {
    if (!(await contestRepository.isExist(data.hostId ?? ""))) {
      throw new Error(
        "Contest data is not founded by hostId, check hostId field in Participant data"
      );
    }

    const newId = idController.generateId();
    const participant: ParticipantType | null = (await ParticipantSchema.create(
      {
        ...data,
        id: newId,
        _id: newId,
      }
    )) as ParticipantType;
    if (!participant) {
      throw new Error("Failed to create participant");
    }

    try {
      await contestRepository.appendParticipantList(
        participant.hostId,
        participant.id
      );
    } catch (err) {
      throw new Error("Failed to append participant to contest, check hostId");
    }

    return { ...participant, id: participant.id };
  }

  async read(id: string): Promise<ParticipantType> {
    const participant: ParticipantType | null = await ParticipantSchema.findOne(
      { id: id }
    ).lean();
    if (!participant) {
      throw new Error("Participant not found");
    }

    return participant;
  }

  async readWithJoin(
    id: string,
    selectField: object
  ): Promise<ParticipantType> {
    const participant: ParticipantType | null = await ParticipantSchema.findOne(
      { id: id }
    )
      .populate("sectorRecordList", selectField)
      .lean();
    if (!participant) {
      throw new Error("Participant not found");
    }

    return participant;
  }

  async update(data: Partial<ParticipantType>): Promise<ParticipantType> {
    const id = data.id;
    const filteredData = this.readonlyFilter(data);

    const participant: ParticipantType | null =
      await ParticipantSchema.findOneAndUpdate({ id: id }, filteredData, {
        returnDocument: "after",
      }).lean();
    if (!participant) {
      throw new Error("Failed to update participant");
    }

    return participant;
  }

  async delete(id: string): Promise<ParticipantType> {
    const participant: ParticipantType | null =
      await ParticipantSchema.findOneAndDelete({
        id: id,
      }).lean();
    if (!participant) {
      throw new Error("Failed to delete participant, check participant id");
    }

    if (JSON.stringify(participant.sectorRecordList) !== "[]") {
      throw new Error(
        "Failed to delete participant, sectorRecordList is not empty"
      );
    }
    try {
      await contestRepository.popParticipantList(
        participant.hostId,
        participant.id
      );
    } catch (err) {
      throw new Error("Failed to pop participant from contest, check hostId");
    }

    return participant;
  }

  async appendSectorRecordList(
    id: string,
    sectorRecordId: string
  ): Promise<ParticipantType> {
    const participant: ParticipantType | null =
      await ParticipantSchema.findOneAndUpdate(
        { id: id },
        {
          $addToSet: { sectorRecordList: sectorRecordId },
        },
        {
          returnDocument: "after",
        }
      ).lean();
    if (!participant) {
      throw new Error("Failed to append sector record list");
    }

    return participant;
  }

  async popSectorRecordList(
    id: string,
    sectorRecordId: string
  ): Promise<ParticipantType> {
    const participant: ParticipantType | null =
      await ParticipantSchema.findOneAndUpdate(
        { id: id },
        {
          $pull: { sectorRecordList: sectorRecordId },
        },
        {
          returnDocument: "after",
        }
      ).lean();
    if (!participant) {
      throw new Error("Failed to remove sector record list");
    }

    return participant;
  }
}
