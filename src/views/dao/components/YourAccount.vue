<template>
  <v-card
    class="pa-4 border-radius-16 text-sm font-weight-regular"
    :class="
      applicationStore.isDarkTheme
        ? 'box-border-gray11 white--text'
        : 'black--text'
    "
    :style="'background:' + applicationStore.cardColor + ' !important'"
    outlined
  >
    <div class="d-flex justify-space-between">
      <div class="font-weight-bold text-lg">Your Account</div>
      <!-- <div
        class="d-flex cursor-pointer align-center"
        :style="'color:' + applicationStore.primaryColor"
      >
        <span>View</span>
        <v-icon :color="applicationStore.primaryColor" small>
          mdi-chevron-right</v-icon
        >
      </div> -->
    </div>
    <div
      class="pa-4 mt-3 border-radius-8"
      :class="
        applicationStore.isDarkTheme
          ? 'white--text box-border-gray11'
          : 'black--text'
      "
      :style="'background:' + applicationStore.accentColor + ' !important'"
    >
      <div>${{ applicationStore.daoToken?.symbol || "DAO Token" }} Balance</div>
      <div class="font-weight-bold text-dp-xs">
        {{ walletStore.accountBalance || "0" | formatNumber(2) }}
      </div>
    </div>
    <v-row class="justify-center mt-2">
      <v-col cols="6 pr-2"
        ><v-btn
          class="text-none full-width border-radius-8"
          elevation="0"
          :color="applicationStore.primaryColor"
          >Deposit</v-btn
        ></v-col
      >
      <v-col cols="6 pl-2"
        ><v-btn
          class="text-none full-width border-radius-8"
          elevation="0"
          :color="applicationStore.isDarkTheme ? 'gray11' : 'gray2'"
          :light="!applicationStore.isDarkTheme"
          :dark="applicationStore.isDarkTheme"
          >Withdraw</v-btn
        ></v-col
      >
    </v-row>
  </v-card>
</template>
<script lang="ts">
import { Component, Inject, Vue } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import { DaoViewModel } from "../models/dao-viewmodels";
import { applicationStore } from "@/stores/application-store";
import { walletStore } from "@/stores/wallet-store";
@Observer
@Component({
  components: {},
})
export default class YourAccount extends Vue {
  @Inject() vm!: DaoViewModel;

  applicationStore = applicationStore;
  walletStore = walletStore;
}
</script>