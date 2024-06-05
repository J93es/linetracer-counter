import { ListenServerRepository } from "component/displayBoard/controller/core/listenServer";

class ListenServerSseRepo implements ListenServerRepository {
  private eventSource: EventSource | null = null;

  subscribeToServer(callback: (data: any) => void) {
    this.eventSource = new EventSource("http://localhost:8000/display-board");
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
