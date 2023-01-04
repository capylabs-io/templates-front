<template>
  <div class="market-container d-flex pa-6 mx-auto">
    <MarketFilter />
    <Themes />
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import { ThemeMarketViewmodel } from "../models/theme-market-viewmodel";
@Observer
@Component({
  components: {
    MarketFilter: () => import("../components/market-filter.vue"),
    Themes: () => import("../components/_themes.vue"),
  },
})
export default class ThemeMarket extends Vue {
  @Provide() vm = new ThemeMarketViewmodel();
}
</script>

<style scoped>
.market-container {
  max-width: 1600px;
  gap: 24px !important;
}
</style>