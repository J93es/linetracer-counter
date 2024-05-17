import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ParticipantType } from "model/Participant";
import { FormParticipantSchema } from "model/form/ParticipantSchema";
import { ParticipantController } from "controller/ParticipantController";

import TextForm from "component/utils/TextForm";
import SubmitBtn from "component/utils/SubmitBtn";

const participantController = new ParticipantController();

export default function PostParticipant({
  targetParticipant,
  setParticipantUpdateSignal,
  targetContestId,
}: {
  targetParticipant: ParticipantType | undefined;
  setParticipantUpdateSignal: Function;
  targetContestId: string | undefined;
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
    setValue("name", "");
    setValue("association", "");
    setValue("speech", "");
  }, [setValue, targetParticipant]);

  const onSubmit = (data: Partial<ParticipantType>) => {
    const func = async () => {
      await participantController.post({ ...data, hostId: targetContestId });
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
