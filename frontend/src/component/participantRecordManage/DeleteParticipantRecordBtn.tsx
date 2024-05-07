import { ParticipantRecordController } from "controller/ParticipantRecordController";
import { ParticipantRecordType } from "model/ParticipantRecord";

const participantRecordController = new ParticipantRecordController();

export default function DeleteParticipantRecordBtn({
  setParticipantRecordUpdateSignal,
  targetParticipantRecord,
}: {
  setParticipantRecordUpdateSignal: Function;
  targetParticipantRecord: Partial<ParticipantRecordType>;
}) {
  return (
    <button
      type="button"
      className="btn btn-danger"
      onClick={() => {
        const func = async () => {
          await participantRecordController.deleteParticipantRecord(
            targetParticipantRecord._id
          );
          setParticipantRecordUpdateSignal((prev: number) => (prev + 1) % 1000);
        };
        func();
      }}
    >
      선택한 참가자 기록 삭제
    </button>
  );
}
