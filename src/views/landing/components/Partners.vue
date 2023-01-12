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
    <div class="-ml-88 relative inline-flex justify-center pt-16">
      <v-card
        class="partner-card d-flex right-to-left-1 px-10 py-8"
        v-for="partners in 9"
        :key="partners.image"
      >
        <v-img
          contain
          class="card-image align-self-center"
          :src="require(`@/assets/landing/partner-logo.webp`)"
        >
        </v-img>
      </v-card>
      <div class="relative inline-flex mt-5 justify-center pt-130">
        <v-card
          class="partner-card d-flex left-to-right-2 px-10 py-8"
          v-for="partners in 9"
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
      <!-- <div class="d-flex overflow-hidden justify-center gap-30 card-list1 mt-12">
      <v-card
        class="partner-card d-flex right-to-left-1"
        v-for="partners in 10"
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
    <div class="d-flex overflow-hidden justify-center gap-30 card-list2 mt-10">
      <v-card
        class="partner-card d-flex left-to-right-2"
        v-for="partners in 10"
        :key="partners.image"
      >
        <v-img
          contain
          class="card-image align-self-center"
          :src="require(`@/assets/landing/partner-logo.webp`)"
        >
        </v-img>
      </v-card>
    </div> -->
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
  position: absolute;
  min-width: 192px;
  margin-right: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  box-sizing: border-box;
  border: 1px solid #4f4f54;
  animation: right-to-left 9s linear infinite;
}

.card-image {
  height: 40px;
  width: 114px;
}
.redblur-image {
  z-index: 0;
  position: absolute;
  max-width: 807px;
  height: 280px;
  transform: matrix(0.98, 0.21, 0.21, -0.98, 0, 0);
  filter: blur(60px);
  left: 1400px;
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

.partner-card.left-to-right-2 {
  left: -230px;
}
.partner-card.right-to-left-1 {
  right: -230px;
}
.left-to-right-2 {
  animation: left-to-right-2 27s linear infinite;
}
.right-to-left-1 {
  animation: right-to-left-1 27s linear infinite;
}
@keyframes right-to-left-1 {
  0% {
    right: -192px;
  }
  100% {
    right: 1920px;
  }
}
@keyframes left-to-right-2 {
  0% {
    left: -192px;
  }
  100% {
    left: 1920px;
  }
}
.pt-130 {
  padding-top: 130px;
}
.partner-card:nth-child(1) {
  animation-delay: 3s;
}
.partner-card:nth-child(2) {
  animation-delay: 6s;
}
.partner-card:nth-child(3) {
  animation-delay: 9s;
}
.partner-card:nth-child(4) {
  animation-delay: 12s;
}
.partner-card:nth-child(5) {
  animation-delay: 15s;
}
.partner-card:nth-child(6) {
  animation-delay: 18s;
}
.partner-card:nth-child(7) {
  animation-delay: 21s;
}
.partner-card:nth-child(8) {
  animation-delay: 24s;
}
.partner-card:nth-child(9) {
  animation-delay: 27s;
}
.partner-card:nth-child(10) {
  animation-delay: 3s;
}
.partner-card:nth-child(11) {
  animation-delay: 6s;
}
.partner-card:nth-child(12) {
  animation-delay: 9s;
}
.partner-card:nth-child(13) {
  animation-delay: 12s;
}
.partner-card:nth-child(14) {
  animation-delay: 15s;
}
.partner-card:nth-child(15) {
  animation-delay: 18s;
}
.partner-card:nth-child(16) {
  animation-delay: 21s;
}
.partner-card:nth-child(17) {
  animation-delay: 24s;
}
.partner-card:nth-child(18) {
  animation-delay: 27s;
}
</style>
