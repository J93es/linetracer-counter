import { useEffect, useState } from "react";
import { ContestType } from "pages/body/live/model/Contest";
import Loading from "pages/body/live/Loading";
import SelectContestingSection from "pages/body/live/SelectContestingSection";
import SectionInfo from "pages/body/live/SectionInfo";
import { sortTarget } from "pages/tools/sortTargetList";

import "pages/body/live/Index.css";

export default function Live({
  data,
  isLoading,
}: {
  data: ContestType | null;
  isLoading: boolean;
}) {
  const [participantList, setParticipantList] = useState<any[]>([]);
  const [selectedSection, setSelectedSection] = useState<string | null>(
    data?.curContestingSection ?? null
  );
  const [selectedSectionSortOption, setSelectedSectionSortOption] =
    useState<string>("order");

  useEffect(() => {
    let participantList: any[] = [];

    if (selectedSection) {
      participantList = data?.participantListContainer[selectedSection] ?? [];
    } else {
      participantList =
        data?.participantListContainer[data?.curContestingSection ?? ""] ?? [];
      setSelectedSection(data?.curContestingSection ?? null);
    }

    if (selectedSectionSortOption) {
      participantList = sortTarget(participantList, selectedSectionSortOption);
    } else {
      participantList = sortTarget(participantList, "order");
      setSelectedSectionSortOption("order");
    }

    setParticipantList(participantList);
    // eslint-disable-next-line
  }, [data]);

  useEffect(() => {
    let participantList: any[] = [];

    if (selectedSection) {
      participantList = data?.participantListContainer[selectedSection] ?? [];
    }
    if (selectedSectionSortOption) {
      participantList = sortTarget(participantList, selectedSectionSortOption);
    }

    setParticipantList(participantList);
    // eslint-disable-next-line
  }, [selectedSection, selectedSectionSortOption]);

  // const participantList = data?.participantListContainer[selectedSection ?? ""];

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="live-container">
      <SelectContestingSection
        data={data}
        selectedSection={selectedSection}
        setSelectedSection={setSelectedSection}
      />
      <SectionInfo
        curParticipant={data?.curParticipant}
        participantList={participantList as any}
        selectedSectionSortOption={selectedSectionSortOption}
        setSelectedSectionSortOption={setSelectedSectionSortOption}
      />
    </div>
  );
}
