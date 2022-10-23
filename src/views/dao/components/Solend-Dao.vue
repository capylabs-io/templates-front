<template>
  <v-card class="pa-4 box-gray-12 rounded-lg min-h" outlined>
    <div class="d-inline-flex justify-space-between full-width">
      <div class="d-flex align-center">
        <img class="mr-2" src="@/assets/metamask-icon.png" />
        <span class="font-weight-bold text-dp-xs">Solend DAO</span>
      </div>
      <div class="d-flex align-center text-sm font-weight-regular gray6--text">
        <v-icon color="gray6">mdi-account-multiple</v-icon>
        <span class="mx-1">Members (194)</span>
        <img class="ml-3 mr-1" src="@/assets/cog.svg" />
        <span>Params</span>
        <v-icon class="ml-4" color="gray6">mdi-launch</v-icon>
      </div>
    </div>
    <div class="pa-1 w-fit-content text-capitalize box-gray-13 mt-3">
      <v-btn text class="text-capitalize gray8--text active">Proposals</v-btn>
      <v-btn text class="text-capitalize gray8--text">About</v-btn>
    </div>
    <Proposals/>
  </v-card>
</template>
<style scoped>
.box-gray-13 button.active {
    background: #4F4F54;
    color: white !important;
}
.min-h {
    min-height: calc(100vh - 176px);
}
</style>
<script lang="ts">
import { Component, Inject, Vue } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import Proposals from "./_Proposals.vue";
import {DaoViewModel} from "../models/dao-viewmodels";
@Observer
@Component({
  components: {
    Proposals
  },
})
export default class SolendDao extends Vue {
  @Inject() vm!: DaoViewModel;
}
</script>