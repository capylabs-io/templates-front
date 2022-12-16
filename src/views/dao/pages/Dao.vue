<template>
  <div
    :style="'font-family: \'' + layoutStore.font + '\', sans-serif !important;'"
  >
    <DaoNavigationBar />
    <div
      class="dao-content"
      :style="'background: ' + layoutStore.pageBackground + ' !important'"
      :class="layoutStore.isDarkTheme ? 'white--text' : 'black--text'"
    >
      <div v-if="vm.isReview">
        <div v-if="vm.reviewPage == 'management'">
          <DaoLayout />
        </div>
        <div v-else-if="vm.reviewPage == 'proposal'">
          <ProposalLayout />
        </div>
      </div>
      <div v-else>
        <div v-if="!vm.isProposalDetail">
          <DaoLayout />
        </div>
        <div v-else>
          <ProposalLayout />
        </div>
      </div>
    </div>
    <DaoFooter />
    <!-- <div v-if="!vm.showVoteResult && vm.proposalID == 0">
      <img class="screen-width" src="@/assets/dao-banner.png" />
    </div>
    <div class="dao-management mt-4 ma-auto">
      <Members v-if="vm.openMemberFlag" />
      <VoteResult v-else-if="vm.showVoteResult" />
      <v-row class="justify-center ma-auto" v-else>
        <v-col cols="10" md="7">
          <div v-if="vm.proposalID != 0">
            <ProposalDetail />
            <ProposalDetailDiscussion />
          </div>
          <AddProposal v-else-if="vm.isOpenAddProposal" />
          <SolendDao v-else />
        </v-col>
        <v-col cols="10" md="4">
          <YourAccount />
          <img
            class="full-width mt-4 border-radius-8"
            src="@/assets/dao-front-banner.png"
            v-if="vm.proposalID == 0"
          />
          <Voting v-else />
        </v-col>
      </v-row>
    </div> -->
  </div>
</template>
<script lang="ts">
import { Component, Prop, Provide, Vue, Watch } from "vue-property-decorator";
import SettingIcon from "@/components/svg/Settings-icon.vue";
import { Observer } from "mobx-vue";
import ProposalDetail from "../components/Detail-Proposals.vue";
import ProposalDetailDiscussion from "../components/Detail-Proposals-Discussion.vue";
import Voting from "../components/Voting.vue";
import YourAccount from "../components/YourAccount.vue";
import Programs from "../components/_Programs.vue";
import VoteResult from "../components/Vote-Results.vue";
import { DaoViewModel } from "../models/dao-viewmodels";
import AddProposal from "../components/Add-Proposal.vue";
import { layoutStore } from "@/stores/layout-store";

@Observer
@Component({
  components: {
    DaoLayout: () => import("./DaoLayout.vue"),
    ProposalLayout: () => import("./ProposalLayout.vue"),
    DaoNavigationBar: () => import("../components/NavigationBar.vue"),
    DaoFooter: () => import("../components/Footer.vue"),
    SettingIcon,
    YourAccount,
    Programs,
    ProposalDetail,
    ProposalDetailDiscussion,
    Voting,
    VoteResult,
    AddProposal,
  },
})
export default class Dao extends Vue {
  @Provide() vm = new DaoViewModel();
  @Prop({ default: false }) isReview?: boolean;
  @Prop({ default: "management" }) reviewPage?: string;

  layoutStore = layoutStore;

  @Watch("reviewPage", { immediate: true }) onReviewPageChanged(val: string) {
    this.vm.setReviewPage(val);
  }
  @Watch("isReview", { immediate: true }) onIsReviewChanged(val: boolean) {
    this.vm.setIsReview(val);
  }

  async created() {
    if (!this.isReview) {
      console.log("params", this.$route.params);

      if (!this.$route.params || !this.$route.params.appId)
        this.$router.push("/home");
    }
    await this.vm.fetchApplication(this.$route.params.appId);
  }
}
</script>
<style>
.dao-management {
  max-width: 1440px;
}
.dao-content {
  height: calc(100vh - 52px - 64px) !important;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>