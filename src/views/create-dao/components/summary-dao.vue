<template>
  <v-card class="card card-border border-radius-16 mx-auto pa-6" elevation="10">
    <div class="text-xl text-center font-weight-medium">Summary of the DAO</div>
    <div class="inner-card card-border border-radius-8 mt-6 px-5">
      <div v-if="vm.isCommunityToken">
        <ChooseToken :isSummary="true" />
        <CreateNew1 class="mt-n1" :isSummary="true" />
        <CreateNew2 class="mt-n5" :isSummary="true" />
        <AddWallet :isSummary="true" />
      </div>
      <div v-else>
        <SetupWallet :isSummary="true" />
        <AddWallet :isSummary="true" />
        <SetApprovalThreshold :isSummary="true" />
      </div>
    </div>
    <div class="d-flex justify-space-between">
      <div>
        <v-btn
          v-if="vm.currentStep > 1"
          class="text-none btn-text border-radius-8 py-5 mt-6"
          color="gray10"
          elevation="0"
          >Previous</v-btn
        >
      </div>
      <v-btn
        class="text-none btn-text border-radius-8 py-5 mt-6"
        color="primary"
        elevation="0"
        >Next</v-btn
      >
    </div>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Inject } from "vue-property-decorator";
import { CreateDaoViewModel } from "../models/create-dao-viewmodels";

@Component({
  components: {
    ChooseToken: () => import("../components/choose-token.vue"),
    CreateNew1: () => import("../components/create-new-dao1.vue"),
    CreateNew2: () => import("../components/create-new-dao2.vue"),
    AddWallet: () => import("../components/add-wallet.vue"),
    SetupWallet: () => import("../components/setup-wallet.vue"),
    SetApprovalThreshold: () =>
      import("../components/set-approval-threshold.vue"),
  },
})
export default class SummaryDao extends Vue {
  @Inject() vm!: CreateDaoViewModel;
}
</script>

<style scoped>
.btn-back {
  position: absolute;
  left: 12px;
  top: 24px;
}
.card {
  background: var(--v-gray12-base) !important;
  width: 576px !important;
}
.inner-card {
  background: var(--v-gray13-base) !important;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
