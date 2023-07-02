import Vue from "vue";
import Vuex from "vuex";
import config from "@/store/config";
import createPersistedState from "vuex-persistedstate";
import movies from "@/store/movies";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    config,
    movies
  },
  plugins: [createPersistedState()]
});

export default store;
