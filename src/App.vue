<template>
  <v-app>
    <SnackBar />
    <GlobalLoading />
    <ConfirmDialog />
    <NavigationBar v-if="!isEndUser" />
    <v-main style="overflow-y: hidden">
      <div class="full-width full-height">
        <v-scroll-x-reverse-transition mode="out-in" appear>
          <router-view> </router-view>
        </v-scroll-x-reverse-transition>
      </div>
    </v-main>
    <Footer class="footer" v-if="!isEndUser" />
  </v-app>
</template>

<script lang="ts">
import { Observer } from "mobx-vue";
import { Component, Vue, Watch } from "vue-property-decorator";
import { appProvider } from "./app-providers";
// import { walletStore } from "./stores/wallet-store";

@Observer
@Component({
  components: {
    //Global plugins
    SnackBar: () => import("@/components/snack-bar/snack-bar.vue"),
    GlobalLoading: () =>
      import("@/components/global-loading/global-loading.vue"),
    ConfirmDialog: () =>
      import("@/components/confirm-dialog/confirm-dialog.vue"),
    // Nav bar and Footer
    NavigationBar: () => import("@/components/NavigationBar.vue"),
    // MobileNavigationBar: () => import("@/components/MobileNavigationBar.vue"),
    // NavigationDrawer: () => import("@/components/NavigationDrawer.vue"),
    Footer: () => import("@/components/Footer.vue"),
    // NotifyDialog: () => import("@/components/NotifyDialog.vue"),
  },
})
export default class App extends Vue {
  isEndUser = false;

  async created() {
    // await walletStore.start();
    appProvider.setVueRouter(this.$router);
  }

  @Watch("$route", { deep: true, immediate: true }) onRouteChange(val) {
    if (val) this.isEndUser = val.meta.isEndUser;
    if (!this.isEndUser) this.isEndUser = false;
  }
}
</script>

<style lang="scss">
.full-width {
  width: 100% !important;
}
.screen-width {
  width: 100vw;
}
.full-height {
  height: 100% !important;
}
.fill {
  flex: 1 0 100%;
}
.cursor-pointer {
  cursor: pointer;
}
.border-radius-24 {
  border-radius: 24px !important;
}
.border-radius-16 {
  border-radius: 16px !important;
}
.border-radius-12 {
  border-radius: 12px !important;
}
.border-radius-8 {
  border-radius: 8px !important;
}
.border-radius-4 {
  border-radius: 4px !important;
}
.v-application--wrap {
  height: initial;
  width: 100vw;
  position: relative;
  background-attachment: fixed;
  background-position: center center;
  background-repeat: repeat !important;
  background-size: 100% !important;
  /*background-size: cover !important;*/
}
.v-application--wrap::before {
  content: "";
  background: url("assets/background.png") !important;
  background-blend-mode: overlay;
  height: 100%;
  width: 100%;
  position: absolute;
  opacity: 0.3;
  background-position: center center;
  background-repeat: repeat !important;
  background-size: 100% !important;

  /*background-size: cover !important;*/
}
body {
  font-family: "DM Sans", sans-serif !important;
  font-weight: 400;
}

//Typography
//Font-size
// text-overline
.text-overline-1 {
  font-size: 10px !important;
  line-height: 12px !important;
}
.text-caption {
  font-size: 12px !important;
  line-height: 14px !important;
}
.text-xs {
  font-size: 12px !important;
  line-height: 18px !important;
}
.text-sm {
  font-size: 14px !important;
  line-height: 20px !important;
}
.text-md {
  font-size: 16px !important;
  line-height: 24px !important;
}
.text-lg {
  font-size: 18px !important;
  line-height: 28px !important;
}
.text-xl {
  font-size: 20px !important;
  line-height: 32px !important;
}
.text-dp-xs {
  font-size: 24px !important;
  line-height: 36px !important;
}
.text-dp-sm {
  font-size: 30px !important;
  line-height: 38px !important;
}
.text-dp-md {
  font-size: 36px !important;
  line-height: 44px !important;
  letter-spacing: -2% !important;
}
.text-dp-lg {
  font-size: 48px !important;
  line-height: 60px !important;
  letter-spacing: -2% !important;
}
.text-dp-xl {
  font-size: 60px !important;
  line-height: 72px !important;
  letter-spacing: -2% !important;
}
.text-dp-xxl {
  font-size: 72px !important;
  line-height: 90px !important;
  letter-spacing: -2% !important;
}

//Scrollbar
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 8px var(--v-gray13-base);
  background-color: transparent !important;
}
::-webkit-scrollbar {
  width: 6px;
  background-color: transparent !important;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: 0 0 8px var(--v-gray13-base);
  background-color: var(--v-primary-base);
}

