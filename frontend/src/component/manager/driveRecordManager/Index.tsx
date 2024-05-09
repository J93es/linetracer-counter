import SelectTarget from "component/utils/selectTarget/Index";
import Accordion from "component/utils/Accordion";
import RetouchDriveRecord from "component/manager/driveRecordManager/RetouchDriveRecord";

import DriveRecordDistinction from "model/distinction/DriveRecordDistinction";
import { DriveRecordType } from "model/DriveRecord";
import { SectorRecordType } from "model/SectorRecord";

import { isNotEmptyArray, isNotEmptyObject } from "tools/utils";

export default function DriveRecordManager({
  setDriveRecordUpdateSignal,
  targetDriveRecord,
  setTargetDriveRecord,
  driveRecordList,
  targetSectorRecord,
}: {
  setDriveRecordUpdateSignal: Function;
  targetDriveRecord: Partial<DriveRecordType>;
  setTargetDriveRecord: Function;
  driveRecordList: object[];
  targetSectorRecord: Partial<SectorRecordType>;
}) {
  let retouchHtml = null;

  const emptyDriveRecordListMessage = <p>주행 기록이 없습니다.</p>;
  const emptyDriveRecordMessage = <p>주행 기록을 선택하세요.</p>;

  if (!isNotEmptyArray(driveRecordList)) {
    retouchHtml = emptyDriveRecordListMessage;
  } else if (!isNotEmptyObject(targetDriveRecord)) {
    retouchHtml = emptyDriveRecordMessage;
  } else {
    retouchHtml = (
      <RetouchDriveRecord
        setDriveRecordUpdateSignal={setDriveRecordUpdateSignal}
        targetDriveRecord={targetDriveRecord}
        targetSectorRecordId={targetSectorRecord._id}
      />
    );
  }

  return (
    <Accordion
      id="drive-record-Manager"
      title="현재 주행 기록 관리"
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
