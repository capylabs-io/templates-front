<template>
  <v-footer
    class="dao-footer"
    :light="!layoutStore.isNavDarkTheme"
    :dark="layoutStore.isNavDarkTheme"
  >
    <v-row class="full-width d-flex justify-space-between px-2 align-center">
      <v-col cols="3"></v-col>
      <v-col cols="6" class="d-flex align-center justify-center">
        <div :key="key">
          <v-btn
            v-for="(socialMedia, index) in layoutStore.socialMedias"
            @click="onSocialMediaClicked(socialMedia.url)"
            :key="index"
            icon
          >
            <v-img
              :src="require('@/assets/icons/' + socialMedia.icon)"
              max-width="24px"
              max-height="24px"
            ></v-img>
          </v-btn>
        </div>
      </v-col>
      <v-col cols="3">
        <div class="text-right text-sm">
          Powered by
          <span
            class="font-weight-bold cursor-pointer"
            @click="openLink('https://cyberk.io/')"
            >Cyberk.io</span
          >
        </div>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script lang="ts">
import { layoutStore } from "@/stores/layout-store";
import { Vue, Component, Prop, Watch } from "vue-property-decorator";

@Component({
  components: {},
})
export default class DaoNavigationBar extends Vue {
  @Prop({ default: false }) isReview!: boolean;

  @Watch("layoutStore.socialMedias", { immediate: true, deep: true })
  onSocialMediaChanged() {
    this.forceRender();
  }

  onSocialMediaClicked(url: string) {
    if (url) window.open(url);
  }

  key = 1;
  layoutStore = layoutStore;

  forceRender() {
    this.key += 1;
  }

  openLink(url: string) {
    window.open(url);
  }
}
</script>

<style scoped>
.dao-footer {
  height: 52px;
}
</style>