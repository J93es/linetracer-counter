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
}: {
  setContestUpdateSignal: Function;
  targetContest: Partial<ContestType>;
  targetSectorRecord: Partial<SectorRecordType>;
  isContestTimerRunning: boolean;
}) {
  const contestTimerStart = (
    contest: Partial<ContestType>,
    sectorRecord: Partial<SectorRecordType>
  ) => {
    const func = async () => {
      await contestController.patchContest(contest._id, contest);
      await sectorRecordController.patchSectorRecord(
        sectorRecord._id,
        sectorRecord
      );
      setContestUpdateSignal((prev: number) => (prev + 1) % 1000);
    };
    func();
  };

  const contestTimerStop = (
    contest: Partial<ContestType>,
    sectorRecord: Partial<SectorRecordType>
  ) => {
    const func = async () => {
      await contestController.patchContest(contest._id, contest);
      await sectorRecordController.patchSectorRecord(
        sectorRecord._id,
        sectorRecord
      );
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
        onClick={() => {
          const curTime = Date.now();
          const contest: Partial<ContestType> = {
            _id: targetContest._id,
          };
          const sectorRecord: Partial<SectorRecordType> = {
            _id: targetSectorRecord._id,
            hostId: targetSectorRecord.hostId,
          };

          // timer running => stop
          if (isContestTimerRunning) {
            sectorRecord.remainingContestTime = getRemainingTime(
              targetSectorRecord.remainingContestTime,
              targetContest.contestTimerStartTime,
              curTime
            );
            sectorRecord.sectorState = "end";
            contest.contestTimerStartTime = -1;
            contestTimerStop(contest, sectorRecord);
          }
          // timer stop => running
          else {
            contest.contestTimerStartTime = curTime;
            sectorRecord.sectorState = "running";
            contestTimerStart(contest, sectorRecord);
          }
        }}
      >
        {isContestTimerRunning ? "경연 타이머 동작중" : "경연 타이머 시작"}
      </button>
    </div>
  );
}
