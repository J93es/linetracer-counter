import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ContestType } from "model/Contest";
import { postContestSchema } from "model/fetch/ContestSchema";

import TextForm from "component/utils/TextForm";
import SelectForm from "component/utils/SelectForm";

import { ContestController } from "controller/ContestController";
import { sectorEnum } from "model/enums/index";

const contestController = new ContestController();

export default function PostContest({
  targetContest,
  setContestUpdateSignal,
}: {
  targetContest: Partial<ContestType>;
  setContestUpdateSignal: Function;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ContestType>({ resolver: zodResolver(postContestSchema) });

  useEffect(() => {
    setValue("id", "");
    setValue("title", "");
    setValue("curContestingSection", "ready");
  }, [targetContest]);

  const onSubmit = (data: Partial<ContestType>) => {
    const func = async () => {
      await contestController.postContest(data);
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
        errorMessage={errors.id?.message || ""}
      />

      <TextForm
        id="title"
        placeholder="ex) 제25회 전국 라인트레이서 경연대회"
        label="대회 이름"
        register={register}
        errorMessage={errors.title?.message || ""}
      />

      <SelectForm
        id="curContestingSection"
        selectList={sectorEnum}
        register={register}
        errorMessage={errors.curContestingSection?.message || ""}
      />

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}
