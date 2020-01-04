import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { sync } from "vuex-router-sync";
import { api } from "@/api";
import "@/styles/app.scss";
import "./class-component-hooks";

import Unicon from "vue-unicons";
import { starFilled, star, search } from "@/customIcons";

// @ts-ignore
import { VLazyImagePlugin } from "v-lazy-image";
import LazyImage from "@/components/LazyImage.vue";

sync(store, router);

Vue.config.productionTip = false;
Vue.prototype.$api = api;
Vue.filter("truncate", function(value: string, length: number) {
  length = length || 15;
  if (!value) return "";
  if (value.length <= length) return value;
  return value.substring(0, length) + "...";
});
Vue.filter("uppercase", function(value: string) {
  return value || value.toString().toUpperCase();
});
Vue.use(VLazyImagePlugin);
Vue.component("lazy-image", LazyImage);

// @ts-ignores
Unicon.add([star, starFilled, search]);
Vue.use(Unicon);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
