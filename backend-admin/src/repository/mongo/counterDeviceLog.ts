import { CounterDeviceLogType } from "@model/CounterDeviceLog";
import { CounterDeviceLogRepository } from "@core/repository/counterDeviceLog";
import { CounterDeviceLogSchema } from "@repository/mongo/schema/index";

import { contestRepository } from "@repository/index";

import { idController } from "@core/main";

let instance: CounterDeviceLogMongoRepo | null = null;
export class CounterDeviceLogMongoRepo implements CounterDeviceLogRepository {
  constructor() {
    if (instance) return instance;
    instance = this;
  }

  private readonlyFilter(data: Partial<CounterDeviceLogType>) {
    const { _id, id, hostId, writeTime, ...filteredData } = data;
    return filteredData;
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
    if (!data.hostId) {
      throw new Error("hostId is required");
    }
    if (!(await contestRepository.isExist(data.hostId))) {
      throw new Error("host(SectorRecord) not found by hostId");
    }

    const newId = idController.generateId();
    const counterDeviceLog: CounterDeviceLogType | null =
      await CounterDeviceLogSchema.create({
        ...data,
        id: newId,
        _id: newId,
      });
    if (!counterDeviceLog) {
      throw new Error("Failed to create counterDeviceLog");
    }

    return counterDeviceLog;
  }

  async readAll(hostId: string): Promise<CounterDeviceLogType[]> {
    const counterDeviceLogs: CounterDeviceLogType[] =
      await CounterDeviceLogSchema.find({ hostId: hostId }).lean();
    if (!counterDeviceLogs) {
      throw new Error("Failed to get counterDeviceLogs");
    }

    return counterDeviceLogs;
  }

  async read(id: string): Promise<CounterDeviceLogType> {
    const counterDeviceLog: CounterDeviceLogType | null =
      await CounterDeviceLogSchema.findOne({
        id: id,
      }).lean();
    if (!counterDeviceLog) {
      throw new Error("Failed to get counterDeviceLog");
    }

    return counterDeviceLog;
  }

  async update(
    data: Partial<CounterDeviceLogType>
  ): Promise<CounterDeviceLogType> {
    const id = data.id;
    const filteredData = this.readonlyFilter(data);
    const counterDeviceLog: CounterDeviceLogType | null =
      await CounterDeviceLogSchema.findOneAndUpdate({ id: id }, filteredData, {
        returnDocument: "after",
      }).lean();
    if (!counterDeviceLog) {
      throw new Error("Failed to update counterDeviceLog");
    }

    return counterDeviceLog;
  }

  async delete(counterDeviceLogId: string): Promise<CounterDeviceLogType> {
    const counterDeviceLog = await CounterDeviceLogSchema.findOneAndDelete({
      id: counterDeviceLogId,
    }).lean();
    if (!counterDeviceLog) {
      throw new Error("Failed to delete counterDeviceLog");
    }

    return counterDeviceLog;
  }
}
