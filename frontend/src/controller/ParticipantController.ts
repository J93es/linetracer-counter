import Participant, { ParticipantType } from "model/Participant";
import { uri } from "../config";

let instance: ParticipantController | null = null;
export class ParticipantController {
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  async getEvery(hostId: string): Promise<ParticipantType[]> {
    try {
      const response = await fetch(`${uri}/participant/?contest_Id=${hostId}`, {
        method: "GET",
        credentials: "include",
      });
      const resDataList = await response.json();
      const resParticipantList = resDataList.map(
        (data: any) => new Participant(data)
      );

      return resParticipantList;
    } catch (error) {
      console.error("Failed to get EveryParticipant data", error);
      throw error;
    }
  }

  async get(_id: string): Promise<ParticipantType> {
    try {
      const response = await fetch(`${uri}/participant/${_id}`, {
        method: "GET",
        credentials: "include",
      });
      const resData = await response.json();
      const resParticipant = new Participant(resData);

      return resParticipant;
    } catch (error) {
      console.error("Failed to get Participant data", error);
      throw error;
    }
  }

  async post(
    srcData: Partial<ParticipantType>
  ): Promise<Partial<ParticipantType>> {
    try {
      const participant = new Participant(srcData as ParticipantType);
      const response = await fetch(`${uri}/participant`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(participant),
        credentials: "include",
      });
      const resData = await response.json();
      const resParticipant = new Participant(resData);

      return resParticipant;
    } catch (error) {
      console.error("Failed to post Participant data", error);
      throw error;
    }
  }

  async patch(
    _id: string,
    srcData: Partial<ParticipantType>
  ): Promise<Partial<ParticipantType>> {
    try {
      const participant = new Participant(srcData as ParticipantType);
      const response = await fetch(`${uri}/participant/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(participant),
        credentials: "include",
      });
      const resData = await response.json();
      const resParticipant = new Participant(resData);

      return resParticipant;
    } catch (error) {
      console.error("Failed to patch Participant data", error);
      throw error;
    }
  }

  async put(
    _id: string,
    srcData: Partial<ParticipantType>
  ): Promise<Partial<ParticipantType>> {
    try {
      const participant = new Participant(srcData as ParticipantType);
      const response = await fetch(`${uri}/participant/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(participant),
        credentials: "include",
      });
      const resData = await response.json();
      const resParticipant = new Participant(resData);

      return resParticipant;
    } catch (error) {
      console.error("Failed to put Participant data", error);
      throw error;
    }
  }

  async delete(_id: string): Promise<Partial<ParticipantType>> {
    try {
      const response = await fetch(`${uri}/participant/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const resData = await response.json();
      const resParticipant = new Participant(resData);

      return resParticipant;
    } catch (error) {
      console.error("Failed to delete Participant data", error);
      throw error;
    }
  }
}

// export {
//   getParticipant,
//   postParticipant,
//   patchParticipant,
//   putParticipant,
//   deleteParticipant,
// };
