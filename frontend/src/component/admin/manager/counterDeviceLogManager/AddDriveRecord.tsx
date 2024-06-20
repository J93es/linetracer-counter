import { CounterDeviceLogType } from "component/admin/model/CounterDeviceLog";
import { DriveRecordController } from "component/admin/controller/fetch/DriveRecordController";

const driveRecordController = new DriveRecordController();

export default function AddDriveRecord({
  targetCounterDeviceLog,
  targetSectorRecordId,
  setContestUpdateSignal,
}: {
  targetCounterDeviceLog: CounterDeviceLogType | undefined;
  targetSectorRecordId: string | undefined;
  setContestUpdateSignal: React.Dispatch<React.SetStateAction<number>>;
}) {
  const onCilck = (data: Partial<CounterDeviceLogType>) => {
    const func = async () => {
      await driveRecordController.post({
        hostId: targetSectorRecordId,
        type: targetCounterDeviceLog?.type,
        recordTime: targetCounterDeviceLog?.recordTime,
        writeTime: targetCounterDeviceLog?.writeTime ?? Date.now(),
      });
      setContestUpdateSignal((prev: number) => (prev + 1) % 1000);
    };
    func();
  };

  return (
    <button type="button" className="btn btn-primary" onClick={onCilck}>
      주행 기록에 추가
    </button>
  );
}
