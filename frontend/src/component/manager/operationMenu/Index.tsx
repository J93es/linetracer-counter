import Accordion from "component/utils/Accordion";
import ContestTimerBtn from "component/manager/operationMenu/ContestTimerBtn";
import SelectContestSection from "component/manager/operationMenu/SelectContestSection";
import ManageRemainingContestTime from "component/manager/operationMenu/ManageRemainingContestTime/Index";
import SuspendOrder from "component/manager/operationMenu/SuspendOrder";
import ContestLaunch from "component/manager/operationMenu/ContestLaunch";

import "component/manager/operationMenu/Index.css";

import { ContestType } from "model/Contest";
import { SectorRecordType } from "model/SectorRecord";

import { isEmptyObject } from "tools/utils";
import { useEffect, useState } from "react";

export default function OperationMenu({
  setContestUpdateSignal,
  targetContest,
  targetSectorRecord,
  isContestTimerRunning,
  setIsContestTimerRunning,
  isContestLaunch,
  setIsContestLaunch,
}: {
  setContestUpdateSignal: Function;
  targetContest: Partial<ContestType>;
  targetSectorRecord: Partial<SectorRecordType>;
  isContestTimerRunning: boolean;
  setIsContestTimerRunning: Function;
  isContestLaunch: boolean;
  setIsContestLaunch: Function;
}) {
  const [contestTimerBtnDisabled, setContestTimerBtnDisabled] = useState(false);
  const [contestLaunchBtnDisabled, setcontestLaunchBtnDisabled] =
    useState(false);
  const [suspendOrderBtnDisabled, setSuspendOrderBtnDisabled] = useState(false);
  const [
    manageRemainingContestTimeBtnDisabled,
    setManageRemainingContestTimeBtnDisabled,
  ] = useState(false);

  // set contestLaunchBtnDisabled
  useEffect(() => {
    if (
      isEmptyObject(targetSectorRecord) ||
      targetContest.isContestTimerRunning
    ) {
      setcontestLaunchBtnDisabled(true);
      return;
    }
    setcontestLaunchBtnDisabled(false);
  }, [targetContest, targetSectorRecord]);

  // set contestTimerBtnDisabled
  useEffect(() => {
    if (isEmptyObject(targetSectorRecord)) {
      setContestTimerBtnDisabled(true);

      return;
    }
    if (!isContestLaunch) {
      setContestTimerBtnDisabled(true);
      return;
    }
    setContestTimerBtnDisabled(false);
  }, [targetSectorRecord, isContestLaunch]);

  // set suspendOrderBtnDisabled
  useEffect(() => {
    if (isEmptyObject(targetSectorRecord)) {
      setSuspendOrderBtnDisabled(true);
      return;
    }
    if (isContestLaunch || isContestTimerRunning) {
      setSuspendOrderBtnDisabled(true);
      return;
    }
    setSuspendOrderBtnDisabled(false);
  }, [targetSectorRecord, isContestLaunch, isContestTimerRunning]);

  // set manageRemainingContestTimeBtnDisabled
  useEffect(() => {
    if (isEmptyObject(targetSectorRecord)) {
      setManageRemainingContestTimeBtnDisabled(true);
      return;
    }
    if (isContestTimerRunning) {
      setManageRemainingContestTimeBtnDisabled(true);
      return;
    }
    setManageRemainingContestTimeBtnDisabled(false);
  }, [targetSectorRecord, isContestTimerRunning]);

  return (
    <Accordion
      id="operation-menu"
      title="관리 메뉴"
      body={
        <div className="operation-menu">
          <div className="operation-menu-row-head">
            <SelectContestSection
              setContestUpdateSignal={setContestUpdateSignal}
              targetContest={targetContest}
            />
          </div>

          <div className="operation-menu-row">
            <ContestLaunch
              setContestUpdateSignal={setContestUpdateSignal}
              targetContest={targetContest}
              targetSectorRecord={targetSectorRecord}
              isContestLaunch={isContestLaunch}
              setIsContestLaunch={setIsContestLaunch}
              disabled={contestLaunchBtnDisabled}
            />
          </div>

          <div className="operation-menu-row">
            <ContestTimerBtn
              setContestUpdateSignal={setContestUpdateSignal}
              targetContest={targetContest}
              targetSectorRecord={targetSectorRecord}
              isContestTimerRunning={isContestTimerRunning}
              setIsContestTimerRunning={setIsContestTimerRunning}
              disabled={contestTimerBtnDisabled}
            />
          </div>

          <div className="operation-menu-row">
            <SuspendOrder
              setContestUpdateSignal={setContestUpdateSignal}
              targetSectorRecord={targetSectorRecord}
              disabled={suspendOrderBtnDisabled}
            />
          </div>

          <div className="operation-menu-row-foot">
            <ManageRemainingContestTime
              setContestUpdateSignal={setContestUpdateSignal}
              targetSectorRecord={targetSectorRecord}
              disabled={manageRemainingContestTimeBtnDisabled}
            />
          </div>
        </div>
      }
    />
  );
}
