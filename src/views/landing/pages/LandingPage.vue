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
    Introduction: () => import("../components/Introduction.vue"),
    Partner: () => import("../components/Demo.vue"),
    Dao: () => import("../components/LandingDao.vue"),
    Service: () => import("../components/Service.vue"),
    Feature: () => import("../components/Feature.vue"),
    Question: () => import("../components/Question.vue"),
  },
})
export default class LandingPage extends Vue {}
</script>

<style>
.display-transation {
  transition: transform 0.6s ease;
}
.from-bottom {
  opacity: 0;
  transform: translateY(50%);
}
.from-bottom.show {
  opacity: 1;
  transform: translateX(0);
}
.display-transation.show {
  opacity: 1;
  transform: translateX(0);
}
</style>
