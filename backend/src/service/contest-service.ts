import Contest, { ContestType } from "../model/index/Contest";

import { ContestRepository } from "../core/repository/contest";
import { ContestMongoRepo } from "../repository/mongo/contest";

import { ContestServiceInterface } from "../core/service/contest";

const contestRepository: ContestRepository = new ContestMongoRepo();

export class ContestService implements ContestServiceInterface {
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

  async postContest(data: Partial<ContestType>): Promise<ContestType> {
    const srcContest: Partial<ContestType> = new Contest(data as ContestType);

    const contest: ContestType = await contestRepository.createContest(
      srcContest as ContestType
    );

    return new Contest(contest as ContestType);
  }

  async patchContest(
    year: string,
    data: Partial<ContestType>
  ): Promise<ContestType> {
    let srcContest: Partial<ContestType> = new Contest(data as ContestType);

    this.idFilter(year, srcContest);
    srcContest = this.patchReadonlyFilter(srcContest);

    const contest: Partial<ContestType> = await contestRepository.updateContest(
      year,
      srcContest
    );

    return new Contest(contest as ContestType);
  }

  async putContest(
    year: string,
    data: Partial<ContestType>
  ): Promise<ContestType> {
    const srcContest: Partial<ContestType> = new Contest(data as ContestType);

    this.idFilter(year, srcContest);

    const contest: Partial<ContestType> = await contestRepository.updateContest(
      year,
      srcContest
    );

    return new Contest(contest as ContestType);
  }

  async getContest(year: string): Promise<ContestType> {
    const contest: Partial<ContestType> = await contestRepository.readContest(
      year
    );

    return new Contest(contest as ContestType);
  }

  async removeContest(year: string): Promise<ContestType> {
    const contest: Partial<ContestType> = await contestRepository.deleteContest(
      year
    );

    return new Contest(contest as ContestType);
  }
}
