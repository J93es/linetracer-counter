import { ParticipantService } from "@core/service/participant";

import Participant, { ParticipantType } from "@model/Participant";

import { participantRepository } from "@repository/index";

let instance: ParticipantServ | null = null;
export class ParticipantServ implements ParticipantService {
  constructor() {
    if (instance) return instance;
    instance = this;
  }

  private idFilter(id: string, srcData: Partial<ParticipantType>): void {
    if (!srcData.id) {
      throw new Error("id is required");
    }
    if (String(id) !== String(srcData.id)) {
      throw new Error("id is not matched : query id and body id is different");
    }
  }

  private patchReadonlyFilter(
    srcParticipant: Partial<ParticipantType>
  ): Partial<ParticipantType> {
    const { name, association, speech, robot, ...filteredParticipant } =
      srcParticipant;

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
    id: string,
    data: Partial<ParticipantType>
  ): Promise<ParticipantType> {
    let srcParticipant: Partial<ParticipantType> = new Participant(
      data as ParticipantType
    );

    this.idFilter(id, srcParticipant);

    srcParticipant = this.patchReadonlyFilter(srcParticipant);

    const participant: Partial<ParticipantType> =
      await participantRepository.update(srcParticipant);

    return new Participant(participant as ParticipantType);
  }

  async put(
    id: string,
    data: Partial<ParticipantType>
  ): Promise<ParticipantType> {
    const srcParticipant: Partial<ParticipantType> = new Participant(
      data as ParticipantType
    );

    this.idFilter(id, srcParticipant);

    const participant: Partial<ParticipantType> =
      await participantRepository.update(srcParticipant);

    return new Participant(participant as ParticipantType);
  }

  async get(id: string): Promise<ParticipantType> {
    const participant: Partial<ParticipantType> =
      await participantRepository.readWithJoin(id, {});

    return new Participant(participant as ParticipantType);
  }

  async remove(id: string): Promise<ParticipantType> {
    const participant: Partial<ParticipantType> =
      await participantRepository.delete(id);

    return new Participant(participant as ParticipantType);
  }
}
