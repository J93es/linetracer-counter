import SelectTarget from "component/utils/selectTarget/Index";
import ContestDistintion from "model/distinction/ContestDistinction";
import Accordion from "component/utils/Accordion";

import { ContestType } from "model/Contest";

import { isEmptyArray, isEmptyObject } from "tools/utils";

export default function ContestManager({
  setContestUpdateSignal,
  contestList,
  targetContest,
  setTargetContest,
  isBlocked,
}: {
  setContestUpdateSignal: Function;
  contestList: Partial<ContestType>[];
  targetContest: Partial<ContestType>;
  setTargetContest: Function;
  isBlocked: boolean;
}) {
  return (
    <Accordion
      id="contest-Manager"
      title="경연 선택"
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
            disabled={isBlocked}
          />
        </div>
      }
    />
  );
}
