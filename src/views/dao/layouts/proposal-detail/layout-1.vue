<template>
  <Responsive :breakpoints="{ small: (el) => el.width <= 960 }">
    <div class="dao-management ma-auto pa-6" slot-scope="el">
      <v-row>
        <v-col :cols="el.is.small ? 12 : 7">
          <div>
            <ProposalDetail />
          </div>
          <div class="mt-6">
            <ProposalDetailDiscussion />
          </div>
        </v-col>
        <v-col :cols="el.is.small ? 12 : 5">
          <div>
            <YourAccount />
          </div>
          <div class="mt-6">
            <Voting />
          </div>
          <!-- <v-img class="border-radius-16" :src="sideBannerPath" cover /> -->
          <CoverImage
            class="dao-side-banner mt-6 border-radius-16"
            :imageUrl="layoutStore.sideBanner"
            :defaultImageUrl="
              require('@/assets/webservice/dao/default-side-banner.jpg')
            "
            cover
          />
        </v-col>
      </v-row>
    </div>
  </Responsive>
</template>
  
  <script lang="ts">
import { Vue, Component, Inject } from "vue-property-decorator";
import { DaoViewModel } from "../../models/dao-viewmodels";
import { Responsive } from "vue-responsive-components";
import { layoutStore } from "@/stores/layout-store";

@Component({
  components: {
    CoverImage: () => import("@/components/CoverImage.vue"),
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

  layoutStore = layoutStore;
}
</script>