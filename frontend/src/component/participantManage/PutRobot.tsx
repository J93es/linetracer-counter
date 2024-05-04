import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ParticipantType } from "model/Participant";
import { RobotType } from "model/Robot";
import { putRobotSchema } from "model/fetch/RobotSchema";

import { ParticipantController } from "controller/ParticipantController";

import TextForm from "component/form/TextForm";

const participantController = new ParticipantController();

export default function PutParticipant({
  setParticipantUpdateSignal,
  targetParticipantId,
  targetParticipant,
}: {
  setParticipantUpdateSignal: Function;
  targetParticipantId: string;
  targetParticipant: Partial<ParticipantType>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RobotType>({ resolver: zodResolver(putRobotSchema) });

  const onSubmit = (data: Partial<RobotType>) => {
    const func = async () => {
      let robot = {
        name: "",
        cpu: "",
        rom: "",
        ram: "",
        motorDriver: "",
        motor: "",
        adc: "",
        sensor: "",
      } as RobotType;
      if (targetParticipant) {
        robot = JSON.parse(JSON.stringify(targetParticipant.robot));
      }
      robot.name = data.name || robot.name || "";
      robot.cpu = data.cpu || robot.cpu || "";
      robot.rom = data.rom || robot.rom || "";
      robot.ram = data.ram || robot.ram || "";
      robot.motorDriver = data.motorDriver || robot.motorDriver || "";
      robot.motor = data.motor || robot.motor || "";
      robot.adc = data.adc || robot.adc || "";
      robot.sensor = data.sensor || robot.sensor || "";

      console.log(
        await participantController.putParticipant(targetParticipantId, {
          _id: targetParticipantId,
          robot: robot,
        } as Partial<ParticipantType>)
      );
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
        errorMessage={errors.name?.message || ""}
      />

      <TextForm
        id="cpu"
        placeholder="ex) STM32F411RET6"
        label="cpu"
        register={register}
        errorMessage={errors.cpu?.message || ""}
      />

      <TextForm
        id="rom"
        placeholder="ex) built-in"
        label="rom"
        register={register}
        errorMessage={errors.rom?.message || ""}
      />

      <TextForm
        id="ram"
        placeholder="ex) built-in"
        label="ram"
        register={register}
        errorMessage={errors.ram?.message || ""}
      />

      <TextForm
        id="motorDriver"
        placeholder="ex) SLA7026M"
        label="motorDriver"
        register={register}
        errorMessage={errors.motorDriver?.message || ""}
      />

      <TextForm
        id="motor"
        placeholder="ex) KH42JM2-901"
        label="motor"
        register={register}
        errorMessage={errors.motor?.message || ""}
      />

      <TextForm
        id="adc"
        placeholder="ex) built-in"
        label="adc"
        register={register}
        errorMessage={errors.adc?.message || ""}
      />

      <TextForm
        id="sensor"
        placeholder="ex) IR 8조"
        label="sensor"
        register={register}
        errorMessage={errors.sensor?.message || ""}
      />

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}
