<template>
  <div class="elevation-0 FRL-font d-flex" v-bind="$attrs">
    <div class="text-center">
      <div class="number">
        <span>{{ days }}</span>
        <span>d</span>
        <span class="mx-1">:</span>
      </div>
    </div>
    <div class="text-center">
      <div class="number">
        <span>{{ hours | twoDigits }}</span>
        <span>h</span>
        <span class="mx-1">:</span>
      </div>
    </div>
    <div class="text-center">
      <div class="number">
        <span>{{ minutes | twoDigits }}</span>
        <span>m</span>
        <span class="mx-1">:</span>
      </div>
    </div>
    <div class="text-center">
      <div class="number">
        <span>{{ seconds | twoDigits }}</span>
        <span>s</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.number {
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.02em;
}
.text {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
}
.line {
  width: 1px;
  height: 32px;
  left: 120.83px;
  margin-bottom: 25px;
  background: #565a61;
}
</style>

<script>
import moment from "moment";
export default {
  name: "Count-down",
  props: {
    targetDate: String,
  },
  mounted() {
    this.countdownInterval = setInterval(() => {
      this.startTimer();
    }, 1000);
  },
  destroyed() {
    clearInterval(this.countdownInterval);
  },
  data() {
    return {
      now: moment.unix(1645714800).toISOString(),
      countdownInterval: null,
      millisecondsInOneSecond: 1000,
      millisecondsInOneMinute: 1000 * 60,
      millisecondsInOneHour: 1000 * 60 * 60,
      millisecondsInOneDay: 1000 * 60 * 60 * 24,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  },
  methods: {
    startTimer: function () {
      const timeNow = new Date().getTime();
      const result = new Date(this.targetDate).getTime();
      const timeDifference = result - timeNow;
      if (timeDifference < 0) {
        clearInterval(this.countdownInterval);
      }
      const differenceInDays = timeDifference / this.millisecondsInOneDay;
      const remainderDifferenceInHours =
        (timeDifference % this.millisecondsInOneDay) /
        this.millisecondsInOneHour;
      const remainderDifferenceInMinutes =
        (timeDifference % this.millisecondsInOneHour) /
        this.millisecondsInOneMinute;
      const remainderDifferenceInSeconds =
        (timeDifference % this.millisecondsInOneMinute) /
        this.millisecondsInOneSecond;
      this.days = Math.floor(differenceInDays);
      this.hours = Math.floor(remainderDifferenceInHours);
      this.minutes = Math.floor(remainderDifferenceInMinutes);
      this.seconds = Math.floor(remainderDifferenceInSeconds);
    },
  },
  // computed: {
  //   isSmAndDown() {
  //     return this.$vuetify.breakpoint.smAndDown;
  //   },
  //   dateInMilliseconds() {
  //     if (!this.targetDate) return 0;
  //     return Math.trunc(Date.parse(this.targetDate) / 1000);
  //   },
  //   seconds() {
  //     if (!this.targetDate || this.dateInMilliseconds === 0) return 0;
  //     return (this.dateInMilliseconds - this.now) % 60;
  //   },
  //   minutes() {
  //     if (!this.targetDate || this.dateInMilliseconds === 0) return 0;
  //     return Math.trunc((this.dateInMilliseconds - this.now) / 60) % 60;
  //   },
  //   hours() {
  //     if (!this.targetDate || this.dateInMilliseconds === 0) return 0;
  //     return Math.trunc((this.dateInMilliseconds - this.now) / 60 / 60) % 24;
  //   },
  //   days() {
  //     if (!this.targetDate || this.dateInMilliseconds === 0) return 0;
  //     return Math.trunc((this.dateInMilliseconds - this.now) / 60 / 60 / 24);
  //   },
  // },
};
</script>
