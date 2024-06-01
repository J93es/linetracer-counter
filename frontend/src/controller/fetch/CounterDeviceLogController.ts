import CounterDeviceLog, { CounterDeviceLogType } from "model/CounterDeviceLog";
import { uri } from "config";

import { isEmptyObject } from "tools/utils";

let instance: CounterDeviceLogController | null = null;
export class CounterDeviceLogController {
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  async getEvery(
    hostId: string | undefined
  ): Promise<CounterDeviceLogType[] | undefined> {
    try {
      const response = await fetch(
        `${uri}/counter-device-log/?hostId=${hostId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const resDataList = await response.json();
      const resCounterDeviceLogList = resDataList.map(
        (data: any) => new CounterDeviceLog(data)
      );

      if (isEmptyObject(resCounterDeviceLogList)) {
        return undefined;
      }

      return resCounterDeviceLogList;
    } catch (error) {
      console.error("Failed to get every CounterDeviceLog data", error);
      throw error;
    }
  }

  async get(id: string | undefined): Promise<CounterDeviceLogType | undefined> {
    try {
      const response = await fetch(`${uri}/counter-device-log/${id}`, {
        method: "GET",
        credentials: "include",
      });
      const resData = await response.json();
      const resCounterDeviceLog = new CounterDeviceLog(resData);

      if (isEmptyObject(resCounterDeviceLog)) {
        return undefined;
      }

      return resCounterDeviceLog;
    } catch (error) {
      console.error("Failed to get CounterDeviceLog data", error);
      throw error;
    }
  }

  async post(
    srcData: Partial<CounterDeviceLogType>
  ): Promise<CounterDeviceLogType | undefined> {
    try {
      const counterDeviceLog = new CounterDeviceLog(
        srcData as CounterDeviceLogType
      );
      const response = await fetch(`${uri}/counter-device-log`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(counterDeviceLog),
        credentials: "include",
      });
      const resData = await response.json();
      const resCounterDeviceLog = new CounterDeviceLog(resData);

      if (isEmptyObject(resCounterDeviceLog)) {
        return undefined;
      }

      return resCounterDeviceLog;
    } catch (error) {
      console.error("Failed to post CounterDeviceLog data", error);
      throw error;
    }
  }

  async patch(
    srcData: Partial<CounterDeviceLogType>
  ): Promise<CounterDeviceLogType | undefined> {
    try {
      const counterDeviceLog = new CounterDeviceLog(
        srcData as CounterDeviceLogType
      );
      const response = await fetch(`${uri}/counter-device-log/${srcData.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(counterDeviceLog),
        credentials: "include",
      });
      const resData = await response.json();
      const resCounterDeviceLog = new CounterDeviceLog(resData);

      if (isEmptyObject(resCounterDeviceLog)) {
        return undefined;
      }

      return resCounterDeviceLog;
    } catch (error) {
      console.error("Failed to patch CounterDeviceLog data", error);
      throw error;
    }
  }

  async put(
    srcData: Partial<CounterDeviceLogType>
  ): Promise<CounterDeviceLogType | undefined> {
    try {
      const counterDeviceLog = new CounterDeviceLog(
        srcData as CounterDeviceLogType
      );
      const response = await fetch(`${uri}/counter-device-log/${srcData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(counterDeviceLog),
        credentials: "include",
      });
      const resData = await response.json();
      const resCounterDeviceLog = new CounterDeviceLog(resData);

      if (isEmptyObject(resCounterDeviceLog)) {
        return undefined;
      }

      return resCounterDeviceLog;
    } catch (error) {
      console.error("Failed to put CounterDeviceLog data", error);
      throw error;
    }
  }

  async delete(
    id: string | undefined
  ): Promise<CounterDeviceLogType | undefined> {
    try {
      const response = await fetch(`${uri}/counter-device-log/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const resData = await response.json();
      const resCounterDeviceLog = new CounterDeviceLog(resData);

      if (isEmptyObject(resCounterDeviceLog)) {
        return undefined;
      }

      return resCounterDeviceLog;
    } catch (error) {
      console.error("Failed to delete CounterDeviceLog data", error);
      throw error;
    }
  }
}
