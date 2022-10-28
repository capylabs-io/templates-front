<template>
  <div>
    <!-- <div>
      <ThemeSelector />
    </div> -->
    <div class="customize-layout d-flex">
      <CustomizeDrawer />
      <div class="layout-content">
        <v-app-bar>
          <v-select class="page-select" hide-details dense outlined></v-select>
        </v-app-bar>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Provide } from "vue-property-decorator";
import { CustomizeInterfaceViewmodel } from "../models/customize-interface-viewmodel";

@Component({
  components: {
    ThemeSelector: () => import("./theme-selector.vue"),
    CustomizeDrawer: () => import("./customize-drawer.vue"),
  },
})
export default class CustomizeInterface extends Vue {
  @Provide() vm = new CustomizeInterfaceViewmodel();
}
</script>

<style scoped>
.customize-layout {
  z-index: 999;
  position: absolute;
  top: -64px;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
}
.layout-content {
  background: rebeccapurple !important;
  width: 100%;
}
.page-select {
  max-width: 164px !important;
}
</style>