let instance: SerialPortController | null = null;
export class SerialPortController {
  private port: any;
  private buffer: { writeTime: number; value: Uint8Array }[] = [];
  private keepReading: boolean = false;
  private reader: any;
  private writer: any;

  constructor() {
    if (!instance) {
      if ("serial" in navigator) {
        console.log("This browser supports web serial api");
      } else {
        alert("This browser does not supports web serial api: Use Chrome");
      }

      instance = this;
      this.port = null;
    }
    return instance;
  }

  isPortOpened(): boolean {
    return this.port !== null;
  }

  isPortReadable(): boolean {
    return this.port?.readable === true;
  }

  isPortWritable(): boolean {
    return this.port?.writable === true;
  }

  isKeepReading(): boolean {
    return this.keepReading === true;
  }

  isBufferEmpty(): boolean {
    return !(this.buffer.length !== 0);
  }

  shiftBuffer(): { writeTime: number; value: Uint8Array } | null {
    if (this.isBufferEmpty()) {
      return null;
    }
    return this.buffer.shift() ?? null;
  }

  async openPort() {
    // Prompt user to select an Arduino Uno device.
    try {
      const filters: string[] = [];
      this.port = await (navigator as any).serial.requestPort({
        filters,
      });
      const { usbProductId, usbVendorId } = this.port.getInfo();
      await this.port.open({ baudRate: 115200 });
      console.log(`usb product id: ${usbProductId}`);
      console.log(`usb vender id: ${usbVendorId}`);
    } catch (error: any) {
      console.log("error: serial_set_device:", error.message);
    }
  }

  async closePort() {
    try {
      this.keepReading = false;
      this.reader.cancel();
      await this.port.close();
    } catch (error: any) {
      console.log("error: serial_close_device:", error.message);
    }
  }

  async write(data: number) {
    try {
      this.writer = this.port.writable.getWriter();
      const value = new Uint8Array([data]);
      await this.writer.write(value);

      // Allow the serial port to be closed later.
      this.writer.releaseLock();
      console.log(`write: ${value}`);
    } catch (error: any) {
      console.log("error: serial_write_data:", error.message);
    }
  }

  async readUntilClosed() {
    try {
      this.keepReading = true;
      this.reader = this.port.readable.getReader();

      while (this.port.readable && this.keepReading) {
        const { value, done } = await this.reader.read();
        if (done) {
          // 나중에 시리얼 포트가 클로즈될 수 있도록 해준다.
          this.reader.releaseLock();
          break;
        }
        // value는 Uint8Array이다.
        if (value) {
          this.buffer.push({ writeTime: Date.now(), value: value });
        }
      }

      await this.port.close();
    } catch (error: any) {
      console.log("error: serial_read_data:", error.message);
    }
  }
}
