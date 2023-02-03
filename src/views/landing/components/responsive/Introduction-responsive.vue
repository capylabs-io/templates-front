<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    class="intro d-flex flex-column justify-center"
    v-bind:style="{
      backgroundImage:
        'url(' + require('@/assets/landing/intro-background.webp') + ')',
    }"
  >
    <div class="d-flex justify-center col-gap-45">
      <div class="d-flex flex-column align-self-center intro-left">
        <div class="font-weight-bold text-dp-lg intro-title">
          The Key to A Decentralized World
        </div>
        <div class="gray6--text text-lg mt-3 sub-text">
          The fastest and easiest way to build your own DAO without coding. It’s
          time to give the power back to the community.
        </div>
        <div class="d-flex mt-10 col-gap-20 intro-btn">
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
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.linear {
  position: relative;
  width: 100%;
  margin-top: 500px;
}
.intro {
  max-width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: center bottom;
  background-repeat: no-repeat;
  position: relative;
}
.intro-image-group {
  width: max-content;
  background: transparent;
  @media (max-width: 1399px) {
    display: none !important;
  }
}

.intro-image {
  height: 350px;
  max-width: 350px;
}

.intro-left {
  width: 30%;
  @media (max-width: 1399px) {
    width: 50%;
    text-align: center;
  }
  @media (max-width: 960px) {
    width: 75%;
    text-align: center;
  }
  @media (max-width: 599px) {
    width: 80%;
    text-align: center;
  }
}
@media (max-width: 1399px) {
  .intro-title {
    align-self: center !important;
  }
  .intro-btn {
    justify-content: center;
  }
}
@media (max-width: 599px) {
  .intro-title {
    font-size: 35px !important;
  }
  .sub-text {
    font-size: 16px !important;
  }
}
.col-gap-45 {
  column-gap: 150px;
}
.col-gap-20 {
  column-gap: 20px;
}
.sub-text {
  width: 100%;
}
.btn-connect {
  border-radius: 10px;
}
</style>
