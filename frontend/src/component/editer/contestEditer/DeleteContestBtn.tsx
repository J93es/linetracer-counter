import { ContestType } from "model/Contest";
import { ContestController } from "controller/ContestController";

const contestController = new ContestController();

export default function DeleteContestBtn({
  setContestUpdateSignal,
  targetContest,
}: {
  setContestUpdateSignal: Function;
  targetContest: ContestType | undefined;
}) {
  const deleteContest = async () => {
    await contestController.delete(targetContest?.id);
    setContestUpdateSignal((prev: number) => (prev + 1) % 1000);
  };

  return (
    <button
      type="button"
      className="btn btn-danger"
      onClick={() => {
        deleteContest();
      }}
    >
      선택한 경연 삭제
    </button>
  );
}
