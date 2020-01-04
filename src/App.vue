<template>
  <div id="app">
    <app-header />
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader";
import { api } from "@/api";

export default {
  components: { AppHeader },
  mounted() {
    this.getConfig();
  },
  methods: {
    getConfig() {
      api
        .get("/configuration")
        .then(response => {
          this.$store.dispatch("config/setConfig", response.data);
        })
        .catch(error => {
          throw new Error(error);
        });
    }
  }
};
</script>

<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
}
body {
  margin: 0;
  background-color: #040302;
  color: $text-color;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #f5f5f4;
}
</style>
