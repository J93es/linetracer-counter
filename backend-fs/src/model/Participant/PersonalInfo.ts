export type PersonalInfoType = {
  name: string;
  association: string;
};

export default class PersonalInfo {
  name: string;
  association: string;

  constructor(data: PersonalInfoType) {
    this.name = data.name;
    this.association = data.association;
  }
}
