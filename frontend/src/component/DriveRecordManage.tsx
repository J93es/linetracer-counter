import SelectId from "component/selectId/SelectId";
import DriveRecordDistinction from "model/distinction/DriveRecordDistinction";

export default function DriveRecordManage({
  setDriveRecordUpdateSignal,
  targetDriveRecordId,
  setTargetDriveRecordId,
  driveRecordList,
}: {
  setDriveRecordUpdateSignal: Function;
  targetDriveRecordId: string;
  setTargetDriveRecordId: Function;
  driveRecordList: object[];
}) {
  return (
    <div>
      <SelectId
        targetId={targetDriveRecordId}
        setTargetId={setTargetDriveRecordId}
        listOfObject={driveRecordList}
        DistintionClass={DriveRecordDistinction}
        setUpdateSignal={() => {
          setDriveRecordUpdateSignal((prev: number) => (prev + 1) % 1000);
        }}
      />
    </div>
  );
}
