import { useState, useEffect } from "react";
import { ContestType } from "pages/admin/model/Contest";
import { ParticipantType } from "pages/admin/model/Participant";
import { SectorRecordType } from "pages/admin/model/SectorRecord";
import { DriveRecordType } from "pages/admin/model/DriveRecord";
import { CounterDeviceLogType } from "pages/admin/model/CounterDeviceLog";

import ContestManager from "pages/admin/view/manager/contestManager/Index";
import ParticipantManager from "pages/admin/view/manager/participantManager/Index";
import SectorRecordManager from "pages/admin/view/manager/sectorRecordManager/Index";
import DriveRecordManager from "pages/admin/view/manager/driveRecordManager/Index";
import OperationMenu from "pages/admin/view/manager/operationMenu/Index";
import CounterDeviceLogManager from "pages/admin/view/manager/counterDeviceLogManager/Index";

import { filterParticipantList } from "pages/tools/filterTargetList";
import { sortParticipantListBySectorRecordField } from "pages/tools/sortTargetList";
import { findTargetById, isEmptyArray, isEmptyObject } from "pages/tools/utils";

import "pages/admin/view/manager/Index.css";

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
  setContestListRefreshSignal: React.Dispatch<React.SetStateAction<number>>;
  setUpdateSignal: React.Dispatch<React.SetStateAction<number>>;
  contestList: ContestType[] | undefined;
  targetContest: ContestType | undefined;
  setTargetContest: Function;
  isContestTimerRunning: boolean;
  setIsContestTimerRunning: Function;
  counterDeviceLogList: CounterDeviceLogType[] | undefined;
  setCounterDeviceLogListUpdateSignal: React.Dispatch<
    React.SetStateAction<number>
  >;
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
          targetSectorRecord={targetSectorRecord}
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
