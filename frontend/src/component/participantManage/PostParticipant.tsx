import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ParticipantType } from "model/Participant";
import { postParticipantSchema } from "model/fetch/ParticipantSchema";
import { ParticipantController } from "controller/ParticipantController";

import TextForm from "component/form/TextForm";

const participantController = new ParticipantController();

export default function PostParticipant({
  setParticipantUpdateSignal,
  curContestId,
}: {
  setParticipantUpdateSignal: Function;
  curContestId: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ParticipantType>({
    resolver: zodResolver(postParticipantSchema),
  });

  const onSubmit = (data: Partial<ParticipantType>) => {
    const func = async () => {
      data.hostId = curContestId;
      console.log(await participantController.postParticipant(data));
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
        errorMessage={errors.name?.message || ""}
      />

      <TextForm
        id="association"
        placeholder="ex) 서울시립대학교 ZETIN"
        label="소속"
        register={register}
        errorMessage={errors.association?.message || ""}
      />

      <TextForm
        id="speech"
        placeholder="ex) 이제 그만 죽여줘..."
        label="하고 싶은 말"
        register={register}
        errorMessage={errors.speech?.message || ""}
      />

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}
