import { SectorRecordType } from "model/SectorRecord";
import { SectorRecordController } from "controller/fetch/SectorRecordController";

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
  targetSectorRecord: SectorRecordType | undefined;
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
          await sectorRecordController.patch({
            id: targetSectorRecord?.id,
            hostId: targetSectorRecord?.hostId,
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
