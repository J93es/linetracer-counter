import { ParticipantType } from "model/Participant";
import { extractParticipantListBySector } from "tools/extractTargetList";

export function isEmptyObject(target: object) {
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

export function findTargetBy_id(_id: string, objectList: any[]): any {
  try {
    for (let object of objectList) {
      if (object._id === _id) return JSON.parse(JSON.stringify(object));
    }
    return {};
  } catch (e) {
    return {};
  }
}

export function getNextParticipant(
  curSector: string,
  curParticipantId: string,
  participantList: Partial<ParticipantType>[]
): any {
  try {
    const sortedParticipantList = extractParticipantListBySector(
      curSector,
      participantList
    );
    for (let i = 0; i < sortedParticipantList.length; i++) {
      if (sortedParticipantList[i]._id === curParticipantId) {
        if (i + 1 >= sortedParticipantList.length) {
          return JSON.parse(JSON.stringify(sortedParticipantList[i]));
        }
        return JSON.parse(JSON.stringify(sortedParticipantList[i + 1]));
      }
    }
    return {};
  } catch (e) {
    return {};
  }
}
