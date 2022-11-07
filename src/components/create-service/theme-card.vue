<template>
  <v-card class="theme-card card-border border-radius-16" elevation="10">
    <v-img
      class="white--text align-end"
      height="200px"
      :src="require('@/assets/CardService/card-bg2.png')"
    >
      <!-- <v-img
        class="avatar-img"
        max-height="64px"
        max-width="64px"
        :src="require('@/assets/logo.svg')"
      ></v-img> -->
    </v-img>
    <div class="d-flex justify-space-between align-center pa-4">
      <div>
        <div>Template name display here</div>
        <div class="d-flex">
          <div class="gray6--text">by</div>
          <div class="cursor-pointer ml-1">Studio Name</div>
        </div>
        <div class="gray6--text">Default Theme</div>
      </div>
      <div>
        <v-btn color="blueJeans" icon>
          <v-icon>mdi-plus-circle-outline</v-icon>
        </v-btn>
      </div>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {},
})
export default class ThemeCard extends Vue {}
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
</style>