<template>
  <v-card
    class="pa-4 border-radius-16 text-sm font-weight-regular"
    :class="
      layoutStore.isDarkTheme ? 'box-border-gray11 white--text' : 'black--text'
    "
    :style="'background:' + layoutStore.cardBackground + ' !important'"
    outlined
  >
    <div class="d-flex justify-space-between">
      <div class="font-weight-bold text-lg">Your Account</div>
      <div
        class="d-flex cursor-pointer align-center"
        :style="'color:' + layoutStore.primaryColor"
      >
        <span>View</span>
        <v-icon :color="layoutStore.primaryColor" small>
          mdi-chevron-right</v-icon
        >
      </div>
    </div>
    <div
      class="pa-4 mt-3 border-radius-4"
      :style="'background:' + layoutStore.pageBackground + ' !important'"
    >
      <div>DAO Token Votes</div>
      <div class="font-weight-bold text-dp-xs">$$$</div>
    </div>
    <v-row class="justify-center mt-2">
      <v-col cols="6 pr-2"
        ><v-btn
          class="text-none full-width border-radius-8"
          elevation="0"
          :color="layoutStore.primaryColor"
          >Deposit</v-btn
        ></v-col
      >
      <v-col cols="6 pl-2"
        ><v-btn
          class="text-none full-width border-radius-8"
          elevation="0"
          :color="layoutStore.isDarkTheme ? 'gray11' : 'gray2'"
          :light="!layoutStore.isDarkTheme"
          :dark="layoutStore.isDarkTheme"
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
import { layoutStore } from "@/stores/layout-store";
@Observer
@Component({
  components: {},
})
export default class YourAccount extends Vue {
  @Inject() vm!: DaoViewModel;

  layoutStore = layoutStore;
}
</script>