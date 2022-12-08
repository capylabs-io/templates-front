<template>
  <div
    class="customize-drawer"
    :class="vm.drawer ? 'open-drawer' : 'close-drawer'"
  >
    <div class="px-6 pt-4">
      <div class="text-lg font-weight-bold">Customize Interface</div>
      <div class="text-sm">Theme Name</div>
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
    <v-divider class="mt-5"></v-divider>

    <div class="drawer-content">
      <v-expansion-panels
        class="expansion-container d-flex flex-column"
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
            >Layout Config</v-expansion-panel-header
          >
          <v-expansion-panel-content class="mb-4 mt-2">
            <LayoutConfig />
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-divider class="mt-2"></v-divider>

        <v-expansion-panel>
          <v-expansion-panel-header class="font-weight-bold mt-2"
            >Social Media</v-expansion-panel-header
          >
          <v-expansion-panel-content class="mb-4 mt-2">
            <SocialMedia />
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-divider class="mt-2"></v-divider>
      </v-expansion-panels>
    </div>

    <v-divider class="my-5"></v-divider>
    <div class="d-flex flex-column align-center mb-4">
      <v-btn class="button-action text-none btn-text" color="primary"
        >Save and Deploy</v-btn
      >
      <v-btn class="button-action text-none btn-text mt-2" color="gray13"
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
    GeneralConfig: () => import("../components/general-config.vue"),
    LayoutConfig: () => import("../components/layout-config.vue"),
    SocialMedia: () => import("../components/social-media.vue"),
  },
})
export default class CustomizeInterface extends Vue {
  @Inject() vm!: CustomizeInterfaceViewmodel;

  toggleDrawer() {
    this.vm.drawer = !this.vm.drawer;
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