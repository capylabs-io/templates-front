<template>
  <div
    class="elevation-0 FRL-font d-flex justify-space-around align-end"
    v-bind="$attrs"
  >
    <div class="text-center">
      <div class="mt-2 number">
        {{ days | twoDigits }}
      </div>
      <div class="text">Days</div>
    </div>
    <div class="line"></div>
    <div class="text-center">
      <div class="mt-2 number">
        {{ hours | twoDigits }}
      </div>
      <div class="text">Hours</div>
    </div>
    <div class="line"></div>
    <div class="text-center">
      <div class="mt-2 number">
        {{ minutes | twoDigits }}
      </div>
      <div class="text">Minutes</div>
    </div>
    <div class="line"></div>
    <div class="text-center">
      <div class="mt-2 number">
        {{ seconds | twoDigits }}
      </div>
      <div class="text">Seconds</div>
    </div>
  </div>
</template>

<style scoped>
.number {
  font-weight: 600;
  font-size: 36px;
  line-height: 40px;
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
import { computed } from "vue";
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class Countdown extends Vue {
  @Prop() targetDate;
  mounted() {
    this.countdownInterval = setInterval(() => {
      this.now = Math.trunc(new Date().getTime() / 1000);
    }, 1000);
  }
  destroyed() {
    clearInterval(this.countdownInterval);
  }

  data() {
    return {
      now: moment.unix(1645714800).toISOString(),
      countdownInterval: null,
    };
  }

  @computed isSmAndDown() {
    return this.$vuetify.breakpoint.smAndDown;
  }
  @computed dateInMilliseconds() {
    if (!this.targetDate) return 0;
    return Math.trunc(Date.parse(this.targetDate) / 1000);
  }

  @computed seconds() {
    if (!this.targetDate || this.dateInMilliseconds === 0) return 0;
    return (this.dateInMilliseconds - this.now) % 60;
  }
  @computed minutes() {
    if (!this.targetDate || this.dateInMilliseconds === 0) return 0;
    return Math.trunc((this.dateInMilliseconds - this.now) / 60) % 60;
  }
  @computed hours() {
    if (!this.targetDate || this.dateInMilliseconds === 0) return 0;
    return Math.trunc((this.dateInMilliseconds - this.now) / 60 / 60) % 24;
  }
  @computed days() {
    if (!this.targetDate || this.dateInMilliseconds === 0) return 0;
    return Math.trunc((this.dateInMilliseconds - this.now) / 60 / 60 / 24);
  }
}
</script>
