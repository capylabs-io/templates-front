<template>
  <v-img
    class="image"
    @click="$emit('click', $event)"
    :src="url"
    @error="onLoadImgError"
    cover
  />
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { fileHelpers } from "@/helper/file-helper";
import { apiService } from "@/services/api-service";
import { IReactionDisposer } from "mobx";
import { Observer } from "mobx-vue";

@Observer
@Component
export default class CoverImage extends Vue {
  @Prop() imageUrl: any;

  url: string | null = null;
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
      this.url = require(`@/assets/ManagementBox/default.png`);
      if (val instanceof File) {
        this.url = URL.createObjectURL(val);
      } else if (typeof val === "string") {
        if (val && val.toLowerCase().startsWith("http")) {
          this.url = val;
        } else if (val) {
          const model = await apiService.getFile(val);
          this.url = fileHelpers.getApiFileUrl(model);
        }
      } else if (val) {
        this.url = fileHelpers.getApiFileUrl(val);
      }
    } catch (error) {
      console.error("onAvatarChanged", error);
    }
  }

  onLoadImgError() {
    this.url = require(`@/assets/ManagementBox/default.png`);
  }
}
</script>

<style scoped>
.image {
  object-fit: contain;
  float: left;
}
</style>
