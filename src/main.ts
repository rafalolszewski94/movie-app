import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { sync } from "vuex-router-sync";
import { request } from "@/api";
import "@/styles/app.scss";
import "./class-component-hooks";

// @ts-ignore
import { VLazyImagePlugin } from "v-lazy-image";
import LazyImage from "@/components/LazyImage.vue";
import vSelect from "vue-select";

sync(store, router);

function setup() {
  store.dispatch("movies/fetchGenres");
  store.dispatch("movies/fetchUpcomingMovies");
}

Vue.config.productionTip = false;
Vue.prototype.$api = request;
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

// @ts-ignore
vSelect.props.components.default = () => ({
  OpenIndicator: {
    render: (createElement: (arg0: string, arg1: string) => void) => createElement("span", "🔽")
  }
});
Vue.component("v-select", vSelect);

new Vue({
  router,
  store,
  beforeCreate: function() {
    setup();
  },
  render: h => h(App)
}).$mount("#app");
