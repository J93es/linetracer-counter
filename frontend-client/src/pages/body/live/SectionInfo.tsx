import { ParticipantType } from "pages/body/live/model/Participant";
import { timeToString } from "pages/tools/timeToString";
import "pages/body/live/SectionInfo.css";

export default function SectionInfo({
  curParticipant,
  participantList,
  selectedSectionSortOption,
  setSelectedSectionSortOption,
}: {
  curParticipant: ParticipantType | undefined;
  participantList: ParticipantType[];
  selectedSectionSortOption: string;
  setSelectedSectionSortOption: React.Dispatch<React.SetStateAction<string>>;
}) {
  const getOrder = (order: number) => {
    if (!order) {
      return "--";
    }
    if (order > 500) {
      return `${order % 500}*`;
    }
    return order;
  };

  const isSameParticipant = (participant: ParticipantType) => {
    return JSON.stringify(participant) === JSON.stringify(curParticipant ?? "");
  };

  return (
    <div className="section-info-container">
      <div className="list-sort-option-selector">
        <div className="dropdown">
          <button
            className="btn dropdown-toggle bg-transparent text-light"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            정렬 방식 :{" "}
            {selectedSectionSortOption === "order" ? "순서" : "순위"}
          </button>
          <ul className="dropdown-menu">
            <li>
              <button
                className="dropdown-item"
                onClick={() => setSelectedSectionSortOption("order")}
              >
                순서
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => setSelectedSectionSortOption("rank")}
              >
                순위
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="participant-table">
        <div className="participant-thead">
          <div className="participant-thead-item">
            {selectedSectionSortOption === "order" ? "순서" : "순위"}
          </div>
          <div className="participant-thead-item">최고 기록</div>
          <div className="participant-thead-item">이름</div>
          <div className="participant-thead-item">로봇 이름</div>
        </div>
        {participantList?.map((participant, index) => (
          <div
            key={`${index}-${participant.name}-${participant.order}-${participant.fastestLapTime}`}
            className={`participant-tbody ${
              isSameParticipant(participant) ? "current-participant" : ""
            }`}
          >
            <div className="participant-tbody-item">
              {selectedSectionSortOption === "order"
                ? getOrder(participant.order)
                : participant.rank}
            </div>
            <div className="participant-tbody-item">
              {timeToString(participant.fastestLapTime)}
            </div>
            <div className="participant-tbody-item">
              {participant.name ?? "--"}
            </div>
            <div className="participant-tbody-item">
              {participant.robotName ?? "--"}
            </div>
          </div>
        ))}

        <div className="extra-info">
          서버와 최대 10초의 delay가 발생할 수 있습니다.
        </div>
        <div className="extra-info">
          순서의 *표시는 참가자가 경연순서를 미루었음을 의미합니다.
        </div>
      </div>
    </div>
  );
}
