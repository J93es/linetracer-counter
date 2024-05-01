import Contest, { ContestType } from "model/Index/Contest";
import { uri } from "../config";

let instance: ContestController | null = null;
export class ContestController {
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  async getContestList(): Promise<any> {
    try {
      const response = await fetch(`${uri}/contest`, {
        method: "GET",
        credentials: "include",
      });
      const resDataList = await response.json();
      const resContestList = resDataList.map((data: any) => new Contest(data));

      return resContestList;
    } catch (error) {
      console.error("Failed to fetch data", error);
      throw new Error("Failed to fetch data");
    }
  }

  async getContest(id: string): Promise<any> {
    try {
      const response = await fetch(`${uri}/Contest/${id}`, {
        method: "GET",
        credentials: "include",
      });
      const resData = await response.json();
      const resContest = new Contest(resData);

      return resContest;
    } catch (error) {
      console.error("Failed to fetch data", error);
      throw new Error("Failed to fetch data");
    }
  }

  async postContest(
    srcData: Partial<ContestType>
  ): Promise<Partial<ContestType>> {
    try {
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

      return resContest;
    } catch (error) {
      throw new Error("Failed to post Contest data");
    }
  }

  async patchContest(
    _id: string,
    srcData: Partial<ContestType>
  ): Promise<Partial<ContestType>> {
    try {
      const contest = new Contest(srcData as ContestType);
      const response = await fetch(`${uri}/Contest/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contest),
        credentials: "include",
      });
      const resData = await response.json();
      const resContest = new Contest(resData);

      return resContest;
    } catch (error) {
      throw new Error("Failed to post Contest data");
    }
  }

  async putContest(
    _id: string,
    srcData: Partial<ContestType>
  ): Promise<Partial<Contest>> {
    try {
      const contest = new Contest(srcData as ContestType);
      const response = await fetch(`${uri}/Contest/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contest),
        credentials: "include",
      });
      const resData = await response.json();
      const resContest = new Contest(resData);

      return resContest;
    } catch (error) {
      throw new Error("Failed to post Contest data");
    }
  }

  async deleteContest(_id: string): Promise<Partial<Contest>> {
    try {
      const response = await fetch(`${uri}/Contest/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const resData = await response.json();
      const resContest = new Contest(resData);

      return resContest;
    } catch (error) {
      throw new Error("Failed to post Contest data");
    }
  }
}
