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
      <div data-aos="fade-up">
        <v-img
          class="intro-image align-self-center"
          :src="require(`@/assets/bitcoin.webp`)"
        ></v-img>
      </div>
      <v-img
        class="blink1 align-self-center"
        :src="require(`@/assets/coin-blink.webp`)"
      ></v-img>
      <v-img
        class="blink2 align-self-center"
        :src="require(`@/assets/coin-blink.webp`)"
      ></v-img>
      <v-img
        class="blink3 align-self-center"
        :src="require(`@/assets/coin-blink.webp`)"
      ></v-img>
      <v-img
        class="blink4 align-self-center"
        :src="require(`@/assets/coin-blink.webp`)"
      ></v-img>
      <v-img
        class="image1 align-self-center"
        data-aos="fade-up"
        :src="require(`@/assets/tron-coin.webp`)"
      ></v-img>
      <v-img
        class="image2 align-self-center"
        data-aos="fade-up"
        :src="require(`@/assets/bnb-coin.webp`)"
      ></v-img>
      <v-img
        class="image3 align-self-center"
        data-aos="fade-up"
        :src="require(`@/assets/ethereum-coin.webp`)"
      ></v-img>
      <v-img
        class="image4 align-self-center"
        data-aos="fade-up"
        :src="require(`@/assets/usdt-coin.webp`)"
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
.blink1 {
  height: 60px;
  max-width: 60px;
  position: absolute;
  z-index: 5;
  top: 25%;
  right: 25%;
  animation: blink 4s infinite;
}
.blink2 {
  height: 60px;
  max-width: 60px;
  position: absolute;
  z-index: 3;
  top: 42%;
  right: 40%;
  animation: blink 4s infinite;
  animation-delay: 1s;
}
.blink3 {
  height: 60px;
  max-width: 60px;
  position: absolute;
  top: 67%;
  right: 33%;
  z-index: 3;
  animation: blink 4s infinite;
  animation-delay: 2.5s;
}
.blink4 {
  height: 60px;
  max-width: 60px;
  position: absolute;
  top: 52%;
  right: 18%;
  z-index: 3;
  animation: blink 4s infinite;
  animation-delay: 1.5s;
}

.image1 {
  height: 150px;
  max-width: 150px;
  top: 22%;
  right: 36%;
  position: absolute;
  z-index: 2;
}
.image2 {
  height: 100px;
  max-width: 100px;
  top: 55%;
  right: 38%;
  position: absolute;
  z-index: 2;
}
.image3 {
  height: 140px;
  max-width: 140px;
  right: 16%;
  position: absolute;
  z-index: 2;
}
.image4 {
  height: 150px;
  max-width: 150px;
  position: absolute;
  top: 60%;
  right: 18%;
  z-index: 2;
}
.intro-image {
  height: 350px;
  max-width: 350px;
}

.image1 {
  animation: rotate-float-left 4s infinite;
}
.image2 {
  animation: rotate-float-left 5s infinite;
  animation-delay: 1s;
}
.image3 {
  animation: rotate-float-right 4s infinite;
  animation-delay: 1.5s;
}
.image4 {
  animation: rotate-float-right 5s infinite;
  animation-delay: 1.6s;
}

.intro-image {
  animation: float 3s ease-in-out infinite;
  z-index: 3;
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
@keyframes loader {
  0% {
    rotate: 0deg;
  }
  25% {
    rotate: 90deg;
    scale: 0.5;
  }
  50% {
    rotate: 180deg;
  }
  75% {
    rotate: 270deg;
    border-radius: 50%;
    scale: 1;
  }
  100% {
    rotate: 360deg;
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

@keyframes rotate-float-left {
  0% {
    rotate: 0deg;
    transform: translatey(0px);
  }
  25% {
    rotate: y 90deg;
    transform: translatey(-10px);
    scale: 0.8;
    opacity: 0;
  }
  50% {
    rotate: y 180deg;
    transform: translatey(-20px);
    scale: 1;
    opacity: 1;
  }
  75% {
    rotate: y 270deg;
    transform: translatey(-10px);
    scale: 0.8;
    opacity: 0;
  }
  100% {
    rotate: y 360deg;
    transform: translatey(0px);
    opacity: 1;
  }
}
@keyframes rotate-float-right {
  0% {
    rotate: 0deg;
    transform: translatey(0px);
  }
  25% {
    rotate: y -90deg;
    transform: translatey(-10px);
    scale: 0.8;
    opacity: 0;
  }
  50% {
    rotate: y -180deg;
    transform: translatey(-20px);
    scale: 1;
    opacity: 1;
  }
  75% {
    rotate: y -270deg;
    transform: translatey(-10px);
    scale: 0.8;
    opacity: 0;
  }
  100% {
    rotate: y -360deg;
    transform: translatey(0px);
    opacity: 1;
  }
}
@keyframes blink {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
