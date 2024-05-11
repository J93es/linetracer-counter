import { ContestType } from "model/Contest";
import { ParticipantType } from "model/Participant";
import { SectorRecordType } from "model/SectorRecord";

import { ContestController } from "controller/ContestController";

const contestController = new ContestController();

export default function ManageProgress({
  setContestUpdateSignal,
  targetContest,
  targetParticipant,
  targetSectorRecord,
  isContestInProgress,
  setIsContestInProgress,
  disabled,
}: {
  setContestUpdateSignal: Function;
  targetContest: Partial<ContestType>;
  targetParticipant: Partial<ParticipantType>;
  targetSectorRecord: Partial<SectorRecordType>;
  isContestInProgress: boolean;
  setIsContestInProgress: Function;
  disabled: boolean;
}) {
  const startProgress = () => {
    const func = async () => {
      await contestController.patch(targetContest._id, {
        _id: targetContest._id,
        curParticipnatId: targetParticipant._id,
        curSectorRecordId: targetSectorRecord._id,
      });
      setContestUpdateSignal((prev: number) => (prev + 1) % 1000);
      setIsContestInProgress(true);
    };
    func();
  };

  const stopProgress = () => {
    setIsContestInProgress(false);
  };

  return (
    <div className="manage-progress-btn">
      <h5>참가자 경연 시작/종료 관리</h5>
      <button
        type="button"
        className="btn btn-primary"
        disabled={disabled}
        onClick={() => {
          // start => stop
          if (isContestInProgress) {
            stopProgress();
            return;
          }
          // stop => start
          startProgress();
        }}
      >
        {isContestInProgress ? "참가자 경연 종료" : "참가자 경연 시작"}
      </button>
    </div>
  );
}
