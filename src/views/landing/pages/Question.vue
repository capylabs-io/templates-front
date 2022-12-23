<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="question d-flex flex-column">
    <div class="font-weight-bold text-dp-lg align-self-center mt-12 mb-8">
      Frequently asked questions
    </div>
    <div class="content align-self-center">
      <div class="d-flex col-gap-10 align-center">
        <v-img
          class="image"
          :src="require(`@/assets/landing/minus-red.webp`)"
        ></v-img>
        <div class="text-dp-xs align-self-center">
          What is logoipsum and how does it work?
        </div>
      </div>
      <div class="text-lg sub-text gray6--text my-3">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fames mattis
        nam eu et. Sed arcu molestie ut morbi. In nunc egestas ipsum accumsan
        lacus est dictum at. Euismod eget augue porttitor id in nunc volutpat.
        Quis ac in quis curabitur amet.
      </div>
      <div class="d-flex col-gap-10 align-center my-3">
        <v-img
          class="image"
          :src="require(`@/assets/landing/plus-blue.webp`)"
        ></v-img>
        <div class="text-dp-xs align-self-center">
          What do I need to start using logoipsum?
        </div>
      </div>
      <div class="d-flex col-gap-10 align-center my-3">
        <v-img
          class="image"
          :src="require(`@/assets/landing/plus-blue.webp`)"
        ></v-img>
        <div class="text-dp-xs align-self-center">
          Do I need coding knowledge to use logoipsum?
        </div>
      </div>
      <div class="d-flex col-gap-10 align-center my-3">
        <v-img
          class="image"
          :src="require(`@/assets/landing/plus-blue.webp`)"
        ></v-img>
        <div class="text-dp-xs align-self-center">
          How much does logoipsum cost?
        </div>
      </div>
      <div class="d-flex col-gap-10 align-center my-3">
        <v-img
          class="image"
          :src="require(`@/assets/landing/plus-blue.webp`)"
        ></v-img>
        <div class="text-dp-xs align-self-center">
          Does logoipsum provide custom feature development?
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
.question {
  height: max-content;
  position: relative;
  background-color: black;
  padding-bottom: 100px;
}
.col-gap-10 {
  column-gap: 10px;
}
.image {
  height: 20px;
  max-width: 20px;
}
.content {
  width: 70%;
}
</style>
