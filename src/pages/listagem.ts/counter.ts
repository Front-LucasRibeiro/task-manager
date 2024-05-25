import moment from "moment";

export class Counter{
  private startTime = moment();
  private intervalId: any;

  constructor(elemDisplay: HTMLElement) {
    this.startTimer(elemDisplay)
  }

  startTimer(inputTime: HTMLElement) {
    this.intervalId = setInterval(() => {
      const elapsedTime = moment.duration(moment().diff(this.startTime));
      const hours = String(elapsedTime.hours()).padStart(2, '0');
      const minutes = String(elapsedTime.minutes()).padStart(2, '0');
      const seconds = String(elapsedTime.seconds()).padStart(2, '0');

      const formattedTime = `${hours}:${minutes}:${seconds}`;
      inputTime.innerHTML = formattedTime
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.intervalId);
  }
}