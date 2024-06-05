import { useState } from "react";

import Operation from "component/displayBoard/Operation";
import SelectContest from "component/displayBoard/SelectContest";

import { ContestType } from "model/Contest";

export default function DisplayBoard() {
  const [targetContest, setTargetContest] = useState<ContestType | undefined>(
    undefined
  );
  return (
    <div className="display-board">
      {targetContest ? (
        <Operation targetContestId={targetContest.id} />
      ) : (
        <SelectContest setTargetContest={setTargetContest} />
      )}
    </div>
  );
}
