import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import TextForm from "pages/admin/component/TextForm";
import SelectForm from "pages/admin/component/SelectForm";
import SubmitBtn from "pages/admin/component/SubmitBtn";

import { ContestType } from "pages/admin/model/Contest";
import { FormContestSchema } from "pages/admin/model/form/ContestSchema";
import { sectorEnum } from "pages/admin/model/enums/index";
import { ContestController } from "pages/admin/controller/fetch/ContestController";

const contestController = new ContestController();

export default function PutContest({
  setContestUpdateSignal,
  targetContest,
}: {
  setContestUpdateSignal: React.Dispatch<React.SetStateAction<number>>;
  targetContest: ContestType | undefined;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ContestType>({ resolver: zodResolver(FormContestSchema) });

  useEffect(() => {
    setValue("queryId", targetContest?.queryId ?? "");
    setValue("title", targetContest?.title ?? "");
    setValue(
      "curContestingSection",
      targetContest?.curContestingSection ?? sectorEnum[0]
    );
  }, [setValue, targetContest]);

  const onSubmit = (data: Partial<ContestType>) => {
    const func = async () => {
      await contestController.put({
        ...data,
        id: targetContest?.id,
      });
      setContestUpdateSignal((prev: number) => (prev + 1) % 1000);
    };
    func();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextForm
        id="queryId"
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
