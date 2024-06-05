import SelectTarget from "component/utils/selectTarget/Index";
import ContestDistintion from "model/distinction/ContestDistinction";
import Accordion from "component/utils/Accordion";

import { ContestType } from "model/Contest";

export default function ContestManager({
  setContestListRefreshSignal,
  contestList,
  targetContest,
  setTargetContest,
  isBlocked,
}: {
  setContestListRefreshSignal: React.Dispatch<React.SetStateAction<number>>;
  contestList: ContestType[] | undefined;
  targetContest: ContestType | undefined;
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
              setContestListRefreshSignal((prev: number) => (prev + 1) % 1000);
            }}
            disabled={isBlocked}
          />
        </div>
      }
    />
  );
}
