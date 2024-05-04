import SelectId from "component/selectId/SelectId";
import ContestDistintion from "model/distinction/ContestDistinction";
import PostContest from "component/contestManage/PostContest";
import PutContest from "component/contestManage/PutContest";
import DeleteContestBtn from "component/contestManage/DeleteContestBtn";
import SelectContestSection from "component/contestManage/SelectContestSection";
import ContestTimerStartBtn from "component/contestManage/ContestTimerStartBtn";

import { ContestController } from "controller/ContestController";
import Contest, { ContestType } from "model/Contest";

const contestController = new ContestController();

export default function ContestManage({
  setContestUpdateSignal,
  contestList,
  targetContestId,
  setTargetContestId,
  targetContest,
  isContestTimerRunning,
  setIsContestTimerRunning,
}: {
  setContestUpdateSignal: Function;
  contestList: object[];
  targetContestId: string;
  setTargetContestId: Function;
  targetContest: Partial<ContestType>;
  isContestTimerRunning: boolean;
  setIsContestTimerRunning: Function;
}) {
  return (
    <div>
      {/* manage targetContestId  */}
      <SelectId
        targetId={targetContestId}
        setTargetId={setTargetContestId}
        listOfObject={contestList}
        DistintionClass={ContestDistintion}
        setUpdateSignal={() => {
          setContestUpdateSignal((prev: number) => (prev + 1) % 1000);
        }}
      />

      {/* post targetContest */}
      <PostContest setContestUpdateSignal={setContestUpdateSignal} />

      {/* put targetContest */}
      <PutContest
        setContestUpdateSignal={setContestUpdateSignal}
        targetContestId={targetContestId}
      />

      {/* patch targetContest */}
      <SelectContestSection
        setContestUpdateSignal={setContestUpdateSignal}
        targetContestId={targetContestId}
        targetContest={targetContest}
      />

      {/* start contestTimer */}
      <ContestTimerStartBtn
        targetContestId={targetContestId}
        isContestTimerRunning={isContestTimerRunning}
        setIsContestTimerRunning={setIsContestTimerRunning}
      />

      {/* delete targetContest */}
      <DeleteContestBtn
        setContestUpdateSignal={setContestUpdateSignal}
        targetContestId={targetContestId}
      />
    </div>
  );
}
