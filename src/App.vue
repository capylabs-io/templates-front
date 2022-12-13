<template>
  <v-app>
    <NavigationBar v-if="$vuetify.breakpoint.mdAndUp" />
    <MobileNavigationBar v-else />
    <v-main>
      <v-scroll-x-reverse-transition mode="out-in" appear>
        <router-view> </router-view>
      </v-scroll-x-reverse-transition>
    </v-main>
    <Footer class="footer" />
  </v-app>
</template>

<script>
import { Observer } from "mobx-vue";
import { Component, Vue } from "vue-property-decorator";
import { appProvider } from "./app-providers";
import { walletStore } from "./stores/wallet-store";

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
    MobileNavigationBar: () => import("@/components/MobileNavigationBar.vue"),
    // NavigationDrawer: () => import("@/components/NavigationDrawer.vue"),
    Footer: () => import("@/components/Footer.vue"),
    // NotifyDialog: () => import("@/components/NotifyDialog.vue"),
  },
})
export default class App extends Vue {
  async created() {
    await walletStore.start();
    appProvider.setVueRouter(this.$router);
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
  background-position: center;
  background-repeat: no-repeat !important;
  background-size: cover !important;
}
.v-application--wrap::before {
  content: "";
  background: url("assets/background.png") !important;
  background-blend-mode: overlay;
  height: 100%;
  width: 100%;
  position: absolute;
  opacity: 0.3;
  background-position: center;
  background-repeat: no-repeat !important;
  background-size: cover !important;
}
.v-application {
  [class*="text-"] {
    font-family: "DM Sans", sans-serif !important;
  }
  font-family: "DM Sans", sans-serif !important;
  font-weight: 400;
}
body {
  font-family: "DM Sans", sans-serif !important;
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
  -webkit-box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  background-color: transparent !important;
}
::-webkit-scrollbar {
  width: 6px;
  background-color: transparent !important;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 8px var(--v-primary-base);
  background-color: var(--v-gray13-base);
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
  font-family: "DM Sans", sans-serif !important;
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
  border: 1px solid #3b3b3f !important;
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
.theme--dark {
  .v-btn--active::before {
    opacity: 1 !important;
  }
}
.z-index-8 {
  z-index: 8 !important;
}

.footer {
  z-index: 1;
}
//Animations
</style>
