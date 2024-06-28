import "pages/body/home/Index.css";

export default function Home() {
  return (
    <div className="home-container">
      <div className="greetings">
        <h3 className="home-index">축사</h3>
        <p>
          서울시립대학교 마이크로 로봇 연구회(ZETIN)에서 주관하는 제25회 전국
          라인트레이서 경연대회의 개최를 진심으로 축하드립니다.
        </p>
        <p>
          본 대회는 1998년을 시작으로 25년 동안 국내 라인 트레이서 로봇과
          관련하여 가장 성공적인 대회 중 하나로써, 로봇을 사랑하는 전국의
          대학생들이 각자의 기술을 공유 하고 실력을 뽐내는 로봇공학도들의 학술
          교류 행사로써 자리매김하고 있습니다.
        </p>
        <p>
          작년과 동일하게 올해에도 본 대회는 Freshman, Expert-STEP, Expert-DC,
          Senior 등 총 4개 부문으로 세분화하여 진행되며, 각 부분에서 우수한
          성적을 거둔 팀에게는 상장과 부상이 수여될 예정입니다.
        </p>
        <p>
          본 대회에서 다루는 라인 트레이서는, 비록 외형은 단순해보이지만
          하드웨어 제작부터 제어 알고리즘 구현까지 로봇공학의 모든 주요 기술들이
          총집약된 대표적인 로봇 시스템입니다. 특히 로봇이 안정적이면서 빠르게
          주어진 경로를 주행하기 위해서는, 높은 수준의 로봇공학 지식과 기술들이
          필요합니다. 여러분들의 로봇이 완주를 넘어서서 다른 팀들보다 빠른 시간
          내에 목표점에 도달할 수 있도록, 끝없는 도전 정신과 탐구 정신을
          바탕으로 최선을 다해주시기를 바라며, 각자 원하는 결과를 안고 집으로
          돌아갈 수 있기를 기원합니다.
        </p>
        <p>
          마지막으로, 유난히 무더운 여름에도 로봇공학에 대한 애정과 열정으로
          대회를 준비 해준 여러분들 각자에게 큰 박수와 격려의 말씀을 드리며, 본
          대회에서의 경험을 바탕 으로 훗날 로봇 분야를 이끌어갈 공학자로
          성장하시기를 진심으로 바랍니다.
        </p>
        <div className="greetings-author">ZETIN 지도교수 박경훈</div>
      </div>
      <div className="contest-schedule">
        <h3 className="home-index">대회 식순</h3>
        <table>
          <thead>
            <tr>
              <th>시간</th>
              <th>내용</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>9:00 ~ 10:00</td>
              <td>참가자 등록 및 추가 접수</td>
            </tr>
            <tr>
              <td>10:00 ~ 10:10</td>
              <td>개회식</td>
            </tr>
            <tr>
              <td>10:10 ~ 12:00</td>
              <td>Freshman</td>
            </tr>
            <tr>
              <td>12:00 ~ 13:00</td>
              <td>Interval</td>
            </tr>
            <tr>
              <td>13:00 ~ 15:00</td>
              <td>Expert-Step, Expert-DC 예선</td>
            </tr>
            <tr>
              <td>15:00 ~ 15:30</td>
              <td>Time Attack</td>
            </tr>
            <tr>
              <td>15:30 ~ 17:00</td>
              <td>Expert-Step, Expert-DC 본선</td>
            </tr>
            <tr>
              <td>17:00 ~ 17:30</td>
              <td>Senior</td>
            </tr>
            <tr>
              <td>17:30 ~ 18:00</td>
              <td>시상식</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="contest-information-link">
        <h3 className="home-index">정보 링크</h3>
        <a
          className="outer-link"
          href="https://zetin.uos.ac.kr/index.php?mid=competition"
        >
          자세한 대회 정보
        </a>
        <a
          className="outer-link"
          href="https://zetin.uos.ac.kr/index.php?mid=contest_limit"
        >
          규정집
        </a>
      </div>
    </div>
  );
}
