import { CounterDeviceLogType } from "@model/CounterDeviceLog";

export interface CounterDeviceLogService {
  post(data: CounterDeviceLogType): Promise<CounterDeviceLogType>;
  patch(
    id: string,
    data: Partial<CounterDeviceLogType>
  ): Promise<CounterDeviceLogType>;
  put(
    id: string,
    data: Partial<CounterDeviceLogType>
  ): Promise<CounterDeviceLogType>;
  getEvery(hostId: string): Promise<CounterDeviceLogType[]>;
  get(id: string): Promise<CounterDeviceLogType>;
  remove(id: string): Promise<CounterDeviceLogType>;
}
