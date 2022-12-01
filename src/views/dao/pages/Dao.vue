<template>
  <div>
    <div v-if="!vm.showVoteResult && vm.proposalID == 0">
      <img class="screen-width" src="@/assets/dao-banner.png" />
    </div>
    <div class="dao-management mt-4 ma-auto">
      <Members v-if="vm.openMemberFlag"/>
      <Params v-else-if="vm.openParamsFlag"/>
      <VoteResult v-else-if="vm.showVoteResult"/>
      <TreasuryDetail v-else-if="vm.showTreasuries"/>
      <v-row class="justify-center ma-auto" v-else>
        <v-col cols="10" md="7">
          <div v-if="vm.proposalID != 0">
            <ProposalDetail />
            <ProposalDetailDiscussion />
          </div>
          <AddProposal v-else-if="vm.isOpenAddProposal"/>
          <SolendDao v-else />
        </v-col>
        <v-col cols="10" md="4">
          <YourAccount />
          <Treasuries/>
          <img
            class="full-width mt-4 border-radius-8"
            src="@/assets/dao-front-banner.png"
            v-if="vm.proposalID == 0"
          />
          <Voting v-else />
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Provide, Vue } from "vue-property-decorator";
import SettingIcon from "@/components/svg/Settings-icon.vue";
import { Observer } from "mobx-vue";
import SolendDao from "../components/Solend-Dao.vue";
import ProposalDetail from "../components/Detail-Proposals.vue";
import ProposalDetailDiscussion from "../components/Detail-Proposals-Discussion.vue";
import YourAccount from "../components/YourAccount.vue";
import Programs from "../components/_Programs.vue";
import Voting from "../components/Voting.vue";
import VoteResult from "../components/Vote-Results.vue";
import { DaoViewModel } from "../models/dao-viewmodels";
import AddProposal from "../components/Add-Proposal.vue";
import Members from "../components/Members.vue";
import Params from "../components/Params.vue";
import Treasuries from "../components/Treasuries.vue";
import TreasuryDetail from "../components/_TreasuryDetail.vue";
@Observer
@Component({
  components: {
    SettingIcon,
    SolendDao,
    YourAccount,
    Programs,
    ProposalDetail,
    ProposalDetailDiscussion,
    Voting,
    VoteResult,
    AddProposal,
    Members,
    Params,
    Treasuries,
    TreasuryDetail
  },
})
export default class Dao extends Vue {
  @Provide() vm = new DaoViewModel();
}
</script>
<style scoped>
.dao-management {
  max-width: 1440px;
}
</style>