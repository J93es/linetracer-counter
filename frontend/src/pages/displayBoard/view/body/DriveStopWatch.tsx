import { useEffect, useState, useRef } from "react";

import { ContestType } from "pages/displayBoard/model/Contest";

import DisplayCard from "pages/displayBoard/component/DisplayCard";

import "pages/displayBoard/view/body/DriveStopWatch.css";

export default function DriveStopWatch({
  targetContest,
}: {
  targetContest: ContestType | undefined;
}) {
  const [recordTime, setRecordTime] = useState<number>(0);
  const [isDriveStopWatchRunning, setIsDriveStopWatchRunning] =
    useState<boolean>(false);
  const [timerStartTime, setTimerStartTime] = useState<number>(-1);
  const requestRef = useRef<number>(0);

  useEffect(() => {
    setIsDriveStopWatchRunning(targetContest?.isDriveStopWatchRunning ?? false);
    setTimerStartTime(targetContest?.driveStartTime ?? -1);
    if (!targetContest?.isDriveStopWatchRunning) {
      setRecordTime(targetContest?.latestDriveRecordTime ?? 0);
    }
  }, [targetContest]);

  const timerAnimation = (prevTime: number) => {
    let timeStemp = prevTime;
    const curTime = Date.now();
    const recordTime = curTime - timerStartTime;

    if (!isDriveStopWatchRunning || recordTime <= 0) {
      cancelAnimationFrame(requestRef.current);
      return;
    }

    if (curTime - prevTime > 20) {
      setRecordTime(recordTime);
      timeStemp = curTime;
    }

    requestRef.current = requestAnimationFrame(() => {
      timerAnimation(timeStemp);
    });
  };

  useEffect(() => {
    if (!isDriveStopWatchRunning || recordTime <= 0) {
      return;
    }
    requestRef.current = requestAnimationFrame(() => {
      timerAnimation(Date.now());
    });

    return () => cancelAnimationFrame(requestRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDriveStopWatchRunning]);

  return (
    <div className="drive-stopwatch shadow">
      <DisplayCard
        htmlElement={
          <>
            <h4 className="record-time-title">주행 기록</h4>
            <div className="record-time-item">
              <div className="record-minute">
                <div className="record-minute-num">
                  {Math.floor(recordTime / 60000)}
                </div>
                <div className="record-minute-str">분</div>
              </div>

              <div className="record-second">
                <div className="record-second-num">
                  {String(Math.floor((recordTime % 60000) / 1000)).padStart(
                    2,
                    "0"
                  )}
                </div>
                <div className="record-second-str">초</div>
              </div>

              <div className="record-ms">
                {String(Math.floor(recordTime % 1000)).padStart(3, "0")}
              </div>
            </div>
          </>
        }
      />
    </div>
  );
}
