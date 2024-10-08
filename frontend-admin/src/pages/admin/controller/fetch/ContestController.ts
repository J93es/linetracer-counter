import Contest, { ContestType } from "pages/admin/model/Contest";
import { uri } from "config";

import { isEmptyArray, isEmptyObject } from "pages/tools/utils";

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
      return undefined;
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

      if (!response.ok) {
        throw new Error("Failed to get Contest data");
      }

      const resData = await response.json();
      const resContest = new Contest(resData);

      if (isEmptyObject(resContest)) {
        return undefined;
      }

      return resContest;
    } catch (error) {
      console.error("Failed to get Contest data", error);
      return undefined;
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
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contest),
      });

      if (!response.ok) {
        throw new Error("Failed to get Contest data");
      }

      const resData = await response.json();
      const resContest = new Contest(resData);

      if (isEmptyObject(resContest)) {
        return undefined;
      }

      return resContest;
    } catch (error) {
      console.error("Failed to post Contest data", error);
      return undefined;
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
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contest),
      });

      if (!response.ok) {
        throw new Error("Failed to get Contest data");
      }

      const resData = await response.json();
      const resContest = new Contest(resData);

      if (isEmptyObject(resContest)) {
        return undefined;
      }

      return resContest;
    } catch (error) {
      console.error("Failed to patch Contest data", error);
      return undefined;
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
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contest),
      });

      if (!response.ok) {
        throw new Error("Failed to get Contest data");
      }

      const resData = await response.json();
      const resContest = new Contest(resData);

      if (isEmptyObject(resContest)) {
        return undefined;
      }

      return resContest;
    } catch (error) {
      console.error("Failed to put Contest data", error);
      return undefined;
    }
  }

  async delete(id: string | undefined): Promise<ContestType | undefined> {
    try {
      if (!id) {
        return undefined;
      }
      const response = await fetch(`${uri}/Contest/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to get Contest data");
      }

      const resData = await response.json();
      const resContest = new Contest(resData);

      if (isEmptyObject(resContest)) {
        return undefined;
      }

      return resContest;
    } catch (error) {
      console.error("Failed to delete Contest data", error);
      return undefined;
    }
  }
}
