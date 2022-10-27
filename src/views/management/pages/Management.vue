<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="d-flex flex-column mt-16 overflow-y-auto">
    <!-- <div class="card-content d-flex flex-row">
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
    </div> -->
    <div class="content-top d-flex flex-row align-center justify-space-between">
      <div class="d-flex align-self-center">
        <p class="mt-2">Sort:</p>
        <v-btn
          class="rounded-lg px-2 py-5 text-sm ml-5 boder-gray-12 text-capitalize"
        >
          <div class="align-self-center">
            <div class="gray7--text">Recent</div>
          </div>
          <div class="align-self-center pa-2">
            <v-icon medium color="gray7"> mdi-chevron-down </v-icon>
          </div>
        </v-btn>
      </div>
      <div class="d-flex">
        <div class="search-bar d-flex rounded-lg mr-5">
          <div class="pl-5 align-self-center">
            <v-icon medium color="gray7"> mdi-magnify </v-icon>
          </div>
          <v-text-field
            flat
            solo
            class="mr-2 ml-5 text-field-contain"
            placeholder="Search Theme or Creator"
          ></v-text-field>
        </div>
        <v-btn
          class="rounded-lg px-2 py-5 text-sm boder-majorelleBlue text-capitalize font-weight-bold"
          color="majorelleBlue"
          large
        >
          Create New Service
        </v-btn>
      </div>
    </div>
    <div class="d-flex flex-wrap gap-24 justify-center mt-5">
      <card
        v-for="content in contents"
        :key="content.index"
        v-bind:content="content"
      ></card>
    </div>
  </div>
</template>
<script lang="ts">
import ManagementBox from "../components/MangementBox.vue";
export default {
  components: {
    card: ManagementBox,
  },
  data() {
    return {
      contents: [
        {
          index: "1",
          name: "Website name here",
          description: "In Draft - Edited 3 minutes ago",
        },
        {
          index: "2",
          name: "Website name here",
          description: "In Draft - Edited 3 minutes ago",
        },
        {
          index: "3",
          name: "Website name here",
          description: "In Draft - Edited 3 minutes ago",
        },
        {
          index: "4",
          name: "Website name here",
          description: "In Draft - Edited 3 minutes ago",
        },
        {
          index: "5",
          name: "Website name here",
          description: "In Draft - Edited 3 minutes ago",
        },
        {
          index: "6",
          name: "Website name here",
          description: "In Draft - Edited 3 minutes ago",
        },
        {
          index: "7",
          name: "Website name here",
          description: "In Draft - Edited 3 minutes ago",
        },
        {
          index: "1",
          name: "Website name here",
          description: "In Draft - Edited 3 minutes ago",
        },
        {
          index: "9",
          name: "Website name here",
          description: "In Draft - Edited 3 minutes ago",
        },
        {
          index: "10",
          name: "Website name here",
          description: "In Draft - Edited 3 minutes ago",
        },
        {
          index: "11",
          name: "Website name here",
          description: "In Draft - Edited 3 minutes ago",
        },
        {
          index: "12",
          name: "Website name here",
          description: "In Draft - Edited 3 minutes ago",
        },
      ],
    };
  },
};
</script>
<style scoped>
.content-top {
  margin: 0 60px;
}
.boder-gray-10 {
  background-color: #3b3b3f !important;
  border: 1px solid #4f4f54 !important;
}
.gap-24 {
  column-gap: 25px;
}
.search-bar {
  height: 44px;
  width: 500px;
  background-color: #1E1E1E !important;
}
.text-field-contain {
  overflow: hidden;
}
.text-field-contain .v-input__slot {
  background-color: #2a2a2d !important;
}
</style>
