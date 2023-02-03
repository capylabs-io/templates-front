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

    <div
      class="font-weight-bold text-40 align-self-center mt-12"
      data-aos="fade-right"
    >
      Our Partner
    </div>
    <div class="d-flex justify-center list" data-aos="fade-right">
      <div class="d-flex flex-column justify-center card-list1 mt-12">
        <v-card
          class="partner-card d-flex"
          v-for="partners in 4"
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
      <div class="d-flex flex-column justify-center card-list2 mt-12">
        <v-card
          class="partner-card d-flex"
          v-for="partners in 4"
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
  position: relative;
  height: 100px;
  min-width: 192px;
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
.list {
}
@media (max-width: 599px) {
  .card-image {
    height: 30px;
    width: 70px;
  }
  .partner-card {
    height: 80px;
    min-width: 150px;
    margin: 10px;
  }
  .list {
    max-width: 100%;
  }
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
.card-list1 {
  gap: 20px;
}
.card-list2 {
  gap: 20px;
}
.pt-130 {
  padding-top: 130px;
}
</style>
