<template>
  <div>
    <Layout1 />
    <Layout2 />
    <Layout3 />
  </div>
</template>

<script lang="ts">
import { Vue, Inject, Component } from "vue-property-decorator";
import { DaoViewModel } from "../models/dao-viewmodels";

@Component({
  components: {
    Layout1: () => import("../layouts/proposal-detail/layout-1.vue"),
    Layout2: () => import("../layouts/proposal-detail/layout-2.vue"),
    Layout3: () => import("../layouts/proposal-detail/layout-3.vue"),
  },
})
export default class ProposalDetail extends Vue {
  @Inject() vm!: DaoViewModel;
}
</script>