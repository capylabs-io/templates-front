import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import { pluginsRegister } from "./plugins/plugins-register";
import { vueFilterRegister } from "./plugins/vue-filter-register";
import Flicking from "@egjs/vue-flicking";
import "@egjs/vue-flicking/dist/flicking.css";
// Or, if you have to support IE9
import "@egjs/vue-flicking/dist/flicking-inline.css";
import "@egjs/flicking-plugins/dist/arrow.css";

Vue.use(Flicking);
Vue.config.productionTip = false;
Vue.component("address-copy-board", () => import("@/components/address-copy-board.vue"));

pluginsRegister();
vueFilterRegister();
new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
