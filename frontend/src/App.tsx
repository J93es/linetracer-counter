import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { useState, useEffect } from "react";

import Contest, { ContestType, contestTamplate } from "model/Contest";
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

const contestController = new ContestController();
const participantController = new ParticipantController();
const participantRecordController = new ParticipantRecordController();

function _idInObject(_id: string, objectList: any[]): boolean {
  for (let object of objectList) {
    if (object._id === _id) return true;
  }
  return false;
}

function App() {
  const [contestUpdateSignal, setContestUpdateSignal] = useState<number>(0);
  const [contestList, setContestList] = useState<ContestType[]>([]);
  const [targetContestId, setTargetContestId] = useState<string>("");
  const [targetContest, setTargetContest] = useState<Partial<ContestType>>({});
  const [isContestTimerRunning, setIsContestTimerRunning] =
    useState<boolean>(false);

  const [participantUpdateSignal, setParticipantUpdateSignal] =
    useState<number>(0);
  const [participantList, setParticipantList] = useState<ParticipantType[]>([]);
  const [targetParticipantId, setTargetParticipantId] = useState<string>("");
  const [targetParticipant, setTargetParticipant] = useState<
    Partial<ParticipantType>
  >({});

  const [participantRecordUpdateSignal, setParticipantRecordUpdateSignal] =
    useState<number>(0);
  const [participantRecordList, setParticipantRecordList] = useState<
    ParticipantRecordType[]
  >([]);
  const [targetParticipantRecordId, setTargetParticipantRecordId] =
    useState<string>("");
  const [targetParticipantRecord, setTargetParticipantRecord] = useState<
    Partial<ParticipantRecordType>
  >({});

  const [driveRecordUpdateSignal, setDriveRecordUpdateSignal] =
    useState<number>(0);
  const [driveRecordList, setDriveRecordList] = useState<DriveRecordType[]>([]);
  const [targetDriveRecordId, setTargetDriveRecordId] = useState<string>("");
  const [targetDriveRecord, setTargetDriveRecord] = useState<
    Partial<DriveRecordType>
  >({});

  // drive record list is imbedded in participant record
  useEffect(() => {
    setParticipantRecordUpdateSignal((prev) => (prev + 1) % 1000);
  }, [driveRecordUpdateSignal]);

  // get contest index
  useEffect(() => {
    const func = async () => {
      const contest = await contestController.getContestIndex();

      setContestList(contest);
    };
    func();
  }, [contestUpdateSignal]);

  // set target contest id
  useEffect(() => {
    if (
      !(contestList?.length > 0) ||
      !contestList[contestList.length - 1]._id
    ) {
      setTargetContestId("");
      return;
    }

    if (_idInObject(targetContestId, contestList)) {
      return;
    }
    setTargetContestId(contestList[contestList.length - 1]._id);
  }, [contestList, contestUpdateSignal]);

  // get target contest
  useEffect(() => {
    if (!targetContestId) {
      setTargetContest({});
      return;
    }

    const func = async () => {
      const contest = await contestController.getContest(targetContestId);

      console.log(contest);

      setTargetContest(contest);
    };
    func();
  }, [targetContestId, contestUpdateSignal]);

  // get participant index
  useEffect(() => {
    if (!targetContest?._id) {
      setParticipantList([]);
      return;
    }

    const func = async () => {
      const participantList = await participantController.getParticipantIndex(
        targetContest._id
      );

      setParticipantList(participantList as any);
    };
    func();
  }, [targetContest, participantUpdateSignal]);

  // set target participant id
  useEffect(() => {
    if (!(participantList?.length > 0) || !participantList[0]._id) {
      setTargetParticipantId("");
      return;
    }

    if (_idInObject(targetParticipantId, participantList)) {
      return;
    }
    setTargetParticipantId(participantList[0]._id);
  }, [participantList, participantUpdateSignal]);

  // get target participant
  useEffect(() => {
    if (!targetParticipantId) {
      setTargetParticipant({});
      return;
    }

    const func = async () => {
      const participant = await participantController.getParticipant(
        targetParticipantId
      );

      setTargetParticipant(participant);
    };
    func();
  }, [targetParticipantId, participantUpdateSignal]);

  // get participant record index
  useEffect(() => {
    if (!targetParticipant?._id) {
      setParticipantRecordList([]);
      return;
    }

    const func = async () => {
      const participantRecordList =
        await participantRecordController.getParticipantRecordIndex(
          targetParticipant._id
        );

      setParticipantRecordList(participantRecordList as any);
    };
    func();
  }, [targetParticipant, participantRecordUpdateSignal]);

  // set target participant record id
  useEffect(() => {
    if (
      !(participantRecordList?.length > 0) ||
      !participantRecordList[participantRecordList.length - 1]._id
    ) {
      setTargetParticipantRecordId("");
      return;
    }

    if (_idInObject(targetParticipantRecordId, participantRecordList)) {
      return;
    }
    setTargetParticipantRecordId(
      participantRecordList[participantRecordList.length - 1]._id
    );
  }, [participantRecordList, participantRecordUpdateSignal]);

  // get target participant record
  useEffect(() => {
    if (!targetParticipantRecordId) {
      setTargetParticipantRecord({});
      return;
    }

    const func = async () => {
      const participantRecord =
        await participantRecordController.getParticipantRecord(
          targetParticipantRecordId
        );

      setTargetParticipantRecord(participantRecord as any);
    };
    func();
  }, [targetParticipantRecordId, participantRecordUpdateSignal]);

  // get drive record index
  useEffect(() => {
    if (!targetParticipantRecord?._id) {
      setDriveRecordList([]);
      return;
    }

    setDriveRecordList(targetParticipantRecord.driveRecordList as any);
  }, [targetParticipantRecord, driveRecordUpdateSignal]);

  // set target drive record id
  useEffect(() => {
    if (
      !(driveRecordList?.length > 0) ||
      !driveRecordList[driveRecordList.length - 1]._id
    ) {
      setTargetDriveRecordId("");
      return;
    }

    if (_idInObject(targetDriveRecordId, driveRecordList)) {
      setTargetDriveRecordId(targetDriveRecordId);
      return;
    }
    setTargetDriveRecordId(driveRecordList[driveRecordList.length - 1]._id);
  }, [driveRecordList, driveRecordUpdateSignal]);

  // get target drive record
  useEffect(() => {
    if (!targetDriveRecordId) {
      setTargetDriveRecord({});
      return;
    }

    const driveRecord = driveRecordList.find((driverecord: DriveRecordType) => {
      if (driverecord._id === targetDriveRecordId) return true;
      else return false;
    });
    setTargetDriveRecord(driveRecord as any);
  }, [targetDriveRecordId, driveRecordUpdateSignal]);

  // console.log("contestList", contestList);
  // console.log("targetContestId", targetContestId);
  // console.log("targetContest", targetContest);
  // console.log("participantList", participantList);
  // console.log("targetParticipantId", targetParticipantId);
  // console.log("targetParticipant", targetParticipant);
  // console.log("participantRecordList", participantRecordList);
  // console.log("targetParticipantRecordId", targetParticipantRecordId);
  // console.log("targetParticipantRecord", targetParticipantRecord);
  // console.log("driveRecordList", driveRecordList);
  // console.log("targetDriveRecordId", targetDriveRecordId);
  // console.log("targetDriveRecord", targetDriveRecord);

  return (
    <div className="App">
      <header
        className="App-header"
        style={{ maxWidth: "1000px", padding: "1px", boxSizing: "border-box" }}
      >
        <ContestManage
          setContestUpdateSignal={setContestUpdateSignal}
          contestList={contestList}
          targetContestId={targetContestId}
          setTargetContestId={setTargetContestId}
          targetContest={targetContest}
          isContestTimerRunning={isContestTimerRunning}
          setIsContestTimerRunning={setIsContestTimerRunning}
        />

        <ParticipantManage
          setParticipantUpdateSignal={setParticipantUpdateSignal}
          participantList={participantList}
          targetParticipantId={targetParticipantId}
          setTargetParticipantId={setTargetParticipantId}
          targetParticipant={targetParticipant}
          curContestId={targetContest._id}
        />

        <ParticipantRecordManage
          setParticipantRecordUpdateSignal={setParticipantRecordUpdateSignal}
          targetParticipantRecordId={targetParticipantRecordId}
          setTargetParticipantRecordId={setTargetParticipantRecordId}
          participantRecordList={participantRecordList}
        />

        <DriveRecordManage
          setDriveRecordUpdateSignal={setDriveRecordUpdateSignal}
          targetDriveRecordId={targetDriveRecordId}
          setTargetDriveRecordId={setTargetDriveRecordId}
          driveRecordList={driveRecordList}
        />
      </header>

      {/* <button
          onClick={() => {
            const func = async () => {
              const response = await postParticipant(
                "template.json",
                participant
              );
              console.log(response);
            };
            func();
          }}
        >
          Post
        </button> */}
    </div>
  );
}

export default App;
