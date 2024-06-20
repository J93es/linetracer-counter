import { useEffect, useState } from "react";

import ContestType from "component/displayBoard/model/Contest";
import { ParticipantInfoType } from "component/displayBoard/model/ParticipantInfo";

import { SectorRecordType } from "component/displayBoard/model/SectorRecord";

import View from "component/displayBoard/view/Index";

import listenServerSseRepo from "component/displayBoard/controller/repository/listenServerSseRepo";

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
