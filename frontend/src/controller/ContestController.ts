import Contest, { ContestType } from "model/Contest";
import { uri } from "../config";

let instance: ContestController | null = null;
export class ContestController {
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  async getEvery(): Promise<any> {
    try {
      const response = await fetch(`${uri}/contest`, {
        method: "GET",
        credentials: "include",
      });
      const resDataList = await response.json();
      const resContestList = resDataList.map((data: any) => new Contest(data));

      return resContestList;
    } catch (error) {
      console.error("Failed to get every Contest data", error);
      throw error;
    }
  }

  async get(id: string): Promise<any> {
    try {
      const response = await fetch(`${uri}/contest/${id}`, {
        method: "GET",
        credentials: "include",
      });
      const resData = await response.json();
      const resContest = new Contest(resData);

      return resContest;
    } catch (error) {
      console.error("Failed to get Contest data", error);
      throw error;
    }
  }

  async post(srcData: Partial<ContestType>): Promise<Partial<ContestType>> {
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
      console.error("Failed to post Contest data", error);
      throw error;
    }
  }

  async patch(
    _id: string,
    srcData: Partial<ContestType>
  ): Promise<Partial<ContestType>> {
    try {
      const contest = new Contest(srcData as ContestType);
      const response = await fetch(`${uri}/contest/${_id}`, {
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
      console.error("Failed to patch Contest data", error);
      throw error;
    }
  }

  async put(
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
      console.error("Failed to put Contest data", error);
      throw error;
    }
  }

  async delete(_id: string): Promise<Partial<Contest>> {
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
      console.error("Failed to delete Contest data", error);
      throw error;
    }
  }
}
