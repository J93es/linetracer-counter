import { ParticipantRecordServiceInterface } from "../core/service/participantRecord";

import ParticipantRecord, {
  ParticipantRecordType,
} from "../model/index/ParticipantRecord";

import { ParticipantRecordRepository } from "../core/repository/participantRecord";
import { ParticipantRecordMongoRepo } from "../repository/mongo/participantRecord";

const participantRecordRepository: ParticipantRecordRepository =
  new ParticipantRecordMongoRepo();

export class ParticipantRecordService
  implements ParticipantRecordServiceInterface
{
  private _idFilter(_id: any, srcData: Partial<ParticipantRecordType>): void {
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
    srcParticipantRecord: Partial<ParticipantRecordType>
  ): Partial<ParticipantRecordType> {
    const filteredParticipantRecord = JSON.parse(
      JSON.stringify(srcParticipantRecord)
    );

    delete filteredParticipantRecord.contestSector;

    return filteredParticipantRecord;
  }

  async postParticipantRecord(
    data: Partial<ParticipantRecordType>
  ): Promise<ParticipantRecordType> {
    const srcParticipantRecord: Partial<ParticipantRecordType> =
      new ParticipantRecord(data as ParticipantRecordType);
    const participantRecord: Partial<ParticipantRecordType> =
      await participantRecordRepository.createParticipantRecord(
        srcParticipantRecord as ParticipantRecordType
      );

    return new ParticipantRecord(participantRecord as ParticipantRecordType);
  }

  async patchParticipantRecord(
    _id: string,
    data: Partial<ParticipantRecordType>
  ): Promise<ParticipantRecordType> {
    let srcParticipantRecord: Partial<ParticipantRecordType> =
      new ParticipantRecord(data as ParticipantRecordType);

    this._idFilter(_id, srcParticipantRecord);

    srcParticipantRecord = this.patchReadonlyFilter(srcParticipantRecord);

    const participantRecord: Partial<ParticipantRecordType> =
      await participantRecordRepository.updateParticipantRecord(
        _id,
        srcParticipantRecord,
        false
      );

    return new ParticipantRecord(participantRecord as ParticipantRecordType);
  }

  async putParticipantRecord(
    _id: string,
    data: Partial<ParticipantRecordType>
  ): Promise<ParticipantRecordType> {
    const srcParticipantRecord: Partial<ParticipantRecordType> =
      new ParticipantRecord(data as ParticipantRecordType);

    this._idFilter(_id, srcParticipantRecord);

    const participantRecord: Partial<ParticipantRecordType> =
      await participantRecordRepository.updateParticipantRecord(
        _id,
        srcParticipantRecord,
        true
      );

    return new ParticipantRecord(participantRecord as ParticipantRecordType);
  }

  async getParticipantRecord(_id: string): Promise<ParticipantRecordType> {
    const participantRecord: Partial<ParticipantRecordType> =
      await participantRecordRepository.readParticipantRecord(_id);

    return new ParticipantRecord(participantRecord as ParticipantRecordType);
  }

  async removeParticipantRecord(_id: string): Promise<ParticipantRecordType> {
    const participantRecord: Partial<ParticipantRecordType> =
      await participantRecordRepository.deleteParticipantRecord(_id);

    return new ParticipantRecord(participantRecord as ParticipantRecordType);
  }
}
