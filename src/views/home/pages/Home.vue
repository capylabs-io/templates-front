<template>
  <div class="main d-flex justify-space-between mx-auto height">
    <div class="left d-flex flex-column pl-16 justify-center">
      <div class="content d-flex flex-column">
        <h1 class="text-dp-xxl">
          Lorem ipsum dolor sit amet, consecte adipiscing elit.
        </h1>
        <h2 class="font-weight-light mt-12 gray7--text text-dp-xs">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit turpis
          quis auctor donec Sit turpis quis auctor donec sit enim, duis.
        </h2>
      </div>
      <div class="d-flex mt-16">
        <v-btn
          class="
            rounded-lg
            px-4
            py-5
            text-sm
            mr-5
            boder-majorelleBlue
            text-capitalize
            btn-text
          "
          color="primary"
          v-if="!_walletStore.connected"
          @click="_walletStore.connect()"
        >
          Connect Wallet
        </v-btn>
        <v-btn
          to="/select-service"
          class="
            rounded-lg
            px-4
            py-5
            text-sm
            mr-5
            boder-majorelleBlue
            text-capitalize
            btn-text
          "
          color="primary"
          v-else
        >
          Create Service
        </v-btn>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="
                rounded-lg
                px-4
                py-5
                text-sm
                boder-gray-10
                text-capitalize
                btn-text
              "
              v-bind="attrs"
              v-on="on"
              >Watch Tutorial</v-btn
            >
          </template>
          <span>Coming Soon</span>
        </v-tooltip>
      </div>
    </div>
    <div class="right">
      <v-img class="full-height" aspect-ratio="1" src="@/assets/HomePage.png" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import { walletStore } from "@/stores/wallet-store";

@Observer
@Component({})
export default class Home extends Vue {
  _walletStore = walletStore;
}
</script>

<style scoped>
.left {
  width: 50%;
  height: 100%;
  overflow: hidden;
}
.right {
  width: 50%;
  height: 100%;
  overflow: hidden;
}
.border-gray-10 {
  border: 1px solid var(--v-gray10-base) !important;
}
.content {
  width: 90%;
}
.height {
  height: calc(100vh - 66px);
  overflow: hidden;
}
.main {
  overflow: hidden;
}
</style>
