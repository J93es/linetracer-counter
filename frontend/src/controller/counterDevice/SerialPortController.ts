let instance: SerialPortController | null = null;
export class SerialPortController {
  private devicePort: any;
  private value: Uint8Array | null = null;

  constructor() {
    if (!instance) {
      if ("serial" in navigator) {
        console.log("This browser supports web serial api");
      } else {
        alert("This browser does not supports web serial api: Use Chrome");
      }

      instance = this;
      this.devicePort = null;
      this.value = null;
    }
    return instance;
  }

  isPortOpen() {
    return this.devicePort !== null;
  }
  async setDevice() {
    // Prompt user to select an Arduino Uno device.
    try {
      const filters: string[] = [];
      this.devicePort = await (navigator as any).serial.requestPort({
        filters,
      });
      const { usbProductId, usbVendorId } = this.devicePort.getInfo();
      await this.devicePort.open({ baudRate: 115200 });
      console.log(`usb product id: ${usbProductId}`);
      console.log(`usb vender id: ${usbVendorId}`);
    } catch (error: any) {
      console.log("error: serial_set_device:", error.message);
    }
  }

  async write(data: number) {
    try {
      const writer = this.devicePort.writable.getWriter();
      const value = new Uint8Array([data]);
      await writer.write(value);

      // Allow the serial port to be closed later.
      writer.releaseLock();
      console.log(`write: ${value}`);
    } catch (error: any) {
      console.log("error: serial_write_data:", error.message);
    }
  }

  async read(): Promise<Uint8Array | undefined> {
    try {
      const reader = this.devicePort.readable.getReader();

      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          // 나중에 시리얼 포트가 클로즈될 수 있도록 해준다.
          reader.releaseLock();
          break;
        }
        // value는 Uint8Array이다.
        if (value) {
          this.value = new Uint8Array([value]);
          console.log(`read: ${this.getReadData()}`);
          return this.getReadData();
        }
      }
    } catch (error: any) {
      console.log("error: serial_read_data:", error.message);
      return undefined;
    }
  }

  getReadData() {
    const data = Object.assign([], this.value);
    return data;
  }
}
