import { ContestType } from "model/Contest";
import { ContestController } from "controller/ContestController";

const contestController = new ContestController();

export default function ContestTimerStartBtn({
  targetContestId,
  isContestTimerRunning,
  setIsContestTimerRunning,
}: {
  targetContestId: string;
  isContestTimerRunning: boolean;
  setIsContestTimerRunning: Function;
}) {
  const updateContestTimerStartTime = (data: Partial<ContestType>) => {
    const func = async () => {
      console.log(await contestController.patchContest(data._id, data));
    };
    func();
  };

  return (
    <button
      type="button"
      className="btn btn-primary"
      onClick={() => {
        const curTime = Date.now();
        const data: Partial<ContestType> = { _id: targetContestId };

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
