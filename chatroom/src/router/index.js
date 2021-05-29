import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import General from "../views/General.vue"
import Random from "../views/Random.vue"
import Announcements from "../views/Announcements.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/general",
    name: "General",
    component: General,
  },
  {
    path: "/random",
    name: "Random",
    component: Random,
  },
  {
    path: "/announcements",
    name: "Announcements",
    component: Announcements,
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
