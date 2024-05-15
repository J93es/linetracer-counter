import { ParticipantType, participantTamplate } from "model/Participant";
import { SectorRecordType, sectorRecordTamplate } from "model/SectorRecord";
import { DriveRecordType, driveRecordTamplate } from "model/DriveRecord";

const defaultSortValue = -1;

function sortTarget(targetList: any[], targetBy: string): any[] {
  // sort할 배열
  let list: any[] = JSON.parse(JSON.stringify(targetList));

  // 임시 배열은 위치 및 정렬 값이있는 객체를 보유합니다.
  let mapped = list.map(function (target: any, i: number) {
    return {
      index: i,
      value: target[targetBy as keyof any] ?? defaultSortValue,
    };
  });

  // 축소 치를 포함한 매핑 된 배열의 소트
  mapped.sort(function (a: any, b: any) {
    return +(a.value > b.value) || +(a.value === b.value) - 1;
  });

  // 결과 순서를 위한 컨테이너
  var result = mapped.map(function (el) {
    return list[el.index];
  });

  return result;
}

export function sortDriveRecordList(
  targetDriveRecordList: Partial<DriveRecordType>[],
  by?: { driveRecordBy?: string }
): Partial<DriveRecordType>[] {
  const { driveRecordBy } = by ?? {};

  // sort할 배열
  let list: Partial<DriveRecordType>[] = JSON.parse(
    JSON.stringify(targetDriveRecordList)
  );

  if (driveRecordBy && driveRecordBy in driveRecordTamplate) {
    return sortTarget(list, driveRecordBy);
  }
  return list;
}

export function sortSectorRecordList(
  targetSectorRecordList: Partial<SectorRecordType>[],
  by?: { sectorRecordBy?: string; driveRecordBy?: string }
): Partial<SectorRecordType>[] {
  const { sectorRecordBy, ...otherBy } = by ?? {};

  // sort할 배열
  let list: Partial<SectorRecordType>[] = JSON.parse(
    JSON.stringify(targetSectorRecordList)
  );

  for (let i = 0; i < list.length; i++) {
    let driveRecordList: Partial<DriveRecordType>[] =
      list[i]?.driveRecordList ?? [];

    driveRecordList = sortDriveRecordList(driveRecordList, otherBy);

    list[i].driveRecordList = driveRecordList as DriveRecordType[];
  }

  if (sectorRecordBy && sectorRecordBy in sectorRecordTamplate) {
    return sortTarget(list, sectorRecordBy);
  }
  return list;
}

export function sortParticipantList(
  targetParticipantList: Partial<ParticipantType>[],
  by?: {
    participantBy?: string;
    sectorRecordBy?: string;
    driveRecordBy?: string;
  }
): Partial<ParticipantType>[] {
  const { participantBy, ...otherBy } = by ?? {};

  // sort할 배열
  let list: Partial<ParticipantType>[] = JSON.parse(
    JSON.stringify(targetParticipantList)
  );

  for (let i = 0; i < list.length; i++) {
    let sectorRecordList: Partial<SectorRecordType>[] =
      list[i]?.sectorRecordList ?? [];

    sectorRecordList = sortSectorRecordList(sectorRecordList, otherBy);

    list[i].sectorRecordList = sectorRecordList as SectorRecordType[];
  }

  if (participantBy && participantBy in participantTamplate) {
    return sortTarget(list, participantBy);
  }
  return list;
}

