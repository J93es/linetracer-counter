import SelectTarget from "component/utils/selectTarget/Index";
import SectorRecordDistintion from "model/distinction/SectorRecordDistinction";
import Accordion from "component/utils/Accordion";
import RetouchSectorRecord from "component/manager/sectorRecordManager/RetouchSectorRecord";

import { ParticipantType } from "model/Participant";
import { SectorRecordType } from "model/SectorRecord";

import { isNotEmptyArray, isNotEmptyObject } from "tools/utils";

export default function SectorRecordManager({
  setSectorRecordUpdateSignal,
  sectorRecordList,
  targetSectorRecord,
  setTargetSectorRecord,
  isContestTimerRunning,
}: {
  setSectorRecordUpdateSignal: Function;
  sectorRecordList: object[];
  targetSectorRecord: Partial<SectorRecordType>;
  setTargetSectorRecord: Function;
  isContestTimerRunning: boolean;
}) {
  let retouchHtml = null;
  const emptySectorRecordListMessage = <p>부문 기록이 없습니다.</p>;
  const emptySectorRecordMessage = <p>부문 기록을 선택하세요.</p>;

  if (isContestTimerRunning) {
    retouchHtml = <p>경연이 진행 중입니다.</p>;
  } else if (!isNotEmptyArray(sectorRecordList)) {
    retouchHtml = emptySectorRecordListMessage;
  } else if (!isNotEmptyObject(targetSectorRecord)) {
    retouchHtml = emptySectorRecordMessage;
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
      title="현재 부문 기록 선택/편집"
      body={
        <div className="sector-record-Manager">
          <SelectTarget
            target={targetSectorRecord}
            setTarget={setTargetSectorRecord}
            listOfObject={sectorRecordList}
            DistintionClass={SectorRecordDistintion}
            setUpdateSignal={() => {
              setSectorRecordUpdateSignal((prev: number) => (prev + 1) % 1000);
            }}
            disabled={isContestTimerRunning}
          />

          {retouchHtml}
        </div>
      }
    />
  );
}
