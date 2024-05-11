// import React from "react";
// import logo from "./logo.svg";
import "./App.css";

import { useState, useEffect } from "react";

import { ContestType } from "model/Contest";

import { ContestController } from "controller/ContestController";

import Editer from "component/editer/Editer";
import Manager from "component/manager/Manager";

import { isEmptyArray } from "tools/utils";

const contestController = new ContestController();
function App() {
  const [updateSignal, setUpdateSignal] = useState<number>(0);

  const [contestList, setContestList] = useState<ContestType[]>([]);

  console.log("contestList", contestList);

  // set contestList when updateSignal is updated
  useEffect(() => {
    const func = async () => {
      const contestList = await contestController.getEvery();
      if (isEmptyArray(contestList)) {
        setContestList([]);
        return;
      }
      setContestList(contestList);
    };
    func();
  }, [updateSignal]);

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
        {/* <SelectContestSection
          setContestUpdateSignal={setUpdateSignal}
          targetContest={targetContest}
        />

        <ContestTimerStartBtn
          setContestUpdateSignal={setUpdateSignal}
          targetContest={targetContest}
          isContestTimerRunning={isContestTimerRunning}
          setIsContestTimerRunning={setIsContestTimerRunning}
        /> */}
        <Manager setUpdateSignal={setUpdateSignal} contestList={contestList} />
        <Editer setUpdateSignal={setUpdateSignal} contestList={contestList} />
      </header>
    </div>
  );
}

export default App;
