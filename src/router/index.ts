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
  // {
  //   path: "/home",
  //   name: "home",
  //   component: () => import("../views/home/pages/Home.vue"),
  //   meta: {
  //     title: "Home",
  //   },
  // },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/landing/pages/LandingPage.vue"),
    meta: {
      title: "Home",
      canAccess: true,
    },
  },
  {
    path: "/theme-market",
    name: "Theme Market",
    component: () => import("../views/theme-market/pages/theme-market.vue"),
    meta: {
      title: "Theme Market",
      canAccess: true,
    },
  },
  {
    path: "/theme/:themeId",
    name: "Theme Detail",
    component: () => import("../views/theme-market/pages/theme-detail.vue"),
    meta: {
      title: "Theme Detail",
      canAccess: true,
    },
  },
  {
    path: "/management",
    name: "ApplicationManagement",
    component: () => import("@/views/management/pages/Management.vue"),
    meta: {
      title: "Application Management",
      canAccess: false,
    },
  },
  {
    path: "/theme-management",
    name: "ThemeManagement",
    component: () => import("@/views/management/pages/ThemeManagement.vue"),
    meta: {
      title: "Theme Management",
      canAccess: false,
    },
  },
  {
    path: "/trash",
    name: "TrashManagement",
    component: () => import("@/views/management/pages/Trash.vue"),
    meta: {
      title: "Trash Management",
      canAccess: false,
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
      canAccess: false,
    },
  },
  {
    path: "/select-dao",
    name: "DAO Selector",
    component: () => import("../views/create-dao/pages/dao-selector.vue"),
    meta: {
      title: "DAO Selector",
      canAccess: false,
    },
  },
  {
    path: "/create-dao",
    name: "Create DAO",
    component: () => import("../views/create-dao/pages/create-dao.vue"),
    meta: {
      title: "Create DAO",
      canAccess: false,
    },
  },
  {
    path: "/customize-interface",
    name: "Customize Interface",
    component: () => import("../views/customize-interface/pages/customize-interface.vue"),
    meta: {
      title: "Customize Interface",
      canAccess: false,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.meta && !to.meta.canAccess && !walletStore.connected) {
    await walletStore.start();
  }
  next(); //TODO: uncomment below
  // if (!to.name || !to) next("/my-character");
  // else next();
});

export default router;
