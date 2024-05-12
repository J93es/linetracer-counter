import { useEffect, useState, useRef } from "react";

import { ContestType } from "model/Contest";
import { ParticipantType } from "model/Participant";

import { getRemainingTime } from "tools/getRemainingTime";
import { findTargetBy_id } from "tools/utils";

import { SectorRecordType } from "model/SectorRecord";

import "component/timer/ContestTimer.css";

export default function ContestTimer({
  targetContest,
}: {
  targetContest: Partial<ContestType>;
}) {
  const [isContestTimerRunning, setIsContestTimerRunning] = useState<boolean>(
    targetContest.isContestTimerRunning || false
  );
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [originRemainingTime, setOriginRemainingTime] = useState<
    number | undefined
  >(0);
  const [timerStartTime, setTimerStartTime] = useState<number | undefined>(-1);
  const requestRef = useRef<number>(0);

  useEffect(() => {
    const participant: Partial<ParticipantType> = findTargetBy_id(
      targetContest.curParticipnatId || "",
      targetContest.participantList || []
    );
    const sectorRecord: Partial<SectorRecordType> = findTargetBy_id(
      targetContest.curSectorRecordId || "",
      participant?.sectorRecordList || []
    );

    setRemainingTime(sectorRecord.remainingContestTime ?? 0);
    setIsContestTimerRunning(targetContest.isContestTimerRunning || false);
    setOriginRemainingTime(sectorRecord.remainingContestTime);
    setTimerStartTime(targetContest.contestTimerStartTime || -1);
  }, [targetContest]);

  const timerAnimation = (prevTime: number) => {
    let timeStemp = prevTime;
    const curTime = Date.now();
    const remainingTime = getRemainingTime(
      originRemainingTime,
      timerStartTime,
      curTime
    );

    if (curTime - prevTime > 50) {
      setRemainingTime(remainingTime);
      timeStemp = curTime;
    }

    if (!isContestTimerRunning || remainingTime <= 0) {
      cancelAnimationFrame(requestRef.current);
      return;
    }
    requestRef.current = requestAnimationFrame(() => {
      timerAnimation(timeStemp);
    });
  };

  useEffect(() => {
    if (!isContestTimerRunning || remainingTime <= 0) {
      return;
    }
    requestRef.current = requestAnimationFrame(() => {
      timerAnimation(Date.now());
    });

    return () => cancelAnimationFrame(requestRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isContestTimerRunning]);

  return (
    <div className="contest-timer">
      <h4>남은 경연 시간</h4>
      <div className="show-time">
        <div className="show-time-minute">
          {Math.floor(remainingTime / 60000)}분
        </div>
        <div className="show-time-second">
          {Math.floor((remainingTime % 60000) / 1000)}초
        </div>
        <div className="show-time-ms">
          {String(Math.floor(remainingTime % 1000)).padStart(3, "0")}(ms)
        </div>
      </div>
    </div>
  );
}
