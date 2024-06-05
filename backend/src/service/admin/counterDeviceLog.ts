import { CounterDeviceLogService } from "@src/core/service/admin/counterDeviceLog";

import CounterDeviceLog, {
  CounterDeviceLogType,
} from "@model/CounterDeviceLog";

import { counterDeviceLogRepository } from "@repository/index";

let instance: CounterDeviceLogServ | null = null;
export class CounterDeviceLogServ implements CounterDeviceLogService {
  constructor() {
    if (instance) return instance;
    instance = this;
  }

  private idFilter(id: string, srcData: Partial<CounterDeviceLogType>): void {
    if (!srcData.id) {
      throw new Error("id is required");
    }
    if (String(id) !== String(srcData.id)) {
      throw new Error("id is not matched : query id and body id is different");
    }
  }

  private patchReadonlyFilter(
    srccounterDeviceLog: Partial<CounterDeviceLogType>
  ): Partial<CounterDeviceLogType> {
    const { recordTime, ...filteredcounterDeviceLog } = srccounterDeviceLog;

    return filteredcounterDeviceLog;
  }

  async post(
    data: Partial<CounterDeviceLogType>
  ): Promise<CounterDeviceLogType> {
    const srccounterDeviceLog: Partial<CounterDeviceLogType> =
      new CounterDeviceLog(data as CounterDeviceLogType);
    const counterDeviceLog: CounterDeviceLogType =
      await counterDeviceLogRepository.create(
        srccounterDeviceLog as CounterDeviceLogType
      );

    return new CounterDeviceLog(counterDeviceLog);
  }

  async patch(
    id: string,
    data: Partial<CounterDeviceLogType>
  ): Promise<CounterDeviceLogType> {
    let srccounterDeviceLog: Partial<CounterDeviceLogType> =
      new CounterDeviceLog(data as CounterDeviceLogType);

    this.idFilter(id, srccounterDeviceLog);

    srccounterDeviceLog = this.patchReadonlyFilter(srccounterDeviceLog);

    const counterDeviceLog: Partial<CounterDeviceLogType> =
      await counterDeviceLogRepository.update(srccounterDeviceLog);

    return new CounterDeviceLog(counterDeviceLog as CounterDeviceLogType);
  }

  async put(
    id: string,
    data: Partial<CounterDeviceLogType>
  ): Promise<CounterDeviceLogType> {
    const srccounterDeviceLog: Partial<CounterDeviceLogType> =
      new CounterDeviceLog(data as CounterDeviceLogType);

    this.idFilter(id, srccounterDeviceLog);

    const counterDeviceLog: Partial<CounterDeviceLogType> =
      await counterDeviceLogRepository.update(srccounterDeviceLog);

    return new CounterDeviceLog(counterDeviceLog as CounterDeviceLogType);
  }

  async getEvery(hostId: string): Promise<CounterDeviceLogType[]> {
    const counterDeviceLogList: Partial<CounterDeviceLogType[]> =
      await counterDeviceLogRepository.readAll(hostId);

    return counterDeviceLogList.map(
      (counterDeviceLog) =>
        new CounterDeviceLog(counterDeviceLog as CounterDeviceLogType)
    );
  }

  async get(id: string): Promise<CounterDeviceLogType> {
    const counterDeviceLog: Partial<CounterDeviceLogType> =
      await counterDeviceLogRepository.read(id);

    return new CounterDeviceLog(counterDeviceLog as CounterDeviceLogType);
  }

  async remove(id: string): Promise<CounterDeviceLogType> {
    const counterDeviceLog: Partial<CounterDeviceLogType> =
      await counterDeviceLogRepository.delete(id);

    return new CounterDeviceLog(counterDeviceLog as CounterDeviceLogType);
  }
}
