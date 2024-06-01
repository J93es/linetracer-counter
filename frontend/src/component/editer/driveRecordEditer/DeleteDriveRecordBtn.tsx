import { DriveRecordType } from "model/DriveRecord";

import { DriveRecordController } from "controller/fetch/DriveRecordController";

const driveRecordController = new DriveRecordController();

export default function DeleteDriveRecordBtn({
  setDriveRecordUpdateSignal,
  targetDriveRecord,
}: {
  setDriveRecordUpdateSignal: Function;
  targetDriveRecord: DriveRecordType | undefined;
}) {
  const deleteDriveRecord = async () => {
    await driveRecordController.delete(targetDriveRecord?.id);
    setDriveRecordUpdateSignal((prev: number) => (prev + 1) % 1000);
  };

  return (
    <button
      type="button"
      className="btn btn-danger"
      onClick={() => {
        deleteDriveRecord();
      }}
    >
      선택한 주행 기록 삭제
    </button>
  );
}
