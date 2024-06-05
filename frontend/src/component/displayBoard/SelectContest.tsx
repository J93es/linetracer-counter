import { useState, useEffect } from "react";

import { ContestType } from "model/Contest";
import ContestDistintion from "model/distinction/ContestDistinction";

import { ContestController } from "controller/fetch/ContestController";

import SelectTarget from "component/utils/selectTarget/Index";

const contestController = new ContestController();

export default function SelectContest({
  setTargetContest,
}: {
  setTargetContest: Function;
}) {
  const [contestBuffer, setContestBuffer] = useState<ContestType | undefined>(
    undefined
  );
  const [contestListRefreshSignal, setContestListRefreshSignal] =
    useState<number>(0);
  const [contestList, setContestList] = useState<ContestType[] | undefined>();

  // set contestList when contestListRefreshSignal is updated
  useEffect(() => {
    const func = async () => {
      const contestList = await contestController.getEvery();
      setContestList(contestList);
    };
    func();
  }, [contestListRefreshSignal]);

  // set targetContest when updateSignal, id is updated
  useEffect(() => {
    const func = async () => {
      const contest = await contestController.get(contestBuffer?.id);
      setContestBuffer(contest);
    };
    func();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contestBuffer?.id]);

  return (
    <>
      <SelectTarget
        target={contestBuffer}
        setTarget={setContestBuffer}
        listOfObject={contestList}
        DistintionClass={ContestDistintion}
        setUpdateSignal={() => {
          setContestListRefreshSignal((prev: number) => (prev + 1) % 1000);
        }}
        disabled={false}
      />

      <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          if (!contestBuffer) {
            return;
          }
          setTargetContest(contestBuffer);
        }}
      >
        대회 선택
      </button>
    </>
  );
}
