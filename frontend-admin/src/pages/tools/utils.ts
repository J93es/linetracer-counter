import { ParticipantType } from "pages/admin/model/Participant";
import { filterParticipantList } from "pages/tools/filterTargetList";
import { sortParticipantListBySectorRecordField } from "pages/tools/sortTargetList";

export function isEmptyObject(target: any): boolean {
  try {
    if (!(typeof target === "object")) {
      return true;
    }
    if (JSON.stringify(target) === "{}") {
      return true;
    }
    return false;
  } catch (e) {
    return true;
  }
}

export function isEmptyArray(src: any): boolean {
  try {
    if (!Array.isArray(src)) {
      return true;
    }
    if (src.length === 0) {
      return true;
    }
    return false;
  } catch (e) {
    return true;
  }
}

export function findTargetById(
  id: string | undefined,
  objectList: any[] | undefined
): any | undefined {
  try {
    if (!id || !objectList) return undefined;
    for (let object of objectList) {
      if (object.id === id) return JSON.parse(JSON.stringify(object));
    }
    return undefined;
  } catch (e) {
    return undefined;
  }
}

export function getNextParticipant(
  curSector: string | undefined,
  curParticipantId: string | undefined,
  participantList: ParticipantType[]
): ParticipantType | undefined {
  try {
    const filteredParticipantList = filterParticipantList(participantList, {
      sectorRecordBy: "contestSector",
      sectorRecordValue: curSector,
    });
    const sortedParticipantList = sortParticipantListBySectorRecordField(
      "order",
      filteredParticipantList
    );
    for (let i = 0; i < sortedParticipantList.length; i++) {
      if (sortedParticipantList[i].id === curParticipantId) {
        if (i + 1 >= sortedParticipantList.length) {
          return undefined;
        }
        return JSON.parse(JSON.stringify(sortedParticipantList[i + 1]));
      }
    }
    return undefined;
  } catch (e) {
    return undefined;
  }
}
