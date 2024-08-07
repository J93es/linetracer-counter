import { useEffect, useState } from "react";

import { SectorRecordType } from "pages/admin/model/SectorRecord";

import SelectTarget from "pages/admin/component/select_target/Index";
import Accordion from "pages/admin/component/Accordion";
import RetouchCounterDeviceLog from "pages/admin/view/manager/counter_device_log_manager/RetouchCounterDeviceLog";
import DropDown from "pages/admin/component/DropDown";
import DeleteCounterDeviceLogBtn from "pages/admin/view/manager/counter_device_log_manager/DeleteCounterDeviceLog";
import AddDriveRecord from "pages/admin/view/manager/counter_device_log_manager/AddDriveRecord";
import CounterDevice from "pages/admin/view/manager/counter_device_log_manager/CounterDevice";

import DriveRecordDistinction from "pages/admin/model/distinction/DriveRecordDistinction";

import { CounterDeviceLogType } from "pages/admin/model/CounterDeviceLog";
import { counterDeviceLogEditMenuEnum } from "pages/admin/model/enums/index";
import { isEmptyArray } from "pages/tools/utils";

export default function CounterDeviceLogManager({
  counterDeviceLogList,
  setCounterDeviceLogListUpdateSignal,
  setContestUpdateSignal,
  isBlocked,
  hostId,
  targetSectorRecord,
}: {
  counterDeviceLogList: CounterDeviceLogType[] | undefined;
  setCounterDeviceLogListUpdateSignal: React.Dispatch<
    React.SetStateAction<number>
  >;
  setContestUpdateSignal: React.Dispatch<React.SetStateAction<number>>;
  isBlocked: boolean;
  hostId: string | undefined;
  targetSectorRecord: SectorRecordType | undefined;
}) {
  const [editMenu, setEditMenu] = useState<string>(
    counterDeviceLogEditMenuEnum[0]
  );

  const [targetCounterDeviceLog, setTargetCounterDeviceLog] = useState<
    CounterDeviceLogType | undefined
  >();

  useEffect(() => {
    if (!counterDeviceLogList || isEmptyArray(counterDeviceLogList)) {
      setTargetCounterDeviceLog(undefined);
      return;
    }
    setTargetCounterDeviceLog(
      counterDeviceLogList[counterDeviceLogList.length - 1]
    );
  }, [counterDeviceLogList]);

  let retouchHtml = null;
  if (editMenu === "계수기 로그 수정") {
    retouchHtml = (
      <RetouchCounterDeviceLog
        setCounterDeviceLogListUpdateSignal={
          setCounterDeviceLogListUpdateSignal
        }
        targetCounterDeviceLog={targetCounterDeviceLog}
      />
    );
  } else if (editMenu === "계수기 로그 삭제") {
    retouchHtml = (
      <DeleteCounterDeviceLogBtn
        setCounterDeviceLogUpdateSignal={setCounterDeviceLogListUpdateSignal}
        targetCounterDeviceLog={targetCounterDeviceLog}
      />
    );
  } else if (editMenu === "계수기 장치 관리") {
    retouchHtml = (
      <CounterDevice
        setContestUpdateSignal={setContestUpdateSignal}
        setCounterDeviceLogListUpdateSignal={
          setCounterDeviceLogListUpdateSignal
        }
        hostId={hostId}
      />
    );
  } else if (editMenu === "주행 기록에 추가" && targetSectorRecord) {
    retouchHtml = (
      <AddDriveRecord
        targetCounterDeviceLog={targetCounterDeviceLog}
        targetSectorRecordId={targetSectorRecord?.id ?? ""}
        setContestUpdateSignal={setContestUpdateSignal}
      />
    );
  } else if (editMenu === "주행 기록에 추가" && !targetSectorRecord) {
    retouchHtml = <p>부문을 선택하세요.</p>;
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

          <DropDown
            target={editMenu}
            onClick={setEditMenu}
            menuList={counterDeviceLogEditMenuEnum}
          />

          {retouchHtml}
        </div>
      }
    />
  );
}
