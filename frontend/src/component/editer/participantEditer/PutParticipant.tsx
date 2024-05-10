import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ParticipantType } from "model/Participant";
import { ParticipantSchema } from "model/fetch/ParticipantSchema";

import { ParticipantController } from "controller/ParticipantController";

import TextForm from "component/utils/TextForm";
import SubmitBtn from "component/utils/SubmitBtn";

const participantController = new ParticipantController();

export default function PutParticipant({
  setParticipantUpdateSignal,
  targetParticipant,
}: {
  setParticipantUpdateSignal: Function;
  targetParticipant: Partial<ParticipantType>;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ParticipantType>({ resolver: zodResolver(ParticipantSchema) });

  useEffect(() => {
    setValue("name", targetParticipant.name ?? "");
    setValue("association", targetParticipant.association ?? "");
    setValue("speech", targetParticipant.speech ?? "");
  }, [setValue, targetParticipant]);

  const onSubmit = (data: Partial<ParticipantType>) => {
    const func = async () => {
      data._id = targetParticipant._id;
      await participantController.put(targetParticipant._id, {
        _id: targetParticipant._id,
        ...data,
      });
      setParticipantUpdateSignal((prev: number) => (prev + 1) % 1000);
    };
    func();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextForm
        id="name"
        placeholder="ex) 정민석"
        label="이름"
        register={register}
        errorMessage={errors.name?.message ?? ""}
      />

      <TextForm
        id="association"
        placeholder="ex) 서울시립대학교 ZETIN"
        label="소속"
        register={register}
        errorMessage={errors.association?.message ?? ""}
      />

      <TextForm
        id="speech"
        placeholder="ex) 이제 그만 죽여줘..."
        label="하고 싶은 말"
        register={register}
        errorMessage={errors.speech?.message ?? ""}
      />

      <SubmitBtn />
    </form>
  );
}
