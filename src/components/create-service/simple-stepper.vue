<template>
  <div class="d-flex full-width step-lines">
    <div
      v-for="step in totalStep - 1"
      class="step-line flex-grow-1"
      :class="{ active: step <= currentStep }"
      :key="step"
    ></div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";

@Component
export default class SimpleStepper extends Vue {
  @Prop({ default: 1 }) currentStep!: number;
  @Prop({ default: 1 }) totalStep!: number;
}
</script>

<style scoped>
.step-lines {
  gap: 8px;
}
.step-line {
  height: 4px !important;
  background: var(--v-gray10-base) !important;
}
.active {
  background: var(--v-primary-base) !important;
}
</style>
