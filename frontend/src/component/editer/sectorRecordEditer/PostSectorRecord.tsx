import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { SectorRecordType } from "model/SectorRecord";
import { SectorRecordSchema } from "model/fetch/SectorRecordSchema";
import { SectorRecordController } from "controller/SectorRecordController";

import NumberForm from "component/utils/NumberForm";
import SelectForm from "component/utils/SelectForm";
import SubmitBtn from "component/utils/SubmitBtn";

import { sectorRecord_sectorStateEnum, sectorEnum } from "model/enums";

const sectorRecordController = new SectorRecordController();

export default function PostSectorRecord({
  targetSectorRecord,
  setSectorRecordUpdateSignal,
  targetParticipantId,
}: {
  targetSectorRecord: Partial<SectorRecordType>;
  setSectorRecordUpdateSignal: Function;
  targetParticipantId: string;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SectorRecordType>({
    resolver: zodResolver(SectorRecordSchema),
  });

  useEffect(() => {
    setValue("contestSector", sectorEnum[0]);
    setValue("order", 501);
    setValue("remainingContestTime", 300000);
    setValue("sectorState", sectorRecord_sectorStateEnum[0]);
  }, [setValue, targetSectorRecord]);

  const onSubmit = (data: Partial<SectorRecordType>) => {
    const func = async () => {
      data.hostId = targetParticipantId;
      await sectorRecordController.postSectorRecord(data);
      setSectorRecordUpdateSignal((prev: number) => (prev + 1) % 1000);
    };
    func();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SelectForm
        id="contestSector"
        label="부문"
        selectList={sectorEnum}
        register={register}
        errorMessage={errors.contestSector?.message || ""}
      />

      <NumberForm
        id="order"
        placeholder="ex) 1"
        label="부문별 경연 순서"
        register={register}
        errorMessage={errors.order?.message || ""}
      />

      <NumberForm
        id="remainingContestTime"
        placeholder="ex) 300000(ms)"
        label="남은 경연 시간(ms)"
        register={register}
        errorMessage={errors.remainingContestTime?.message || ""}
      />

      <SelectForm
        id="sectorState"
        label="부문별 경연 상태"
        selectList={sectorRecord_sectorStateEnum}
        register={register}
        errorMessage={errors.sectorState?.message || ""}
      />

      <SubmitBtn />
    </form>
  );
}
