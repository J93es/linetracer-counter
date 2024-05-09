import { ParticipantType } from "model/Participant";
import { SectorRecordType } from "model/SectorRecord";

function sortSectorRecordListByOrder(
  targetSectorRecordList: Partial<SectorRecordType>[]
): Partial<SectorRecordType>[] {
  // sort할 배열
  let list: Partial<SectorRecordType>[] = JSON.parse(
    JSON.stringify(targetSectorRecordList)
  );

  // 임시 배열은 위치 및 정렬 값이있는 객체를 보유합니다.
  let mapped = list.map(function (
    targetSectorRecord: Partial<SectorRecordType>,
    i: number
  ) {
    return {
      index: i,
      value: targetSectorRecord.order,
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

export function sortParticipantListByOrder(
  targetParticipantList: Partial<ParticipantType>[]
): Partial<ParticipantType>[] {
  // sort할 배열
  let list: Partial<ParticipantType>[] = JSON.parse(
    JSON.stringify(targetParticipantList)
  );

  for (let i = 0; i < list.length; i++) {
    let sectorRecordList: Partial<SectorRecordType>[] =
      list[i]?.sectorRecordList || [];

    sectorRecordList = sortSectorRecordListByOrder(sectorRecordList);

    list[i].sectorRecordList = sectorRecordList as SectorRecordType[];
  }

  // 임시 배열은 위치 및 정렬 값이있는 객체를 보유합니다.
  let mapped = list.map(function (
    targetParticipant: Partial<ParticipantType>,
    i: number
  ) {
    const sectorRecordList: Partial<SectorRecordType>[] =
      targetParticipant?.sectorRecordList || [];

    let order = 501;
    if (sectorRecordList.length > 0) {
      order = sectorRecordList[0].order || 501;
    }

    return {
      index: i,
      value: order,
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

export function sortParticipantListByName(
  targetParticipantList: Partial<ParticipantType>[]
): Partial<ParticipantType>[] {
  // sort할 배열
  let list: Partial<ParticipantType>[] = JSON.parse(
    JSON.stringify(targetParticipantList)
  );

  // 임시 배열은 위치 및 정렬 값이있는 객체를 보유합니다.
  let mapped = list.map(function (
    targetParticipant: Partial<ParticipantType>,
    i: number
  ) {
    return {
      index: i,
      value: targetParticipant.name,
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
