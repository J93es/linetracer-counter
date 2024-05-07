import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { DriveRecordType } from "model/DriveRecord";
import { DriveRecordSchema } from "model/fetch/DriveRecordSchema";

import NumberForm from "component/utils/NumberForm";
import SelectForm from "component/utils/SelectForm";
import SubmitBtn from "component/utils/SubmitBtn";

import { driveRecordTypeEnum } from "model/enums/index";

import { DriveRecordController } from "controller/DriveRecordController";

const driveRecordController = new DriveRecordController();

export default function PutDriveRecord({
  setDriveRecordUpdateSignal,
  targetDriveRecord,
  curParticipantRecordId,
}: {
  setDriveRecordUpdateSignal: Function;
  targetDriveRecord: Partial<DriveRecordType>;
  curParticipantRecordId: string;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<DriveRecordType>({
    resolver: zodResolver(DriveRecordSchema),
  });

  useEffect(() => {
    setValue("type", targetDriveRecord.type || driveRecordTypeEnum[0]);
    setValue("recordTime", targetDriveRecord.recordTime || 0);
  }, [setValue, targetDriveRecord]);

  const onSubmit = (data: Partial<DriveRecordType>) => {
    const func = async () => {
      console.log(data);
      await driveRecordController.putDriveRecord(
        curParticipantRecordId,
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
      <SelectForm
        id="type"
        label="기록 타입"
        selectList={driveRecordTypeEnum}
        register={register}
        errorMessage={errors.type?.message || ""}
      />

      <NumberForm
        id="recordTime"
        placeholder="ex) 0(ms)"
        label="주행 시간(ms)"
        register={register}
        errorMessage={errors.recordTime?.message || ""}
      />

      <SubmitBtn />
    </form>
  );
}
