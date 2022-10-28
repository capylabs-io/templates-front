<template>
  <div class="d-flex flex-column justify-center full-height">
    <v-btn
      class="d-flex btn-back text-none btn-text"
      @click="onBtnBackClick()"
      text
    >
      <v-icon>mdi-chevron-left</v-icon>
      <div>Back</div>
    </v-btn>

    <!-- <v-card
      class="card card-border border-radius-16 mx-auto pa-6"
      elevation="10"
      v-if="vm.currentStep < vm.totalStep + 1"
    >
      <div>
        <SimpleStepper
          :totalStep="vm.totalStep"
          :currentStep="vm.currentStep"
        />
      </div>
      <div class="d-flex text-xl mt-3">
        <div class="gray4--text mr-2">
          Step {{ vm.currentStep }}/{{ vm.totalStep }}:
        </div>
        <div class="font-weight-medium">{{ stepTitles[vm.currentStep] }}</div>
      </div>
      <div class="mt-5" v-if="vm.isCommunityToken">
        <v-scroll-x-reverse-transition mode="out-in">
          <ChooseToken v-if="vm.currentStep == 1" />
          <CreateNew1 v-else-if="vm.currentStep == 2" />
          <CreateNew2 v-else-if="vm.currentStep == 3" />
          <AddWallet v-else />
        </v-scroll-x-reverse-transition>
      </div>
      <div>
        <v-scroll-x-reverse-transition mode="out-in">
          <SetupWallet v-if="vm.currentStep == 1" />
          <AddWallet v-if="vm.currentStep == 2" />
          <SetApprovalThreshold v-else />
        </v-scroll-x-reverse-transition>
      </div>
      <v-divider></v-divider>
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
    <DaoSummary v-else /> -->
    <DaoSummary />
  </div>
</template>

<script lang="ts">
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

  @Provide() vm = new CreateDaoViewModel();
  //   @Inject() vm!: CreateDaoViewModel;

  mounted() {
    if (!this.vm) this.$router.push("/select-dao");
    if (!this.$route.query || !this.$route.query.type)
      this.$router.push("/select-dao");
    if (this.$route.query.type == "multi-signature") {
      this.vm.isCommunityToken = false;
      this.stepTitles = this.multiSigStepTitles;
      this.vm.changeTotalStep(3);
    } else if (
      this.$route.query.type == "nft-community" ||
      this.$route.query.type == "community-token"
    ) {
      this.vm.isCommunityToken = true;
      this.stepTitles = this.communityStepTitles;
      this.vm.changeTotalStep(4);
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
