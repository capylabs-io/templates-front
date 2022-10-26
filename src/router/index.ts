import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/home/pages/Home.vue'
import ManagementView from '../views/management/pages/Management.vue'

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: '/management',
    name: 'Management',
    component: ManagementView
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
