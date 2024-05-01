import Contest, { ContestType } from "../model/Contest";

import { ContestRepository } from "../core/repository/contest";
import { ContestMongoRepo } from "../repository/mongo/contest";

import { ContestServiceInterface } from "../core/service/contest";

const contestRepository: ContestRepository = new ContestMongoRepo();

let instance: ContestService | null = null;
export class ContestService implements ContestServiceInterface {
  constructor() {
    if (instance) return instance;
    instance = this;
  }

  private idFilter(_id: string, srcData: Partial<ContestType>): void {
    if (!srcData._id) {
      throw new Error("id is required");
    }
    if (String(_id) !== String(srcData._id)) {
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

  async postContest(data: Partial<ContestType>): Promise<ContestType> {
    const srcContest: Partial<ContestType> = new Contest(data as ContestType);

    const contest: ContestType = await contestRepository.createContest(
      srcContest as ContestType
    );

    return new Contest(contest as ContestType);
  }

  async patchContest(
    _id: string,
    data: Partial<ContestType>
  ): Promise<ContestType> {
    let srcContest: Partial<ContestType> = new Contest(data as ContestType);

    this.idFilter(_id, srcContest);
    srcContest = this.patchReadonlyFilter(srcContest);

    const contest: Partial<ContestType> = await contestRepository.updateContest(
      _id,
      srcContest
    );

    return new Contest(contest as ContestType);
  }

  async putContest(
    _id: string,
    data: Partial<ContestType>
  ): Promise<ContestType> {
    const srcContest: Partial<ContestType> = new Contest(data as ContestType);

    this.idFilter(_id, srcContest);

    const contest: Partial<ContestType> = await contestRepository.updateContest(
      _id,
      srcContest
    );

    return new Contest(contest as ContestType);
  }

  async getContest(_id: string): Promise<ContestType> {
    const contest: Partial<ContestType> =
      await contestRepository.readContestWithJoin(_id, {}, {});

    return new Contest(contest as ContestType);
  }

  async getContestIndex(): Promise<ContestType[]> {
    const contests: Partial<ContestType>[] =
      await contestRepository.readContestIndex();

    return contests.map((contest) => new Contest(contest as ContestType));
  }

  async removeContest(_id: string): Promise<ContestType> {
    const contest: Partial<ContestType> = await contestRepository.deleteContest(
      _id
    );

    return new Contest(contest as ContestType);
  }
}
