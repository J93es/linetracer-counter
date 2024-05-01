export type ParticipantDistinctionType = {
  _id: string;
  // hostId: string;

  name: string;
  association: string;
};

export default class ParticipantDistinction {
  _id: string;
  // hostId: string;

  name: string;
  association: string;

  constructor(data: ParticipantDistinctionType) {
    this._id = data._id;
    // this.hostId = data.hostId;

    this.name = data.name;
    this.association = data.association;
  }
}

export const participantTamplate: ParticipantDistinctionType =
  new ParticipantDistinction({
    _id: "",
    // hostId: "",
    name: "",
    association: "",
  });
