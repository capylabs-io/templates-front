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
    <div class="relative d-flex gap-20 pt-130 partner-list">
      <v-card
        class="partner-card-1 d-flex right-to-left-1 px-10 py-8"
        v-for="partners in 15"
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
    <div class="relative d-flex gap-20 pt-12 partner-list">
      <v-card
        class="partner-card-1 d-flex left-to-right-2 px-10 py-8"
        v-for="partners in 15"
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

    <!-- <div class="relative d-flex mt-5 justify-center pt-130 gap-20">
      <v-card
        class="partner-card-2 d-flex left-to-right-2 px-10 py-8"
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
    </div> -->
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
.partner-list {
  width: 200%;
  overflow: hidden;
}
.partner-card-1 {
  width: 192px;
  margin-right: 20px;
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  box-sizing: border-box;
  border: 1px solid #4f4f54;
}

.partner-card-2 {
  width: 192px;
  margin-right: 20px;
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  box-sizing: border-box;
  border: 1px solid #4f4f54;
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
.active {
  animation: tran-opacity 0.4s forwards;
}
.right-to-left-1 {
  animation: right-to-left-1 15s linear infinite;
}
@keyframes tran-opacity {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes tran-opacity-reverse {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes right-to-left-1 {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-1000px);
  }
}

.left-to-right-2 {
  animation: left-to-right-2 15s linear infinite;
}

@keyframes left-to-right-2 {
  0% {
    transform: translateX(-1000px);
  }
  100% {
    transform: translateX(0);
  }
}
/* 
.right-to-left-1 {
  animation: right-to-left-1 27s linear infinite;
}
@keyframes right-to-left-1 {
  0% {
    right: 0;
  }
  100% {
    right: 100%;
  }
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

@keyframes left-to-right-2 {
  0% {
    left: 0;
  }
  100% {
    left: 1920px;
  }
}
*/

.pt-130 {
  padding-top: 130px;
}

.gap-20 {
  gap: 20px;
}
</style>
