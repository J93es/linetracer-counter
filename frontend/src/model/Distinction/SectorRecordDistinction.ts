export type SectorRecordDistinctionType = {
  // _id: string;
  // hostId: string;

  contestSector: string;
  order: number;
};

export default class SectorRecordDistinction {
  // _id: string;
  // hostId: string;

  contestSector: string;
  order: number;

  constructor(data: SectorRecordDistinctionType) {
    // this._id = data._id;
    // this.hostId = data.hostId;

    this.contestSector = data.contestSector;
    this.order = data.order;
  }
}

export const SectorRecordTamplate: SectorRecordDistinctionType =
  new SectorRecordDistinction({
    // _id: "",
    // hostId: "",
    contestSector: "",
    order: 0,
  });
