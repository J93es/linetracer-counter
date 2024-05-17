import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { SectorRecordType } from "model/SectorRecord";
import { FormSectorRecordSchema } from "model/form/SectorRecordSchema";

import { SectorRecordController } from "controller/SectorRecordController";

import NumberForm from "component/utils/NumberForm";
import SelectForm from "component/utils/SelectForm";
import SubmitBtn from "component/utils/SubmitBtn";

import { defaultOrder, defaultRemainingContestTime } from "model/SectorRecord";

import { sectorRecord_sectorStateEnum, sectorEnum } from "model/enums";

const sectorRecordController = new SectorRecordController();

export default function RetouchSectorRecord({
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
      <h4>부문 기록 수정</h4>
      <NumberForm
        id="order"
        placeholder="ex) 1"
        label="경연 순서"
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
        label="경연 상태"
        selectList={sectorRecord_sectorStateEnum}
        register={register}
        errorMessage={errors.sectorState?.message ?? ""}
      />

      <SubmitBtn />
    </form>
  );
}
