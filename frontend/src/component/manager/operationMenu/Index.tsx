import Accordion from "component/utils/Accordion";
import ContestTimerBtn from "component/manager/operationMenu/ContestTimerBtn";
import SelectContestSection from "component/manager/operationMenu/SelectContestSection";
import ManageRemainingContestTime from "component/manager/operationMenu/ManageRemainingContestTime/Index";
import SuspendOrder from "component/manager/operationMenu/SuspendOrder";
import ManageProgress from "component/manager/operationMenu/ManageProgress";

import "component/manager/operationMenu/Index.css";

import { ContestType } from "model/Contest";
import { ParticipantType } from "model/Participant";
import { SectorRecordType } from "model/SectorRecord";

import { isEmptyObject } from "tools/utils";
import { useEffect, useState } from "react";

export default function OperationMenu({
  setContestUpdateSignal,
  targetContest,
  targetParticipant,
  targetSectorRecord,
  isContestTimerRunning,
  isContestInProgress,
  setIsContestInProgress,
}: {
  setContestUpdateSignal: Function;
  targetContest: Partial<ContestType>;
  targetParticipant: Partial<ParticipantType>;
  targetSectorRecord: Partial<SectorRecordType>;
  isContestTimerRunning: boolean;
  isContestInProgress: boolean;
  setIsContestInProgress: Function;
}) {
  const [contestTimerBtnDisabled, setContestTimerBtnDisabled] = useState(false);
  const [manageProgressBtnDisabled, setManageProgressBtnDisabled] =
    useState(false);
  const [suspendOrderBtnDisabled, setSuspendOrderBtnDisabled] = useState(false);
  const [
    manageRemainingContestTimeBtnDisabled,
    setManageRemainingContestTimeBtnDisabled,
  ] = useState(false);

  useEffect(() => {
    if (
      isEmptyObject(targetSectorRecord) ||
      targetContest.isContestTimerRunning
    ) {
      setManageProgressBtnDisabled(true);
      return;
    }
    setManageProgressBtnDisabled(false);
  }, [targetContest, targetSectorRecord]);

  useEffect(() => {
    if (isEmptyObject(targetSectorRecord)) {
      setContestTimerBtnDisabled(true);

      return;
    }
    if (!isContestInProgress) {
      setContestTimerBtnDisabled(true);
      return;
    }
    setContestTimerBtnDisabled(false);
  }, [targetSectorRecord, isContestInProgress]);

  useEffect(() => {
    if (isEmptyObject(targetSectorRecord)) {
      setSuspendOrderBtnDisabled(true);
      return;
    }
    if (isContestTimerRunning) {
      setSuspendOrderBtnDisabled(true);
      return;
    }
    setSuspendOrderBtnDisabled(false);
  }, [targetSectorRecord, isContestTimerRunning]);

  useEffect(() => {
    if (isEmptyObject(targetSectorRecord)) {
      setManageRemainingContestTimeBtnDisabled(true);
      return;
    }
    setManageRemainingContestTimeBtnDisabled(false);
  }, [targetSectorRecord]);

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
            <ManageProgress
              setContestUpdateSignal={setContestUpdateSignal}
              targetContest={targetContest}
              targetParticipant={targetParticipant}
              targetSectorRecord={targetSectorRecord}
              isContestInProgress={isContestInProgress}
              setIsContestInProgress={setIsContestInProgress}
              disabled={manageProgressBtnDisabled}
            />
          </div>

          <div className="operation-menu-row">
            <ContestTimerBtn
              setContestUpdateSignal={setContestUpdateSignal}
              targetContest={targetContest}
              targetSectorRecord={targetSectorRecord}
              isContestTimerRunning={isContestTimerRunning}
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
