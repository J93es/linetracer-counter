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

import { timerStopValue } from "model/Contest";

import { isEmptyArray, isEmptyObject, findTargetBy_id } from "tools/utils";

import "component/manager/Manager.css";

export default function Manager({
  setUpdateSignal,
  contestList,
}: {
  setUpdateSignal: Function;
  contestList: Partial<ContestType>[];
}) {
  const [isContestTimerRunning, setIsContestTimerRunning] =
    useState<boolean>(false);

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
    if (isEmptyArray(contestList)) {
      setTargetContest({});
      return;
    }

    let contest = findTargetBy_id(targetContest._id, contestList);
    if (isEmptyObject(contest)) {
      setTargetContest(contestList[contestList.length - 1]);
      return;
    }
    if (contest.contestTimerStartTime === timerStopValue) {
      setIsContestTimerRunning(false);
    } else {
      setIsContestTimerRunning(true);
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

  return (
    <div className="manager">
      <div className="manager-col-1">
        <ContestManager
          setContestUpdateSignal={setUpdateSignal}
          contestList={contestList}
          targetContest={targetContest}
          setTargetContest={setTargetContest}
          isContestTimerRunning={isContestTimerRunning}
        />

        <OperationMenu
          setContestUpdateSignal={setUpdateSignal}
          targetContest={targetContest}
          targetSectorRecord={targetSectorRecord}
          isContestTimerRunning={isContestTimerRunning}
        />
      </div>

      <ParticipantManager
        setParticipantUpdateSignal={setUpdateSignal}
        participantList={participantList}
        targetParticipant={targetParticipant}
        setTargetParticipant={setTargetParticipant}
        isContestTimerRunning={isContestTimerRunning}
      />

      <SectorRecordManager
        setSectorRecordUpdateSignal={setUpdateSignal}
        targetSectorRecord={targetSectorRecord}
        setTargetSectorRecord={setTargetSectorRecord}
        sectorRecordList={sectorRecordList}
        isContestTimerRunning={isContestTimerRunning}
      />

      <DriveRecordManager
        setDriveRecordUpdateSignal={setUpdateSignal}
        targetDriveRecord={targetDriveRecord}
        setTargetDriveRecord={setTargetDriveRecord}
        driveRecordList={driveRecordList}
        targetSectorRecord={targetSectorRecord}
      />
    </div>
  );
}
