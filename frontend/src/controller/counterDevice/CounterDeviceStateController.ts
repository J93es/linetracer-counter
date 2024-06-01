import { CounterDeviceLogType } from "model/CounterDeviceLog";
import { ContestType } from "model/Contest";

import { ContestController } from "controller/fetch/ContestController";
import { CounterDeviceLogController } from "controller/fetch/CounterDeviceLogController";

const contestController = new ContestController();
const counterDeviceLogController = new CounterDeviceLogController();

let instance: CounterDeviceStateController | null = null;
export class CounterDeviceStateController {
  private startTime: number | null = null;
  private endTime: number | null = null;

  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  private isStart(value: Uint8Array) {
    return value[0] === 0x01;
  }

  private isEnd(value: Uint8Array) {
    return value[0] === 0x02;
  }

  private async driveStart(getTime: number, contestId: string) {
    this.startTime = getTime;
    this.endTime = null;

    if (!contestId) {
      return;
    }

    const contest: Partial<ContestType> = {
      id: contestId,
      driveStartTime: getTime,
      isDriveStopWatchRunning: true,
    };

    await contestController.patch(contest);
  }

  private async driveEnd(getTime: number, contestId: string) {
    if (!contestId) {
      return;
    }
    if (!this.startTime) {
      return;
    }

    this.endTime = getTime;
    const recordTime = this.endTime - this.startTime;

    const contest: Partial<ContestType> = {
      id: contestId,
      driveStartTime: undefined,
      isDriveStopWatchRunning: false,
      latestDriveRecordTime: recordTime,
    };

    const counterDeviceLog: Partial<CounterDeviceLogType> = {
      hostId: contestId,

      startTime: this.startTime,
      endTime: this.endTime,
      type: "SUCCESS",
      recordTime: recordTime,
      writeTime: this.endTime,
    };
    this.startTime = null;

    Promise.all([
      await contestController.patch(contest),
      await counterDeviceLogController.post(counterDeviceLog),
    ]);
  }

  async stateMachine(
    value: Uint8Array | undefined,
    getTime: number,
    contestId: string | undefined
  ): Promise<string> {
    if (!value) {
      return "EMPTY_VALUE";
    }
    if (!contestId) {
      return "EMPTY_CONTEST_ID";
    }

    if (this.isStart(value)) {
      await this.driveStart(getTime, contestId);
      return "DRIVE_START";
    }
    if (this.isEnd(value)) {
      await this.driveEnd(getTime, contestId);
      return "DRIVE_END";
    }

    return "IDLE";
  }
}
