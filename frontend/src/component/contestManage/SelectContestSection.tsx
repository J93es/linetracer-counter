import { ContestType } from "model/Contest";

import { ContestController } from "controller/ContestController";

import { sectorEnum } from "component/data";

const contestController = new ContestController();

export default function SelectContestSection({
  setContestUpdateSignal,
  targetContestId,
  targetContest,
}: {
  setContestUpdateSignal: Function;
  targetContestId: string;
  targetContest: Partial<ContestType>;
}) {
  const sectorMenuList = getHtmlSectorMenuList(
    targetContestId,
    setContestUpdateSignal
  );

  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        현재 경연 부문: {targetContest?.curContestingSection}
      </button>
      <ul className="dropdown-menu">{sectorMenuList}</ul>
    </div>
  );
}

function getHtmlSectorMenuList(
  targetContestId: string,
  setContestUpdateSignal: Function
) {
  return sectorEnum.map((sector: string) => {
    return (
      <li key={sector}>
        <a
          href="#!"
          role="button"
          className="dropdown-item"
          onClick={() => {
            const func = async () => {
              console.log(
                await contestController.patchContest(targetContestId, {
                  _id: targetContestId,
                  curContestingSection: sector,
                })
              );
              setContestUpdateSignal((prev: number) => (prev + 1) % 1000);
            };
            func();
          }}
        >
          {sector}
        </a>
      </li>
    );
  });
}
