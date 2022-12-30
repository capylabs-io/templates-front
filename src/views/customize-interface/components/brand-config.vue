<template>
  <div>
    <div>
      <div class="d-flex align-center mb-1">
        <div class="text-sm font-weight-bold mr-1">Brand Logo</div>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on" small
              >mdi-information-outline</v-icon
            >
          </template>
          <span>Recommended Height: 24px</span>
        </v-tooltip>
      </div>
      <v-file-input
        :placeholder="applicationStore.brandLogoName"
        @change="vm.changeBrandLogo($event)"
        accept="image/*"
        append-icon="mdi-cloud-upload-outline"
        prepend-icon=""
        clearable
        solo
        dense
      ></v-file-input>
    </div>
    <div>
      <div class="d-flex align-center mb-1">
        <div class="text-sm font-weight-bold mr-1">Token Icon</div>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on" small
              >mdi-information-outline</v-icon
            >
          </template>
          <span>Recommended Size: 24 x 24 (px)</span>
        </v-tooltip>
      </div>
      <v-file-input
        :placeholder="applicationStore.tokenIconName"
        @change="vm.changeTokenIcon($event)"
        accept="image/*"
        append-icon="mdi-cloud-upload-outline"
        prepend-icon=""
        clearable
        solo
        dense
      ></v-file-input>
    </div>
    <div>
      <div class="d-flex align-center mb-1">
        <div class="text-sm font-weight-bold mr-1">
          Banner <span class="text-sm gray6--text">(8:1)</span>
        </div>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on" small
              >mdi-information-outline</v-icon
            >
          </template>
          <span>Recommended Size: 1440 x 220 (px) - Aspect Ratio: 8:1</span>
        </v-tooltip>
      </div>
      <v-file-input
        :placeholder="applicationStore.bannerName"
        @change="vm.changeBanner($event)"
        accept="image/*"
        append-icon="mdi-cloud-upload-outline"
        prepend-icon=""
        clearable
        solo
        dense
      ></v-file-input>
    </div>
    <div>
      <div class="d-flex align-center">
        <div class="mr-1">
          Side Banner <span class="text-sm gray6--text">(3:4)</span>
        </div>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on" small
              >mdi-information-outline</v-icon
            >
          </template>
          <span>Recommended Size: 432 x 576 (px) - Aspect Ratio: 3:4</span>
        </v-tooltip>
      </div>
      <v-file-input
        :placeholder="applicationStore.sideBannerName"
        @change="vm.changeSideBanner($event)"
        accept="image/*"
        append-icon="mdi-cloud-upload-outline"
        prepend-icon=""
        clearable
        solo
        dense
      ></v-file-input>
    </div>
  </div>
</template>
  
  <script lang="ts">
import { applicationStore } from "@/stores/application-store";
import { Vue, Component, Inject } from "vue-property-decorator";
import { CustomizeInterfaceViewmodel } from "../models/customize-interface-viewmodel";

@Component({
  components: {},
})
export default class CustomizeInterface extends Vue {
  @Inject() vm!: CustomizeInterfaceViewmodel;

  applicationStore = applicationStore;
}
</script>