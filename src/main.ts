import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import { pluginsRegister } from "./plugins/plugins-register";
import { vueFilterRegister } from "./plugins/vue-filter-register";
import DatetimePicker from "vuetify-datetime-picker";

Vue.config.productionTip = false;
Vue.component("address-copy-board", () => import("@/components/address-copy-board.vue"));
Vue.use(DatetimePicker);

pluginsRegister();
vueFilterRegister();
new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
