import { SectorRecordType } from "pages/admin/model/SectorRecord";
import { defaultRemainingContestTime } from "pages/admin/model/SectorRecord";

import UpdateRemainingContestTimeBtn from "pages/admin/view/manager/operation_menu/manage_remaining_contest_time/UpdateRemainingContestTimeBtn";

import "pages/admin/view/manager/operation_menu/manage_remaining_contest_time/Index.css";

export default function ManageRemainingContestTime({
  setContestUpdateSignal,
  targetSectorRecord,
  disabled,
}: {
  setContestUpdateSignal: React.Dispatch<React.SetStateAction<number>>;
  targetSectorRecord: SectorRecordType | undefined;
  disabled: boolean;
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
          disabled={disabled}
        />
      </div>

      <div className="manage-remaining-contest-time-row-3">
        <UpdateRemainingContestTimeBtn
          setContestUpdateSignal={setContestUpdateSignal}
          targetSectorRecord={targetSectorRecord}
          remainingContestTime={
            (targetSectorRecord?.remainingContestTime ??
              defaultRemainingContestTime) - 60000
          }
          label="1분 삭감"
          btnType="btn-primary"
          disabled={disabled}
        />

        <UpdateRemainingContestTimeBtn
          setContestUpdateSignal={setContestUpdateSignal}
          targetSectorRecord={targetSectorRecord}
          remainingContestTime={
            (targetSectorRecord?.remainingContestTime ??
              defaultRemainingContestTime) + 60000
          }
          label="1분 증가"
          btnType="btn-light"
          disabled={disabled}
        />
      </div>

      <div className="manage-remaining-contest-time-row-4">
        <UpdateRemainingContestTimeBtn
          setContestUpdateSignal={setContestUpdateSignal}
          targetSectorRecord={targetSectorRecord}
          remainingContestTime={
            (targetSectorRecord?.remainingContestTime ??
              defaultRemainingContestTime) - 30000
          }
          label="30초 삭감"
          btnType="btn-primary"
          disabled={disabled}
        />

        <UpdateRemainingContestTimeBtn
          setContestUpdateSignal={setContestUpdateSignal}
          targetSectorRecord={targetSectorRecord}
          remainingContestTime={
            (targetSectorRecord?.remainingContestTime ??
              defaultRemainingContestTime) + 30000
          }
          label="30초 증가"
          btnType="btn-light"
          disabled={disabled}
        />
      </div>
    </div>
  );
}
