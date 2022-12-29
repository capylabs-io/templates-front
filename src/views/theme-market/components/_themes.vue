<template>
  <div class="full-width">
    <div class="d-flex justify-space-between">
      <div class="d-flex align-center">
        <span class="text-overline text-uppercase gray6--text">Result:</span>
        <span class="font-weight-bold ml-1"
          >{{ vm.themes?.length || 0 }} items</span
        >
      </div>
      <div class="d-flex align-center">
        <div>Sort by</div>
        <v-select
          class="ml-3"
          placeholder="Sort"
          solo
          dense
          hide-details
        ></v-select>
      </div>
    </div>
    <v-row class="mt-4">
      <v-col cols="12" lg="4" md="6" v-for="theme in vm.themes" :key="theme.id">
        <MarketThemeCard :theme="theme" />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Inject, Vue } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import { ThemeMarketViewmodel } from "../models/theme-market-viewmodel";
@Observer
@Component({
  components: {
    MarketThemeCard: () => import("../components/market-theme-card.vue"),
  },
})
export default class MarketThemes extends Vue {
  @Inject() vm!: ThemeMarketViewmodel;

  async created() {
    await this.vm.fetchThemes();
  }
}
</script>