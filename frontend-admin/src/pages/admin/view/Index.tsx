import Editer from "pages/admin/view/editer/Index";
import Manager from "pages/admin/view/manager/Index";
import { ContestType } from "pages/admin/model/Contest";
import { CounterDeviceLogType } from "pages/admin/model/CounterDeviceLog";

import "pages/admin/view/Index.css";

export default function View({
  setContestListRefreshSignal,
  setManagerUpdateSignal,
  setEditerUpdateSignal,
  contestList,
  managerTargetContest,
  setManagerTargetContest,
  editerTargetContest,
  setEditerTargetContest,
  isContestTimerRunning,
  setIsContestTimerRunning,
  counterDeviceLogList,
  setCounterDeviceLogListUpdateSignal,
}: {
  setContestListRefreshSignal: React.Dispatch<React.SetStateAction<number>>;
  setManagerUpdateSignal: React.Dispatch<React.SetStateAction<number>>;
  setEditerUpdateSignal: React.Dispatch<React.SetStateAction<number>>;
  contestList: ContestType[] | undefined;
  managerTargetContest: ContestType | undefined;
  setManagerTargetContest: Function;
  editerTargetContest: ContestType | undefined;
  setEditerTargetContest: Function;
  isContestTimerRunning: boolean;
  setIsContestTimerRunning: React.Dispatch<React.SetStateAction<boolean>>;
  counterDeviceLogList: CounterDeviceLogType[] | undefined;
  setCounterDeviceLogListUpdateSignal: React.Dispatch<
    React.SetStateAction<number>
  >;
}) {
  return (
    <div className="App">
      <header className="App-header">
        <Manager
          setContestListRefreshSignal={setContestListRefreshSignal}
          setUpdateSignal={setManagerUpdateSignal}
          contestList={contestList}
          targetContest={managerTargetContest}
          setTargetContest={setManagerTargetContest}
          isContestTimerRunning={isContestTimerRunning}
          setIsContestTimerRunning={setIsContestTimerRunning}
          counterDeviceLogList={counterDeviceLogList}
          setCounterDeviceLogListUpdateSignal={
            setCounterDeviceLogListUpdateSignal
          }
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
