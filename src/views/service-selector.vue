<template>
  <div class="container mx-auto full-height d-flex flex-column justify-center">
    <div class="text-center font-weight-bold text-dp-lg">
      What type of web service would you like to create?
    </div>
    <div class="d-flex gap-24 justify-center mt-16">
      <ServiceCard
        :title="'DAO Governance'"
        :icon="'mdi-account-supervisor'"
        :content="'DAO is a community, where it’s members make decisions in a transparent and decentralized fashion, with smart contracts executing these decisions.'"
        :buttonText="'Create Now'"
        :link="'/select-dao'"
        :cardBg="1"
      />
      <ServiceCard
        :title="'NFT Dashboard'"
        :icon="'mdi-view-dashboard'"
        :content="'NFT Dashboard is a platform from where a user will able to get the update of the NFT market statistics and see the latest trend in this fast developing world.'"
        :buttonText="'Coming Soon'"
        :cardBg="2"
        :isButtonDisable="true"
      />
      <ServiceCard
        :title="'NFT Lending'"
        :icon="'mdi-cash-multiple'"
        :content="'NFT Lending is a platform that ensure NFTs get into the hands of users as seamlessly as possible without the need of a middleman.'"
        :buttonText="'Coming Soon'"
        :cardBg="3"
        :isButtonDisable="true"
      />
    </div>
    <div class="mt-16">
      <div class="text-center">
        or
        <span class="blueJeans--text text-decoration-underline cursor-pointer"
          >Watch Tutorial</span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ServiceCard from "@/components/service-selector/service-card.vue";
import { Observer } from "mobx-vue";

@Observer
@Component({
  components: {
    ServiceCard,
  },
})
export default class ServiceSelector extends Vue {}
</script>

<style scope>
.container {
  max-width: 1280px !important;
}
.gap-24 {
  gap: 24px;
}
</style>