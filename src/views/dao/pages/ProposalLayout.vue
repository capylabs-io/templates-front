<template>
  <div>
    <div v-if="applicationStore.layout == 1">
      <Layout1 />
    </div>
    <div v-else-if="applicationStore.layout == 2">
      <Layout2 />
    </div>
  </div>
</template>

<script lang="ts">
import { applicationStore } from "@/stores/application-store";
import { Vue, Inject, Component } from "vue-property-decorator";
import { DaoViewModel } from "../models/dao-viewmodels";

@Component({
  components: {
    Layout1: () => import("../layouts/proposal-detail/layout-1.vue"),
    Layout2: () => import("../layouts/proposal-detail/layout-2.vue"),
  },
})
export default class ProposalDetail extends Vue {
  @Inject() vm!: DaoViewModel;

  applicationStore = applicationStore;
}
</script>