import { CounterDeviceLogType } from "model/CounterDeviceLog";

import { CounterDeviceLogController } from "component/admin/controller/fetch/CounterDeviceLogController";

const counterDeviceLogController = new CounterDeviceLogController();

export default function DeleteCounterDeviceLogBtn({
  setCounterDeviceLogUpdateSignal,
  targetCounterDeviceLog,
}: {
  setCounterDeviceLogUpdateSignal: React.Dispatch<React.SetStateAction<number>>;
  targetCounterDeviceLog: CounterDeviceLogType | undefined;
}) {
  const deleteCounterDeviceLog = async () => {
    await counterDeviceLogController.delete(targetCounterDeviceLog?.id);
    setCounterDeviceLogUpdateSignal((prev: number) => (prev + 1) % 1000);
  };

  return (
    <button
      type="button"
      className="btn btn-danger"
      onClick={() => {
        deleteCounterDeviceLog();
      }}
    >
      선택한 계수기 로그 삭제
    </button>
  );
}
