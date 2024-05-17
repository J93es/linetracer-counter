import { useState } from "react";
import SelectTarget from "component/utils/selectTarget/Index";
import ContestDistintion from "model/distinction/ContestDistinction";
import PostContest from "component/editer/contestEditer/PostContest";
import PutContest from "component/editer/contestEditer/PutContest";
import DeleteContestBtn from "component/editer/contestEditer/DeleteContestBtn";
import DropDown from "component/utils/DropDown";
import Accordion from "component/utils/Accordion";

import { ContestType } from "model/Contest";
import { contestEditMenuEnum } from "model/enums/index";

export default function ContestEditer({
  setContestListRefreshSignal,
  contestList,
  targetContest,
  setTargetContest,
}: {
  setContestListRefreshSignal: Function;
  contestList: ContestType[] | undefined;
  targetContest: ContestType | undefined;
  setTargetContest: Function;
}) {
  const [editMenu, setEditMenu] = useState<string>(contestEditMenuEnum[0]);

  let editMenuHtml = null;
  if (editMenu === "대회 추가") {
    editMenuHtml = (
      <PostContest
        targetContest={targetContest}
        setContestUpdateSignal={setContestListRefreshSignal}
      />
    );
  } else if (!targetContest) {
    editMenuHtml = <p>대회를 선택하세요.</p>;
  } else if (editMenu === "대회 수정") {
    editMenuHtml = (
      <PutContest
        setContestUpdateSignal={setContestListRefreshSignal}
        targetContest={targetContest}
      />
    );
  } else if (editMenu === "대회 삭제") {
    editMenuHtml = (
      <DeleteContestBtn
        setContestUpdateSignal={setContestListRefreshSignal}
        targetContest={targetContest}
      />
    );
  }

  return (
    <Accordion
      id="contest-Editer"
      title="경연 편집"
      body={
        <div className="contest-Editer">
          <SelectTarget
            target={targetContest}
            setTarget={setTargetContest}
            listOfObject={contestList}
            DistintionClass={ContestDistintion}
            setUpdateSignal={() => {
              setContestListRefreshSignal((prev: number) => (prev + 1) % 1000);
            }}
            disabled={false}
          />

          <DropDown
            target={editMenu}
            onClick={setEditMenu}
            menuList={contestEditMenuEnum}
          />

          {editMenuHtml}
        </div>
      }
    />
  );
}
