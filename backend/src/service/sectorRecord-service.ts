import { SectorRecordServiceInterface } from "../core/service/sectorRecord";

import SectorRecord, { SectorRecordType } from "../model/SectorRecord";

import { SectorRecordRepository } from "../core/repository/sectorRecord";
import { SectorRecordMongoRepo } from "../repository/mongo/sectorRecord";

const sectorRecordRepository: SectorRecordRepository =
  new SectorRecordMongoRepo();

let instance: SectorRecordService | null = null;
export class SectorRecordService implements SectorRecordServiceInterface {
  constructor() {
    if (instance) return instance;
    instance = this;
  }

  private _idFilter(_id: string, srcData: Partial<SectorRecordType>): void {
    if (!srcData._id) {
      throw new Error("_id is required");
    }
    if (String(_id) !== String(srcData._id)) {
      throw new Error(
        "_id is not matched : query _id and body _id is different"
      );
    }
  }

  private patchReadonlyFilter(
    srcSectorRecord: Partial<SectorRecordType>
  ): Partial<SectorRecordType> {
    const filteredSectorRecord = JSON.parse(JSON.stringify(srcSectorRecord));

    delete filteredSectorRecord.contestSector;

    return filteredSectorRecord;
  }

  async post(data: Partial<SectorRecordType>): Promise<SectorRecordType> {
    const srcSectorRecord: Partial<SectorRecordType> = new SectorRecord(
      data as SectorRecordType
    );
    const sectorRecord: Partial<SectorRecordType> =
      await sectorRecordRepository.create(srcSectorRecord as SectorRecordType);

    return new SectorRecord(sectorRecord as SectorRecordType);
  }

  async patch(
    _id: string,
    data: Partial<SectorRecordType>
  ): Promise<SectorRecordType> {
    let srcSectorRecord: Partial<SectorRecordType> = new SectorRecord(
      data as SectorRecordType
    );

    this._idFilter(_id, srcSectorRecord);

    srcSectorRecord = this.patchReadonlyFilter(srcSectorRecord);

    const sectorRecord: Partial<SectorRecordType> =
      await sectorRecordRepository.update(srcSectorRecord, false);

    return new SectorRecord(sectorRecord as SectorRecordType);
  }

  async put(
    _id: string,
    data: Partial<SectorRecordType>
  ): Promise<SectorRecordType> {
    const srcSectorRecord: Partial<SectorRecordType> = new SectorRecord(
      data as SectorRecordType
    );

    this._idFilter(_id, srcSectorRecord);

    const sectorRecord: Partial<SectorRecordType> =
      await sectorRecordRepository.update(srcSectorRecord, true);

    return new SectorRecord(sectorRecord as SectorRecordType);
  }

  async getEvery(participant_Id: string): Promise<SectorRecordType[]> {
    const sectorRecordList: Partial<SectorRecordType>[] =
      await sectorRecordRepository.readEvery(participant_Id);

    return sectorRecordList.map(
      (sectorRecord) => new SectorRecord(sectorRecord as SectorRecordType)
    );
  }

  async get(_id: string): Promise<SectorRecordType> {
    const sectorRecord: Partial<SectorRecordType> =
      await sectorRecordRepository.read(_id);

    return new SectorRecord(sectorRecord as SectorRecordType);
  }

  async remove(_id: string): Promise<SectorRecordType> {
    const sectorRecord: Partial<SectorRecordType> =
      await sectorRecordRepository.delete(_id);

    return new SectorRecord(sectorRecord as SectorRecordType);
  }
}
