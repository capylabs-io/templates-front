<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="max-width d-flex flex-column mt-10 ma-auto px-10">
    <div class="d-flex align-center justify-space-between">
      <div class="d-flex align-self-center mt-7">
        <p class="mt-2">Sort:</p>
        <v-select
          class="rounded-lg text-sm ml-5"
          v-model="vm.sortSelected"
          :items="items"
          label="Recent"
          item-text="key"
          item-value="value"
          solo
        ></v-select>

        <p class="mt-2 ml-4">Type:</p>
        <v-select
          class="rounded-lg text-sm ml-5"
          v-model="vm.typeSelected"
          :items="types"
          label="Select"
          item-text="key"
          item-value="value"
          solo
        ></v-select>
        <!-- <v-btn
        <p class="mt-2">Sort:</p>
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
        </v-btn> -->
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
            placeholder="Search Theme or Creator"
          ></v-text-field>
        </div>
        <router-link
        to="/select-service"
        class="
          white--text
          text-decoration-none
          cursor-pointer
          px-3
          align-self-center
        "
        active-class="active"
      >
      <v-btn
      class="
      rounded-lg
      px-2
      py-5
      text-sm
      boder-majorelleBlue
      text-capitalize
            font-weight-bold
            "
          color="majorelleBlue"
          large
        >
          Create New Service
        </v-btn>
      </router-link>
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
        <ManagementBox :application="application"></ManagementBox>
      </v-col>
    </v-row>
    <v-pagination
      class="my-4"
      color="primary"
      v-model="vm.page"
      :length="vm.totalPage"
      circle
    >
    </v-pagination>
  </div>
</template>

<script lang="ts">
import { walletStore } from "@/stores/wallet-store";
import { Observer } from "mobx-vue";
import { Vue, Component, Provide } from "vue-property-decorator";
import { ManagementViewModel } from "../viewmodel/management-viewmodel";

@Observer
@Component({
  components: {
    ManagementBox: () => import("../components/MangementBox.vue"),
  },
})
export default class Management extends Vue {
  @Provide() vm = new ManagementViewModel();
  walletStore = walletStore;
  items = [
    { key: "Name", value: "name" },
    { key: "Status", value: "status" },
    { key: "Time", value: "time" },
  ];
  types = [
    { key: "DAO", value: "dao" },
    { key: "NFT Minter", value: "minter" },
    { key: "NFT Staking", value: "staking" },
  ];
  async created() {
    // if (!walletStore.connected) this.$router.push("/home");
    await this.vm.fetchApplications();
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
.v-select {
  width: 150px;
}
</style>