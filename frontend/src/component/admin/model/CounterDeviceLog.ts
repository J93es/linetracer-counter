export interface CounterDeviceLogType {
  id: string;
  hostId: string;

  startTime: number;
  endTime: number;
  type: string;
  recordTime: number;
  writeTime: number;
}

export default class CounterDeviceLog implements CounterDeviceLogType {
  id: string;
  hostId: string;

  startTime: number;
  endTime: number;
  type: string;
  recordTime: number;
  writeTime: number;

  constructor(data: CounterDeviceLogType) {
    this.id = data.id;
    this.hostId = data.hostId;

    this.startTime = data.startTime;
    this.endTime = data.endTime;
    this.type = data.type;
    this.recordTime = data.recordTime;
    this.writeTime = data.writeTime ?? Date.now();
  }
}
