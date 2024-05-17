import { useEffect, useState } from "react";

import { ContestType } from "model/Contest";
import { ParticipantType } from "model/Participant";

import { findTargetById } from "tools/utils";

import { SectorRecordType } from "model/SectorRecord";

import ContestTimer from "component/display/ContestTimer";

import "component/display/Index.css";

export default function Display({
  targetContest,
  isContestTimerRunning,
}: {
  targetContest: ContestType | undefined;
  isContestTimerRunning: boolean;
}) {
  const [curSection, setCurSection] = useState<string>(
    targetContest?.curContestingSection ?? ""
  );
  const [curParticipant, setCurParticipant] = useState<
    ParticipantType | undefined
  >();
  const [nextParticipant, setNextParticipant] = useState<
    ParticipantType | undefined
  >();
  const [curSectorRecord, setCurSectorRecord] = useState<
    SectorRecordType | undefined
  >();

  useEffect(() => {
    const curParticipant: ParticipantType = findTargetById(
      targetContest?.curParticipant,
      targetContest?.participantList
    );
    const nextParticipant: ParticipantType = findTargetById(
      targetContest?.nextParticipant,
      targetContest?.participantList
    );
    const sectorRecord: SectorRecordType = findTargetById(
      targetContest?.curSectorRecord,
      curParticipant?.sectorRecordList
    );

    if (!curParticipant) {
      setCurParticipant(undefined);
    } else {
      setCurParticipant(curParticipant);
    }

    if (!nextParticipant) {
      setNextParticipant(undefined);
    } else {
      setNextParticipant(nextParticipant);
    }

    if (!sectorRecord) {
      setCurSectorRecord(undefined);
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
