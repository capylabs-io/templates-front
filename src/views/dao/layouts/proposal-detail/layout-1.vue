<template>
  <Responsive :breakpoints="{ small: (el) => el.width <= 960 }">
    <div class="dao-management ma-auto pa-6" slot-scope="el">
      <v-row>
        <v-col :cols="el.is.small ? 12 : 7">
          <ProposalDetail />
          <ProposalDetailDiscussion />
        </v-col>
        <v-col :cols="el.is.small ? 12 : 5">
          <YourAccount />
          <Voting />
        </v-col>
      </v-row>
    </div>
  </Responsive>
</template>
  
  <script lang="ts">
import { Vue, Component, Inject } from "vue-property-decorator";
import { DaoViewModel } from "../../models/dao-viewmodels";
import { Responsive } from "vue-responsive-components";

@Component({
  components: {
    ProposalDetail: () => import("../../components/Detail-Proposals.vue"),
    ProposalDetailDiscussion: () =>
      import("../../components/Detail-Proposals-Discussion.vue"),
    Voting: () => import("../../components/Voting.vue"),
    YourAccount: () => import("../../components/YourAccount.vue"),
    Responsive,
  },
})
export default class ProposalDaoLayout1 extends Vue {
  @Inject() vm!: DaoViewModel;
}
</script>