import { ParticipantType } from "model/Participant";
import { SectorRecordType } from "model/SectorRecord";

import { sortParticipantListByOrder } from "tools/sortParticipantList";

function extractSectorRecordListByCurSector(
  curSector: string,
  targetSectorRecordList: SectorRecordType[]
): SectorRecordType[] | null {
  const sectorRecordList: SectorRecordType[] = targetSectorRecordList.filter(
    ({ contestSector }) => {
      return contestSector === curSector;
    }
  );

  if (sectorRecordList.length === 0) {
    return null;
  }

  return JSON.parse(JSON.stringify(sectorRecordList));
}

function filterParticipantByCurSector(
  curSector: string,
  targetParticipantList: Partial<ParticipantType>[]
): Partial<ParticipantType>[] {
  let participantList: Partial<ParticipantType>[] = [];

  for (let targetParticipant of targetParticipantList) {
    let participant = JSON.parse(JSON.stringify(targetParticipant));

    let sectorRecordList = extractSectorRecordListByCurSector(
      curSector,
      participant.sectorRecordList ?? []
    );

    if (sectorRecordList) {
      participant.sectorRecordList = sectorRecordList;
      participantList.push(participant);
    }
  }

  return JSON.parse(JSON.stringify(participantList));
}

// curSector에 해당하는 참가자 목록, 부문 기록 만을 추출.
export function extractParticipantList(
  curSector: string,
  targetParticipantList: Partial<ParticipantType>[]
): Partial<ParticipantType>[] {
  let list: Partial<ParticipantType>[] = filterParticipantByCurSector(
    curSector,
    targetParticipantList
  );

  return sortParticipantListByOrder(list);
}
