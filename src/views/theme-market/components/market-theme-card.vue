<template>
  <v-hover v-slot="{ hover }">
    <v-card
      elevation="10"
      class="box-border-gray11 border-radius-16 overflow-hidden"
      :class="{
        'on-hover cursor-pointer': hover,
      }"
      @click="goToThemeDetail()"
      outlined
    >
      <div class="category-chip d-flex flex-wrap">
        <ThemeStatus :theme="theme" />
      </div>
      <CoverImage
        class="card-img"
        :imageUrl="theme?.coverImage"
        :defaultImageUrl="require('@/assets/ManagementBox/default.png')"
      />
      <div class="pa-4">
        <div>
          <div class="font-weight-bold">{{ themeName }}</div>
          <div class="d-flex text-xs gray5--text">
            <div>by</div>
            <div class="cursor-pointer ml-1 font-weight-bold">
              {{ themeAuthor }}
            </div>
          </div>
        </div>
        <div class="d-flex justify-space-between align-center mt-3">
          <div>
            <div class="text-xl font-weight-bold">
              <span v-if="isThemeFree">Free</span>
              <span
                :class="{
                  'text-decoration-line-through gray6--text': isThemeOnSale,
                }"
                v-else
                >{{ themePrice | usd }}</span
              >
              <span class="ml-2" v-if="!isThemeFree && isThemeOnSale">{{
                themeDiscountPrice | usd
              }}</span>
            </div>
            <div class="gray5--text text-xs">{{ theme?.count || 0 }} Sales</div>
          </div>
          <v-card class="btn-cart border-radius-8 pa-2" outlined>
            <v-icon
              color="success"
              v-if="isThemeFree || isThemeOwned(theme.id)"
              darksmall
              >mdi-check</v-icon
            >
            <v-btn color="blueJeans" v-else icon small>
              <v-icon>mdi-cart-outline</v-icon>
            </v-btn>
          </v-card>
        </div>
      </div>
    </v-card>
  </v-hover>
</template>

<script lang="ts">
import { ThemeModel } from "@/models/theme-model";
import { walletStore } from "@/stores/wallet-store";
import { FixedNumber } from "@ethersproject/bignumber";
import { Vue, Component, Prop, Inject } from "vue-property-decorator";
import { ThemeMarketViewmodel } from "../models/theme-market-viewmodel";

@Component({
  components: {
    CoverImage: () => import("@/components/CoverImage.vue"),
    ThemeStatus: () => import("../components/theme-status.vue"),
  },
})
export default class ThemeCard extends Vue {
  @Prop() theme!: ThemeModel;
  @Inject() vm!: ThemeMarketViewmodel;

  walletStore = walletStore;

  isThemeOwned(themeId: string) {
    if (!walletStore.connected) return false;
    return (
      walletStore.userPaidThemes.findIndex((theme) => theme.id == themeId) >= 0
    );
  }

  get themeName() {
    if (!this.theme || !this.theme.name) return "Default Theme";
    return this.theme.name;
  }

  get themeAuthor() {
    if (!this.theme || !this.theme?.metadata || !this.theme?.metadata.author)
      return "Cyberk Team";
    return this.theme?.metadata.author;
  }

  get themePrice() {
    if (!this.theme || !this.theme.price) return 0;
    else if (FixedNumber.from(this.theme.price).isZero()) return 0;
    return FixedNumber.from(this.theme.price).toString();
  }

  get isThemeOnSale() {
    if (!this.theme || !this.theme.discount) return false;
    return this.theme.discount != 0;
  }

  get isThemeFree() {
    if (!this.theme || !this.theme.type) return true;
    return this.theme.type == "free";
  }

  get themeDiscountPrice() {
    if (!this.theme || !this.theme.discount) return 0;
    return FixedNumber.from(this.theme.price)
      .mulUnsafe(FixedNumber.from(100 - this.theme.discount))
      .divUnsafe(FixedNumber.from(100));
  }

  goToThemeDetail() {
    if (!this.theme) return;
    this.$router.push(`theme/${this.theme!.id}`);
  }
}
</script>

<style scoped>
.category-chip {
  position: absolute;
  left: 12px;
  top: 12px;
  gap: 4px;
}
.on-hover {
  border: 1px solid var(--v-primary-base) !important;
}
.btn-cart {
  background: var(--v-gray12-base) !important;
}
.card-img {
  min-height: 240px;
}
</style>