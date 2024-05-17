import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ParticipantType } from "model/Participant";
import { RobotType } from "model/Robot";
import { FormRobotSchema } from "model/form/RobotSchema";

import { ParticipantController } from "controller/ParticipantController";

import TextForm from "component/utils/TextForm";
import SubmitBtn from "component/utils/SubmitBtn";

const participantController = new ParticipantController();

export default function PutParticipant({
  setParticipantUpdateSignal,
  targetParticipant,
}: {
  setParticipantUpdateSignal: Function;
  targetParticipant: ParticipantType | undefined;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RobotType>({
    resolver: zodResolver(FormRobotSchema),
    defaultValues: targetParticipant?.robot,
  });

  useEffect(() => {
    setValue("name", targetParticipant?.robot?.name ?? "");
    setValue("cpu", targetParticipant?.robot?.cpu ?? "");
    setValue("rom", targetParticipant?.robot?.rom ?? "");
    setValue("ram", targetParticipant?.robot?.ram ?? "");
    setValue("motorDriver", targetParticipant?.robot?.motorDriver ?? "");
    setValue("motor", targetParticipant?.robot?.motor ?? "");
    setValue("adc", targetParticipant?.robot?.adc ?? "");
    setValue("sensor", targetParticipant?.robot?.sensor ?? "");
  }, [setValue, targetParticipant?.robot]);

  const onSubmit = (data: Partial<RobotType>) => {
    const func = async () => {
      await participantController.put({
        robot: data,
        id: targetParticipant?.id,
      } as Partial<ParticipantType>);
      setParticipantUpdateSignal((prev: number) => (prev + 1) % 1000);
    };
    func();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextForm
        id="name"
        placeholder="ex) Sonyador and Sparta"
        label="이름"
        register={register}
        errorMessage={errors.name?.message ?? ""}
      />

      <TextForm
        id="cpu"
        placeholder="ex) STM32F411RET6"
        label="cpu"
        register={register}
        errorMessage={errors.cpu?.message ?? ""}
      />

      <TextForm
        id="rom"
        placeholder="ex) built-in"
        label="rom"
        register={register}
        errorMessage={errors.rom?.message ?? ""}
      />

      <TextForm
        id="ram"
        placeholder="ex) built-in"
        label="ram"
        register={register}
        errorMessage={errors.ram?.message ?? ""}
      />

      <TextForm
        id="motorDriver"
        placeholder="ex) SLA7026M"
        label="motorDriver"
        register={register}
        errorMessage={errors.motorDriver?.message ?? ""}
      />

      <TextForm
        id="motor"
        placeholder="ex) KH42JM2-901"
        label="motor"
        register={register}
        errorMessage={errors.motor?.message ?? ""}
      />

      <TextForm
        id="adc"
        placeholder="ex) built-in"
        label="adc"
        register={register}
        errorMessage={errors.adc?.message ?? ""}
      />

      <TextForm
        id="sensor"
        placeholder="ex) IR 8조"
        label="sensor"
        register={register}
        errorMessage={errors.sensor?.message ?? ""}
      />

      <SubmitBtn />
    </form>
  );
}
