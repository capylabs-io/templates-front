<template>
  <div>
    <div>
      <Layout1 />
    </div>
  </div>
</template>

<script lang="ts">
import { CustomizeInterfaceViewmodel } from "@/views/customize-interface/models/customize-interface-viewmodel";
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
  @Inject() daoVM!: DaoViewModel;
  @Inject() vm!: CustomizeInterfaceViewmodel;
}
</script>