export function sortSectorRecordByDriveRecordField(
  driveRecordBy: string,
  targetSectorRecordList: Partial<SectorRecordType>[]
) {
  let list: Partial<SectorRecordType>[] = JSON.parse(
    JSON.stringify(targetSectorRecordList)
  );

  for (let i = 0; i < list.length; i++) {
    let driveRecordList: Partial<DriveRecordType>[] =
      list[i]?.driveRecordList ?? [];

    driveRecordList = sortDriveRecordList(driveRecordList, {
      driveRecordBy: driveRecordBy,
    });

    list[i].driveRecordList = driveRecordList as DriveRecordType[];
  }

  // 임시 배열은 위치 및 정렬 값이있는 객체를 보유합니다.
  let mapped = list.map(function (
    targetSectorRecord: Partial<SectorRecordType>,
    i: number
  ) {
    const driveRecordList: Partial<DriveRecordType>[] =
      targetSectorRecord?.driveRecordList ?? [];

    return {
      index: i,
      value:
        driveRecordList[0][(driveRecordBy as keyof DriveRecordType) ?? ""] ??
        defaultSortValue,
    };
  });

  // 축소 치를 포함한 매핑 된 배열의 소트
  mapped.sort(function (a: any, b: any) {
    return +(a.value > b.value) || +(a.value === b.value) - 1;
  });

  // 결과 순서를 위한 컨테이너
  var result = mapped.map(function (el) {
    return list[el.index];
  });

  return result;
}

export function sortParticipantListBySectorRecordField(
  sectorRecordBy: string,
  targetParticipantList: Partial<ParticipantType>[],
  by?: { driveRecordBy?: string }
): Partial<ParticipantType>[] {
  // sort할 배열
  let list: Partial<ParticipantType>[] = JSON.parse(
    JSON.stringify(targetParticipantList)
  );

  for (let i = 0; i < list.length; i++) {
    let sectorRecordList: Partial<SectorRecordType>[] =
      list[i]?.sectorRecordList ?? [];

    sectorRecordList = sortSectorRecordList(sectorRecordList, {
      sectorRecordBy: sectorRecordBy,
      driveRecordBy: by?.driveRecordBy,
    });

    list[i].sectorRecordList = sectorRecordList as SectorRecordType[];
  }

  // 임시 배열은 위치 및 정렬 값이있는 객체를 보유합니다.
  let mapped = list.map(function (
    targetParticipant: Partial<ParticipantType>,
    i: number
  ) {
    const sectorRecordList: Partial<SectorRecordType>[] =
      targetParticipant?.sectorRecordList ?? [];

    return {
      index: i,
      value:
        sectorRecordList[0][(sectorRecordBy as keyof SectorRecordType) ?? ""] ??
        defaultSortValue,
    };
  });

  // 축소 치를 포함한 매핑 된 배열의 소트
  mapped.sort(function (a: any, b: any) {
    return +(a.value > b.value) || +(a.value === b.value) - 1;
  });

  // 결과 순서를 위한 컨테이너
  var result = mapped.map(function (el) {
    return list[el.index];
  });

  return result;
}

export function sortParticipantListByDriveRecordField(
  driveRecordBy: string,
  targetParticipantList: Partial<ParticipantType>[]
): Partial<ParticipantType>[] {
  // sort할 배열
  let list: Partial<ParticipantType>[] = JSON.parse(
    JSON.stringify(targetParticipantList)
  );

  for (let i = 0; i < list.length; i++) {
    let sectorRecordList: Partial<SectorRecordType>[] =
      list[i]?.sectorRecordList ?? [];

    sectorRecordList = sortSectorRecordByDriveRecordField(
      driveRecordBy,
      sectorRecordList
    );

    list[i].sectorRecordList = sectorRecordList as SectorRecordType[];
  }

  // 임시 배열은 위치 및 정렬 값이있는 객체를 보유합니다.
  let mapped = list.map(function (
    targetParticipant: Partial<ParticipantType>,
    i: number
  ) {
    const sectorRecordList: Partial<SectorRecordType>[] =
      targetParticipant?.sectorRecordList ?? [];

    return {
      index: i,
      value:
        sectorRecordList[0].driveRecordList[0][
          (driveRecordBy as keyof DriveRecordType) ?? ""
        ] ?? defaultSortValue,
    };
  });

  // 축소 치를 포함한 매핑 된 배열의 소트
  mapped.sort(function (a: any, b: any) {
    return +(a.value > b.value) || +(a.value === b.value) - 1;
  });

  // 결과 순서를 위한 컨테이너
  var result = mapped.map(function (el) {
    return list[el.index];
  });

  return result;
}
