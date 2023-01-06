<template>
  <div class="customize-drawer">
    <div class="px-6 pt-4">
      <div class="text-lg font-weight-bold">Customize Interface</div>
      <div class="d-flex align-center">
        <div class="text-sm">Theme Name</div>
        <v-btn @click="backToThemeSelector()" icon>
          <v-icon color="primary" small>mdi-launch</v-icon>
        </v-btn>
      </div>
      <v-select
        v-model="vm.selectedPage"
        :items="vm.appMainPages"
        item-text="title"
        item-value="value"
        class="page-select mt-4"
        hide-details
        dense
        outlined
      ></v-select>
    </div>

    <div class="drawer-content mt-8">
      <v-form v-model="vm.customizeForm" ref="customizeForm">
        <v-divider></v-divider>
        <v-expansion-panels
          v-model="panel"
          class="expansion-container d-flex flex-column z-index-8"
          accordion
          flat
        >
          <v-expansion-panel>
            <v-expansion-panel-header class="font-weight-bold mt-2"
              >General Config</v-expansion-panel-header
            >
            <v-expansion-panel-content class="mb-4 mt-2">
              <GeneralConfig />
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-divider class="mt-2"></v-divider>

          <v-expansion-panel>
            <v-expansion-panel-header class="font-weight-bold mt-2"
              >Custom Branding</v-expansion-panel-header
            >
            <v-expansion-panel-content class="mb-4 mt-2">
              <BrandConfig />
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-divider class="mt-2"></v-divider>

          <v-expansion-panel>
            <v-expansion-panel-header class="font-weight-bold mt-2">
              <div>
                Social Media
                <v-chip color="primary" class="ml-1" small>{{
                  applicationStore.socialMedias.length
                }}</v-chip>
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="mb-4 mt-2">
              <SocialMedia />
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-divider class="mt-2"></v-divider>
        </v-expansion-panels>
      </v-form>
    </div>

    <v-divider></v-divider>

    <div class="d-flex flex-column align-center my-4">
      <v-btn
        class="button-action text-none btn-text"
        color="primary"
        elevation="0"
        @click="onBtnSaveClicked"
        :disabled="!vm.customizeForm"
        >Save and Deploy</v-btn
      >
      <v-btn
        class="button-action text-none btn-text mt-2"
        color="gray13"
        elevation="0"
        @click="onBtnCancelClicked"
        >Cancel</v-btn
      >
    </div>
  </div>
</template>

<script lang="ts">
import { applicationStore } from "@/stores/application-store";
import { Vue, Component, Inject } from "vue-property-decorator";
import { CustomizeInterfaceViewmodel } from "../models/customize-interface-viewmodel";

@Component({
  components: {
    ThemeSelector: () => import("./theme-selector.vue"),
    SimpleSwatches: () =>
      import("@/components/create-service/simple-swatches.vue"),
    GeneralConfig: () => import("../components/general-config.vue"),
    BrandConfig: () => import("../components/brand-config.vue"),
    SocialMedia: () => import("../components/social-media.vue"),
  },
})
export default class CustomizeInterface extends Vue {
  @Inject() vm!: CustomizeInterfaceViewmodel;

  panel: number = 0;
  applicationStore = applicationStore;

  onBtnSaveClicked() {
    // if (!(this.$refs.layoutForm as any).validate()) return;
    this.vm.updateApplicationMetadata();
  }

  onBtnCancelClicked() {
    this.$router.go(-1);
  }

  backToThemeSelector() {
    this.vm.setChoosingTheme(true);
  }
}
</script>

<style scoped>
.button-action {
  width: 150px;
}

.button-close {
  position: absolute;
  right: -44px;
  top: 12px;
}
.media-select {
  max-width: 76px;
  margin-right: -1px;
}
.media-select-item {
  max-width: 48px;
}
.customize-drawer {
  flex: 1 0 312px !important;
  background: var(--v-gray12-base);
  z-index: 10 !important;
  transition: margin-left 0.5s;
  position: relative;
  border-right: 1px solid var(--v-gray11-base);
}
.drawer-content {
  height: calc(100% - 140px - 120px - 16px) !important;
  overflow-x: hidden;
  overflow-y: auto;
}

.theme--dark .expansion-container.v-expansion-panels .v-expansion-panel {
  background: var(--v-gray12-base) !important;
}
.active-header {
  color: var(--v-primary-base) !important;
}
</style>