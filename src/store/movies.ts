import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

import { Movie } from "@/types";
import { request } from "@/api";

export interface Genre {
  id: number;
  name: string;
}

const CONSTANTS = {
  SET_GENRES: "SET_GENRES",
  SET_UPCOMING_MOVIES: "SET_UPCOMING_MOVIES"
};

@Module({
  namespaced: true
})
export default class Movies extends VuexModule {
  genres: Genre[] = [];
  upcoming_movies: Movie[] = [];

  @Mutation
  [CONSTANTS.SET_GENRES](payload: { genres: Genre[] }) {
    this.genres = payload.genres;
  }

  @Mutation
  [CONSTANTS.SET_UPCOMING_MOVIES](payload: Movie[]) {
    this.upcoming_movies = payload;
  }

  @Action
  async fetchGenres() {
    try {
      const genres = await request.get("/genre/movie/list");

      this.context.commit(CONSTANTS.SET_GENRES, genres.data);
      return genres.data;
    } catch (error) {
      throw error;
    }
  }

  @Action
  async fetchUpcomingMovies() {
    try {
      const movies = await request.get("/movie/upcoming");

      this.context.commit(CONSTANTS.SET_UPCOMING_MOVIES, movies.data);
      return movies.data;
    } catch (error) {
      throw error;
    }
  }
}
