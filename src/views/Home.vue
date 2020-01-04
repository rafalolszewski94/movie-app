<template>
  <div class="home container">
    <movie-list title="Trending" :movie-list="trendingMovies" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import MovieList from "@/components/MovieList.vue";
import { api } from "@/api";

import { movie } from "@/types";
import TrendingObject = movie.TrendingObject;
import { ApiResponse } from "apisauce";

@Component({ components: { MovieList } })
export default class Home extends Vue {
  trending: { results: TrendingObject[] } = {
    results: []
  };

  mounted() {
    this.getTrendingMovies();
  }

  get trendingMovies(): null | TrendingObject[] {
    if (this.trending) {
      const { results } = this.trending;
      return results;
    }
    return null;
  }

  getTrendingMovies(type = "all", timeSpan = "week") {
    api
      .get(`/trending/${type}/${timeSpan}`)
      .then((response: ApiResponse<any>) => {
        this.trending = response.data;
      })
      .catch((error: any) => {
        throw new Error(error);
      });
  }
}
</script>

<style lang="scss">
.container.home {
  margin: 47px auto 100px;
  flex-direction: column;

  h1 {
    margin: 40px 0 80px;
    font-weight: 900;
    font-size: 70px;
    color: $text-color;
  }
}
</style>
