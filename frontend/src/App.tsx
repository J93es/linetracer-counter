import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { useState, useEffect } from "react";

import Contest, { ContestType } from "model/Contest";
import Participant, { ParticipantType } from "model/Participant";
import ParticipantRecord, {
  ParticipantRecordType,
} from "model/ParticipantRecord";
import DriveRecord, { DriveRecordType } from "model/DriveRecord";

import { ContestController } from "controller/ContestController";
import { ParticipantController } from "controller/ParticipantController";
import { ParticipantRecordController } from "controller/ParticipantRecordController";

import ContestManage from "component/contestManage/ContestManage";
import ParticipantManage from "component/participantManage/ParticipantManage";
import ParticipantRecordManage from "component/ParticipantRecordManage";
import DriveRecordManage from "component/DriveRecordManage";

import {
  isNotEmptyArray,
  isNotEmptyObject,
  findTargetBy_id,
} from "tools/utils";

const contestController = new ContestController();
const participantController = new ParticipantController();
const participantRecordController = new ParticipantRecordController();

function App() {
  const [updateSignal, setUpdateSignal] = useState<number>(0);

  const [isContestTimerRunning, setIsContestTimerRunning] =
    useState<boolean>(false);

  const [contestList, setContestList] = useState<ContestType[]>([]);
  const [targetContest, setTargetContest] = useState<Partial<ContestType>>({});

  const [participantList, setParticipantList] = useState<ParticipantType[]>([]);
  const [targetParticipant, setTargetParticipant] = useState<
    Partial<ParticipantType>
  >({});

  const [participantRecordList, setParticipantRecordList] = useState<
    ParticipantRecordType[]
  >([]);
  const [targetParticipantRecord, setTargetParticipantRecord] = useState<
    Partial<ParticipantRecordType>
  >({});

  const [driveRecordList, setDriveRecordList] = useState<DriveRecordType[]>([]);
  const [targetDriveRecord, setTargetDriveRecord] = useState<
    Partial<DriveRecordType>
  >({});

  useEffect(() => {
    const func = async () => {
      const contestList = await contestController.getEveryContest();
      if (!isNotEmptyArray(contestList)) {
        setContestList([]);
        return;
      }
      setContestList(contestList);
    };
    func();
  }, [updateSignal]);

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
  }, [contestList]);

  useEffect(() => {
    const participantList = targetContest.participantList || [];
    if (!isNotEmptyArray(participantList)) {
      setParticipantList([]);
      return;
    }

    setParticipantList(participantList);
  }, [targetContest]);

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
  }, [participantList]);

  useEffect(() => {
    const participantRecordList = targetParticipant.participantRecordList || [];
    if (!isNotEmptyArray(participantRecordList)) {
      setParticipantRecordList([]);
      return;
    }

    setParticipantRecordList(participantRecordList);
  }, [targetParticipant]);

  useEffect(() => {
    if (!isNotEmptyArray(participantRecordList)) {
      setTargetParticipantRecord({});
      return;
    }

    let participantRecord = findTargetBy_id(
      targetParticipantRecord._id,
      participantRecordList
    );
    if (!isNotEmptyObject(participantRecord)) {
      setTargetParticipantRecord(
        participantRecordList[participantRecordList.length - 1]
      );
      return;
    }
    setTargetParticipantRecord(participantRecord);
  }, [participantRecordList]);

  useEffect(() => {
    const driveRecordList = targetParticipantRecord.driveRecordList || [];
    if (!isNotEmptyArray(driveRecordList)) {
      setDriveRecordList([]);
      return;
    }

    setDriveRecordList(driveRecordList);
  }, [targetParticipantRecord]);

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
  }, [driveRecordList]);

  // console.log("contestList", contestList);
  console.log("targetContest", targetContest);
  // console.log("participantList", participantList);
  console.log("targetParticipant", targetParticipant);
  // console.log("participantRecordList", participantRecordList);
  // console.log("targetParticipantRecord", targetParticipantRecord);
  // console.log("driveRecordList", driveRecordList);
  // console.log("targetDriveRecord", targetDriveRecord);

  return (
    <div className="App">
      <header
        className="App-header"
        style={{ maxWidth: "1000px", padding: "1px", boxSizing: "border-box" }}
      >
        <ContestManage
          setContestUpdateSignal={setUpdateSignal}
          contestList={contestList}
          targetContest={targetContest}
          setTargetContest={setTargetContest}
          isContestTimerRunning={isContestTimerRunning}
          setIsContestTimerRunning={setIsContestTimerRunning}
        />

        <ParticipantManage
          setParticipantUpdateSignal={setUpdateSignal}
          participantList={participantList}
          targetParticipant={targetParticipant}
          setTargetParticipant={setTargetParticipant}
          curContestId={targetContest._id}
        />

        <ParticipantRecordManage
          setParticipantRecordUpdateSignal={setUpdateSignal}
          targetParticipantRecord={targetParticipantRecord}
          setTargetParticipantRecord={setTargetParticipantRecord}
          participantRecordList={participantRecordList}
        />

        <DriveRecordManage
          setDriveRecordUpdateSignal={setUpdateSignal}
          targetDriveRecord={targetDriveRecord}
          setTargetDriveRecord={setTargetDriveRecord}
          driveRecordList={driveRecordList}
        />
      </header>
    </div>
  );
}

export default App;
