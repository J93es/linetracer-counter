import { ParticipantInfoType } from "model/ParticipantInfo";
import DisplayCard from "component/displayBoard/DisplayCard";

import { timeToString } from "component/displayBoard/tools/timeToString";

import "component/displayBoard/CurParticipant.css";

const showLen = 10;

export default function CurParticipant({
  curParticipantInfo,
}: {
  curParticipantInfo: ParticipantInfoType | undefined;
}) {
  const slicedList = curParticipantInfo?.driveRecordList.slice(0, showLen);

  const listBodyHtml = slicedList?.map((driveRecord, index) => {
    return (
      <div className="cur-particiapnt-drive-record-list-body-row" key={index}>
        <div className={`cur-particiapnt-drive-record-list-body-col`}>
          {timeToString(driveRecord?.recordTime)}
        </div>
        <div className={`cur-particiapnt-drive-record-list-body-col`}>
          {driveRecord?.type ?? "--"}
        </div>
      </div>
    );
  });

  return (
    <div className="cur-participant shadow">
      <DisplayCard
        htmlElement={
          <div className="cur-participant-cont">
            <h4 className="cur-participant-title">현재 참가자</h4>

            <div className="cur-particiapnt-name">
              {curParticipantInfo?.name ?? "--"}
            </div>

            <div className="cur-particiapnt-association">
              {curParticipantInfo?.association ?? "--"}
            </div>

            <div className="cur-particiapnt-drive-record-list">
              <div className="cur-particiapnt-drive-record-list-title">
                주행기록
              </div>
              <div className="cur-particiapnt-drive-record-list-header-row">
                <div className="cur-particiapnt-drive-record-list-header-col">
                  시간
                </div>
                <div className="cur-particiapnt-drive-record-list-header-col">
                  상태
                </div>
              </div>
              <div className="cur-particiapnt-drive-record-list-body">
                {listBodyHtml}
              </div>
            </div>

            <div className="cur-particiapnt-speech">
              <div className="cur-particiapnt-speech-title">하고 싶은 말</div>
              <div className="cur-particiapnt-speech-item">
                "{curParticipantInfo?.speech ?? ""}"
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
}
