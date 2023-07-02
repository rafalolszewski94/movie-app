import Home from "../views/Home.vue";
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/movie/:id",
    name: "movie",
    component: () =>
      import(/* webpackChunkName: "movie" */ "../views/Movie.vue")
  },
  {
    path: "/tv/:id",
    name: "tv",
    component: () =>
      import(/* webpackChunkName: "tv" */ "../views/Tv.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
