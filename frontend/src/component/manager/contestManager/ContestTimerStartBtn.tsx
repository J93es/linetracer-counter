import { ContestType } from "model/Contest";
import { ContestController } from "controller/ContestController";

const contestController = new ContestController();

export default function ContestTimerStartBtn({
  setContestUpdateSignal,
  targetContest,
  isContestTimerRunning,
  setIsContestTimerRunning,
}: {
  setContestUpdateSignal: Function;
  targetContest: Partial<ContestType>;
  isContestTimerRunning: boolean;
  setIsContestTimerRunning: Function;
}) {
  const updateContestTimerStartTime = (data: Partial<ContestType>) => {
    const func = async () => {
      await contestController.patchContest(data._id, data);
      setContestUpdateSignal((prev: number) => (prev + 1) % 1000);
    };
    func();
  };

  return (
    <button
      type="button"
      className="btn btn-primary"
      onClick={() => {
        const curTime = Date.now();
        const data: Partial<ContestType> = { _id: targetContest._id };

        // timer running => stop
        if (isContestTimerRunning) {
          data.contestTimerStartTime = -1;
        }
        // timer stop => running
        else {
          data.contestTimerStartTime = curTime;
        }
        updateContestTimerStartTime(data);
        setIsContestTimerRunning((prev: boolean) => !prev);
      }}
    >
      {isContestTimerRunning ? "경연 타이머 동작중" : "경연 타이머 시작"}
    </button>
  );
}
