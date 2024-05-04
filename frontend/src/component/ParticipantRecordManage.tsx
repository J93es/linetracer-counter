import SelectId from "component/selectId/SelectId";
import ParticipantRecordDistinction from "model/distinction/ParticipantRecordDistinction";

export default function ParticipantRecordManage({
  setParticipantRecordUpdateSignal,
  targetParticipantRecordId,
  setTargetParticipantRecordId,
  participantRecordList,
}: {
  setParticipantRecordUpdateSignal: Function;
  targetParticipantRecordId: string;
  setTargetParticipantRecordId: Function;
  participantRecordList: object[];
}) {
  return (
    <div>
      <SelectId
        targetId={targetParticipantRecordId}
        setTargetId={setTargetParticipantRecordId}
        listOfObject={participantRecordList}
        DistintionClass={ParticipantRecordDistinction}
        setUpdateSignal={() => {
          setParticipantRecordUpdateSignal((prev: number) => (prev + 1) % 1000);
        }}
      />
    </div>
  );
}
