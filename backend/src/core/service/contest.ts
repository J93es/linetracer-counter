import { ContestType } from "@model/Contest";

export interface ContestServiceInterface {
  post(data: Partial<ContestType>): Promise<ContestType>;
  patch(_id: string, data: Partial<ContestType>): Promise<ContestType>;
  put(_id: string, data: Partial<ContestType>): Promise<ContestType>;
  getEvery(): Promise<ContestType[]>;
  get(_id: string): Promise<ContestType>;
  remove(_id: string): Promise<ContestType>;
}
