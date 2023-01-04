<template>
  <div
    class="pa-4 border-radius-8 mt-4 text-sm font-weight-regular"
    :class="
      applicationStore.isDarkTheme
        ? 'white--text box-border-gray11'
        : 'black--text'
    "
    :style="'background:' + applicationStore.accentColor"
  >
    <v-row>
      <v-col class="gray6--text" cols="3">Name</v-col>
      <v-col cols="9">{{ vm.daoSetting?.name }}</v-col>
    </v-row>
    <v-row>
      <v-col class="gray6--text" cols="3">Type</v-col>
      <v-col cols="9">{{ vm.daoType }}</v-col>
    </v-row>
    <v-row>
      <v-col class="gray6--text" cols="3">Token Address</v-col>
      <v-col cols="9">{{ vm.daoSetting?.tokenAddress || "Unknown" }}</v-col>
    </v-row>
    <v-row>
      <v-col class="gray6--text" cols="3">Vote Threshold</v-col>
      <v-col cols="9">{{ vm.daoSetting?.threshold || "0" }}%</v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Inject, Vue } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import { DaoViewModel } from "../models/dao-viewmodels";
import { applicationStore } from "@/stores/application-store";

@Observer
@Component({
  components: {
    ProposalStatus: () => import("./ProposalStatus.vue"),
  },
})
export default class Proposals extends Vue {
  @Inject() vm!: DaoViewModel;

  applicationStore = applicationStore;
}
</script>