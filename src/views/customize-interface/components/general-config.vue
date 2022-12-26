<template>
  <div class="z-index-8">
    <!-- <div class="mb-4">
      <div class="text-sm font-weight-bold mb-2">Content Theme Mode</div>
      <v-btn-toggle
        v-model="applicationStore.isDarkTheme"
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
        v-model="applicationStore.isNavDarkTheme"
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
    </div> -->
    <div>
      <div class="text-sm font-weight-bold">Primary Color</div>
      <div class="mt-2">
        <SimpleSwatches
          :colors="applicationStore.primaryColors"
          :currentColor="applicationStore.primaryColor"
          @onColorClick="vm.setPrimaryColor($event)"
        />
      </div>
    </div>
    <div class="mt-5">
      <div class="text-sm font-weight-bold mb-1">Font</div>
      <v-select
        v-model="applicationStore.font"
        :items="applicationStore.fonts"
        hide-details
        outlined
        dense
      ></v-select>
    </div>
    <div class="mt-5">
      <div class="text-sm font-weight-bold mb-1">Layout</div>
      <v-select
        v-model="applicationStore.layout"
        :items="applicationStore.defaultLayoutConfig.layouts"
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
import { applicationStore } from "@/stores/application-store";
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

  applicationStore = applicationStore;
}
</script>