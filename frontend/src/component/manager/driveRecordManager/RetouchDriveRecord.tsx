import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { DriveRecordType } from "model/DriveRecord";
import { FormDriveRecordSchema } from "model/form/DriveRecordSchema";

import SelectForm from "component/utils/SelectForm";
import SubmitBtn from "component/utils/SubmitBtn";

import { driveRecord_typeEnum } from "model/enums/index";

import { DriveRecordController } from "controller/DriveRecordController";

const driveRecordController = new DriveRecordController();

export default function RetouchDriveRecord({
  setDriveRecordUpdateSignal,
  targetDriveRecord,
  targetSectorRecordId,
}: {
  setDriveRecordUpdateSignal: Function;
  targetDriveRecord: Partial<DriveRecordType>;
  targetSectorRecordId: string;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<DriveRecordType>({
    resolver: zodResolver(FormDriveRecordSchema),
  });

  useEffect(() => {
    setValue("type", targetDriveRecord.type ?? driveRecord_typeEnum[0]);
    setValue("recordTime", targetDriveRecord.recordTime ?? 0);
  }, [setValue, targetDriveRecord]);

  const onSubmit = (data: Partial<DriveRecordType>) => {
    const func = async () => {
      await driveRecordController.put(
        targetSectorRecordId,
        targetDriveRecord._id,
        {
          _id: targetDriveRecord._id,
          ...data,
        }
      );
      setDriveRecordUpdateSignal((prev: number) => (prev + 1) % 1000);
    };
    func();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h4>주행 기록 수정</h4>
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
