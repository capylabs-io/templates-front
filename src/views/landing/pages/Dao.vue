<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="dao d-flex flex-column">
    <v-img
      class="redblur-image"
      :src="require(`@/assets/landing/red-blur.webp`)"
    >
    </v-img>
    <v-img
      class="blueblur-image"
      :src="require(`@/assets/landing/blue-blur.webp`)"
    >
    </v-img>
    <div class="font-weight-bold text-dp-lg align-self-center mt-12 mb-8 z-2">
      DAO Builder pioneers the optimal way for
    </div>
    <div class="d-flex mt-12 justify-center col-gap-40 z-2">
      <div class="d-flex flex-column align-center">
        <div class="divider primary mb-5"></div>
        <div class="font-weight-bold text-dp-md mb-2">Build</div>
        <div class="text-lg sub-text mb-7">
          Set up a full-function DAO with ease without any coding experience. We
          will get you ready in an instant.
        </div>
        <v-card class="dao-card">
          <v-img
            class="image"
            :src="require(`@/assets/landing/dao-image.webp`)"
          ></v-img>
        </v-card>
      </div>
      <div class="d-flex flex-column align-center">
        <div class="divider mb-5"></div>
        <div class="font-weight-bold text-dp-md mb-2 gray6--text">
          Customize
        </div>
        <div class="text-lg sub-text mb-7 gray6--text">
          Tailor your DAO to the fullest with a wide range of options. It’s time
          to decentralize with style.
        </div>
      </div>
      <div class="d-flex flex-column align-center">
        <div class="divider mb-5"></div>
        <div class="font-weight-bold text-dp-md mb-2 gray6--text">Grow</div>
        <div class="text-lg sub-text mb-7 gray6--text">
          Our built-in system will help you manage and analyze your DAO to have
          better understanding of your community. Govern together, grow
          together.
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style scoped>
.dao {
  height: max-content;
  position: relative;
  background-color: black;
  padding-bottom: 280px;
}
.divider {
  height: 4px;
  width: 411px;
  background: linear-gradient(
    109.92deg,
    rgba(255, 255, 255, 0.102) 0%,
    rgba(255, 255, 255, 0.1) 52.78%,
    rgba(255, 255, 255, 0.2) 100%
  );
  backdrop-filter: blur(12px);
  border-radius: 40px;
}
.sub-text {
  width: 411px;
}
.dao-card {
  border-radius: 10px;
}
image {
  max-height: 292px;
}
.col-gap-40 {
  column-gap: 40px;
}
.redblur-image {
  z-index: 0;
  position: absolute;
  max-width: 807px;
  height: 280px;
  filter: blur(60px);
  transform: matrix(-1, 0, 0, 1, 0, 0);
  top: 600px;
  left: 250px;
}
.blueblur-image {
  z-index: 0;
  position: absolute;
  height: 356px;
  width: 766px;
  filter: blur(60px);
  transform: matrix(-1, 0, 0, 1, 0, 0);
  top: 430px;
  left: -100px;
}
.z-2 {
  z-index: 2;
}
</style>
