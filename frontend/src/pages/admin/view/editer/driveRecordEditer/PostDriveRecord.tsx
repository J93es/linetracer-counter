import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { DriveRecordType } from "pages/admin/model/DriveRecord";
import { FormDriveRecordSchema } from "pages/admin/model/form/DriveRecordSchema";
import { driveRecord_typeEnum } from "pages/admin/model/enums/index";

import NumberForm from "pages/admin/component/NumberForm";
import SelectForm from "pages/admin/component/SelectForm";
import SubmitBtn from "pages/admin/component/SubmitBtn";

import { DriveRecordController } from "pages/admin/controller/fetch/DriveRecordController";

const driveRecordController = new DriveRecordController();

export default function PostDriveRecord({
  targetDriveRecord,
  setDriveRecordUpdateSignal,
  targetSectorRecordId,
}: {
  targetDriveRecord: DriveRecordType | undefined;
  setDriveRecordUpdateSignal: React.Dispatch<React.SetStateAction<number>>;
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
