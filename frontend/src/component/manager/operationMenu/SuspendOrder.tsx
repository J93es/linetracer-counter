import { SectorRecordType } from "model/SectorRecord";
import { SectorRecordController } from "controller/SectorRecordController";

import { defaultRemainingContestTime } from "model/SectorRecord";

const sectorRecordController = new SectorRecordController();

export default function SuspendOrder({
  setContestUpdateSignal,
  targetSectorRecord,
}: {
  setContestUpdateSignal: Function;
  targetSectorRecord: Partial<SectorRecordType>;
}) {
  return (
    <div className="update-remaining-contest-time-btn">
      <h5>경연 순서 관리</h5>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          const func = async () => {
            await sectorRecordController.patch(targetSectorRecord._id, {
              _id: targetSectorRecord._id,
              hostId: targetSectorRecord.hostId,
              remainingContestTime:
                (targetSectorRecord.remainingContestTime ??
                  defaultRemainingContestTime) - 60000,
              sectorState: "suspend",
              order: (targetSectorRecord.order ?? 1) + 500,
            });
            setContestUpdateSignal((prev: number) => (prev + 1) % 1000);
          };
          func();
        }}
      >
        경연 순서 미루기
      </button>
    </div>
  );
}
