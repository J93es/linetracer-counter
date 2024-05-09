import { DriveRecordType } from "model/DriveRecord";

import { DriveRecordController } from "controller/DriveRecordController";

const driveRecordController = new DriveRecordController();

export default function DeleteDriveRecordBtn({
  setDriveRecordUpdateSignal,
  targetDriveRecord,
  targetSectorRecordId,
}: {
  setDriveRecordUpdateSignal: Function;
  targetDriveRecord: Partial<DriveRecordType>;
  targetSectorRecordId: string;
}) {
  return (
    <button
      type="button"
      className="btn btn-danger"
      onClick={() => {
        const func = async () => {
          await driveRecordController.deleteDriveRecord(
            targetSectorRecordId,
            targetDriveRecord._id
          );
          setDriveRecordUpdateSignal((prev: number) => (prev + 1) % 1000);
        };
        func();
      }}
    >
      선택한 주행 기록 삭제
    </button>
  );
}
