<template>
  <img
    class="image"
    :src="url"
    :style="{ 'object-fit': contain ? 'contain' : 'cover' }"
    v-bind="$attrs"
    @click="$emit('click', $event)"
    @error="onLoadImgError"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { IReactionDisposer } from "mobx";
import { Observer } from "mobx-vue";

@Observer
@Component
export default class CoverImage extends Vue {
  @Prop() imageUrl: any;
  @Prop() defaultImageUrl!: any;
  @Prop({ default: false }) contain!: boolean;

  url: string = "";
  _disposers: IReactionDisposer[] = [];

  mounted() {
    // this._disposers = [
    //   reaction(
    //     () => this.providers.themeType,
    //     () => this.updateImage()
    //   ),
    // ];
  }

  @Watch("imageUrl", { immediate: true }) async onAvatarChanged() {
    await this.updateImage();
  }

  async updateImage() {
    try {
      const val = this.imageUrl;
      this.url = this.defaultImageUrl;
      if (val instanceof File) {
        this.url = URL.createObjectURL(val);
      } else if (typeof val === "string") {
        if (val && val.toLowerCase().startsWith("http")) {
          this.url = val;
        }
      }
    } catch (error) {
      console.error("onAvatarChanged", error);
    }
  }

  onLoadImgError() {
    this.url = require("@/assets/ManagementBox/default.png");
  }
}
</script>

<style scoped>
.image {
  height: 100%;
  width: 100%;
}
</style>
