import SelectTarget from "component/utils/selectTarget/Index";
import ContestDistintion from "model/distinction/ContestDistinction";
import Accordion from "component/utils/Accordion";
import ContestTimerStartBtn from "component/manager/contestManager/ContestTimerStartBtn";
import SelectContestSection from "component/manager/contestManager/SelectContestSection";

import { ContestType } from "model/Contest";

export default function ContestManager({
  setContestUpdateSignal,
  contestList,
  targetContest,
  setTargetContest,
  isContestTimerRunning,
  setIsContestTimerRunning,
}: {
  setContestUpdateSignal: Function;
  contestList: Partial<ContestType>[];
  targetContest: Partial<ContestType>;
  setTargetContest: Function;
  isContestTimerRunning: boolean;
  setIsContestTimerRunning: Function;
}) {
  return (
    <Accordion
      id="contest-Manager"
      title="현재 경연 관리"
      body={
        <div className="contest-Manager">
          <SelectTarget
            target={targetContest}
            setTarget={setTargetContest}
            listOfObject={contestList}
            DistintionClass={ContestDistintion}
            setUpdateSignal={() => {
              setContestUpdateSignal((prev: number) => (prev + 1) % 1000);
            }}
            disabled={isContestTimerRunning}
          />

          <ContestTimerStartBtn
            setContestUpdateSignal={setContestUpdateSignal}
            targetContest={targetContest}
            isContestTimerRunning={isContestTimerRunning}
            setIsContestTimerRunning={setIsContestTimerRunning}
          />

          <SelectContestSection
            setContestUpdateSignal={setContestUpdateSignal}
            targetContest={targetContest}
          />
        </div>
      }
    />
  );
}
