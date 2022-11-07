<template>
  <div class="d-flex flex-column justify-center full-height py-8">
    <v-btn
      class="d-flex btn-back text-none btn-text"
      @click="onBtnBackClick()"
      text
    >
      <v-icon>mdi-chevron-left</v-icon>
      <div>Back</div>
    </v-btn>

    <v-card
      class="card card-border border-radius-16 mx-auto pa-6"
      elevation="10"
      v-if="!vm.isLastStep"
    >
      <div>
        <SimpleStepper
          :totalStep="vm.totalStep"
          :currentStep="vm.currentStep"
        />
      </div>
      <div class="d-flex text-xl mt-3">
        <div class="gray4--text mr-2">
          Step {{ vm.currentStep }}/{{ vm.totalStep - 1 }}:
        </div>
        <div class="font-weight-medium">{{ stepTitles[vm.currentStep] }}</div>
      </div>
      <div class="mt-5" v-if="vm.isCommunityToken">
        <div v-if="vm.currentStep == 1">
          <ChooseToken />
        </div>
        <div v-else-if="vm.currentStep == 2">
          <CreateNew1 />
        </div>
        <div v-else-if="vm.currentStep == 3">
          <CreateNew2 />
        </div>
        <div v-else>
          <AddWallet />
        </div>
      </div>
      <div v-else>
        <div v-show="vm.currentStep == 1">
          <SetupWallet />
        </div>
        <div v-show="vm.currentStep == 2">
          <AddWallet />
        </div>
        <div v-show="vm.currentStep == 3">
          <SetApprovalThreshold />
        </div>
      </div>
      <v-divider></v-divider>
      <div class="d-flex justify-space-between mt-6">
        <div>
          <v-btn
            class="text-none btn-text border-radius-8 py-5"
            color="gray10"
            elevation="0"
            @click="vm.previousStep()"
            v-if="vm.currentStep > 1"
            >Previous</v-btn
          >
        </div>
        <v-btn
          class="text-none btn-text border-radius-8 py-5"
          color="primary"
          elevation="0"
          :disabled="!vm.canNextStep"
          @click="vm.nextStep()"
          >Next</v-btn
        >
      </div>
    </v-card>
    <DaoSummary v-else />
  </div>
</template>

<script lang="ts">
import { walletStore } from "@/stores/wallet-store";
import { Observer } from "mobx-vue";
import { Component, Provide, Vue } from "vue-property-decorator";
import { CreateDaoViewModel } from "../models/create-dao-viewmodels";

@Observer
@Component({
  components: {
    SimpleStepper: () =>
      import("@/components/create-service/simple-stepper.vue"),
    ChooseToken: () => import("../components/choose-token.vue"),
    CreateNew1: () => import("../components/create-new-dao1.vue"),
    CreateNew2: () => import("../components/create-new-dao2.vue"),
    AddWallet: () => import("../components/add-wallet.vue"),
    DaoSummary: () => import("../components/summary-dao.vue"),
    SetupWallet: () => import("../components/setup-wallet.vue"),
    SetApprovalThreshold: () =>
      import("../components/set-approval-threshold.vue"),
  },
})
export default class CreateDAOView extends Vue {
  communityStepTitles = {
    "1": "Determine Token",
    "2": "Create a New DAO",
    "3": "Create a New DAO",
    "4": "Add Team Wallet(s)",
  };
  multiSigStepTitles = {
    "1": "Setup Wallet",
    "2": "Invite Members",
    "3": "Proposal Setting",
  };
  stepTitles = {};
  walletStore = walletStore;

  @Provide() vm = new CreateDaoViewModel();

  mounted() {
    if (!this.vm || !walletStore.connected)
      this.$router.push("/select-service");
    if (!this.$route.query || !this.$route.query.type)
      this.$router.push("/select-service");
    if (this.$route.query.type == "multi-signature") {
      this.vm.isCommunityToken = false;
      this.vm.daoType = "multi-sig";
      this.stepTitles = this.multiSigStepTitles;
      this.vm.changeTotalStep(4);
    } else if (
      this.$route.query.type == "nft-community" ||
      this.$route.query.type == "community-token"
    ) {
      this.vm.isCommunityToken = true;
      this.vm.daoType =
        this.$route.query.type == "nft-community" ? "nft-dao" : "community-dao";
      this.stepTitles = this.communityStepTitles;
      this.vm.changeTotalStep(5);
    }
  }

  onBtnBackClick() {
    this.$router.go(-1);
  }
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
</style>
