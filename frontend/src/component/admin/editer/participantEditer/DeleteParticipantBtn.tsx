import { ParticipantController } from "component/admin/controller/fetch/ParticipantController";
import { ParticipantType } from "component/admin/model/Participant";

const participantController = new ParticipantController();

export default function DeleteParticipantBtn({
  setParticipantUpdateSignal,
  targetParticipant,
}: {
  setParticipantUpdateSignal: React.Dispatch<React.SetStateAction<number>>;
  targetParticipant: ParticipantType | undefined;
}) {
  const deleteParticipant = async () => {
    await participantController.delete(targetParticipant?.id);
    setParticipantUpdateSignal((prev: number) => (prev + 1) % 1000);
  };
  return (
    <button
      type="button"
      className="btn btn-danger"
      onClick={() => {
        deleteParticipant();
      }}
    >
      선택한 참가자 삭제
    </button>
  );
}
