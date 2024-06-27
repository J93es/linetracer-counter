import { useEffect, useState } from "react";

import ContestType from "pages/display_board/model/Contest";
import { ParticipantType } from "pages/display_board/model/Participant";

import { SectorRecordType } from "pages/display_board/model/SectorRecord";

import View from "pages/display_board/view/Index";

import listenServerSseRepo from "pages/display_board/controller/listen_server/listenServerSseRepo";

export default function DisplayBoard() {
  const [targetContest, setTargetContest] = useState<ContestType | undefined>(
    undefined
  );
  const [isContestTimerRunning, setIsContestTimerRunning] =
    useState<boolean>(false);
  const [curSectorRecord, setCurSectorRecord] = useState<
    SectorRecordType | undefined
  >();
  const [curParticipant, setCurParticipant] = useState<
    ParticipantType | undefined
  >();
  const [nextParticipant, setNextParticipant] = useState<
    ParticipantType | undefined
  >();
  const [participantList, setParticipantList] = useState<
    ParticipantType[] | undefined
  >([]);

  // listen to server
  useEffect(() => {
    listenServerSseRepo.subscribeToServer((data: any) => {
      setTargetContest(data);
    });
  }, []);

  useEffect(() => {
    const isContestTimerRunning = targetContest?.isContestTimerRunning ?? false;

    const curSection = targetContest?.curContestingSection ?? "";

    setIsContestTimerRunning(isContestTimerRunning);

    setCurParticipant(targetContest?.curParticipant);

    setNextParticipant(targetContest?.nextParticipant);

    setCurSectorRecord(targetContest?.curSectorRecord);

    setParticipantList(targetContest?.participantList);
  }, [targetContest]);

  return (
    <View
      targetContest={targetContest}
      isContestTimerRunning={isContestTimerRunning}
      curSectorRecord={curSectorRecord}
      curParticipant={curParticipant}
      nextParticipant={nextParticipant}
      participantList={participantList}
    />
  );
}
