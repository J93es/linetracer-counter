import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ParticipantRecordType } from "model/ParticipantRecord";
import { ParticipantRecordSchema } from "model/fetch/ParticipantRecordSchema";

import { ParticipantRecordController } from "controller/ParticipantRecordController";

import TextForm from "component/utils/TextForm";
import NumberForm from "component/utils/NumberForm";
import SelectForm from "component/utils/SelectForm";
import SubmitBtn from "component/utils/SubmitBtn";

import { participantRecordSectorStateEnum, sectorEnum } from "model/enums";

const participantRecordController = new ParticipantRecordController();

export default function PutParticipantRecord({
  setParticipantRecordUpdateSignal,
  targetParticipantRecord,
}: {
  setParticipantRecordUpdateSignal: Function;
  targetParticipantRecord: Partial<ParticipantRecordType>;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ParticipantRecordType>({
    resolver: zodResolver(ParticipantRecordSchema),
  });

  useEffect(() => {
    setValue(
      "contestSector",
      targetParticipantRecord.contestSector || sectorEnum[0]
    );
    setValue("order", targetParticipantRecord.order || 501);
    setValue(
      "remainingContestTime",
      targetParticipantRecord.remainingContestTime || 300000
    );
    setValue(
      "sectorState",
      targetParticipantRecord.sectorState || participantRecordSectorStateEnum[0]
    );
  }, [setValue, targetParticipantRecord]);

  const onSubmit = (data: Partial<ParticipantRecordType>) => {
    const func = async () => {
      data._id = targetParticipantRecord._id;
      await participantRecordController.putParticipantRecord(
        targetParticipantRecord._id,
        {
          _id: targetParticipantRecord._id,
          ...data,
        }
      );
      setParticipantRecordUpdateSignal((prev: number) => (prev + 1) % 1000);
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

      <TextForm
        id="sectorState"
        placeholder="ex) ready"
        label="부문별 경연 상태"
        register={register}
        errorMessage={errors.sectorState?.message || ""}
      />

      <SubmitBtn />
    </form>
  );
}
