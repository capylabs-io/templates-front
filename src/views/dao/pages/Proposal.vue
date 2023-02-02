<template>
  <div
    :style="
      'font-family: \'' + applicationStore.font + '\', sans-serif !important;'
    "
  >
    <DaoNavigationBar />
    <div
      class="dao-content full-height pa-6"
      :style="{
        'background-color': applicationStore.pageBackground + ' !important',
        'background-image':
          'url(' + applicationStore.backgroundUrl + ') !important',
      }"
      :class="applicationStore.isDarkTheme ? 'white--text' : 'black--text'"
    >
      <div v-if="!vm.isResultShow">
        <ProposalLayout />
      </div>
      <div v-else>
        <VoteResult :targetDate="vm.voteEndTime" />
      </div>
    </div>
    <DaoFooter />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Provide, Vue, Watch } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import { applicationStore } from "@/stores/application-store";
import { ProposalDetailViewmodel } from "../models/proposal-detail-viewmodel";

@Observer
@Component({
  components: {
    ProposalLayout: () => import("./ProposalLayout.vue"),
    DaoNavigationBar: () => import("../components/NavigationBar.vue"),
    DaoFooter: () => import("../components/Footer.vue"),
    VoteResult: () => import("../components/Vote-Results.vue"),
  },
})
export default class Dao extends Vue {
  @Provide() vm = new ProposalDetailViewmodel();
  // defaut = false
  @Prop({ default: false }) isReview?: boolean;

  applicationStore = applicationStore;

  @Watch("isReview", { immediate: true }) onIsReviewChanged(val: boolean) {
    this.vm.setIsReview(val);
  }

  async created() {
    if (!this.isReview) {
      if (!this.$route.params || !this.$route.params.proposalId)
        this.$router.push("/home");
      await this.vm.fetchProposal(this.$route.params.proposalId);
      await this.vm.fetchVotes();
      await this.vm.fetchComments();
    } else {
      await this.vm.fetchDefaultProposals();
    }
  }
}
</script>
