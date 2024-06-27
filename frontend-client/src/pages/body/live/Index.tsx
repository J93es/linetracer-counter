import { useEffect, useState } from "react";
import { ContestType } from "pages/body/live/model/Contest";
import Loading from "pages/body/live/Loading";
import SelectContestingSection from "pages/body/live/SelectContestingSection";
import SectionInfo from "pages/body/live/SectionInfo";

import "pages/body/live/Index.css";

export default function Live({
  data,
  isLoading,
}: {
  data: ContestType | null;
  isLoading: boolean;
}) {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedSection) {
      setSelectedSection(data?.curContestingSection ?? null);
    }
  }, [selectedSection, data]);

  const participantList = data?.participantListContainer[selectedSection ?? ""];

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
      <SectionInfo participantList={participantList as any} />
    </div>
  );
}
