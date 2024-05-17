import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { DriveRecordType } from "model/DriveRecord";
import { FormDriveRecordSchema } from "model/form/DriveRecordSchema";

import NumberForm from "component/utils/NumberForm";
import SelectForm from "component/utils/SelectForm";
import SubmitBtn from "component/utils/SubmitBtn";

import { driveRecord_typeEnum } from "model/enums/index";

import { DriveRecordController } from "controller/DriveRecordController";

const driveRecordController = new DriveRecordController();

export default function PutDriveRecord({
  setDriveRecordUpdateSignal,
  targetDriveRecord,
}: {
  setDriveRecordUpdateSignal: Function;
  targetDriveRecord: DriveRecordType | undefined;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Partial<DriveRecordType>>({
    resolver: zodResolver(FormDriveRecordSchema),
  });

  useEffect(() => {
    setValue("type", targetDriveRecord?.type ?? driveRecord_typeEnum[0]);
    setValue("recordTime", targetDriveRecord?.recordTime ?? 0);
  }, [setValue, targetDriveRecord]);

  const onSubmit = (data: Partial<DriveRecordType>) => {
    const func = async () => {
      await driveRecordController.put({
        ...data,
        id: targetDriveRecord?.id,
      });
      setDriveRecordUpdateSignal((prev: number) => (prev + 1) % 1000);
    };
    func();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SelectForm
        id="type"
        label="기록 타입"
        selectList={driveRecord_typeEnum}
        register={register}
        errorMessage={errors.type?.message ?? ""}
      />

      <NumberForm
        id="recordTime"
        placeholder="ex) 0(ms)"
        label="주행 시간(ms)"
        register={register}
        errorMessage={errors.recordTime?.message ?? ""}
      />

      <SubmitBtn />
    </form>
  );
}
