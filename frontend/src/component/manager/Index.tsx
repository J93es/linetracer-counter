import { useState, useEffect } from "react";
import { ContestType } from "model/Contest";
import { ParticipantType } from "model/Participant";
import { SectorRecordType } from "model/SectorRecord";
import { DriveRecordType } from "model/DriveRecord";
import { CounterDeviceLogType } from "model/CounterDeviceLog";

import ContestManager from "component/manager/contestManager/Index";
import ParticipantManager from "component/manager/participantManager/Index";
import SectorRecordManager from "component/manager/sectorRecordManager/Index";
import DriveRecordManager from "component/manager/driveRecordManager/Index";
import OperationMenu from "component/manager/operationMenu/Index";
import CounterDeviceLogManager from "component/manager/counterDeviceLogManager/Index";

import { filterParticipantList } from "tools/filterTargetList";
import { sortParticipantListBySectorRecordField } from "tools/sortTargetList";
import { findTargetById, isEmptyArray, isEmptyObject } from "tools/utils";

import "component/manager/Index.css";

export default function Manager({
  setContestListRefreshSignal,
  setUpdateSignal,
  contestList,
  targetContest,
  setTargetContest,
  isContestTimerRunning,
  setIsContestTimerRunning,
  counterDeviceLogList,
  setCounterDeviceLogListUpdateSignal,
}: {
  setContestListRefreshSignal: Function;
  setUpdateSignal: Function;
  contestList: ContestType[] | undefined;
  targetContest: ContestType | undefined;
  setTargetContest: Function;
  isContestTimerRunning: boolean;
  setIsContestTimerRunning: Function;
  counterDeviceLogList: CounterDeviceLogType[] | undefined;
  setCounterDeviceLogListUpdateSignal: Function;
}) {
  const [isSectorRecordLaunched, setIsSectorRecordLaunched] =
    useState<boolean>(false);

  const [isContestBlocked, setIsContestBlocked] = useState<boolean>(false);

  const [isParticipantBlocked, setIsParticipantBlocked] =
    useState<boolean>(false);
  const [participantList, setParticipantList] = useState<ParticipantType[]>();
  const [targetParticipant, setTargetParticipant] = useState<ParticipantType>();

  const [isSectorRecordBlocked, setIsSectorRecordBlocked] =
    useState<boolean>(false);
  const [sectorRecordList, setSectorRecordList] =
    useState<SectorRecordType[]>();
  const [targetSectorRecord, setTargetSectorRecord] =
    useState<SectorRecordType>();

  const [isDriveRecordBlocked] = useState<boolean>(false);
  const [driveRecordList, setDriveRecordList] = useState<DriveRecordType[]>();
  const [targetDriveRecord, setTargetDriveRecord] = useState<DriveRecordType>();

  // set participantList when targetContest is updated
  useEffect(() => {
    let participantList: ParticipantType[] | undefined =
      targetContest?.participantList;
    if (!participantList || isEmptyArray(participantList)) {
      setParticipantList(undefined);
      return;
    }

    // curSector에 해당하는 참가자 목록, 부문 기록 만을 추출.
    participantList = filterParticipantList(participantList, {
      sectorRecordBy: "contestSector",
      sectorRecordValue: targetContest?.curContestingSection,
    });
    participantList = sortParticipantListBySectorRecordField(
      "order",
      participantList,
      { driveRecordBy: "writeTime" }
    );

    setParticipantList(participantList);
  }, [targetContest]);

  // set targetParticipant when participantList is updated
  useEffect(() => {
    if (!participantList || isEmptyArray(participantList)) {
      setTargetParticipant(undefined);
      return;
    }

    let participant = findTargetById(targetParticipant?.id, participantList);
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

  // set isSectorRecordLaunched when targetSectorRecord is updated
  useEffect(() => {
    if (!targetSectorRecord || isEmptyObject(targetSectorRecord)) {
      setIsSectorRecordLaunched(false);
      return;
    }
    if (targetSectorRecord.sectorState === "running") {
      setIsSectorRecordLaunched(true);
      return;
    }
    setIsSectorRecordLaunched(false);
  }, [targetSectorRecord, setIsSectorRecordLaunched]);

  // set block status when isSectorRecordLaunched or isContestTimerRunning is updated
  useEffect(() => {
    if (isSectorRecordLaunched || isContestTimerRunning) {
      setIsContestBlocked(true);
      setIsParticipantBlocked(true);
      setIsSectorRecordBlocked(true);
      return;
    }
    setIsContestBlocked(false);
    setIsParticipantBlocked(false);
    setIsSectorRecordBlocked(false);
  }, [isSectorRecordLaunched, isContestTimerRunning]);

  return (
    <div className="manager">
      <div className="manager-col-1">
        <ContestManager
          setContestListRefreshSignal={setContestListRefreshSignal}
          contestList={contestList}
          targetContest={targetContest}
          setTargetContest={setTargetContest}
          isBlocked={isContestBlocked}
        />

        <OperationMenu
          setContestUpdateSignal={setUpdateSignal}
          targetContest={targetContest}
          targetSectorRecord={targetSectorRecord}
          isContestTimerRunning={isContestTimerRunning}
          isSectorRecordLaunched={isSectorRecordLaunched}
          setIsContestTimerRunning={setIsContestTimerRunning}
          setIsSectorRecordLaunched={setIsSectorRecordLaunched}
        />
      </div>

      <div>
        <ParticipantManager
          setParticipantUpdateSignal={setUpdateSignal}
          participantList={participantList}
          targetParticipant={targetParticipant}
          setTargetParticipant={setTargetParticipant}
          isBlocked={isParticipantBlocked}
        />

        <CounterDeviceLogManager
          counterDeviceLogList={counterDeviceLogList}
          setContestUpdateSignal={setContestListRefreshSignal}
          setCounterDeviceLogListUpdateSignal={
            setCounterDeviceLogListUpdateSignal
          }
          isBlocked={isDriveRecordBlocked}
          hostId={targetContest?.id}
        />
      </div>

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
        isBlocked={isDriveRecordBlocked}
      />
    </div>
  );
}
