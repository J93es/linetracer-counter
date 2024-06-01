import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { DriveRecordType } from "model/DriveRecord";
import { FormDriveRecordSchema } from "model/form/DriveRecordSchema";
import { driveRecord_typeEnum } from "model/enums/index";

import NumberForm from "component/utils/NumberForm";
import SelectForm from "component/utils/SelectForm";
import SubmitBtn from "component/utils/SubmitBtn";

import { DriveRecordController } from "controller/fetch/DriveRecordController";

const driveRecordController = new DriveRecordController();

export default function PostDriveRecord({
  targetDriveRecord,
  setDriveRecordUpdateSignal,
  targetSectorRecordId,
}: {
  targetDriveRecord: DriveRecordType | undefined;
  setDriveRecordUpdateSignal: Function;
  targetSectorRecordId: string | undefined;
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
    setValue("type", driveRecord_typeEnum[0]);
    setValue("recordTime", 0);
  }, [setValue, targetDriveRecord]);

  const onSubmit = (data: Partial<DriveRecordType>) => {
    const func = async () => {
      await driveRecordController.post({
        ...data,
        writeTime: Date.now(),
        id: targetDriveRecord?.id,
        hostId: targetSectorRecordId,
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
