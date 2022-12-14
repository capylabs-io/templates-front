<template>
  <v-app-bar
    :light="!layoutStore.isNavDarkTheme"
    :dark="layoutStore.isNavDarkTheme"
  >
    <div class="full-width d-flex align-center justify-space-between px-2">
      <div class="font-weight-bold">Your Logo Here</div>
      <v-btn
        class="text-none"
        elevation="0"
        :color="layoutStore.primaryColor"
        dark
        >Connect Wallet</v-btn
      >
    </div>
  </v-app-bar>
</template>

<script lang="ts">
import { layoutStore } from "@/stores/layout-store";
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {},
})
export default class DaoNavigationBar extends Vue {
  layoutStore = layoutStore;
}
</script>