import { ContestType } from "@model/Contest";

export interface ContestService {
  post(data: ContestType): Promise<ContestType>;
  patch(id: string, data: Partial<ContestType>): Promise<ContestType>;
  put(id: string, data: Partial<ContestType>): Promise<ContestType>;
  getEvery(): Promise<ContestType[]>;
  get(id: string): Promise<ContestType>;
  remove(id: string): Promise<ContestType>;
}
