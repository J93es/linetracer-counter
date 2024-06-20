import { useState, useEffect } from "react";

import { ContestType } from "pages/admin/model/Contest";
import { CounterDeviceLogType } from "pages/admin/model/CounterDeviceLog";

import { ContestController } from "pages/admin/controller/fetch/ContestController";
import { CounterDeviceLogController } from "pages/admin/controller/fetch/CounterDeviceLogController";

import View from "pages/admin/view/Index";

import { isEmptyArray } from "pages/tools/utils";
import { sortTarget } from "pages/tools/sortTargetList";

const contestController = new ContestController();
const counterDeviceLogController = new CounterDeviceLogController();

export default function Admin() {
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

  const [
    counterDeviceLogListUpdateSignal,
    setCounterDeviceLogListUpdateSignal,
  ] = useState<number>(0);
  const [counterDeviceLogList, setCounterDeviceLogList] = useState<
    CounterDeviceLogType[] | undefined
  >();

  // set contestList when contestListRefreshSignal is updated
  useEffect(() => {
    const func = async () => {
      const contestList = await contestController.getEvery();
      setContestList(contestList);
      if (contestList && !isEmptyArray(contestList)) {
        setEditerTargetContest(contestList[contestList.length - 1]);
        setManagerTargetContest(contestList[contestList.length - 1]);
      }
    };
    func();
  }, [contestListRefreshSignal]);

  // set targetContest when updateSignal, id is updated
  useEffect(() => {
    const func = async () => {
      const contest = await contestController.get(editerTargetContest?.id);
      if (contest && contest.id === managerTargetContest?.id) {
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
      const [contest, counterDeviceLogList] = await Promise.all([
        await contestController.get(managerTargetContest?.id),
        await counterDeviceLogController.getEvery(managerTargetContest?.id),
      ]);
      if (contest && contest.id === editerTargetContest?.id) {
        setEditerTargetContest(JSON.parse(JSON.stringify(contest)));
      }
      setManagerTargetContest(contest);
      setCounterDeviceLogList(counterDeviceLogList);
    };
    func();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [managerUpdateSignal, managerTargetContest?.id]);

  // fetch counterDeviceLogList
  useEffect(() => {
    const func = async () => {
      const counterDeviceLogList: CounterDeviceLogType[] | undefined =
        await counterDeviceLogController.getEvery(managerTargetContest?.id);
      const sordted = sortTarget(counterDeviceLogList ?? [], "writeTime");
      setCounterDeviceLogList(sordted);
    };
    func();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counterDeviceLogListUpdateSignal]);

  // set isContestTimerRunning when targetContest is updated
  useEffect(() => {
    if (managerTargetContest?.isContestTimerRunning) {
      setIsContestTimerRunning(true);
      return;
    }
    setIsContestTimerRunning(false);
  }, [managerTargetContest]);

  return (
    <View
      setContestListRefreshSignal={setContestListRefreshSignal}
      setManagerUpdateSignal={setManagerUpdateSignal}
      setEditerUpdateSignal={setEditerUpdateSignal}
      contestList={contestList}
      managerTargetContest={managerTargetContest}
      setManagerTargetContest={setManagerTargetContest}
      editerTargetContest={editerTargetContest}
      setEditerTargetContest={setEditerTargetContest}
      isContestTimerRunning={isContestTimerRunning}
      setIsContestTimerRunning={setIsContestTimerRunning}
      counterDeviceLogList={counterDeviceLogList}
      setCounterDeviceLogListUpdateSignal={setCounterDeviceLogListUpdateSignal}
    />
  );
}
