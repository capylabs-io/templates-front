<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="d-flex flex-column">
    <div class="ma-auto px-8 py-3 params-management">
      <v-row>
        <v-col cols="12" class="ma-auto">
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
import { applicationStore } from "@/stores/application-store";

@Component({
  components: {
    Detail: () => import("../components/ParamsDetail.vue"),
    Responsive,
  },
})
export default class DaoManagementParams extends Vue {
  @Inject() vm!: DaoViewModel;

  applicationStore = applicationStore;
}
</script>

<style scoped>
.params-management {
  width: 1900px;
}
</style>
