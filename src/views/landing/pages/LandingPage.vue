<template>
  <div class="landing-content">
    <div v-if="!isMobile()">
      <Introduction></Introduction>
      <Partner></Partner>
      <Dao></Dao>
      <Service></Service>
      <Feature></Feature>
      <Question></Question>
    </div>
    <div v-else>
      <IntroductionResponsive></IntroductionResponsive>
      <PartnerResponsive></PartnerResponsive>
      <DaoResponsive></DaoResponsive>
      <ServiceResponsive></ServiceResponsive>
      <FeatureResponsive></FeatureResponsive>
      <QuestionResponsive></QuestionResponsive>
    </div>
  </div>
</template>

<script lang="ts">
import { action } from "mobx";
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
    IntroductionResponsive: () =>
      import("../components/responsive/Introduction-responsive.vue"),
    PartnerResponsive: () =>
      import("../components/responsive/Partners-responsive.vue"),
    DaoResponsive: () =>
      import("../components/responsive/LandingDao-responsive.vue"),
    ServiceResponsive: () =>
      import("../components/responsive/Service-responsive.vue"),
    FeatureResponsive: () =>
      import("../components/responsive/Feature-responsive.vue"),
    QuestionResponsive: () =>
      import("../components/responsive/Question-responsive.vue"),
  },
})
export default class LandingPage extends Vue {
  @action isMobile() {
    if (window.innerWidth <= 1400) {
      return true;
    } else {
      return false;
    }
  }
}
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
.text-40 {
  font-size: 40px;
}
@media (max-width: 599px) {
  .text-40 {
  font-size: 35px;
}
}
</style>
