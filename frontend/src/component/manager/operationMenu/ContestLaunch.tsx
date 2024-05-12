import { ContestType } from "model/Contest";
import { SectorRecordType } from "model/SectorRecord";

import { ContestController } from "controller/ContestController";
import { SectorRecordController } from "controller/SectorRecordController";

const contestController = new ContestController();
const sectorRecordController = new SectorRecordController();

export default function ContestLaunch({
  setContestUpdateSignal,
  targetContest,
  targetSectorRecord,
  isContestLaunch,
  setIsContestLaunch,
  disabled,
}: {
  setContestUpdateSignal: Function;
  targetContest: Partial<ContestType>;
  targetSectorRecord: Partial<SectorRecordType>;
  isContestLaunch: boolean;
  setIsContestLaunch: Function;
  disabled: boolean;
}) {
  const startProgress = () => {
    const func = async () => {
      const contest: Partial<ContestType> = {
        _id: targetContest._id,
        curParticipnatId: targetSectorRecord.hostId,
        curSectorRecordId: targetSectorRecord._id,
      };

      const sectorRecord: Partial<SectorRecordType> = {
        _id: targetSectorRecord._id,
        hostId: targetSectorRecord.hostId,
        sectorState: "running",
      };

      await contestController.patch(targetContest._id, contest);
      await sectorRecordController.patch(targetSectorRecord._id, sectorRecord);
      setContestUpdateSignal((prev: number) => (prev + 1) % 1000);
    };
    func();
  };

  const stopProgress = async () => {
    const sectorRecord: Partial<SectorRecordType> = {
      _id: targetSectorRecord._id,
      hostId: targetSectorRecord.hostId,
      sectorState: "end",
    };

    await sectorRecordController.patch(targetSectorRecord._id, sectorRecord);
    setContestUpdateSignal((prev: number) => (prev + 1) % 1000);
  };

  const onClick = () => {
    // start => stop
    if (isContestLaunch) {
      setIsContestLaunch(false);
      stopProgress();
      return;
    }
    // stop => start
    setIsContestLaunch(true);
    startProgress();
  };

  return (
    <div className="manage-progress-btn">
      <h5>참가자 경연 시작/종료 관리</h5>
      <button
        type="button"
        className="btn btn-primary"
        disabled={disabled}
        onClick={onClick}
      >
        {isContestLaunch ? "참가자 경연 종료" : "참가자 경연 시작"}
      </button>
    </div>
  );
}
