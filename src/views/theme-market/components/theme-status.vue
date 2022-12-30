<template>
  <div class="d-flex flex-wrap align-center gap-4">
    <v-chip
      class="black--text border-radius-8"
      v-if="theme?.status == 'new'"
      color="white"
      small
    >
      New Arrivals</v-chip
    >
    <v-chip
      class="border-radius-8 black--text"
      v-else-if="theme?.status == 'top'"
      color="mango"
      small
      >Top Sellers</v-chip
    >

    <v-chip
      class="border-radius-8 black--text"
      v-if="theme?.rating == 'silver'"
      color="silver"
      small
      >Silver</v-chip
    >
    <v-chip
      class="border-radius-8 black--text"
      v-else-if="theme?.rating == 'gold'"
      color="gold"
      small
      >Gold</v-chip
    >
    <v-chip
      class="border-radius-8 black--text"
      v-else-if="theme?.rating == 'platinum'"
      color="platinum"
      small
      >Platinum</v-chip
    >
    <v-chip
      class="black--text border-radius-8"
      v-else-if="theme?.rating == 'diamond'"
      color="diamond"
      small
      >Diamond</v-chip
    >

    <v-chip
      class="border-radius-8 black--text"
      v-if="theme?.category == 'dao'"
      color="primary"
      small
      >DAO</v-chip
    >
    <v-chip
      class="border-radius-8 black--text"
      v-else-if="theme?.category == 'minter'"
      color="success"
      small
      >NFT Minter</v-chip
    >
    <v-chip
      class="border-radius-8 black--text"
      v-if="theme?.category == 'staking'"
      color="blueJeans"
      small
      >NFT Staking</v-chip
    >

    <v-chip
      class="border-radius-8 black--text"
      v-if="isThemeOnSale"
      color="error"
      small
      >On Sale</v-chip
    >
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import { ThemeModel } from "@/models/theme-model";

@Observer
@Component({
  components: {},
})
export default class ThemeStatus extends Vue {
  @Prop() theme?: ThemeModel;

  get isThemeOnSale() {
    if (!this.theme || !this.theme.discount) return false;
    return this.theme.discount != 0;
  }
}
</script>