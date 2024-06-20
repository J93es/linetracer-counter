import {
  ParticipantType,
  participantTamplate,
} from "component/admin/model/Participant";
import {
  SectorRecordType,
  sectorRecordTamplate,
} from "component/admin/model/SectorRecord";
import {
  DriveRecordType,
  driveRecordTamplate,
} from "component/admin/model/DriveRecord";

const defaultSortValue = Infinity;

export function sortTarget(targetList: any[], targetBy: string): any[] {
  // sort할 배열
  let list: any[] = JSON.parse(JSON.stringify(targetList));

  // 임시 배열은 위치 및 정렬 값이있는 객체를 보유합니다.
  let mapped = list.map(function (target: any, i: number) {
    try {
      return {
        index: i,
        value: target[targetBy as keyof any] ?? defaultSortValue,
      };
    } catch (error) {
      return {
        index: i,
        value: defaultSortValue,
      };
    }
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
  targetDriveRecordList: DriveRecordType[],
  by?: { driveRecordBy?: string }
): DriveRecordType[] {
  const { driveRecordBy } = by ?? {};

  // sort할 배열
  let list: DriveRecordType[] = JSON.parse(
    JSON.stringify(targetDriveRecordList)
  );

  if (driveRecordBy && driveRecordBy in driveRecordTamplate) {
    return sortTarget(list, driveRecordBy);
  }
  return list;
}

export function sortSectorRecordList(
  targetSectorRecordList: SectorRecordType[],
  by?: { sectorRecordBy?: string; driveRecordBy?: string }
): SectorRecordType[] {
  const { sectorRecordBy, ...otherBy } = by ?? {};

  // sort할 배열
  let list: SectorRecordType[] = JSON.parse(
    JSON.stringify(targetSectorRecordList)
  );

  for (let i = 0; i < list.length; i++) {
    let driveRecordList: DriveRecordType[] = list[i]?.driveRecordList ?? [];

    driveRecordList = sortDriveRecordList(driveRecordList, otherBy);

    list[i].driveRecordList = driveRecordList as DriveRecordType[];
  }

  if (sectorRecordBy && sectorRecordBy in sectorRecordTamplate) {
    return sortTarget(list, sectorRecordBy);
  }
  return list;
}

export function sortParticipantList(
  targetParticipantList: ParticipantType[],
  by?: {
    participantBy?: string;
    sectorRecordBy?: string;
    driveRecordBy?: string;
  }
): ParticipantType[] {
  const { participantBy, ...otherBy } = by ?? {};

  // sort할 배열
  let list: ParticipantType[] = JSON.parse(
    JSON.stringify(targetParticipantList)
  );

  for (let i = 0; i < list.length; i++) {
    let sectorRecordList: SectorRecordType[] = list[i]?.sectorRecordList ?? [];

    sectorRecordList = sortSectorRecordList(sectorRecordList, otherBy);

    list[i].sectorRecordList = sectorRecordList as SectorRecordType[];
  }

  if (participantBy && participantBy in participantTamplate) {
    return sortTarget(list, participantBy);
  }
  return list;
}

export function sortSectorRecordListByDriveRecordField(
  driveRecordBy: string,
  targetSectorRecordList: SectorRecordType[]
) {
  let list: SectorRecordType[] = JSON.parse(
    JSON.stringify(targetSectorRecordList)
  );

  for (let i = 0; i < list.length; i++) {
    let driveRecordList: DriveRecordType[] = list[i]?.driveRecordList ?? [];

    driveRecordList = sortDriveRecordList(driveRecordList, {
      driveRecordBy: driveRecordBy,
    });

    list[i].driveRecordList = driveRecordList as DriveRecordType[];
  }

  // 임시 배열은 위치 및 정렬 값이있는 객체를 보유합니다.
  let mapped = list.map(function (
    targetSectorRecord: SectorRecordType,
    i: number
  ) {
    const driveRecordList: DriveRecordType[] =
      targetSectorRecord?.driveRecordList ?? [];

    try {
      return {
        index: i,
        value:
          driveRecordList[0][(driveRecordBy as keyof DriveRecordType) ?? ""] ??
          defaultSortValue,
      };
    } catch (error) {
      return {
        index: i,
        value: defaultSortValue,
      };
    }
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
  targetParticipantList: ParticipantType[],
  by?: { driveRecordBy?: string }
): ParticipantType[] {
  // sort할 배열
  let list: ParticipantType[] = JSON.parse(
    JSON.stringify(targetParticipantList)
  );

  for (let i = 0; i < list.length; i++) {
    let sectorRecordList: SectorRecordType[] = list[i]?.sectorRecordList ?? [];

    sectorRecordList = sortSectorRecordList(sectorRecordList, {
      sectorRecordBy: sectorRecordBy,
      driveRecordBy: by?.driveRecordBy,
    });

    list[i].sectorRecordList = sectorRecordList as SectorRecordType[];
  }

  // 임시 배열은 위치 및 정렬 값이있는 객체를 보유합니다.
  let mapped = list.map(function (
    targetParticipant: ParticipantType,
    i: number
  ) {
    const sectorRecordList: SectorRecordType[] =
      targetParticipant?.sectorRecordList ?? [];

    try {
      return {
        index: i,
        value:
          sectorRecordList[0][
            (sectorRecordBy as keyof SectorRecordType) ?? ""
          ] ?? defaultSortValue,
      };
    } catch (error) {
      return {
        index: i,
        value: defaultSortValue,
      };
    }
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
  targetParticipantList: ParticipantType[]
): ParticipantType[] {
  // sort할 배열
  let list: ParticipantType[] = JSON.parse(
    JSON.stringify(targetParticipantList)
  );

  for (let i = 0; i < list.length; i++) {
    let sectorRecordList: SectorRecordType[] = list[i]?.sectorRecordList ?? [];

    sectorRecordList = sortSectorRecordListByDriveRecordField(
      driveRecordBy,
      sectorRecordList
    );

    list[i].sectorRecordList = sectorRecordList;
  }

  // 임시 배열은 위치 및 정렬 값이있는 객체를 보유합니다.
  let mapped = list.map(function (
    targetParticipant: ParticipantType,
    i: number
  ) {
    const sectorRecordList: SectorRecordType[] =
      targetParticipant?.sectorRecordList ?? [];

    try {
      return {
        index: i,
        value:
          sectorRecordList[0].driveRecordList[0][
            driveRecordBy as keyof DriveRecordType
          ] ?? defaultSortValue,
      };
    } catch (error) {
      return {
        index: i,
        value: defaultSortValue,
      };
    }
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
