<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="d-flex flex-column">
    <div class="params-management ma-auto px-12 py-3">
      <v-row class="justify-center">
        <v-col>
          <Detail />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Inject } from "vue-property-decorator";
import { DaoViewModel } from "../models/dao-viewmodels";
import { Responsive } from "vue-responsive-components";
import { layoutStore } from "@/stores/layout-store";

@Component({
  components: {
    Detail: () => import("../components/ParamsDetail.vue"),
    Responsive,
  },
})
export default class DaoManagementParams extends Vue {
  @Inject() vm!: DaoViewModel;

  layoutStore = layoutStore;
}
</script>

<style scoped>
.params-management {
  width: 1800px !important;
}
</style>
