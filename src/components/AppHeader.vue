<template>
  <header class="app-header" :class="{ scrolled: scrolled }">
    <div class="container row">
      <router-link to="/" class="app-title">
        <h2><span>M</span>DB</h2>
      </router-link>
      <button @click="routerGoBack" v-if="notHomeRoute" class="go-back-btn">
        go back
      </button>

      <div>
        <form class="search-field" novalidate @submit.prevent="onSubmit">
          <input type="search" placeholder="search" v-model="query" />
        </form>
      </div>
    </div>
  </header>
</template>

<script>
import { api } from "@/api";

export default {
  name: "AppHeader",
  data: () => ({
    query: "",
    scrolled: false
  }),
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  computed: {
    notHomeRoute() {
      return this.$store.state.route.name !== "home";
    }
  },
  methods: {
    handleScroll() {
      this.scrolled = (document.body.scrollTop || pageYOffset) >= 1;
    },
    routerGoBack() {
      this.$router.go(-1);
    },
    onSubmit() {
      api
        .get(`/search/multi`, { query: this.query })
        .then(response => {
          const foundMovies = response.data.results.sort((a, b) => {
            return b.popularity - a.popularity;
          });
        })
        .catch(error => {
          throw new Error(error);
        });
    }
  }
};
</script>

<style>
.app-header + .movie-detail header .container {
  padding-top: 47px;
}
</style>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba($bg-color, 0);
  border-bottom: 1px solid transparent;
  z-index: 10;
  transition: background-color 0.2s cubic-bezier(0.17, 0.67, 0.83, 0.67);

  &.scrolled {
    background-color: rgba($bg-color, 0.8);
    border-bottom: 1px solid $primary-color;

    input[type="search"] {
      background-color: #121212;
    }
  }
}

.app-title {
  margin: 0;
  padding: 10px 0;

  h2 {
    margin: 0;
    font-weight: 700;
    font-family: Futura, sans-serif;
  }

  span {
    color: $primary-color;
  }
}

.go-back-btn {
  background-color: rgba(black, 0.2);
  border: none;
  color: $text-color;
  font-size: 12px;
  padding: 8px 20px;
  text-transform: uppercase;

  &:hover {
    background-color: rgba(black, 0.3);
  }
}

.search-field {
  input[type="search"] {
    background-color: transparent;
    font-size: 18px;
    line-height: 35px;
    border: none;
    color: $text-color;
    border-radius: 3px;
    outline: none;
    text-align: right;
    transition: background-color 0.1s cubic-bezier(0.17, 0.67, 0.83, 0.67);

    &:focus {
      background-color: #222222;
    }
  }
}
</style>
