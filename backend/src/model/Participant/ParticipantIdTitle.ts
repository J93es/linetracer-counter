export type ParticipantIdTitleType = {
  id: string;
  title: string;
};

export default class ParticipantIdTitle {
  id: string;
  title: string;

  constructor(data: ParticipantIdTitleType) {
    this.id = data.id;
    this.title = data.title;
  }
}
