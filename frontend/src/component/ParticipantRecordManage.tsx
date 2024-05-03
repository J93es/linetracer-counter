import SelectId from "component/SelectId/SelectId";
import ParticipantRecordDistinction from "model/Distinction/ParticipantRecordDistinction";

export default function ParticipantRecordManage({
  setParticipantRecordListGetSignal,
  targetParticipantRecordId,
  setTargetParticipantRecordId,
  participantRecordList,
}: {
  setParticipantRecordListGetSignal: Function;
  targetParticipantRecordId: string;
  setTargetParticipantRecordId: Function;
  participantRecordList: object[];
}) {
  return (
    <div>
      {participantRecordList.length === 0 ? null : (
        <button
          type="button"
          className="btn btn-info"
          onClick={() => {
            setParticipantRecordListGetSignal(
              (prev: number) => (prev + 1) % 1000
            );
          }}
        >
          load participantRecord list
        </button>
      )}

      <SelectId
        targetId={targetParticipantRecordId}
        setTargetId={setTargetParticipantRecordId}
        listOfObject={participantRecordList}
        DistintionClass={ParticipantRecordDistinction}
      />
    </div>
  );
}
