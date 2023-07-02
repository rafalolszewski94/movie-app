import { createRouter, createWebHistory } from 'vue-router'

import MovieList from '../views/MovieList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'movie-list',
      component: MovieList
    },
  ]
})

export default router
