"use strict";

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.parent = document.querySelector(selector);
    this.targetDate = targetDate;
    this.refs = {
      days: this.parent.querySelector('[data-value="days"]'),
      hours: this.parent.querySelector('[data-value="hours"]'),
      mins: this.parent.querySelector('[data-value="mins"]'),
      secs: this.parent.querySelector('[data-value="secs"]'),
    };
    this.timerDate = new Date(this.targetDate).getTime();
  }

  padStrStart(num) {
    return String(num).padStart(2, 0);
  }

  getUnits(time) {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((time % (1000 * 60)) / 1000);
    return { days, hours, mins, secs };
  }

  renderTime(time) {
    let { days, hours, mins, secs } = time;
    this.refs.days.textContent = this.padStrStart(days);
    this.refs.hours.textContent = this.padStrStart(hours);
    this.refs.mins.textContent = this.padStrStart(mins);
    this.refs.secs.textContent = this.padStrStart(secs);
  }

  getTime() {
    const timeObj = this.getUnits(this.timerDate - Date.now());
    this.renderTime(timeObj);
  }

  startTimer() {
    let time = this.targetDate - Date.now();
    if (time > 0) {
      this.getTime();
      let stopInterval = setTimeout(() => {
        this.startTimer();
      }, 1000);
      if (time <= 0) {
        clearTimeout(stopInterval);
      }
    }
  }
}

const timer = new CountdownTimer({
  selector: "#timer-1",
  // targetDate: new Date(Date.now() - 10000),
  targetDate: new Date("Sep 17, 2021"),
});

timer.startTimer();

// console.log(timer);
