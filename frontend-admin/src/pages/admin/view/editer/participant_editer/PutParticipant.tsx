import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ParticipantType } from "pages/admin/model/Participant";
import { FormParticipantSchema } from "pages/admin/model/form/ParticipantSchema";

import { ParticipantController } from "pages/admin/controller/fetch/ParticipantController";

import TextForm from "pages/admin/component/TextForm";
import SubmitBtn from "pages/admin/component/SubmitBtn";

const participantController = new ParticipantController();

export default function PutParticipant({
  setParticipantUpdateSignal,
  targetParticipant,
}: {
  setParticipantUpdateSignal: React.Dispatch<React.SetStateAction<number>>;
  targetParticipant: ParticipantType | undefined;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ParticipantType>({
    resolver: zodResolver(FormParticipantSchema),
  });

  useEffect(() => {
    setValue("name", targetParticipant?.name ?? "");
    setValue("association", targetParticipant?.association ?? "");
    setValue("speech", targetParticipant?.speech ?? "");
  }, [setValue, targetParticipant]);

  const onSubmit = (data: Partial<ParticipantType>) => {
    const func = async () => {
      await participantController.put({
        ...data,
        id: targetParticipant?.id,
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
