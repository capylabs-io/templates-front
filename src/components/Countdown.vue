<template>
  <div
    class="elevation-0 FRL-font d-flex"
    v-bind="$attrs"
  >
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
  color: #ffffff;
}
.text {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #bfc2c5;
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
      this.now = Math.trunc(new Date().getTime() / 1000);
    }, 1000);
  },
  destroyed() {
    clearInterval(this.countdownInterval);
  },
  data() {
    return {
      now: moment.unix(1645714800).toISOString(),
      countdownInterval: null,
    };
  },
  computed: {
    isSmAndDown() {
      return this.$vuetify.breakpoint.smAndDown;
    },
    dateInMilliseconds() {
      if (!this.targetDate) return 0;
      return Math.trunc(Date.parse(this.targetDate) / 1000);
    },
    seconds() {
      if (!this.targetDate || this.dateInMilliseconds === 0) return 0;
      return (this.dateInMilliseconds - this.now) % 60;
    },
    minutes() {
      if (!this.targetDate || this.dateInMilliseconds === 0) return 0;
      return Math.trunc((this.dateInMilliseconds - this.now) / 60) % 60;
    },
    hours() {
      if (!this.targetDate || this.dateInMilliseconds === 0) return 0;
      return Math.trunc((this.dateInMilliseconds - this.now) / 60 / 60) % 24;
    },
    days() {
      if (!this.targetDate || this.dateInMilliseconds === 0) return 0;
      return Math.trunc((this.dateInMilliseconds - this.now) / 60 / 60 / 24);
    },
  },
};
</script>
