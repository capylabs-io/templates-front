<template>
  <div class="customize-drawer">
    <div>
      <div>Customize Interface</div>
      <div>Theme Name</div>
    </div>
    <div>
      <div>Primary Color</div>
      <div>
        <SimpleSwatches />
      </div>
    </div>
    <v-divider></v-divider>
    <div>
      <div>Font</div>
      <v-select hide-details solo dense></v-select>
    </div>
    <div>
      <div>Layout</div>
      <v-select hide-details solo dense></v-select>
    </div>
    <v-divider></v-divider>
    <div>
      <div class="d-flex align-center">
        <div class="mr-1">Token Icon</div>
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
        <div class="mr-1">Brand Logo</div>
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
    <v-divider></v-divider>
    <div>
      <div class="d-flex align-center justify-space-between">
        <div>Social</div>
        <v-btn icon>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>
      <div>
        <div class="d-flex align-center">
          <div class="d-flex align-center">
            <v-select
              class="media-select"
              :items="vm.mediaIcons"
              hide-details
              outlined
              dense
            >
              <template #selection="{ item }">
                <v-icon>{{ item.icon }}</v-icon>
              </template>
              <template #item="{ item }">
                <div class="media-select-item">
                  <v-icon>{{ item.icon }}</v-icon>
                </div>
              </template>
            </v-select>
            <v-divider vertical></v-divider>
            <v-text-field hide-details outlined dense></v-text-field>
          </div>
          <v-btn icon>
            <v-icon>mdi-trash-can</v-icon>
          </v-btn>
        </div>
      </div>
    </div>
    <v-divider></v-divider>
    <div class="d-flex flex-column align-center">
      <v-btn class="button-action text-none btn-text" color="primary"
        >Save and Deploy</v-btn
      >
      <v-btn class="button-action text-none btn-text" color="gray13"
        >Cancel</v-btn
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Inject } from "vue-property-decorator";
import { CustomizeInterfaceViewmodel } from "../models/customize-interface-viewmodel";

@Component({
  components: {
    ThemeSelector: () => import("./theme-selector.vue"),
    SimpleSwatches: () =>
      import("@/components/create-service/simple-swatches.vue"),
  },
})
export default class CustomizeInterface extends Vue {
  @Inject() vm!: CustomizeInterfaceViewmodel;
}
</script>

<style scoped>
.button-action {
  width: 150px;
}
.media-select {
  max-width: 76px;
  margin-right: -1px;
}
.media-select-item {
  max-width: 48px;
}
.customize-drawer {
  max-width: 312px !important;
  background: var(--v-gray12-base);
}
</style>