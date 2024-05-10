import { ParticipantController } from "controller/ParticipantController";
import { ParticipantType } from "model/Participant";

const participantController = new ParticipantController();

export default function DeleteParticipantBtn({
  setParticipantUpdateSignal,
  targetParticipant,
}: {
  setParticipantUpdateSignal: Function;
  targetParticipant: Partial<ParticipantType>;
}) {
  return (
    <button
      type="button"
      className="btn btn-danger"
      onClick={() => {
        const func = async () => {
          await participantController.delete(targetParticipant._id);
          setParticipantUpdateSignal((prev: number) => (prev + 1) % 1000);
        };
        func();
      }}
    >
      선택한 참가자 삭제
    </button>
  );
}
