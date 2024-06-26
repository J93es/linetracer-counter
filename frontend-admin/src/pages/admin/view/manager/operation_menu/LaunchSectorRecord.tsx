import { ContestType } from "pages/admin/model/Contest";
import { SectorRecordType } from "pages/admin/model/SectorRecord";

import { ContestController } from "pages/admin/controller/fetch/ContestController";
import { SectorRecordController } from "pages/admin/controller/fetch/SectorRecordController";

import { getNextParticipant } from "pages/tools/utils";

const contestController = new ContestController();
const sectorRecordController = new SectorRecordController();

export default function LaunchSectorRecord({
  setContestUpdateSignal,
  targetContest,
  targetSectorRecord,
  isSectorRecordLaunched,
  setIsSectorRecordLaunched,
  disabled,
}: {
  setContestUpdateSignal: React.Dispatch<React.SetStateAction<number>>;
  targetContest: ContestType | undefined;
  targetSectorRecord: SectorRecordType | undefined;
  isSectorRecordLaunched: boolean;
  setIsSectorRecordLaunched: Function;
  disabled: boolean;
}) {
  const startProgress = () => {
    const func = async () => {
      const targetParticipantId = targetSectorRecord?.hostId;

      const nextParticipant = getNextParticipant(
        targetContest?.curContestingSection || "",
        targetParticipantId,
        targetContest?.participantList ?? []
      );

      const contest: Partial<ContestType> = {
        id: targetContest?.id,
        curParticipantId: targetParticipantId,
        nextParticipantId: nextParticipant?.id ?? "",
        curSectorRecordId: targetSectorRecord?.id,
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

  const stopProgress = async () => {
    const sectorRecord: Partial<SectorRecordType> = {
      id: targetSectorRecord?.id,
      hostId: targetSectorRecord?.hostId,
      sectorState: "end",
    };

    await sectorRecordController.patch(sectorRecord);
    setContestUpdateSignal((prev: number) => (prev + 1) % 1000);
  };

  const onClick = () => {
    // start => stop
    if (isSectorRecordLaunched) {
      setIsSectorRecordLaunched(false);
      stopProgress();
      return;
    }
    // stop => start
    setIsSectorRecordLaunched(true);
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
        {isSectorRecordLaunched ? "참가자 경연 종료" : "참가자 경연 시작"}
      </button>
    </div>
  );
}
