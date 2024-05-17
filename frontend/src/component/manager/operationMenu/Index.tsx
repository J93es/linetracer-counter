import Accordion from "component/utils/Accordion";
import ContestTimerBtn from "component/manager/operationMenu/ContestTimerBtn";
import SelectContestSection from "component/manager/operationMenu/SelectContestSection";
import ManageRemainingContestTime from "component/manager/operationMenu/ManageRemainingContestTime/Index";
import SuspendOrder from "component/manager/operationMenu/SuspendOrder";
import LaunchSectorRecord from "component/manager/operationMenu/LaunchSectorRecord";

import "component/manager/operationMenu/Index.css";

import { ContestType } from "model/Contest";
import { SectorRecordType } from "model/SectorRecord";

import { useEffect, useState } from "react";

export default function OperationMenu({
  setContestUpdateSignal,
  targetContest,
  targetSectorRecord,
  isContestTimerRunning,
  setIsContestTimerRunning,
  isSectorRecordLaunched,
  setIsSectorRecordLaunched,
}: {
  setContestUpdateSignal: Function;
  targetContest: ContestType | undefined;
  targetSectorRecord: SectorRecordType | undefined;
  isContestTimerRunning: boolean;
  setIsContestTimerRunning: Function;
  isSectorRecordLaunched: boolean;
  setIsSectorRecordLaunched: Function;
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
    if (!targetSectorRecord) {
      setcontestLaunchBtnDisabled(true);
      return;
    }
    if (targetContest?.isContestTimerRunning) {
      setcontestLaunchBtnDisabled(true);
      return;
    }
    setcontestLaunchBtnDisabled(false);
  }, [targetContest, targetSectorRecord]);

  // set contestTimerBtnDisabled
  useEffect(() => {
    if (!targetSectorRecord) {
      setContestTimerBtnDisabled(true);

      return;
    }
    if (!isSectorRecordLaunched) {
      setContestTimerBtnDisabled(true);
      return;
    }
    setContestTimerBtnDisabled(false);
  }, [targetSectorRecord, isSectorRecordLaunched]);

  // set suspendOrderBtnDisabled
  useEffect(() => {
    if (!targetSectorRecord) {
      setSuspendOrderBtnDisabled(true);
      return;
    }
    if (isContestTimerRunning) {
      setSuspendOrderBtnDisabled(true);
      return;
    }
    setSuspendOrderBtnDisabled(false);
  }, [targetSectorRecord, isSectorRecordLaunched, isContestTimerRunning]);

  // set manageRemainingContestTimeBtnDisabled
  useEffect(() => {
    if (!targetSectorRecord) {
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
            <LaunchSectorRecord
              setContestUpdateSignal={setContestUpdateSignal}
              targetContest={targetContest}
              targetSectorRecord={targetSectorRecord}
              isSectorRecordLaunched={isSectorRecordLaunched}
              setIsSectorRecordLaunched={setIsSectorRecordLaunched}
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
