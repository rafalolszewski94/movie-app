import { configuration } from "@/types";
import ConfigObject = configuration.RootObject;

export interface State {
  base_url?: string;
  poster_sizes?: string[];
}

const CONSTANTS = {
  SET_CONFIG: "SET_CONFIG"
};

const state: State = {
  base_url: undefined
};
const getters = {
  baseUrl(state: State) {
    return state.base_url;
  }
};
const actions = {
  // @ts-ignore
  setConfig({ commit }, configObj: ConfigObject) {
    commit(CONSTANTS.SET_CONFIG, configObj);
  }
};
const mutations = {
  [CONSTANTS.SET_CONFIG](state: State, configObj: ConfigObject) {
    state.base_url = configObj.images.base_url;
    state.poster_sizes = configObj.images.poster_sizes;
  }
};

const config = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

export default config;
