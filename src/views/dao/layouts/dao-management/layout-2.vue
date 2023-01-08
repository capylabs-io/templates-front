<template>
  <Responsive :breakpoints="{ small: (el) => el.width <= 960 }">
    <div class="d-flex flex-column" slot-scope="el">
      <div class="dao-banner">
        <CoverImage
          class="full-width"
          :imageUrl="applicationStore.banner"
          :defaultImageUrl="
            require('@/assets/webservice/dao/default-banner.jpg')
          "
          cover
        />
      </div>
      <div class="dao-management ma-auto px-2 py-3">
        <v-row class="justify-center ma-auto">
          <v-col :cols="el.is.small ? 12 : 5">
            <YourAccount />
            <div class="dao-side-banner">
              <CoverImage
                class="border-radius-16 full-width mt-6"
                :imageUrl="applicationStore.sideBanner"
                :defaultImageUrl="
                  require('@/assets/webservice/dao/default-side-banner.jpg')
                "
                cover
              />
            </div>
          </v-col>
          <v-col :cols="el.is.small ? 12 : 7">
            <DaoDetail v-if="!vm.isOpenAddProposal" />
          </v-col>
        </v-row>
      </div>
    </div>
  </Responsive>
</template>

<script lang="ts">
import { Vue, Component, Inject } from "vue-property-decorator";
import { DaoViewModel } from "../../models/dao-viewmodels";
import { Responsive } from "vue-responsive-components";
import { applicationStore } from "@/stores/application-store";

@Component({
  components: {
    DaoDetail: () => import("../../components/DaoDetail.vue"),
    YourAccount: () => import("../../components/YourAccount.vue"),
    CoverImage: () => import("@/components/CoverImage.vue"),
    Responsive,
  },
})
export default class DaoManagementLayout2 extends Vue {
  @Inject() vm!: DaoViewModel;

  applicationStore = applicationStore;
}
</script>

<style scoped>
</style>