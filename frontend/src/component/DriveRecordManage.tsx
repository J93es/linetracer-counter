import SelectId from "component/SelectId/SelectId";
import DriveRecordDistinction from "model/Distinction/DriveRecordDistinction";

export default function DriveRecordManage({
  setDriveRecordListGetSignal,
  targetDriveRecordId,
  setTargetDriveRecordId,
  driveRecordList,
}: {
  setDriveRecordListGetSignal: Function;
  targetDriveRecordId: string;
  setTargetDriveRecordId: Function;
  driveRecordList: object[];
}) {
  return (
    <div>
      {driveRecordList.length === 0 ? null : (
        <button
          type="button"
          className="btn btn-info"
          onClick={() => {
            setDriveRecordListGetSignal((prev: number) => (prev + 1) % 1000);
          }}
        >
          load DriveRecord list
        </button>
      )}

      <SelectId
        targetId={targetDriveRecordId}
        setTargetId={setTargetDriveRecordId}
        listOfObject={driveRecordList}
        DistintionClass={DriveRecordDistinction}
      />
    </div>
  );
}
