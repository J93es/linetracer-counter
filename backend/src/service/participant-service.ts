import { ParticipantServiceInterface } from "../core/service/participant";

import Participant, { ParticipantType } from "../model/Participant";

import { ParticipantRepository } from "../core/repository/participant";
import { ParticipantMongoRepo } from "../repository/mongo/participant";

const participantRepository: ParticipantRepository = new ParticipantMongoRepo();

let instance: ParticipantService | null = null;
export class ParticipantService implements ParticipantServiceInterface {
  constructor() {
    if (instance) return instance;
    instance = this;
  }

  private _idFilter(_id: string, srcData: Partial<ParticipantType>): void {
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
    srcParticipant: Partial<ParticipantType>
  ): Partial<ParticipantType> {
    const filteredParticipant = JSON.parse(JSON.stringify(srcParticipant));

    delete filteredParticipant.name;
    delete filteredParticipant.association;
    delete filteredParticipant.speech;
    delete filteredParticipant.robot;

    // const {name, association, speech, robot, ...filteredParticipant} = JSON.parse(JSON.stringify(srcParticipant));

    return filteredParticipant;
  }

  async post(data: Partial<ParticipantType>): Promise<ParticipantType> {
    const srcParticipant: Partial<ParticipantType> = new Participant(
      data as ParticipantType
    );
    const participant: Partial<ParticipantType> =
      await participantRepository.create(srcParticipant as ParticipantType);

    return new Participant(participant as ParticipantType);
  }

  async patch(
    _id: string,
    data: Partial<ParticipantType>
  ): Promise<ParticipantType> {
    let srcParticipant: Partial<ParticipantType> = new Participant(
      data as ParticipantType
    );

    this._idFilter(_id, srcParticipant);

    srcParticipant = this.patchReadonlyFilter(srcParticipant);

    const participant: Partial<ParticipantType> =
      await participantRepository.update(srcParticipant);

    return new Participant(participant as ParticipantType);
  }

  async put(
    _id: string,
    data: Partial<ParticipantType>
  ): Promise<ParticipantType> {
    const srcParticipant: Partial<ParticipantType> = new Participant(
      data as ParticipantType
    );

    this._idFilter(_id, srcParticipant);

    const participant: Partial<ParticipantType> =
      await participantRepository.update(srcParticipant);

    return new Participant(participant as ParticipantType);
  }

  async get(_id: string): Promise<ParticipantType> {
    const participant: Partial<ParticipantType> =
      await participantRepository.readWithJoin(_id, {});

    return new Participant(participant as ParticipantType);
  }

  async getEvery(contest_Id: string): Promise<ParticipantType[]> {
    const participantList: Partial<ParticipantType>[] =
      await participantRepository.readEvery(contest_Id);

    return participantList.map(
      (participant) => new Participant(participant as ParticipantType)
    );
  }

  async remove(_id: string): Promise<ParticipantType> {
    const participant: Partial<ParticipantType> =
      await participantRepository.delete(_id);

    return new Participant(participant as ParticipantType);
  }
}
