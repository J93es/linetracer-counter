export interface ListenServerRepository {
  subscribeToServer: (callback: (data: any) => void) => void;
  listenToServer: (callback: (data: any) => void) => void;
}
