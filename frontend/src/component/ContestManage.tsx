import Contest from "model/Contest";
import SelectId from "component/SelectId/SelectId";
import ContestDistintion from "model/Distinction/ContestDistinction";
import ContestForm from "component/ContestForm";

export default function ContestManage({
  setContestListGetSignal,
  targetContestId,
  setTargetContestId,
  contestList,
}: {
  setContestListGetSignal: Function;
  targetContestId: string;
  setTargetContestId: Function;
  contestList: object[];
}) {
  return (
    <div>
      {/* manage contestList */}
      {contestList.length === 0 ? null : (
        <button
          type="button"
          className="btn btn-info"
          onClick={() => {
            setContestListGetSignal((prev: number) => (prev + 1) % 1000);
          }}
        >
          load contest list
        </button>
      )}

      {/* manage targetContestId  */}
      <SelectId
        targetId={targetContestId}
        setTargetId={setTargetContestId}
        listOfObject={contestList}
        DistintionClass={ContestDistintion}
      />

      {/* manage targetContest */}
      <ContestForm />
    </div>
  );
}
