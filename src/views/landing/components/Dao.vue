<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="dao d-flex flex-column">
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
    <div class="font-weight-bold text-dp-lg align-self-center mt-12 mb-8 z-2">
      DAO Builder pioneers the optimal way for
    </div>
    <div class="d-flex mt-12 justify-center col-gap-40 z-2 mb-5">
      <div
        class="d-flex flex-column align-center active slide cursor"
        @click="slidedao(0), setImage(0)"
      >
        <div class="process-bar">
          <div class="complete-bar"></div>
        </div>
        <!-- <div class="divider" /> -->
      </div>
      <div
        class="d-flex flex-column align-center slide cursor"
        @click="slidedao(1), setImage(1)"
      >
        <div class="process-bar">
          <div class="complete-bar"></div>
        </div>
        <!-- <div class="divider" /> -->
      </div>
      <div
        class="d-flex flex-column align-center slide cursor"
        @click="slidedao(2), setImage(2)"
      >
        <div class="process-bar">
          <div class="complete-bar"></div>
        </div>
        <!-- <div class="divider" /> -->
      </div>
    </div>
    <div class="d-flex mt-2 justify-center col-gap-40 z-2 gray6--text">
      <div
        class="d-flex flex-column align-center slide active cursor"
        @click="slidedao(0), setImage(0)"
      >
        <div class="font-weight-bold text-dp-md mb-2 aTitle">Build</div>
        <div class="text-lg sub-title">
          Set up a full-function DAO with ease without any coding experience. We
          will get you ready in an instant.
        </div>
        <v-card class="dao-card" v-show="indexImage == 0">
          <v-img
            class="image"
            :src="require(`@/assets/landing/dao-image.webp`)"
          ></v-img>
        </v-card>
      </div>
      <div
        class="d-flex flex-column align-center slide cursor"
        @click="slidedao(1), setImage(1)"
      >
        <div class="font-weight-bold text-dp-md mb-2 aTitle">Customize</div>
        <div class="text-lg sub-title">
          Tailor your DAO to the fullest with a wide range of options. It’s time
          to decentralize with style.
        </div>
        <v-card class="dao-card" v-show="indexImage == 1">
          <v-img
            class="image"
            :src="require(`@/assets/landing/dao-image.webp`)"
          ></v-img>
        </v-card>
      </div>
      <div
        class="d-flex flex-column align-center slide cursor"
        @click="slidedao(2), setImage(2)"
      >
        <div class="font-weight-bold text-dp-md mb-2 aTitle">Grow</div>
        <div class="text-lg sub-title">
          Our built-in system will help you manage and analyze your DAO to have
          better understanding of your community. Govern together, grow
          together.
        </div>
        <v-card class="dao-card" v-show="indexImage == 2">
          <v-img
            class="image"
            :src="require(`@/assets/landing/dao-image.webp`)"
          ></v-img>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      indexImage: 0,
      slide: null,
      index: 1,
    };
  },

  mounted() {
    this.slide = setInterval(() => {
      if (this.index >= 3) {
        this.index = 0;
      }
      this.slidedao(this.index);
      this.setImage(this.index);

      this.index++;
    }, 6000);
  },
  methods: {
    slidedao(index) {
      let processBar;
      let activeElement;
      const slideLength = 3;
      processBar = Array.from(document.getElementsByClassName("slide"));
      activeElement = Array.from(
        document.getElementsByClassName("slide active")
      );

      if (index >= slideLength) {
        index = 0;
      }
      activeElement.forEach((item) => {
        item.classList.remove("active");
      });
      processBar[index].classList.add("active");
      processBar[index + slideLength].classList.add("active");
    },
    setImage(index) {
      if (index >= 3) {
        this.indexImage = 0;
      }
      this.indexImage = index;
    },
  },
});
</script>

<style scoped>
.dao {
  height: 950px;
  position: relative;
  background-color: black;
}
.divider {
  height: 4px;
  width: 411px;
  background: linear-gradient(
    109.92deg,
    rgba(255, 255, 255, 0.102) 0%,
    rgba(255, 255, 255, 0.1) 52.78%,
    rgba(255, 255, 255, 0.2) 100%
  );
  backdrop-filter: blur(12px);
  border-radius: 40px;
}
.sub-title {
  width: 411px;
  height: 80px;
  margin-bottom: 60px;
}
.dao-card {
  border-radius: 10px;
}
.active .divider {
  background-color: #6a49e2;
}

.active .sub-title {
  font-weight: 700;
  color: white;
}
.active .image {
  animation: tran-opacity 0.4s forwards;
}
.image {
  animation: tran-opacity-reverse 1s forwards;
}
.active .aTitle {
  font-weight: 700;
  color: white;
}

.active .dao-card {
}
image {
  max-height: 292px;
}
.col-gap-40 {
  column-gap: 40px;
}
.redblur-image {
  z-index: 0;
  position: absolute;
  max-width: 807px;
  height: 280px;
  filter: blur(60px);
  transform: matrix(-1, 0, 0, 1, 0, 0);
  top: 600px;
  left: 250px;
}
.blueblur-image {
  z-index: 0;
  position: absolute;
  height: 356px;
  width: 766px;
  filter: blur(60px);
  transform: matrix(-1, 0, 0, 1, 0, 0);
  top: 430px;
  left: -100px;
}
.z-2 {
  z-index: 2;
}
.cursor {
  cursor: pointer;
}

.slide-left {
  animation: slide-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

.process-bar {
  width: 411px;
  height: 5px;
  background: linear-gradient(
    109.92deg,
    rgba(255, 255, 255, 0.102) 0%,
    rgba(255, 255, 255, 0.1) 52.78%,
    rgba(255, 255, 255, 0.2) 100%
  );
  backdrop-filter: blur(12px);
  border-radius: 16px;
}
.complete-bar {
  height: 5px;
  border-radius: 16px;
  background: #6a49e2;
  transition: transform;
  animation: processing-reverse 0.2s forwards;
}
.active .complete-bar {
  animation-name: processing;
  animation-duration: 6s;
  animation-iteration-count: infinite;
  animation-timing-function: ease;
}
@keyframes tran-opacity {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes tran-opacity-reverse {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes slide-left {
  0% {
    transform: translateX(100px);
  }
  100% {
    transform: translateX(0);
  }
}
@keyframes processing {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}

@keyframes processing-reverse {
  0% {
    width: 100%;
  }
  100% {
    width: 0%;
  }
}
</style>
