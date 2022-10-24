import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/home/pages/Home.vue"),
    meta: {
      title: "Home",
    },
  },
  {
    path: "/dao",
    name: "DAO Dashboard",
    component: () => import("../views/dao/pages/Dao.vue"),
    meta: {
      title: "DAO Dashboard",
    },
  },
  {
    path: "/select-service",
    name: "Service Selector",
    component: () => import("../views/service-selector.vue"),
    meta: {
      title: "Service Selector",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
