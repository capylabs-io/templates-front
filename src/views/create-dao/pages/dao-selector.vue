<template>
  <div class="container mx-auto full-height d-flex flex-column justify-center">
    <v-btn
      class="d-flex btn-back text-none btn-text"
      @click="onBtnBackClick()"
      text
    >
      <v-icon>mdi-chevron-left</v-icon>
      <div>Back</div>
    </v-btn>
    <div class="text-center font-weight-bold text-dp-lg">
      What type of web service would you like to create?
    </div>
    <div class="d-flex gap-24 justify-center mt-16">
      <ServiceCard
        :title="'Multi-Signature Wallet'"
        :content="'A multi-signature is a share wallet, typically with two or more members authorizing transactions.'"
        :cardBg="1"
        :link="'/create-dao?type=multi-signature'"
      />
      <ServiceCard
        :title="'NFT Community DAO'"
        :content="'NFT Community DAOs leverage NFTs as membership, giving NFT holders voting power to make decisions.'"
        :cardBg="2"
        :link="'/create-dao?type=nft-community'"
      />
      <ServiceCard
        :title="'Community Token DAO'"
        :content="'DAO members use a community token to denote their membership and allow them to vote on proposals.'"
        :cardBg="3"
        :link="'/create-dao?type=community-token'"
      />
    </div>
    <div class="mt-16">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <div class="text-center cursor-pointer" v-bind="attrs" v-on="on">
            or
            <span
              class="blueJeans--text text-decoration-underline cursor-pointer"
              >Watch Tutorial</span
            >
          </div>
        </template>
        <span>Coming Soon</span>
      </v-tooltip>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from "vue-property-decorator";
import ServiceCard from "@/components/service-selector/service-card.vue";
import { Observer } from "mobx-vue";
import { CreateDaoViewModel } from "../models/create-dao-viewmodels";

@Observer
@Component({
  components: {
    ServiceCard,
  },
})
export default class DaoSelector extends Vue {
  @Provide() vm = new CreateDaoViewModel();

  onBtnBackClick() {
    this.$router.push("/select-service");
  }
}
</script>

<style scope>
.container {
  max-width: 1280px !important;
}
.gap-24 {
  gap: 24px;
}
.btn-back {
  position: absolute;
  left: 12px;
  top: 24px;
}
</style>