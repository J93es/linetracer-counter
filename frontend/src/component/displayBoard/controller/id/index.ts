import { IdController } from "component/displayBoard/controller/core/id";
import { UuidController } from "component/displayBoard/controller/id/uuidController";

export const idController: IdController = new UuidController();
