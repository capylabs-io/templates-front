<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="max-width d-flex flex-column mt-10 ma-auto px-10">
    <div class="d-flex align-center justify-space-between">
      <div class="d-flex align-self-center">
        <p class="mt-2">Sort:</p>
        <v-btn
          class="
            rounded-lg
            px-2
            py-5
            text-sm
            ml-5
            boder-gray-12
            text-capitalize
          "
        >
          <div class="d-flex align-self-center pl-1">
            <div class="gray7--text">Recent</div>
          </div>
          <div class="align-self-center pa-2">
            <v-icon medium color="gray7"> mdi-chevron-down </v-icon>
          </div>
        </v-btn>
      </div>
      <div class="d-flex">
        <div class="search-bar d-flex rounded-lg mr-5">
          <div class="pl-5 align-self-center">
            <v-icon medium color="gray7"> mdi-magnify </v-icon>
          </div>
          <v-text-field
            v-model="vm.searchKey"
            flat
            solo
            class="mr-2 ml-5 text-field-contain"
            placeholder="Search"
          ></v-text-field>
        </div>
      </div>
    </div>
    <v-row class="mt-4">
      <v-col
        cols="12"
        md="4"
        sm="6"
        v-for="application in vm.slicedApplications"
        :key="application.id"
      >
        <ManagementBox
          :application="application"
          :trash="true"
          @restoreApplication="onRestoreApplication($event)"
        ></ManagementBox>
      </v-col>
    </v-row>
    <v-pagination
      class="my-4"
      color="primary"
      v-model="vm.page"
      v-if="vm.applications && vm.applications.length > 0"
      :length="vm.totalPage"
      circle
    >
    </v-pagination>
    <div class="text-dp-md text-center gray4--text py-16 my-16" v-else>
      No Application in Trash Bin
    </div>
  </div>
</template>
  
  <script lang="ts">
import { ApplicationModel } from "@/models/application-model";
import { walletStore } from "@/stores/wallet-store";
import { Observer } from "mobx-vue";
import { Vue, Component, Provide } from "vue-property-decorator";
import { TrashViewModel } from "../viewmodel/trash-viewmodel";

@Observer
@Component({
  components: {
    ManagementBox: () => import("../components/MangementBox.vue"),
  },
})
export default class TrashManagement extends Vue {
  @Provide() vm = new TrashViewModel();
  walletStore = walletStore;

  async created() {
    if (!walletStore.connected) this.$router.replace("/home");
    await this.vm.fetchApplications();
  }

  async onRestoreApplication(application: ApplicationModel) {
    await this.vm.confirmRestoreApplication(application);
  }
}
</script>
  
  <style scoped>
.boder-gray-10 {
  background-color: #3b3b3f !important;
  border: 1px solid #4f4f54 !important;
}
.gap-24 {
  gap: 24px;
}
.search-bar {
  height: 44px;
  width: 500px;
  background-color: #1e1e1e !important;
}
.text-field-contain {
  overflow: hidden;
}
.text-field-contain .v-input__slot {
  background-color: #2a2a2d !important;
}
.max-width {
  max-width: 1440px;
}
</style>
  