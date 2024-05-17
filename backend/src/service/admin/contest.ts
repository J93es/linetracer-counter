import Contest, { ContestType } from "@model/Contest";

import { ContestService } from "@core/service/contest";

import { contestRepository } from "@repository/index";

let instance: ContestServ | null = null;
export class ContestServ implements ContestService {
  constructor() {
    if (instance) return instance;
    instance = this;
  }

  private idFilter(id: string, srcData: Partial<ContestType>): void {
    if (!srcData.id) {
      throw new Error("id is required");
    }
    if (String(id) !== String(srcData.id)) {
      throw new Error("id is not matched : query id and body id is different");
    }
  }

  private patchReadonlyFilter(
    srcContest: Partial<ContestType>
  ): Partial<ContestType> {
    const filteredContest = JSON.parse(JSON.stringify(srcContest));

    delete filteredContest.title;

    return filteredContest;
  }

  async post(data: Partial<ContestType>): Promise<ContestType> {
    const srcContest: ContestType = new Contest(data as ContestType);

    const contest: ContestType = await contestRepository.create(
      srcContest as ContestType
    );

    return new Contest(contest);
  }

  async patch(id: string, data: Partial<ContestType>): Promise<ContestType> {
    let srcContest: Partial<ContestType> = new Contest(data as ContestType);

    this.idFilter(id, srcContest);
    srcContest = this.patchReadonlyFilter(srcContest);

    const contest: ContestType = await contestRepository.update(srcContest);

    return new Contest(contest);
  }

  async put(id: string, data: Partial<ContestType>): Promise<ContestType> {
    const srcContest: Partial<ContestType> = new Contest(data as ContestType);

    this.idFilter(id, srcContest);

    const contest: ContestType = await contestRepository.update(srcContest);

    return new Contest(contest);
  }

  async get(id: string): Promise<ContestType> {
    const contest: ContestType = await contestRepository.readWithJoin(
      id,
      "participantList",
      {},
      {}
    );

    return new Contest(contest);
  }

  async getEvery(): Promise<ContestType[]> {
    const contests: ContestType[] = await contestRepository.readEvery();

    return contests.map((contest) => new Contest(contest));
  }

  async remove(id: string): Promise<ContestType> {
    const contest: ContestType = await contestRepository.delete(id);

    return new Contest(contest);
  }
}
