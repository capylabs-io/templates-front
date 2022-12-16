import { walletStore } from "@/stores/wallet-store";
import { when } from "mobx";
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HomeView from "../views/home/pages/Home.vue";
import ManagementView from "../views/management/pages/Management.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/home/pages/Home.vue"),
    meta: {
      title: "Home",
    },
  },
  {
    path: "/management",
    name: "Management",
    component: ManagementView,
  },
  {
    path: "/dao/:appId",
    name: "DAO Dashboard",
    component: () => import("../views/dao/pages/Dao.vue"),
    meta: {
      title: "DAO Dashboard",
      isEndUser: true,
    },
    children: [
      {
        path: "/:proposalId",
        name: "Proprosal Detail",
      },
    ],
  },
  {
    path: "/select-service",
    name: "Service Selector",
    component: () => import("../views/service-selector.vue"),
    meta: {
      title: "Service Selector",
    },
  },
  {
    path: "/select-dao",
    name: "DAO Selector",
    component: () => import("../views/create-dao/pages/dao-selector.vue"),
    meta: {
      title: "DAO Selector",
    },
  },
  {
    path: "/create-dao",
    name: "Create DAO",
    component: () => import("../views/create-dao/pages/create-dao.vue"),
    meta: {
      title: "Create DAO",
    },
  },
  {
    path: "/customize-interface",
    name: "Customize Interface",
    component: () => import("../views/customize-interface/pages/customize-interface.vue"),
    meta: {
      title: "Customize Interface",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  await when(() => walletStore.loaded);
  next(); //TODO: uncomment below
  // if (!to.name || !to) next("/my-character");
  // else next();
});

export default router;
