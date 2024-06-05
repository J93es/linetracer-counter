import { SectorRecordService } from "@src/core/service/admin/sectorRecord";

import SectorRecord, { SectorRecordType } from "@model/SectorRecord";

import { sectorRecordRepository } from "@repository/index";

let instance: SectorRecordServ | null = null;
export class SectorRecordServ implements SectorRecordService {
  constructor() {
    if (instance) return instance;
    instance = this;
  }

  private idFilter(id: string, srcData: Partial<SectorRecordType>): void {
    if (!srcData.id) {
      throw new Error("id is required");
    }
    if (String(id) !== String(srcData.id)) {
      throw new Error("id is not matched : query id and body id is different");
    }
  }

  private patchReadonlyFilter(
    srcSectorRecord: Partial<SectorRecordType>
  ): Partial<SectorRecordType> {
    const { contestSector, ...filteredSectorRecord } = srcSectorRecord;

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
    id: string,
    data: Partial<SectorRecordType>
  ): Promise<SectorRecordType> {
    let srcSectorRecord: Partial<SectorRecordType> = new SectorRecord(
      data as SectorRecordType
    );

    this.idFilter(id, srcSectorRecord);

    srcSectorRecord = this.patchReadonlyFilter(srcSectorRecord);

    const sectorRecord: Partial<SectorRecordType> =
      await sectorRecordRepository.update(srcSectorRecord);

    return new SectorRecord(sectorRecord as SectorRecordType);
  }

  async put(
    id: string,
    data: Partial<SectorRecordType>
  ): Promise<SectorRecordType> {
    const srcSectorRecord: Partial<SectorRecordType> = new SectorRecord(
      data as SectorRecordType
    );

    this.idFilter(id, srcSectorRecord);

    const sectorRecord: Partial<SectorRecordType> =
      await sectorRecordRepository.update(srcSectorRecord);

    return new SectorRecord(sectorRecord as SectorRecordType);
  }

  async get(id: string): Promise<SectorRecordType> {
    const sectorRecord: Partial<SectorRecordType> =
      await sectorRecordRepository.read(id);

    return new SectorRecord(sectorRecord as SectorRecordType);
  }

  async remove(id: string): Promise<SectorRecordType> {
    const sectorRecord: Partial<SectorRecordType> =
      await sectorRecordRepository.delete(id);

    return new SectorRecord(sectorRecord as SectorRecordType);
  }
}
