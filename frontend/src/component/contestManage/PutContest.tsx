import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ContestType } from "model/Contest";
import { putContestSchema } from "model/fetch/ContestSchema";

import TextForm from "component/form/TextForm";
import SelectForm from "component/form/SelectForm";

import { sectorEnum } from "component/data";

import { ContestController } from "controller/ContestController";

const contestController = new ContestController();

export default function PutContest({
  setContestUpdateSignal,
  targetContestId,
}: {
  setContestUpdateSignal: Function;
  targetContestId: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContestType>({ resolver: zodResolver(putContestSchema) });

  const onSubmit = (data: Partial<ContestType>) => {
    const func = async () => {
      console.log(
        await contestController.putContest(targetContestId, {
          _id: targetContestId,
          ...data,
        })
      );
      setContestUpdateSignal((prev: number) => (prev + 1) % 1000);
    };
    func();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
