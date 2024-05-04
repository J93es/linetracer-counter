import { ContestController } from "controller/ContestController";

const contestController = new ContestController();

export default function DeleteContestBtn({
  setContestUpdateSignal,
  targetContestId,
}: {
  setContestUpdateSignal: Function;
  targetContestId: string;
}) {
  return (
    <button
      type="button"
      className="btn btn-danger"
      onClick={() => {
        const func = async () => {
          await contestController.deleteContest(targetContestId);
          setContestUpdateSignal((prev: number) => (prev + 1) % 1000);
        };
        func();
      }}
    >
      선택한 경연 삭제
    </button>
  );
}
