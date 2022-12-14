<template>
  <div class="z-index-8">
    <div class="mb-4">
      <div class="text-sm font-weight-bold mb-2">Content Theme Mode</div>
      <v-btn-toggle
        v-model="layoutStore.isDarkTheme"
        color="primary"
        flat
        dense
        divided
        mandatory
      >
        <v-btn :value="false">
          <v-icon>mdi-weather-sunny</v-icon>
        </v-btn>
        <v-btn :value="true">
          <v-icon>mdi-moon-waning-crescent</v-icon>
        </v-btn>
      </v-btn-toggle>
    </div>
    <div class="mb-4">
      <div class="text-sm font-weight-bold mb-2">Header & Footer Mode</div>
      <v-btn-toggle
        v-model="layoutStore.isNavDarkTheme"
        color="primary"
        flat
        dense
        divided
        mandatory
      >
        <v-btn :value="false">
          <v-icon>mdi-weather-sunny</v-icon>
        </v-btn>
        <v-btn :value="true">
          <v-icon>mdi-moon-waning-crescent</v-icon>
        </v-btn>
      </v-btn-toggle>
    </div>
    <div>
      <div class="text-sm font-weight-bold">Primary Color</div>
      <div class="mt-2">
        <SimpleSwatches
          :colors="layoutStore.defaultLayoutConfig.primaryColors"
          @onColorClick="vm.setPrimaryColor($event)"
        />
      </div>
    </div>
    <div class="mt-5">
      <div class="text-sm font-weight-bold mb-1">Font</div>
      <v-select
        v-model="layoutStore.font"
        :items="layoutStore.defaultLayoutConfig.fonts"
        item-text="title"
        item-value="value"
        hide-details
        outlined
        dense
      ></v-select>
    </div>
    <div class="mt-5">
      <div class="text-sm font-weight-bold mb-1">Layout</div>
      <v-select
        v-model="layoutStore.layout"
        :items="layoutStore.defaultLayoutConfig.layouts"
        item-text="title"
        item-value="value"
        hide-details
        outlined
        dense
      ></v-select>
    </div>
  </div>
</template>

<script lang="ts">
import { layoutStore } from "@/stores/layout-store";
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

  layoutStore = layoutStore;
}
</script>