<template>
  <div class="mx-auto detail-container pa-8">
    <ConfirmPurchaseDialog
      :isOpen="vm.confirmPurchaseDialog"
      :themeName="vm.themeName"
      :themePrice="vm.isThemeOnSale ? vm.themeDiscountPrice : vm.themePrice"
      @onCancel="vm.confirmPurchaseDialog = !vm.confirmPurchaseDialog"
      @onConfirm="vm.progressPurchase()"
    />
    <PurchaseResultDialog
      :isOpen="vm.purchaseResultDialog"
      :success="vm.purchaseResult"
      @onCancel="vm.purchaseResultDialog = !vm.purchaseResultDialog"
      @onConfirm="vm.progressPurchase()"
    />
    <div>
      <div class="text-dp-md font-weight-bold">{{ vm.themeName }}</div>
      <div class="gray5--text text-lg">
        by {{ vm.themeAuthor }}
        <span class="text-sm">({{ vm.themeCount }} Sales)</span>
      </div>
      <div class="mt-2">
        <ThemeStatus :theme="vm.theme" />
      </div>
    </div>

    <v-row class="mt-6">
      <v-col cols="12" lg="8">
        <v-card
          class="card-bg pa-4 border-radius-16 mb-6"
          v-if="vm.theme?.metadata && vm.theme?.metadata.thumbnails"
          outlined
        >
          <div class="overflow-hidden border-radius-16 box-border-gray11">
            <flicking
              ref="flicking0"
              :options="{ bounce: 30 }"
              :plugins="mainPlugins"
            >
              <div
                class="flicking-panel full has-background-primary"
                v-for="(slide, index) in vm.themeThumbnails"
                :key="index"
              >
                <img class="panel-image" :src="slide" />
              </div>
            </flicking>
          </div>
          <div class="overflow-hidden mt-4 border-radius-8">
            <flicking
              ref="flicking1"
              :options="{
                bound: true,
                bounce: 30,
                moveType: 'freeScroll',
                // circular: true,
              }"
              :plugins="thumbnailPlugins"
            >
              <div
                class="
                  flicking-panel
                  thumb
                  has-background-primary
                  box-border-gray11
                  border-radius-8
                  overflow-hidden
                  mr-4
                "
                v-for="(slide, index) in vm.themeThumbnails"
                :key="index"
              >
                <img class="thumb-image cursor-pointer" :src="slide" />
              </div>
              <span
                slot="viewport"
                class="flicking-arrow-prev is-circle"
              ></span>
              <span
                slot="viewport"
                class="flicking-arrow-next is-circle"
              ></span>
            </flicking>
          </div>
        </v-card>

        <v-card
          class="pa-4 border-radius-16 box-border-gray11 card-bg"
          outlined
        >
          <div class="content-box border-radius-16 pa-4">
            <div v-html="vm.themeDescription"></div>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" lg="4">
        <v-card class="pa-4 border-radius-16 box-border-gray11 card-bg">
          <div class="d-flex align-center justify-space-between">
            <div class="text-xl font-weight-bold">Regular License</div>
            <div>
              <div
                class="text-dp-xs font-weight-bold text-right"
                v-if="vm.isThemeOnSale"
              >
                {{ vm.themeDiscountPrice || 0 | usd }}
              </div>
              <div class="d-flex align-center">
                <div
                  class="font-weight-bold"
                  :class="{
                    'text-dp-xs': !vm.isThemeOnSale,
                    'text-decoration-line-through gray5--text text-lg':
                      vm.isThemeOnSale,
                  }"
                >
                  {{ vm.themePrice || 0 | usd }}
                </div>
                <div class="text-md ml-2" v-if="vm.isThemeOnSale">
                  {{ vm.theme?.discount }}% sale off
                </div>
              </div>
            </div>
          </div>
          <v-divider class="my-3"></v-divider>
          <div class="text-sm">
            <v-icon class="mr-1" color="success" small>mdi-check</v-icon>
            Quality checked by <span class="font-weight-bold">Cyberk Team</span>
          </div>
          <div class="text-sm mt-2">
            <v-icon class="mr-1" color="success" small>mdi-check</v-icon>
            Future updates
          </div>
          <div class="text-sm mt-2">
            <v-icon class="mr-1" color="success" small>mdi-check</v-icon>
            12 months support from
            <span class="font-weight-bold">Cyberk Team</span>
          </div>
          <v-divider class="my-4"></v-divider>
          <v-btn
            class="border-radius-8 text-none"
            color="success"
            elevation="0"
            v-if="vm.isThemeOwned"
            block
          >
            <v-icon class="mr-1">mdi-check-circle-outline</v-icon>
            {{ vm.theme?.type == "free" ? "Free Theme" : "Owned" }}
          </v-btn>
          <v-btn
            class="border-radius-8 text-none"
            elevation="0"
            v-else-if="!walletStore.connected"
            @click="vm.openConfirmPurchase(true)"
            disabled
            block
          >
            Connect Wallet to Purchase
          </v-btn>
          <v-btn
            class="border-radius-8 text-none"
            color="primary"
            elevation="0"
            @click="vm.openConfirmPurchase(true)"
            v-else
            block
          >
            <v-icon class="mr-1">mdi-cart-outline</v-icon>
            Purchase
          </v-btn>
          <div class="text-sm gray5--text text-center mt-3">
            Price is in US dollars and includes Tax
          </div>
        </v-card>

        <v-card class="pa-4 border-radius-16 box-border-gray11 card-bg mt-6">
          <v-row class="text-sm" no-gutters>
            <v-col cols="4" class="gray6--text font-weight-bold"
              >Last Update</v-col
            >
            <v-col cols="8">{{ vm.theme?.updatedAt | ddmmyyyy }}</v-col>
          </v-row>
          <v-row class="text-sm mt-4" no-gutters>
            <v-col cols="4" class="gray6--text font-weight-bold"
              >Published</v-col
            >
            <v-col cols="8">{{ vm.theme?.createdAt | ddmmyyyy }}</v-col>
          </v-row>
          <v-row class="text-sm mt-4" no-gutters>
            <v-col cols="4" class="gray6--text font-weight-bold">Theme</v-col>
            <v-col cols="8">
              {{ vm.theme?.isDarkTheme ? "Dark Theme" : "Light Theme" }}
            </v-col>
          </v-row>
          <v-row class="text-sm mt-4" no-gutters>
            <v-col cols="4" class="gray6--text font-weight-bold"
              >Primary Colors</v-col
            >
            <v-col cols="8">
              <SimpleSwatches
                :colors="vm.theme?.primaryColors"
                :small="true"
                :list="true"
              />
            </v-col>
          </v-row>
          <v-row class="text-sm mt-4" no-gutters>
            <v-col cols="4" class="gray6--text font-weight-bold">Fonts</v-col>
            <v-col cols="8">
              <div v-for="(font, index) in vm.theme?.fonts" :key="index">
                {{ font }}
              </div>
            </v-col>
          </v-row>
          <v-row class="text-sm mt-4" no-gutters>
            <v-col cols="4" class="gray6--text font-weight-bold"
              >Responsive</v-col
            >
            <v-col cols="8"> Yes</v-col>
          </v-row>
          <v-row
            class="text-sm mt-4"
            v-if="vm.theme?.metadata && vm.theme?.metadata.tags"
            no-gutters
          >
            <v-col cols="4" class="gray6--text font-weight-bold">Tags</v-col>
            <v-col cols="8" class="d-flex flex-wrap gap-8">
              <v-chip
                color="primary"
                v-for="(tag, index) in vm.theme?.metadata?.tags"
                :key="index"
                small
              >
                {{ tag }}
              </v-chip>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import { snackController } from "@/components/snack-bar/snack-bar-controller";
