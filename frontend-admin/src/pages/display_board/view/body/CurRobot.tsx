import { ParticipantType } from "pages/display_board/model/Participant";
import { RobotType } from "pages/display_board/model/Robot";
import DisplayCard from "pages/display_board/component/DisplayCard";

import "pages/display_board/view/body/CurRobot.css";
import { text } from "stream/consumers";

const showKeys = [
  { key: "name", text: "로봇 이름" },
  { key: "cpu", text: "CPU" },
  { key: "rom", text: "ROM" },
  { key: "RAM", text: "RAM" },
  { key: "motorDriver", text: "모터 드라이버" },
  { key: "motor", text: "모터" },
  { key: "adc", text: "ADC" },
  { key: "sensor", text: "센서" },
];

export default function CurRobot({
  curParticipant,
}: {
  curParticipant: ParticipantType | undefined;
}) {
  const curRobotInfo: RobotType | undefined = curParticipant?.robot;

  const robotHtmlElem = showKeys.map((obj, index) => {
    return (
      <div className="cur-robot-info-list-body-row" key={obj.key}>
        <div className="cur-robot-info-list-body-col">{obj.text}</div>
        <div className="cur-robot-info-list-body-col">
          {(curRobotInfo && curRobotInfo[obj.key as keyof RobotType]) ?? "--"}
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
                  <div className="cur-robot-info-list-header-col">분류</div>
                  <div className="cur-robot-info-list-header-col">정보</div>
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
