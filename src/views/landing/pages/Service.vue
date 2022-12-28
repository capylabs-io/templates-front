<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="service d-flex flex-column align-center">
    <div class="font-weight-bold text-dp-lg align-self-center mt-12 mb-8">
      We help you save
    </div>
    <div class="d-flex justify-center col-gap-55 card-list mt-7">
      <v-card
        class="service-card d-flex flex-column align-center justify-center"
      >
        <div class="font-weight-bold text-dp-xl">100+</div>
        <div class="text-dp-sm gray6--text">hours</div>
        <div class="text-dp-xxs gray6--text">of manual tasks</div>
      </v-card>
      <v-card
        class="service-card d-flex flex-column align-center justify-center"
      >
        <div class="font-weight-bold text-dp-xl">>75k</div>
        <div class="text-dp-sm gray6--text">US dollar</div>
        <div class="text-dp-xxs gray6--text">in development costs</div>
      </v-card>
      <v-card
        class="service-card d-flex flex-column align-center justify-center"
      >
        <div class="font-weight-bold text-dp-xl">2-3</div>
        <div class="text-dp-sm gray6--text">months</div>
        <div class="text-dp-xxs gray6--text">working with stakeholders</div>
      </v-card>
    </div>
    <div class="text-lg mt-10 text-center service-text">
      Even better, be free from all the trails and errors by working directly
      with our experts
    </div>
    <v-btn
      class="btn-service white--text text-capitalize mt-5"
      elevation="0"
      color="primary"
      >Explore service</v-btn
    >
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
.service {
  height: max-content;
  position: relative;
  background-color: black;
  padding-bottom: 100px;
}
.col-gap-55 {
  column-gap: 55px;
}
.service-card {
  height: 180px;
  width: 300px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.service-text {
  width: 412px;
}
.btn-service {
  border-radius: 8px;
}
</style>
