import SelectTarget from "component/utils/selectTarget/SelectTarget";
import DriveRecordDistinction from "model/distinction/DriveRecordDistinction";
import { DriveRecordType } from "model/DriveRecord";

export default function DriveRecordManage({
  setDriveRecordUpdateSignal,
  targetDriveRecord,
  setTargetDriveRecord,
  driveRecordList,
}: {
  setDriveRecordUpdateSignal: Function;
  targetDriveRecord: Partial<DriveRecordType>;
  setTargetDriveRecord: Function;
  driveRecordList: object[];
}) {
  return (
    <div>
      <SelectTarget
        target={targetDriveRecord}
        setTarget={setTargetDriveRecord}
        listOfObject={driveRecordList}
        DistintionClass={DriveRecordDistinction}
        setUpdateSignal={() => {
          setDriveRecordUpdateSignal((prev: number) => (prev + 1) % 1000);
        }}
      />
    </div>
  );
}
