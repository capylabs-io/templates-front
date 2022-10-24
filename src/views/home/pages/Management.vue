<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="d-flex flex-column mx-12 mt-16 overflow-y-auto">
    <div class="card-content d-flex flex-row">
      <v-card
        class="options my-10 gray12 rounded-xl boder-gray-10 d-flex flex-row"
      >
        <div class="ml-2">
          <v-card-title
            ><v-img
              :src="require('@/assets/web-icon.png')"
              max-width="18px"
              contain
            ></v-img>
            <div class="ml-2 title">DAO</div></v-card-title
          >

          <v-card-text>
            <v-row align="center" class="mx-0">
              <div class="gray7--text">
                DAO is a community, where it’s members make decisions in a
                transparent and decentralized fashion, with smart contracts
                executing these decisions.
              </div>
            </v-row>
          </v-card-text>
        </div>
        <div class="align-self-center pa-2">
          <v-icon large color="white"> mdi-plus </v-icon>
        </div>
      </v-card>
      <v-card
        class="options my-10 gray12 rounded-xl boder-gray-10 d-flex flex-row"
      >
        <div class="ml-2">
          <v-card-title
            ><v-img
              :src="require('@/assets/dashBoard-icon.png')"
              max-width="18px"
              contain
            ></v-img>
            <div class="ml-2 title">Dashboard</div></v-card-title
          >

          <v-card-text>
            <v-row align="center" class="mx-0">
              <div class="gray7--text">
                NFT Dashboard is a platform from where a user will able to get
                the update of the NFT market statistics and see the latest trend
                in this fast developing world
              </div>
            </v-row>
          </v-card-text>
        </div>
        <div class="align-self-center pa-2">
          <v-icon large color="white"> mdi-plus </v-icon>
        </div>
      </v-card>
      <v-card
        class="options my-10 gray12 rounded-xl boder-gray-10 d-flex flex-row"
      >
        <div class="ml-2">
          <v-card-title
            ><v-img
              :src="require('@/assets/lending-icon.png')"
              max-width="18px"
              contain
            ></v-img>
            <div class="ml-2 title">Lending</div></v-card-title
          >

          <v-card-text>
            <v-row align="center" class="mx-0">
              <div class="gray7--text">
                NFT Lending is a platform that ensure NFTs get into the hands of
                users as seamlessly as possible without the need of a middleman
              </div>
            </v-row>
          </v-card-text>
        </div>
        <div class="align-self-center pa-2">
          <v-icon large color="white"> mdi-plus </v-icon>
        </div>
      </v-card>
    </div>
    <div class="d-flex">
      <p class="mt-2">Sort By</p>
      <v-btn
        class="rounded-lg px-2 py-5 text-sm ml-5 boder-gray-10 text-capitalize"
      >
        <div class="mr-1 align-self-center">
          <div class="gray7--text">Filter</div>
        </div>
        <div class="align-self-center pa-2">
          <v-icon small color="gray7"> mdi-chevron-down </v-icon>
        </div>
      </v-btn>
    </div>
    <div class="d-flex flex-wrap">
      <card v-bind:content="content1"></card>
      <card v-bind:content="content2"></card>
      <card v-bind:content="content3"></card>
      <card v-bind:content="content4"></card>
      <card v-bind:content="content5"></card>
      <card v-bind:content="content6"></card>
      <card v-bind:content="content7"></card>
      <card v-bind:content="content8"></card>
      <card v-bind:content="content9"></card>
      <card v-bind:content="content10"></card>
      <card v-bind:content="content11"></card>
      <card v-bind:content="content12"></card>
    </div>
  </div>
</template>
<script lang="ts">
import ManagementBox from "../../../components/MangementBox.vue";
export default {
  components: {
    card: ManagementBox,
  },
  data() {
    return {
      content1: {
        index: "1",
        name: "Website name here",
        description: "In Draft - Edited 3 minutes ago",
      },
      content2: {
        index: "2",
        name: "Website name here",
        description: "In Draft - Edited 3 minutes ago",
      },
      content3: {
        index: "3",
        name: "Website name here",
        description: "In Draft - Edited 3 minutes ago",
      },
      content4: {
        index: "4",
        name: "Website name here",
        description: "In Draft - Edited 3 minutes ago",
      },
      content5: {
        index: "5",
        name: "Website name here",
        description: "In Draft - Edited 3 minutes ago",
      },
      content6: {
        index: "6",
        name: "Website name here",
        description: "In Draft - Edited 3 minutes ago",
      },
      content7: {
        index: "7",
        name: "Website name here",
        description: "In Draft - Edited 3 minutes ago",
      },
      content8: {
        index: "1",
        name: "Website name here",
        description: "In Draft - Edited 3 minutes ago",
      },
      content9: {
        index: "9",
        name: "Website name here",
        description: "In Draft - Edited 3 minutes ago",
      },
      content10: {
        index: "10",
        name: "Website name here",
        description: "In Draft - Edited 3 minutes ago",
      },
      content11: {
        index: "11",
        name: "Website name here",
        description: "In Draft - Edited 3 minutes ago",
      },
      content12: {
        index: "12",
        name: "Website name here",
        description: "In Draft - Edited 3 minutes ago",
      },
    };
  },
};
</script>
<style scoped>
.options {
  margin-left: 30px;
  width: 25%;
}
.card-content {
  margin-left: 15%;
}
.boder-gray-10 {
  background-color: #3b3b3f !important;
  border: 1px solid #4f4f54 !important;
}
</style>
