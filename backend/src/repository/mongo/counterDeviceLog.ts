import { CounterDeviceLogType } from "@model/CounterDeviceLog";
import { CounterDeviceLogRepository } from "@core/repository/counterDeviceLog";
import { CounterDeviceLogSchema } from "@model/repository/mongo/index";

import { contestRepository } from "@repository/index";

import { idController } from "@core/main";

let instance: CounterDeviceLogMongoRepo | null = null;
export class CounterDeviceLogMongoRepo implements CounterDeviceLogRepository {
  constructor() {
    if (instance) return instance;
    instance = this;
  }
  async isExist(id: string): Promise<Boolean> {
    if (await CounterDeviceLogSchema.exists({ id: id })) {
      return true;
    } else {
      return false;
    }
  }

  async create(
    data: Partial<CounterDeviceLogType>
  ): Promise<CounterDeviceLogType> {
    if (!(await contestRepository.isExist(data.hostId ?? ""))) {
      throw new Error("host(SectorRecord) not found by hostId");
    }

    const newId = idController.generateId();
    const driveRecord: CounterDeviceLogType | null =
      await CounterDeviceLogSchema.create({
        ...data,
        id: newId,
        _id: newId,
      });
    if (!driveRecord) {
      throw new Error("Failed to create driveRecord");
    }

    return driveRecord;
  }

  async readAll(hostId: string): Promise<CounterDeviceLogType[]> {
    const driveRecords: CounterDeviceLogType[] =
      await CounterDeviceLogSchema.find({ hostId: hostId }).lean();
    if (!driveRecords) {
      throw new Error("Failed to get driveRecords");
    }

    return driveRecords;
  }

  async read(id: string): Promise<CounterDeviceLogType> {
    const driveRecord: CounterDeviceLogType | null =
      await CounterDeviceLogSchema.findOne({
        id: id,
      }).lean();
    if (!driveRecord) {
      throw new Error("Failed to get driveRecord");
    }

    return driveRecord;
  }

  async update(
    data: Partial<CounterDeviceLogType>
  ): Promise<CounterDeviceLogType> {
    const driveRecord: CounterDeviceLogType | null =
      await CounterDeviceLogSchema.findOneAndUpdate({ id: data.id }, data, {
        returnDocument: "after",
      }).lean();
    if (!driveRecord) {
      throw new Error("Failed to update driveRecord");
    }

    return driveRecord;
  }

  async delete(driveRecordId: string): Promise<CounterDeviceLogType> {
    const driveRecord = await CounterDeviceLogSchema.findOneAndDelete({
      id: driveRecordId,
    }).lean();
    if (!driveRecord) {
      throw new Error("Failed to delete driveRecord");
    }

    return driveRecord;
  }
}
