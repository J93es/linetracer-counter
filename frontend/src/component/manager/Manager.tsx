import { useState, useEffect } from "react";
import { ContestType } from "model/Contest";
import { ParticipantType } from "model/Participant";
import { SectorRecordType } from "model/SectorRecord";
import { DriveRecordType } from "model/DriveRecord";

import ContestManager from "component/manager/contestManager/Index";
import ParticipantManager from "component/manager/participantManager/Index";
import SectorRecordManager from "component/manager/sectorRecordManager/Index";
import DriveRecordManager from "component/manager/driveRecordManager/Index";
import OperationMenu from "component/manager/operationMenu/Index";

import { extractParticipantList } from "tools/extractParticipantList";
import { isEmptyArray, isEmptyObject, findTargetBy_id } from "tools/utils";

import "component/manager/Manager.css";
import { set } from "react-hook-form";

export default function Manager({
  setUpdateSignal,
  contestList,
}: {
  setUpdateSignal: Function;
  contestList: Partial<ContestType>[];
}) {
  const [isContestInProgress, setIsContestInProgress] =
    useState<boolean>(false);
  const [isContestTimerRunning, setIsContestTimerRunning] =
    useState<boolean>(false);

  const [isContestBlocked, setIsContestBlocked] = useState<boolean>(false);
  const [targetContest, setTargetContest] = useState<Partial<ContestType>>({});

  const [isParticipantBlocked, setIsParticipantBlocked] =
    useState<boolean>(false);
  const [participantList, setParticipantList] = useState<
    Partial<ParticipantType>[]
  >([]);
  const [targetParticipant, setTargetParticipant] = useState<
    Partial<ParticipantType>
  >({});

  const [isSectorRecordBlocked, setIsSectorRecordBlocked] =
    useState<boolean>(false);
  const [sectorRecordList, setSectorRecordList] = useState<
    Partial<SectorRecordType>[]
  >([]);
  const [targetSectorRecord, setTargetSectorRecord] = useState<
    Partial<SectorRecordType>
  >({});

  const [isDriveRecordBlocked, setIsDriveRecordBlocked] =
    useState<boolean>(false);
  const [driveRecordList, setDriveRecordList] = useState<
    Partial<DriveRecordType>[]
  >([]);
  const [targetDriveRecord, setTargetDriveRecord] = useState<
    Partial<DriveRecordType>
  >({});

  // set targetContest when contestList is updated
  useEffect(() => {
    if (isEmptyArray(contestList)) {
      setTargetContest({});
      return;
    }

    let contest = findTargetBy_id(targetContest._id, contestList);
    if (isEmptyObject(contest)) {
      setTargetContest(contestList[contestList.length - 1]);
      return;
    }

    setTargetContest(contest);
  }, [contestList, targetContest._id]);

  // set participantList when targetContest is updated
  useEffect(() => {
    let participantList: Partial<ParticipantType>[] =
      targetContest.participantList || [];
    if (isEmptyArray(participantList)) {
      setParticipantList([]);
      return;
    }

    // curSector에 해당하는 참가자 목록, 부문 기록 만을 추출.
    participantList = extractParticipantList(
      targetContest?.curContestingSection || "",
      participantList
    );

    setParticipantList(participantList);
  }, [targetContest]);

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
    const sectorRecordList = targetParticipant.sectorRecordList || [];
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
    const driveRecordList = targetSectorRecord.driveRecordList || [];
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

  // set isContestTimerRunning when targetContest is updated
  useEffect(() => {
    if (targetContest.isContestTimerRunning) {
      setIsContestTimerRunning(true);
    } else {
      setIsContestTimerRunning(false);
    }
  }, [targetContest.isContestTimerRunning]);

  // set block status when isContestInProgress or isContestTimerRunning is updated
  useEffect(() => {
    if (!isContestInProgress && !isContestTimerRunning) {
      setIsContestBlocked(false);
      setIsParticipantBlocked(false);
      setIsSectorRecordBlocked(false);
      return;
    }

    setIsContestBlocked(true);
    setIsParticipantBlocked(true);
    setIsSectorRecordBlocked(true);
  }, [isContestInProgress, isContestTimerRunning]);

  return (
    <div className="manager">
      <div className="manager-col-1">
        <ContestManager
          setContestUpdateSignal={setUpdateSignal}
          contestList={contestList}
          targetContest={targetContest}
          setTargetContest={setTargetContest}
          isBlocked={isContestBlocked}
        />

        <OperationMenu
          setContestUpdateSignal={setUpdateSignal}
          targetContest={targetContest}
          targetParticipant={targetParticipant}
          targetSectorRecord={targetSectorRecord}
          isContestTimerRunning={isContestTimerRunning}
          isContestInProgress={isContestInProgress}
          setIsContestInProgress={setIsContestInProgress}
        />
      </div>

      <ParticipantManager
        setParticipantUpdateSignal={setUpdateSignal}
        participantList={participantList}
        targetParticipant={targetParticipant}
        setTargetParticipant={setTargetParticipant}
        isBlocked={isParticipantBlocked}
      />

      <SectorRecordManager
        setSectorRecordUpdateSignal={setUpdateSignal}
        targetSectorRecord={targetSectorRecord}
        setTargetSectorRecord={setTargetSectorRecord}
        sectorRecordList={sectorRecordList}
        isBlocked={isSectorRecordBlocked}
      />

      <DriveRecordManager
        setDriveRecordUpdateSignal={setUpdateSignal}
        targetDriveRecord={targetDriveRecord}
        setTargetDriveRecord={setTargetDriveRecord}
        driveRecordList={driveRecordList}
        targetSectorRecord={targetSectorRecord}
        isBlocked={isDriveRecordBlocked}
      />
    </div>
  );
}
