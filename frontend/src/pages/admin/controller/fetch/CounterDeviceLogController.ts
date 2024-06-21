import CounterDeviceLog, {
  CounterDeviceLogType,
} from "pages/admin/model/CounterDeviceLog";
import { uri } from "config";

import { isEmptyArray, isEmptyObject } from "pages/tools/utils";

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
      if (!hostId) {
        return undefined;
      }
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

      if (isEmptyArray(resCounterDeviceLogList)) {
        return undefined;
      }

      return resCounterDeviceLogList;
    } catch (error) {
      console.error("Failed to get every CounterDeviceLog data", error);
      return undefined;
    }
  }

  async get(id: string | undefined): Promise<CounterDeviceLogType | undefined> {
    try {
      if (!id) {
        return undefined;
      }
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
      return undefined;
    }
  }

  async post(
    srcData: Partial<CounterDeviceLogType>
  ): Promise<CounterDeviceLogType | undefined> {
    try {
      if (!srcData) {
        return undefined;
      }
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
      return undefined;
    }
  }

  async patch(
    srcData: Partial<CounterDeviceLogType>
  ): Promise<CounterDeviceLogType | undefined> {
    try {
      if (!srcData) {
        return undefined;
      }
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
      return undefined;
    }
  }

  async put(
    srcData: Partial<CounterDeviceLogType>
  ): Promise<CounterDeviceLogType | undefined> {
    try {
      if (!srcData) {
        return undefined;
      }
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
      return undefined;
    }
  }

  async delete(
    id: string | undefined
  ): Promise<CounterDeviceLogType | undefined> {
    try {
      if (!id) {
        return undefined;
      }
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
      return undefined;
    }
  }
}
