import DropDown from "pages/admin/component/DropDown";

import { ContestType } from "pages/admin/model/Contest";
import { ContestController } from "pages/admin/controller/fetch/ContestController";
import { sectorEnum } from "pages/admin/model/enums/index";

const contestController = new ContestController();

export default function SelectContestSection({
  setContestUpdateSignal,
  targetContest,
}: {
  setContestUpdateSignal: React.Dispatch<React.SetStateAction<number>>;
  targetContest: ContestType | undefined;
}) {
  const onClick = (target: string) => {
    const func = async () => {
      await contestController.patch({
        id: targetContest?.id,
        curContestingSection: target,
      });
      setContestUpdateSignal((prev: number) => (prev + 1) % 1000);
    };
    func();
  };

  return (
    <div className="select-contest-section">
      <h5>현재 경연 부문 선택</h5>
      <DropDown
        target={targetContest?.curContestingSection ?? sectorEnum[0]}
        onClick={onClick}
        menuList={sectorEnum}
      />
    </div>
  );
}
