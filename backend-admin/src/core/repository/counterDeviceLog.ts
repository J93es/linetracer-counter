import { CounterDeviceLogType } from "@model/CounterDeviceLog";

export interface CounterDeviceLogRepository {
  isExist(id: string): Promise<Boolean>;
  create(data: Partial<CounterDeviceLogType>): Promise<CounterDeviceLogType>;
  readAll(hostId: string): Promise<CounterDeviceLogType[]>;
  read(id: string): Promise<CounterDeviceLogType>;
  update(data: Partial<CounterDeviceLogType>): Promise<CounterDeviceLogType>;
  delete(id: string): Promise<CounterDeviceLogType>;
}
