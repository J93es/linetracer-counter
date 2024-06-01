import { useState, useEffect, useCallback } from "react";

import SelectTarget from "component/utils/selectTarget/Index";
import Accordion from "component/utils/Accordion";
import RetouchCounterDeviceLog from "component/manager/counterDeviceLogManager/RetouchCounterDeviceLog";

import DriveRecordDistinction from "model/distinction/DriveRecordDistinction";

import { CounterDeviceLogType } from "model/CounterDeviceLog";

import { SerialPortController } from "controller/counterDevice/SerialPortController";
import { CounterDeviceStateController } from "controller/counterDevice/CounterDeviceStateController";

const serialPortController = new SerialPortController();
const counterDeviceStateController = new CounterDeviceStateController();

export default function CounterDeviceLogManager({
  counterDeviceLogList,
  setCounterDeviceLogListUpdateSignal,
  setContestUpdateSignal,
  isBlocked,
  hostId,
}: {
  counterDeviceLogList: CounterDeviceLogType[] | undefined;
  setCounterDeviceLogListUpdateSignal: Function;
  setContestUpdateSignal: Function;
  isBlocked: boolean;
  hostId: string | undefined;
}) {
  const [isCounterDevicePortOpen, setIsCounterDevicePortOpen] = useState(
    serialPortController.isPortOpen()
  );
  const [targetCounterDeviceLog, setTargetCounterDeviceLog] = useState<
    CounterDeviceLogType | undefined
  >();

  const counterDeviceRead = useCallback(() => {
    const func = async () => {
      if (!serialPortController.isPortOpen()) {
        return;
      }
      const readValue = await serialPortController.read();

      counterDeviceRead();

      const signal = await counterDeviceStateController.stateMachine(
        readValue,
        Date.now(),
        hostId || ""
      );
      if (signal === "EMPTY_VALUE") {
        console.log("counterDeviceRead: EMPTY_VALUE");
        return;
      }
      if (signal === "EMPTY_CONTEST_ID") {
        console.log("counterDeviceRead: EMPTY_CONTEST_ID");
        return;
      }
      if (signal === "DRIVE_START") {
        setContestUpdateSignal((prev: number) => (prev + 1) % 1000);
        return;
      }
      if (signal === "DRIVE_END") {
        setContestUpdateSignal((prev: number) => (prev + 1) % 1000);
        setCounterDeviceLogListUpdateSignal(
          (prev: number) => (prev + 1) % 1000
        );
        return;
      }
    };
    func();
  }, [setContestUpdateSignal, setCounterDeviceLogListUpdateSignal, hostId]);

  useEffect(() => {
    if (isCounterDevicePortOpen) {
      counterDeviceRead();
      return;
    }
  }, [isCounterDevicePortOpen, counterDeviceRead]);

  let retouchHtml = null;
  if (isBlocked) {
    retouchHtml = <p>수정이 불가능 합니다.</p>;
  } else if (!counterDeviceLogList) {
    retouchHtml = <p>계수기 로그가 없습니다.</p>;
  } else if (!targetCounterDeviceLog) {
    retouchHtml = <p>계수기 로그를 선택하세요.</p>;
  } else {
    retouchHtml = (
      <RetouchCounterDeviceLog
        setCounterDeviceLogListUpdateSignal={
          setCounterDeviceLogListUpdateSignal
        }
        targetCounterDeviceLog={targetCounterDeviceLog}
      />
    );
  }

  return (
    <Accordion
      id="counter-device-log-manager"
      title="계수기 로그 수정"
      body={
        <div className="counter-device-log-manager">
          <SelectTarget
            target={targetCounterDeviceLog}
            setTarget={setTargetCounterDeviceLog}
            listOfObject={counterDeviceLogList}
            DistintionClass={DriveRecordDistinction}
            setUpdateSignal={() => {
              setCounterDeviceLogListUpdateSignal(
                (prev: number) => (prev + 1) % 1000
              );
            }}
            disabled={false}
          />

          {retouchHtml}
        </div>
      }
    />
  );
}
