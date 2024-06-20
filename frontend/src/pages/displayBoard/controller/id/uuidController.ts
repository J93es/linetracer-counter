import { v4 as uuidv4 } from "uuid";
import { IdController } from "pages/displayBoard/controller/core/id";

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
