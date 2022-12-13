<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="partner d-flex flex-column">
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
    <div class="font-weight-bold text-dp-lg align-self-center mt-12">
      Our Partner
    </div>
    <div class="d-flex overflow-hidden justify-center gap-20 card-list1 mt-12">
      <v-card
        class="partner-card d-flex"
        v-for="partners in 17"
        :key="partners.image"
      >
        <v-img
          contain
          class="card-image align-self-center"
          :src="require(`@/assets/landing/partner-logo.webp`)"
        >
        </v-img>
      </v-card>
    </div>
    <div class="d-flex overflow-hidden justify-center gap-20 card-list2 mt-5">
      <v-card
        class="partner-card d-flex"
        v-for="partners in 20"
        :key="partners.image"
      >
        <v-img
          contain
          class="card-image align-self-center"
          :src="require(`@/assets/landing/partner-logo.webp`)"
        >
        </v-img>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Observer } from "mobx-vue";
import { Vue } from "vue-property-decorator";
@Observer
export default class Partners extends Vue {}
</script>
<style scoped>
.partner {
  height: 700px;
  padding-top: 50px;
  position: relative;
  background-color: black;
}
.partner-card {
  width: 192px;
  height: 100px;
  background: linear-gradient(
    109.92deg,
    rgba(255, 255, 255, 0.102) 0%,
    rgba(255, 255, 255, 0.1) 52.78%,
    rgba(255, 255, 255, 0.2) 100%
  );
  backdrop-filter: blur(15px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.gap-20 {
  gap: 20px;
}
.card-list1 {
  width: max-content;
  transform: translateX(-150px);
}
.card-list2 {
  width: max-content;
  transform: translateX(-45px);
}
.card-image {
  height: 40px;
  width: 114;
}
.redblur-image {
  z-index: 0;
  position: absolute;
  max-width: 807px;
  height: 280px;
  transform: matrix(0.98, 0.21, 0.21, -0.98, 0, 0);
  filter: blur(60px);
  left: 1400px;
  top: 50px;
}
.blueblur-image {
  z-index: 0;
  position: absolute;
  height: 356px;
  width: 766px;
  filter: blur(60px);
  transform: matrix(-1, 0, 0, 1, 0, 0);
  left: 1050px;
  top: 50px;
}
</style>
