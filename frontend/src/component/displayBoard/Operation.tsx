import { useEffect, useState } from "react";

import { ContestType } from "model/Contest";
import { ParticipantType } from "model/Participant";
import ParticipantInfo, { ParticipantInfoType } from "model/ParticipantInfo";

import { ContestController } from "controller/fetch/ContestController";

import { findTargetById } from "tools/utils";
import { filterParticipantList } from "tools/filterTargetList";

import { SectorRecordType } from "model/SectorRecord";

import View from "component/displayBoard/view/Index";

import listenServerSseRepo from "component/displayBoard/controller/repository/listenServerSseRepo";

const contestController = new ContestController();

export default function Operation({
  targetContestId,
}: {
  targetContestId: string | undefined;
}) {
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

  // // set targetContest when updateSignal, id is updated
  // useEffect(() => {
  //   const func = async () => {
  //     const contest = await contestController.get(targetContestId);
  //     setTargetContest(contest);
  //   };
  //   func();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [targetContestId]);

  // listen to server
  useEffect(() => {
    listenServerSseRepo.subscribeToServer((data: any) => {
      setTargetContest(data);
    });
  }, []);

  useEffect(() => {
    const isContestTimerRunning = targetContest?.isContestTimerRunning ?? false;
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
    const participantList = filterParticipantList(
      targetContest?.participantList ?? [],
      {
        sectorRecordBy: "contestSector",
        sectorRecordValue: curSection,
      }
    );
    const participantInfoList: ParticipantInfoType[] | undefined =
      participantList.map((participant) => {
        return new ParticipantInfo(participant, curSection);
      });

    setIsContestTimerRunning(isContestTimerRunning);

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
