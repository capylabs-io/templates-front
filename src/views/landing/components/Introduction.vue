<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    class="intro d-flex justify-center col-gap-45"
    v-bind:style="{
      backgroundImage:
        'url(' + require('@/assets/landing/intro-background.webp') + ')',
    }"
  >
    <div class="d-flex flex-column align-self-center intro-left">
      <div class="font-weight-bold text-dp-xl">
        The Key to A Decentralized World
      </div>
      <div class="gray6--text text-lg mt-3 sub-text">
        The fastest and easiest way to build your own DAO without coding. It’s
        time to give the power back to the community.
      </div>
      <div class="d-flex mt-10 col-gap-20">
        <v-btn
          class="btn-connect text-none white--text text-capitalize"
          elevation="0"
          color="primary"
          >Connect Wallet</v-btn
        >
        <v-btn
          class="btn-connect text-none white--text text-capitalize"
          elevation="0"
          color="gray11"
          >Watch Tutorial</v-btn
        >
      </div>
    </div>
    <div class="align-self-center intro-image-group d-flex flex-column">
      <div>
        <v-img
          class="intro-image align-self-center"
          :src="require(`@/assets/bitcoin.webp`)"
        ></v-img>
      </div>
      <v-img
        class="image1 align-self-center"
        :src="require(`@/assets/bitcoin.webp`)"
      ></v-img>
      <v-img
        class="image2 align-self-center"
        :src="require(`@/assets/bitcoin.webp`)"
      ></v-img>
      <v-img
        class="image3 align-self-center"
        :src="require(`@/assets/bitcoin.webp`)"
      ></v-img>
      <v-img
        class="image4 align-self-center"
        :src="require(`@/assets/bitcoin.webp`)"
      ></v-img>
    </div>
    <!-- <v-img
      class="intro-image align-self-center wiggle"
      :src="require(`@/assets/landing/coin-image.webp`)"
    ></v-img> -->
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.intro {
  max-width: 100%;
  height: 100vh;
  background-size: 100% 100%;
  background-position: center bottom;
  background-repeat: no-repeat;
  position: relative;
}
.intro-image-group {
  width: max-content;
  background: transparent;
}
.image1 {
  height: 140px;
  max-width: 140px;
  top: 23%;
  right: 35%;
  position: absolute;
  z-index: 3;
}
.image2 {
  height: 100px;
  max-width: 100px;
  top: 55%;
  right: 38%;
  position: absolute;
  z-index: 3;
}
.image3 {
  height: 130px;
  max-width: 130px;
  right: 18%;
  position: absolute;
  z-index: 3;
}
.image4 {
  height: 160px;
  max-width: 160px;
  position: absolute;
  top: 62%;
  right: 18%;
  z-index: 3;
}
.intro-image {
  height: 350px;
  max-width: 350px;
}

.image1 {
  animation: rotate-float 4s infinite;
}
.image2 {
  animation: rotate-float 4s infinite;
}
.image3 {
  animation: rotate-float 4s infinite;
}
.image4 {
  animation: rotate-float 4s infinite;
}

.intro-image {
  animation: float 3s ease-in-out infinite;
  z-index: 4;
}
.intro-left {
  width: 30%;
}
.col-gap-45 {
  column-gap: 150px;
}
.col-gap-20 {
  column-gap: 20px;
}
.sub-text {
  width: 85%;
}
.btn-connect {
  border-radius: 10px;
}
.wiggle {
  animation: wiggle 5s linear infinite;
}

@keyframes float {
  0% {
    transform: translatey(0px);
  }
  50% {
    transform: translatey(-20px);
  }
  100% {
    transform: translatey(0px);
  }
}

@keyframes wiggle {
  0%,
  7% {
    transform: rotateZ(0);
  }
  15% {
    transform: rotateZ(-15deg);
  }
  20% {
    transform: rotateZ(10deg);
  }
  25% {
    transform: rotateZ(-10deg);
  }
  30% {
    transform: rotateZ(6deg);
  }
  35% {
    transform: rotateZ(-4deg);
  }
  40%,
  100% {
    transform: rotateZ(0);
  }
}

@keyframes loader {
  0% {
    rotate: 0deg;
  }
  25% {
    rotate: y 90deg;
    scale: 0.5;
  }
  50% {
    rotate: 180deg;
  }
  75% {
    rotate: x 270deg;
    border-radius: 50%;
  }
  100% {
    rotate: 360deg;
  }
}
@keyframes rotate-float {
  0% {
    rotate: 0deg;
    transform: translatey(0px);
  }
  25% {
    rotate: y 90deg;
    transform: translatey(-10px);
    scale: 0.8;
  }
  50% {
    rotate: y 180deg;
    transform: translatey(-20px);
    scale: 1;
  }
  75% {
    rotate: y 270deg;
    transform: translatey(-10px);
    scale: 0.8;
  }
  100% {
    rotate: y 360deg;
    transform: translatey(0px);
  }
}
</style>
