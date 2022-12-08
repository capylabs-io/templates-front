<template>
  <div>
    <div>
      <div class="text-sm font-weight-bold">Primary Color</div>
      <div class="mt-2">
        <SimpleSwatches @onColorClick="changeBackground" />
      </div>
    </div>
    <div class="mt-5">
      <div class="text-sm font-weight-bold mb-1">Font</div>
      <v-select hide-details solo dense></v-select>
    </div>
    <div class="mt-5">
      <div class="text-sm font-weight-bold mb-1">Layout</div>
      <v-select hide-details solo dense></v-select>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Inject } from "vue-property-decorator";
import { CustomizeInterfaceViewmodel } from "../models/customize-interface-viewmodel";

@Component({
  components: {
    SimpleSwatches: () =>
      import("@/components/create-service/simple-swatches.vue"),
  },
})
export default class CustomizeInterface extends Vue {
  @Inject() vm!: CustomizeInterfaceViewmodel;

  changeBackground(data: any) {
    this.vm.setBackgroundColor(data);
  }
}
</script>