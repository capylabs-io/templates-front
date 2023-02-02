<template>
  <div
    :style="
      'font-family: \'' + applicationStore.font + '\', sans-serif !important;'
    "
  >
    <DaoNavigationBar />
    <div
      class="dao-content full-height"
      :style="{
        'background-color': applicationStore.pageBackground + ' !important',
        'background-image':
          'url(' + applicationStore.backgroundUrl + ') !important',
      }"
      :class="applicationStore.isDarkTheme ? 'white--text' : 'black--text'"
    >
      <div v-if="vm.pickParameters">
        <v-fade-transition mode="out-in" appear>
          <div v-if="!vm.pickConfig">
            <Parameters></Parameters>
          </div>

          <div v-else>
            <ChangeConfig />
          </div>
        </v-fade-transition>
      </div>
      <div v-else-if="vm.pickMembers">
        <div v-if="vm.pickAddMembers">
          <v-fade-transition mode="out-in" appear>
            <AddMember />
          </v-fade-transition>
        </div>
        <div v-else>
          <v-fade-transition mode="out-in" appear>
            <Member></Member>
          </v-fade-transition>
        </div>
      </div>
      <div class="add-proposal mx-auto mt-6" v-else-if="vm.isOpenAddProposal">
        <v-fade-transition mode="out-in" appear>
          <AddProposal />
        </v-fade-transition>
      </div>
      <div v-else>
        <v-fade-transition mode="out-in" appear>
          <DaoLayout />
        </v-fade-transition>
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
import { DaoViewModel } from "../models/dao-viewmodels";
import { applicationStore } from "@/stores/application-store";

@Observer
@Component({
  components: {
    DaoLayout: () => import("./DaoLayout.vue"),
    DaoNavigationBar: () => import("../components/NavigationBar.vue"),
    DaoFooter: () => import("../components/Footer.vue"),
    AddProposal: () => import("../components/Add-Proposal.vue"),

    Parameters: () => import("../components/Params.vue"),
    Member: () => import("../components/Members.vue"),
    ChangeConfig: () => import("../components/Change-config.vue"),
    AddMember: () => import("../components/Add-Member.vue"),
    VoteResult: () => import("../components/Vote-Results.vue"),

    SettingIcon,
    YourAccount,
    Programs,
    ProposalDetail,
    ProposalDetailDiscussion,
    Voting,
  },
})
export default class Dao extends Vue {
  @Provide() vm = new DaoViewModel();
  @Prop({ default: false }) isReview?: boolean;
  @Prop({ default: "management" }) reviewPage?: string;

  applicationStore = applicationStore;

  @Watch("isReview", { immediate: true }) onIsReviewChanged(val: boolean) {
    this.vm.setIsReview(val);
  }

  @Watch("reviewPage", { immediate: true }) onReviewPageChanged(val: string) {
    this.vm.setReviewPage(val);
  }

  async created() {
    if (!this.isReview) {
      if (this.$route.meta?.isTemplate) {
        await this.vm.fetchDefaultApplication();
        return;
      }
      if (!this.$route.params || !this.$route.params.appId) {
        this.$router.push("/home");
        return;
      }
      await this.vm.fetchApplication(this.$route.params.appId);
    } else {
      await this.vm.fetchDefaultProposals();
    }
  }
}
</script>
