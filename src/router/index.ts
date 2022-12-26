import { walletStore } from "@/stores/wallet-store";
import { when } from "mobx";
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

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
    path: "/landing",
    name: "LandingPage",
    component: () => import("../views/landing/pages/LandingPage.vue"),
    meta: {
      title: "Landing Page",
    },
  },
  {
    path: "/management",
    name: "ApplicationManagement",
    component: () => import("@/views/management/pages/Management.vue"),
    meta: {
      title: "Application Management",
    },
  },
  {
    path: "/trash",
    name: "TrashManagement",
    component: () => import("@/views/management/pages/Trash.vue"),
    meta: {
      title: "Trash Management",
    },
  },
  {
    path: "/dao/:appId",
    name: "DAO Dashboard",
    component: () => import("../views/dao/pages/Dao.vue"),
    props: {
      isReview: false,
    },
    meta: {
      title: "DAO Dashboard",
      isEndUser: true,
    },
    children: [
      {
        path: ":proposalId",
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
