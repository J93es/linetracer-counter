import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ParticipantType } from "model/Participant";
import { putParticipantSchema } from "model/fetch/ParticipantSchema";

import { ParticipantController } from "controller/ParticipantController";

import TextForm from "component/form/TextForm";

const participantController = new ParticipantController();

export default function PutParticipant({
  setParticipantUpdateSignal,
  targetParticipantId,
}: {
  setParticipantUpdateSignal: Function;
  targetParticipantId: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ParticipantType>({ resolver: zodResolver(putParticipantSchema) });

  const onSubmit = (data: Partial<ParticipantType>) => {
    const func = async () => {
      data._id = targetParticipantId;
      console.log(
        await participantController.putParticipant(targetParticipantId, {
          _id: targetParticipantId,
          ...data,
        })
      );
      setParticipantUpdateSignal((prev: number) => (prev + 1) % 1000);
    };
    func();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
