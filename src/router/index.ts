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
    {
      path: '/movie/:id',
      name: 'movie-detail',
      component: () => import('../views/Movie.vue')
    },
    {
      path: '/tv/:id',
      name: 'tv-detail',
      component: () => import('../views/Movie.vue')
    },
    {
      path: '/person/:id',
      name: 'person-detail',
      component: () => import('../views/Person.vue')
    },
  ]
})

export default router
