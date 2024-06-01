import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { SectorRecordType } from "model/SectorRecord";
import { FormSectorRecordSchema } from "model/form/SectorRecordSchema";

import { SectorRecordController } from "controller/fetch/SectorRecordController";

import NumberForm from "component/utils/NumberForm";
import SelectForm from "component/utils/SelectForm";
import SubmitBtn from "component/utils/SubmitBtn";

import { sectorRecord_sectorStateEnum, sectorEnum } from "model/enums";

import { defaultRemainingContestTime, defaultOrder } from "model/SectorRecord";

const sectorRecordController = new SectorRecordController();

export default function PutSectorRecord({
  setSectorRecordUpdateSignal,
  targetSectorRecord,
}: {
  setSectorRecordUpdateSignal: Function;
  targetSectorRecord: SectorRecordType | undefined;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SectorRecordType>({
    resolver: zodResolver(FormSectorRecordSchema),
  });

  useEffect(() => {
    setValue(
      "contestSector",
      targetSectorRecord?.contestSector ?? sectorEnum[0]
    );
    setValue("order", targetSectorRecord?.order ?? defaultOrder);
    setValue(
      "remainingContestTime",
      targetSectorRecord?.remainingContestTime ?? defaultRemainingContestTime
    );
    setValue(
      "sectorState",
      targetSectorRecord?.sectorState ?? sectorRecord_sectorStateEnum[0]
    );
  }, [setValue, targetSectorRecord]);

  const onSubmit = (data: Partial<SectorRecordType>) => {
    const func = async () => {
      await sectorRecordController.put({
        ...data,
        id: targetSectorRecord?.id,
      });
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
        errorMessage={errors.contestSector?.message ?? ""}
      />

      <NumberForm
        id="order"
        placeholder="ex) 1"
        label="부문별 경연 순서"
        register={register}
        errorMessage={errors.order?.message ?? ""}
      />

      <NumberForm
        id="remainingContestTime"
        placeholder="ex) 300000(ms)"
        label="남은 경연 시간(ms)"
        register={register}
        errorMessage={errors.remainingContestTime?.message ?? ""}
      />

      <SelectForm
        id="sectorState"
        label="부문별 경연 상태"
        selectList={sectorRecord_sectorStateEnum}
        register={register}
        errorMessage={errors.sectorState?.message ?? ""}
      />

      <SubmitBtn />
    </form>
  );
}
