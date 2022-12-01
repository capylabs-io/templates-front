<template>
  <div class="pa-4 box-gray-12 rounded-lg member-page">
    <DepositQRDialog />
    <div class="d-flex">
      <div class="pa-0 cursor-pointer" @click="vm.changeShowTreasuries()">
        <v-icon small color="blueJeans"> mdi-chevron-left</v-icon>
        <span class="text-capitalize blueJeans--text">Back</span>
      </div>
    </div>
    <div class="d-flex flex-column text-right mt-3">
      <div class="gray5--text text-lg">Wallet Value</div>
      <div class="text-dp-md white--text font-weight-bold">$100</div>
    </div>
    <v-row class="pa-2">
      <v-col cols="12" md="4" class="pa-2 text-sm">
        <div class="gray13 border-radius-16 pa-4 min-height">
          <div class="text-lg font-weight-bold">DAO Wallets</div>
          <div class="box active border-radius-8 px-3 py-4 mt-2">
            <div
              class="
                d-flex
                align-center
                justify-space-between
                text-md
                font-weight-regular
              "
            >
              <div>
                <v-icon color="blueJeans">mdi-wallet</v-icon>
                <span class="ml-3">3QpKiL...RGvG</span>
              </div>
              <div class="d-flex align-center">
                <div class="mr-1">
                  <div>$0.00</div>
                  <div class="d-flex align-center">
                    <img class="mr-1" src="@/assets/Solana.svg" />
                    <v-icon small>mdi-inbox</v-icon>
                  </div>
                </div>
                <div>
                  <v-icon>mdi-chevron-down</v-icon>
                </div>
              </div>
            </div>
          </div>
          <div
            class="d-flex justify-space-between align-center mt-4"
            @click="isShowToken()"
          >
            <div>Token</div>
            <v-icon v-if="showToken">mdi-chevron-down</v-icon>
            <v-icon v-else>mdi-chevron-up</v-icon>
          </div>
          <div class="box border-radius-8 px-3 py-4 mt-2" v-if="showToken">
            <div
              class="
                d-flex
                align-center
                justify-space-between
                text-md
                font-weight-regular
              "
            >
              <div class="d-flex align-center">
                <img class="w-20" src="@/assets/Solana.svg" />
                <span class="ml-3">Solana</span>
              </div>
              <div class="mr-1">
                <div>0 SOL</div>
                <div class="gray5--text text-xs">$0.00</div>
              </div>
            </div>
          </div>
          <div
            class="d-flex justify-space-between align-center mt-4"
            @click="isShowOtherAssets()"
          >
            <div>Other assets</div>
            <v-icon v-if="showOtherAssets">mdi-chevron-down</v-icon>
            <v-icon v-else>mdi-chevron-up</v-icon>
          </div>
          <div
            class="box border-radius-8 px-3 py-4 mt-2"
            v-if="showOtherAssets"
          >
            <div
              class="
                d-flex
                align-center
                justify-space-between
                text-md
                font-weight-regular
              "
            >
              <div class="d-flex align-center">
                <img class="w-20" src="@/assets/Solana.svg" />
                <span class="ml-3">Community Token Mint</span>
              </div>
              <div class="mr-1">
                <div>0 SOL</div>
                <div class="gray5--text text-xs">$0.00</div>
              </div>
            </div>
          </div>
          <div
            class="box border-radius-8 px-3 py-4 mt-2"
            v-if="showOtherAssets"
          >
            <div
              class="
                d-flex
                align-center
                justify-space-between
                text-md
                font-weight-regular
              "
            >
              <div class="d-flex align-center">
                <img class="w-20" src="@/assets/Solana.svg" />
                <span class="ml-3">Something 2</span>
              </div>
              <div class="mr-1">
                <div>0 SOL</div>
                <div class="gray5--text text-xs">$0.00</div>
              </div>
            </div>
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="8" class="pa-2 text-sm">
        <div class="gray13 border-radius-16 pa-4 min-height">
          <div class="gray12 border-radius-16 pa-4">
            <div class="d-flex justify-space-between align-center">
              <div class="d-flex">
                <v-icon large color="blueJeans">mdi-wallet</v-icon>
                <div class="ml-1">
                  <div class="gray5--text font-weight-regular">DAO Wallet</div>
                  <div class="font-weight-bold text-dp-xs">$0.00</div>
                  <address-copy-board
                    address="3QpKiL...RGvG"
                    :isShortAddress="true"
                    :shortStartAmount="6"
                    :shortEndAmount="4"
                    :iconSize="18"
                  ></address-copy-board>
                  <!-- <div class="gray5--text text-xs">3QpKiL...RGvG <v-icon color="gray5" x-small>mdi-content-copy</v-icon></div> -->
                </div>
              </div>
              <div>
                <v-btn
                  color="gray11 text-capitalize"
                  @click="vm.changeDepositQRDialog()"
                >
                  <div class="d-flex align-center">
                    <v-icon small class="mr-1">mdi-plus-circle-outline</v-icon>
                    <div>Add asset</div>
                  </div>
                </v-btn>
              </div>
            </div>
          </div>
          <div class="text-lg mt-4 font-weight-bold">Wallet Activity</div>
          <div class="gray12 border-radius-16 pa-4 mt-4">
            <div class="d-flex justify-space-between align-center">
              <div class="text-lg font-weight-regular">3Q3ph8KiL...RGvG8</div>
              <div class="d-flex cursor-pointer">
                <div class="gray5--text">8 hours ago</div>
                <v-icon class="ml-4" color="blueJeans">mdi-launch</v-icon>
              </div>
            </div>
          </div>
          <div class="gray12 border-radius-16 pa-4 mt-3">
            <div class="d-flex justify-space-between align-center">
              <div class="text-lg font-weight-regular">3Q3ph8KiL...RGvG8</div>
              <div class="d-flex cursor-pointer">
                <div class="gray5--text">8 hours ago</div>
                <v-icon class="ml-4" color="blueJeans">mdi-launch</v-icon>
              </div>
            </div>
          </div>
          <div class="gray12 border-radius-16 pa-4 mt-3">
            <div class="d-flex justify-space-between align-center">
              <div class="text-lg font-weight-regular">3Q3ph8KiL...RGvG8</div>
              <div class="d-flex cursor-pointer">
                <div class="gray5--text">8 hours ago</div>
                <v-icon class="ml-4" color="blueJeans">mdi-launch</v-icon>
              </div>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import { Component, Inject, Vue } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import { DaoViewModel } from "../models/dao-viewmodels";
import { action, observable } from "mobx";
import DepositQRDialog from "../dialog/Diposit-QR-Dialog.vue";
@Observer
@Component({
  components: {
    DepositQRDialog,
  },
})
export default class TreasuryDetail extends Vue {
  @Inject() vm!: DaoViewModel;
  @observable showToken = true;
  @action isShowToken() {
    this.showToken = !this.showToken;
  }
  @observable showOtherAssets = true;
  @action isShowOtherAssets() {
    this.showOtherAssets = !this.showOtherAssets;
  }
}
</script>
<style scoped>
.w-20 {
  width: 20px;
  height: auto;
}
.box {
  /* Grey/12 */
  background: #2a2a2d;
}
.box.active {
  /* Grey/11 */
  background: #3b3b3f;
}
.min-height {
  min-height: 100%;
}
</style>