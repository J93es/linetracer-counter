import { useEffect, useState, useRef } from "react";

import { ContestType } from "model/Contest";
import { ParticipantType } from "model/Participant";

import { findTargetBy_id, isEmptyObject } from "tools/utils";

import { SectorRecordType } from "model/SectorRecord";

import ContestTimer from "component/display/ContestTimer";

import "component/display/Index.css";

export default function Display({
  targetContest,
  isContestTimerRunning,
}: {
  targetContest: Partial<ContestType>;
  isContestTimerRunning: boolean;
}) {
  const [curSection, setCurSection] = useState<string>(
    targetContest.curContestingSection ?? ""
  );
  const [curParticipant, setCurParticipant] = useState<
    Partial<ParticipantType>
  >({});
  const [nextParticipant, setNextParticipant] = useState<
    Partial<ParticipantType>
  >({});
  const [curSectorRecord, setCurSectorRecord] = useState<
    Partial<SectorRecordType>
  >({});

  useEffect(() => {
    const curParticipant: Partial<ParticipantType> = findTargetBy_id(
      targetContest.curParticipant ?? "",
      targetContest.participantList ?? []
    );
    const nextParticipant: Partial<ParticipantType> = findTargetBy_id(
      targetContest.nextParticipant ?? "",
      targetContest.participantList ?? []
    );
    const sectorRecord: Partial<SectorRecordType> = findTargetBy_id(
      targetContest.curSectorRecord ?? "",
      curParticipant?.sectorRecordList ?? []
    );

    if (isEmptyObject(curParticipant)) {
      setCurParticipant({});
    } else {
      setCurParticipant(curParticipant);
    }

    if (isEmptyObject(nextParticipant)) {
      setNextParticipant({});
    } else {
      setNextParticipant(nextParticipant);
    }

    if (isEmptyObject(sectorRecord)) {
      setCurSectorRecord({});
    } else {
      setCurSectorRecord(sectorRecord);
    }
  }, [targetContest]);

  return (
    <div className="display">
      <ContestTimer
        targetContest={targetContest}
        curSectorRecord={curSectorRecord}
        isContestTimerRunning={isContestTimerRunning}
      />
    </div>
  );
}
