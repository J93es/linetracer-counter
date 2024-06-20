import { useEffect, useState, useRef } from "react";

import { ContestType } from "component/displayBoard/model/Contest";

import { getRemainingTime } from "component/admin/tools/getRemainingTime";

import { SectorRecordType } from "component/displayBoard/model/SectorRecord";
import DisplayCard from "component/displayBoard/view/body/DisplayCard";

import "component/displayBoard/view/body/ContestTimer.css";

export default function ContestTimer({
  targetContest,
  curSectorRecord,
  isContestTimerRunning,
}: {
  targetContest: ContestType | undefined;
  curSectorRecord: SectorRecordType | undefined;
  isContestTimerRunning: boolean;
}) {
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [originRemainingTime, setOriginRemainingTime] = useState<
    number | undefined
  >(0);
  const [timerStartTime, setTimerStartTime] = useState<number | undefined>(-1);
  const requestRef = useRef<number>(0);

  useEffect(() => {
    setRemainingTime(curSectorRecord?.remainingContestTime ?? 0);
    setOriginRemainingTime(curSectorRecord?.remainingContestTime);
    setTimerStartTime(targetContest?.contestTimerStartTime ?? -1);
  }, [targetContest, curSectorRecord]);

  const timerAnimation = (prevTime: number) => {
    let timeStemp = prevTime;
    const curTime = Date.now();
    const remainingTime = getRemainingTime(
      originRemainingTime,
      timerStartTime,
      curTime
    );

    if (!isContestTimerRunning || remainingTime <= 0) {
      cancelAnimationFrame(requestRef.current);
      return;
    }

    if (curTime - prevTime > 20) {
      setRemainingTime(remainingTime);
      timeStemp = curTime;
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
    <div className="contest-timer shadow">
      <DisplayCard
        htmlElement={
          <>
            <h4 className="remaining-time-title">남은 경연 시간</h4>
            <div className="remaining-time-item">
              <div className="remaining-minute">
                <div className="remaining-minute-num">
                  {Math.floor(remainingTime / 60000)}
                </div>
                <div className="remaining-minute-str">분</div>
              </div>

              <div className="remaining-second">
                <div className="remaining-second-num">
                  {String(Math.floor((remainingTime % 60000) / 1000)).padStart(
                    2,
                    "0"
                  )}
                </div>
                <div className="remaining-second-str">초</div>
              </div>

              <div className="remaining-ms">
                {String(Math.floor(remainingTime % 1000)).padStart(3, "0")}
              </div>
            </div>
          </>
        }
      />
    </div>
  );
}
