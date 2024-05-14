import { useState, useEffect } from "react";
import { ContestType } from "model/Contest";
import { ParticipantType } from "model/Participant";
import { SectorRecordType } from "model/SectorRecord";
import { DriveRecordType } from "model/DriveRecord";

import ContestEditer from "component/editer/contestEditer/Index";
import ParticipantEditer from "component/editer/participantEditer/Index";
import SectorRecordEditer from "component/editer/sectorRecordEditer/Index";
import DriveRecordEditer from "component/editer/driveRecordEditer/Index";

import { sortParticipantListByName } from "tools/sortTargetList";
import { isEmptyArray, isEmptyObject, findTargetBy_id } from "tools/utils";
import { filterParticipantListBySector } from "tools/filterTargetList";

import "component/editer/Index.css";

export default function Editer({
  setContestListRefreshSignal,
  setUpdateSignal,
  contestList,
  targetContest,
  setTargetContest,
}: {
  setContestListRefreshSignal: Function;
  setUpdateSignal: Function;
  contestList: Partial<ContestType>[];
  targetContest: Partial<ContestType>;
  setTargetContest: Function;
}) {
  const [participantList, setParticipantList] = useState<
    Partial<ParticipantType>[]
  >([]);
  const [filterStringBySector, setFilterStringBySector] =
    useState<string>("all");
  const [targetParticipant, setTargetParticipant] = useState<
    Partial<ParticipantType>
  >({});

  const [sectorRecordList, setSectorRecordList] = useState<
    Partial<SectorRecordType>[]
  >([]);
  const [targetSectorRecord, setTargetSectorRecord] = useState<
    Partial<SectorRecordType>
  >({});

  const [driveRecordList, setDriveRecordList] = useState<
    Partial<DriveRecordType>[]
  >([]);
  const [targetDriveRecord, setTargetDriveRecord] = useState<
    Partial<DriveRecordType>
  >({});

  // set participantList when targetContest is updated
  useEffect(() => {
    let participantList: Partial<ParticipantType>[] =
      targetContest.participantList ?? [];
    if (isEmptyArray(participantList)) {
      setParticipantList([]);
      return;
    }

    if (filterStringBySector === "all") {
      participantList = sortParticipantListByName(participantList);
    } else {
      participantList = filterParticipantListBySector(
        filterStringBySector,
        participantList
      );
    }

    setParticipantList(participantList);
  }, [targetContest, filterStringBySector]);

  // set targetParticipant when participantList is updated
  useEffect(() => {
    if (isEmptyArray(participantList)) {
      setTargetParticipant({});
      return;
    }

    let participant = findTargetBy_id(targetParticipant._id, participantList);
    if (isEmptyObject(participant)) {
      setTargetParticipant(participantList[participantList.length - 1]);
      return;
    }
    setTargetParticipant(participant);
  }, [participantList, targetParticipant._id]);

  // set SectorRecordList when targetParticipant is updated
  useEffect(() => {
    const sectorRecordList = targetParticipant.sectorRecordList ?? [];
    if (isEmptyArray(sectorRecordList)) {
      setSectorRecordList([]);
      return;
    }

    setSectorRecordList(sectorRecordList);
  }, [targetParticipant]);

  // set targetSectorRecord when SectorRecordList is updated
  useEffect(() => {
    if (isEmptyArray(sectorRecordList)) {
      setTargetSectorRecord({});
      return;
    }

    let sectorRecord = findTargetBy_id(
      targetSectorRecord._id,
      sectorRecordList
    );
    if (isEmptyObject(sectorRecord)) {
      setTargetSectorRecord(sectorRecordList[sectorRecordList.length - 1]);
      return;
    }
    setTargetSectorRecord(sectorRecord);
  }, [sectorRecordList, targetSectorRecord._id]);

  // set driveRecordList when targetSectorRecord is updated
  useEffect(() => {
    const driveRecordList = targetSectorRecord.driveRecordList ?? [];
    if (isEmptyArray(driveRecordList)) {
      setDriveRecordList([]);
      return;
    }

    setDriveRecordList(driveRecordList);
  }, [targetSectorRecord]);

  // set targetDriveRecord when driveRecordList is updated
  useEffect(() => {
    if (isEmptyArray(driveRecordList)) {
      setTargetDriveRecord({});
      return;
    }

    let driveRecord = findTargetBy_id(targetDriveRecord._id, driveRecordList);
    if (isEmptyObject(driveRecord)) {
      setTargetDriveRecord(driveRecordList[driveRecordList.length - 1]);
      return;
    }
    setTargetDriveRecord(driveRecord);
  }, [driveRecordList, targetDriveRecord._id]);

  return (
    <div className="editer">
      <ContestEditer
        setContestListRefreshSignal={setContestListRefreshSignal}
        contestList={contestList}
        targetContest={targetContest}
        setTargetContest={setTargetContest}
      />

      <ParticipantEditer
        setParticipantUpdateSignal={setUpdateSignal}
        participantList={participantList}
        targetParticipant={targetParticipant}
        setTargetParticipant={setTargetParticipant}
        targetContest={targetContest}
        filterStringBySector={filterStringBySector}
        setFilterStringBySector={setFilterStringBySector}
      />

      <SectorRecordEditer
        setSectorRecordUpdateSignal={setUpdateSignal}
        targetSectorRecord={targetSectorRecord}
        setTargetSectorRecord={setTargetSectorRecord}
        sectorRecordList={sectorRecordList}
        targetParticipant={targetParticipant}
      />

      <DriveRecordEditer
        setDriveRecordUpdateSignal={setUpdateSignal}
        targetDriveRecord={targetDriveRecord}
        setTargetDriveRecord={setTargetDriveRecord}
        driveRecordList={driveRecordList}
        targetSectorRecord={targetSectorRecord}
      />
    </div>
  );
}