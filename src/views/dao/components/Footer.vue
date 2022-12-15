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
          Powered by <span class="font-weight-bold">Cyberk</span>
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
    console.log("onSocialMediaChanged");
    this.forceRender();
  }

  key = 1;
  layoutStore = layoutStore;

  forceRender() {
    this.key += 1;
  }
}
</script>

<style scoped>
.dao-footer {
  height: 52px;
}
</style>