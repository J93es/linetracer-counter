import Contest, { ContestType } from "model/Contest";
import { uri } from "config";

import { isEmptyArray, isEmptyObject } from "tools/utils";

let instance: ContestController | null = null;
export class ContestController {
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  async getEvery(): Promise<ContestType[] | undefined> {
    try {
      const response = await fetch(`${uri}/contest`, {
        method: "GET",
        credentials: "include",
      });
      const resDataList = await response.json();
      const resContestList = resDataList.map((data: any) => new Contest(data));

      if (isEmptyArray(resContestList)) {
        return undefined;
      }

      return resContestList;
    } catch (error) {
      console.error("Failed to get every Contest data", error);
      throw error;
    }
  }

  async get(id: string | undefined): Promise<ContestType | undefined> {
    try {
      if (!id) {
        return undefined;
      }
      const response = await fetch(`${uri}/contest/${id}`, {
        method: "GET",
        credentials: "include",
      });
      const resData = await response.json();
      const resContest = new Contest(resData);

      if (isEmptyObject(resContest)) {
        return undefined;
      }

      return resContest;
    } catch (error) {
      console.error("Failed to get Contest data", error);
      throw error;
    }
  }

  async post(srcData: Partial<ContestType>): Promise<ContestType | undefined> {
    try {
      if (!srcData) {
        return undefined;
      }
      const contest = new Contest(srcData as ContestType);
      const response = await fetch(`${uri}/Contest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contest),
        credentials: "include",
      });
      const resData = await response.json();
      const resContest = new Contest(resData);

      if (isEmptyObject(resContest)) {
        return undefined;
      }

      return resContest;
    } catch (error) {
      console.error("Failed to post Contest data", error);
      throw error;
    }
  }

  async patch(srcData: Partial<ContestType>): Promise<ContestType | undefined> {
    try {
      if (!srcData) {
        return undefined;
      }
      const contest = new Contest(srcData as ContestType);
      const response = await fetch(`${uri}/contest/${srcData.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contest),
        credentials: "include",
      });
      const resData = await response.json();
      const resContest = new Contest(resData);

      if (isEmptyObject(resContest)) {
        return undefined;
      }

      return resContest;
    } catch (error) {
      console.error("Failed to patch Contest data", error);
      throw error;
    }
  }

  async put(srcData: Partial<ContestType>): Promise<ContestType | undefined> {
    try {
      if (!srcData) {
        return undefined;
      }
      const contest = new Contest(srcData as ContestType);
      const response = await fetch(`${uri}/Contest/${srcData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contest),
        credentials: "include",
      });
      const resData = await response.json();
      const resContest = new Contest(resData);

      if (isEmptyObject(resContest)) {
        return undefined;
      }

      return resContest;
    } catch (error) {
      console.error("Failed to put Contest data", error);
      throw error;
    }
  }

  async delete(id: string | undefined): Promise<ContestType | undefined> {
    try {
      if (!id) {
        return undefined;
      }
      const response = await fetch(`${uri}/Contest/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const resData = await response.json();
      const resContest = new Contest(resData);

      if (isEmptyObject(resContest)) {
        return undefined;
      }

      return resContest;
    } catch (error) {
      console.error("Failed to delete Contest data", error);
      throw error;
    }
  }
}
