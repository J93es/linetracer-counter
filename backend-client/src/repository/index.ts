import { ContestRepository } from "@core/repository/contest";
import { ContestMongoRepo } from "@repository/mongo/contest";

export const contestRepository: ContestRepository = new ContestMongoRepo();
