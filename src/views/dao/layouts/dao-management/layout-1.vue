<template>
  <Responsive :breakpoints="{ small: (el) => el.width <= 960 }">
    <div slot-scope="el">
      <div class="full-width">
        <v-img src="@/assets/dao-banner.png" cover />
      </div>
      <div class="dao-management ma-auto px-2 py-3">
        <v-row class="justify-center ma-auto">
          <v-col :cols="el.is.small ? 12 : 7">
            <SolendDao />
          </v-col>
          <v-col :cols="el.is.small ? 12 : 5">
            <YourAccount />
            <v-img
              class="mt-6 border-radius-8"
              src="@/assets/dao-front-banner.png"
            />
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

@Component({
  components: {
    SolendDao: () => import("../../components/ProposalList.vue"),
    YourAccount: () => import("../../components/YourAccount.vue"),
    Responsive,
  },
})
export default class DaoManagementLayout1 extends Vue {
  @Inject() vm!: DaoViewModel;
}
</script>

<style scoped>
</style>