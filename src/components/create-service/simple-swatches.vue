<template>
  <div
    class="swatches d-flex flex-wrap justify-start align-center"
    :key="componentKey"
  >
    <div
      v-for="color in colors"
      class="swatch d-flex justify-center align-center"
      :class="{ active: color == currentColor && !list, small: small }"
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
  @Prop({ default: false }) list!: boolean;
  @Prop({ default: false }) small!: boolean;

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
    if (this.list) return;
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
.small {
  height: 20px !important;
  width: 20px !important;
}
.swatch.active {
  border: #ffffff 2px solid;
}
</style>

