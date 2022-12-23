<template>
  <div
    class="swatches d-flex flex-wrap justify-start align-center"
    :key="componentKey"
  >
    <div
      class="swatch d-flex justify-center align-center"
      v-for="color in colors"
      :class="{ active: color == currentColor }"
      :key="color"
      :style="{ background: `${color} !important` }"
      @click="onColorClick(color)"
    ></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";

@Component({
  components: {},
})
export default class CustomizeInterface extends Vue {
  @Prop() colors!: string[];
  @Prop() currentColor?: string;

  componentKey = 1;

  @Watch("colors", {
    immediate: true,
  })
  onColorsChanged(val: any) {
    if (!val) return;
    if (!this.currentColor) this.$emit("onColorClick", this.colors[0]);
    this.componentKey += 1;
  }
  onColorClick(chosenColor: string) {
    this.$emit("onColorClick", chosenColor);
  }
}
</script>

<style scoped>
.swatches {
  gap: 8px;
}
.swatch {
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  height: 28px;
  width: 28px;
}
.swatch.active {
  border: #ffffff 2px solid;
}
</style>

