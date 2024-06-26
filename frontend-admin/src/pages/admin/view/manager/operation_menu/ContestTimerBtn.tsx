import { ContestType } from "pages/admin/model/Contest";
import { SectorRecordType } from "pages/admin/model/SectorRecord";
import { ContestController } from "pages/admin/controller/fetch/ContestController";
import { SectorRecordController } from "pages/admin/controller/fetch/SectorRecordController";

import { getRemainingTime } from "pages/tools/getRemainingTime";

import { getNextParticipant } from "pages/tools/utils";

const contestController = new ContestController();
const sectorRecordController = new SectorRecordController();

export default function ContestTimerBtn({
  setContestUpdateSignal,
  targetContest,
  targetSectorRecord,
  isContestTimerRunning,
  setIsContestTimerRunning,
  disabled,
}: {
  setContestUpdateSignal: React.Dispatch<React.SetStateAction<number>>;
  targetContest: ContestType | undefined;
  targetSectorRecord: SectorRecordType | undefined;
  isContestTimerRunning: boolean;
  setIsContestTimerRunning: Function;
  disabled: boolean;
}) {
  const contestTimerStart = (curTime: number) => {
    const targetParticipantId = targetSectorRecord?.hostId;

    const nextParticipant = getNextParticipant(
      targetContest?.curContestingSection ?? "",
      targetParticipantId ?? "",
      targetContest?.participantList ?? []
    );

    const func = async () => {
      const contest: Partial<ContestType> = {
        id: targetContest?.id,

        curParticipantId: targetParticipantId,
        curSectorRecordId: targetSectorRecord?.id,
        nextParticipantId: nextParticipant?.id,
        contestTimerStartTime: curTime,
        isContestTimerRunning: true,
      };
      const sectorRecord: Partial<SectorRecordType> = {
        id: targetSectorRecord?.id,
        hostId: targetSectorRecord?.hostId,

        sectorState: "running",
      };

      await Promise.all([
        contestController.patch(contest),
        sectorRecordController.patch(sectorRecord),
      ]);

      // await contestController.patch(contest);
      // await sectorRecordController.patch(sectorRecord);
      setContestUpdateSignal((prev: number) => (prev + 1) % 1000);
    };
    func();
  };

  const contestTimerStop = (curTime: number) => {
    const func = async () => {
      const remainingContestTime = getRemainingTime(
        targetSectorRecord?.remainingContestTime,
        targetContest?.contestTimerStartTime,
        curTime
      );

      const contest: Partial<ContestType> = {
        id: targetContest?.id,
        contestTimerStartTime: -1,
        isContestTimerRunning: false,
      };
      const sectorRecord: Partial<SectorRecordType> = {
        id: targetSectorRecord?.id,
        hostId: targetSectorRecord?.hostId,

        remainingContestTime: remainingContestTime,
      };

      await Promise.all([
        contestController.patch(contest),
        sectorRecordController.patch(sectorRecord),
      ]);
      // await contestController.patch(contest);
      // await sectorRecordController.patch(sectorRecord);
      setContestUpdateSignal((prev: number) => (prev + 1) % 1000);
    };
    func();
  };

  const onClick = () => {
    const curTime = Date.now();

    // timer start => stop
    if (isContestTimerRunning) {
      setIsContestTimerRunning(true);
      contestTimerStop(curTime);
      return;
    }
    // timer stop => running
    setIsContestTimerRunning(false);
    contestTimerStart(curTime);
  };

  return (
    <div className="contest-timer-btn">
      <h5>경연 타이머 시작/종료 관리</h5>
      <button
        type="button"
        className="btn btn-primary"
        disabled={disabled}
        onClick={onClick}
      >
        {isContestTimerRunning ? "경연 타이머 동작중" : "경연 타이머 시작"}
      </button>
    </div>
  );
}
