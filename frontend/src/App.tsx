// import React from "react";
// import logo from "./logo.svg";
import "./App.css";

import { useState, useEffect } from "react";

import { ContestType } from "model/Contest";
import { ParticipantType } from "model/Participant";
import { ParticipantRecordType } from "model/ParticipantRecord";
import { DriveRecordType } from "model/DriveRecord";

import { ContestController } from "controller/ContestController";
import { ParticipantController } from "controller/ParticipantController";
import { ParticipantRecordController } from "controller/ParticipantRecordController";

import ContestManage from "component/contestManage/ContestManage";
import ParticipantManage from "component/participantManage/ParticipantManage";
import ParticipantRecordManage from "component/participantRecordManage/ParticipantRecordManage";
import DriveRecordManage from "component/driveRecordManage/DriveRecordManage";

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

  // set contestList when updateSignal is updated
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
    const participantList = targetContest.participantList || [];
    if (!isNotEmptyArray(participantList)) {
      setParticipantList([]);
      return;
    }

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

  // set participantRecordList when targetParticipant is updated
  useEffect(() => {
    const participantRecordList = targetParticipant.participantRecordList || [];
    if (!isNotEmptyArray(participantRecordList)) {
      setParticipantRecordList([]);
      return;
    }

    setParticipantRecordList(participantRecordList);
  }, [targetParticipant]);

  // set targetParticipantRecord when participantRecordList is updated
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
  }, [participantRecordList, targetParticipantRecord._id]);

  // set driveRecordList when targetParticipantRecord is updated
  useEffect(() => {
    const driveRecordList = targetParticipantRecord.driveRecordList || [];
    if (!isNotEmptyArray(driveRecordList)) {
      setDriveRecordList([]);
      return;
    }

    setDriveRecordList(driveRecordList);
  }, [targetParticipantRecord]);

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

  // console.log("contestList", contestList);
  // console.log("targetContest", targetContest);
  // console.log("participantList", participantList);
  // console.log("targetParticipant", targetParticipant);
  // console.log("participantRecordList", participantRecordList);
  // console.log("targetParticipantRecord", targetParticipantRecord);
  // console.log("driveRecordList", driveRecordList);
  // console.log("targetDriveRecord", targetDriveRecord);

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
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
            targetContest={targetContest}
          />

          <ParticipantRecordManage
            setParticipantRecordUpdateSignal={setUpdateSignal}
            targetParticipantRecord={targetParticipantRecord}
            setTargetParticipantRecord={setTargetParticipantRecord}
            participantRecordList={participantRecordList}
            targetParticipant={targetParticipant}
          />

          <DriveRecordManage
            setDriveRecordUpdateSignal={setUpdateSignal}
            targetDriveRecord={targetDriveRecord}
            setTargetDriveRecord={setTargetDriveRecord}
            driveRecordList={driveRecordList}
            targetParticipantRecord={targetParticipantRecord}
          />
        </div>
      </header>
    </div>
  );
}

export default App;
