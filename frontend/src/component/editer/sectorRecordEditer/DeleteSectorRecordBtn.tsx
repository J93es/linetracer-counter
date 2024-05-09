import { SectorRecordController } from "controller/SectorRecordController";
import { SectorRecordType } from "model/SectorRecord";

const sectorRecordController = new SectorRecordController();

export default function DeleteSectorRecordBtn({
  setSectorRecordUpdateSignal,
  targetSectorRecord,
}: {
  setSectorRecordUpdateSignal: Function;
  targetSectorRecord: Partial<SectorRecordType>;
}) {
  return (
    <button
      type="button"
      className="btn btn-danger"
      onClick={() => {
        const func = async () => {
          await sectorRecordController.deleteSectorRecord(
            targetSectorRecord._id
          );
          setSectorRecordUpdateSignal((prev: number) => (prev + 1) % 1000);
        };
        func();
      }}
    >
      선택한 부문 기록 삭제
    </button>
  );
}
