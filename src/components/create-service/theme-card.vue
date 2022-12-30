<template>
  <v-hover v-slot="{ hover }">
    <v-card
      elevation="10"
      class="theme-card border-gray-11 border-radius-16"
      :class="{
        'on-hover cursor-pointer': hover,
      }"
      @click="chooseTheme()"
    >
      <CoverImage :imageUrl="theme?.coverImage" />
      <div class="d-flex justify-space-between align-center pa-4">
        <div>
          <div class="font-weight-bold">{{ themeName }}</div>
          <div class="d-flex">
            <div class="gray6--text">by</div>
            <div class="cursor-pointer ml-1 font-weight-bold">
              {{ themeAuthor }}
            </div>
          </div>
          <div class="gray6--text">{{ themeType }}</div>
        </div>
        <div>
          <v-btn color="blueJeans" @click.stop="chooseTheme()" icon>
            <v-icon>mdi-plus-circle-outline</v-icon>
          </v-btn>
        </div>
      </div>
    </v-card>
  </v-hover>
</template>

<script lang="ts">
import { ThemeModel } from "@/models/theme-model";
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  components: {
    CoverImage: () => import("@/components/CoverImage.vue"),
  },
})
export default class ThemeCard extends Vue {
  @Prop() theme!: ThemeModel;
  @Prop({ default: false }) contain?: boolean;

  chooseTheme() {
    this.$emit("onChooseTheme", this.theme);
  }

  get themeName() {
    if (!this.theme || !this.theme.name) return "Default Theme";
    return this.theme.name;
  }

  get themeAuthor() {
    return "Cyberk Team";
  }

  get themeType() {
    if (!this.theme || this.theme.type == "free") return "Free Theme";
    return "Premium";
  }
}
</script>

<style scoped>
.theme-card {
  min-width: 320px;
}
.avatar-img {
  position: absolute;
  left: 32px;
  bottom: 32px;
}

.border-gray-11 {
  border: 1px solid var(--v-gray11-base) !important;
}
.on-hover {
  border: 1px solid var(--v-primary-base) !important;
}
</style>