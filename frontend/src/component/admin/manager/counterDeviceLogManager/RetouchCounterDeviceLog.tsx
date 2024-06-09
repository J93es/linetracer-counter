import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormCounterDeviceLogSchema } from "model/form/CounterDeviceLogSchema";

import SelectForm from "component/utils/SelectForm";
import SubmitBtn from "component/utils/SubmitBtn";

import { driveRecord_typeEnum } from "model/enums/index";

import { CounterDeviceLogController } from "component/admin/controller/fetch/CounterDeviceLogController";

import { CounterDeviceLogType } from "model/CounterDeviceLog";

const counterDeviceLogController = new CounterDeviceLogController();

export default function RetouchDriveRecord({
  targetCounterDeviceLog,
  setCounterDeviceLogListUpdateSignal,
}: {
  targetCounterDeviceLog: CounterDeviceLogType | undefined;
  setCounterDeviceLogListUpdateSignal: React.Dispatch<
    React.SetStateAction<number>
  >;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CounterDeviceLogType>({
    resolver: zodResolver(FormCounterDeviceLogSchema),
  });

  useEffect(() => {
    setValue("type", targetCounterDeviceLog?.type ?? driveRecord_typeEnum[0]);
    setValue("recordTime", targetCounterDeviceLog?.recordTime ?? 0);
  }, [setValue, targetCounterDeviceLog]);

  const onSubmit = (data: Partial<CounterDeviceLogType>) => {
    const func = async () => {
      await counterDeviceLogController.put({
        ...data,
        id: targetCounterDeviceLog?.id,
      });
      setCounterDeviceLogListUpdateSignal((prev: number) => (prev + 1) % 1000);
    };
    func();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h4>계수기 로그 수정</h4>
      <SelectForm
        id="type"
        label="기록 타입"
        selectList={driveRecord_typeEnum}
        register={register}
        errorMessage={errors.type?.message ?? ""}
      />

      <SubmitBtn />
    </form>
  );
}
