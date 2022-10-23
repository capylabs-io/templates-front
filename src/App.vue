<template>
  <v-app>
    <NavigationBar v-if="$vuetify.breakpoint.mdAndUp" />
    <MobileNavigationBar v-else />
    <v-main>
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import { Observer } from "mobx-vue";
import { Component, Vue } from "vue-property-decorator";
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
    MobileNavigationBar: () => import("@/components/MobileNavigationBar.vue"),
    // NavigationDrawer: () => import("@/components/NavigationDrawer.vue"),
    Footer: () => import("@/components/Footer.vue"),
    // NotifyDialog: () => import("@/components/NotifyDialog.vue"),
  },
})
export default class App extends Vue {
  mounted() {
    // walletStore.start();
    appProvider.setVueRouter(this.$router);
  }
}
</script>

<style lang="scss">
.full-width {
  width: 100% !important;
}
.full-height {
  height: 100% !important;
}
.cursor-pointer {
  cursor: pointer;
}
.vertical-center {
  left: 50%;
  -ms-transform: translate(-50%, 0);
  transform: translate(-50%, 0);
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
  content:"";
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
  font-weight: 500;
}
body {
  font-family: "DM Sans", sans-serif !important;
}

//Typography
//Font-size
.text-overline {
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
  line-height: -2% !important;
}
.text-dp-lg {
  font-size: 48px !important;
  line-height: 60px !important;
  line-height: -2% !important;
}
.text-dp-xl {
  font-size: 60px !important;
  line-height: 72px !important;
  line-height: -2% !important;
}
.text-dp-xxl {
  font-size: 72px !important;
  line-height: 90px !important;
  line-height: -2% !important;
}

//Scrollbar
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: transparent !important;
}
::-webkit-scrollbar {
  width: 6px;
  background-color: transparent !important;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: var(--v-subtitle-base);
}

//Others
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
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
.w-full {
  width: 100%;
}
//Animations
</style>
