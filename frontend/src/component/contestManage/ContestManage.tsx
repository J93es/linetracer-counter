import { useState } from "react";
import SelectTarget from "component/utils/selectTarget/SelectTarget";
import ContestDistintion from "model/distinction/ContestDistinction";
import PostContest from "component/contestManage/PostContest";
import PutContest from "component/contestManage/PutContest";
import DeleteContestBtn from "component/contestManage/DeleteContestBtn";
import SelectContestSection from "component/contestManage/SelectContestSection";
import ContestTimerStartBtn from "component/contestManage/ContestTimerStartBtn";
import DropDown from "component/utils/DropDown";
import Accordion from "component/utils/Accordion";

import { ContestType } from "model/Contest";
import { contestEditMenuEnum } from "model/enums/index";
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
  const [editMenu, setEditMenu] = useState<string>(contestEditMenuEnum[0]);

  let editMenuHtml = null;

  if (editMenu === "대회 추가") {
    editMenuHtml = (
      <PostContest
        targetContest={targetContest}
        setContestUpdateSignal={setContestUpdateSignal}
      />
    );
  }

  if (editMenu === "대회 수정") {
    if (isNotEmptyObject(targetContest)) {
      editMenuHtml = (
        <PutContest
          setContestUpdateSignal={setContestUpdateSignal}
          targetContest={targetContest}
        />
      );
    } else {
      editMenuHtml = <p>대회를 선택하세요.</p>;
    }
  }

  if (editMenu === "대회 삭제") {
    if (isNotEmptyObject(targetContest)) {
      editMenuHtml = (
        <DeleteContestBtn
          setContestUpdateSignal={setContestUpdateSignal}
          targetContest={targetContest}
        />
      );
    } else {
      editMenuHtml = <p>대회를 선택하세요.</p>;
    }
  }

  return (
    <div>
      <Accordion
        id="contest-manage"
        title="경연 관리"
        body={
          <div className="contest-manage">
            <div className="select-contest">
              <SelectTarget
                target={targetContest}
                setTarget={setTargetContest}
                listOfObject={contestList}
                DistintionClass={ContestDistintion}
                setUpdateSignal={() => {
                  setContestUpdateSignal((prev: number) => (prev + 1) % 1000);
                }}
              />
            </div>

            <div className="edit-contest">
              <DropDown
                target={editMenu}
                onClick={setEditMenu}
                menuList={contestEditMenuEnum}
              />

              {editMenuHtml}
            </div>

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
        }
      />
    </div>
  );
}
