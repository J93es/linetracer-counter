import SelectTarget from "pages/admin/component/select_target/Index";
import Accordion from "pages/admin/component/Accordion";
import RetouchDriveRecord from "pages/admin/view/manager/drive_record_manager/RetouchDriveRecord";

import DriveRecordDistinction from "pages/admin/model/distinction/DriveRecordDistinction";
import { DriveRecordType } from "pages/admin/model/DriveRecord";

export default function DriveRecordManager({
  setDriveRecordUpdateSignal,
  targetDriveRecord,
  setTargetDriveRecord,
  driveRecordList,
  isBlocked,
}: {
  setDriveRecordUpdateSignal: React.Dispatch<React.SetStateAction<number>>;
  targetDriveRecord: DriveRecordType | undefined;
  setTargetDriveRecord: Function;
  driveRecordList: object[] | undefined;
  isBlocked: boolean;
}) {
  let retouchHtml = null;
  if (isBlocked) {
    retouchHtml = <p>수정이 불가능 합니다.</p>;
  } else if (!driveRecordList) {
    retouchHtml = <p>주행 기록이 없습니다.</p>;
  } else if (!targetDriveRecord) {
    retouchHtml = <p>주행 기록을 선택하세요.</p>;
  } else {
    retouchHtml = (
      <RetouchDriveRecord
        setDriveRecordUpdateSignal={setDriveRecordUpdateSignal}
        targetDriveRecord={targetDriveRecord}
      />
    );
  }

  return (
    <Accordion
      id="drive-record-Manager"
      title="주행 기록 수정"
      body={
        <div className="drive-record-Manager">
          <SelectTarget
            target={targetDriveRecord}
            setTarget={setTargetDriveRecord}
            listOfObject={driveRecordList}
            DistintionClass={DriveRecordDistinction}
            setUpdateSignal={() => {
              setDriveRecordUpdateSignal((prev: number) => (prev + 1) % 1000);
            }}
            disabled={false}
          />

          {retouchHtml}
        </div>
      }
    />
  );
}
