// import React from "react";
// import logo from "./logo.svg";
import "./App.css";

import { useState, useEffect } from "react";

import { ContestType } from "model/Contest";

import { ContestController } from "controller/ContestController";

import Editer from "component/editer/Index";
import Manager from "component/manager/Index";
import ContestTimer from "component/timer/ContestTimer";

import { isEmptyArray, isEmptyObject } from "tools/utils";

const contestController = new ContestController();
function App() {
  const [contestListRefreshSignal, setContestListRefreshSignal] =
    useState<number>(0);
  const [editerUpdateSignal, setEditerUpdateSignal] = useState<number>(0);
  const [managerUpdateSignal, setManagerUpdateSignal] = useState<number>(0);

  const [contestList, setContestList] = useState<Partial<ContestType>[]>([]);

  const [editerTargetContest, setEditerTargetContest] = useState<
    Partial<ContestType>
  >({});
  const [managerTargetContest, setManagerTargetContest] = useState<
    Partial<ContestType>
  >({});

  // set contestList when contestListRefreshSignal is updated
  useEffect(() => {
    const func = async () => {
      const contestList = await contestController.getEvery();
      if (isEmptyArray(contestList)) {
        setContestList([]);
        return;
      }
      setContestList(contestList);
      setEditerTargetContest(contestList[contestList.length - 1]);
      setManagerTargetContest(contestList[contestList.length - 1]);
    };
    func();
  }, [contestListRefreshSignal]);

  // set targetContest when updateSignal, id is updated
  useEffect(() => {
    const func = async () => {
      const contest = await contestController.get(editerTargetContest._id);
      if (isEmptyObject(contest)) {
        setEditerTargetContest({});
        return;
      }

      if (editerTargetContest._id === managerTargetContest._id) {
        setManagerTargetContest(JSON.parse(JSON.stringify(contest)));
      }
      setEditerTargetContest(contest);
    };
    func();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editerUpdateSignal, editerTargetContest._id]);

  // set targetContest when managerUpdateSignal, id is updated
  useEffect(() => {
    const func = async () => {
      const contest = await contestController.get(managerTargetContest._id);
      if (isEmptyObject(contest)) {
        setEditerTargetContest({});
        return;
      }
      if (editerTargetContest._id === managerTargetContest._id) {
        setEditerTargetContest(JSON.parse(JSON.stringify(contest)));
      }
      setManagerTargetContest(contest);
    };
    func();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [managerUpdateSignal, managerTargetContest._id]);

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
        <ContestTimer targetContest={managerTargetContest} />
        <Manager
          setContestListRefreshSignal={setContestListRefreshSignal}
          setUpdateSignal={setManagerUpdateSignal}
          contestList={contestList}
          targetContest={managerTargetContest}
          setTargetContest={setManagerTargetContest}
        />
        <Editer
          setContestListRefreshSignal={setContestListRefreshSignal}
          setUpdateSignal={setEditerUpdateSignal}
          contestList={contestList}
          targetContest={editerTargetContest}
          setTargetContest={setEditerTargetContest}
        />
      </header>
    </div>
  );
}

export default App;
