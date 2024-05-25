import moment from "moment";

export class Counter {
  public startTime: moment.Moment;
  public intervalId: any;
  public pausedTime: moment.Moment | null = null;

  constructor() {
    this.startTime = moment();
  }

  sumTimes(time1: string, time2: string): string {
    // Converta as strings de tempo em durações Moment.js
    const duration1 = moment.duration(time1);
    const duration2 = moment.duration(time2);

    // Some as durações
    const totalDuration = duration1.add(duration2);

    // Extraia as horas, minutos e segundos da duração total
    const hours = String(totalDuration.hours()).padStart(2, '0');
    const minutes = String(totalDuration.minutes()).padStart(2, '0');
    const seconds = String(totalDuration.seconds()).padStart(2, '0');

    // Formate a duração total em uma string de tempo
    return `${hours}:${minutes}:${seconds}`;
  }

  startTimer(inputTime: HTMLElement) {
    // Reinicie o tempo inicial ao iniciar o timer
    this.startTime = moment();
    this.pausedTime = null;

    this.intervalId = setInterval(() => {
      const elapsedTime = moment.duration(moment().diff(this.startTime));
      const hours = String(elapsedTime.hours()).padStart(2, '0');
      const minutes = String(elapsedTime.minutes()).padStart(2, '0');
      const seconds = String(elapsedTime.seconds()).padStart(2, '0');

      const formattedTime = `${hours}:${minutes}:${seconds}`;
      inputTime.innerHTML = formattedTime;
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.intervalId);
  }

  pauseTimer() {
    clearInterval(this.intervalId);
    this.pausedTime = moment();
  }
}