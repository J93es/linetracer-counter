import SelectId from "component/SelectId/SelectId";
import ParticipantDistinction from "model/Distinction/ParticipantDistinction";

export default function ParticipantManage({
  setParticipantListGetSignal,
  targetParticipantId,
  setTargetParticipantId,
  participantList,
}: {
  setParticipantListGetSignal: Function;
  targetParticipantId: string;
  setTargetParticipantId: Function;
  participantList: object[];
}) {
  return (
    <div>
      {participantList.length === 0 ? null : (
        <button
          type="button"
          className="btn btn-info"
          onClick={() => {
            setParticipantListGetSignal((prev: number) => (prev + 1) % 1000);
          }}
        >
          load participant list
        </button>
      )}

      <SelectId
        targetId={targetParticipantId}
        setTargetId={setTargetParticipantId}
        listOfObject={participantList}
        DistintionClass={ParticipantDistinction}
      />
    </div>
  );
}
