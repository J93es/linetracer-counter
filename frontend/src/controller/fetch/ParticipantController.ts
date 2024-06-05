import Participant, { ParticipantType } from "model/Participant";
import { uri } from "config";

import { isEmptyObject } from "tools/utils";

let instance: ParticipantController | null = null;
export class ParticipantController {
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  async get(id: string | undefined): Promise<ParticipantType | undefined> {
    try {
      if (!id) {
        return undefined;
      }
      const response = await fetch(`${uri}/participant/${id}`, {
        method: "GET",
        credentials: "include",
      });
      const resData = await response.json();
      const resParticipant = new Participant(resData);

      if (isEmptyObject(resParticipant)) {
        return undefined;
      }

      return resParticipant;
    } catch (error) {
      console.error("Failed to get Participant data", error);
      throw error;
    }
  }

  async post(
    srcData: Partial<ParticipantType>
  ): Promise<ParticipantType | undefined> {
    try {
      if (!srcData) {
        return undefined;
      }
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

      if (isEmptyObject(resParticipant)) {
        return undefined;
      }

      return resParticipant;
    } catch (error) {
      console.error("Failed to post Participant data", error);
      throw error;
    }
  }

  async patch(
    srcData: Partial<ParticipantType>
  ): Promise<ParticipantType | undefined> {
    try {
      if (!srcData) {
        return undefined;
      }
      const participant = new Participant(srcData as ParticipantType);
      const response = await fetch(`${uri}/participant/${srcData.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(participant),
        credentials: "include",
      });
      const resData = await response.json();
      const resParticipant = new Participant(resData);

      if (isEmptyObject(resParticipant)) {
        return undefined;
      }

      return resParticipant;
    } catch (error) {
      console.error("Failed to patch Participant data", error);
      throw error;
    }
  }

  async put(
    srcData: Partial<ParticipantType>
  ): Promise<ParticipantType | undefined> {
    try {
      if (!srcData) {
        return undefined;
      }
      const participant = new Participant(srcData as ParticipantType);
      const response = await fetch(`${uri}/participant/${srcData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(participant),
        credentials: "include",
      });
      const resData = await response.json();
      const resParticipant = new Participant(resData);

      if (isEmptyObject(resParticipant)) {
        return undefined;
      }

      return resParticipant;
    } catch (error) {
      console.error("Failed to put Participant data", error);
      throw error;
    }
  }

  async delete(id: string | undefined): Promise<ParticipantType | undefined> {
    try {
      if (!id) {
        return undefined;
      }
      const response = await fetch(`${uri}/participant/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const resData = await response.json();
      const resParticipant = new Participant(resData);

      if (isEmptyObject(resParticipant)) {
        return undefined;
      }

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
