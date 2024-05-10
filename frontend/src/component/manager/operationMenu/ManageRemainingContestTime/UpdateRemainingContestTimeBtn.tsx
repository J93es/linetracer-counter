import { SectorRecordType } from "model/SectorRecord";
import { SectorRecordController } from "controller/SectorRecordController";

const sectorRecordController = new SectorRecordController();

export default function UpdateRemainingContestTimeBtn({
  setContestUpdateSignal,
  targetSectorRecord,
  remainingContestTime,
  label,
  btnType,
}: {
  setContestUpdateSignal: Function;
  targetSectorRecord: Partial<SectorRecordType>;
  remainingContestTime: number;
  label: string;
  btnType: string;
}) {
  const className = `btn ${btnType}`;

  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        const func = async () => {
          await sectorRecordController.patchSectorRecord(
            targetSectorRecord._id,
            {
              _id: targetSectorRecord._id,
              hostId: targetSectorRecord.hostId,
              remainingContestTime:
                remainingContestTime < 0 ? 0 : remainingContestTime,
            }
          );
          setContestUpdateSignal((prev: number) => (prev + 1) % 1000);
        };
        func();
      }}
    >
      {label}
    </button>
  );
}
