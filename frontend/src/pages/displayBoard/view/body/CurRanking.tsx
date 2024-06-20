import { ParticipantInfoType } from "pages/displayBoard/model/ParticipantInfo";
import { sortTarget } from "pages/tools/sortTargetList";
import { timeToString } from "pages/tools/timeToString";

import DisplayCard from "pages/displayBoard/component/DisplayCard";

import "pages/displayBoard/view/body/CurRanking.css";

const showLen = 5;

export default function CurRanking({
  participantInfoList,
}: {
  participantInfoList: ParticipantInfoType[] | undefined;
}) {
  console.log("participantInfoList", participantInfoList);
  const copyedList = JSON.parse(JSON.stringify(participantInfoList ?? []));
  const sortedList: ParticipantInfoType[] = sortTarget(
    copyedList,
    "fastestLapTime"
  );
  const slicedList = sortedList.slice(0, showLen);

  const listBodyHtml = slicedList.map((participantInfo, index) => {
    return (
      <div className="cur-ranking-list-body-row" key={index}>
        <div className={`cur-ranking-list-body-col`}>{index + 1}</div>
        <div className={`cur-ranking-list-body-col`}>
          {participantInfo?.name}
        </div>
        <div className={`cur-ranking-list-body-item-col-3`}>
          {timeToString(participantInfo.fastestLapTime)}
        </div>
      </div>
    );
  });

  return (
    <div className="cur-ranking shadow">
      <DisplayCard
        htmlElement={
          <div className="cur-ranking-cont">
            <div className="cur-ranking-title">실시간 경연 순위</div>
            <div className="cur-ranking-list">
              <div className="cur-ranking-list-header-row">
                <div className="cur-ranking-list-header-col">순위</div>
                <div className="cur-ranking-list-header-col">이름</div>
                <div className="cur-ranking-list-header-col">기록</div>
              </div>
              {listBodyHtml}
            </div>
          </div>
        }
      />
    </div>

    // <List
    //   title="실시간 경연 순위"
    //   headerList={["순위", "이름", "기록"]}
    //   bodyList={listElement ?? [[""]]}
    // />
  );
}
