import { ParticipantType } from "pages/body/live/model/Participant";

export default function SectionInfo({
  participantList,
}: {
  participantList: ParticipantType[];
}) {
  return (
    <div className="section-info-container">
      <div className="participant-list">
        {participantList?.map((participant, index) => (
          <div key={index} className="participant">
            ---------
            <div className="participant-fastest-lap-time">
              {participant.fastestLapTime}
            </div>
            <div className="participant-name">{participant.name}</div>
            <div className="participant-order">{participant.order}</div>
            <div className="participant-sector-state">
              {participant.sectorState}
            </div>
            ---------
          </div>
        ))}
      </div>
    </div>
  );
}
