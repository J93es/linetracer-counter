import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { useState, useEffect } from "react";

import Contest, { ContestType, contestTamplate } from "model/Contest";
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
import { ParticipantType } from "model/Participant";

const contestController = new ContestController();
const participantController = new ParticipantController();
const participantRecordController = new ParticipantRecordController();

function App() {
  const [contestList, setContestList] = useState<ContestType[]>([]);
  const [targetContestId, setTargetContestId] = useState<string>("");
  const [targetContest, setTargetContest] = useState<Partial<ContestType>>({});

  const [participantList, setParticipantList] = useState<ParticipantType[]>([]);
  const [targetParticipantId, setTargetParticipantId] = useState<string>("");
  const [targetParticipant, setTargetParticipant] = useState<
    Partial<ParticipantType>
  >({});

  const [participantRecordList, setParticipantRecordList] = useState<
    ParticipantRecordType[]
  >([]);
  const [targetParticipantRecordId, setTargetParticipantRecordId] =
    useState<string>("");
  const [targetParticipantRecord, setTargetParticipantRecord] = useState<
    Partial<ParticipantRecordType>
  >({});

  const [driveRecordList, setDriveRecordList] = useState<DriveRecordType[]>([]);
  const [targetDriveRecordId, setTargetDriveRecordId] = useState<string>("");
  const [targetDriveRecord, setTargetDriveRecord] = useState<
    Partial<DriveRecordType>
  >({});

  useEffect(() => {
    setTargetContestId("");
  }, [contestList]);

  useEffect(() => {
    if (!targetContestId) {
      setTargetContest({});
      setParticipantList([]);
      setTargetParticipantId("");
      return;
    }
    const func = async () => {
      const contest = await contestController.getContest(targetContestId);
      setTargetContest(contest);

      const participantList = await participantController.getParticipantIndex(
        targetContestId
      );
      setParticipantList(participantList as any);
      setTargetParticipantId(
        (participantList[0] && participantList[0]._id) || ""
      );
    };
    func();
  }, [targetContestId]);

  useEffect(() => {
    if (!targetParticipantId) {
      setTargetParticipant({});
      setParticipantRecordList([]);
      setTargetParticipantRecordId("");
      return;
    }
    const func = async () => {
      const participant = await participantController.getParticipant(
        targetParticipantId
      );
      setTargetParticipant(participant);

      const participantRecordList =
        await participantRecordController.getParticipantRecordIndex(
          targetParticipantId
        );
      setParticipantRecordList(participantRecordList as any);
      setTargetParticipantRecordId(
        (participantRecordList[0] && participantRecordList[0]._id) || ""
      );
    };
    func();
  }, [targetParticipantId]);

  useEffect(() => {
    if (!targetParticipantRecordId) {
      setTargetParticipantRecord({});
      setDriveRecordList([]);
      setTargetDriveRecordId("");
      return;
    }

    const func = async () => {
      const participantRecord =
        await participantRecordController.getParticipantRecord(
          targetParticipantRecordId
        );
      setTargetParticipantRecord(participantRecord);

      const driveRecordList = participantRecord.driveRecordList;
      setDriveRecordList(driveRecordList as any);
      setTargetDriveRecordId(
        (driveRecordList[0] && driveRecordList[0]._id) || ""
      );
    };
    func();
  }, [targetParticipantRecordId]);

  useEffect(() => {
    if (!targetDriveRecordId) {
      setTargetDriveRecord({});
      return;
    }

    const func = async () => {
      const driveRecord = driveRecordList.find(
        (driverecord: DriveRecordType) => {
          if (driverecord._id === targetDriveRecordId) return true;
          else return false;
        }
      );
      setTargetDriveRecord(driveRecord as any);
    };
    func();
  }, [targetDriveRecordId]);

  // console.log(targetContest, targetParticipant, participantRecordList);

  return (
    <div className="App">
      <header className="App-header">
        <button
          onClick={() => {
            const func = async () => {
              const contest = await contestController.getContestIndex();
              setContestList(contest);
            };
            func();
          }}
        >
          get contest list
        </button>

        <SelectId
          targetId={targetContestId}
          setTargetId={setTargetContestId}
          listOfObject={contestList}
          DistintionClass={ContestDistintion}
        />

        <SelectId
          targetId={targetParticipantId}
          setTargetId={setTargetParticipantId}
          listOfObject={participantList}
          DistintionClass={ParticipantDistinction}
        />

        <SelectId
          targetId={targetParticipantRecordId}
          setTargetId={setTargetParticipantRecordId}
          listOfObject={participantRecordList}
          DistintionClass={ParticipantRecordDistinction}
        />

        <SelectId
          targetId={targetDriveRecordId}
          setTargetId={setTargetDriveRecordId}
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
