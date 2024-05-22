import { ParticipantInfoType } from "model/ParticipantInfo";
import { RobotType } from "model/Robot";
import DisplayCard from "component/displayBoard/DisplayCard";

import "component/displayBoard/CurRobot.css";

const showKeys = [
  "name",
  "cpu",
  "rom",
  "ram",
  "motorDriver",
  "motor",
  "adc",
  "sensor",
];

export default function CurRobot({
  curParticipantInfo,
}: {
  curParticipantInfo: ParticipantInfoType | undefined;
}) {
  const curRobotInfo: RobotType | undefined = curParticipantInfo?.robot;

  const robotHtmlElem = showKeys.map((key, index) => {
    return (
      <div className="cur-robot-info-list-body-row">
        <div className="cur-robot-info-list-body-col">{key}</div>
        <div className="cur-robot-info-list-body-col">
          {(curRobotInfo && curRobotInfo[key as keyof RobotType]) ?? "--"}
        </div>
      </div>
    );
  });

  return (
    <div className="cur-robot shadow">
      <DisplayCard
        htmlElement={
          <div className="cur-robot-cont">
            <h4 className="cur-robot-title">로봇 정보</h4>
            <div className="cur-robot-info-list">
              <div className="cur-robot-info-list-header">
                <div className="cur-robot-info-list-header-row">
                  <div className="cur-robot-info-list-header-col">
                    부품 분류
                  </div>
                  <div className="cur-robot-info-list-header-col">
                    사용 부품
                  </div>
                </div>
              </div>
              <div className="cur-robot-info-list-body">{robotHtmlElem}</div>
            </div>
          </div>
        }
      />
    </div>
  );
}
