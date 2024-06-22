import { useEffect, useState } from "react";

import ContestType from "pages/display_board/model/Contest";
import { ParticipantInfoType } from "pages/display_board/model/ParticipantInfo";

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
  const [curParticipantInfo, setCurParticipantInfo] = useState<
    ParticipantInfoType | undefined
  >();
  const [nextParticipantInfo, setNextParticipantInfo] = useState<
    ParticipantInfoType | undefined
  >();
  const [participantInfoList, setParticipantInfoList] = useState<
    ParticipantInfoType[] | undefined
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

    setCurParticipantInfo(targetContest?.curParticipant);

    setNextParticipantInfo(targetContest?.nextParticipant);

    setCurSectorRecord(targetContest?.curSectorRecord);

    setParticipantInfoList(targetContest?.participantInfoList);
  }, [targetContest]);

  return (
    <View
      targetContest={targetContest}
      isContestTimerRunning={isContestTimerRunning}
      curSectorRecord={curSectorRecord}
      curParticipantInfo={curParticipantInfo}
      nextParticipantInfo={nextParticipantInfo}
      participantInfoList={participantInfoList}
    />
  );
}
