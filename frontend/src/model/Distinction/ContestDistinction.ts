export type ContestDistinctionType = {
  // _id: string;
  id: string;
  // title: string;

  // curContestingSection: string;
};

export default class ContestDistinction {
  // _id: string;
  id: string;
  // title: string;

  // curContestingSection: string;

  constructor(data: ContestDistinctionType) {
    // this._id = data?._id;
    this.id = data?.id;
    // this.title = data?.title;

    // this.curContestingSection = data?.curContestingSection;
  }
}

export const contestTamplate: ContestDistinctionType = new ContestDistinction({
  // _id: "",
  id: "",
  // title: "",

  // curContestingSection: "",
});
