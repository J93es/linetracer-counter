import { useState } from "react";
import SelectTarget from "component/utils/selectTarget/SelectTarget";
import ContestDistintion from "model/distinction/ContestDistinction";
import PostContest from "component/contestManage/PostContest";
import PutContest from "component/contestManage/PutContest";
import DeleteContestBtn from "component/contestManage/DeleteContestBtn";
import SelectContestSection from "component/contestManage/SelectContestSection";
import ContestTimerStartBtn from "component/contestManage/ContestTimerStartBtn";
import DropDown from "component/utils/DropDown";

import Contest, { ContestType } from "model/Contest";
import { contesteditTypeEnum } from "model/enums/index";
import { isNotEmptyObject } from "tools/utils";

export default function ContestManage({
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
  const [editType, setEditType] = useState<string>(contesteditTypeEnum[0]);

  const editHtmlList = [];

  if (editType === "대회 추가") {
    editHtmlList.push(
      <PostContest
        targetContest={targetContest}
        setContestUpdateSignal={setContestUpdateSignal}
      />
    );
  }

  if (editType === "대회 수정") {
    if (isNotEmptyObject(targetContest)) {
      editHtmlList.push(
        <PutContest
          setContestUpdateSignal={setContestUpdateSignal}
          targetContest={targetContest}
        />
      );
    } else {
      editHtmlList.push(<a>대회를 선택하세요.</a>);
    }
  }

  if (editType === "대회 삭제") {
    if (isNotEmptyObject(targetContest)) {
      editHtmlList.push(
        <DeleteContestBtn
          setContestUpdateSignal={setContestUpdateSignal}
          targetContest={targetContest}
        />
      );
    } else {
      editHtmlList.push(<a>대회를 선택하세요.</a>);
    }
  }

  return (
    <div>
      <SelectTarget
        target={targetContest}
        setTarget={setTargetContest}
        listOfObject={contestList}
        DistintionClass={ContestDistintion}
        setUpdateSignal={() => {
          setContestUpdateSignal((prev: number) => (prev + 1) % 1000);
        }}
      />

      <DropDown
        target={editType}
        onClick={setEditType}
        menuList={contesteditTypeEnum}
      />

      {editHtmlList}

      <SelectContestSection
        setContestUpdateSignal={setContestUpdateSignal}
        targetContest={targetContest}
      />

      <ContestTimerStartBtn
        targetContest={targetContest}
        isContestTimerRunning={isContestTimerRunning}
        setIsContestTimerRunning={setIsContestTimerRunning}
      />
    </div>
  );
}
