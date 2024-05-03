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

import ContestDistintion from "model/Distinction/ContestDistinction";
import ParticipantDistinction from "model/Distinction/ParticipantDistinction";
import ParticipantRecordDistinction from "model/Distinction/ParticipantRecordDistinction";
import DriveRecordDistinction from "model/Distinction/DriveRecordDistinction";

import { ContestController } from "controller/ContestController";
import { ParticipantController } from "controller/ParticipantController";
import { ParticipantRecordController } from "controller/ParticipantRecordController";

import SelectId from "component/SelectId/SelectId";
import ContestManage from "component/ContestManage";
import ParticipantManage from "component/ParticipantManage";
import ParticipantRecordManage from "component/ParticipantRecordManage";
import DriveRecordManage from "component/DriveRecordManage";

const contestController = new ContestController();
const participantController = new ParticipantController();
const participantRecordController = new ParticipantRecordController();

function App() {
  const [contestListGetSignal, setContestListGetSignal] = useState<number>(0);
  const [contestList, setContestList] = useState<ContestType[]>([]);
  const [targetContestId, setTargetContestId] = useState<string>("");
  const [targetContest, setTargetContest] = useState<Partial<ContestType>>({});

  const [participantListGetSignal, setParticipantListGetSignal] =
    useState<number>(0);
  const [participantList, setParticipantList] = useState<ParticipantType[]>([]);
  const [targetParticipantId, setTargetParticipantId] = useState<string>("");
  const [targetParticipant, setTargetParticipant] = useState<
    Partial<ParticipantType>
  >({});

  const [participantRecordListGetSignal, setParticipantRecordListGetSignal] =
    useState<number>(0);
  const [participantRecordList, setParticipantRecordList] = useState<
    ParticipantRecordType[]
  >([]);
  const [targetParticipantRecordId, setTargetParticipantRecordId] =
    useState<string>("");
  const [targetParticipantRecord, setTargetParticipantRecord] = useState<
    Partial<ParticipantRecordType>
  >({});

  const [driveRecordListGetSignal, setDriveRecordListGetSignal] =
    useState<number>(0);
  const [driveRecordList, setDriveRecordList] = useState<DriveRecordType[]>([]);
  const [targetDriveRecordId, setTargetDriveRecordId] = useState<string>("");
  const [targetDriveRecord, setTargetDriveRecord] = useState<
    Partial<DriveRecordType>
  >({});

  // drive record list is imbedded in participant record
  useEffect(() => {
    setParticipantRecordListGetSignal((prev) => (prev + 1) % 1000);
  }, [driveRecordListGetSignal]);

  // get contest index
  useEffect(() => {
    const func = async () => {
      const contest = await contestController.getContestIndex();
      setContestList(contest);
    };
    func();
  }, [contestListGetSignal]);

  // set target contest id
  useEffect(() => {
    if (
      !(contestList?.length > 0) ||
      !contestList[contestList.length - 1]._id
    ) {
      setTargetContestId("");
      return;
    }

    setTargetContestId(contestList[contestList.length - 1]._id);
  }, [contestList]);

  // get target contest
  useEffect(() => {
    if (!targetContestId) {
      setTargetContest({});
      return;
    }

    const func = async () => {
      const contest = await contestController.getContest(targetContestId);

      setTargetContest(contest);
    };
    func();
  }, [targetContestId]);

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
  }, [targetContest, participantListGetSignal]);

  // set target participant id
  useEffect(() => {
    if (!(participantList?.length > 0) || !participantList[0]._id) {
      setTargetParticipantId("");
      return;
    }

    setTargetParticipantId(participantList[0]._id);
  }, [participantList]);

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
  }, [targetParticipantId]);

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
  }, [targetParticipant, participantRecordListGetSignal]);

  // set target participant record id
  useEffect(() => {
    if (
      !(participantRecordList?.length > 0) ||
      !participantRecordList[participantRecordList.length - 1]._id
    ) {
      setTargetParticipantRecordId("");
      return;
    }

    setTargetParticipantRecordId(
      participantRecordList[participantRecordList.length - 1]._id
    );
  }, [participantRecordList]);

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
  }, [targetParticipantRecordId]);

  // get drive record index
  useEffect(() => {
    if (!targetParticipantRecord?._id) {
      setDriveRecordList([]);
      return;
    }

    setDriveRecordList(targetParticipantRecord.driveRecordList as any);
  }, [targetParticipantRecord]);

  // set target drive record id
  useEffect(() => {
    if (
      !(driveRecordList?.length > 0) ||
      !driveRecordList[driveRecordList.length - 1]._id
    ) {
      setTargetDriveRecordId("");
      return;
    }

    setTargetDriveRecordId(driveRecordList[driveRecordList.length - 1]._id);
  }, [driveRecordList]);

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
  }, [targetDriveRecordId]);

  return (
    <div className="App">
      <header className="App-header">
        <ContestManage
          setContestListGetSignal={setContestListGetSignal}
          targetContestId={targetContestId}
          setTargetContestId={setTargetContestId}
          contestList={contestList}
        />

        <ParticipantManage
          setParticipantListGetSignal={setParticipantListGetSignal}
          targetParticipantId={targetParticipantId}
          setTargetParticipantId={setTargetParticipantId}
          participantList={participantList}
        />

        <ParticipantRecordManage
          setParticipantRecordListGetSignal={setParticipantRecordListGetSignal}
          targetParticipantRecordId={targetParticipantRecordId}
          setTargetParticipantRecordId={setTargetParticipantRecordId}
          participantRecordList={participantRecordList}
        />

        <DriveRecordManage
          setDriveRecordListGetSignal={setDriveRecordListGetSignal}
          targetDriveRecordId={targetDriveRecordId}
          setTargetDriveRecordId={setTargetDriveRecordId}
          driveRecordList={driveRecordList}
        />

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
      </header>
    </div>
  );
}

export default App;
