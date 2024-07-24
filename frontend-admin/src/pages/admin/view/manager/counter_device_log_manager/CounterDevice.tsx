import { useState, useEffect } from "react";

import { SerialPortController } from "pages/admin/controller/counter_device/SerialPortController";
import { CounterDeviceStateController } from "pages/admin/controller/counter_device/CounterDeviceStateController";

import { counterDeviceCode } from "config";

const serialPortController = new SerialPortController();
const counterDeviceStateController = new CounterDeviceStateController();

export default function CounterDevice({
  setContestUpdateSignal,
  setCounterDeviceLogListUpdateSignal,
  hostId,
}: {
  setContestUpdateSignal: React.Dispatch<React.SetStateAction<number>>;
  setCounterDeviceLogListUpdateSignal: React.Dispatch<
    React.SetStateAction<number>
  >;
  hostId: string | undefined;
}) {
  const [isReading, setIsReading] = useState(false);
  const [isPortOpened, setIsPortOpened] = useState(false);
  const [serialReadSignal, setSerialReadSignal] = useState(0);
  const [msg, setMsg] = useState("");
  const [isWriteDisabled, setIsWriteDisabled] = useState(false);

  const keepUntilNewValue = async (): Promise<number> => {
    if (!serialPortController.isPortOpened() || isReading) {
      return 1;
    }
    return new Promise((resolve) => {
      const checkCondition = () => {
        if (!serialPortController.isBufferEmpty()) {
          if (!serialPortController.isKeepReading()) {
            resolve(1);
          }
          resolve(0);
        }
        setTimeout(checkCondition, 100);
      };
      checkCondition();
    });
  };

  const counterDeviceRead = () => {
    const func = async (prevHostId: string | undefined) => {
      if (!serialPortController.isPortOpened() || isReading) {
        return;
      }
      setIsReading(true);
      const returnSig = await keepUntilNewValue();
      setIsReading(false);

      if (returnSig || prevHostId !== hostId) {
        return;
      }

      const data = serialPortController.shiftBuffer();
      console.log(data);
      setSerialReadSignal((prev: number) => (prev + 1) % 1000);
      if (!data) {
        return;
      }

      const signal = await counterDeviceStateController.stateMachine(
        data.value,
        data.writeTime,
        hostId || ""
      );

      if (signal === "EMPTY_VALUE") {
        setMsg("EMPTY_VALUE");
        return;
      }
      if (signal === "EMPTY_CONTEST_ID") {
        setMsg("EMPTY_CONTEST_ID");
        return;
      }
      if (signal === "DRIVE_START") {
        setContestUpdateSignal((prev: number) => (prev + 1) % 1000);
        setMsg("DRIVE_START");
        return;
      }
      if (signal === "DRIVE_END") {
        setContestUpdateSignal((prev: number) => (prev + 1) % 1000);
        setCounterDeviceLogListUpdateSignal(
          (prev: number) => (prev + 1) % 1000
        );
        setMsg("DRIVE_END");
        return;
      }
    };
    func(hostId);
  };

  useEffect(() => {
    if (serialPortController.isPortOpened() && !isReading) {
      counterDeviceRead();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPortOpened, isReading, serialReadSignal]);

  return (
    <div>
      {isPortOpened ? (
        <button
          type="button"
          className="btn btn-warning"
          onClick={() => {
            const func = async () => {
              await serialPortController.closePort();
              setIsPortOpened(false);
            };
            func();
          }}
        >
          계수기 포트 닫기
        </button>
      ) : (
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            const func = async () => {
              await serialPortController.openPort();
              serialPortController.readUntilClosed();
              setIsPortOpened(true);
            };
            func();
          }}
        >
          계수기 포트 열기
        </button>
      )}
      <div>{msg}</div>
      {isPortOpened ? (
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            setSerialReadSignal((prev: number) => (prev + 1) % 1000);
          }}
        >
          계수기 수동 읽기 시작
        </button>
      ) : null}

      <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          const func = async () => {
            setIsWriteDisabled(true);
            await serialPortController.write(
              new Uint8Array([
                counterDeviceCode.head.charCodeAt(0),
                counterDeviceCode.driveReset.charCodeAt(0),
              ])
            );
            setTimeout(() => {
              setIsWriteDisabled(false);
            }, 1000);
          };
          func();
        }}
        disabled={isWriteDisabled}
      >
        계수기 리셋
      </button>
    </div>
  );
}
