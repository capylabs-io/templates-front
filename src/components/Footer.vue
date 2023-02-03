<template>
  <v-footer height="52px" color="gray12" class="px-12 footer" app>
    <div
      class="d-flex justify-space-between gray5--text text-s full-width"
      v-if="!isMobile()"
    >
      <div class="d-flex">
        <div
          @click="openLink('/')"
          class="text-decoration-none cursor-pointer pr-4"
        >
          Docs
        </div>
        <div @click="openLink('/')" class="text-decoration-none cursor-pointer">
          Programs Github
        </div>
      </div>
      <div class="d-flex">
        <v-img
          :src="require('@/assets/icons/discord.png')"
          width="24px"
          @click="openLink('')"
          contain
          class="mr-4"
        ></v-img>
        <v-img
          :src="require('@/assets/icons/github.png')"
          width="24px"
          @click="openLink('')"
          contain
          class="mr-4"
        ></v-img>
        <v-img
          :src="require('@/assets/icons/twitter.png')"
          width="24px"
          @click="openLink('')"
          contain
        ></v-img>
      </div>
      <div>Powered by <span class="white--text">Solana</span></div>
    </div>
    <div
      class="d-flex flex-column justify-space-between gray5--text text-xs full-width"
      v-else
    >
      <div class="d-flex justify-center menu">
        <div @click="openLink('/')" class="text-decoration-none cursor-pointer">
          Docs
        </div>
        <div @click="openLink('/')" class="text-decoration-none cursor-pointer">
          Programs Github
        </div>
        <div>Powered by <span class="white--text">Solana</span></div>
      </div>
      <div class="d-flex media mt-2 mx-auto">
        <v-img
          :src="require('@/assets/icons/discord.png')"
          width="24px "
          @click="openLink('')"
          contain
          class=""
        ></v-img>
        <v-img
          :src="require('@/assets/icons/github.png')"
          width="24px"
          @click="openLink('')"
          contain
          class=""
        ></v-img>
        <v-img
          :src="require('@/assets/icons/twitter.png')"
          width="24px"
          @click="openLink('')"
          contain
        ></v-img>
      </div>
    </div>
  </v-footer>
</template>
<script lang="ts">
import { action } from "mobx";
import { Observer } from "mobx-vue";
import { Component, Vue } from "vue-property-decorator";
@Observer
@Component({
  components: {},
})
export default class Footer extends Vue {
  openLink(url) {
    window.open(url, "_blank");
  }
  @action isMobile() {
    if (window.innerWidth <= 599) {
      return true;
    } else {
      return false;
    }
  }
}
</script>
<style scoped>
.footer {
}
@media (max-width: 599px) {
  .footer {
    height: 80px !important;
  }
}
.media {
  width: 30% !important;
  column-gap: 10px;
}
.menu {
  column-gap: 14px;
}
</style>
