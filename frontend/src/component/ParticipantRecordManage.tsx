import SelectTarget from "component/utils/selectTarget/SelectTarget";
import ParticipantRecordDistinction from "model/distinction/ParticipantRecordDistinction";
import { ParticipantRecordType } from "model/ParticipantRecord";

export default function ParticipantRecordManage({
  setParticipantRecordUpdateSignal,
  targetParticipantRecord,
  setTargetParticipantRecord,
  participantRecordList,
}: {
  setParticipantRecordUpdateSignal: Function;
  targetParticipantRecord: Partial<ParticipantRecordType>;
  setTargetParticipantRecord: Function;
  participantRecordList: object[];
}) {
  return (
    <div>
      <SelectTarget
        target={targetParticipantRecord}
        setTarget={setTargetParticipantRecord}
        listOfObject={participantRecordList}
        DistintionClass={ParticipantRecordDistinction}
        setUpdateSignal={() => {
          setParticipantRecordUpdateSignal((prev: number) => (prev + 1) % 1000);
        }}
      />
    </div>
  );
}
