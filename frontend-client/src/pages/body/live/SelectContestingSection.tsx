import "pages/body/live/SelectContestingSection.css";
import { sectorEnum_kor } from "pages/body/live/model/enums/index";
import { ContestType } from "pages/body/live/model/Contest";

export default function SelectContestingSection({
  data,
  selectedSection,
  setSelectedSection,
}: {
  data: ContestType | null;
  selectedSection: string | null;
  setSelectedSection: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const optionList = Object.keys(data?.participantListContainer ?? {}).map(
    (option) => {
      return (
        <div className="option" key={option}>
          <input
            checked={option === selectedSection}
            value={option}
            name="btn"
            type="radio"
            className="input"
            onChange={() => {
              setSelectedSection(option);
            }}
          />
          <div className="btn">
            <span className="span">{sectorEnum_kor[option]}</span>
          </div>
        </div>
      );
    }
  );

  return <div className="wrapper">{optionList}</div>;
}
