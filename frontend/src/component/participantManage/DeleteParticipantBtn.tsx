import { ParticipantController } from "controller/ParticipantController";

const participantController = new ParticipantController();

export default function DeleteParticipantBtn({
  setParticipantUpdateSignal,
  targetParticipantId,
}: {
  setParticipantUpdateSignal: Function;
  targetParticipantId: string;
}) {
  return (
    <button
      type="button"
      className="btn btn-danger"
      onClick={() => {
        const func = async () => {
          await participantController.deleteParticipant(targetParticipantId);
          setParticipantUpdateSignal((prev: number) => (prev + 1) % 1000);
        };
        func();
      }}
    >
      선택한 참가자 삭제
    </button>
  );
}
