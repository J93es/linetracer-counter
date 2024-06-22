import SelectTarget from "pages/admin/component/select_target/Index";
import SectorRecordDistintion from "pages/admin/model/distinction/SectorRecordDistinction";
import Accordion from "pages/admin/component/Accordion";
import RetouchSectorRecord from "pages/admin/view/manager/sector_record_manager/RetouchSectorRecord";

import { SectorRecordType } from "pages/admin/model/SectorRecord";

export default function SectorRecordManager({
  setSectorRecordUpdateSignal,
  sectorRecordList,
  targetSectorRecord,
  setTargetSectorRecord,
  isBlocked,
}: {
  setSectorRecordUpdateSignal: React.Dispatch<React.SetStateAction<number>>;
  sectorRecordList: SectorRecordType[] | undefined;
  targetSectorRecord: SectorRecordType | undefined;
  setTargetSectorRecord: Function;
  isBlocked: boolean;
}) {
  let retouchHtml = null;
  if (isBlocked) {
    retouchHtml = <p>선택/수정이 불가능 합니다.</p>;
  } else if (!sectorRecordList) {
    retouchHtml = <p>부문 기록이 없습니다.</p>;
  } else if (!targetSectorRecord) {
    retouchHtml = <p>부문 기록을 선택하세요.</p>;
  } else {
    retouchHtml = (
      <RetouchSectorRecord
        setSectorRecordUpdateSignal={setSectorRecordUpdateSignal}
        targetSectorRecord={targetSectorRecord}
      />
    );
  }

  return (
    <Accordion
      id="sector-record-Manager"
      title="부문 기록 선택/수정"
      body={
        <div className="sector-record-manager">
          <SelectTarget
            target={targetSectorRecord}
            setTarget={setTargetSectorRecord}
            listOfObject={sectorRecordList}
            DistintionClass={SectorRecordDistintion}
            setUpdateSignal={() => {
              setSectorRecordUpdateSignal((prev: number) => (prev + 1) % 1000);
            }}
            disabled={isBlocked}
          />

          {retouchHtml}
        </div>
      }
    />
  );
}
