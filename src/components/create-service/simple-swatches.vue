<template>
  <div class="swatches d-flex flex-wrap justify-start align-center">
    <div
      class="swatch d-flex justify-center align-center"
      v-for="(n, index) in colors"
      :class="{ active: current == index }"
      :key="n"
      :style="{ background: `${n}` }"
      @click="onColorClick(index)"
    ></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  components: {},
})
export default class CustomizeInterface extends Vue {
  @Prop({
    default: ["#6A49E2", "#353897", "#4DAAF8", "#DA1B44", "#F6C453", "#F0845D"],
  })
  colors!: string[];

  current: number = 0;
  onColorClick(index: number) {
    this.current = index;
    this.$emit("onColorClick", this.colors![index]);
  }
}
</script>

<style scoped>
.swatches {
  gap: 12px;
}
.swatch {
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  height: 36px;
  width: 36px;
}
.swatch.active {
  border: #ffffff 2px solid;
}
</style>

