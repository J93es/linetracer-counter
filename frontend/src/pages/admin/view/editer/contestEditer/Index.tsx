import { useState } from "react";
import SelectTarget from "pages/admin/component/selectTarget/Index";
import ContestDistintion from "pages/admin/model/distinction/ContestDistinction";
import PostContest from "pages/admin/view/editer/contestEditer/PostContest";
import PutContest from "pages/admin/view/editer/contestEditer/PutContest";
import DeleteContestBtn from "pages/admin/view/editer/contestEditer/DeleteContestBtn";
import DropDown from "pages/admin/component/DropDown";
import Accordion from "pages/admin/component/Accordion";

import { ContestType } from "pages/admin/model/Contest";
import { contestEditMenuEnum } from "pages/admin/model/enums/index";

export default function ContestEditer({
  setContestListRefreshSignal,
  contestList,
  targetContest,
  setTargetContest,
}: {
  setContestListRefreshSignal: React.Dispatch<React.SetStateAction<number>>;
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
