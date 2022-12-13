<template>
  <div>
    <div v-if="layoutStore.layout == 1">
      <Layout1 />
    </div>
    <div v-else-if="layoutStore.layout == 2">
      <Layout2 />
    </div>
  </div>
</template>

<script lang="ts">
import { layoutStore } from "@/stores/layout-store";
import { Vue, Component, Inject } from "vue-property-decorator";
import { DaoViewModel } from "../models/dao-viewmodels";

@Component({
  components: {
    Members: () => import("../components/Members.vue"),
    Layout1: () => import("../layouts/dao-management/layout-1.vue"),
    Layout2: () => import("../layouts/dao-management/layout-2.vue"),
    Layout3: () => import("../layouts/dao-management/layout-3.vue"),
  },
})
export default class DaoDetail extends Vue {
  @Inject() vm!: DaoViewModel;

  layoutStore = layoutStore;
}
</script>