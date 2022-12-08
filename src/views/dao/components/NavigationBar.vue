<template>
  <v-app-bar>
    <div class="full-width d-flex align-center justify-space-between px-2">
      <v-img :src="require('@/assets/logo.png')" max-width="32px" contain />
      <v-btn class="text-none" color="primary" elevation="0"
        >Connect Wallet</v-btn
      >
    </div>
  </v-app-bar>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {},
})
export default class DaoNavigationBar extends Vue {}
</script>