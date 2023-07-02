import type { Genre, Movie } from 'types'

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { request } from '@/api'

export const useMoviesStore = defineStore('movies', () => {
  const genres = ref<Genre[]>()
  const fetchGenres = async () => {
    const response = await request.get("/genre/movie/list");

    genres.value = response.data
    return response.data;
  }

  const upcomingMovies = ref<Movie[]>()
  const fetchUpcomingMovies = async () => {
    const response = await request.get("/genre/movie/list");

    upcomingMovies.value = response.data
    return response.data;
  }

  return {
    genres,
    fetchGenres,
    upcomingMovies,
    fetchUpcomingMovies
  }
})
