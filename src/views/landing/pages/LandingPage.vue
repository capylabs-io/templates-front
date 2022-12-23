<template>
  <div class="landing-content">
    <Introduction></Introduction>
    <Partner></Partner>
    <Dao></Dao>
    <Service></Service>
    <Feature></Feature>
    <Question></Question>
  </div>
</template>

<script lang="ts">
import { Observer } from "mobx-vue";
import { Vue, Component } from "vue-property-decorator";
@Observer
@Component({
  components: {
    Introduction: () => import("./Introduction.vue"),
    Partner: () => import("./Partners.vue"),
    Dao: () => import("./Dao.vue"),
    Service: () => import("./Service.vue"),
    Feature: () => import("./Feature.vue"),
    Question: () => import("./Question.vue"),
  },
})
export default class LandingPage extends Vue {}
</script>

<style scoped></style>
