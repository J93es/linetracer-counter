import { useState, useEffect } from "react";
import { ContestType } from "model/Contest";
import { ParticipantType } from "model/Participant";
import { SectorRecordType } from "model/SectorRecord";
import { DriveRecordType } from "model/DriveRecord";

import ContestEditer from "component/editer/contestEditer/Index";
import ParticipantEditer from "component/editer/participantEditer/Index";
import SectorRecordEditer from "component/editer/sectorRecordEditer/Index";
import DriveRecordEditer from "component/editer/driveRecordEditer/Index";

import { sortParticipantListByName } from "tools/sortParticipantList";
import {
  isNotEmptyArray,
  isNotEmptyObject,
  findTargetBy_id,
} from "tools/utils";

import "component/editer/Editer.css";

export default function Editer({
  setUpdateSignal,
  contestList,
}: {
  setUpdateSignal: Function;
  contestList: Partial<ContestType>[];
}) {
  const [targetContest, setTargetContest] = useState<Partial<ContestType>>({});

  const [participantList, setParticipantList] = useState<
    Partial<ParticipantType>[]
  >([]);
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

  // set targetContest when contestList is updated
  useEffect(() => {
    if (!isNotEmptyArray(contestList)) {
      setTargetContest({});
      return;
    }

    let contest = findTargetBy_id(targetContest._id, contestList);
    if (!isNotEmptyObject(contest)) {
      setTargetContest(contestList[contestList.length - 1]);
      return;
    }
    setTargetContest(contest);
  }, [contestList, targetContest._id]);

  // set participantList when targetContest is updated
  useEffect(() => {
    let participantList: Partial<ParticipantType>[] =
      targetContest.participantList || [];
    if (!isNotEmptyArray(participantList)) {
      setParticipantList([]);
      return;
    }

    participantList = sortParticipantListByName(participantList);

    setParticipantList(participantList);
  }, [targetContest]);

  // set targetParticipant when participantList is updated
  useEffect(() => {
    if (!isNotEmptyArray(participantList)) {
      setTargetParticipant({});
      return;
    }

    let participant = findTargetBy_id(targetParticipant._id, participantList);
    if (!isNotEmptyObject(participant)) {
      setTargetParticipant(participantList[participantList.length - 1]);
      return;
    }
    setTargetParticipant(participant);
  }, [participantList, targetParticipant._id]);

  // set SectorRecordList when targetParticipant is updated
  useEffect(() => {
    const sectorRecordList = targetParticipant.sectorRecordList || [];
    if (!isNotEmptyArray(sectorRecordList)) {
      setSectorRecordList([]);
      return;
    }

    setSectorRecordList(sectorRecordList);
  }, [targetParticipant]);

  // set targetSectorRecord when SectorRecordList is updated
  useEffect(() => {
    if (!isNotEmptyArray(sectorRecordList)) {
      setTargetSectorRecord({});
      return;
    }

    let sectorRecord = findTargetBy_id(
      targetSectorRecord._id,
      sectorRecordList
    );
    if (!isNotEmptyObject(sectorRecord)) {
      setTargetSectorRecord(sectorRecordList[sectorRecordList.length - 1]);
      return;
    }
    setTargetSectorRecord(sectorRecord);
  }, [sectorRecordList, targetSectorRecord._id]);

  // set driveRecordList when targetSectorRecord is updated
  useEffect(() => {
    const driveRecordList = targetSectorRecord.driveRecordList || [];
    if (!isNotEmptyArray(driveRecordList)) {
      setDriveRecordList([]);
      return;
    }

    setDriveRecordList(driveRecordList);
  }, [targetSectorRecord]);

  // set targetDriveRecord when driveRecordList is updated
  useEffect(() => {
    if (!isNotEmptyArray(driveRecordList)) {
      setTargetDriveRecord({});
      return;
    }

    let driveRecord = findTargetBy_id(targetDriveRecord._id, driveRecordList);
    if (!isNotEmptyObject(driveRecord)) {
      setTargetDriveRecord(driveRecordList[driveRecordList.length - 1]);
      return;
    }
    setTargetDriveRecord(driveRecord);
  }, [driveRecordList, targetDriveRecord._id]);

  return (
    <div className="editer">
      <ContestEditer
        setContestUpdateSignal={setUpdateSignal}
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
