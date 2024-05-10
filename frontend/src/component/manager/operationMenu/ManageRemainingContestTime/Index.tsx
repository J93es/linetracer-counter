import { SectorRecordType } from "model/SectorRecord";
import { defaultRemainingContestTime } from "model/SectorRecord";

import UpdateRemainingContestTimeBtn from "component/manager/operationMenu/ManageRemainingContestTime/UpdateRemainingContestTimeBtn";

import "component/manager/operationMenu/ManageRemainingContestTime/Index.css";

export default function ManageRemainingContestTime({
  setContestUpdateSignal,
  targetSectorRecord,
}: {
  setContestUpdateSignal: Function;
  targetSectorRecord: Partial<SectorRecordType>;
}) {
  return (
    <div className="manage-remaining-contest-time">
      <h5 className="manage-remaining-contest-time-row-1">
        남은 경연 시간 관리
      </h5>

      <div className="manage-remaining-contest-time-row-2">
        <UpdateRemainingContestTimeBtn
          setContestUpdateSignal={setContestUpdateSignal}
          targetSectorRecord={targetSectorRecord}
          remainingContestTime={defaultRemainingContestTime}
          label="경연 시간 초기화"
          btnType="btn-warning"
        />
      </div>

      <div className="manage-remaining-contest-time-row-3">
        <UpdateRemainingContestTimeBtn
          setContestUpdateSignal={setContestUpdateSignal}
          targetSectorRecord={targetSectorRecord}
          remainingContestTime={
            (targetSectorRecord.remainingContestTime ??
              defaultRemainingContestTime) - 60000
          }
          label="1분 삭감"
          btnType="btn-primary"
        />

        <UpdateRemainingContestTimeBtn
          setContestUpdateSignal={setContestUpdateSignal}
          targetSectorRecord={targetSectorRecord}
          remainingContestTime={
            (targetSectorRecord.remainingContestTime ??
              defaultRemainingContestTime) + 60000
          }
          label="1분 증가"
          btnType="btn-light"
        />
      </div>

      <div className="manage-remaining-contest-time-row-4">
        <UpdateRemainingContestTimeBtn
          setContestUpdateSignal={setContestUpdateSignal}
          targetSectorRecord={targetSectorRecord}
          remainingContestTime={
            (targetSectorRecord.remainingContestTime ??
              defaultRemainingContestTime) - 30000
          }
          label="30초 삭감"
          btnType="btn-primary"
        />

        <UpdateRemainingContestTimeBtn
          setContestUpdateSignal={setContestUpdateSignal}
          targetSectorRecord={targetSectorRecord}
          remainingContestTime={
            (targetSectorRecord.remainingContestTime ??
              defaultRemainingContestTime) + 30000
          }
          label="30초 증가"
          btnType="btn-light"
        />
      </div>
    </div>
  );
}
