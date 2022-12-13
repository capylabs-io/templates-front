<template>
  <div class="swatches d-flex flex-wrap justify-start align-center">
    <div
      class="swatch d-flex justify-center align-center"
      v-for="color in colors"
      :class="{ active: color == currentColor }"
      :key="color"
      :style="{ background: `${color}` }"
      @click="onColorClick(color)"
    ></div>
  </div>
</template>

<script lang="ts">
import { layoutStore } from "@/stores/layout-store";
import { Vue, Component, Prop, Watch } from "vue-property-decorator";

@Component({
  components: {},
})
export default class CustomizeInterface extends Vue {
  @Prop() colors!: string[];

  currentColor = "#FFFFFF";
  layoutStore = layoutStore;

  @Watch("layoutStore.primaryColor", {
    immediate: true,
  })
  onCurrentColorChanged(val: string) {
    if (!val)
      this.currentColor = this.$vuetify.theme.currentTheme.primary!.toString();
    else this.currentColor = val;
  }
  onColorClick(chosenColor: string) {
    this.currentColor = chosenColor;
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

