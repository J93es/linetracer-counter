import "./App.css";

import { useState, useEffect } from "react";

import { ContestType } from "model/Contest";

import { ContestController } from "controller/ContestController";

import Editer from "component/editer/Index";
import Manager from "component/manager/Index";
import Display from "component/display/Index";

import { isEmptyArray, isEmptyObject } from "tools/utils";

const contestController = new ContestController();
function App() {
  const [contestListRefreshSignal, setContestListRefreshSignal] =
    useState<number>(0);
  const [editerUpdateSignal, setEditerUpdateSignal] = useState<number>(0);
  const [managerUpdateSignal, setManagerUpdateSignal] = useState<number>(0);

  const [contestList, setContestList] = useState<ContestType[] | undefined>();

  const [editerTargetContest, setEditerTargetContest] = useState<
    ContestType | undefined
  >();
  const [managerTargetContest, setManagerTargetContest] = useState<
    ContestType | undefined
  >();

  const [isContestTimerRunning, setIsContestTimerRunning] =
    useState<boolean>(false);

  // set contestList when contestListRefreshSignal is updated
  useEffect(() => {
    const func = async () => {
      const contestList = await contestController.getEvery();
      if (!contestList || isEmptyArray(contestList)) {
        setContestList(undefined);
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
      const contest = await contestController.get(editerTargetContest?.id);
      if (!contest || isEmptyObject(contest)) {
        setEditerTargetContest(undefined);
        return;
      }

      if (contest.id === managerTargetContest?.id) {
        setManagerTargetContest(JSON.parse(JSON.stringify(contest)));
      }
      setEditerTargetContest(contest);
    };
    func();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editerUpdateSignal, editerTargetContest?.id]);

  // set targetContest when managerUpdateSignal, id is updated
  useEffect(() => {
    const func = async () => {
      const contest = await contestController.get(managerTargetContest?.id);
      if (!contest || isEmptyObject(contest)) {
        setEditerTargetContest(undefined);
        return;
      }
      if (editerTargetContest?.id === contest.id) {
        setEditerTargetContest(JSON.parse(JSON.stringify(contest)));
      }
      setManagerTargetContest(contest);
    };
    func();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [managerUpdateSignal, managerTargetContest?.id]);

  // set isContestTimerRunning when targetContest is updated
  useEffect(() => {
    if (managerTargetContest?.isContestTimerRunning) {
      setIsContestTimerRunning(true);
      return;
    }
    setIsContestTimerRunning(false);
  }, [managerTargetContest]);

  return (
    <div className="App">
      <header className="App-header">
        <Display
          targetContest={managerTargetContest}
          isContestTimerRunning={isContestTimerRunning}
        />
        <Manager
          setContestListRefreshSignal={setContestListRefreshSignal}
          setUpdateSignal={setManagerUpdateSignal}
          contestList={contestList}
          targetContest={managerTargetContest}
          setTargetContest={setManagerTargetContest}
          isContestTimerRunning={isContestTimerRunning}
          setIsContestTimerRunning={setIsContestTimerRunning}
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
