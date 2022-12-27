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
    <v-img
      class="intro-image align-self-center slide-down"
      :src="require(`@/assets/landing/coin-image.webp`)"
    ></v-img>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.intro {
  max-width: 100%;
  height: 100vh;
  background-position: cover;
  background-repeat: no-repeat;
  background-size: 100%;
  position: relative;
}
.intro-image {
  height: 587px;
  max-width: 584px;
}
.intro-left {
  width: 30%;
}
.col-gap-45 {
  column-gap: 45px;
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
.slide-down {
  animation: slide-down 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

@keyframes slide-down {
  0% {
    transform: translateY(-120px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
