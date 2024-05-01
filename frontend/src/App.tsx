import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { useState, useEffect } from "react";

import Contest, { ContestType, contestTamplate } from "model/Index/Contest";
import ParticipantRecord, {
  ParticipantRecordType,
} from "model/Index/ParticipantRecord";
import DriveRecord, { DriveRecordType } from "model/Index/DriveRecord";

import ContestDistintion from "model/Distinction/ContestDistinction";
import ParticipantDistinction from "model/Distinction/ParticipantDistinction";
import ParticipantRecordDistinction from "model/Distinction/ParticipantRecordDistinction";
import DriveRecordDistinction from "model/Distinction/DriveRecordDistinction";

import { ContestController } from "controller/ContestController";
import { ParticipantController } from "controller/ParticipantController";
import { ParticipantRecordController } from "controller/ParticipantRecordController";

import SelectId from "component/SelectId/SelectId";
import { ParticipantType } from "model/Index/Participant";

const contestController = new ContestController();
const participantController = new ParticipantController();
const participantRecordController = new ParticipantRecordController();

function App() {
  const [contestList, setContestList] = useState<ContestType[]>([]);
  const [curContestId, setCurContestId] = useState<string>("");
  const [curContest, setCurContest] = useState({});

  const [participantList, setParticipantList] = useState([]);
  const [curParticipantId, setCurParticipantId] = useState("");
  const [curParticipant, setCurParticipant] = useState({});

  const [participantRecordList, setParticipantRecordList] = useState([]);
  const [curParticipantRecordId, setCurParticipantRecordId] = useState("");
  const [curParticipantRecord, setCurParticipantRecord] = useState({});

  const [driveRecordList, setDriveRecordList] = useState([]);
  const [curDriveRecordId, setCurDriveRecordId] = useState("");
  const [curDriveRecord, setCurDriveRecord] = useState({});

  useEffect(() => {
    setCurContestId("");
  }, [contestList]);

  useEffect(() => {
    if (!curContestId) {
      setCurContest({});
      setParticipantList([]);
      setCurParticipantId("");
      return;
    }
    const func = async () => {
      const contest = await contestController.getContest(curContestId);
      setCurContest(contest);

      console.log(contest);

      const participantList = await participantController.getParticipantList(
        curContestId
      );
      setParticipantList(participantList as any);
      setCurParticipantId((participantList[0] && participantList[0]._id) || "");
    };
    func();
  }, [curContestId]);

  useEffect(() => {
    if (!curParticipantId) {
      setCurParticipant({});
      setParticipantRecordList([]);
      setCurParticipantRecordId("");
      return;
    }
    const func = async () => {
      const participant = await participantController.getParticipant(
        curParticipantId
      );
      setCurParticipant(participant);

      const participantRecordList =
        await participantRecordController.getParticipantRecordList(
          curParticipantId
        );
      setParticipantRecordList(participantRecordList as any);
      setCurParticipantRecordId(
        (participantRecordList[0] && participantRecordList[0]._id) || ""
      );
    };
    func();
  }, [curParticipantId]);

  useEffect(() => {
    if (!curParticipantRecordId) {
      setCurParticipantRecord({});
      setDriveRecordList([]);
      setCurDriveRecordId("");
      return;
    }

    const func = async () => {
      const participantRecord =
        await participantRecordController.getParticipantRecord(
          curParticipantRecordId
        );
      setCurParticipantRecord(participantRecord);

      const driveRecordList = participantRecord.driveRecordList;
      setDriveRecordList(driveRecordList as any);
      setCurDriveRecordId((driveRecordList[0] && driveRecordList[0]._id) || "");
    };
    func();
  }, [curParticipantRecordId]);

  useEffect(() => {
    if (!curDriveRecordId) {
      setCurDriveRecord({});
      return;
    }

    const func = async () => {
      const driveRecord = driveRecordList.find(
        (driverecord: DriveRecordType) => {
          if (driverecord._id === curDriveRecordId) return true;
          else return false;
        }
      );
      setCurDriveRecord(driveRecord as any);
    };
    func();
  }, [curDriveRecordId]);

  // console.log(curContest, curParticipant, participantRecordList);

  return (
    <div className="App">
      <header className="App-header">
        <button
          onClick={() => {
            const func = async () => {
              const contest = await contestController.getContestList();
              setContestList(contest);
            };
            func();
          }}
        >
          get contest list
        </button>

        <SelectId
          targetId={curContestId}
          setTargetId={setCurContestId}
          listOfObject={contestList}
          DistintionClass={ContestDistintion}
        />

        <SelectId
          targetId={curParticipantId}
          setTargetId={setCurParticipantId}
          listOfObject={participantList}
          DistintionClass={ParticipantDistinction}
        />

        <SelectId
          targetId={curParticipantRecordId}
          setTargetId={setCurParticipantRecordId}
          listOfObject={participantRecordList}
          DistintionClass={ParticipantRecordDistinction}
        />

        <SelectId
          targetId={curDriveRecordId}
          setTargetId={setCurDriveRecordId}
          listOfObject={driveRecordList}
          DistintionClass={DriveRecordDistinction}
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
