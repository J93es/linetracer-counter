import { ParticipantType, participantTamplate } from "model/Participant";
import { SectorRecordType, sectorRecordTamplate } from "model/SectorRecord";
import { DriveRecordType, driveRecordTamplate } from "model/DriveRecord";

import { isEmptyArray } from "tools/utils";

export function filterTargetList(
  targetList: any[],
  filterBy: string,
  filterValue: any,
  option?: {
    ifValueInTarget_returnOrigin?: boolean;
  }
): any[] {
  let list: any[] = JSON.parse(JSON.stringify(targetList));
  let filteredList: any[] = list.filter((data) => {
    return data[filterBy] === filterValue;
  });

  if (option?.ifValueInTarget_returnOrigin) {
    return JSON.parse(JSON.stringify(targetList));
  }

  return JSON.parse(JSON.stringify(filteredList));
}

export function filterDriveRecordList(
  driveRecordList: DriveRecordType[],
  by?: {
    driveRecordBy?: string;
    driveRecordValue?: any;
  },
  option?: {
    ifValueInTarget_returnOrigin?: boolean;
  }
): DriveRecordType[] {
  const { driveRecordBy, driveRecordValue } = by ?? {};

  if (driveRecordBy && driveRecordBy in driveRecordTamplate) {
    return filterTargetList(
      driveRecordList ?? [],
      driveRecordBy,
      driveRecordValue,
      option
    );
  }

  return JSON.parse(JSON.stringify(driveRecordList));
}

export function filterSectorRecordList(
  sectorRecordList: SectorRecordType[],
  by?: {
    sectorRecordBy?: string;
    sectorRecordValue?: any;
    driveRecordBy?: string;
    driveRecordValue?: any;
  },
  option?: {
    ifValueInTarget_returnOrigin?: boolean;
  }
): SectorRecordType[] {
  const { sectorRecordBy, sectorRecordValue, ...otherBy } = by ?? {};
  let list: SectorRecordType[] = [];

  for (let sectorRecord of sectorRecordList) {
    let target: SectorRecordType = JSON.parse(JSON.stringify(sectorRecord));
    let driveRecordList: DriveRecordType[] = filterDriveRecordList(
      target.driveRecordList ?? [],
      otherBy,
      option
    );

    if (!isEmptyArray(sectorRecordList)) {
      target.driveRecordList = driveRecordList;
      list.push(target);
    }
  }

  if (sectorRecordBy && sectorRecordBy in sectorRecordTamplate) {
    return filterTargetList(
      list ?? [],
      sectorRecordBy,
      sectorRecordValue,
      option
    );
  }

  return list;
}

export function filterParticipantList(
  participantList: ParticipantType[],
  by?: {
    participantBy?: string;
    participantValue?: any;
    sectorRecordBy?: string;
    sectorRecordValue?: any;
    driveRecordBy?: string;
    driveRecordValue?: any;
  },
  option?: {
    ifValueInTarget_returnOrigin?: boolean;
  }
): ParticipantType[] {
  const { participantBy, participantValue, ...otherBy } = by ?? {};
  let list: ParticipantType[] = [];

  for (let participant of participantList) {
    let target: ParticipantType = JSON.parse(JSON.stringify(participant));
    let sectorRecordList: SectorRecordType[] = filterSectorRecordList(
      participant.sectorRecordList ?? [],
      otherBy,
      option
    );

    if (!isEmptyArray(sectorRecordList)) {
      target.sectorRecordList = sectorRecordList;
      list.push(target);
    }
  }

  if (participantBy && participantBy in participantTamplate) {
    return filterTargetList(
      list ?? [],
      participantBy,
      participantValue,
      option
    );
  }

  return list;
}
