<template>
  <div>
    <div v-if="!vm.showVoteResult && vm.proposalID == 0">
      <img class="screen-width" src="@/assets/dao-banner.png" />
    </div>
    <div class="dao-management mt-4 ma-auto">
      <v-row class="justify-center ma-auto" v-if="!vm.showVoteResult">
        <v-col cols="10" md="7">
          <SolendDao v-if="vm.proposalID == 0" />
          <div v-else>
            <ProposalDetail />
            <ProposalDetailDiscussion />
          </div>
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
      <div v-else>
        <VoteResult />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Provide, Vue } from "vue-property-decorator";
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
  },
})
export default class Dao extends Vue {
  @Provide() vm = new DaoViewModel();
  @Prop({ default: false }) isReview?: boolean;

  async created() {
    if (this.isReview) return;
    if (!this.$route.query || !this.$route.query.appId)
      this.$router.replace("/home");
    const query = this.$route.query;
    if (!query.appId) this.$router.replace("/home");
    await this.vm.fetchApplication();
  }
}
</script>
<style scoped>
.dao-management {
  max-width: 1440px;
}
</style>