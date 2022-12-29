<template>
  <v-card
    class="market-filter border-radius-16 pa-6"
    color="gray12"
    elevation="0"
  >
    <div class="d-flex justify-space-between align-center">
      <div class="text-lg font-weight-bold">Filter</div>
      <v-btn class="text-btn text-none px-0" color="primary" text>
        <v-icon class="mr-1" small>mdi-replay</v-icon>
        Reset Filter
      </v-btn>
    </div>
    <v-expansion-panels
      class="d-flex flex-column"
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
            class="mt-0"
            value="dao"
            label="DAO"
            hide-details
          ></v-checkbox>
          <v-checkbox
            value="minter"
            label="NFT Minter"
            hide-details
          ></v-checkbox>
          <v-checkbox
            value="staking"
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
              class="border-radius-8"
              type="number"
              prefix="$"
              hide-details
              solo
              dense
            ></v-text-field>
            <div class="text-dp-xs gray5--text mx-2">-</div>
            <v-text-field
              class="border-radius-8"
              type="number"
              prefix="$"
              hide-details
              solo
              dense
            ></v-text-field>
            <v-btn class="text-none btn-text rounded-lg ml-3" color="primary"
              >Apply</v-btn
            >
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
            class="mt-0"
            value="free"
            label="Free"
            hide-details
          ></v-checkbox>
          <v-checkbox
            value="new"
            label="New Arrivals"
            hide-details
          ></v-checkbox>
          <v-checkbox value="sale" label="On Sale" hide-details></v-checkbox>
          <v-checkbox value="top" label="Top Seller" hide-details></v-checkbox>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-divider class="my-2"></v-divider>
      <v-expansion-panel>
        <v-expansion-panel-header class="font-weight-bold mt-2"
          >Rating</v-expansion-panel-header
        >
        <v-expansion-panel-content class="mb-6">
          <v-checkbox
            class="mt-0"
            value="silver"
            label="Silver"
            hide-details
          ></v-checkbox>
          <v-checkbox value="gold" label="Gold" hide-details></v-checkbox>
          <v-checkbox value="diamond" label="Diamond" hide-details></v-checkbox>
          <v-checkbox
            value="platinum"
            label="Platinum"
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