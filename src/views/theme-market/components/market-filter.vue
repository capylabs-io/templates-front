<template>
  <v-card
    class="market-filter border-radius-16 pa-6 full-height"
    color="gray12"
    elevation="0"
  >
    <div class="d-flex justify-space-between align-center">
      <div class="text-lg font-weight-bold">Filter</div>
      <v-btn
        class="text-btn text-none px-0"
        color="primary"
        @click="vm.resetFilters()"
        text
      >
        <v-icon class="mr-1" small>mdi-replay</v-icon>
        Reset Filter
      </v-btn>
    </div>
    <v-expansion-panels
      class="d-flex flex-column mt-2"
      v-model="panel"
      accordion
      flat
    >
      <v-expansion-panel>
        <v-expansion-panel-header class="font-weight-bold mt-2"
          >Categories</v-expansion-panel-header
        >
        <v-expansion-panel-content class="mb-6">
          <v-checkbox
            v-model="vm.isDao"
            class="mt-0"
            label="DAO"
            hide-details
          ></v-checkbox>
          <v-checkbox
            v-model="vm.isNFTMinter"
            label="NFT Minter"
            hide-details
          ></v-checkbox>
          <v-checkbox
            v-model="vm.isNFTStaking"
            label="NFT Staking"
            hide-details
          ></v-checkbox>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-divider class="my-2"></v-divider>

      <v-expansion-panel>
        <v-expansion-panel-header class="font-weight-bold mt-2"
          >Price Range</v-expansion-panel-header
        >
        <v-expansion-panel-content class="mb-6">
          <div class="d-flex align-center justify-space-between">
            <v-text-field
              v-model="vm.minPrice"
              class="border-radius-8"
              type="number"
              prefix="$"
              hide-details
              solo
              dense
            ></v-text-field>
            <div class="text-dp-xs gray5--text mx-2">-</div>
            <v-text-field
              v-model="vm.maxPrice"
              class="border-radius-8"
              type="number"
              prefix="$"
              hide-details
              solo
              dense
            ></v-text-field>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-divider class="my-2"></v-divider>

      <v-expansion-panel>
        <v-expansion-panel-header class="font-weight-bold mt-2"
          >Collection</v-expansion-panel-header
        >
        <v-expansion-panel-content class="mb-6">
          <v-checkbox
            v-model="vm.isOwned"
            class="mt-0"
            label="Owned"
            hide-details
          ></v-checkbox>
          <v-checkbox
            v-model="vm.isFree"
            label="Free"
            hide-details
          ></v-checkbox>
          <v-checkbox
            v-model="vm.isNew"
            label="New Arrivals"
            hide-details
          ></v-checkbox>
          <v-checkbox
            v-model="vm.isOnSale"
            value="sale"
            label="On Sale"
            hide-details
          ></v-checkbox>
          <v-checkbox
            v-model="vm.isTopSeller"
            value="top"
            label="Top Seller"
            hide-details
          ></v-checkbox>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-divider class="my-2"></v-divider>
      <v-expansion-panel>
        <v-expansion-panel-header class="font-weight-bold mt-2"
          >Rating</v-expansion-panel-header
        >
        <v-expansion-panel-content class="mb-6">
          <v-checkbox
            v-model="vm.isSilver"
            class="mt-0"
            label="Silver"
            hide-details
          ></v-checkbox>
          <v-checkbox
            v-model="vm.isGold"
            label="Gold"
            hide-details
          ></v-checkbox>
          <v-checkbox
            v-model="vm.isPlatinum"
            label="Platinum"
            hide-details
          ></v-checkbox>
          <v-checkbox
            v-model="vm.isDiamond"
            label="Diamond"
            hide-details
          ></v-checkbox>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script lang="ts">
import { Component, Inject, Vue } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import { ThemeMarketViewmodel } from "../models/theme-market-viewmodel";
@Observer
@Component({
  components: {},
})
export default class MarketFilter extends Vue {
  @Inject() vm!: ThemeMarketViewmodel;

  panel = "";
}
</script>

<style scoped>
.market-filter {
  width: 360px;
}
</style>

<style>
.theme--dark.v-expansion-panels .v-expansion-panel {
  background: transparent !important;
}
.v-application--is-ltr .v-expansion-panel-header,
.v-expansion-panel-content__wrap {
  padding: 0px;
}
</style>