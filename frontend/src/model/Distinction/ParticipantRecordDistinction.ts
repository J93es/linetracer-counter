import { DriveRecordType, driveRecordTamplate } from "model/DriveRecord";

export type ParticipantRecordDistinctionType = {
  _id: string;
  // hostId: string;

  contestSector: string;
  // order: number;
};

export default class ParticipantRecordDistinction {
  _id: string;
  // hostId: string;

  contestSector: string;
  // order: number;

  constructor(data: ParticipantRecordDistinctionType) {
    this._id = data._id;
    // this.hostId = data.hostId;

    this.contestSector = data.contestSector;
    // this.order = data.order;
  }
}

export const participantRecordTamplate: ParticipantRecordDistinctionType =
  new ParticipantRecordDistinction({
    _id: "",
    // hostId: "",
    contestSector: "",
    // order: 0,
  });
