import { uri } from "config";
import { ListenServerRepository } from "component/displayBoard/controller/core/listenServer";
import { idController } from "component/displayBoard/controller/id";
import { EventSourcePolyfill } from "event-source-polyfill";

class ListenServerSseRepo implements ListenServerRepository {
  private eventSource: EventSource | null = null;

  subscribeToServer(callback: (data: any) => void) {
    this.eventSource = new EventSourcePolyfill(`${uri}/display-board`, {
      headers: {
        "x-request-id": idController.generateId(),
      },
    });
    this.eventSource.onmessage = (event) => {
      callback(JSON.parse(event.data));
    };
  }

  listenToServer(callback: (data: any) => void) {
    this.eventSource?.addEventListener("message", (event) => {
      callback(JSON.parse(event.data));
    });
  }
}

const listenServerSseRepo = new ListenServerSseRepo();

export default listenServerSseRepo;
