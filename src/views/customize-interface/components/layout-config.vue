<template>
  <div>
    <div>
      <div class="d-flex align-center">
        <div class="text-sm font-weight-bold mr-1 mb-1">Token Icon</div>
        <v-icon small>mdi-information-outline</v-icon>
      </div>
      <v-file-input
        accept="image/*"
        placeholder="File input"
        append-icon="mdi-cloud-upload-outline"
        prepend-icon=""
        solo
        dense
      ></v-file-input>
    </div>
    <div>
      <div class="d-flex align-center">
        <div class="text-sm font-weight-bold mr-1 mb-1">Brand Logo</div>
        <v-icon small>mdi-information-outline</v-icon>
      </div>
      <v-file-input
        accept="image/*"
        placeholder="File input"
        append-icon="mdi-cloud-upload-outline"
        prepend-icon=""
        solo
        dense
      ></v-file-input>
    </div>
    <div>
      <div class="d-flex align-center">
        <div class="text-sm font-weight-bold mr-1 mb-1">
          Banner <span class="text-sm gray6--text">(7.2:1)</span>
        </div>
        <v-icon small>mdi-information-outline</v-icon>
      </div>
      <v-file-input
        accept="image/*"
        placeholder="File input"
        append-icon="mdi-cloud-upload-outline"
        prepend-icon=""
        solo
        dense
      ></v-file-input>
    </div>
    <div>
      <div class="d-flex align-center">
        <div class="mr-1">
          Side Banner <span class="text-sm gray6--text">(4:3)</span>
        </div>
        <v-icon small>mdi-information-outline</v-icon>
      </div>
      <v-file-input
        accept="image/*"
        placeholder="File input"
        append-icon="mdi-cloud-upload-outline"
        prepend-icon=""
        solo
        dense
      ></v-file-input>
    </div>
  </div>
</template>
  
  <script lang="ts">
import { Vue, Component, Inject } from "vue-property-decorator";
import { CustomizeInterfaceViewmodel } from "../models/customize-interface-viewmodel";

@Component({
  components: {},
})
export default class CustomizeInterface extends Vue {
  @Inject() vm!: CustomizeInterfaceViewmodel;
}
</script>