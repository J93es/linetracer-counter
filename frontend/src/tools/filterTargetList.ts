import { ParticipantType } from "model/Participant";
import { SectorRecordType } from "model/SectorRecord";

import { sortParticipantListByOrder } from "tools/sortTargetList";

export function filterSectorRecordListBySector(
  sector: string,
  targetSectorRecordList: SectorRecordType[]
): SectorRecordType[] | null {
  const sectorRecordList: SectorRecordType[] = targetSectorRecordList.filter(
    ({ contestSector }) => {
      return contestSector === sector;
    }
  );

  if (sectorRecordList.length === 0) {
    return null;
  }

  return JSON.parse(JSON.stringify(targetSectorRecordList));
}

export function filterParticipantBySector(
  sector: string,
  targetParticipantList: Partial<ParticipantType>[]
): Partial<ParticipantType>[] {
  let participantList: Partial<ParticipantType>[] = [];

  for (let targetParticipant of targetParticipantList) {
    let participant = JSON.parse(JSON.stringify(targetParticipant));

    let sectorRecordList = filterSectorRecordListBySector(
      sector,
      participant.sectorRecordList ?? []
    );

    if (sectorRecordList) {
      participant.sectorRecordList = sectorRecordList;
      participantList.push(participant);
    }
  }

  return JSON.parse(JSON.stringify(participantList));
}

// sector에 해당하는 참가자 목록 만을 추출.
export function filterParticipantListBySector(
  sector: string,
  targetParticipantList: Partial<ParticipantType>[]
): Partial<ParticipantType>[] {
  let list: Partial<ParticipantType>[] = filterParticipantBySector(
    sector,
    targetParticipantList
  );

  return sortParticipantListByOrder(list);
}
