import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import config from "@/store/config";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    config
  },
  plugins: [createPersistedState()]
});

export default store;
