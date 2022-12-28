<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="feature d-flex flex-column align-center">
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
    <div class="font-weight-bold text-dp-lg align-self-center mt-12 mb-8">
      Featured blogposts
    </div>
    <div class="d-flex justify-center col-gap-20 card-list mt-7">
      <v-card
        class="feature-card d-flex flex-column align-center justify-center"
      >
        <div class="card-content">
          <v-img
            class="image"
            :src="require(`@/assets/landing/feature-image.webp`)"
          ></v-img>
          <button
            class="text-xs btn-content primary white--text text-capitalize mt-3"
            elevation="0"
          >
            <span> Anouncement</span>
          </button>
          <div class="text-md mt-3 subtext">
            What is DAO? DAOs are the future of organization and work
          </div>
        </div>
      </v-card>
      <v-card
        class="feature-card d-flex flex-column align-center justify-center"
      >
        <div class="card-content">
          <v-img
            class="image"
            :src="require(`@/assets/landing/feature-image.webp`)"
          ></v-img>
          <button
            class="text-xs btn-content primary white--text text-capitalize mt-3"
            elevation="0"
          >
            <span> Anouncement</span>
          </button>
          <div class="text-md mt-3 subtext">
            What is DAO? DAOs are the future of organization and work
          </div>
        </div>
      </v-card>
      <v-card
        class="feature-card d-flex flex-column align-center justify-center"
      >
        <div class="card-content">
          <v-img
            class="image"
            :src="require(`@/assets/landing/feature-image.webp`)"
          ></v-img>
          <button
            class="text-xs btn-content primary white--text text-capitalize mt-3"
            elevation="0"
          >
            <span> Anouncement</span>
          </button>
          <div class="text-md mt-3 subtext">
            What is DAO? DAOs are the future of organization and work
          </div>
        </div>
      </v-card>
      <v-card
        class="feature-card d-flex flex-column align-center justify-center"
      >
        <div class="card-content">
          <v-img
            class="image"
            :src="require(`@/assets/landing/feature-image.webp`)"
          ></v-img>
          <button
            class="text-xs btn-content primary white--text text-capitalize mt-3"
            elevation="0"
          >
            <span> Anouncement</span>
          </button>
          <div class="text-md mt-3 subtext">
            What is DAO? DAOs are the future of organization and work
          </div>
        </div>
      </v-card>
      <v-card
        class="feature-card d-flex flex-column align-center justify-center"
      >
        <div class="card-content">
          <v-img
            class="image"
            :src="require(`@/assets/landing/feature-image.webp`)"
          ></v-img>
          <button
            class="text-xs btn-content primary white--text text-capitalize mt-3"
            elevation="0"
          >
            <span> Anouncement</span>
          </button>
          <div class="text-md mt-3 subtext">
            What is DAO? DAOs are the future of organization and work
          </div>
        </div>
      </v-card>
    </div>
    <v-btn
      class="btn-feature white--text text-capitalize mt-10"
      elevation="0"
      color="primary"
      >Read the blog</v-btn
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
.feature {
  height: max-content;
  position: relative;
  background-color: black;
  padding-bottom: 150px;
}
.col-gap-20 {
  column-gap: 20px;
}
.feature-card {
  height: 330px;
  width: 250px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 20px;
}
.card-content {
  margin: 20px;
}
.btn-feature {
  border-radius: 8px;
}
.btn-content {
  height: max-content;
  width: max-content;
  padding: 5px;
  opacity: 0.7;
  border-radius: 100px;
}
.image {
  border-radius: 15px;
}
.subtext {
  width: 80%;
}
.redblur-image {
  z-index: 0;
  position: absolute;
  max-width: 807px;
  height: 280px;
  filter: blur(60px);
  transform: matrix(0.94, 0.35, 0.35, -0.94, 0, 0);
  left: 900px;
  top: 300px;
}
.blueblur-image {
  z-index: 0;
  position: absolute;
  height: 356px;
  width: 766px;
  filter: blur(60px);
  transform: matrix(-1, 0, 0, 1, 0, 0);
  left: 1300px;
  top: 150px;
}
</style>