import { ThemeDetailViewmodel } from "../models/theme-detail-viewmodel";
import { Sync, Arrow } from "@egjs/flicking-plugins";
import { Flicking } from "@egjs/vue-flicking";
import { applicationStore } from "@/stores/application-store";
import { walletStore } from "@/stores/wallet-store";

@Observer
@Component({
  components: {
    MarketFilter: () => import("../components/market-filter.vue"),
    Themes: () => import("../components/_themes.vue"),
    ThemeStatus: () => import("../components/theme-status.vue"),
    SimpleSwatches: () =>
      import("@/components/create-service/simple-swatches.vue"),
    PurchaseResultDialog: () => import("../dialogs/purchase-result-dialog.vue"),
    ConfirmPurchaseDialog: () =>
      import("../dialogs/confirm-purchase-dialog.vue"),
  },
})
export default class ThemeMarket extends Vue {
  @Provide() vm = new ThemeDetailViewmodel();
  mainPlugins: any = [];
  thumbnailPlugins: any = [];

  applicationStore = applicationStore;
  walletStore = walletStore;

  async created() {
    if (!this.$route.params || !this.$route.params.themeId) {
      snackController.error("Theme does not exist!");
      this.$router.push("/theme-market");
    }
    await this.vm.fetchTheme(this.$route.params.themeId);
    this.setupImageSlider();
  }

  setupImageSlider() {
    this.mainPlugins = [
      new Sync({
        type: "index",
        synchronizedFlickingOptions: [
          {
            flicking: this.$refs.flicking0 as Flicking,
            isSlidable: true,
          },
          {
            flicking: this.$refs.flicking1 as Flicking,
            isClickable: true,
            activeClass: "active",
          },
        ],
      }),
    ];
    this.thumbnailPlugins = [new Arrow()];
  }
}
</script>

<style scoped>
.detail-container {
  max-width: 1400px;
}
.panel-image {
  height: 482px !important;
}
.thumb-image {
  height: 115px !important;
}
img.panel-image,
img.thumb-image {
  display: block;
  object-fit: cover;
  width: 100%;
}
.full {
  width: 100%;
}
.thumb {
  width: 25%;
}
.active {
  border: 1px solid var(--v-primary-base);
}
.card-bg {
  background: var(--v-gray11-base);
}
.content-box {
  background: var(--v-gray13-base);
}
</style>