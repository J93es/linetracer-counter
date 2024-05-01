import ParticipantRecord, {
  ParticipantRecordType,
} from "model/Index/ParticipantRecord";
import { uri } from "../config";

export class ParticipantRecordController {
  async getParticipantRecordList(
    participantId: string
  ): Promise<ParticipantRecordType[]> {
    try {
      const response = await fetch(
        `${uri}/participant-record/?participant_Id=${participantId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const resDataList = await response.json();
      const resParticipantRecordList = resDataList.map(
        (data: any) => new ParticipantRecord(data)
      );

      return resParticipantRecordList;
    } catch (error) {
      console.error("Failed to fetch data", error);
      throw new Error("Failed to fetch data");
    }
  }

  async getParticipantRecord(_id: string): Promise<ParticipantRecordType> {
    try {
      const response = await fetch(`${uri}/participant-record/${_id}`, {
        method: "GET",
        credentials: "include",
      });
      const resData = await response.json();
      const resParticipantRecord = new ParticipantRecord(resData);

      return resParticipantRecord;
    } catch (error) {
      console.error("Failed to fetch data", error);
      throw new Error("Failed to fetch data");
    }
  }

  async postParticipantRecord(
    srcData: Partial<ParticipantRecordType>
  ): Promise<Partial<ParticipantRecordType>> {
    try {
      const participantRecord = new ParticipantRecord(
        srcData as ParticipantRecordType
      );
      const response = await fetch(`${uri}/participant-record`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(participantRecord),
        credentials: "include",
      });
      const resData = await response.json();
      const resParticipantRecord = new ParticipantRecord(resData);

      return resParticipantRecord;
    } catch (error) {
      throw new Error("Failed to post participantRecord data");
    }
  }

  async patchParticipantRecord(
    _id: string,
    srcData: Partial<ParticipantRecordType>
  ): Promise<Partial<ParticipantRecordType>> {
    try {
      const participantRecord = new ParticipantRecord(
        srcData as ParticipantRecordType
      );
      const response = await fetch(`${uri}/participant-record/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(participantRecord),
        credentials: "include",
      });
      const resData = await response.json();
      const resParticipantRecord = new ParticipantRecord(resData);

      return resParticipantRecord;
    } catch (error) {
      throw new Error("Failed to post participantRecord data");
    }
  }

  async putParticipantRecord(
    _id: string,
    srcData: Partial<ParticipantRecordType>
  ): Promise<Partial<ParticipantRecordType>> {
    try {
      const participantRecord = new ParticipantRecord(
        srcData as ParticipantRecordType
      );
      const response = await fetch(`${uri}/participant-record/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(participantRecord),
        credentials: "include",
      });
      const resData = await response.json();
      const resParticipantRecord = new ParticipantRecord(resData);

      return resParticipantRecord;
    } catch (error) {
      throw new Error("Failed to post participantRecord data");
    }
  }

  async deleteParticipantRecord(
    _id: string
  ): Promise<Partial<ParticipantRecordType>> {
    try {
      const response = await fetch(`${uri}/participant-record/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const resData = await response.json();
      const resParticipantRecord = new ParticipantRecord(resData);

      return resParticipantRecord;
    } catch (error) {
      throw new Error("Failed to post participantRecord data");
    }
  }
}
