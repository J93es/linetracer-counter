import { ParticipantType } from "model/Participant";
import { SectorRecordType } from "model/SectorRecord";

import { sortParticipantListByOrder } from "tools/sortTargetList";

function extractSectorRecordListBySector(
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

  return JSON.parse(JSON.stringify(sectorRecordList));
}

function extractParticipantBySector(
  sector: string,
  targetParticipantList: Partial<ParticipantType>[]
): Partial<ParticipantType>[] {
  let participantList: Partial<ParticipantType>[] = [];

  for (let targetParticipant of targetParticipantList) {
    let participant = JSON.parse(JSON.stringify(targetParticipant));

    let sectorRecordList = extractSectorRecordListBySector(
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

// Sector에 해당하는 참가자 목록, 부문 기록 만을 추출.
export function extractParticipantListBySector(
  sector: string,
  targetParticipantList: Partial<ParticipantType>[]
): Partial<ParticipantType>[] {
  let list: Partial<ParticipantType>[] = extractParticipantBySector(
    sector,
    targetParticipantList
  );

  return sortParticipantListByOrder(list);
}
