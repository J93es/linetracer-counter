let instance: ContestTimerController | null = null;
export class ContestTimerController {
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  startTimer() {
    console.log("startTimer");
  }

  stopTimer() {
    console.log("stopTimer");
  }

  resetTimer() {
    console.log("resetTimer");
  }
}
