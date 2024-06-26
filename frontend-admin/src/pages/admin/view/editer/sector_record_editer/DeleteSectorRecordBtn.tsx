import { SectorRecordController } from "pages/admin/controller/fetch/SectorRecordController";
import { SectorRecordType } from "pages/admin/model/SectorRecord";

const sectorRecordController = new SectorRecordController();

export default function DeleteSectorRecordBtn({
  setSectorRecordUpdateSignal,
  targetSectorRecord,
}: {
  setSectorRecordUpdateSignal: React.Dispatch<React.SetStateAction<number>>;
  targetSectorRecord: SectorRecordType | undefined;
}) {
  const deleteSectorRecord = async () => {
    await sectorRecordController.delete(targetSectorRecord?.id);
    setSectorRecordUpdateSignal((prev: number) => (prev + 1) % 1000);
  };

  return (
    <button
      type="button"
      className="btn btn-danger"
      onClick={() => {
        deleteSectorRecord();
      }}
    >
      선택한 부문 기록 삭제
    </button>
  );
}