//Others
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.btn-text {
  font-weight: 500 !important;
  font-size: 14px !important;
  line-height: 20px !important;
  color: var(--v-gray03-base) !important;
  letter-spacing: 0px !important;
}
.card-border {
  border: var(--v-gray11-base) 1px solid;
}
//Font-faces
.font-dm-sans {
  font-family: "DM Sans", sans-serif !important;
}
.font-inter {
  font-family: "Inter", sans-serif !important;
}
.font-ubuntu {
  font-family: "Ubuntu", sans-serif !important;
}
.w-fit-content {
  width: fit-content;
}
.box-gray-11 {
  background: #3b3b3f;
  border: 1px solid #4f4f54;
}
.box-gray-12 {
  background: #2a2a2d !important;
  // border: 1px solid #3b3b3f !important;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4) !important;
}
.box-gray-13 {
  background: #1e1e20;
  border: 1px solid #3b3b3f;
  border-radius: 6px !important;
}
.btn-gray-11 {
  text-transform: capitalize !important;
  background: #3b3b3f !important;
  border: 1px solid #4f4f54 !important;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25),
    inset -1px -1px 4px rgba(0, 0, 0, 0.25),
    inset 1px 1px 4px rgba(255, 255, 255, 0.05);
  border-radius: 8px !important;
}

.box-border-gray11 {
  border: 1px solid var(--v-gray11-base);
}
.box-border-gray12 {
  border: 1px solid var(--v-gray12-base);
}
.box-border-gray13 {
  border: 1px solid var(--v-gray13-base);
}
.h-36 {
  height: 36px;
}
.min-h-80 {
  min-height: 80px;
}
.relative {
  position: relative;
}
.absolute {
  position: absolute;
}
.overflow-hidden {
  overflow: hidden;
}
.gap-24 {
  gap: 24px !important;
}
.gap-16 {
  gap: 16px !important;
}
.gap-8 {
  gap: 8px !important;
}
.gap-4 {
  gap: 4px !important;
}
.theme--dark {
  .v-btn--active::before {
    opacity: 1 !important;
  }
}
.z-index-8 {
  z-index: 8 !important;
}
.z-index-10 {
  z-index: 10 !important;
}

.footer {
  z-index: 1;
}
//Animations

//Flicking
.flicking-panel {
  align-items: flex-end;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  position: relative;
}

.flicking-arrow-prev,
.flicking-arrow-next {
  position: absolute;
  top: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  z-index: 2;
}

.flicking-arrow-prev.is-circle,
.flicking-arrow-next.is-circle {
  background-color: var(--v-primary-base);
  border-radius: 50%;
}

.flicking-arrow-disabled.is-circle {
  background-color: var(--v-gray11-base);
}

.flicking-arrow-prev.is-circle::before,
.flicking-arrow-prev.is-circle::after,
.flicking-arrow-next.is-circle::before,
.flicking-arrow-next.is-circle::after {
  background-color: white;
}

.flicking-arrow-prev {
  left: 6px;
}
.flicking-arrow-next {
  right: 6px;
}

.flicking-arrow-prev.is-outside {
  left: -74px;
}
.flicking-arrow-next.is-outside {
  right: -74px;
}

.flicking-arrow-prev::before,
.flicking-arrow-prev::after,
.flicking-arrow-next::before,
.flicking-arrow-next::after {
  content: "";
  width: 10px;
  height: 2px;
  position: absolute;
  background-color: var(--v-gray11-base);
  border-radius: 50% !important;
}
.flicking-arrow-prev::before {
  top: calc(50% - 1px);
  left: 8px;
  -webkit-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  transform: rotate(-45deg);
  -webkit-transform-origin: 0% 50%;
  -ms-transform-origin: 0% 50%;
  transform-origin: 0% 50%;
}
.flicking-arrow-prev::after {
  top: calc(50% - 1px);
  left: 8px;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  -webkit-transform-origin: 0% 50%;
  -ms-transform-origin: 0% 50%;
  transform-origin: 0% 50%;
}
.flicking-arrow-next::before {
  top: calc(50% - 1px);
  right: 8px;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  -webkit-transform-origin: 100% 50%;
  -ms-transform-origin: 100% 50%;
  transform-origin: 100% 50%;
}
.flicking-arrow-next::after {
  top: calc(50% - 1px);
  right: 8px;
  -webkit-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  transform: rotate(-45deg);
  -webkit-transform-origin: 100% 50%;
  -ms-transform-origin: 100% 50%;
  transform-origin: 100% 50%;
}

.flicking-arrow-disabled,
.flicking-arrow-disabled {
  cursor: default;
}

.flicking-arrow-disabled::before,
.flicking-arrow-disabled::after,
.flicking-arrow-disabled::before,
.flicking-arrow-disabled::after {
  background-color: #e6e6e6;
}

.flicking-arrow-prev.is-thin::before,
.flicking-arrow-prev.is-thin::after,
.flicking-arrow-next.is-thin::before,
.flicking-arrow-next.is-thin::after {
  height: 3px;
}

.flicking-arrow-prev.is-thin::after,
.flicking-arrow-next.is-thin::after {
  top: calc(50% - 2px);
}
</style>
