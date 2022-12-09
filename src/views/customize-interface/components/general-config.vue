<template>
  <div>
    <div>
      <div class="text-sm font-weight-bold">Primary Color</div>
      <div class="mt-2">
        <SimpleSwatches :colors="sampleColors" />
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

  sampleColors = [
    "#6A49E2",
    "#353897",
    "#4DAAF8",
    "#DA1B44",
    "#F6C453",
    "#F0845D",
  ];
}
</script>