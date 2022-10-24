<template>
  <v-footer height="52px" color="gray12" class="px-12">
    <div class="d-flex justify-space-between gray5--text text-xs full-width">
      <div class="d-flex">
        <div
          @click="openLink('/')"
          class="text-decoration-none cursor-pointer pr-4"
        >
          Docs
        </div>
        <div
          @click="openLink('/')"
          class="text-decoration-none cursor-pointer"
        >
          Programs Github
        </div>
      </div>
      <div class="d-flex">
        <v-img
          :src="require('@/assets/mingcute_discord-fill.png')"
          max-width="24px"
          @click="openLink('')"
          contain
          class="mr-4"
        ></v-img>
        <v-img
          :src="require('@/assets/akar-icons_github-fill.png')"
          max-width="24px"
          @click="openLink('')"
          contain
          class="mr-4"
        ></v-img>
        <v-img
          :src="require('@/assets/ant-design_twitter-outlined.png')"
          max-width="24px"
          @click="openLink('')"
          contain
        ></v-img>
      </div>
      <div>
        Powered by <span class="white--text">Solana</span>
      </div>
    </div>
  </v-footer>
</template>
<script lang="ts">
import { Observer } from "mobx-vue";
import { Component, Vue } from "vue-property-decorator";
@Observer
@Component({
  components: {},
})
export default class Footer extends Vue {}
</script>
<style scoped>
</style>