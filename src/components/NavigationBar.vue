<template>
  <v-app-bar
    class=""
    height="64px"
    style="z-index: 99,max-width:100%"
    app
    flat
    color="gray12"
  >
    <div
      class="nav-container text-s font-weight-regular"
      :class="{
        'px-12': $vuetify.breakpoint.lgAndUp,
        'px-4': $vuetify.breakpoint.mdAndDown,
      }"
    >
      <v-row class="d-flex align-center justify-space-between">
        <v-col col="8" class="d-flex align-center">
          <div class="font-weight-bold text-xl align-self-center mr-6">
            Logo here
          </div>
          <!-- Main menu -->
          <router-link
            to="/home"
            class="
              white--text
              text-decoration-none
              cursor-pointer
              px-3
              align-self-center
            "
            active-class="active"
          >
            <div class="text-none">Home</div>
          </router-link>
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
            <div class="text-none">Service</div>
          </router-link>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <div
                v-bind="attrs"
                v-on="on"
                class="
                  white--text
                  text-decoration-none
                  cursor-pointer
                  px-3
                  align-self-center
                "
                active-class="active"
              >
                <div class="text-none">Help</div>
              </div>
            </template>
            <span>Coming Soon</span>
          </v-tooltip>
          <router-link
            to="/select-service"
            class="
              primary--text
              text-lg
              font-weight-bold
              text-decoration-none
              cursor-pointer
              px-3
              align-self-center
            "
          >
            <v-btn
              class="btn-text text-none white--text"
              elevation="0"
              color="primary"
              rounded
              >Create</v-btn
            >
          </router-link>
        </v-col>
        <v-col col="3">
          <div class="d-flex align-center justify-end">
            <!-- <div class="pa-2 box-gray-11 rounded-circle mr-2 align-self-center">
              <v-icon>mdi-lightbulb-on-outline</v-icon>
            </div> -->
            <ConnectMetamask :requiredChainId="walletStore.chainId">
              <v-menu open-on-hover offset-y v-if="walletStore.connected">
                <template v-slot:activator="{ on, attrs }">
                  <div
                    class="
                      d-flex
                      align-center
                      connect-wallet
                      rounded-lg
                      text-none
                      py-2
                      px-4
                    "
                    v-bind="attrs"
                    v-on="on"
                    large
                  >
                    <address-copy-board
                      :address="walletStore.account"
                      :isShortAddress="true"
                      :shortStartAmount="6"
                      :shortEndAmount="4"
                      :iconSize="18"
                    ></address-copy-board>
                  </div>
                </template>
                <v-list>
                  <v-list-item :to="'/management'"
                    >Application Dashboard</v-list-item
                  >
                </v-list>
              </v-menu>
            </ConnectMetamask>
          </div>
        </v-col>
      </v-row>
    </div>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { walletStore } from "@/stores/wallet-store";
import { Observer } from "mobx-vue";

@Observer
@Component({
  components: {
    ConnectMetamask: () => import("@/components/wallet/ConnectMetamask.vue"),
    WalletDialog: () => import("@/components/wallet/WalletDialog.vue"),
  },
})
export default class NavigationBar extends Vue {
  walletStore = walletStore;

  openLink(url) {
    window.open(url, "_blank");
  }
}
</script>

<style scoped>
.nav-container {
  width: 100%;
}
.connect-wallet {
  border: 1px solid var(--v-primary-base);
  box-sizing: border-box;
  /* background: #27292c; */
}
.active {
  color: var(--v-primary-base) !important;
}
</style>
