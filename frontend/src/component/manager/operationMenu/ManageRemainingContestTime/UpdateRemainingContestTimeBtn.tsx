import { SectorRecordType } from "model/SectorRecord";
import { SectorRecordController } from "controller/SectorRecordController";

const sectorRecordController = new SectorRecordController();

export default function UpdateRemainingContestTimeBtn({
  setContestUpdateSignal,
  targetSectorRecord,
  remainingContestTime,
  label,
  btnType,
  disabled,
}: {
  setContestUpdateSignal: Function;
  targetSectorRecord: Partial<SectorRecordType>;
  remainingContestTime: number;
  label: string;
  btnType: string;
  disabled: boolean;
}) {
  const className = `btn ${btnType}`;

  return (
    <button
      type="button"
      className={className}
      disabled={disabled}
      onClick={() => {
        const func = async () => {
          await sectorRecordController.patch(targetSectorRecord._id, {
            _id: targetSectorRecord._id,
            hostId: targetSectorRecord.hostId,
            remainingContestTime:
              remainingContestTime < 0 ? 0 : remainingContestTime,
          });
          setContestUpdateSignal((prev: number) => (prev + 1) % 1000);
        };
        func();
      }}
    >
      {label}
    </button>
  );
}
