import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { SectorRecordType } from "pages/admin/model/SectorRecord";
import { FormSectorRecordSchema } from "pages/admin/model/form/SectorRecordSchema";
import { SectorRecordController } from "pages/admin/controller/fetch/SectorRecordController";

import NumberForm from "pages/admin/component/NumberForm";
import SelectForm from "pages/admin/component/SelectForm";
import SubmitBtn from "pages/admin/component/SubmitBtn";

import {
  sectorRecord_sectorStateEnum,
  sectorEnum,
} from "pages/admin/model/enums";
import {
  defaultRemainingContestTime,
  defaultOrder,
} from "pages/admin/model/SectorRecord";

const sectorRecordController = new SectorRecordController();

export default function PostSectorRecord({
  setSectorRecordUpdateSignal,
  targetParticipantId,
}: {
  setSectorRecordUpdateSignal: React.Dispatch<React.SetStateAction<number>>;
  targetParticipantId: string | undefined;
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
    setValue("contestSector", sectorEnum[0]);
    setValue("order", defaultOrder);
    setValue("remainingContestTime", defaultRemainingContestTime);
    setValue("sectorState", sectorRecord_sectorStateEnum[0]);
  }, [setValue]);

  const onSubmit = (data: Partial<SectorRecordType>) => {
    const func = async () => {
      await sectorRecordController.post({
        ...data,
        hostId: targetParticipantId,
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
        placeholder="ex) 240000(ms)"
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
