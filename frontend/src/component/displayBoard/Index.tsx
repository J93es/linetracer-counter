import { useEffect, useState } from "react";

import { ContestType } from "model/Contest";
import { ParticipantType } from "model/Participant";
import ParticipantInfo, { ParticipantInfoType } from "model/ParticipantInfo";

import { findTargetById } from "tools/utils";

import { SectorRecordType } from "model/SectorRecord";

import ContestTimer from "component/displayBoard/ContestTimer";
import CurRanking from "component/displayBoard/CurRanking";
import CurParticipant from "component/displayBoard/CurParticipant";
import CurRobot from "component/displayBoard/CurRobot";

import "component/displayBoard/Index.css";

export default function DisplayBoard({
  targetContest,
  isContestTimerRunning,
}: {
  targetContest: ContestType | undefined;
  isContestTimerRunning: boolean;
}) {
  const [curSection, setCurSection] = useState<string>(
    targetContest?.curContestingSection ?? ""
  );
  const [curSectorRecord, setCurSectorRecord] = useState<
    SectorRecordType | undefined
  >();
  const [curParticipantInfo, setCurParticipantInfo] = useState<
    ParticipantInfoType | undefined
  >();
  const [nextParticipantInfo, setNextParticipantInfo] = useState<
    ParticipantInfoType | undefined
  >();
  const [participantInfoList, setParticipantInfoList] = useState<
    ParticipantInfoType[] | undefined
  >([]);

  useEffect(() => {
    const curSection = targetContest?.curContestingSection ?? "";
    const curParticipant: ParticipantType = findTargetById(
      targetContest?.curParticipant,
      targetContest?.participantList
    );
    const sectorRecord: SectorRecordType = findTargetById(
      targetContest?.curSectorRecord,
      curParticipant?.sectorRecordList
    );
    const nextParticipant: ParticipantType = findTargetById(
      targetContest?.nextParticipant,
      targetContest?.participantList
    );
    const participantInfoList: ParticipantInfoType[] | undefined =
      targetContest?.participantList.map((participant) => {
        return new ParticipantInfo(participant, curSection);
      });

    if (!curParticipant) {
      setCurParticipantInfo(undefined);
    } else {
      setCurParticipantInfo(new ParticipantInfo(curParticipant, curSection));
    }

    if (!nextParticipant) {
      setNextParticipantInfo(undefined);
    } else {
      setNextParticipantInfo(new ParticipantInfo(nextParticipant, curSection));
    }
    if (!sectorRecord) {
      setCurSectorRecord(undefined);
    } else {
      setCurSectorRecord(sectorRecord);
    }

    if (!participantInfoList) {
      setParticipantInfoList(undefined);
    } else {
      setParticipantInfoList(participantInfoList);
    }

    // eslint-disable-next-line
  }, [targetContest]);

  return (
    <div className="display-board">
      <div className="display-board-col-1">
        <ContestTimer
          targetContest={targetContest}
          curSectorRecord={curSectorRecord}
          isContestTimerRunning={isContestTimerRunning}
        />

        <ContestTimer
          targetContest={targetContest}
          curSectorRecord={curSectorRecord}
          isContestTimerRunning={isContestTimerRunning}
        />

        <CurRanking participantInfoList={participantInfoList} />
      </div>
      <div className="display-board-col-2">
        <CurParticipant curParticipantInfo={curParticipantInfo} />
      </div>
      <div className="display-board-col-3">
        <CurRobot curParticipantInfo={curParticipantInfo} />
      </div>
    </div>
  );
}
