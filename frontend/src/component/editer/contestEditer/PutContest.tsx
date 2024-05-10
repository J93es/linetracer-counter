import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import TextForm from "component/utils/TextForm";
import SelectForm from "component/utils/SelectForm";
import SubmitBtn from "component/utils/SubmitBtn";

import { ContestType } from "model/Contest";
import { ContestSchema } from "model/fetch/ContestSchema";
import { sectorEnum } from "model/enums/index";
import { ContestController } from "controller/ContestController";

const contestController = new ContestController();

export default function PutContest({
  setContestUpdateSignal,
  targetContest,
}: {
  setContestUpdateSignal: Function;
  targetContest: Partial<ContestType>;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ContestType>({ resolver: zodResolver(ContestSchema) });

  useEffect(() => {
    setValue("id", targetContest.id ?? "");
    setValue("title", targetContest.title ?? "");
    setValue(
      "curContestingSection",
      targetContest.curContestingSection ?? sectorEnum[0]
    );
  }, [setValue, targetContest]);

  const onSubmit = (data: Partial<ContestType>) => {
    const func = async () => {
      await contestController.put(targetContest._id, {
        _id: targetContest._id,
        ...data,
      });
      setContestUpdateSignal((prev: number) => (prev + 1) % 1000);
    };
    func();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextForm
        id="id"
        placeholder="ex) 2024"
        label="경연 id"
        register={register}
        errorMessage={errors.id?.message ?? ""}
      />

      <TextForm
        id="title"
        placeholder="ex) 제25회 전국 라인트레이서 경연대회"
        label="대회 이름"
        register={register}
        errorMessage={errors.title?.message ?? ""}
      />

      <SelectForm
        id="curContestingSection"
        label="현재 진행중인 부문"
        selectList={sectorEnum}
        register={register}
        errorMessage={errors.curContestingSection?.message ?? ""}
      />

      <SubmitBtn />
    </form>
  );
}
