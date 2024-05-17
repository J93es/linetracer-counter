import { v4 as uuidv4 } from "uuid";

import { IdController } from "@core/util//idController";

let instance: UuidController | null = null;
export class UuidController implements IdController {
  constructor() {
    if (instance) return instance;
    instance = this;
  }

  generateId() {
    return uuidv4();
  }
}
