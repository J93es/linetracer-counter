import { useState, useEffect } from "react";
import { ContestType } from "pages/admin/model/Contest";
import { ParticipantType } from "pages/admin/model/Participant";
import { SectorRecordType } from "pages/admin/model/SectorRecord";
import { DriveRecordType } from "pages/admin/model/DriveRecord";

import ContestEditer from "pages/admin/view/editer/contestEditer/Index";
import ParticipantEditer from "pages/admin/view/editer/participantEditer/Index";
import SectorRecordEditer from "pages/admin/view/editer/sectorRecordEditer/Index";
import DriveRecordEditer from "pages/admin/view/editer/driveRecordEditer/Index";

import {
  sortParticipantList,
  sortParticipantListBySectorRecordField,
} from "pages/tools/sortTargetList";
import { findTargetById, isEmptyArray, isEmptyObject } from "pages/tools/utils";
import { filterParticipantList } from "pages/tools/filterTargetList";

import "pages/admin/view/editer/Index.css";

export default function Editer({
  setContestListRefreshSignal,
  setUpdateSignal,
  contestList,
  targetContest,
  setTargetContest,
}: {
  setContestListRefreshSignal: React.Dispatch<React.SetStateAction<number>>;
  setUpdateSignal: React.Dispatch<React.SetStateAction<number>>;
  contestList: ContestType[] | undefined;
  targetContest: ContestType | undefined;
  setTargetContest: Function;
}) {
  const [filterStringBySector, setFilterStringBySector] =
    useState<string>("all");

  const [participantList, setParticipantList] = useState<
    ParticipantType[] | undefined
  >();
  const [targetParticipant, setTargetParticipant] = useState<
    ParticipantType | undefined
  >();

  const [sectorRecordList, setSectorRecordList] = useState<
    SectorRecordType[] | undefined
  >();
  const [targetSectorRecord, setTargetSectorRecord] = useState<
    SectorRecordType | undefined
  >();

  const [driveRecordList, setDriveRecordList] = useState<
    DriveRecordType[] | undefined
  >();
  const [targetDriveRecord, setTargetDriveRecord] = useState<
    DriveRecordType | undefined
  >();

  // set participantList when targetContest is updated
  useEffect(() => {
    let participantList: ParticipantType[] | undefined =
      targetContest?.participantList;
    if (!participantList || isEmptyArray(participantList)) {
      setParticipantList(undefined);
      return;
    }

    if (filterStringBySector === "all") {
      participantList = sortParticipantList(participantList, {
        sectorRecordBy: "contestSector",
        driveRecordBy: "writeTime",
      });
    } else {
      participantList = filterParticipantList(
        participantList,
        {
          sectorRecordBy: "contestSector",
          sectorRecordValue: filterStringBySector,
        },
        { ifValueInTarget_returnOrigin: true }
      );
      participantList = sortParticipantListBySectorRecordField(
        "contestSector",
        participantList,
        { driveRecordBy: "writeTime" }
      );
    }

    setParticipantList(participantList);
  }, [targetContest, filterStringBySector]);

  // set targetParticipant when participantList is updated
  useEffect(() => {
    if (!participantList || isEmptyArray(participantList)) {
      setTargetParticipant(undefined);
      return;
    }

    let participant: ParticipantType | undefined = findTargetById(
      targetParticipant?.id,
      participantList
    );
    if (!participant || isEmptyObject(participant)) {
      setTargetParticipant(participantList[participantList.length - 1]);
      return;
    }
    setTargetParticipant(participant);
  }, [participantList, targetParticipant?.id]);

  // set SectorRecordList when targetParticipant is updated
  useEffect(() => {
    setSectorRecordList(targetParticipant?.sectorRecordList);
  }, [targetParticipant]);

  // set targetSectorRecord when SectorRecordList is updated
  useEffect(() => {
    if (!sectorRecordList || isEmptyArray(sectorRecordList)) {
      setTargetSectorRecord(undefined);
      return;
    }

    let sectorRecord = findTargetById(targetSectorRecord?.id, sectorRecordList);
    if (!sectorRecord || isEmptyObject(sectorRecord)) {
      setTargetSectorRecord(sectorRecordList[sectorRecordList.length - 1]);
      return;
    }
    setTargetSectorRecord(sectorRecord);
  }, [sectorRecordList, targetSectorRecord?.id]);

  // set driveRecordList when targetSectorRecord is updated
  useEffect(() => {
    setDriveRecordList(targetSectorRecord?.driveRecordList);
  }, [targetSectorRecord]);

  // set targetDriveRecord when driveRecordList is updated
  useEffect(() => {
    if (!driveRecordList || isEmptyArray(driveRecordList)) {
      setTargetDriveRecord(undefined);
      return;
    }

    let driveRecord = findTargetById(targetDriveRecord?.id, driveRecordList);
    if (!driveRecord || isEmptyObject(driveRecord)) {
      setTargetDriveRecord(driveRecordList[driveRecordList.length - 1]);
      return;
    }
    setTargetDriveRecord(driveRecord);
  }, [driveRecordList, targetDriveRecord?.id]);

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
      />

      <SectorRecordEditer
        setSectorRecordUpdateSignal={setUpdateSignal}
        targetSectorRecord={targetSectorRecord}
        setTargetSectorRecord={setTargetSectorRecord}
        sectorRecordList={sectorRecordList}
        targetParticipant={targetParticipant}
        filterStringBySector={filterStringBySector}
        setFilterStringBySector={setFilterStringBySector}
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
