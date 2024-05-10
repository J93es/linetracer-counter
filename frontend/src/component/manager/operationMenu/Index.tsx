import Accordion from "component/utils/Accordion";
import ContestTimerBtn from "component/manager/operationMenu/ContestTimerBtn";
import SelectContestSection from "component/manager/operationMenu/SelectContestSection";
import ManageRemainingContestTime from "component/manager/operationMenu/ManageRemainingContestTime/Index";
import SuspendOrder from "component/manager/operationMenu/SuspendOrder";

import "component/manager/operationMenu/Index.css";

import { ContestType } from "model/Contest";
import { SectorRecordType } from "model/SectorRecord";

import { isNotEmptyObject } from "tools/utils";

export default function OperationMenu({
  setContestUpdateSignal,
  targetContest,
  targetSectorRecord,
  isContestTimerRunning,
}: {
  setContestUpdateSignal: Function;
  targetContest: Partial<ContestType>;
  targetSectorRecord: Partial<SectorRecordType>;
  isContestTimerRunning: boolean;
}) {
  let contestTimerBtn_html = null;
  if (isNotEmptyObject(targetSectorRecord)) {
    contestTimerBtn_html = (
      <ContestTimerBtn
        setContestUpdateSignal={setContestUpdateSignal}
        targetContest={targetContest}
        targetSectorRecord={targetSectorRecord}
        isContestTimerRunning={isContestTimerRunning}
      />
    );
  }

  let suspendOrderBtn_html = null;
  if (isNotEmptyObject(targetSectorRecord) && !isContestTimerRunning) {
    suspendOrderBtn_html = (
      <SuspendOrder
        setContestUpdateSignal={setContestUpdateSignal}
        targetSectorRecord={targetSectorRecord}
      />
    );
  }

  let manageRemainingContestTimeBtn_html = null;
  if (isNotEmptyObject(targetSectorRecord)) {
    manageRemainingContestTimeBtn_html = (
      <ManageRemainingContestTime
        setContestUpdateSignal={setContestUpdateSignal}
        targetSectorRecord={targetSectorRecord}
      />
    );
  }

  return (
    <Accordion
      id="operation-menu"
      title="관리 메뉴"
      body={
        <div className="operation-menu">
          <div className="operation-menu-row-1">
            <SelectContestSection
              setContestUpdateSignal={setContestUpdateSignal}
              targetContest={targetContest}
            />
          </div>

          <div className="operation-menu-row-2">{contestTimerBtn_html}</div>

          <div className="operation-menu-row-3">{suspendOrderBtn_html}</div>

          <div className="operation-menu-row-4">
            {manageRemainingContestTimeBtn_html}
          </div>
        </div>
      }
    />
  );
}
