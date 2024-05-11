import { ContestType } from "model/Contest";
import { SectorRecordType } from "model/SectorRecord";
import { ContestController } from "controller/ContestController";
import { SectorRecordController } from "controller/SectorRecordController";

import { getRemainingTime } from "tools/getRemainingTime";

const contestController = new ContestController();
const sectorRecordController = new SectorRecordController();

export default function ContestTimerBtn({
  setContestUpdateSignal,
  targetContest,
  targetSectorRecord,
  isContestTimerRunning,
  disabled,
}: {
  setContestUpdateSignal: Function;
  targetContest: Partial<ContestType>;
  targetSectorRecord: Partial<SectorRecordType>;
  isContestTimerRunning: boolean;
  disabled: boolean;
}) {
  const contestTimerStart = (curTime: number) => {
    const func = async () => {
      const contest: Partial<ContestType> = {
        _id: targetContest._id,
        curParticipnatId: targetSectorRecord.hostId,
        curSectorRecordId: targetSectorRecord._id,

        contestTimerStartTime: curTime,
        isContestTimerRunning: true,
      };
      const sectorRecord: Partial<SectorRecordType> = {
        _id: targetSectorRecord._id,
        hostId: targetSectorRecord.hostId,
        sectorState: "running",
      };

      await contestController.patch(contest._id, contest);
      await sectorRecordController.patch(sectorRecord._id, sectorRecord);
      setContestUpdateSignal((prev: number) => (prev + 1) % 1000);
    };
    func();
  };

  const contestTimerStop = (curTime: number) => {
    const func = async () => {
      const remainingContestTime = getRemainingTime(
        targetSectorRecord.remainingContestTime,
        targetContest.contestTimerStartTime,
        curTime
      );

      const contest: Partial<ContestType> = {
        _id: targetContest._id,
        contestTimerStartTime: -1,
        isContestTimerRunning: false,
      };
      const sectorRecord: Partial<SectorRecordType> = {
        _id: targetSectorRecord._id,
        hostId: targetSectorRecord.hostId,
        remainingContestTime: remainingContestTime,
        sectorState: "end",
      };

      await contestController.patch(contest._id, contest);
      await sectorRecordController.patch(sectorRecord._id, sectorRecord);
      setContestUpdateSignal((prev: number) => (prev + 1) % 1000);
    };
    func();
  };

  return (
    <div className="contest-timer-btn">
      <h5>경연 타이머 관리</h5>
      <button
        type="button"
        className="btn btn-primary"
        disabled={disabled}
        onClick={() => {
          const curTime = Date.now();

          // timer start => stop
          if (isContestTimerRunning) {
            contestTimerStop(curTime);
            return;
          }
          // timer stop => running
          contestTimerStart(curTime);
        }}
      >
        {isContestTimerRunning ? "경연 타이머 동작중" : "경연 타이머 시작"}
      </button>
    </div>
  );
}
