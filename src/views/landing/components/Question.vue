<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <!-- <div class="question1">
    <div class="font-weight-bold text-dp-lg align-self-center mb-8">
      Frequently asked questions
    </div>
    <div class="">
      <div class="d-flex pb-1">
        <div v-if="isOpenQ1" @click="clickQuestion1()">
          <v-icon color="paradisePink" class="align-self-center radius"
            >mdi-minus-circle-outline</v-icon
          >
        </div>
        <div v-else @click="clickQuestion1()">
          <v-icon color="blueJeans" class="align-self-center radius"
            >mdi-plus-circle-outline</v-icon
          >
        </div>

        <div
          class="text-dp-xs align-self-center ml-3"
          @click="clickQuestion1()"
        >
          What is logoipsum and how does it work?
        </div>
      </div>
      <div
        v-show="isOpenQ1"
        class="text-lg sub-text gray6--text my-3 slide-down"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fames mattis
        nam eu et. Sed arcu molestie ut morbi. In nunc egestas ipsum accumsan
        lacus est dictum at. Euismod eget augue porttitor id in nunc volutpat.
        Quis ac in quis curabitur amet.
      </div>
    </div>
  </div> -->
    <div class="question d-flex flex-column">
      <div class="font-weight-bold text-dp-lg align-self-center mt-12 mb-8">
        Frequently asked questions
      </div>

      <div class="content align-self-center">
        <v-expansion-panel>
          <v-expansion-panel-header>
            <template v-slot:actions>
              <div class="d-flex pb-1">
                <v-icon
                  v-if="isOpenQ1"
                  color="paradisePink"
                  class="align-self-center radius"
                  @click="clickQuestion1()"
                  >mdi-minus-circle-outline</v-icon
                >
                <v-icon
                  v-else
                  color="blueJeans"
                  class="align-self-center radius"
                  @click="clickQuestion1()"
                  >mdi-plus-circle-outline</v-icon
                >
                <div
                  class="text-dp-xs align-self-center ml-3"
                  @click="clickQuestion1()"
                >
                  What is logoipsum and how does it work?
                </div>
              </div>
              <div
                v-if="isOpenQ1"
                class="text-lg sub-text gray6--text my-3 slide-down"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fames
                mattis nam eu et. Sed arcu molestie ut morbi. In nunc egestas
                ipsum accumsan lacus est dictum at. Euismod eget augue porttitor
                id in nunc volutpat. Quis ac in quis curabitur amet.
              </div>
            </template>
          </v-expansion-panel-header>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>
            <template v-slot:actions>
              <div class="d-flex pb-1">
                <v-icon
                  v-if="isOpenQ2"
                  color="paradisePink"
                  class="align-self-center radius"
                  @click="clickQuestion2()"
                  >mdi-minus-circle-outline</v-icon
                >
                <v-icon
                  v-else
                  color="blueJeans"
                  class="align-self-center radius"
                  @click="clickQuestion2()"
                  >mdi-plus-circle-outline</v-icon
                >

                <div
                  class="text-dp-xs align-self-center ml-3"
                  @click="clickQuestion2()"
                >
                  What do I need to start using logoipsum?
                </div>
              </div>
              <div
                v-if="isOpenQ2"
                class="text-lg sub-text gray6--text slide-down my-3"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fames
                mattis nam eu et. Sed arcu molestie ut morbi. In nunc egestas
                ipsum accumsan lacus est dictum at. Euismod eget augue porttitor
                id in nunc volutpat. Quis ac in quis curabitur amet.
              </div>
            </template>
          </v-expansion-panel-header>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <template v-slot:actions>
              <div class="d-flex pb-1">
                <v-icon
                  v-if="isOpenQ3"
                  color="paradisePink"
                  class="align-self-center radius"
                  @click="clickQuestion3()"
                  >mdi-minus-circle-outline</v-icon
                >
                <v-icon
                  v-else
                  color="blueJeans"
                  class="align-self-center radius"
                  @click="clickQuestion3()"
                  >mdi-plus-circle-outline</v-icon
                >
                <div
                  class="text-dp-xs align-self-center ml-3"
                  @click="clickQuestion3()"
                >
                  Do I need coding knowledge to use logoipsum?
                </div>
              </div>
              <div
                v-if="isOpenQ3"
                class="text-lg sub-text gray6--text slide-down my-3"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fames
                mattis nam eu et. Sed arcu molestie ut morbi. In nunc egestas
                ipsum accumsan lacus est dictum at. Euismod eget augue porttitor
                id in nunc volutpat. Quis ac in quis curabitur amet.
              </div>
            </template>
          </v-expansion-panel-header>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <template v-slot:actions>
              <div class="d-flex pb-1">
                <v-icon
                  v-if="isOpenQ4"
                  color="paradisePink"
                  class="align-self-center radius"
                  @click="clickQuestion4()"
                  >mdi-minus-circle-outline</v-icon
                >
                <v-icon
                  v-else
                  color="blueJeans"
                  class="align-self-center radius"
                  @click="clickQuestion4()"
                  >mdi-plus-circle-outline</v-icon
                >
                <div
                  class="text-dp-xs align-self-center ml-3"
                  @click="clickQuestion4()"
                >
                  How much does logoipsum cost?
                </div>
              </div>
              <div
                v-if="isOpenQ4"
                class="text-lg sub-text gray6--text slide-down my-3"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fames
                mattis nam eu et. Sed arcu molestie ut morbi. In nunc egestas
                ipsum accumsan lacus est dictum at. Euismod eget augue porttitor
                id in nunc volutpat. Quis ac in quis curabitur amet.
              </div>
            </template>
          </v-expansion-panel-header>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <template v-slot:actions>
              <div class="d-flex pb-1">
                <v-icon
                  v-if="isOpenQ5"
                  color="paradisePink"
                  class="align-self-center radius"
                  @click="clickQuestion5()"
                  >mdi-minus-circle-outline</v-icon
                >
                <v-icon
                  v-else
                  color="blueJeans"
                  class="align-self-center radius"
                  @click="clickQuestion5()"
                  >mdi-plus-circle-outline</v-icon
                >
                <div
                  class="text-dp-xs align-self-center ml-3"
                  @click="clickQuestion5()"
                >
                  Does logoipsum provide custom feature development?
                </div>
              </div>
              <Transition name="slide" mode="down-up">
                <div v-if="isOpenQ5" class="text-lg sub-text gray6--text my-3">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fames
                  mattis nam eu et. Sed arcu molestie ut morbi. In nunc egestas
                  ipsum accumsan lacus est dictum at. Euismod eget augue porttitor
                  id in nunc volutpat. Quis ac in quis curabitur amet.
                </div>
              </Transition>
            </template>
          </v-expansion-panel-header>
        </v-expansion-panel>
      </div>
    </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {
      isOpenQ1: true,
      isOpenQ2: false,
      isOpenQ3: false,
      isOpenQ4: false,
      isOpenQ5: false,
    };
  },
  methods: {
    clickQuestion1() {
      this.isOpenQ1 = !this.isOpenQ1;
    },
    clickQuestion2() {
      this.isOpenQ2 = !this.isOpenQ2;
    },
    clickQuestion3() {
      this.isOpenQ3 = !this.isOpenQ3;
    },
    clickQuestion4() {
      this.isOpenQ4 = !this.isOpenQ4;
    },
    clickQuestion5() {
      this.isOpenQ5 = !this.isOpenQ5;
    },
  },
});
</script>

<style scoped>
.question1 {
  height: max-content;
  position: relative;
  background-color: black;
  padding-bottom: 100px;
}
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
.zindex-3 {
  z-index: 3;
}
.radius {
  height: max-content;
}
.v-expansion-panel-header {
  text-align: start;
}
.slide-down {
  animation: slide-down 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

@keyframes slide-down {
  0% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
}
.oncursor {
  cursor: pointer;
}
</style>
